var ui = new firebaseui.auth.AuthUI(firebase.auth());
            var uiConfig = {
                callbacks: {
                    signInSuccessWithAuthResult: function (authResult, redirectUrl) {
                        var user = authResult.user;
                        if (authResult.additionalUserInfo.isNewUser) {
                            db.collection("users").doc(user.uid).set({
                                name: user.displayName,
                                email: user.email,
                                phone: user.phone
                            }).then(function () {
                                console.log("New user added to firestore");
                                window.location.assign("main.html");
                                
                            })
                                .catch(function (error) {
                                    console.log("Error adding new user: " + error);
                                });
                        } else {
                            return true;
                        }
                        return false;
                    },
                    uiShown: function () {
                        // The widget is rendered.
                        // Hide the loader.
                        document.getElementById('loader').style.display = 'none';
                    }
                },
                // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
                signInFlow: 'popup',
                signInSuccessUrl: 'main.html',
                signInOptions: [
                    // Leave the lines as is for the providers you want to offer your users.
                    firebase.auth.EmailAuthProvider.PROVIDER_ID,
                    firebase.auth.PhoneAuthProvider.PROVIDER_ID
                ],
                // Terms of service url.
                tosUrl: '<your-tos-url>',
                // Privacy policy url.
                privacyPolicyUrl: '<your-privacy-policy-url>'
            };
            ui.start('#firebaseui-auth-container', uiConfig);
           

            firebase.auth().useDeviceLanguage();
            window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
                'size': 'invisible',
                'callback': function(response) {
                  // reCAPTCHA solved, allow signInWithPhoneNumber.
                  onSignInSubmit();
                }
              });
              var phoneNumber = getPhoneNumberFromUserInput();
var appVerifier = window.recaptchaVerifier;
firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
    .then(function (confirmationResult) {
      // SMS sent. Prompt user to type the code from the message, then sign the
      // user in with confirmationResult.confirm(code).
      window.confirmationResult = confirmationResult;
    }).catch(function (error) {
      // Error; SMS not sent
      // ...
    });
    window.recaptchaVerifier.render().then(function(widgetId) {
        grecaptcha.reset(widgetId);
      });
      var code = getCodeFromUserInput();
confirmationResult.confirm(code).then(function (result) {
  // User signed in successfully.
  var user = result.user;
  // ...
}).catch(function (error) {
  // User couldn't sign in (bad verification code?)
  // ...
  signInSuccessUrl: 'main.html'
});
var credential = firebase.auth.PhoneAuthProvider.credential(confirmationResult.verificationId, code);
firebase.auth().signInWithCredential(credential);


//TEST NUMBER!!!
// Turn off phone auth app verification.
firebase.auth().settings.appVerificationDisabledForTesting = true;

var phoneNumber = "+16047794239";
var testVerificationCode = "123456";

// This will render a fake reCAPTCHA as appVerificationDisabledForTesting is true.
// This will resolve after rendering without app verification.
var appVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
// signInWithPhoneNumber will call appVerifier.verify() which will resolve with a fake
// reCAPTCHA response.
firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
    .then(function (confirmationResult) {
      // confirmationResult can resolve with the fictional testVerificationCode above.
      return confirmationResult.confirm(testVerificationCode)
    }).catch(function (error) {
      // Error; SMS not sent
      // ...
    });
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
      }).catch(function(error) {
        // An error happened.
      });