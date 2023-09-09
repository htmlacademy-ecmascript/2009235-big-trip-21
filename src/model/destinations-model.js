import {getDestinations} from '../mock/destinations.js';

export default class DestinationsModel {
  #destinations = [];

  constructor() {
    this.#destinations = getDestinations();
  }

  get destinations() {
    return this.#destinations;
  }
}