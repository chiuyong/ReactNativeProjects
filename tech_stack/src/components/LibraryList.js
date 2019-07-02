import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import ListItem from './ListItem';

class LibraryList extends Component {
  //transforma o objeto recebido em um outro objeto cuja key eh 'item'
  renderItem(library) {
    return <ListItem library={library} />;
  }

  render() {
    return (
      //Each rendered Item has a key
      <FlatList 
        data={this.props.libraries}
        //renderItem prop recebe um objeto
        renderItem={this.renderItem}
        //keyExtractor recebe String por default
        keyExtractor={(library) => library.id.toString()}

      />
    );
  }
}

const mapStateToProps = state => {
  //Para poder ser vista pela LibraryList como Props, basta retornar um Objeto (key + value)
  //Acessa o estado atual do reducer cuja key eh libraries
  return { libraries: state.libraries };
};

export default connect(mapStateToProps)(LibraryList);
