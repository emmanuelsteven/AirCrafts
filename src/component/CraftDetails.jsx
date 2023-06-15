import { useDispatch, useSelector } from 'react-redux';
import { BackArrow } from './Icons';

const CraftDescription = () => {
  const choosenCraft = useSelector((state) => state.crafts.filter((craft) => craft.details === true));
  const CraftDescription = choosenCraft;

  return (
    <div className="Detail-container">
      <div className="craftsD">
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
          >
            <div className="B-arrow">
              <BackArrow />
            </div>
            <h2 className="cityD-header">{item.manufacturer}</h2>
            <h3 className="craftD-model">Model no:</h3>
            <h4 className="cityD-number">{item.model}</h4>
            <h4 className="cityD-number">{item.model}</h4>
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

export default CraftDescription;
