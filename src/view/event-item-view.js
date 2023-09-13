import AbstractView from '../framework/view/abstract-view.js';
import {humanizeEventDueDate, heEncode} from '../utils/event.js';
import {DateTimeFormat} from '../const.js';
import {getEventDuration} from '../utils/event.js';

function createEventItemOffersTemplate(eventOffers, eventTypeOffers) {
  if (eventOffers.length > 0) {
    return `<h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
    ${eventOffers.map((eventOffer) => {
    const foundOffer = eventTypeOffers.find((eventTypeOffer) => eventTypeOffer.id === eventOffer);
    return `<li class="event__offer">
        <span class="event__offer-title">${foundOffer.title}</span>
        +€&nbsp;
        <span class="event__offer-price">${foundOffer.price}</span>
    </li>`;
  }).join('')}
  </ul>`;
  }

  return '';
}

function createEventItemTemplate(event, eventTypeOffers, destinations) {
  const {basePrice, dateFrom, dateTo, type, destination, isFavorite, offers} = event;

  const startTimeInContent = humanizeEventDueDate(dateFrom, DateTimeFormat.TIME);
  const startTimeInAtribut = humanizeEventDueDate(dateFrom, DateTimeFormat.DATE_TIME_IN_ATRIBUT);

  const endTimeInContent = humanizeEventDueDate(dateTo, DateTimeFormat.TIME);
  const endTimeInAtribut = humanizeEventDueDate(dateTo, DateTimeFormat.DATE_TIME_IN_ATRIBUT);

  const dateInContent = humanizeEventDueDate(dateFrom, DateTimeFormat.DATE);
  const dateInAtribut = humanizeEventDueDate(dateFrom, DateTimeFormat.DATE_IN_ATRIBUT);

  const eventDestination = destinations.find((allDestination) => allDestination.id === destination);
  const eventDestinationName = eventDestination ? eventDestination.name : '';

  const favoriteClassName = isFavorite ? 'event__favorite-btn--active' : '';

  return (
    `<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="${dateInAtribut}">${dateInContent}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${type} ${heEncode(eventDestinationName)}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${startTimeInAtribut}">${startTimeInContent}</time>
          —
          <time class="event__end-time" datetime="${endTimeInAtribut}">${endTimeInContent}</time>
        </p>
        <p class="event__duration">${getEventDuration(dateTo, dateFrom)}</p>
      </div>
      <p class="event__price">
        €&nbsp;<span class="event__price-value">${basePrice}</span>
      </p>
      ${createEventItemOffersTemplate(offers, eventTypeOffers)}
      <button class="event__favorite-btn ${favoriteClassName}" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28" focusable="false" >
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"></path>
        </svg>
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`
  );
}

export default class EventItemView extends AbstractView {
  #event = [];
  #eventTypeOffers = [];
  #destinations = [];
  #handleEventFavorite = () => {};
  #handleEventRollup = () => {};

  constructor({event, eventTypeOffers, destinations, onEventFavorite, onEventRollup}) {
    super();
    this.#event = event;
    this.#eventTypeOffers = eventTypeOffers;
    this.#destinations = destinations;
    this.#handleEventFavorite = onEventFavorite;
    this.#handleEventRollup = onEventRollup;

    this.element
      .querySelector('.event__favorite-btn')
      .addEventListener('click', this.#eventFavoriteHandler);

    this.element
      .querySelector('.event__rollup-btn')
      .addEventListener('click', this.#eventRollupHandler);
  }

  get template() {
    return createEventItemTemplate(this.#event, this.#eventTypeOffers, this.#destinations);
  }

  #eventFavoriteHandler = (evt) => {
    evt.preventDefault();
    this.#handleEventFavorite();
  };

  #eventRollupHandler = (evt) => {
    evt.preventDefault();
    this.#handleEventRollup();
  };
}
