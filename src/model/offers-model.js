import Observable from '../framework/observable.js';

export default class OffersModel extends Observable {
  #offers = [];
  #eventsApiService = null;

  constructor({eventsApiService}) {
    super();
    this.#eventsApiService = eventsApiService;
  }

  get offers() {
    return this.#offers;
  }

  async init() {
    try {
      this.#offers = await this.#eventsApiService.offers;
    } catch(err) {
      this.#offers = [];
      throw new Error('Can\'t download offers from the server');
    }
  }

  getByType(eventType) {
    return this.#offers.find((offer) => offer.type.toLowerCase() === eventType.toLowerCase()).offers;
  }
}
