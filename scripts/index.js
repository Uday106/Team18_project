// sign up
const signupForm = document.querySelector('#signup-form');

signupForm.addEventListener('submit', function(e) {
    e.preventDefault();

    //get user info
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;
    const name = signupForm['name'].value;
    const phone = signupForm['phone'].value;

    // sign up new user
    auth.createUserWithEmailAndPassword(email, password).then(function (cred) {
        return db.collection('users').doc(cred.user.uid).set({
            name: name,
            email: email,
            phone: phone
        });
    }).then(() => {
        signupForm.reset();
        signupForm.querySelector('.error').innerHTML = '';
        window.location = 'main.html';
    }).catch(err => {
        signupForm.reset();
        signupForm.querySelector('.error').innerHTML = err.message;
    });
    
});

// lon in
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // get user info
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    // log in the user
    auth.signInWithEmailAndPassword(email, password).then(function () {
        loginForm.reset();
        loginForm.querySelector('.error').innerHTML = '';
        window.location = 'main.html';  
    }).catch(err => {
        loginForm.querySelector('.error').innerHTML = err.message;
    })
});