import {getOffersData} from '../mock/offers.js';

export default class OffersModel {
  getOffers() {
    return getOffersData();
  }
}
