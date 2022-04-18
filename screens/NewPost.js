import React, {useState, useEffect} from 'react';
import {View, Image, Text, StyleSheet, ScrollView, TouchableOpacity, useWindowDimensions} from 'react-native';
import {
  ChapterText,
  WelcomeBackText,
  UserNameText,Container,UserInfoContainer,Avatar,UserInfoText,
} from '../styles/HomeStyles';
import colors from '../constants/colors';
import FormButton from '../components/FormButton';
import { Input, Icon, Button } from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import HomeScreen from './HomeScreen';
import {Root, Popup} from 'popup-ui';
import firestore from '@react-native-firebase/firestore';


function NewPost({navigation}) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [title, setTitle] = useState(null);
    const [descriere, setDescriere] = useState(null);
    const [detalii, setDetalii] = useState(null);
    const [suma, setSuma] = useState(null);
    const [category, setCategory] = useState(null);
    const [poza, setPoza] = useState(null);
    const [town, setTown] = useState(null);
    const [phone, setPhone] = useState(null);

    const [items, setItems] = useState([
        {label: 'Muncitori', value: 'Muncitori'},
        {label: 'Inchiriere', value: 'Inchiriere'},
        {label: 'Vanzare', value: 'Vanzare'},
        {label: 'Cumparare', value: 'Cumparare'}

      ]);

      function selectFile () {
        let options = {
          title: 'Select Image',
          customButtons: [
            { 
              name: 'customOptionKey', 
              title: 'Choose file from Custom Option' 
            },
          ],
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };
        launchImageLibrary(options, (res) => {
          console.log('Response = ', res);
          if (res.didCancel) {
            console.log('User cancelled image picker');
          } else if (res.error) {
            console.log('ImagePicker Error: ', res.error);
          } else if (res.customButton) {
            console.log('User tapped custom button: ', res.customButton);
            alert(res.customButton);
          } else {
            let source = {uri: res.uri};
            console.log(source);
            setResourcePath(source);
          }
        });
      };

  function sendPost() {
    const postsCollection = firestore().collection('post');
    setCategory(value);
    let newpost = {
      id:9,
      title: title,
      description: descriere,
      photo:require("./../assets/post8.jpg"),
      phone: phone,
      suma: suma,
      town: town,
      category: category,
      detalii: detalii,
      category: value
    }
    postsCollection.add(newpost)
    Popup.show({
      type: 'Success',
      title: 'Postare adaugata',
      button: true,
      textBody:
        'Postarea ta a fost publicata. Acum este live!',
      buttonText: 'Ok',
      callback: () => {
        Popup.hide(), navigation.navigate('Acasa')}
    })
  }
  
  return (
    <Root>
    <View style={{backgroundColor: colors.background}}>
        <View>
          <UserInfoContainer>
            <Avatar source={require("./../assets/avatar1.png")}/>
            <UserInfoText>
              <WelcomeBackText>Bine ai revenit </WelcomeBackText>
              <UserNameText>Mircea Vlad</UserNameText>
            </UserInfoText>
          </UserInfoContainer>
        </View>
      <View style={{height:900, marginTop: 10}}>
        <Text>Anunt nou</Text>
        <Input placeholder='Nume si prenume' onChangeText={value => setTitle(value)}/>
        <Input placeholder='Descriere' onChangeText={value => setDescriere(value)}/>
        <Input placeholder='Detalii' onChangeText={value => setDetalii(value)}/>
        <Input placeholder='Suma' onChangeText={value => setSuma(value)}/>
        <Input placeholder='Telefon de contact' onChangeText={value => setPhone(value)}/>
        <Input placeholder='Localitate' onChangeText={value => setTown(value)}/>
        <Text style={{marginLeft: 10, marginBottom: 10}} >Categorie</Text>
        <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
        />
        <View style={styles.container}>
          <Text style={{marginLeft: 10, marginRight: 190}} >Poza</Text>
          <FormButton buttonTitle="Selecteaza" onPress={() => selectFile()}/>
        </View>
        <View style={{marginLeft: 115, marginTop: 40}}>
            <FormButton buttonTitle="Adauga"
                onPress={() => sendPost()}
            />
        </View>
      </View>
     </View>
     </Root>
  );
}

const styles = StyleSheet.create({
container: {
  marginTop: 10,
  flexDirection: 'row',
  alignItems: 'baseline',
}
})

export default NewPost;
