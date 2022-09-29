import React, { useEffect, useState } from "react";
import './Row.css';
import instance from "./axios";

const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([]);
  const baseUrl = "https://www.themoviedb.org/t/p/original";
  // A snippet of code which runds based on a specific condition
  useEffect(() => {
    // if [], run once and when the row loads, and dont run again
    // if [movies], run when there is change in movies

    async function fetchData() {
      const request = await instance.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }

    fetchData();
  }, [fetchUrl]);

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row_posters">
        {movies.map((movie) => (
          <img 
          key={movie.id}
          className={`row_poster ${isLargeRow && 'row_posterLarge'}`}
          src={isLargeRow ? `${baseUrl}${movie.poster_path}` : `${baseUrl}${movie.backdrop_path}`} 
          alt={movie.name} />
        ))}
      </div>
    </div>
  );
};

export default Row;
