//Import Library
import React from 'react';
import { Text, View } from 'react-native';

// Create Component
const Header = (props) => {
  //referencing style
  const { textStyle, viewStyle } = styles;
  return ( 
    //applying style
    <View style={viewStyle}>
      <Text style={textStyle}>{props.headerText}</Text>
    </View>
  );
};

// Styles
const styles = {
  textStyle: {
    fontSize: 20
  },
  viewStyle: {
    backgroundColor: '#F8F8F8',
    //vertical
    justifyContent: 'center',
    //horizontal
    alignItems: 'center',
    height: 60,
    paddingTop: 10,
    elevation: 5,
    position: 'relative'
  }
};

// Make it Available
export { Header };
