# YelpCamp

![Yelpcamp](https://user-images.githubusercontent.com/55718487/225575343-6a6f7982-c336-4452-a638-f5e58a9916c7.jpeg)

![HOME](https://user-images.githubusercontent.com/55718487/225570167-5cc232f8-b95c-43e4-be8c-72c4957dcc4c.jpeg)


Yelpcamp is fully functional NodeJs web app where users can create and review campgrounds. In order to review or create a campground, you must have an account. This project was part of web dev course which was done during code-along bootcamp.

This project was created using Node.js, Express, MongoDB, and Bootstrap. Passport.js was used to handle authentication.  

## Features
* Users can create, edit, and remove campgrounds
* Users can review campgrounds once, and edit or remove their review
* User profiles include more information on the user, their campgrounds, and the option to edit their profile or delete their account
* Search campground by name or location


## Run it locally
1. Install [mongodb](https://www.mongodb.com/)
2. Create a cloudinary account to get an API key and secret code

```
git clone https://github.com/m-zest/Yelp-2023.git
cd Yelp-2023
npm install
```

Create a .env file (or just export manually in the terminal) in the root of the project and add the following:  (Meanwhile I have connected the mongodb so you dont have to run locally)

```
DATABASEURL='<url>'
API_KEY=''<key>
API_SECRET='<secret>'
```

Run ```mongod``` in another terminal and ```node app.js``` in the terminal with the project.  

Then go to [localhost:3000](http://localhost:3000/).






