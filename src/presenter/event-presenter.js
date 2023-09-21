import {render, replace, remove} from '../framework/render.js';
import EventItemView from '../view/event-item-view.js';
import EventEditView from '../view/event-edit-view.js';
import {UserAction, UpdateType} from '../const.js';
import {areDatesEqual} from '../utils/event.js';
import {isEscapeKey} from '../utils/common.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};
export default class EventPresenter {
  #eventsListContainer = null;

  #destinationsModel = null;
  #offersModel = null;

  #event = null;
  #eventItemComponent = null;
  #eventEditComponent = null;

  #mode = Mode.DEFAULT;

  #handleDataChange = () => {};
  #handleModeChange = () => {};

  constructor({eventsListContainer, destinationsModel, offersModel, onDataChange, onModeChange}) {
    this.#eventsListContainer = eventsListContainer;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init(event) {
    this.#event = event;

    const prevEventItemComponent = this.#eventItemComponent;
    const prevEventEditComponent = this.#eventEditComponent;

    this.#eventItemComponent = new EventItemView({
      event: this.#event,
      eventTypeOffers: this.#offersModel.getByType(event.type),
      destinations: this.#destinationsModel.destinations,
      onEventFavorite: this.#handleEventFavorite,
      onEventRollup: this.#handleEventRollup,
    });

    this.#eventEditComponent = new EventEditView({
      event: this.#event,
      destinations: this.#destinationsModel.destinations,
      offers: this.#offersModel.offers,
      onEventEditSubmit: this.#handleEventEditSubmit,
      onEventEditReset: this.#handleEventEditReset,
      onEventEditRollup: this.#handleEventEditRollup,
    });

    if (prevEventItemComponent === null || prevEventEditComponent === null) {
      render(this.#eventItemComponent, this.#eventsListContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#eventItemComponent, prevEventItemComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#eventItemComponent, prevEventEditComponent);
      this.#mode = Mode.DEFAULT;
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
      this.#eventEditComponent.reset(this.#event);
      this.#replaceFormToCard();
    }
  }

  setSaving() {
    if (this.#mode === Mode.EDITING) {
      this.#eventEditComponent.updateElement({
        isDisabled: true,
        isSaving: true,
      });
    }
  }

  setDeleting() {
    if (this.#mode === Mode.EDITING) {
      this.#eventEditComponent.updateElement({
        isDisabled: true,
        isDeleting: true,
      });
    }
  }

  setAborting() {
    if (this.#mode === Mode.DEFAULT) {
      this.#eventItemComponent.shake();
      return;
    }

    const resetFormState = () => {
      this.#eventEditComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#eventEditComponent.shake(resetFormState);
  }

  /*-----*/
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

  /*--------*/
  #onDocumentKeydownEscape = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.#eventEditComponent.reset(this.#event);
      this.#replaceFormToCard();
    }
  };

  #handleEventRollup = () => {
    this.#replaceCardToForm();
  };

  #handleEventFavorite = () => {
    this.#handleDataChange(
      UserAction.UPDATE_EVENT,
      UpdateType.MINOR,
      {
        ...this.#event,
        isFavorite: !this.#event.isFavorite
      }
    );
  };

  /*--------*/

  #handleEventEditRollup = () => {
    this.#eventEditComponent.reset(this.#event);
    this.#replaceFormToCard();
  };

  #handleEventEditSubmit = (updatedEvent) => {
    const isMinorUpdate = !areDatesEqual(this.#event.dateFrom, updatedEvent.dateFrom) ||
    !areDatesEqual(this.#event.dateTo, updatedEvent.dateTo) ||
    this.#event.basePrice !== updatedEvent.basePrice;

    this.#handleDataChange(
      UserAction.UPDATE_EVENT,
      isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
      updatedEvent,
    );
  };

  #handleEventEditReset = (event) => {
    this.#handleDataChange(
      UserAction.DELETE_EVENT,
      UpdateType.MINOR,
      event,
    );
  };
}
