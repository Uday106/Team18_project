# Team18_project

Top level of project folder: 
├── .gitignore               # Git ignore file
├── index.html               # Signup/Login page
├── main.html                # landing HTML file, this is what users see when they are successfully logged in from index.html
├── profile.html             # User's profile page where users can see upcoming reservations and their name, email, phone number
├── restaurants.html         # Page where users can select a restaurant from the list of restaurants
├── groceries.html           # Page where users can select a grocery shop from the list of grocery shops
└── README.md

It has the following subfolders and files:
├── restaurants             # Folder for each restaurant
    /01.html                # the first restaurant page where details of the first restaurant is going to loaded
    /02.html                # the second restaurant page where details of the second restaurant is going to loaded
    /03.html                # the third restaurant page where details of the third restaurant is going to loaded
    /04.html                # the fourth restaurant page where details of the fourth restaurant is going to loaded
    /05.html                # the fifth restaurant page where details of the fifth restaurant is going to loaded
    /06.html                # the sixth restaurant page where details of the sixth restaurant is going to loaded
    /07.html                # the seventh restaurant page where details of the seventh restaurant is going to loaded
    /08.html                # the eighth restaurant page where details of the eighth restaurant is going to loaded
    
├── groceries               # Folder for each grocery shop
    /01.html                # the first grocery shop page where details of the first grocery shop is going to loaded
    /02.html                # the second grocery shop page where details of the second grocery shop is going to loaded
    /03.html                # the third grocery shop page where details of the third grocery shop is going to loaded
    /04.html                # the fourth grocery shop page where details of the fourth grocery shop is going to loaded
    /05.html                # the fifth grocery shop page where details of the fifth grocery shop is going to loaded

├── images                  # Folder for images
    /groceryBanner.jpg      # banner image for groceries.html
    /hamburger.png          # menu button
    /logo.png               
    /profile.png
    /restaurantBanner.jpg   # banner image for restaurants.html
    /search.png             # image for search bar
    
    ├── groceries           #Folder for each grocery shop's image
    /01.jpg
    /02.jpg
    /03.jpg
    /04.jpg
    /05.jpg
    
    ├── restaurants         #Folder for each restaurant's image
    /01.jpg
    /02.jpg
    /03.jpg
    /04.jpg
    /05.jpg
    
├── scripts                  # Folder for scripts
    /firebaseLoad.js         # setup for the firebase
    /groceries.js            # eventListeners DOM events for groceries.html
    /restaurants.js          # eventListeners DOM events for restaurants.html
    /index_animation.js      # eventListeners to add animation for index.html
    /index.js                # firebase read/write related to signup/login 
    /main.js                 # directing the pages to either groceries.html or restaurants.html
    /profile.js              # firebase read/write related to the 'users' collection and read/write 'reservation' collection
    /reservation_groceries.js       # it writes the data of reservation into the firebase 'reservation' collection
    /reservation_restaurants.js     # it writes the data of reservation into the firebase 'reservation' collection
    /restaurants_groceries.js       # eventListeners DOM events for restaurants/groceries.html
    /restaurants_groceries2.js      # eventListeners DOM events for 01~05 and 01~08 html files inside the folders that contain each restaurant/grocery shop
    
├── styles                   # Folder for styles
    /grocery.css             # banner image css styling for groceries.html
    /index.css               # css styling for login/signup page
    /main.css                # css styling for landing page
    /profile.css             # css styling for profile page
    /rest_gro_banner_image.css  # each document of restaurants/grocery shops take the image accordingly
    /restaurants.css        # banner image css styling for restaurants.html
    /styles.css             # general css styling for groceries/restaurants.html
    /styles2.css            # general css styling for 01~05/01~08 html files

Firebase hosting files: 
├── .firebaserc...
├── firebase.json
├── 404.html                # default page not found page made by firebase















