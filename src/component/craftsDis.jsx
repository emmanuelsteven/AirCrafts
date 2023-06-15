import '../styles/craft.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCrafts, findJobDetails, noJobDetails } from '../Redux/crafts/craftsSlice';
import { ArrowIcon } from './Icons';
// import boeing from '../assets/boeing.jpeg';

const CraftsDis = () => {
  const { craft, isLoading } = useSelector((state) => state.crafts);
  // const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCrafts());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="loading">
        <p>Loading...</p>
      </div>
    );
  }

  const handleJobDetails = (jobId) => {
    const job = craft.find((findjob) => findjob.model === jobId);
    if (job && job.details) {
      dispatch(findJobDetails(jobId));
    } else {
      dispatch(noJobDetails(jobId));
    }
    navigate(`/${jobId}`);
  };
  return (

    <div className="crafts-container">
      {/* <img src={boeing} alt="craft" /> */}
      <div className="crafts">
        {craft.map((item) => (
          <div
            className="craft-lists"
            key={item.population}
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${craft.image})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
            }}
            onClick={() => handleJobDetails(item.model)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleCityClick(item);
              }
            }}
            tabIndex={0}
          >
            <ArrowIcon />
            <h1 className="city-header">{item.manufacturer}</h1>
            <h3 className="craft-model">Model no:</h3>
            <h4 className="city-number">{item.model}</h4>
          </div>
        ))}
        ;
        {/* <div>
          {craft.map((craft) => (
            <img key={craft.id} src={craft.imageUrl} alt={craft.name} />
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default CraftsDis;
