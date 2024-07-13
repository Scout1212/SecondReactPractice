import React, { useEffect, useState } from 'react';
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from './Components/MovieCard';

function App() {
    const [movies, setMovies] = useState([])
    const [searchValue, setSearchValue] = useState('')

    const API_URL = 'http://www.omdbapi.com/?i=tt3896198&apikey=9b772d81';

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();
        setMovies(data.Search);
    };

    useEffect(() => {
        searchMovies({searchValue})
    }, [])

    return(
        <div className="app">
            <h1>MovieLand</h1>
            <div className="search">
                <input placeholder="Search for movies" value= { searchValue } onChange={(e) => setSearchValue(e.target.value)}/>
                <img src={SearchIcon} alt="search" onClick= {() => searchMovies(searchValue)}/>
            </div>

            {
                movies?.length > 0 ? (
                    <div className="container"> {movies.map((movie) => (<MovieCard movie = {movie} key={movie.imdbID}/>))} </div>):
                    (<div className= "empty"> <h2>No Movies found</h2> </div>)
            }
        </div>
    );
}

export default App;