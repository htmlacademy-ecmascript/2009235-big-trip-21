import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {humanizeEventDueDate} from '../utils/event.js';
import {DateTimeFormat} from '../const.js';

const BLANK_EVENT = {
  basePrice: 0,
  dateFrom: new Date(),
  dateTo: new Date(),
  destination: 'Amsterdam',
  isFavorite: false,
  offers: [],
  type: 'taxi',
  add: true,
};

function createEventAddButtonsTemplate() {
  return (
    `<button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
    <button class="event__reset-btn" type="reset">Cancel</button>`
  );
}

function createEventEditButtonsTemplate() {
  return (
    `<button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
    <button class="event__reset-btn" type="reset">Delete</button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>`
  );
}

function createEventDestinationsTemplate(eventDestination) {
  if (eventDestination) {
    return `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      ${eventDestination.description ?
    `<p class="event__destination-description">${eventDestination.description}</p>`
    : ''}

      ${eventDestination.pictures.length > 0 ?
    `<div class="event__photos-container">
        <div class="event__photos-tape">
          ${eventDestination.pictures.map((picture) => `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`).join('')}
        </div>
      </div>` : ''}
    </section>`;
  }

  return '';
}

function createEventOffersTemplate(eventAllOffers, eventOffers) {
  if (eventAllOffers.length > 0) {
    return `<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

    <div class="event__available-offers">
      ${eventAllOffers.map((eventAllOffer) => {
    const checked = eventOffers.find((eventOffer) => eventOffer === eventAllOffer.id);
    return `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="${eventAllOffer.title}" type="checkbox" name="${eventAllOffer.title}" ${checked ? 'checked' : ''}>
        <label class="event__offer-label" for="${eventAllOffer.title}">
          <span class="event__offer-title">${eventAllOffer.title}</span>
          +€&nbsp;
          <span class="event__offer-price">${eventAllOffer.price}</span>
        </label>
      </div>`;
  }).join('')}
    </div>
  </section>`;
  }

  return '';
}

function createEventEditTypeTemplate(offers, currentOffer) {
  const capitalizedOffersTypes = (offerType) => offerType.replace(offerType[0], offerType[0].toUpperCase());
  if (offers.length > 0) {
    return offers.map((offer) => `
    <div class="event__type-item">
      <input id="event-type-${offer.type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${offer.type}" ${currentOffer === offer.type ? 'checked' : ''}>
      <label class="event__type-label  event__type-label--${offer.type}" for="event-type-${offer.type}-1">${capitalizedOffersTypes(offer.type)}</label>
    </div>
  `).join('');
  }

  return '';
}


function createEventEditTemplate(event, destinations, offers) {
  const {basePrice, dateFrom, dateTo, currentDestination, add, currentOffer} = event;

  const eventDestination = destinations.find((allDestination) => allDestination.name.toLowerCase() === currentDestination.toLowerCase());
  const eventAllOffers = offers.find((allOffer) => allOffer.type.toLowerCase() === currentOffer.toLowerCase()).offers;

  const startDateTimeInInput = humanizeEventDueDate(dateFrom, DateTimeFormat.DATE_TIME_IN_INPUT);
  const endDateTimeInInput = humanizeEventDueDate(dateTo, DateTimeFormat.DATE_TIME_IN_INPUT);

  return (
    `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${currentOffer}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
              ${createEventEditTypeTemplate(offers, currentOffer)}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${currentOffer}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${currentDestination}" list="destination-list-1">
          <datalist id="destination-list-1">
            ${destinations.map((destination) => `<option value="${destination.name}"></option>`).join('')}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${startDateTimeInInput}">
          —
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${endDateTimeInInput}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            €
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
        </div>

        ${add ? createEventAddButtonsTemplate() : createEventEditButtonsTemplate()}
      </header>
      <section class="event__details">
      ${createEventOffersTemplate(eventAllOffers, event.offers)}
      ${createEventDestinationsTemplate(eventDestination)}
      </section>
    </form>
  </li>`
  );
}

export default class EventEditView extends AbstractStatefulView {
  #destinations = [];
  #offers = [];

