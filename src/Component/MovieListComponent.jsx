import axios from "axios";
import React, { useEffect, useState } from "react";
import "./MovieListComponent.css";
import { FiSearch } from "react-icons/fi";
const MovieListComponent = () => {
  const [movieList, setMovieList] = useState([]);
  const [temp, setTemp] = useState("");
  const [details, setDetails] = useState([]);
  const [movieDetails, setMovieDetails] = useState(false);
  const [condition, setCondition] = useState(false);
  useEffect(() => {}, []);
  const onTextChange = (e) => {
    setTemp(e.target.value);
    if (e.target.value === "") {
      setMovieList([]);

      setMovieDetails(false);
    }
  };
  const apiimdbIDData = async (id) => {
    let a = await axios.get(`https://www.omdbapi.com/?i=${id}&apikey=2f539ba3`);

    setDetails(a.data);
  };
  const apiData = async (apiDatas) => {
    try {
      let a = await axios.get(
        `https://www.omdbapi.com/?s=${apiDatas}&apikey=2f539ba3`
      );
      if (a.data.Response !== "False") {
        setMovieList(a.data.Search);
        setMovieDetails(true);
      } else {
        setMovieDetails(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = () => {
    apiData(temp);

    setMovieDetails(true);
  };

  const handleMovieDetails = (imdbID) => {
    apiimdbIDData(imdbID);

    setCondition(true);
  };
  const handlecancle = () => {
    setCondition(false);
    setDetails([]);
  };
  return (
    <>
      <div className="logo">
        <h3 className="logo-title">Movies Hub</h3>
      </div>
      <div className="searchBox ">
        <input
          type="text"
          onChange={onTextChange}
          className="inputBox"
          value={temp}
          placeholder="Search Movie Name"
        />

        <button type="button" className="searchBtn" onClick={handleSearch}>
          <FiSearch />
        </button>
      </div>

      <div className="container px-4 text-center">
        <div className="row d-flex justify-content-center ">
          {movieDetails ? (
            movieList.map((item) => {
              return (
                <div
                  className="col-md-2 col-sm-12 mt-3 movieBox"
                  key={item.imdbID}
                  onClick={() => handleMovieDetails(item.imdbID)}
                >
                  <div className="card bg-black outline-none">
                    {item.Poster !== "N/A" ? (
                      <img
                        src={item.Poster}
                        className="card-img-top"
                        alt=" not Found"
                      />
                    ) : (
                      <img
                        src="page-not-found.jpg"
                        className="card-img-top"
                        alt=" not Found"
                      />
                    )}

                    <div className="movieYear ">
                      <h3 className="MovieTitle">{item.Title}</h3>
                      <span>Year :{item.Year}</span>

                      <span>Type : {item.Type}</span>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <h1>Search Movies</h1>
          )}
        </div>
        {condition ? (
          <div className="box">
            <button onClick={handlecancle} className="cancleBtn">
              X
            </button>
            <div className="row movieDetails">
              <div className="col">
                <div className="card1">
                  <div className="image">
                    <img
                      src={details.Poster}
                      className="card-img-top"
                      alt="No Found"
                    />
                  </div>
                  <div className="card-body">
                    <h5 className="card-titles">Name : {details.Title}</h5>
                    <h6>Year : {details.Year}</h6>
                    <h6>Released : {details.Released}</h6>
                    <h6>Genre : {details.Genre}</h6>
                    <h6>Director : {details.Director}</h6>

                    <h6>Actors : {details.Actors}</h6>
                    <h6>Language : {details.Language}</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default MovieListComponent;
