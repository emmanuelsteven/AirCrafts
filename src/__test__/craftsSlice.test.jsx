import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {
  getCrafts,
  findCraftDetails,
  noCraftDetails,
} from './craftSlice';

const mockAxios = new MockAdapter(axios);
const mockStore = configureStore([thunk]);
const store = mockStore({}); // Initialize a mock store

describe('craftSlice', () => {
  afterEach(() => {
    mockAxios.reset(); // Reset the mock after each test
    store.clearActions(); // Clear dispatched actions after each test
  });

  it('should fetch crafts and update state correctly on successful API call', async () => {
    const responseData = [
      { model: 'craft1', details: false },
      { model: 'craft2', details: false },
    ];

    mockAxios.onGet('https://api.api-ninjas.com/v1/aircraft?engine_type=jet&limit=20')
      .reply(200, responseData);

    await store.dispatch(getCrafts());

    const actions = store.getActions();
    expect(actions[0].type).toBe(getCrafts.pending.type);
    expect(actions[1].type).toBe(getCrafts.fulfilled.type);
    expect(actions[1].payload).toEqual(responseData);
    expect(actions[1].error).toBeFalsy();
  });

  it('should handle API error correctly and update state', async () => {
    const errorMessage = 'Failed to get craft';

    mockAxios.onGet('https://api.api-ninjas.com/v1/aircraft?engine_type=jet&limit=20')
      .reply(500, { message: errorMessage });

    try {
      await store.dispatch(getCrafts());
    } catch {}

    const actions = store.getActions();
    expect(actions[0].type).toBe(getCrafts.pending.type);
    expect(actions[1].type).toBe(getCrafts.rejected.type);
    expect(actions[1].error.message).toBe(errorMessage);
  });

  it('should update craft details correctly', () => {
    const initialState = {
      craft: [
        { model: 'craft1', details: false },
        { model: 'craft2', details: false },
      ],
      isLoading: false,
      error: null,
    };

    const expectedState = {
      craft: [
        { model: 'craft1', details: true },
        { model: 'craft2', details: false },
      ],
      isLoading: false,
      error: null,
    };

    const craftId = 'craft1';
    store.dispatch(findCraftDetails(craftId));

    const actions = store.getActions();
    expect(actions[0].type).toBe(findCraftDetails.type);
    expect(actions[0].payload).toBe(craftId);
    expect(store.getState().craft).toEqual(expectedState.craft);
  });

  it('should remove craft details correctly', () => {
    const initialState = {
      craft: [
        { model: 'craft1', details: true },
        { model: 'craft2', details: false },
      ],
      isLoading: false,
      error: null,
    };

    const expectedState = {
      craft: [
        { model: 'craft1', details: false },
        { model: 'craft2', details: false },
      ],
      isLoading: false,
      error: null,
    };

    const craftId = 'craft1';
    store.dispatch(noCraftDetails(craftId));

    const actions = store.getActions();
    expect(actions[0].type).toBe(noCraftDetails.type);
    expect(actions[0].payload).toBe(craftId);
    expect(store.getState().craft).toEqual(expectedState.craft);
  });
});
