import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import CraftDescription from '../component/CraftDetails';

const mockStore = configureStore([]);

describe('CraftDescription', () => {
  it('renders craft details correctly', () => {
    const mockCrafts = [
      {
        population: 1,
        details: true,
        manufacturer: 'Airbus',
        model: 'A380',
        engine_type: 'Type A',
        max_speed_knots: 500,
        ceiling_ft: 40000,
        gross_weight_lbs: 800000,
        height_ft: 50,
        length_ft: 250,
        wing_span_ft: 200,
        range_nautical_miles: 1000,
      },
      // Add more craft objects for additional tests if needed
    ];

    const store = mockStore({
      crafts: { craft: mockCrafts },
    });

    const {} = render(
      <Provider store={store}>
        <MemoryRouter>
          <CraftDescription />
        </MemoryRouter>
      </Provider>,
    );

    // Assert the craft details and images

    // ...
  });
});