  #handleEventEditSubmit = () => {};
  #handleEventEditReset = () => {};
  #handleEventEditRollup = () => {};

  constructor({
    event = BLANK_EVENT,
    destinations,
    offers,
    onEventEditSubmit,
    onEventEditReset,
    onEventEditRollup,
  }) {
    super();
    this._setState(EventEditView.parseEventToState(event));
    this.#destinations = destinations;
    this.#offers = offers;

    this.#handleEventEditSubmit = onEventEditSubmit;
    this.#handleEventEditReset = onEventEditReset;
    this.#handleEventEditRollup = onEventEditRollup;

    this._restoreHandlers();
  }

  reset(event) {
    this.updateElement(
      EventEditView.parseEventToState(event),
    );
  }

  _restoreHandlers() {
    this.element
      .querySelector('form')
      .addEventListener('submit', this.#eventEditSubmitHandler);

    this.element
      .querySelector('.event__reset-btn')
      .addEventListener('click', this.#eventEditResetHandler);

    if (!this._state.add) {
      this.element
        .querySelector('.event__rollup-btn')
        .addEventListener('click', this.#eventEditRollupHandler);
    }
    /*-------*/
    this.element
      .querySelector('.event__type-group')
      .addEventListener('change', this.#eventEditTypeHandler);

    //не забыть вынести отдельно
    if ((this.#offers.find((allOffer) => allOffer.type.toLowerCase() === this._state.currentOffer.toLowerCase()).offers).length > 0) {
      this.element
        .querySelector('.event__available-offers')
        .addEventListener('change', this.#eventEditOffersHandler);
    }
    /*-------*/
    this.element.querySelector('.event__input--destination')
      .addEventListener('input', this.#destinationInputHandler);

    this.element.querySelector('.event__input[name="event-start-time"]')
      .addEventListener('change', this.#dateFromInputHandler);

    this.element.querySelector('.event__input[name="event-end-time"]')
      .addEventListener('change', this.#dateToInputHandler);

    this.element.querySelector('.event__input--price')
      .addEventListener('input', this.#basePriceInputHandler);
  }

  get template() {
    return createEventEditTemplate(this._state, this.#destinations, this.#offers);
  }

  #eventEditSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleEventEditSubmit(EventEditView.parseStateToEvent(this._state));
  };

  #eventEditResetHandler = (evt) => {
    evt.preventDefault();
    this.#handleEventEditReset();
  };

  #eventEditRollupHandler = (evt) => {
    evt.preventDefault();
    this.#handleEventEditRollup();
  };

  /*--------*/
  #eventEditTypeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      currentOffer: evt.target.value,
    });
    this._setState({
      type: evt.target.value,
    });
  };

  #eventEditOffersHandler = (evt) => {
    evt.preventDefault();
    const eventAllOffers = this.#offers.find((allOffer) => allOffer.type.toLowerCase() === this._state.currentOffer.toLowerCase()).offers; //вынести отдельно
    const offerID = eventAllOffers.find((allOffer) => allOffer.title.toLowerCase() === evt.target.name.toLowerCase()).id;
    const oldEventOffers = this._state.offers;

    let newEventOffers = oldEventOffers;
    if (evt.target.checked) {
      newEventOffers.push(offerID);
    } else {
      newEventOffers = newEventOffers.filter((id) => id !== offerID);
    }

    this._setState({
      offers: newEventOffers,
    });
  };

  /*-------*/
  #destinationInputHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      currentDestination: evt.target.value,
    });
    this._setState({
      destination: evt.target.value,
    });
  };

  #dateFromInputHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      dateFrom: evt.target.value,
    });
  };

  #dateToInputHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      dateTo: evt.target.value,
    });
  };

  #basePriceInputHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      basePrice: evt.target.value,
    });
  };

  /*----------*/
  static parseEventToState(event) {
    return {...event,
      currentOffer: event.type,
      currentDestination: event.destination,
    };
  }

  static parseStateToEvent(state) {
    const event = {...state};

    delete event.currentOffer;
    delete event.currentDestination;

    return event;
  }
}
