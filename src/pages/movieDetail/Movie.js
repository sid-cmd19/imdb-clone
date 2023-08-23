import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Movie.css";

const Movie = () => {
  const [movie, setMovie] = useState({});
  const { id } = useParams();

  useEffect(() => {
    getData();
    window.scrollTo(0, 0);
    // eslint-disable-next-line
  }, []);

  const getData = () => {
    const getMovieData = async () => {
      let response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=9d3710aa9cefc6a5ae4e74f913c8818c&language=en-US`
      );
      if (!response.ok) {
        throw Error(response.statusText);
      }
      let jsonResponse = await response.json();
      // console.log(response);
      // console.log(jsonResponse);
      setMovie(jsonResponse);
    };
    getMovieData();
  };

  // console.log("Movie details", movie);
  // console.log("Movie backdrop path", movie.backdrop_path);
  // {
  //   movie.production_companies && console.log(movie.production_companies[0]);
  // }
  return (
    movie && (
      <div className='movie'>
        <div className='movie__intro'>
          <img
            className='movie__backdrop'
            src={`https://image.tmdb.org/t/p/original${
              movie.backdrop_path ? movie.backdrop_path : ""
            }`}
            alt={movie.original_title}
          />
        </div>
        <div className='movie__detail'>
          <div className='movie__detailLeft'>
            <div className='movie__posterBox'>
              <img
                className='movie__poster'
                src={`https://image.tmdb.org/t/p/original${
                  movie.poster_path ? movie.poster_path : ""
                }`}
                alt={movie.original_title}
              />
            </div>
          </div>
          <div className='movie__detailRight'>
            <div className='movie__detailRightTop'>
              <div className='movie__name'>
                {movie ? movie.original_title : ""}
              </div>
              <div className='movie__tagline'>{movie ? movie.tagline : ""}</div>
              <div className='movie__rating'>
                {movie ? movie.vote_average : ""} <i className='fas fa-star' />
                <span className='movie__voteCount'>
                  {movie ? "(" + movie.vote_count + ") votes" : ""}
                </span>
              </div>
              <div className='movie__runtime'>
                {movie ? movie.runtime + " mins" : ""}
              </div>
              <div className='movie__releaseDate'>
                {movie ? "Release date: " + movie.release_date : ""}
              </div>
              <div className='movie__genres'>
                {movie && movie.genres
                  ? movie.genres.map((genre) => (
                      // <div key={genre.id}>
                      <span
                        key={genre.id}
                        className='movie__genre'
                        id={genre.id}
                      >
                        {genre.name}
                      </span>
                      // {/* </div> */}
                    ))
                  : ""}
              </div>
            </div>
            <div className='movie__detailRightBottom'>
              <div className='synopsisText'>Synopsis</div>
              <div>{movie ? movie.overview : ""}</div>
            </div>
          </div>
        </div>
        <div className='movie__links'>
          <div className='movie__heading'>Useful Links</div>
          {movie && movie.homepage && (
            <a
              href={movie.homepage}
              target='_blank'
              rel='noopener noreferrer'
              style={{ textDecoration: "none" }}
            >
              <p>
                <span className='movie__homeButton movie__Button'>
                  Homepage <i className='newTab fas fa-external-link-alt'></i>
                </span>
              </p>
            </a>
          )}
          {movie && movie.imdb_id && (
            <a
              href={"https://www.imdb.com/title/" + movie.imdb_id}
              target='_blank'
              rel='noopener noreferrer'
              style={{ textDecoration: "none" }}
            >
              <p>
                <span className='movie__imdbButton movie__Button'>
                  IMDB <i className='newTab fas fa-external-link-alt'></i>{" "}
                </span>
              </p>
            </a>
          )}
        </div>
        <div className='movie__heading'>Production Companies</div>
        <div className='movie__production'>
          {movie &&
            movie.production_companies &&
            movie.production_companies.map((company) => (
              <div key={company.name}>
                {" "}
                {company.logo_path && (
                  <span key={company.name} className='productionCompanyImage'>
                    <img
                      className='movie__productionComapany'
                      src={
                        "https://image.tmdb.org/t/p/original" +
                        company.logo_path
                      }
                      alt={company.name}
                    />
                  </span>
                )}
              </div>
            ))}
        </div>
      </div>
    )
  );
};

export default Movie;
