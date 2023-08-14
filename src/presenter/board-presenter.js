import {render} from '../render.js';
import SortView from '../view/sort-view.js';
import EventsListView from '../view/events-list-view.js';
import EventItemView from '../view/event-item-view.js';
import EventEditView from '../view/event-edit-view.js';

const EVENTS_ITEM_COUNT = 3;

export default class BoardPresenter {
  sortComponent = new SortView();
  eventsListComponent = new EventsListView();

  constructor({boardContainer}) {
    this.boardContainer = boardContainer;
  }


  init() {
    render(this.sortComponent, this.boardContainer);
    render(this.eventsListComponent, this.boardContainer);
    render(new EventEditView(), this.eventsListComponent.getElement());

    for (let i = 0; i < EVENTS_ITEM_COUNT; i++) {
      render(new EventItemView(), this.eventsListComponent.getElement());
    }
  }
}
