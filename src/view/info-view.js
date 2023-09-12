import AbstractView from '../framework/view/abstract-view.js';
import {getInfoDatesTemplate} from '../utils/event.js';

function createInfoTitleTemplate (events) {
  if (events.length === 0) {
    return 'No events whith destination';
  }

  if (events.length <= 3) {
    return `${events.map(({destination}, index) => index === 0 ? `${destination}` : ` — ${destination}`).join('')}`;
  }

  return `${events[0].destination} — ... — ${events[events.length - 1].destination}`;
}

function createInfoTemplate(events, offers) {
  const eventsWhithDateFrom = events.filter(({dateFrom}) => dateFrom !== null);
  const eventsWhithDateTo = events.filter(({dateTo}) => dateTo !== null);
  const eventsWhithDestination = events.filter(({destination}) => destination !== null);

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
      <h1 class="trip-info__title">${createInfoTitleTemplate(eventsWhithDestination)}</h1>
      <p class="trip-info__dates">${getInfoDatesTemplate(eventsWhithDateFrom[0].dateFrom, eventsWhithDateTo[eventsWhithDateTo.length - 1].dateTo)}</p>
    </div>
    <p class="trip-info__cost">
      Total: €&nbsp;<span class="trip-info__cost-value">${eventsTotalPrice}</span>
    </p>
  </section>`
  );
}

export default class InfoView extends AbstractView {
  #events = [];
  #offers = [];

  constructor({events, offers}) {
    super();
    this.#events = events;
    this.#offers = offers;
  }

  get template() {
    return createInfoTemplate(this.#events, this.#offers);
  }
}
