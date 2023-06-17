import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import CraftsDis from './CraftsDis';

const mockStore = configureStore([]);
const initialState = {
  crafts: {
    craft: [
      {
        model: 'Craft Model 1',
        manufacturer: 'Craft Manufacturer 1',
      },
      {
        model: 'Craft Model 2',
        manufacturer: 'Craft Manufacturer 2',
      },
    ],
    isLoading: false,
  },
};
const store = mockStore(initialState);
describe('CraftsDis', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CraftsDis />
        </MemoryRouter>
      </Provider>,
    );
  });

  it('should render loading text when isLoading is true', () => {
    const loadingText = screen.getByText('Loading...');
    expect(loadingText).toBeInTheDocument();
  });

  it('should render craft items when isLoading is false', () => {
    const craftHeaders = screen.getAllByTestId('craft-header');
    expect(craftHeaders).toHaveLength(2);
    expect(craftHeaders[0]).toHaveTextContent('Craft Manufacturer 1');
    expect(craftHeaders[1]).toHaveTextContent('Craft Manufacturer 2');
  });

  it('should navigate to craft details on craft button click', () => {
    const craftButton = screen.getAllByRole('button', { name: 'craft-lists' })[0];
    fireEvent.click(craftButton);
    // Add your assertions for the navigation logic here
  });

  it('should filter crafts based on search input', () => {
    const searchInput = screen.getByPlaceholderText('Search by craft model no:');
    fireEvent.change(searchInput, { target: { value: 'Model 1' } });
    const filteredCraftHeaders = screen.getAllByTestId('craft-header');
    expect(filteredCraftHeaders).toHaveLength(1);
    expect(filteredCraftHeaders[0]).toHaveTextContent('Craft Manufacturer 1');
  });
});
