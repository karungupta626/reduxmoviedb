import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IUsers } from "../../types/IUsers";
import { UsersService } from "../services/UserServices";
import { Box, Button } from "@mui/material";
import "./DetailPage.css";
import { RootState } from "../../store";
import {
  getUserStart,
  getCastStart,
  getUserSuccess,
  getUserFailure,
  getCastSuccess,
  getCastFailure,
} from "../Reducers/detailReducer";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1820,
  height: 820,
  background: "#232323",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const DetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [showAllCast, setShowAllCast] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { user, cast, isLoading, error } = useSelector(
    (state: RootState) => state.detail
  );
  //for movie cast for each show
  useEffect(() => {
    dispatch(getUserStart());
    dispatch(getCastStart());
    UsersService.getShowById(Number(id))
      .then((res) => dispatch(getUserSuccess(res.data)))
      .catch((err) => dispatch(getUserFailure(err.message)));
    UsersService.getCastByShowId(Number(id))
      .then((res) => dispatch(getCastSuccess(res.data)))
      .catch((err) => dispatch(getCastFailure(err.message)));
  }, [dispatch, id]);
  // remove tags
  const removeTags = (text: string | null) => {
    if (text == null || text === "") {
      return false;
    } else {
      text = text.toString();
    }
    return text.replace(/(<([^>]+)>)/gi, "");
  };
  return (
    <>
      <div>
        {user && cast ? (
          <div>
            <Box sx={style}>
              <div>
                <Button
                  variant="text"
                  color="error"
                  onClick={() => navigate("/")}
                >
                  <i
                    className="fa-solid fa-house fa-beat-fade fa-xl"
                    style={{ color: "#d61f1f" }}
                  ></i>
                </Button>
              </div>
              <div className="movie_box">
                <figure className="movie">
                  <div className="movie__hero">
                    {user && (
                      <img
                        src={user.image.original}
                        alt={user.name}
                        className="movie__img"
                      />
                    )}
                  </div>
                  <div className="movie__content">
                    <div className="movie__title">
                      <h1 className="heading__primary">
                        {user && user.name} <i className="fas fa-fire"></i>
                      </h1>
                      <div className="movie__tag movie__tag--1">
                        {user && user.genres?.join(", ")}
                      </div>
                      <div className="movie__tag movie__tag--2">
                        {user && user.language}
                      </div>
                    </div>
                    {user && (
                      <div>
                        <p className="movie__description">
                          {user.summary && removeTags(user.summary)}
                        </p>
                        <div className="movie__details">
                          <p className="movie__detail">
                            <span className="icons icons-red">
                              <i className="fas fa-camera-retro"></i>{" "}
                            </span>
                            {user.status}
                          </p>
                          <p className="movie__detail">
                            <span className="icons icons-grey">
                              <i className="fas fa-clock"></i>{" "}
                            </span>
                            {user.runtime || "N/A"} minutes
                          </p>
                          <p className="movie__detail">
                            <span className="icons icons-brown">
                              <i className="fas fa-calendar-alt"></i>{" "}
                            </span>
                            {user.premiered}
                          </p>
                        </div>
                      </div>
                    )}
                    {cast && (
                      <div className="movie__cast">
                        <h2 className="heading__secondary">Starring</h2>
                        <div className="row">
                          {cast
                            .slice(0, showAllCast ? cast.length : 5)
                            .map((actor) => (
                              <div
                                key={actor.person.id}
                                className="col-md-2 mb-6"
                              >
                                <div className="d-flex flex-column align-items-center">
                                  <div className="mb-1">
                                    <img
                                      className="rounded-circle"
                                      style={{ width: 55, height: 60 }}
                                      src={
                                        actor.person.image
                                          ? actor.person.image.original
                                          : `https://ui-avatars.com/api/?name=${actor.person.name}&size=60&rounded=true`
                                      }
                                      alt={actor.person.name}
                                    />
                                  </div>
                                  <h5 className="text-light">
                                    {actor.person.name}
                                  </h5>
                                  <hr className="w-100 mt-2 mb-2" />
                                </div>
                              </div>
                            ))}
                        </div>
                        {!showAllCast && (
                          <div className="text-center">
                            <Button
                              variant="outlined"
                              color="inherit"
                              onClick={() => setShowAllCast(true)}
                            >
                              See more
                            </Button>
                          </div>
                        )}
                        {showAllCast && (
                          <div className="text-center">
                            <Button
                              variant="outlined"
                              color="inherit"
                              onClick={() => setShowAllCast(false)}
                            >
                              See less
                            </Button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="movie__price">
                    <span className="icons icons-yellow">
                      <i className="fa-solid fa-star"></i>{" "}
                    </span>
                    &nbsp;
                    {(user && user.rating.average) || "N/A"}
                  </div>
                </figure>
              </div>
            </Box>
          </div>
        ) : (
          <h2>Loading...</h2>
        )}
      </div>
    </>
  );
};
export default DetailPage;
