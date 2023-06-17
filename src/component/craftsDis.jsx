import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { findCraftDetails, getCrafts } from '../Redux/crafts/craftsSlice';
import { ArrowIcon, SearchIcon } from './Icons';
import airbus from '../imgs/Airbus-A380.jpeg';
import boeing from '../imgs/Boeing-737-Max.jpeg';

const CraftsDis = () => {
  const { craft, isLoading } = useSelector((state) => state.crafts);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [filteredCrafts, setFilteredCrafts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    dispatch(getCrafts());
  }, [dispatch]);
  useEffect(() => {
    setFilteredCrafts(craft);
  }, [craft]);
  const handleJobDetails = (craftId) => {
    dispatch(findCraftDetails(craftId));
    navigate(`/crafts/${craftId}`);
  };
  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    const filtered = craft.filter((item) => item.model
      .toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredCrafts(filtered);
  };
  if (isLoading) {
    return (
      <div className="loading">
        <p>Loading...</p>
      </div>
    );
  }
  return (
    <div className="crafts-container">
      <div className="search-container">
        <div className="search-input-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search by craft model no:"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="search-icon-container">
          <SearchIcon />
        </div>

      </div>
      <div className="crafts">
        {filteredCrafts.map((item, index) => (
          <button
            type="button"
            className="craft-lists"
            key={item.population}
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)),
            url("${index === 0 ? airbus : boeing}")`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
            }}
            onClick={() => handleJobDetails(item.model)}
            tabIndex={0}
          >
            <ArrowIcon />
            <h1 className="craft-header">{item.manufacturer}</h1>
            <h3 className="craft-model">Model no:</h3>
            <h4 className="city-number">{item.model}</h4>
          </button>
        ))}
      </div>
    </div>
  );
};
export default CraftsDis;
