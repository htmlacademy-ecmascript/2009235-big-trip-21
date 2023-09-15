import Observable from '../framework/observable.js';
import {UpdateType} from '../const.js';

export default class OffersModel extends Observable {
  #offers = [];
  #apiService = null;

  constructor({apiService}) {
    super();
    this.#apiService = apiService;
  }

  async init() {
    try {
      this.#offers = await this.#apiService.offers;
    } catch(err) {
      this.#offers = [];
    }

    this._notify(UpdateType.INIT);
  }

  get offers() {
    return this.#offers;
  }

  getByType(eventType) {
    return this.#offers.find((offer) => offer.type.toLowerCase() === eventType.toLowerCase()).offers;
  }
}
