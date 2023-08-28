import AbstractView from '../framework/view/abstract-view.js';

function createEventsMessageTemplate(message) {
  return (
    `<p class="trip-events__msg">${message}</p>`
  );
}

export default class EventsMessageView extends AbstractView {
  #message = 'Oops...';

  constructor(message) {
    super();
    this.#message = message;
  }

  get template() {
    return createEventsMessageTemplate(this.#message);
  }
}
