import Observable from '../framework/observable.js';
import {UpdateType} from '../const.js';
export default class DestinationsModel extends Observable {
  #destinations = [];
  #apiService = null;

  constructor({apiService}) {
    super();
    this.#apiService = apiService;
  }

  async init() {
    try {
      this.#destinations = await this.#apiService.destinations;
    } catch(err) {
      this.#destinations = [];
    }

    this._notify(UpdateType.INIT);
  }

  get destinations() {
    return this.#destinations;
  }
}
