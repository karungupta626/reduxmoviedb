import Button from "@mui/material/Button";
import "./Slide.css";
import { Carousel } from "react-bootstrap";
function Slides() {
  return (
    <>
      <Carousel>
        <Carousel.Item className="slide">
          <img
            src={"https://images.alphacoders.com/128/1289451.jpg"}
            alt={""}
            className="slide-image"
          />
          <Carousel.Caption>
            <div className="slide-texts">
              <h1>Wednesday</h1>
              <h6>2022 | Comedy Horror | 640 Mins</h6>
              <br />
              <h5>
                While attending Nevermore Academy, Wednesday Addams<br/> attempts to
                master her emerging psychic ability, thwart<br/> a killing spree and
                solve the mystery that embroiled <br/>her parents 25 years ago.
              </h5>
              <br />
              <h6>Director: Tim Burton</h6>
              <h6>Cast : Jenna Ortega , Gwendoline Christie , Emma Myers</h6>
              <br />
              <br />
              <Button
                variant="outlined"
                color="error"
                style={{ borderRadius: "10%" }}
              >
                Watch now
              </Button>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className="slide">
          <img
            src={"https://images5.alphacoders.com/389/389792.jpg"}
            alt={""}
            className="slide-image"
          />
          <Carousel.Caption>
            <div className="slide-texts">
              <h1>Black Panther</h1>
              <h6>2018 | Action/Adventure | 134 Mins</h6>
              <br />
              <h5>
                After his father's death, T'Challa returns
                <br /> home to Wakanda to inherit his throne. <br />
                However, a powerful enemy related to his family
                <br /> threatens to attack his nation.
              </h5>
              <br />
              <h6>Director: Ryan Coogler</h6>
              <h6>
                Cast : Chadwick Boseman , Michael B. Jordan , Lupita Nyong'o
              </h6>
              <br />
              <br />
              <Button
                variant="outlined"
                color="warning"
                style={{ borderRadius: "10%" }}
              >
                Watch now
              </Button>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className="slide">
          <img
            src={"https://images.alphacoders.com/107/107763.jpg"}
            alt={""}
            className="slide-image"
          />
          <Carousel.Caption>
            <div className="slide-texts">
              <h1>Star Wars: The Last Jedi</h1>
              <h6>2017 | Sci-fi/Action | 152 Mins</h6>
              <br />
              <h5>
                Rey seeks to learn the ways of the Jedi <br />
                under Luke Skywalker, its remaining member,
                <br /> to reinvigorate the Resistance's war against the First
                Order.
              </h5>
              <br />
              <h6>Director: Rian Johnson</h6>
              <h6>Cast : Daisy Ridley , Mark Hamill , John Boyega</h6>
              <br />
              <br />
              <Button
                variant="outlined"
                color="error"
                style={{ borderRadius: "10%" }}
              >
                Watch now
              </Button>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  );
}
export default Slides;
