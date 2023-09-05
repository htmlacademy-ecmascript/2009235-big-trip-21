import AbstractView from '../framework/view/abstract-view.js';

function createSortItemTemplate(sortItem) {
  const {type, isChecked, isDisabled} = sortItem;
  const abbreviatedType = type.replace('sort-', '');

  return (
    `<div class="trip-sort__item  trip-sort__item--${abbreviatedType}">
      <input id="${type}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="${type}" ${isChecked ? 'checked' : ''} ${isDisabled ? 'disabled' : ''}>
      <label class="trip-sort__btn" for="${type}">${abbreviatedType}</label>
    </div>`
  );
}

function createSortTemplate(sortItems) {
  const sortItemsTemplate = sortItems
    .map((sortItem) => createSortItemTemplate(sortItem))
    .join('');

  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${sortItemsTemplate}
    </form>`
  );
}

export default class SortView extends AbstractView {
  #sorting = [];
  #handleSortTypeChange = () => {};

  constructor({sorting, onSortTypeChange}) {
    super();
    this.#sorting = sorting;
    this.#handleSortTypeChange = onSortTypeChange;

    this.element.addEventListener('change', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSortTemplate(this.#sorting);
  }

  #sortTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.#handleSortTypeChange(evt.target.value);
  };
}
