const cafeList = document.querySelector('#cafe-list');

// create element & render cafe
function renderCafe(doc){
    let li = document.createElement('li');
    let name = document.createElement('span');
    let location = document.createElement('span');

    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().name;
    location.textContent = doc.data().location;

    li.appendChild(name);
    li.appendChild(location);

    cafeList.appendChild(li);
}

// getting data
var docRef = db.collection("Grocery Store").doc("01");

docRef.get().then(function(doc) {
    if (doc.exists) {
        console.log("Document data:", doc.data());
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});

