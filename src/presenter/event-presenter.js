import {render, replace, remove} from '../framework/render.js';
import EventItemView from '../view/event-item-view.js';
import EventEditView from '../view/event-edit-view.js';
import {isEscapeKey} from '../utils/common.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};
export default class EventPresenter {
  #eventsListContainer = {};
  #destinationsModel = [];
  #offersModel = [];
  #handleDataChange = () => {};
  #handleModeChange = () => {};

  #boardDestinations = [];
  #boardOffers = [];

  #event = {};
  #eventItemComponent = {};
  #eventEditComponent = {};

  #mode = Mode.DEFAULT;

  constructor({eventsListContainer, destinationsModel, offersModel, onDataChange, onModeChange}) {
    this.#eventsListContainer = eventsListContainer;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init(event) {
    this.#event = event;

    this.#boardDestinations = [...this.#destinationsModel.destinations];
    this.#boardOffers = [...this.#offersModel.offers];

    const prevEventItemComponent = this.#eventItemComponent;
    const prevEventEditComponent = this.#eventEditComponent;

    //console.log(this.#offersModel.getByType(event.type)); <= this.#boardOffers
    this.#eventItemComponent = new EventItemView({
      event: this.#event,
      eventTypeOffers: this.#offersModel.getByType(event.type),
      onEventFavorite: this.#handleEventFavorite,
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

    if (!prevEventItemComponent.element || !prevEventEditComponent.element) {
      render(this.#eventItemComponent, this.#eventsListContainer);
      return;
    }

    // Проверка на наличие в DOM необходима,
    // чтобы не пытаться заменить то, что не было отрисовано
    if (this.#mode === Mode.DEFAUL) {
      replace(this.#eventItemComponent, prevEventItemComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#eventEditComponent, prevEventEditComponent);
    }

    remove(prevEventItemComponent);
    remove(prevEventEditComponent);
  }

  destroy() {
    remove(this.#eventItemComponent);
    remove(this.#eventEditComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToCard();
    }
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
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceFormToCard() {
    replace(this.#eventItemComponent, this.#eventEditComponent);
    document.removeEventListener('keydown', this.#onDocumentKeydownEscape);
    this.#mode = Mode.DEFAULT;
  }

  #removeCard() {
    remove(this.#eventEditComponent);
  }

  #handleEventRollup = () => {
    this.#replaceCardToForm();
  };

  #handleEventFavorite = () => {
    this.#handleDataChange({...this.#event, isFavorite: !this.#event.isFavorite});
  };

  /*--------*/

  #handleEventEditRollup = () => {
    this.#replaceFormToCard();
  };

  #handleEventEditSubmit = (event) => {
    this.#handleDataChange(event);
    this.#replaceFormToCard();
  };

  #handleEventEditReset = () => {
    //this.#handleDataChange({...this.#event, isArchive: !this.#event.isArchive});
    this.#removeCard();
  };
}
