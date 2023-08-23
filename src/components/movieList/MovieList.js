import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../card/Card";

import "./MovieList.css";

const MovieList = () => {
  const [movieList, setMovieList] = useState([]);
  const { type } = useParams();

  // useEffect(() => {
  //   getData();
  // }, []);
  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, [type]);

  const getData = () => {
    const fetchJsonResponse = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${
            type ? type : "popular"
          }?api_key=9d3710aa9cefc6a5ae4e74f913c8818c&language=en-US`
        );
        if (!response.ok) {
          throw Error(response.statusText);
        }

        const jsonResponse = await response.json();
        setMovieList(jsonResponse.results);
        // console.log("jsonresponse", jsonResponse);
        // console.log("jsonResponse.results", typeof jsonResponse.results);
      } catch (error) {
        console.log("useEffect for fetch(). Error is ", error);
      }
    };
    fetchJsonResponse();
  };

  return (
    <div className='movie__list'>
      <h2 className='list__title'>
        {(type ? type.replace("_", " ") : "popular").toUpperCase()}
      </h2>
      <div className='list__cards'>
        {movieList.map((movie) => (
          <Card key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
