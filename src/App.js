import { useEffect, useState } from 'react';
import styles from './resources/App.css';
import SearchForm from './components/searchForm';
import SpotifyWebApi from 'spotify-web-api-js';
// var Spotify = require('spotify-web-api-js');
// var s = new Spotify();

function App() {

  const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
  const REDIRECT_URI = "http://localhost:3000/";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";
  const SCOPES = 'user-top-read%20playlist-read-private%20user-library-read%20user-read-private';

  const [token, setToken] = useState(window.localStorage.getItem("token"))
  const [searchResults, setSearchResults] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState("");
  const [artistTracks, setArtistTracks] = useState([]);

  const spotifyApi = new SpotifyWebApi();

  useEffect(()=>{
    const hash = window.location.hash;
    let tokenInit = window.localStorage.getItem("token");

    if (!tokenInit && hash) {
      let urlParams = new URLSearchParams(window.location.hash.replace("#","?"));
      tokenInit = urlParams.get('access_token');
      window.location.hash = "";
      window.localStorage.setItem("token", tokenInit);
    }
    setToken(tokenInit);
    spotifyApi.setAccessToken(tokenInit);
    })

  const logout = () => {
    setToken("");
    setSelectedArtist("");
    window.localStorage.removeItem("token");
  }

  const searchArtists = (searchKey) => {
    spotifyApi.search(searchKey, ["artist"]).then(
      function(data) {
        setSearchResults(data.artists.items);
      }, function (err) {
        console.log(err);
        console.log("error")
      }
    )
  }

  const renderArtists = () => {
    const artists = searchResults;
    return (
      <div className='artistGrid'>
        {artists.map(artist => {
          return (
            <div className='artistGridItem' key={artist.id}>
              {artist.images.length ? <img className='imgButton' src={artist.images[0].url} 
                          width="200vw" alt="" onClick={() => handleSelect(artist.id, artist.name)}/>
                : <div>No Image Provided</div>}
              <br/>
              {artist.name}
            </div>
          )
        })}
      </div>
    )
  }

  const handleSelect = (artistId, artistName) => {
    setSelectedArtist(artistName)
    getArtistTracks(artistId)
  }

  const getArtistTracks = (artistId) => {
    let albums = [];
    let tracks = []
    let tracksAll = [];

    spotifyApi.getArtistAlbums(artistId, "album,single", 50).then(
      function(data) {
        albums = data.items;
        for (var i = 0; i < albums.length; i++) {
          let curAlbumId = albums[i].id;
          spotifyApi.getAlbumTracks(curAlbumId, 50).then(
            function(data) {
              tracks = data.items;
              for (var i = 0; i < tracks.length; i++) {
                tracksAll.push(tracks[i]);
              }
            },
            function(err) {
              console.log(err)
            }
          )
        }
      },
      function(err) {
        console.log(err);
      }
    )
    setArtistTracks(tracksAll);
    console.log(tracksAll);
  }

  const renderSelection = () => {
    return (
      <div>
        {selectedArtist}
      </div>
    )
  }

  return (
    <div className="App">
      <header className="App-header">
        <h2 className='test'> my feckign song app </h2>
          {!token ? 
            <p>
              <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPES}`}>
              Login to Spotify</a> 
            </p>
          : 
            <div> 
              <SearchForm searchMethod={searchArtists}/>
              <button onClick={logout}>Logout</button>
            </div>
          }
          {searchResults && !selectedArtist && renderArtists()}
          {selectedArtist && renderSelection()}
      </header>
    </div>
  );
}
export default App;
