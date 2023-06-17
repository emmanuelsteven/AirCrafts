import '../styles/craftDetails.css';
import { useSelector } from 'react-redux';
import { BackArrow, ChevronL } from './Icons';
import airbus from '../imgs/Airbus-A380.jpeg';
import boeing from '../imgs/Boeing-737-Max.jpeg';

const CraftDescription = () => {
  const chosenCrafts = useSelector((state) => state.crafts.craft
    .filter((craft) => craft.details === true));
  return (
    <div className="Detail-container">
      <div className="detail-sect">
        {chosenCrafts.map((item, index) => (
          <div
            className="crafty"
            key={item.population}
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)),
            url("${index === 0 ? airbus : boeing}")`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
            }}
          >
            <div className="B-arrow">
              <ChevronL />
            </div>
          </div>
        ))}
      </div>
      <div className="craftsD">
        {chosenCrafts.map((item) => (
          <div
            className="craft-list"
            key={item.population}
          >

            <ul className="craft-tab">
              <li className="craftD-model">
                <div className="craft-dish">{ item.manufacturer }</div>
              </li>
              <li className="craftD-model">
                <div className="craft-dis">Model no:</div>
                <div className="craft-API">
                  {item.model}
                  <span className="Bb-arrow">
                    <BackArrow />
                  </span>
                </div>
              </li>
              <li className="craftD-model">
                <div className="craft-dis"> engine_type:</div>
                <div className="craft-API">
                  {item.engine_type}
                  {' '}
                  <span className="Bb-arrow">
                    <BackArrow />
                  </span>
                </div>
              </li>
              <li className="craftD-model">
                <div className="craft-dis"> Max speed:</div>
                <div className="craft-API">
                  {item.max_speed_knots}
                  {' '}
                  <span className="Bb-arrow">
                    <BackArrow />
                  </span>
                </div>
              </li>
              <li className="craftD-model">
                <div className="craft-dis"> Ceiling: </div>
                <div className="craft-API">
                  {item.ceiling_ft}
                  {' '}
                  <span className="Bb-arrow">
                    <BackArrow />
                  </span>
                </div>
              </li>
              <li className="craftD-model">
                <div className="craft-dis">  Gross weight: </div>
                <div className="craft-API">
                  {item.gross_weight_lbs}
                  {' '}
                  <span className="Bb-arrow">
                    <BackArrow />
                  </span>
                </div>
              </li>
              <li className="craftD-model">
                <div className="craft-dis">Height: </div>
                <div className="craft-API">
                  {item.height_ft}
                  {' '}
                  <span className="Bb-arrow">
                    <BackArrow />
                  </span>
                </div>
              </li>
              <li className="craftD-model">
                <div className="craft-dis"> Length:</div>
                <div className="craft-API">
                  {item.length_ft}
                  {' '}
                  <span className="Bb-arrow">
                    <BackArrow />
                  </span>
                </div>
              </li>
              <li className="craftD-model">
                <div className="craft-dis">Wing Span:</div>
                <div className="craft-API">
                  {item.wing_span_ft}
                  {' '}
                  <span className="Bb-arrow">
                    <BackArrow />
                  </span>
                </div>
              </li>
              <li className="craftD-model">
                <div className="craft-dis"> Range:</div>
                <div className="craft-API">
                  {item.range_nautical_miles}
                  {' '}
                  <span className="Bb-arrow">
                    <BackArrow />
                  </span>
                </div>
              </li>

            </ul>

          </div>
        ))}
      </div>
    </div>
  );
};
export default CraftDescription;
