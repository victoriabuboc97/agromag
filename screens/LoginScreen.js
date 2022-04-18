import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  StyleSheet,
  Platform,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';

import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import SocialButton from '../components/SocialButton';
import Colors from '../constants/colors';
import {AuthContext} from '../navigation/Context';
import { ErrorText } from '../styles/HomeStyles';


function LoginScreen({navigation}) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errorEmail, setErrorEmail] = useState();
  const [errorPassword, setErrorPassword] = useState();
  const {login} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logo1.png')}
        style={styles.imageContainer}
      />
      <FormInput
        style={styles.form}
        labelValue={email}
        onChangeText={(userEmail) => setEmail(userEmail)}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <ErrorText style={{lineHeight: 8}}>{errorEmail}</ErrorText>
      <FormInput
        style={styles.form}
        labelValue={password}
        onChangeText={(userPassword) => setPassword(userPassword)}
        secureTextEntry={true}
        placeholder="Password"
      />
      <ErrorText style={{lineHeight: 8}}>{errorPassword}</ErrorText>
      <View style={styles.buttons}>
        <FormButton
          buttonTitle="Sign Up"
          onPress={() => navigation.navigate('Signup')}
        />
        <FormButton
          buttonTitle="Sign In"
          onPress={() => {login(email, password); navigation.navigate('Home')}}
        />
      </View>
      <TouchableOpacity style={styles.SignUpButton} onPress={() => {}}>
        <Text style={styles.textButton}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.signUpButton}>
        <Text style={styles.textButton}>
          Don't have an account yet? Create here!
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
  },
  imageContainer: {
    flex: 1,
    width: '50%',
    height: '50%',
    resizeMode: 'contain',
    marginTop: -35,
  },
  buttons: {
    flexDirection: 'row',
    width: '45%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 22,
  },
  form: {
    justifyContent: 'center',
    width: '80%',
    height: 100,
    marginLeft: '4%',

  },
  textButton: {
    alignItems: 'center',
    justifyContent: 'center',
    color: Colors.textColor,
  },
  signUpButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LoginScreen;
// export default Sentry.withProfiler(LoginScreen);
