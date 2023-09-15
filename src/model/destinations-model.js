import {getDestinations} from '../mock/destinations.js';

export default class DestinationsModel {
  #destinations = [];
  #apiService = null;

  constructor({apiService}) {
    this.#destinations = getDestinations();

    this.#apiService = apiService;

    this.#apiService.destinations.then((destinations) => {
      console.log(destinations);
    });
  }

  get destinations() {
    return this.#destinations;
  }
}
