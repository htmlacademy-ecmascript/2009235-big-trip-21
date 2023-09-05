import {render} from '../framework/render.js';
import SortView from '../view/sort-view.js';
import {generateSort} from '../utils/sort.js';

export default class SortPresenter {
  #sortContainer = null;
  #sorting = [];

  #handleSortTypeChange = () => {};

  constructor({sortContainer, onSortTypeChange}) {
    this.#sortContainer = sortContainer;
    this.#sorting = generateSort();
    this.#handleSortTypeChange = onSortTypeChange;
  }

  init() {
    render(new SortView({
      sorting: this.#sorting,
      onSortTypeChange: this.#handleSortTypeChange,
    }), this.#sortContainer);
  }
}
