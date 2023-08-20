import {render} from '../render.js';
import SortView from '../view/sort-view.js';
import EventsListView from '../view/events-list-view.js';
import EventItemView from '../view/event-item-view.js';
import EventEditView from '../view/event-edit-view.js';
export default class BoardPresenter {
  sortComponent = new SortView();
  eventsListComponent = new EventsListView();

  constructor({boardContainer, eventsModel, destinationsModel, offersModel}) {
    this.boardContainer = boardContainer;
    this.eventsModel = eventsModel;
    this.destinationsModel = destinationsModel;
    this.offersModel = offersModel;
  }

  init() {
    this.boardEvents = [...this.eventsModel.getEvents()];
    this.boardDestinations = [...this.destinationsModel.getDestinations()];
    this.boardOffers = [...this.offersModel.getOffers()];

    render(this.sortComponent, this.boardContainer);
    render(this.eventsListComponent, this.boardContainer);

    render(new EventEditView({
      event: this.boardEvents[0],
      destinations: this.boardDestinations,
      offers: this.boardOffers,
    }), this.eventsListComponent.getElement());

    for (let i = 1; i < this.boardEvents.length; i++) {
      render(new EventItemView({
        event: this.boardEvents[i],
        offers: this.boardOffers,
      }), this.eventsListComponent.getElement());
    }
  }
}
