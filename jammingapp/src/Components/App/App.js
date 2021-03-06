
import React from 'react';
import './App.css' ;
import {SearchBar} from '../SearchBar/SearchBar'
import {SearchResults} from '../SearchResults/SearchResults'
import {Playlist} from '../Playlist/Playlist'
import {Spotify} from '../../util/Spotify';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      SearchResults: [],
    playlistName: "Playlist 1",
    playlistTracks: []
 
    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist =this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }
  addTrack(track){
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    this.state.playlistTracks.push(track); 
    this.setState({tracks: this.state.playlistTracks})
  }
  removeTrack (track){
   let tracks = this.state.playlistTracks;
   tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);
    this.setState({playlistTracks: tracks});
  }
  updatePlaylistName (name) {
    this.setState({PlaylistName: name});
  }
  savePlaylist () {
    const trackUri = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName,trackUri).then(() => {
      this.setState({
        playlistName : "New Playlist",
        playlistTracks: []
      })
    })
  }
  search (term) {
   Spotify.Search(term).then(SearchResults => {
     this.setState({SearchResults: SearchResults})
   })

  }
  
  render(){
    return (
      <div>
  <h1>Ja<span className="highlight">mmm</span>ing</h1>
  <div className="App">
    <SearchBar onSearch = {this.search} />
    <div className ="App-playlist">
       <SearchResults SearchResults = {this.state.SearchResults} onAdd = {this.addTrack} />
       
      <Playlist PlaylistName = {this.state.playlistName} PlaylistTracks = {this.state.playlistTracks} 
      onNameChange = {this.updatePlaylistName} onSave = {this.savePlaylist}
      /> 
    </div>
  </div>
</div>
    )
  }
}



export default App;
