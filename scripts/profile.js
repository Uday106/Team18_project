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

const img = document.querySelector('.logo');
img.addEventListener('click', function (e) {
    window.location = 'main.html';
});
const home = document.querySelector('#home');
const profile = document.querySelector('#profile');
const home2 = document.querySelector('#home2');
const profile2 = document.querySelector('#profile2');

home.addEventListener('click', function (e) {
    window.history.go(-1);
});

home2.addEventListener('click', function (e) {
    window.history.go(-1);
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
const displayHere = document.querySelector('#reser-container');
auth.onAuthStateChanged(function (user) {
    if (user) {
        console.log('user logged in:', user);
        userInfo(user);
        console.log(displayHere);

        //add more when restaurants/grocery shops are added.
        const array_rest = ['01', '02', '03', '04', '05', '06', '07', '08'];
        const array_gro = ['01', '02', '03', '04', '05'];

        //read all the restaurants
        array_rest.forEach(function (value) {
            //read all the reservations from each restaurant
            db.collection('restaurants').doc(value).collection('reservation')
                .onSnapshot(function (snap) {
                    let changes = snap.docChanges();
                    changes.forEach(function (change) {
                        if (change.type == 'added') {
                            //check whether the reserver equals to the current user
                            //if reserver is the current user...
                            if (change.doc.data().reserverId == user.uid) {
                                const documentID = change.doc.data().document;

                                let div = document.createElement('div');
                                let restName = document.createElement('div');
                                let restLocation = document.createElement('div');
                                let reserver = document.createElement('div');
                                let people = document.createElement('div');
                                let date = document.createElement('div');
                                let reservedTime = document.createElement('div');
                                let cancel = document.createElement('button');
                                
                                restName.textContent = 'Restaurant: ' + change.doc.data().name;
                                restLocation.textContent = 'Location: ' + change.doc.data().location;
                                reserver.textContent = 'Reserver: ' + change.doc.data().reserver;
                                people.textContent = 'How many people: ' + change.doc.data().people;
                                date.textContent = 'Date: ' + change.doc.data().date;
                                reservedTime.textContent = 'Time: ' + change.doc.data().reservedTime;
                                cancel.textContent = 'Cancel';
                                cancel.setAttribute('id','cancel');

                                div.appendChild(restName);
                                div.appendChild(restLocation);
                                div.appendChild(reserver);
                                div.appendChild(people);
                                div.appendChild(date);
                                div.appendChild(reservedTime);
                                div.appendChild(cancel);
                                div.setAttribute('data-id', change.doc.id);
                                displayHere.appendChild(div);

                                //cancelling reservation
                                cancel.addEventListener('click', function(e) {
                                    e.stopPropagation();
                                    let id = e.target.parentElement.getAttribute('data-id');
                                    if (user.uid == change.doc.data().reserverId) {
                                        db.collection('restaurants').doc(documentID)
                                            .collection('reservation').doc(id).delete();
                                    }

                                })

                            }
                        } else if (change.type == 'removed') {
                            let div = document.querySelector('[data-id=' + change.doc.id + ']');
                            div.parentElement.removeChild(div);
                        }
                    })
                })
        })

        //read all the grocery stores
        array_gro.forEach(function (value) {
            //read all the reservations from each grocery store
            db.collection('Grocery Store').doc(value).collection('reservation')
                .onSnapshot(function (snap) {
                    let changes = snap.docChanges();
                    changes.forEach(function (change) {
                        if (change.type == 'added') {
                            //check whether the reserver equals to the current user
                            //if reserver is the current user...
                            if (change.doc.data().reserverId == user.uid) {
                                const documentID = change.doc.data().document;

                                let div = document.createElement('div');
                                let restName = document.createElement('div');
                                let restLocation = document.createElement('div');
                                let reserver = document.createElement('div');
                                let people = document.createElement('div');
                                let date = document.createElement('div');
                                let reservedTime = document.createElement('div');
                                let cancel = document.createElement('button');
                                
                                restName.textContent = 'Grocery Store: ' + change.doc.data().name;
                                restLocation.textContent = 'Location: ' + change.doc.data().location;
                                reserver.textContent = 'Reserver: ' + change.doc.data().reserver;
                                people.textContent = 'How many people: ' + change.doc.data().people;
                                date.textContent = 'Date: ' + change.doc.data().date;
                                reservedTime.textContent = 'Time: ' + change.doc.data().reservedTime;
                                cancel.textContent = 'Cancel';
                                cancel.setAttribute('id','cancel');

                                div.appendChild(restName);
                                div.appendChild(restLocation);
                                div.appendChild(reserver);
                                div.appendChild(people);
                                div.appendChild(date);
                                div.appendChild(reservedTime);
                                div.appendChild(cancel);
                                div.setAttribute('data-id', change.doc.id);
                                displayHere.appendChild(div);

                                //cancelling reservation
                                cancel.addEventListener('click', function(e) {
                                    e.stopPropagation();
                                    let id = e.target.parentElement.getAttribute('data-id');
                                    if (user.uid == change.doc.data().reserverId) {
                                        db.collection('Grocery Store').doc(documentID)
                                            .collection('reservation').doc(id).delete();
                                    }

                                })

                            }
                        } else if (change.type == 'removed') {
                            let div = document.querySelector('[data-id=' + change.doc.id + ']');
                            div.parentElement.removeChild(div);
                        }
                    })
                })
                
        })

        //Reservations vs About Me
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

            //About me, upon clicking 'save changes' button
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
                    //if user wants to change email...
                    if (snapshot.data().email != email) {
                        popBg.style = 'visibility: initial';
                        popCtn.style = 'visibility: initial';
                        popMenu.style = 'visibility: initial';
                        authForm.style = 'visibility: initial';

                        exit.addEventListener('click', function (event) {
                            popBg.style = 'visibility: hidden';
                            popCtn.style = 'visibility: hidden';
                            popMenu.style = 'visibility: hidden';
                            authForm.style = 'visibility: hidden';
                            window.location = "profile.html";
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