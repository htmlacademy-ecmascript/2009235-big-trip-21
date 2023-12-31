import ApiService from '../framework/api-service.js';
import EventAdapter from '../adapters/event-adapter.js';

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
  get destinations() {
    return this._load({url: Path.DESTINATIONS})
      .then(ApiService.parseResponse);
  }

  get offers() {
    return this._load({url: Path.OFFERS})
      .then(ApiService.parseResponse);
  }

  get events() {
    return this._load({url: Path.EVENTS})
      .then(ApiService.parseResponse);
  }

  async updateEvent(event) {
    const response = await this._load({
      url: `${Path.EVENTS}/${event.id}`,
      method: Method.PUT,
      body: JSON.stringify(EventAdapter.adaptToServer(event)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  async addEvent(event) {
    const response = await this._load({
      url: Path.EVENTS,
      method: Method.POST,
      body: JSON.stringify(EventAdapter.adaptToServer(event)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  async deleteEvent(event) {
    const response = await this._load({
      url: `${Path.EVENTS}/${event.id}`,
      method: Method.DELETE,
    });

    return response;
  }
}
