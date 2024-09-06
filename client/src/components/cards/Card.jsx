import { Link } from "react-router-dom";
import "./Card.scss";

function Card({ item }) {
  return (
    <div className="card">
      <Link to={`/${item.id}`} className="imageContainer">
        <img src={item.img} alt="" />
      </Link>
      <div className="textContainer">
        <h2 className="title">
          <Link to={`/${item.id}`}>{item.title}</Link>
        </h2>
        <p className="address">
          <img src="/pin.png" alt="" />
          <span>{item.address}</span>
        </p>
  
        <div className="bottom">
          <div className="features">
            <div className="feature">
         
            </div>
            <div className="feature">
            </div>
          </div>
          <div className="icons">
            <div className="icon">
              <img src="/save.png" alt="" />
            </div>
            <div className="icon">
              <img src="/chat.png" alt="" />
            </div>
            <span>0359-8889556</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;