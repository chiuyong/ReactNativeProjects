//Library
import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import axios from 'axios';
import AlbumDetail from './AlbumDetail';

//Class Component
class AlbumList extends Component {
  //We use state only in Class Component
  // initial state
  state = { albums: [] };

  componentWillMount() {
    //promise
    axios.get('https://rallycoding.herokuapp.com/api/music_albums')
    //if promise back, re-render the component with the new fetched data
    .then(response => this.setState({ albums: response.data }));
  }

  renderAlbums() {
    //Need Key Prop to render this component uniquely. 
    //In this case, ID is album.title (but is not the right way)
    return this.state.albums.map(album => 
      <AlbumDetail key={album.title} album={album} />
    );
  }

  render() {
    console.log(this.state);

    return (
    //No scroll is Default  
    <ScrollView>
      {this.renderAlbums()}
    </ScrollView>
    );
  }
}

//Make it available
export default AlbumList;
