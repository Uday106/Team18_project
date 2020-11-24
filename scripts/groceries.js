const home = document.querySelector('#home');
const home2 = document.querySelector('#home2');
const form = document.querySelector('#comment');
const commentsList = document.querySelector('#comments-container');
const popBg = document.querySelector('#pop-up-background');
const popContainer = document.querySelector('#pop-up-container');
const popMenu = document.querySelector('#pop-up-menu');
const ok = document.querySelector('#ok');
const popMenu2 = document.querySelector('#pop-up-menu2');
const ok2 = document.querySelector('#ok2');
const noAccessBtn = document.querySelector('#noAccess');


//Navigation to  different pages
home.addEventListener('click', function (e) {
    window.location = '../groceries.html';
});
home2.addEventListener('click', function (e) {
    window.location = '../groceries.html';
});

//Overview of Grocery Store
const docID = String(document.querySelector('.container').getAttribute('id'));
db.collection('Grocery Store').doc(docID).get().then(function (snapshot) {
    const name = document.querySelector('.left h2');
    const location = document.querySelector(".left h5");
    const overview = document.querySelector(".overview");
    const overviewHeader = document.createElement('h3');
    overviewHeader.textContent = 'Overview';


    const shortDescript = document.createElement('div');

    name.textContent = snapshot.data().name;
    location.textContent = snapshot.data().location;
    shortDescript.textContent = snapshot.data().overview;

    overview.appendChild(overviewHeader);
    overview.appendChild(shortDescript);
});


//Track users
auth.onAuthStateChanged(function (user) {
    if (user) {
        console.log('user logged in:', user);
        //save comments to firestore
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const date = new Date();
            const dateString = date.toDateString();
            if (form.content.value != '') {
                db.collection('users').doc(user.uid).get().then(function(snap) {
                    var reviewerName = snap.data().name;
                    var content = form.content.value;
                    console.log(content);
                    db.collection('Grocery Store').doc(docID).collection('comments').add({
                        comment: content,
                        reviewerId: user.uid,
                        reviewer: reviewerName,
                        time: dateString
                    });
                    form.content.value = '';
                })
            }  
        });

        //real-time listener
        db.collection('Grocery Store').doc(docID)
            .collection('comments')
            .onSnapshot(function (snapshot) {
                let changes = snapshot.docChanges();
                changes.forEach(change => {
                    //if comments are added ... display it on the html file.
                    if (change.type == 'added') {
                        let div = document.createElement('div');
                        let reviewer = document.createElement('div');
                        let comment = document.createElement('div');
                        let cross = document.createElement('span');
                        let date = document.createElement('span');

                        div.setAttribute('data-id', change.doc.id);
                        div.setAttribute('class', 'comment-info');
                        cross.setAttribute('class', 'delete');
                        comment.textContent = change.doc.data().comment;
                        reviewer.textContent = change.doc.data().reviewer;
                        date.textContent = change.doc.data().time;
                        cross.textContent = 'x';

                        div.appendChild(reviewer);
                        reviewer.appendChild(date);
                        div.appendChild(comment);
                        div.appendChild(cross);
                        commentsList.appendChild(div);

                        //deleting comments
                        cross.addEventListener('click', function (e) {
                            e.stopPropagation();
                            let id = e.target.parentElement.getAttribute('data-id');
                            //users can delete only their comments, not others.
                            if (user.uid == change.doc.data().reviewerId) {
                                db.collection('Grocery Store').doc(docID)
                                    .collection('comments').doc(id).delete();
                            } else {
                                //if users try to delete others' comments this pops up
                                popBg.style = 'visibility: initial';
                                popContainer.style = 'visibility: initial';
                                popMenu2.style = 'visibility: initial';
                                ok2.style = 'visibility: initial';
                            }
                            // pop-up disappears upon clicking this
                            ok2.addEventListener('click', function(e) {
                                popBg.style = 'visibility: hidden';
                                popContainer.style = 'visibility: hidden';
                                popMenu2.style = 'visibility: hidden';
                                ok2.style = 'visibility: hidden';
                            })

                        })
                    } else if (change.type == 'removed') {
                        //else if comments are deleted. delete it from html file.
                        let div = document.querySelector('[data-id=' + change.doc.id + ']');
                        commentsList.removeChild(div);
                    }
                })
            });
    } else {
        // if users are not logged in display a differnt html file so that
        // they cannot use comment features
        console.log('user logged out');
        viewBtn.style.display = "none";
        hideBtn.style.display = "none";
        noAccessBtn.style.display = "block";
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            popBg.style = 'visibility: initial';
            popContainer.style = 'visibility: initial';
            popMenu.style = 'visibility: initial';
            ok.style = 'visibility: initial';
        })
        ok.addEventListener('click', function(e) {
            popBg.style = 'visibility: hidden';
            popContainer.style = 'visibility: hidden';
            popMenu.style = 'visibility: hidden';
            ok.style = 'visibility: hidden';
        })
    }
});