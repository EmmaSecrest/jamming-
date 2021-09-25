import React from 'react';
import './Playlist.css';
import {TrackList} from '../TrackList/TrackList';

export class Playlist extends React.Component {
  constructor (props){
      super(props);
      this.handleNameChange = this.handleNameChange.bind(this);
  }
  
    handleNameChange (event) {
    this.props.onNameChange(event.target.value);
   }
   
    render () {
        return (
            <div class="Playlist">
  <input defaultValue = {"New Playlist"} onNameChange = {this.handleNameChange} />
  <TrackList tracks = {this.props.PlaylistTracks} onRemove = {this.props.onRemove} isRemoval = {true} />
  <button className ="Playlist-save" onClick = {this.props.onSave} >SAVE TO SPOTIFY</button>
</div>
        )
    }
}
export default Playlist;