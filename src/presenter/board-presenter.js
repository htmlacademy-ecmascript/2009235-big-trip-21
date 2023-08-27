import {render, replace, remove} from '../framework/render.js';
import SortView from '../view/sort-view.js';
import EventsListView from '../view/events-list-view.js';
import EventItemView from '../view/event-item-view.js';
import EventEditView from '../view/event-edit-view.js';
import EventsMessageView from '../view/events-message-view.js';
import {isEscapeKey} from '../utils/common.js';
import {MessageType} from '../const.js';

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

    this.#renderBoard();

    //this.#addEventButtonClick();
  }

  #renderBoard() {
    if (this.#boardEvents.every((event) => event.isArchive)) {
      render(new EventsMessageView(MessageType.NO_EVENTS), this.#boardContainer);
      return;
    }

    render(this.#sortComponent, this.#boardContainer);
    render(this.#eventsListComponent, this.#boardContainer);

    this.#boardEvents.forEach((event) => {
      this.#renderEventItem(event);
    });
  }

  #renderEventItem(event) {
    const onDocumentKeydownEscape = (evt) => {
      if (isEscapeKey(evt)) {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener('keydown', onDocumentKeydownEscape);
      }
    };

    const eventItemComponent = new EventItemView({
      event: event,
      offers: this.#boardOffers,
      onEventFavoriteButton: () => {},
      onEventRollupButton: () => {
        replaceCardToForm();
        document.addEventListener('keydown', onDocumentKeydownEscape);
      },
    });

    const eventEditComponent = new EventEditView({
      event: event,
      destinations: this.#boardDestinations,
      offers: this.#boardOffers,
      onEventEditSubmitButton: () => {
        replaceFormToCard();
        document.removeEventListener('keydown', onDocumentKeydownEscape);
      },
      onEventEditResetButton: () => {
        remove(eventEditComponent);
      },
      onEventEditRollupButton: () => {
        replaceFormToCard();
        document.removeEventListener('keydown', onDocumentKeydownEscape);
      },
    });

    function replaceCardToForm() {
      replace(eventEditComponent, eventItemComponent);
    }

    function replaceFormToCard() {
      replace(eventItemComponent, eventEditComponent);
    }

    render(eventItemComponent, this.#eventsListComponent.element);
  }

  /*#addEventButtonClick() {
    const addEventButton = document.querySelector('.trip-main__event-add-btn');
    addEventButton.addEventListener('click', () => this.#renderEventAdd());
  }

  #renderEventAdd() {
    const eventAddComponent = new EventEditView({
      destinations: this.#boardDestinations,
      offers: this.#boardOffers,
      onEventEditSubmitButton: () => {
        remove(eventAddComponent);
      },
      onEventEditResetButton: () => {
        remove(eventAddComponent);
      },
    });
    render(eventAddComponent, this.#eventsListComponent.element, RenderPosition.AFTERBEGIN);
  }*/
}
