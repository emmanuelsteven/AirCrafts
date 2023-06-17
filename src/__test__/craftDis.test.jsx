import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CraftsDis from '../component/craftsDis';
import { getCrafts, findCraftDetails } from '../Redux/crafts/craftsSlice';
import '@testing-library/jest-dom/extend-expect';

jest.mock('react-redux');
jest.mock('react-router-dom');

describe('CraftsDis', () => {
  const mockCrafts = [
    { manufacturer: 'Airbus', model: 'A380', population: 1 },
    { manufacturer: 'Boeing', model: '737 Max', population: 2 },
  ];

  beforeEach(() => {
    useDispatch.mockReturnValue(jest.fn());
    useSelector.mockReturnValue({
      craft: mockCrafts,
      isLoading: false,
    });
    useNavigate.mockReturnValue(jest.fn());
  });

  test('renders the component', () => {
    render(<CraftsDis />);

    expect(screen.queryByText('Loading...')).toBeNull();

    expect(screen.getByText('Airbus')).toBeInTheDocument();
    expect(screen.getByText('Boeing')).toBeInTheDocument();
  });

  test('handles craft search', () => {
    const mockGetCrafts = jest.fn();
    useDispatch.mockReturnValue(mockGetCrafts);

    render(<CraftsDis />);

    const searchInput = screen.getByPlaceholderText('Search by craft model no:');

    fireEvent.change(searchInput, { target: { value: 'A380' } });

    expect(mockGetCrafts).toHaveBeenCalled();
    expect(searchInput.value).toBe('A380');
  });
});
