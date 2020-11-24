// log out ... second event handler is for mobile ver
const logout = document.querySelector('#logout');
logout.addEventListener('click', function (e) {
    e.preventDefault();
    auth.signOut();
    window.location = '../index.html';
});

const logout2 = document.querySelector('#logout2');
logout2.addEventListener('click', function (e) {
    e.preventDefault();
    auth.signOut();
    window.location = '../index.html';
});

// navigation ... second event handler is for mobile ver
const img = document.querySelector('.logo');
const profile = document.querySelector('#profile');
const profile2 = document.querySelector('#profile2');

img.addEventListener('click', function(e) {
    window.location = '../main.html';
});
profile.addEventListener('click', function(e) {
    window.location = '../profile.html';
});

profile2.addEventListener('click', function(e) {
    window.location = '../profile.html';
});

function openNav() {
    document.getElementById('mobile_menu').style.width = "100%";
}

function closeNav() {
    document.getElementById('mobile_menu').style.width = "0";
}

// click overview or click reviews
const overviewBtn = document.querySelector('.overviewBtn');
const reviewBtn = document.querySelector('.reviewBtn');
const overview = document.querySelector('.overview');
const review = document.querySelector('.reviews');

overviewBtn.addEventListener('click', function(e) {
    overviewBtn.style = "color: #BC4749; border-bottom: 4px solid #BC4749;";
    reviewBtn.style = "color: black; border: none; ";
    overview.style.display = 'block';
    review.style.display = 'none';
});

reviewBtn.addEventListener('click', function(e) {
    reviewBtn.style = "color: #BC4749; border-bottom: 4px solid #BC4749;";
    overviewBtn.style = "color: black; border: none; ";
    review.style.display = 'block';
    overview.style.display = 'none';
});

// view/hide comments
const comments = document.querySelector('#comments-container');
const viewBtn = document.querySelector('#view');
const hideBtn = document.querySelector('#hide');

viewBtn.addEventListener('click', function(e) {
    viewBtn.style.display = 'none';
    hideBtn.style.display = 'block';
    comments.style.display = "block"
});

hideBtn.addEventListener('click', function(e) {
    viewBtn.style.display = 'block';
    hideBtn.style.display = 'none';
    comments.style.display = "none";
});

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