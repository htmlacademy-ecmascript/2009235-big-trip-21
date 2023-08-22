import {getDestinationsData} from '../mock/destinations.js';

export default class DestinationsModel {
  getDestinations() {
    return getDestinationsData();
  }
}
