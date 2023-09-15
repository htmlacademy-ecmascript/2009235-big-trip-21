import {getDestinations} from '../mock/destinations.js';

export default class DestinationsModel {
  #destinations = [];
  #apiService = null;

  constructor({apiService}) {
    this.#destinations = getDestinations();

    this.#apiService = apiService;

    this.#apiService.destinations.then((destinations) => {
      console.log(destinations);
      // Есть проблема: cтруктура объекта похожа, но некоторые ключи называются иначе,
      // а ещё на сервере используется snake_case, а у нас camelCase.
      // Можно, конечно, переписать часть нашего клиентского приложения, но зачем?
      // Есть вариант получше - паттерн "Адаптер"
    });
  }

  get destinations() {
    return this.#destinations;
  }
}
