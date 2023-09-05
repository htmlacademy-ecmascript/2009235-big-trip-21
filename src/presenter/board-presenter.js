import {render} from '../framework/render.js';
import SortView from '../view/sort-view.js';
import EventsListView from '../view/events-list-view.js';
import EventsMessageView from '../view/events-message-view.js';
import {MessageType, SortType} from '../const.js';
import EventPresenter from './event-presenter.js';
import {updateEventItem} from '../utils/event.js';
import {startSort, generateSort} from '../utils/sort.js';

export default class BoardPresenter {
  #boardContainer = null;
  #eventsModel = [];
  #destinationsModel = [];
  #offersModel = [];

  #boardEvents = [];
  #eventPresenters = new Map();
  #currentSortType = SortType.DAY;

  #sortComponent = null;
  #eventsListComponent = new EventsListView();

  constructor({boardContainer, eventsModel, destinationsModel, offersModel}) {
    this.#boardContainer = boardContainer;
    this.#eventsModel = eventsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  init() {
    this.#boardEvents = [...this.#eventsModel.events];


    this.#renderBoard();

    //this.#addEventButtonClick();
  }

  #renderBoard() {
    if (this.#boardEvents.length === 0) {
      this.#renderNoEvents();
      return;
    }

    this.#renderSort();
    this.#renderList();
    this.#sortEvents(this.#currentSortType);
    this.#renderEvents();
  }

  #renderNoEvents() {
    render(new EventsMessageView(MessageType.NO_EVENTS), this.#boardContainer);
  }

  #renderSort() {
    this.#sortComponent = new SortView({
      sorting: generateSort(),
      onSortTypeChange: this.#handleSortTypeChange,
    });

    render(this.#sortComponent, this.#boardContainer);
  }

  #renderList() {
    render(this.#eventsListComponent, this.#boardContainer);
  }

  #renderEvents() {
    this.#boardEvents.forEach((event) => {
      this.#renderEventItem(event);
    });
  }

  #renderEventItem(event) {
    const eventPresenter = new EventPresenter ({
      eventsListContainer: this.#eventsListComponent.element,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      onDataChange: this.#handleEventDataChange,
      onModeChange: this.#handleModeChange,
    });
    eventPresenter.init(event);
    this.#eventPresenters.set(event.id, eventPresenter);
  }

  #clearEventsList() {
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();
  }

  #handleEventDataChange = (updatedEvent) => {
    this.#boardEvents = updateEventItem(this.#boardEvents, updatedEvent);
    //Находим презентер для обновленного события и отрисовываем
    this.#eventPresenters.get(updatedEvent.id).init(updatedEvent);
  };

  #handleModeChange = () => {
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
  };

  #sortEvents(sortType) {
    this.#boardEvents = startSort(this.#boardEvents, sortType);
    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortEvents(sortType);

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
