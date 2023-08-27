import AbstractView from '../framework/view/abstract-view.js';
import {humanizeEventDueDate} from '../utils/event.js';
import {DateTimeFormat} from '../const.js';

function createEventItemOffersTemplate(eventOffers, eventTypeOffers) {
  if (eventOffers.length) {
    return `<h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
    ${eventOffers.map((eventOffer) => {
    const foundOffer = eventTypeOffers.offers.find((eventTypeOffer) => eventTypeOffer.id === eventOffer);
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

function createEventItemTemplate(event, offers) {
  const {basePrice, dateFrom, dateTo, destination, type, isFavorite} = event;
  const eventTypeOffers = offers.find((offer) => offer.type === type);

  const startTimeInContent = humanizeEventDueDate(dateFrom, DateTimeFormat.TIME);
  const startTimeInAtribut = humanizeEventDueDate(dateFrom, DateTimeFormat.DATE_TIME_IN_ATRIBUT);

  const endTimeInContent = humanizeEventDueDate(dateTo, DateTimeFormat.TIME);
  const endTimeInAtribut = humanizeEventDueDate(dateTo, DateTimeFormat.DATE_TIME_IN_ATRIBUT);

  const dateInContent = humanizeEventDueDate(dateFrom, DateTimeFormat.DATE);
  const dateInAtribut = humanizeEventDueDate(dateFrom, DateTimeFormat.DATE_IN_ATRIBUT);

  const favoriteClassName = isFavorite ? 'event__favorite-btn--active' : '';

  return (
    `<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="${dateInAtribut}">${dateInContent}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${type} ${destination}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${startTimeInAtribut}">${startTimeInContent}</time>
          —
          <time class="event__end-time" datetime="${endTimeInAtribut}">${endTimeInContent}</time>
        </p>
        <p class="event__duration">30M</p>
      </div>
      <p class="event__price">
        €&nbsp;<span class="event__price-value">${basePrice}</span>
      </p>
      ${createEventItemOffersTemplate(event.offers, eventTypeOffers)}
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
  #event = null;
  #offers = null;
  #onEventFavoriteButton = null;
  #onEventRollupButton = null;
  #favoriteButton = null;

  constructor({event, offers, onEventFavoriteButton, onEventRollupButton}) {
    super();
    this.#event = event;
    this.#offers = offers;
    this.#onEventFavoriteButton = onEventFavoriteButton;
    this.#onEventRollupButton = onEventRollupButton;

    this.#favoriteButton = this.element.querySelector('.event__favorite-btn');
    this.#favoriteButton.addEventListener('click', this.#clickFavoriteButton);

    this.element
      .querySelector('.event__rollup-btn')
      .addEventListener('click', this.#clickRollupButton);
  }

  get template() {
    return createEventItemTemplate(this.#event, this.#offers);
  }

  #clickFavoriteButton = (evt) => {
    evt.preventDefault();
    this.#favoriteButton.classList.toggle('event__favorite-btn--active');
    this.#onEventFavoriteButton(evt);
  };

  #clickRollupButton = (evt) => {
    evt.preventDefault();
    this.#onEventRollupButton(evt);
  };
}
