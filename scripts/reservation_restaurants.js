const reservation = document.querySelector('.reservation');
const reservationPop = document.querySelector('#pop-up-menu p');
const reservationHead = document.querySelector('#pop-up-menu h1');
const name = document.querySelector('.left h2');



auth.onAuthStateChanged(function (user) {
    if (user) {
        //When book button is clicked, it saves to the firestore
        reservation.addEventListener('submit', function (e) {
            e.preventDefault();
            if (reservation.date.value != 'yyyy-mm-dd'
                && reservation.time.value != 'hour-select'
                && reservation.people.value != 'ppl-select') {
                db.collection('users').doc(user.uid).get().then(function (snap) {
                    db.collection('restaurants').doc(docID).get().then(function (snapshot) {
                        var restName = snapshot.data().name;
                        var restLocation = snapshot.data().location;
                        var reserver = snap.data().name;
                        var date = reservation.date.value;
                        var people = reservation.people.value;
                        var reservationDate = new Date(reservation.date.value);

                        var utcDate = reservationDate.getUTCDate().toString();
                        var utcYear = reservationDate.getUTCFullYear().toString();
                        var utcMonth = (reservationDate.getUTCMonth() + 1).toString();

                        var d = new Date(`${utcYear}-${utcMonth}-${utcDate}`);
                        var utcTime = d.getTime();
                        var reservedTime = reservation.time.value;
                        
                        //this is going to be on the upcoming reservations on users' profile
                        db.collection('restaurants').doc(docID).collection('reservation').add({
                            name: restName,
                            location: restLocation,
                            reserver: reserver,
                            reserverId: user.uid,
                            time: utcTime,
                            date: date,
                            people: people,
                            reservedTime: reservedTime,
                            document: docID
                        });
                        reservation.date.value = "yyyy-mm-dd";
                        reservation.people.value = "ppl-select";
                        reservation.time.value = "hour-select";
                    })

                })
                //After successfully booking, this pop-up pops up
                reservationHead.textContent = "Thanks for booking!";
                reservationPop.textContent = "Your booking has been successfully processed";
                popBg.style = 'visibility: initial';
                popContainer.style = 'visibility: initial';
                popMenu.style = 'visibility: initial';
                ok.style = 'visibility: initial';
            } else {
                //Asks the users to fill the requirements for booking
                reservationPop.textContent = "Please fill all the requirements";
                popBg.style = 'visibility: initial';
                popContainer.style = 'visibility: initial';
                popMenu.style = 'visibility: initial';
                ok.style = 'visibility: initial';
            }
            // Users click confirm button after the pop-up pops up
            ok.addEventListener('click', function (e) {
                reservationHead.textContent = "Warning!"
                reservationPop.textContent = "Please login to comment";
                popBg.style = 'visibility: hidden';
                popContainer.style = 'visibility: hidden';
                popMenu.style = 'visibility: hidden';
                ok.style = 'visibility: hidden';
            })
        })
    } else {
        console.log('users are not currently logged in.');
    }
});




