import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Home.css'

const Home = () => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    axios.get('https://api.tvmaze.com/search/shows?q=all')
      .then(response => setShows(response.data))
      .catch(error => console.log(error))
  }, []);

  return (
    <div className="container1">
      <h1>TvMaze Shows 🍿</h1>
      <div className="grid">
        <div className="grid-layer">
        {shows.map(show => (
          <div className="card" key={show.show.id}>
            <Link to={`/shows/${show.show.id}`}>
              <img src={show.show.image?.medium} alt={show.show.name} />
              <button className='m-button'>
              <h3>{show.show.name}</h3>
              </button>
            </Link>
          </div>
        ))}
        </div>
        <div className='Work'>
         by Nilabh Kumar 

        </div>
      </div>
    </div>
  );
};

export default Home;
