import "./Join.css";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
const Join = () => {
  const navigate = useNavigate();
  return (
    <div className="join-container">
      <div className="head-div">
        <h1>Join Today</h1>
      </div>
      <br />
      <br />
      <div className="row">
        <div className="col">
          <div className="body-div">
            <p>
              Get access to maintain your own custom personal lists, track what
              you've seen and search for what to watch next—regardless if it's
              in theatres, on TV or available on popular streaming services like
              Netflix, Amazon Prime Video, Hotstar, Voot, and Jio Cinema.
            </p>
          </div>
        </div>
        <div className="col body-div-two arrow">
          <ul>
            <li>Enjoy INDI ad free</li>
            <li>Maintain a personal watchlist</li>
            <li>Log the movies and TV shows you've seen</li>
            <li>Build custom lists</li>
            <li>Contribute to and improve our database</li>
          </ul>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <button
            className="button button-div"
            onClick={() => navigate("./signup-page")}
          >
            {" "}
            Sign Up
          </button>
        </div>
        <div className="col">
          <input
            className="join-access-email"
            type="email"
            placeholder="Your Email"
          />&nbsp;&nbsp;&nbsp;
          <button className="button-div2" >Submit</button>
        </div>
      </div>
    </div>
  );
};
export default Join;
