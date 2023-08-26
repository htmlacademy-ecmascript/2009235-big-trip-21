import AbstractView from '../framework/view/abstract-view.js';
import {humanizeEventDueDate, DateTimeFormat} from '../utils.js';

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
  if (eventDestination.pictures.length || eventDestination.description) {
    return `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      ${eventDestination.description ?
    `<p class="event__destination-description">${eventDestination.description}</p>`
    : ''}

      ${eventDestination.pictures.length ?
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
  if (eventAllOffers.length) {
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

function createEventEditTemplate(event, destinations, offers) {
  const {basePrice, dateFrom, dateTo, destination, type, add} = event;

  const eventDestination = destinations.find((allDestinatio) => allDestinatio.name.toLowerCase() === destination.toLowerCase());
  const eventAllOffers = offers.find((allOffer) => allOffer.type.toLowerCase() === type.toLowerCase()).offers;

  const startDateTimeInInput = humanizeEventDueDate(dateFrom, DateTimeFormat.DATE_TIME_IN_INPUT);
  const endDateTimeInInput = humanizeEventDueDate(dateTo, DateTimeFormat.DATE_TIME_IN_INPUT);

  return (
    `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>

              <div class="event__type-item">
                <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
                <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
                <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
                <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
                <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
                <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked="">
                <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
                <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
                <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
                <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
              </div>
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${type}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination}" list="destination-list-1">
          <datalist id="destination-list-1">
            <option value="Amsterdam"></option>
            <option value="Geneva"></option>
            <option value="Chamonix"></option>
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

export default class EventEditView extends AbstractView {
  #event = null;
  #destinations = null;
  #offers = null;

  constructor({event = BLANK_EVENT, destinations, offers}) {
    super();
    this.#event = event;
    this.#destinations = destinations;
    this.#offers = offers;
  }

  get template() {
    return createEventEditTemplate(this.#event, this.#destinations, this.#offers);
  }
}
