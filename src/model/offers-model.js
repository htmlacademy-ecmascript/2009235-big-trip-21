import Observable from '../framework/observable.js';

export default class OffersModel extends Observable {
  #offers = [];
  #eventsApiService = null;

  constructor({eventsApiService}) {
    super();
    this.#eventsApiService = eventsApiService;
  }

  async init() {
    try {
      this.#offers = await this.#eventsApiService.offers;
    } catch(err) {
      this.#offers = [];
      throw new Error('Can\'t download offers from the server');
    }
  }

  get offers() {
    return this.#offers;
  }

  getByType(eventType) {
    return this.#offers.find((offer) => offer.type.toLowerCase() === eventType.toLowerCase()).offers;
  }
}
