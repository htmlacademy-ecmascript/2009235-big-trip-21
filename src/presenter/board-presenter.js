import {render} from '../framework/render.js';
import SortView from '../view/sort-view.js';
import EventsListView from '../view/events-list-view.js';
import EventsMessageView from '../view/events-message-view.js';
import {MessageType} from '../const.js';
import EventPresenter from './event-presenter.js';
import {updateEventItem} from '../utils/event.js';

export default class BoardPresenter {
  #boardContainer = {};
  #eventsModel = [];
  #destinationsModel = [];
  #offersModel = [];

  #boardEvents = [];
  #eventPresenters = new Map();

  #sortComponent = new SortView();
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
    if (this.#boardEvents.every((event) => event.isArchive)) {
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
      onDataChange: this.#handleEventChange,
      onModeChange: this.#handleModeChange,
    });
    eventPresenter.init(event);
    this.#eventPresenters.set(event.id, eventPresenter);
  }

  #clearEventsList() {
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();
  }

  #handleEventChange = (updatedEvent) => {
    this.#boardEvents = updateEventItem(this.#boardEvents, updatedEvent);
    this.#eventPresenters.get(updatedEvent.id).init(updatedEvent);
  };

  #handleModeChange = () => {
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
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
