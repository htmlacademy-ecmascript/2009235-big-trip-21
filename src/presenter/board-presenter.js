import {render} from '../framework/render.js';
import EventsListView from '../view/events-list-view.js';
import EventsMessageView from '../view/events-message-view.js';
import {MessageType, SortType} from '../const.js';
import EventPresenter from './event-presenter.js';
import SortPresenter from './sort-presenter.js';
import {startSort} from '../utils/sort.js';

export default class BoardPresenter {
  #boardContainer = null;
  #eventsModel = [];
  #destinationsModel = [];
  #offersModel = [];

  #eventPresenters = new Map();
  #currentSortType = SortType.DAY;

  #eventsListComponent = new EventsListView();

  constructor({boardContainer, eventsModel, destinationsModel, offersModel}) {
    this.#boardContainer = boardContainer;
    this.#eventsModel = eventsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;

    //обработчик-наблюдатель, который реагирует на изменения модели this.#eventsModel и вызывает #handleModelEvent
    this.#eventsModel.addObserver(this.#handleModelEvent);
  }

  get events() {
    return startSort(this.#eventsModel.events, this.#currentSortType);
  }

  init() {
    this.#renderBoard();

    //this.#addEventButtonClick();
  }

  #renderBoard() {
    if (this.#eventsModel.events.length === 0) {
      this.#renderNoEvents();
      return;
    }

    this.#renderSort();
    this.#renderList();
    this.#renderEvents();
  }

  #renderNoEvents() {
    render(new EventsMessageView(MessageType.NO_EVENTS), this.#boardContainer);
  }

  #renderSort() {
    const sortPresenter = new SortPresenter({
      sortContainer: this.#boardContainer,
      onSortTypeChange: this.#handleSortTypeChange,
    });

    sortPresenter.init();
  }

  #renderList() {
    render(this.#eventsListComponent, this.#boardContainer);
  }

  #renderEvents() {
    this.#eventsModel.events.forEach((event) => this.#renderEventItem(event));
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

  #clearEventsList() {
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();
  }

  #handleViewAction = (actionType, updateType, update) => {
    console.log(actionType, updateType, update);
    // Здесь будем вызывать обновление модели.
    // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // update - обновленные данные
  };

  #handleModelEvent = (updateType, data) => {
    console.log(updateType, data);
    // В зависимости от типа изменений решаем, что делать:
    // - обновить часть списка (например, когда поменялось описание)
    // - обновить список (например, когда задача ушла в архив)
    // - обновить всю доску (например, при переключении фильтра)
  };

  #handleModeChange = () => {
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;

    this.#clearEventsList();
    this.#renderEvents();
  };

  /*#addEventButtonClick() {
    const addEventButton = document.querySelector('.trip-main__event-add-btn');
    addEventButton.addEventListener('click', () => this.#renderEventAdd());
  }

  #renderEventAdd() {
    const eventAddComponent = new EventEditView({
      destinations: this.#boardDestinations,
      offers: this.#boardOffers,
      onEventEditSubmit: () => {
        remove(eventAddComponent);
      },
      onEventEditReset: () => {
        remove(eventAddComponent);
      },
    });
    render(eventAddComponent, this.#eventsListComponent.element, RenderPosition.AFTERBEGIN);
  }*/
}
