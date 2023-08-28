import {getOffers} from '../mock/offers.js';

export default class OffersModel {
  #offers = [];

  constructor() {
    this.#offers = getOffers();
  }

  get offers() {
    return this.#offers;
  }

  getByType(eventType) {
    return this.#offers.find((offer) => offer.type.toLowerCase() === eventType.toLowerCase()).offers;
  }
}
