

// log out
const logout = document.querySelector('#logout');
logout.addEventListener('click', function (e) {
    e.preventDefault();
    auth.signOut();
    window.location = 'index.html';
});

const logout2 = document.querySelector('#logout2');
logout2.addEventListener('click', function (e) {
    e.preventDefault();
    auth.signOut();
    window.location = 'index.html';
});

// navigation
const home = document.querySelector('#home');
const profile = document.querySelector('#profile');
const home2 = document.querySelector('#home2');
const profile2 = document.querySelector('#profile2');

home.addEventListener('click', function (e) {
    window.location = 'main.html';
});

home2.addEventListener('click', function (e) {
    window.location = 'main.html';
});

// mobile-menu navigation
function openNav() {
    document.getElementById('mobile_menu').style.width = "100%";
};

function closeNav() {
    document.getElementById('mobile_menu').style.width = "0";
};


// read from firestore
const infoContainer = document.querySelector('#info');
const userInfo = (user) => {
    //account info
    db.collection('users').doc(user.uid).get().then(doc => {
        const html = `
            <div class="name">${doc.data().name}</div>
        `;
        infoContainer.innerHTML += html;
    });
};

//user can see reservation history or user info
const infoClicked = document.querySelector('#buttons ul');
const aboutMe = document.querySelector('#aboutMe');
const reservationInfo = document.querySelector('#reservations');

function displayUserInfo(user) {
    const name = document.querySelector('form').name;
    const email = document.querySelector('form').email;
    const phone = document.querySelector('form').phoneNumber;

    email.setAttribute('value', user.email);
    db.collection('users').doc(user.uid).get().then(function (snapshot) {
        name.setAttribute('value', snapshot.data().name);
        phone.setAttribute('value', snapshot.data().phone);
    })
}




// tracking user
auth.onAuthStateChanged(function (user) {
    if (user) {
        console.log('user logged in:', user);
        userInfo(user);

        infoClicked.addEventListener('click', function (e) {
            if (e.target.textContent == 'Reservations') {
                e.target.style = 'border-bottom: 3px solid #BC4749;';
                e.target.nextElementSibling.style = 'border-bottom: 1px solid grey;';
                reservationInfo.style = 'display: block;';
                aboutMe.style = 'display: none;';
            } else if (e.target.textContent == 'About Me') {
                e.target.style = 'border-bottom: 3px solid #BC4749;';
                e.target.previousElementSibling.style = 'border-bottom: 1px solid grey;';
                reservationInfo.style = 'display: none;';
                aboutMe.style = 'display: flex;';
                displayUserInfo(user);
            }

            aboutMe.addEventListener('submit', function (e) {
                e.preventDefault();
                const name = document.querySelector('#aboutMe').name.value;
                const email = document.querySelector('#aboutMe').email.value;
                const phone = document.querySelector('#aboutMe').phoneNumber.value;
                const popBg = document.querySelector('#pop-up-background');
                const popCtn = document.querySelector('#pop-up-container');
                const popMenu = document.querySelector('#pop-up-menu');
                const popMenu2 = document.querySelector('#pop-up-menu2');
                const authForm = document.querySelector('#authentication-form');
                const ok = document.querySelector('#ok');
                const cross2 = document.querySelector('#cross2');
                const exit = document.querySelector('#cross');


                db.collection('users').doc(user.uid).get().then(function (snapshot) {
                    if (snapshot.data().email != email) {
                        popBg.style = 'visibility: initial';
                        popCtn.style = 'visibility: initial';
                        popMenu.style = 'visibility: initial';
                        authForm.style = 'visibility: initial';

                        exit.addEventListener('click', function (event) {
                            event.preventDefault();
                            popBg.style = 'visibility: hidden';
                            popCtn.style = 'visibility: hidden';
                            popMenu.style = 'visibility: hidden';
                            authForm.style = 'visibility: hidden';
                        })

                        authForm.addEventListener('submit', function (event) {
                            event.preventDefault();
                            var password = document.querySelector('#password').value;
                            var confirmPassword = document.querySelector('#confirmPassword').value;
                            var displayError = document.querySelector('.error');

                            if (password == confirmPassword) {
                                const confirmedPassword = password;

                                auth.signInWithEmailAndPassword(snapshot.data().email, confirmedPassword)
                                    .then(function (userCredential) {
                                        userCredential.user.updateEmail(email)
                                        db.collection('users').doc(user.uid).update({
                                            name: name,
                                            email: email,
                                            phone: phone
                                        })
                                        displayError.textContent = '';
                                        popBg.style = 'visibility: initial';
                                        popCtn.style = 'visibility: hidden';
                                        popMenu.style = 'visibility: hidden';
                                        authForm.style = 'visibility: hidden';
                                        popMenu2.style = "visibility: initial";

                                        ok.addEventListener('click', function (e) {
                                            e.preventDefault();
                                            popBg.style = 'visibility: hidden';
                                            popMenu2.style = "visibility: hidden";
                                        })

                                        cross2.addEventListener('click', function (e) {
                                            e.preventDefault();
                                            popBg.style = 'visibility: hidden';
                                            popMenu2.style = "visibility: hidden";
                                        })

                                    }).catch(function (error) {
                                        displayError.textContent = error;
                                    })
                            }
                        })
                    } else if (snapshot.data().name == name && snapshot.data().email == email && snapshot.data().phone == phone) {

                    } else {
                        db.collection('users').doc(user.uid).update({
                            name: name,
                            email: email,
                            phone: phone
                        })
                        popBg.style = 'visibility: initial';
                        popMenu2.style = "visibility: initial";

                        ok.addEventListener('click', function (e) {
                            e.preventDefault();
                            popBg.style = 'visibility: hidden';
                            popMenu2.style = "visibility: hidden";
                        })

                        cross2.addEventListener('click', function (e) {
                            e.preventDefault();
                            popBg.style = 'visibility: hidden';
                            popMenu2.style = "visibility: hidden";
                        })

                }
            })

            const nameDisplay = infoContainer.firstElementChild;
            nameDisplay.textContent = name;



        })
    });
    } else {
    console.log('user logged out');
}
});