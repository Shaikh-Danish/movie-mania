import './App.css'
import searchIcon from './search.svg'

import { useState, useEffect } from 'react'
import { MovieCard } from './MovieCard.jsx'

export default function App() {
  const API_URL = `https://www.omdbapi.com?apikey=5e04649`;
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  
  const apiRequest = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  }

  useEffect(() => {
    apiRequest("avengers")
  }, [])

  return (
    <main className="app">
      <header>
        <h1>Cinemania</h1>
        <section className="search">
          <input 
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
            }} />
          <img 
            alt="search" 
            src={searchIcon}
            onClick={() => {
              apiRequest(search)
            }} />
        </section>
      </header>
      {movies?.length >= 1 ? (
        <section className="container">
          {movies.map(movie =>
            <MovieCard movie={movie} />   
          )}
        </section>
        ) : (
          <section className="empty">
            <h1>No Movies Found.</h1>
          </section>
        )}
      
    </main>
  )
}
