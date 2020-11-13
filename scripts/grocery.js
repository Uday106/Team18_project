const groceryList = document.querySelector('.grid-container');

// create element and render cafe
function renderCafe(doc){
    let card = document.createElement('div');
    let name = document.createElement('p');
    let location = document.createElement('p');
    let reserve = document.createElement('a');


    card.setAttribute('data-id', doc.id);
    reserve.setAttribute('href', '');
    name.textContent = doc.data().name;
    location.textContent = doc.data().location;
    reserve.textContent = 'reserve';

    card.appendChild(name);
    card.appendChild(location);
    card.appendChild(reserve);
    groceryList.appendChild(card);



    reserve.addEventListener('click', (e) => {
        e.preventDefault();
        let id = e.target.parentElement.getAttribute('data-id');
        console.log(id);
        console.log(db.collection('Grocery Store').doc(id).collection('reservation').doc('am1'));
        db.collection('Grocery Store').doc(id).collection('reservation').doc('am1').update({
            'taken': true
        });
    })
};


db.collection('Grocery Store').get().then((snap) => {
    snap.docs.forEach((doc) => {
        renderCafe(doc);
    })
});







