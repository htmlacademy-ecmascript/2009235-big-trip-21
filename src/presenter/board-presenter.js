
import {render} from '../render.js';
import TripSortView from '../view/trip-sort-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import TripEventItemView from '../view/trip-event-item-view.js';
import TripEventEditView from '../view/trip-event-edit-view.js';

const TRIP_ITEM_COUNT = 3;

export default class BoardPresenter {
  sortComponent = new TripSortView();
  eventsListComponent = new TripEventsListView();

  constructor({boardContainer}) {
    this.boardContainer = boardContainer;
  }


  init() {
    render(this.sortComponent, this.boardContainer);
    render(this.eventsListComponent, this.boardContainer);
    render(new TripEventEditView(), this.eventsListComponent.getElement());

    for (let i = 0; i < TRIP_ITEM_COUNT; i++) {
      render(new TripEventItemView(), this.eventsListComponent.getElement());
    }
  }
}
