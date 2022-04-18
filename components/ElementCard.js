import React from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import {
  UserInfoText,
  ElementImage,
  ElementTextContainer,
  ElementText,
  UserInfoContainer,
  ElementContainer,
  CategoryText,
  DescriptionText,
  OrgAvatar,
  UserNameText,
} from '../styles/HomeStyles';
// import {TouchableOpacity} from 'react-native-gesture-handler';
import PostScreen from './../screens/PostScreen';

export const ElementCard = ({item, navigation}) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate("PostScreen", {item})}>
      <ElementContainer>
        <ElementImage imageStyle={{ borderRadius: 15}} source={item.photo}>
          <ElementTextContainer>
            <ElementText>{item.title}</ElementText>
            <Text style={{color: 'white', marginRight: 5, fontSize: 11}} numberOfLines={3}>{item.description}</Text>
          </ElementTextContainer>
        </ElementImage>
      </ElementContainer>
    </TouchableOpacity>
  );
};
