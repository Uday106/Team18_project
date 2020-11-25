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

// deleting past reservations from the firestore-----------------------------------------------------
var d = new Date();
var utcDate = d.getUTCDate().toString();
var utcYear = d.getUTCFullYear().toString();
var utcMonth = (d.getUTCMonth() + 1).toString();
var date = new Date(`${utcYear}-${utcMonth}-${utcDate}`);
var utcTime = date.getTime();

// 1. get the list of restaurants ...
db.collection('restaurants').get().then(function(snap) {

    // 2. for each restaurant...
    snap.docs.forEach(function(document) {

        // 3. get the list of reservations
        db.collection('restaurants').doc(document.id).collection('reservation')
        .get().then(function(snapshot) {

            // 4. for each reservation ...
            snapshot.docs.forEach(function(doc) {

                // 5. checks whether the date is the past date ... 
                if (doc.data().time < utcTime) {

                    // 6. if the date is in the past, delete the reservation
                    db.collection('restaurants').doc(document.id).collection('reservation')
                    .doc(doc.id).delete();
                }
            })
        })
    })
})

// 1. get the list of grocery shops ...
db.collection('Grocery Store').get().then(function(snap) {

    // 2. for each grocery shop...
    snap.docs.forEach(function(document) {

        // 3. get the list of reservations
        db.collection('Grocery Store').doc(document.id).collection('reservation')
        .get().then(function(snapshot) {

            // 4. for each reservation ...
            snapshot.docs.forEach(function(doc) {

                // 5. checks whether the date is the past date ... 
                if (doc.data().time < utcTime) {

                    // 6. if the date is in the past, delete the reservation
                    db.collection('Grocery Store').doc(document.id).collection('reservation')
                    .doc(doc.id).delete();
                }
            })
        })
    })
})

//--------------------------------------------------------------------------------------------------