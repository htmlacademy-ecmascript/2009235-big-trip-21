import AbstractView from '../framework/view/abstract-view.js';
import {getInfoDatesTemplate} from '../utils/event.js';

const MAX_DESTINATIONS_COUNT = 3;

function createInfoTitleTemplate (eventsDestinations) {
  if (eventsDestinations.length === 0) {
    return '';
  }

  if (eventsDestinations.length <= MAX_DESTINATIONS_COUNT) {
    return `${eventsDestinations.map((destination, index) => index === 0 ? `${destination}` : ` — ${destination}`).join('')}`;
  }

  return `${eventsDestinations[0]} — ... — ${eventsDestinations[eventsDestinations.length - 1]}`;
}

function createInfoDatesTemplate (eventsWithDateFrom, eventsWithDateTo) {
  if (eventsWithDateFrom.length > 0 && eventsWithDateTo.length > 0) {
    return getInfoDatesTemplate(eventsWithDateFrom[0].dateFrom, eventsWithDateTo[eventsWithDateTo.length - 1].dateTo);
  }

  return '';
}

function createInfoTemplate(events, destinations, offers) {
  const eventsWithDateFrom = events.filter(({dateFrom}) => dateFrom !== null);
  const eventsWithDateTo = events.filter(({dateTo}) => dateTo !== null);
  const eventsWithDestination = events.filter(({destination}) => (destination !== null) && (destination !== ''));

  const eventsDestinations = eventsWithDestination.map(({destination}) => destinations.find((allDestination) => allDestination.id === destination).name);

  const eventsPrices = events.map((event) => {
    if (event.offers.length === 0) {
      return event.basePrice;
    }

    const eventAllOffers = offers.find((offer) => offer.type.toLowerCase() === event.type.toLowerCase()).offers;
    const eventOffersPrices = eventAllOffers.map(({id, price}) => event.offers.includes(id) ? price : 0);
    const eventPrice = event.basePrice + eventOffersPrices.reduce((acc, eventOffersPrice) => acc + eventOffersPrice, 0);
    return eventPrice;
  });

  const eventsTotalPrice = eventsPrices.reduce((acc, eventsPrice) => acc + eventsPrice, 0);

  return (
    `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${createInfoTitleTemplate(eventsDestinations)}</h1>
      <p class="trip-info__dates">${createInfoDatesTemplate (eventsWithDateFrom, eventsWithDateTo)}</p>
    </div>
    <p class="trip-info__cost">
      Total: €&nbsp;<span class="trip-info__cost-value">${eventsTotalPrice}</span>
    </p>
  </section>`
  );
}

export default class InfoView extends AbstractView {
  #events = [];
  #destinations = [];
  #offers = [];

  constructor({events, destinations, offers}) {
    super();
    this.#events = events;
    this.#destinations = destinations;
    this.#offers = offers;
  }

  get template() {
    return createInfoTemplate(this.#events, this.#destinations, this.#offers);
  }
}
