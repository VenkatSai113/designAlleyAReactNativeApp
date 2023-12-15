// OTPScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber, onAuthStateChanged } from 'firebase/auth';
import app from './firebaseConfig';
import RecaptchaWidget from './RecaptchaWidget';

const OTPScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const [otp, setOTP] = useState('');
  const [recaptchaVerifier, setRecaptchaVerifier] = useState(null);
  const [user, setUser] = useState(null);

  const auth = getAuth(app);

  const handleSendOTP = async () => {
    console.log("Hello")
    const recaptchaVerifier = new RecaptchaVerifier('recaptcha-container');
    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
    setVerificationId(confirmationResult.verificationId);
    setRecaptchaVerifier(recaptchaVerifier);
  };

  const handleVerifyOTP = async () => {
    try {
      const credential = await confirmationResult(verificationId, otp);
      const user = credential.user;
      setUser(user);
    } catch (error) {
      console.error(error);
    }
  };

  // Listen for changes in user authentication state
  onAuthStateChanged(auth, (user) => {
    setUser(user);
  });

  return (
    <View style={styles.container}>
      <Text>Enter Phone Number:</Text>
      <TextInput
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={(text) => setPhoneNumber(text)}
      />
      <Button title="Send OTP" onPress={handleSendOTP} />
      <Text>Enter OTP:</Text>
      <TextInput
        placeholder="OTP"
        value={otp}
        onChangeText={(text) => setOTP(text)}
      />
      <Button title="Verify OTP" onPress={handleVerifyOTP} />
      <RecaptchaWidget verificationId={verificationId} recaptchaVerifier={recaptchaVerifier} />
      {user && <Text>Welcome, {user.phoneNumber}!</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OTPScreen;
