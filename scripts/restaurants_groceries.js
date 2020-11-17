// tracking user
auth.onAuthStateChanged(function (user) {
    if (user) {
        console.log('user logged in:', user);
    } else {
        console.log('user logged out');
    }
});

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

home.addEventListener('click', function(e) {
    window.location = 'main.html';
});

home2.addEventListener('click', function(e) {
    window.location = 'main.html';
});

profile.addEventListener('click', function(e) {
    window.location = 'profile.html';
});

profile2.addEventListener('click', function(e) {
    window.location = 'profile.html';
});

// mobile-menu navigation
function openNav() {
    document.getElementById('mobile_menu').style.width = "100%";
}

function closeNav() {
    document.getElementById('mobile_menu').style.width = "0";
}