//para ter acesso as actions, reducers e states do redux
import { connect } from 'react-redux';
import React, { Component } from 'react';
import {
  Text,
  TouchableWithoutFeedback,
  View,
  UIManager,
  LayoutAnimation
} from 'react-native';
import { CardSection } from './common';

//put everything to the variable actions
//../ subir um nivel de diretorio
import * as actions from '../actions';

class ListItem extends Component {
  //So eh chamado quando há alguma atualização nesse componente
  //que vai precisar ser mostrado para o usuario
  //ou seja, quando os dados desse componente precisam ser re renderizados
  componentWillUpdate() {
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.spring();
  }

  renderDescription() {
    //desestruturando os atributos que vieram do this.props
    //library que veio do componenete LibraryList
    //expanded que veio do mapStateToProps, que veio do Reducer
    const { library, expanded } = this.props;
    
    if (expanded) {
      return (
        <CardSection>
          <Text style={{ flex: 1, paddingLeft: 15, paddingRight: 12 }}>
            {library.item.description}
          </Text>
        </CardSection>
      );
    }
  }

  render() {
    console.log(this.props);
    const { titleStyle } = styles;
    //desestruturando meu objeto cujo acesso eh pela chave Item (padrao RN)
    const { id, title } = this.props.library.item;
    
    return (
      //to Register a pressing event
      //Call selectLibrary action Creator passing the id of the library
      <TouchableWithoutFeedback 
        onPress={() => this.props.selectLibrary(id)}
      >
        
        <View>
          <CardSection>
            <Text style={titleStyle}>
              {title}
            </Text>
          </CardSection>
          {this.renderDescription()}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

//mapStateToProps pode receber tanto state quanto props do próprio ListItem, no caso 'library' prop
//que veio de LibraryList
const mapStateToProps = (state, ownProps) => {
  //se o id da library que eu quero abrir for de fato o id da library que abri... expand === true
  const expand = (state.selectedLibraryId === ownProps.library.item.id);
  return { expanded: expand };
};

const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15
  }
};

//me de o estado atual do reducer selectedLibraryId
//me de actions do redux e passe para meu componente ListItem como props
//automaticamente ja da dispatch para todos os reducers e states do store
//conecta action ao reducer para sua manipulação
export default connect(mapStateToProps, actions)(ListItem);
