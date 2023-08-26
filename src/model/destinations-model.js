import {getDestinationsData} from '../mock/destinations.js';

export default class DestinationsModel {
  #destinations = null;

  constructor() {
    this.#destinations = getDestinationsData();
  }

  get destinations() {
    return this.#destinations;
  }
}
