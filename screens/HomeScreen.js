import React, {useCallback, useContext, useEffect, useState} from 'react';
import {FlatList, View, ScrollView, LogBox, SafeAreaView} from 'react-native';
import {
  Container,
  WelcomeBackText,
  UserNameText,
  Avatar,
  UserInfoContainer,
  UserInfoText,
  CategoriesContainer,
  Category,
  CategoryImage,
  MainText,
} from '../styles/HomeStyles';
import Search from '../components/Search';
import colors from '../constants/colors';


function HomeScreen({navigation}) {
  return (
     <ScrollView style={{backgroundColor: colors.background}}>
      <Container style={{backgroundColor: colors.background}}>
        <View>
          <UserInfoContainer>
            <Avatar source={require("./../assets/avatar1.png")}/>
            <UserInfoText>
              <WelcomeBackText>Bine ai revenit </WelcomeBackText>
              <UserNameText>Mircea Vlad</UserNameText>
            </UserInfoText>
          </UserInfoContainer>
        </View>
        <SafeAreaView>
          <Search navigation={navigation}/>
        </SafeAreaView>
      </Container>
     </ScrollView>

  );
}
export default HomeScreen;

