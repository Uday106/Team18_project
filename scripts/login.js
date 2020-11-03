var ui = new firebaseui.auth.AuthUI(firebase.auth());
            var uiConfig = {
                callbacks: {
                    signInSuccessWithAuthResult: function (authResult, redirectUrl) {
                        var user = authResult.user;
                        if (authResult.additionalUserInfo.isNewUser) {
                            db.collection("users").doc(user.uid).set({
                                name: user.displayName,
                                email: user.email
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
                signInSuccessUrl: 'index.html',
                signInOptions: [
                    // Leave the lines as is for the providers you want to offer your users.
                    firebase.auth.EmailAuthProvider.PROVIDER_ID
                ],
                // Terms of service url.
                tosUrl: '<your-tos-url>',
                // Privacy policy url.
                privacyPolicyUrl: '<your-privacy-policy-url>'
            };
            ui.start('#firebaseui-auth-container', uiConfig);