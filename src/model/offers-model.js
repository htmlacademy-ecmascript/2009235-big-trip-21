import {getOffers} from '../mock/offers.js';

export default class OffersModel {
  #offers = [];
  #apiService = null;

  constructor({apiService}) {
    this.#offers = getOffers();
    this.#apiService = apiService;

    this.#apiService.offers.then((offers) => {
      console.log(offers);
    });
  }

  get offers() {
    return this.#offers;
  }

  getByType(eventType) {
    return this.#offers.find((offer) => offer.type.toLowerCase() === eventType.toLowerCase()).offers;
  }
}
