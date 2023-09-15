import ApiService from './framework/api-service.js';

const Method = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

const Path = {
  EVENTS: 'points',
  DESTINATIONS: 'destinations',
  OFFERS: 'offers',
};

export default class EventsApiService extends ApiService {
  get events() {
    return this._load({url: Path.EVENTS})
      .then(ApiService.parseResponse);
  }

  get destinations() {
    return this._load({url: Path.DESTINATIONS})
      .then(ApiService.parseResponse);
  }

  get offers() {
    return this._load({url: Path.OFFERS})
      .then(ApiService.parseResponse);
  }

  async updateEvent(event) {
    const response = await this._load({
      url: `${Path.EVENTS}/${event.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(event)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  #adaptToServer(event) {
    const adaptedEvent = {...event,
      'base_price': event.basePrice,
      'date_from': event.dateFrom instanceof Date ? event.dateFrom.toISOString() : null,
      'date_to': event.dateTo instanceof Date ? event.dateTo.toISOString() : null,
      'is_favorite': event.isFavorite,
    };

    delete adaptedEvent.basePrice;
    delete adaptedEvent.dateFrom;
    delete adaptedEvent.dateTo;
    delete adaptedEvent.isFavorite;

    return adaptedEvent;
  }
}
