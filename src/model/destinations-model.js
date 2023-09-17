import Observable from '../framework/observable.js';
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
      throw new Error('Can\'t download destinations from the server');
    }
  }

  get destinations() {
    return this.#destinations;
  }
}
