import {render} from '../framework/render.js';
import SortView from '../view/sort-view.js';
import EventsListView from '../view/events-list-view.js';
import EventItemView from '../view/event-item-view.js';
import EventEditView from '../view/event-edit-view.js';
export default class BoardPresenter {
  #boardContainer = null;
  #eventsModel = null;
  #destinationsModel = null;
  #offersModel = null;

  #boardEvents = null;
  #boardDestinations = null;
  #boardOffers = null;

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
    this.#boardDestinations = [...this.#destinationsModel.destinations];
    this.#boardOffers = [...this.#offersModel.offers];

    render(this.#sortComponent, this.#boardContainer);
    render(this.#eventsListComponent, this.#boardContainer);

    render(new EventEditView({
      event: this.#boardEvents[0],
      destinations: this.#boardDestinations,
      offers: this.#boardOffers,
    }), this.#eventsListComponent.element);

    for (let i = 1; i < this.#boardEvents.length; i++) {
      this.#renderEvent({
        event: this.#boardEvents[i],
        offers: this.#boardOffers,
      });
    }
  }

  #renderEvent(event) {
    const eventComponent = new EventItemView(event);
    render(eventComponent, this.#eventsListComponent.element);
  }
}
