import {render, replace, remove} from '../framework/render.js';
import EventItemView from '../view/event-item-view.js';
import EventEditView from '../view/event-edit-view.js';
import {isEscapeKey} from '../utils/common.js';

export default class EventPresenter {
  #eventsListContainer = {};

  #destinationsModel = [];
  #offersModel = [];

  #boardDestinations = [];
  #boardOffers = [];

  #event = {};
  #eventItemComponent = {};
  #eventEditComponent = {};

  constructor({eventsListContainer, destinationsModel, offersModel}) {
    this.#eventsListContainer = eventsListContainer;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  init(event) {
    this.#event = event;

    this.#boardDestinations = [...this.#destinationsModel.destinations];
    this.#boardOffers = [...this.#offersModel.offers];

    //console.log(this.#offersModel.getByType(event.type)); <= this.#boardOffers
    this.#eventItemComponent = new EventItemView({
      event: this.#event,
      eventTypeOffers: this.#offersModel.getByType(event.type),
      onEventFavorite: () => {},
      onEventRollup: this.#handleEventRollup,
    });

    //this.#offersModel.getByType(event.type))
    //this.#destinationsModel.getByName(event.destination))
    this.#eventEditComponent = new EventEditView({
      event: this.#event,
      destinations: this.#boardDestinations,
      offers: this.#boardOffers,
      onEventEditSubmit: this.#handleEventEditSubmit,
      onEventEditReset: this.#handleEventEditReset,
      onEventEditRollup: this.#handleEventEditRollup,
    });

    render(this.#eventItemComponent, this.#eventsListContainer);
  }

  #onDocumentKeydownEscape = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.#replaceFormToCard();
    }
  };

  #replaceCardToForm() {
    replace(this.#eventEditComponent, this.#eventItemComponent);
    document.addEventListener('keydown', this.#onDocumentKeydownEscape);
  }

  #replaceFormToCard() {
    replace(this.#eventItemComponent, this.#eventEditComponent);
    document.removeEventListener('keydown', this.#onDocumentKeydownEscape);
  }

  #removeCard() {
    remove(this.#eventEditComponent);
  }

  #handleEventRollup = () => {
    this.#replaceCardToForm();
  };

  #handleEventEditRollup = () => {
    this.#replaceFormToCard();
  };

  #handleEventEditSubmit = () => {
    this.#replaceFormToCard();
  };

  #handleEventEditReset = () => {
    this.#removeCard();
  };
}
