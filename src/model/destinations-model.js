import Observable from '../framework/observable.js';
export default class DestinationsModel extends Observable {
  #destinations = [];
  #eventsApiService = null;

  constructor({eventsApiService}) {
    super();
    this.#eventsApiService = eventsApiService;
  }

  get destinations() {
    return this.#destinations;
  }

  async init() {
    try {
      this.#destinations = await this.#eventsApiService.destinations;
    } catch(err) {
      this.#destinations = [];
      throw new Error('Can\'t download destinations from the server');
    }
  }
}
