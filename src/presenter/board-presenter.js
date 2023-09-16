import {render, remove} from '../framework/render.js';
import EventsListView from '../view/events-list-view.js';
import EventsMessageView from '../view/events-message-view.js';
import {MessageType, SortType, UpdateType, UserAction, FilterType} from '../const.js';
import EventPresenter from './event-presenter.js';
import SortView from '../view/sort-view.js';
import {startSort, generateSort} from '../utils/sort.js';
import {startFilter} from '../utils/filter.js';
import NewEventPresenter from './new-event-presenter.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';

const TimeUiBlockerLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};
export default class BoardPresenter {
  #boardContainer = null;
  #eventsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #filterModel = null;

  #eventPresenters = new Map();
  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;
  #newEventPresenter = null;

  #eventsListComponent = new EventsListView();
  #sortComponent = null;
  #noEventsComponent = null;
  #onNewEventDestroy = () => {};

  #isLoading = true;
  #loadingComponent = new EventsMessageView(MessageType.LOADING);
  #failedToLoadComponent = new EventsMessageView(MessageType.FAILED_DATA_LOAD);

  #uiBlocker = new UiBlocker({
    lowerLimit: TimeUiBlockerLimit.LOWER_LIMIT,
    upperLimit: TimeUiBlockerLimit.UPPER_LIMIT
  });

  constructor({boardContainer, eventsModel, destinationsModel, offersModel, filterModel, onNewEventDestroy}) {
    this.#boardContainer = boardContainer;
    this.#eventsModel = eventsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#filterModel = filterModel;
    this.#onNewEventDestroy = onNewEventDestroy;

    this.#newEventPresenter = new NewEventPresenter({
      eventsListContainer: this.#eventsListComponent.element,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      onDataChange: this.#handleViewAction,
      onDestroy: this.#onNewEventDestroy,
    });

    //обработчик-наблюдатель, который реагирует на изменения модели this.#eventsModel и вызывает #handleModelEvent
    this.#eventsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get events() {
    this.#filterType = this.#filterModel.filter;
    const events = this.#eventsModel.events;
    const filteredEvents = startFilter(events, this.#filterType);

    return startSort(filteredEvents, this.#currentSortType);
  }

  init() {
    this.#renderBoard();
  }

  createEvent() {
    //нужно отрисовать лист, в который помешяется #newEventPresenter (в случае если с сервера пришло 0 эвентов)
    if (this.#eventsListComponent) {
      this.#renderListComponent();
    }

    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);

    if (this.#noEventsComponent) {
      remove(this.#noEventsComponent);
    }
    this.#newEventPresenter.init();
  }

  ifNoEventsShowMessage = () => {
    if (this.events.length === 0) {
      this.#renderNoEvents();
    }
  };

  #renderBoard() {
    //const events = this.events;
    //const eventsCount = events.length; //убраны константы для изменения значений

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    //если нет эвентов , показываем сообшение для FilterType.EVERYTHING
    /*if (this.#eventsModel.events.length === 0 && this.#filterModel.filter !== FilterType.EVERYTHING) {
      this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
      return;
    }*/

    //если нет эвентов , показываем сообшение для FilterType.EVERYTHING
    if (this.#eventsModel.events.length === 0) {
      this.#renderNoEvents(FilterType.EVERYTHING);
      return;
    }

    if (this.events.length === 0) {
      this.#renderNoEvents();
      return;
    }

    this.#renderSort();
    this.#renderListComponent();
    this.#renderEvents(this.events);
  }

  #renderNoEvents(filerType = this.#filterType) {
    this.#noEventsComponent = new EventsMessageView(MessageType[filerType]);
    render(this.#noEventsComponent, this.#boardContainer);
  }

  #renderListComponent() {
    render(this.#eventsListComponent, this.#boardContainer);
  }

  #renderSort() {
    this.#sortComponent = new SortView({
      sorting: generateSort(),
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange,
    });

    render(this.#sortComponent, this.#boardContainer);
  }

  #renderEvents(events) {
    events.forEach((event) => this.#renderEventItem(event));
  }

  #renderEventItem(event) {
    const eventPresenter = new EventPresenter ({
      eventsListContainer: this.#eventsListComponent.element,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
    });
    eventPresenter.init(event);
    this.#eventPresenters.set(event.id, eventPresenter);
  }

  #renderLoading() {
    render(this.#loadingComponent, this.#boardContainer);
  }

  //рендер сообщения ошибки загрузки данных
  renderFailedToLoad() {
    this.#clearBoard();
    render(this.#failedToLoadComponent, this.#boardContainer);
  }

  #clearBoard({resetSortType = false} = {}) {
    this.#newEventPresenter.destroy();
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();

    remove(this.#sortComponent);
    remove(this.#loadingComponent);
    remove(this.#noEventsComponent);

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

  #handleViewAction = async (actionType, updateType, event) => {
    // обновление модели.
    this.#uiBlocker.block();

    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this.#eventPresenters.get(event.id).setSaving();
        try {
          await this.#eventsModel.updateEvent(updateType, event);
        } catch(err) {
          this.#eventPresenters.get(event.id).setAborting();
        }
        break;
      case UserAction.ADD_EVENT:
        this.#newEventPresenter.setSaving();
        try {
          await this.#eventsModel.addEvent(updateType, event);
        } catch(err) {
          this.#newEventPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_EVENT:
        this.#eventPresenters.get(event.id).setDeleting();
        try {
          await this.#eventsModel.deleteEvent(updateType, event);
        } catch(err) {
          this.#eventPresenters.get(event.id).setAborting();
        }
        break;
    }

    this.#uiBlocker.unblock();
  };

  #handleModelEvent = (updateType, event) => {
    // В зависимости от типа изменений решаем, что делать:
    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить часть списка (например, когда поменялось описание)
        this.#eventPresenters.get(event.id).init(event);
        break;
      case UpdateType.MINOR:
        // - обновить список (добавление/удаление)
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        // - обновить всю доску (например, при переключении фильтра)
        this.#clearBoard({resetSortType: true});
        this.#renderBoard();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderBoard();
        break;
    }
  };

  #handleModeChange = () => {
    this.#newEventPresenter.destroy();
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;

    this.#clearBoard();
    this.#renderBoard();
  };
}
