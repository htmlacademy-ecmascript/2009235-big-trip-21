import {render, remove} from '../framework/render.js';
import EventsListView from '../view/events-list-view.js';
import EventsMessageView from '../view/events-message-view.js';
import {MessageType, SortType, UpdateType, UserAction, FilterType} from '../const.js';
import EventPresenter from './event-presenter.js';
import SortView from '../view/sort-view.js';
import {startSort, generateSort} from '../utils/sort.js';
import {startFilter} from '../utils/filter.js';
import NewEventPresenter from './new-event-presenter.js';

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
    this.#offersModel.addObserver(this.#handleModelEvent);
    this.#destinationsModel.addObserver(this.#handleModelEvent);
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
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newEventPresenter.init();
  }

  #renderBoard() {
    //const events = this.events;
    //const eventsCount = events.length; //убраны константы для изменения значений

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    if (this.events.length === 0) {
      this.#renderNoEvents();
      return;
    }

    this.#renderSort();
    render(this.#eventsListComponent, this.#boardContainer);
    this.#renderEvents(this.events);
  }

  #renderNoEvents() {
    this.#noEventsComponent = new EventsMessageView(MessageType[this.#filterType]);
    render(this.#noEventsComponent, this.#boardContainer);
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

  #handleViewAction = (actionType, updateType, updatedEvent) => {
    // Здесь будем вызывать обновление модели.
    // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // update - обновленные данные

    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this.#eventsModel.updateEvent(updateType, updatedEvent);
        break;
      case UserAction.ADD_EVENT:
        this.#eventsModel.addEvent(updateType, updatedEvent);
        break;
      case UserAction.DELETE_EVENT:
        this.#eventsModel.deleteEvent(updateType, updatedEvent);
        break;
    }
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
        //пока все необходимы данные для рабты не загрузим, оставляем loading...
        //console.log(this.#offersModel.offers.length, this.#destinationsModel.destinations.length, this.#eventsModel.events.length);
        if (this.#offersModel.offers.length === 0 || this.#destinationsModel.destinations.length === 0 || this.#eventsModel.events.length === 0) {
          return;
        }
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
