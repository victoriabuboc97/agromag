import React, {useState, useEffect} from 'react';
import {View, Image, Text, StyleSheet, ScrollView, Linking, useWindowDimensions} from 'react-native';
import {
  ChapterText,
  WelcomeBackText,
  UserNameText,
} from '../styles/HomeStyles';
import colors from '../constants/colors';
import FormButton from '../components/FormButton';


function PostScreen({route, navigation}) {
  const {item} = route.params;

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image
          source={item.photo}
          style={styles.imageContainer}
        />
        <View style={styles.detailsContainer}>
          <ChapterText>{item.title}</ChapterText>
          <View style={{marginLeft: 15, marginRight: 10}}>
            <Text style={{marginTop:5}}>
              {item.description}
            </Text>
            <Text style={{color: colors.primary}}>
            {item.phone}
            </Text>
          </View>
          <View style={styles.column}>
            <View>
              <WelcomeBackText>Categorie</WelcomeBackText>
              <UserNameText>{item.category}</UserNameText>
            </View>
            <View style={styles.verticalLine}></View>
            <View>
              <WelcomeBackText>Localitate</WelcomeBackText>
              <UserNameText>{item.town}</UserNameText>
            </View>
            <View style={styles.verticalLine}></View>
            <View>
              <WelcomeBackText>Suma</WelcomeBackText>
              <UserNameText>{item.suma}</UserNameText>
              
            </View>
          </View>
          <View style={styles.card}>
            <UserNameText style={{marginTop: 15, marginLeft: 15}}>
              Detalii anunt
            </UserNameText>
            <UserNameText style={{marginTop: 15, marginLeft: 15, marginBottom: 30}}>
              {item.detalii}
            </UserNameText>
          </View>
          <View style={{marginLeft: 115, position: 'absolute', bottom: -100}}>
              <FormButton
                    // style={{ marginLeft: 10}}
                    buttonTitle="Contacteaza-ma"
                    onPress={() => navigation.navigate('Acasa')}
                  />
            </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
    height: 650
  },
  imageContainer: {
    width: '100%',
    marginTop: -20,
    height: 220,
  },
  detailsContainer: {
    marginTop:50,
    backgroundColor: colors.background,
    marginTop: -40,
    borderRadius: 30,
  },
  column: {
    margin: 15,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  verticalLine: {
    width: 0.8,
    height: '100%',
    backgroundColor: '#656060',
  },
  card: {
    marginTop: 30,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 30,
    borderRadius: 20,
    backgroundColor: colors.categoryCard,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.13,
    shadowRadius: 2.62,
    elevation: 4,
  },
  verified: {
    borderRadius: 30,
    width: 110,
    backgroundColor: 'rgba(255, 255, 255, 0.51)',
    flexDirection: 'row',
    alignItems: 'center',
  },
  upRate: {
    backgroundColor: colors.primary,
    height: 10,
    width: 30,
    borderRadius: 30,
  },
});

export default PostScreen;
// export default Sentry.withProfiler(PostScreen);
