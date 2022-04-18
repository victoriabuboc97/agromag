import React, {useState, useEffect, useContext} from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';

import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import SocialButton from '../components/SocialButton';
import Colors from '../constants/colors';
import {AuthContext} from '../navigation/Context';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import colors from '../constants/colors';
import { fab } from '@fortawesome/free-brands-svg-icons'

function SignupScreen({navigation}) {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [userDetails, setUserDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    isLoading: false
  });

  function userDetailsUpdate (val, prop) {
    const state = userDetails;
    state.prop = val;
    setUserDetails(state);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Create account</Text>
      <FormInput
        style={styles.form}
        labelValue={firstName}
        onChangeText={(userFirstName) => setFirstName(userFirstName)}
        placeholder="First Name"
        iconType="user"
        keyboardType="default"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <FormInput
        style={styles.form}
        labelValue={lastName}
        onChangeText={(userLastName) => setLastName(userLastName)}
        placeholder="Second Name"
        iconType="user"
        keyboardType="default"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <FormInput
        style={styles.form}
        labelValue={email}
        onChangeText={(userEmail) => setEmail(userEmail)}
        placeholder="Email"
        iconType="user"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <FormInput
        style={styles.form}
        labelValue={password}
        onChangeText={(userPassword) => setPassword(userPassword)}
        secureTextEntry={true}
        placeholder="Password"
        iconType="lock"
      />
      <FormInput
        style={styles.form}
        labelValue={confirmPassword}
        onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
        secureTextEntry={true}
        placeholder="Confirm Password"
        iconType="lock"
      />
      <View style={styles.buttons}>
        <FormButton
          buttonTitle="Sign Up"
          onPress={() => navigation.navigate('Home')}
        />
      </View>
      <View style={styles.regTextContainer}>
        <Text style={styles.regText}>
          By registering, you confirm that you accept our
        </Text>
        <TouchableOpacity onPress={() => alert('Terms clicked')}>
          <Text style={[styles.regText, {color: Colors.green}]}>
            Terms of service
          </Text>
        </TouchableOpacity>
        <Text style={styles.regText}> and </Text>
        <TouchableOpacity onPress={() => alert('Terms clicked')}>
          <Text style={[styles.regText, {color: Colors.green}]}>
            Privacy Policy
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
        style={styles.SignUpButton}>
        <Text style={styles.textButton}>Have an account? Sign In</Text>
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
  regTextContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 35,
    justifyContent: 'center',
  },
  regText: {
    fontSize: 12,
    color: 'grey',
  },
  regTextColor: {
    color: Colors.green,
  },
  buttons: {
    flexDirection: 'row',
    width: '35%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 22,
    margin: 10,
  },
  form: {
    marginLeft: '4%',
    width: '80%',
  },
  textButton: {
    alignItems: 'center',
    justifyContent: 'center',
    color: Colors.textColor,
  },
  SignUpButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SignupScreen;
//export default Sentry.withProfiler(SignupScreen);
