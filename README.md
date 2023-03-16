# YelpCamp Project

![Yelpcamp](https://user-images.githubusercontent.com/55718487/225575343-6a6f7982-c336-4452-a638-f5e58a9916c7.jpeg)

![HOME](https://user-images.githubusercontent.com/55718487/225570167-5cc232f8-b95c-43e4-be8c-72c4957dcc4c.jpeg)


Yelpcamp is fully functional NodeJs web app where users can create and review campgrounds. In order to review or create a campground, you must have an account. This project was part of website devevelopment which was done during code-along bootcamp in college.

This project was created using Node.js, Express, MongoDB, ejs, HTML5, CSS3, Javascript, and Bootstrap. Passport.js was used to handle authentication.  

## Features
* Users can create, edit, and remove campgrounds
* Users can review campgrounds once, and edit or remove their review
* User profiles include more information on the user, their campgrounds, and the option to edit their profile or delete their account
* Search campground by name or location

This is a Node.js/Express application that sets up a server to handle requests.

#### Here's what each section does:

#### Importing the necessary packages and modules:

* express is a web framework for Node.js.
* body-parser is middleware that allows parsing of request bodies.
* mongoose is a library for connecting to MongoDB and working with data.
* ObjectID is a constructor function from the mongodb package for creating MongoDB ObjectIDs.
* flash is middleware for displaying flash messages.
* passport is a library for handling user authentication.
* LocalStrategy is a strategy for authenticating with a username and password.
* methodOverride is middleware for handling HTTP methods like PUT and DELETE.
* Campground, Comment, and User are models that define the schema for the data we'll be working with.
* seedDB is a function that populates the database with some initial data.

Modules that exports a router object for managing the routes related to campgrounds in a web application. The module uses the Express.js framework to create and manage routes.

#### The module contains the following routes:

* "/" - GET route for displaying all campgrounds in the database. It also allows searching for campgrounds by name using a regular expression.
* "/" - POST route for adding a new campground to the database. This route is protected by middleware that ensures only authenticated users can create new campgrounds.
* "/new" - GET route for displaying a form to create a new campground. This route is also protected by middleware that ensures only authenticated users can access the form.
* "/:id" - GET route for displaying the details of a specific campground. It uses the campground ID parameter to retrieve the campground from the database and also populates the campground with its comments.
* "/:id/edit" - GET route for displaying a form to edit a campground. This route is protected by middleware that ensures only the campground owner can access the form.
* "/:id" - PUT route for updating a specific campground. This route is also protected by middleware that ensures only the campground owner can update the campground.
* "/:id" - DELETE route for deleting a specific campground. This route is also protected by middleware that ensures only the campground owner can delete the campground.
 
#### Defining the routes:

* `commentRoutes`, `campgroundRoutes`, and `indexRoutes` are modules that handle requests to specific routes.
* `app.use()` mounts the route modules to their respective paths.

#### Middlewares :

* This is a middleware module that defines three functions: `checkCampgroundOwnership`, `checkCommentOwnership`, and `isLoggedIn`.

* `checkCampgroundOwnership` is a middleware function that checks if the currently authenticated user owns the campground being accessed by the request. If the user owns the campground, the next middleware is called. Otherwise, the user is redirected back to the previous page with an error message.

* `checkCommentOwnership` is a middleware function that checks if the currently authenticated user owns the comment being accessed by the request. If the user owns the comment, the next middleware is called. Otherwise, the user is redirected back to the previous page with an error message.

* `isLoggedIn` is a middleware function that checks if the user is authenticated. If the user is authenticated, the next middleware is called. Otherwise, the user is redirected to the login page with an error message.

* These middleware functions are used to restrict access to certain parts of the application to authenticated users or to specific users who own the resource being accessed.

#### Setting up the server:

* `app.listen()` starts the server on a specified port (in this case, either the port specified in the PORT environment variable or port 3000).
* The `console.log()` statement logs a message to the console indicating that the server has started.

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

Website link - http://18.119.115.235:3001/ or https://tender-bass-jumper.cyclic.app/ 




