import {remove, render, RenderPosition} from '../framework/render.js';
import EventEditView from '../view/event-edit-view.js';
import {UserAction, UpdateType} from '../const.js';
import {isEscapeKey} from '../utils/common.js';

export default class NewEventPresenter {
  #eventsListContainer = null;

  #destinationsModel = null;
  #offersModel = null;

  #handleDataChange = () => {};
  #handleDestroy = () => {};

  #eventEditComponent = null;

  constructor({eventsListContainer, destinationsModel, offersModel, onDataChange, onDestroy}) {
    this.#eventsListContainer = eventsListContainer;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init() {
    if (this.#eventEditComponent !== null) {
      return;
    }

    this.#eventEditComponent = new EventEditView({
      destinations: this.#destinationsModel.destinations,
      offers: this.#offersModel.offers,
      onEventEditSubmit: this.#handleEventEditSubmit,
      onEventEditReset: this.#handleEventEditReset,
    });

    render(this.#eventEditComponent, this.#eventsListContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#onDocumentKeydownEscape);
  }

  destroy() {
    if (this.#eventEditComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#eventEditComponent);
    this.#eventEditComponent = null;

    document.removeEventListener('keydown', this.#onDocumentKeydownEscape);
  }

  #handleEventEditSubmit = (addedEvent) => {
    this.#handleDataChange(
      UserAction.ADD_EVENT,
      UpdateType.MINOR,
      addedEvent,
    );
    this.destroy();
  };

  #handleEventEditReset = () => {
    this.destroy();
  };

  #onDocumentKeydownEscape = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.destroy();
    }
  };
}
