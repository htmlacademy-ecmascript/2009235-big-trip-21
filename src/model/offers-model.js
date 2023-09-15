import {getOffers} from '../mock/offers.js';

export default class OffersModel {
  #offers = [];
  #apiService = null;

  constructor({apiService}) {
    this.#offers = getOffers();
    this.#apiService = apiService;

    this.#apiService.offers.then((offers) => {
      console.log(offers);
      // Есть проблема: cтруктура объекта похожа, но некоторые ключи называются иначе,
      // а ещё на сервере используется snake_case, а у нас camelCase.
      // Можно, конечно, переписать часть нашего клиентского приложения, но зачем?
      // Есть вариант получше - паттерн "Адаптер"
    });
  }

  get offers() {
    return this.#offers;
  }

  getByType(eventType) {
    return this.#offers.find((offer) => offer.type.toLowerCase() === eventType.toLowerCase()).offers;
  }
}
