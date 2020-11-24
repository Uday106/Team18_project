// tracking user
auth.onAuthStateChanged(function (user) {
    if (user) {
        console.log('user logged in:', user);
    } else {
        console.log('user logged out');
        logout.textContent = 'Login';
        logout2.textContent = 'Login';
        profile.style.display = 'none';
        profile2.style.display = 'none';
    }
});

// log out ... second event handler is for mobile ver
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

// navigation ... second event handler is for mobile ver
const img = document.querySelector('.logo');
const profile = document.querySelector('#profile');
const profile2 = document.querySelector('#profile2');

img.addEventListener('click', function(e) {
    window.location = 'main.html';
});


profile.addEventListener('click', function(e) {
    window.location = 'profile.html';
});

profile2.addEventListener('click', function(e) {
    window.location = 'profile.html';
});

function openNav() {
    document.getElementById('mobile_menu').style.width = "100%";
}

function closeNav() {
    document.getElementById('mobile_menu').style.width = "0";
}


//search feature
const searchBar = document.forms['search'].querySelector('input');
const namelist = document.querySelectorAll('.card-descript h2');

searchBar.addEventListener('keyup', function(e) {
    const term = e.target.value.toLowerCase();

    namelist.forEach(function(card) {
        const nameTitle = card.parentElement.querySelector('h2').textContent
        const locationTitle = card.parentElement.querySelector('h5').textContent
        
        if (nameTitle.toLowerCase().indexOf(term) != -1 
            || locationTitle.toLowerCase().indexOf(term) != -1) {
            card.parentElement.parentElement.style.display = 'block';
        } else {
            card.parentElement.parentElement.style.display = 'none';
        }
    
    });
});

//each card directs to different pages
const cards = document.querySelectorAll('.card');

cards.forEach(function(card) {
    card.addEventListener('click', function(e) {
        if (e.target.tagName == 'H2' || e.target.tagName == 'H5'
            || e.target.tagName == 'IMG') {
                var groceryStore = e.target.parentElement.parentElement.getAttribute('goto');
                window.location = groceryStore;
            } else if (e.target.tagName == 'DIV') {
                var groceryStore = e.target.getAttribute('goto');
                window.location = groceryStore;
            } else {
                console.log('card not clicked');
            }
        
    })
})

