import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
  TextInput,
  Linking,
} from 'react-native';

import {UserInfoContain, PersonalInfoContainer, ErrorText} from './../styles/HomeStyles';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import colors from '../constants/colors';
import firestore from '@react-native-firebase/firestore';
import FormButton from '../components/FormButton';
import {Root, Popup} from 'popup-ui';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function Profile({navigation}) {
  const [currentUser, setCurrentUser] = useState({email: '', firstName:''});
  const [settings, setSettings] = useState({});
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [region, setRegion] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [resourcePath, setResourcePath] = useState({uri: ' '});
  const [confirmPassword, setConfirmPassword] = useState('');
  const usersCollection = firestore().collection('users');
  const settingsCollection = firestore().collection('settings');
  const [image, setImage] = useState();
  const [downloadURL, setDownloadURL] = useState();

  const uploadPhotoAsync = async () => {
    if(resourcePath != '') {
      const path = `avatars/${currentUser.email}/${Date.now()}.jpg`;
      let reference = storage().ref(path);
      let task = reference.putFile(resourcePath.uri);
      task.then( async () => {
          const url = await reference.getDownloadURL();
          setDownloadURL(url);
          console.log(url);
          await usersCollection.doc(currentUser.email).update(
              {photo: url}
            );
        }
      );
    }
  }

  function savePersonalInfo () { 
      Popup.show({
        type: 'Success',
        title: 'Modificari efectuate!',
        button: true,
        textBody:
          'Informatiile tale personale au fost modificate',
        buttonText: 'Ok',
        callback: () => {Popup.hide(), navigation.navigate('Acasa')}
      }) 
    }

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

  return (
    <Root>

    <ScrollView style={{backgroundColor: colors.background}}>
      <View>
        <View style={{backgroundColor: colors.background}}>
          <View style={styles.profileInfo}>
            <Image
              source={require('../assets/avatar1.png')}
              //source={{ uri: resourcePath.uri }}
              style={styles.imageStyle}
            />
            <TouchableOpacity onPress={() => selectFile()} style={styles.button}  >
              <Text style={styles.buttonText}>Select File</Text>
            </TouchableOpacity>    
            <Text style={{color: 'white', fontSize: 22}}>Mircea Vlad</Text>
          </View>
        </View>
      </View>
      <View>
      <PersonalInfoContainer>
        <Text style={styles.settingText} >Nume</Text>
        <TextInput
          underlineColorAndroid="transparent"
          borderWidth={0}
          value={firstName}
          onChangeText={userInput=>setFirstName(userInput)}
          style={styles.input}
          numberOfLines={1}
          placeholder="Nume"
          placeholderTextColor="#666"
        />
      </PersonalInfoContainer>
      <PersonalInfoContainer>
        <Text style={styles.settingText} >Prenume</Text>
        <TextInput
          underlineColorAndroid="transparent"
          borderWidth={0}
          value={lastName}
          onChangeText={userInput=>setLastName(userInput)}
          style={styles.input}
          numberOfLines={1}
          placeholder="Prenume"
          placeholderTextColor="#666"
        />
      </PersonalInfoContainer>
      <PersonalInfoContainer>
        <Text style={styles.settingText} >Email</Text>
        <TextInput
          underlineColorAndroid="transparent"
          borderWidth={0}
          value={email}
          onChangeText={userInput=>setEmail(userInput)}
          style={styles.input}
          numberOfLines={1}
          placeholder="Email"
          placeholderTextColor="#666"
        />
      </PersonalInfoContainer>
      <PersonalInfoContainer>
        <Text style={styles.settingText} >Localitate</Text>
        <TextInput
          underlineColorAndroid="transparent"
          borderWidth={0}
          value={region}
          onChangeText={userInput=>setRegion(userInput)}
          style={styles.input}
          numberOfLines={1}
          placeholder="Localitate"
          placeholderTextColor="#666"
        />
        
      </PersonalInfoContainer>
      <PersonalInfoContainer>
        <Text style={styles.settingText} >Parola</Text>
        <TextInput
          underlineColorAndroid="transparent"
          borderWidth={0}
          value={password}
          onChangeText={userInput=>setPassword(userInput)}
          style={styles.input}
          numberOfLines={1}
          placeholder="Parola"
          secureTextEntry={true}
          placeholderTextColor="#666"
        />
      </PersonalInfoContainer>
      <PersonalInfoContainer>
        <Text style={styles.settingText} >Confirma Parola</Text>
        <TextInput
          underlineColorAndroid="transparent"
          borderWidth={0}
          value={confirmPassword}
          style={styles.input}
          numberOfLines={1}
          placeholder="Confirma parola"
          secureTextEntry={true}
          placeholderTextColor="#666"
        />
      </PersonalInfoContainer>
      </View>
      <View style={{marginLeft:30, marginTop: 125, flexDirection: 'row'}}>
        <FormButton buttonTitle="Iesire cont" onPress={() => navigation.navigate('Login')} />
        <FormButton buttonTitle="salveaza" onPress={() => savePersonalInfo()} />
      </View>
    </ScrollView>
    </Root>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 150,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#3740ff'
  },
  input: {
    borderBottomColor: '#000',
    borderBottomWidth: 0.2,
    width: 270,
    height: 50
  },
  setting: {
    flexDirection: 'row',
    alignItems: 'center',
    width: windowWidth / 1.3,
  },
  settingContainer: {
    margin: 10,
    height: 50,
    flexDirection: 'row',
    borderRadius: 35,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.13,
    shadowRadius: 2.62,
    elevation: 4,
  },
  profileInfo: {
    width: windowWidth,
    height: windowHeight / 4,
    backgroundColor: colors.primary,
    borderBottomEndRadius: 35,
    borderBottomStartRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settings: {
    borderTopLeftRadius: 35,
    backgroundColor: colors.background,
  },
  imageStyle: {
    width: 80,
    height: 80,
    borderRadius: 80
  },
  settingText: {
    marginLeft: 10,
    marginTop:13,
    width: 150
  }
});

export default Profile;
// export default Sentry.withProfiler(DonateProcess);
