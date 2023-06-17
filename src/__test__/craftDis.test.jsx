import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import CraftsDis from './CraftsDis';
import store from '../Redux/store';

// Mock Redux store
jest.mock('../Redux/crafts/craftsSlice', () => {
  const craftData = [
    {
      model: 'A380',
      manufacturer: 'Airbus',
      population: 1,
    },
    {
      model: '737 Max',
      manufacturer: 'Boeing',
      population: 2,
    },
  ];

  return {
    __esModule: true,
    findCraftDetails: jest.fn(),
    getCrafts: jest.fn(),
    useSelector: jest.fn().mockReturnValue({
      craft: craftData,
      isLoading: false,
    }),
    useDispatch: jest.fn(),
    useNavigate: jest.fn(),
  };
});

describe('CraftsDis', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <Router>
          <CraftsDis />
        </Router>
      </Provider>
    );
  });

  test('renders loading state', () => {
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders crafts list after loading', () => {
    expect(screen.getByText('Airbus')).toBeInTheDocument();
    expect(screen.getByText('Boeing')).toBeInTheDocument();
  });

  test('handles craft details click', () => {
    fireEvent.click(screen.getByText('Airbus'));
    expect(screen.getByText('Craft details: A380')).toBeInTheDocument();
    expect(findCraftDetails).toHaveBeenCalledWith('A380');
  });

  test('handles search', () => {
    const searchInput = screen.getByPlaceholderText('Search by craft model no:');
    fireEvent.change(searchInput, { target: { value: 'A380' } });

    expect(screen.getByText('Airbus')).toBeInTheDocument();
    expect(screen.queryByText('Boeing')).not.toBeInTheDocument();
  });
});
