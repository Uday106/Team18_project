const display = document.querySelector('.card-body');
const form = document.querySelector('#change-name');

function getUser() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log("user is signed in");
            db.collection("users")
                .doc(user.uid)
                .get()
                .then(function (doc) {
                    var n = doc.data().name;
                    var e = doc.data().email;

                    var name1 = document.createElement('p');
                    var email1 = document.createElement('p');

                    name1.textContent = n;
                    email1.textContent = e;

                    display.appendChild(name1);
                    display.appendChild(email1);




                })
        } else {
            console.log("no user is signed in");
        }
    })
}

//saving data
form.addEventListener('submit', (e) => {
    e.preventDefault(); //submit does not load a new page
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {          
            console.log('user is signed in');
            db.collection('users').doc(user.uid).update({
                name: form.name.value
            });
            form.name.value = '';
        } else {
            console.log('no user is signed in');
        }
    })

});


getUser();

