

const docRef = firestore.doc("users/c5fs2hy6yqhzNYHRC4fVWxc1EgQ2");
const outputHeader = document.querySelector("#output");
const inputTextField = document.querySelector("#input"); //lat
const button = document.querySelector("#change");

change.addEventListener("click", function(){
    const textToSave = inputTextField.value;
    console.log("I am going to save" + textToSave + "to firestore");
    docRef.set({
        nameStatus: textToSave
    }).then(function(){
        console.log("Status Saved");
    }).catch(function (error){
        console.log("Error:", error);
    });
});

// Update = function() {
//     docRefRef.onSnapshot(function(doc) {
//         if (doc && doc.exists) {
//             const myData = doc.data();
//             outputHeader.innerText = myData.nameStatus;

//         }
//     });
// }

// getUpdate();
