import React from 'react';
import { shallow } from 'enzyme'; // or use '@testing-library/react' for React Testing Library
import CraftDescription from './CraftDescription';

describe('CraftDescription', () => {
  it('should render without errors', () => {
    const wrapper = shallow(<CraftDescription />);
    expect(wrapper.exists()).toBe(true);
  });

  it('should render the craft details correctly', () => {
    // Mock the useSelector hook with sample data
    jest.mock('react-redux', () => ({
      useSelector: jest.fn().mockReturnValue([
        {
          manufacturer: 'Airbus',
          model: 'A380',
          engine_type: 'Jet',
          max_speed_knots: 600,
          ceiling_ft: 41000,
          gross_weight_lbs: 1200000,
          height_ft: 79,
          length_ft: 238,
          wing_span_ft: 261,
          range_nautical_miles: 8000,
        },
      ]),
    }));

    const wrapper = shallow(<CraftDescription />);
    const craftList = wrapper.find('.craft-list');
    expect(craftList).toHaveLength(1);

    // Assert the specific details are rendered correctly
    expect(craftList.find('.craft-dish').text()).toBe('Airbus');
    expect(craftList.find('.craft-API').at(0).text()).toBe('A380');
    expect(craftList.find('.craft-API').at(1).text()).toBe('Jet');
    // ...and so on for other details
  });

  // Add more test cases as needed to cover different scenarios
});
