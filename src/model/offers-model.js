import {getOffersData} from '../mock/offers.js';

export default class OffersModel {
  #offers = null;

  constructor() {
    this.#offers = getOffersData();
  }

  get offers() {
    return this.#offers;
  }
}
