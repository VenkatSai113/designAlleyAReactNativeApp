// RecaptchaWidget.js
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { RecaptchaVerifier } from 'firebase/auth';
import app from './firebaseConfig';

const RecaptchaWidget = ({ verificationId, recaptchaVerifier }) => {
  useEffect(() => {
    if (!recaptchaVerifier) return;

    recaptchaVerifier.render().then((widgetId) => {
      // Do something with the widget ID if needed
    });

  }, [verificationId, recaptchaVerifier]);

  return <View id="recaptcha-container"></View>;
};

export default RecaptchaWidget;
