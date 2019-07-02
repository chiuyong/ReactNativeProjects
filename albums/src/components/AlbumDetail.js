import React from 'react';
import { Text, View, Image, Linking } from 'react-native';
import Card from './Card';
import CardSection from './CardSection';
import Button from './Button';

//props passado para transformar cada album do JSON num AlbumDetail
//Cada AlbumDetail vai ter a estrutura de Card
const AlbumDetail = ({ album }) => {
  const { 
    title, 
    artist, 
    thumbnail_image,
    image,
    url 
  } = album;

  const { 
    thumbnailStyle, 
    headerContentStyle, 
    thumbnailContainerStyle,
    headerTextStyle,
    imageStyle
  } = styles;
  
  return (
    //Precisa fazer com que o Componente Card possa receber props
    // e renderizar seus filhos.
    <Card>
      <CardSection>
        <View style={thumbnailContainerStyle}>
          <Image
            style={thumbnailStyle} 
            source={{ uri: thumbnail_image }} 
          />
        </View>
        <View style={headerContentStyle}>
          <Text style={headerTextStyle}>{title}</Text>
          <Text>{artist}</Text>
        </View>
      </CardSection>
      
      <CardSection>
        <Image 
          style={imageStyle}
          source={{ uri: image }} 
        />
      </CardSection>
      
      <CardSection>
        <Button onPress={() => Linking.openURL(url)}>
          Buy Now
        </Button>
      </CardSection>      
    </Card>
  );
};

const styles = {
  headerContentStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  headerTextStyle: {
    fontSize: 18
  },
  thumbnailStyle: {
    height: 50,
    width: 50
  },
  thumbnailContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10
  },
  imageStyle: {
    height: 300,
    flex: 1,
    width: null
  }
};  

export default AlbumDetail;
