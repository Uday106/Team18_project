const navRestaurants = document.querySelector('#toRestaurants');
const navGroceries = document.querySelector('#toGroceries');

navRestaurants.addEventListener('click', function(e) {
    e.preventDefault();
    window.location = 'restaurants.html';
});

navGroceries.addEventListener('click', function(e) {
    e.preventDefault();
    window.location = 'groceries.html';
});