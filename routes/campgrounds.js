const express = require("express");
const router = express.Router();
const Campground = require("../models/campground")
const middleware = require("../middleware")

//INDEX- show all campgrounds
router.get("/", function(req, res) {
    var noMatch = null;
    if (req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi')
        Campground.find({ name: regex }, function(err, allCampgrounds) {
            if (err) {
                console.log(err)
            } else {
                if (allCampgrounds.length < 1) {
                    noMatch = "No campgrounds match that query, please try again. "
                }
                res.render("campgrounds/index", { campgrounds: allCampgrounds, currentUser: req.user, page: 'campgrounds', noMatch: noMatch })
            }
        })
    } else {
        //Get all campgrounds from DB
        Campground.find({}, function(err, allCampgrounds) {
            if (err) {
                console.log(err)
            } else {
                res.render("campgrounds/index", { campgrounds: allCampgrounds, currentUser: req.user, page: 'campgrounds', noMatch: noMatch })
            }
        })
    }
});

//CREATE- Add a new dog to DB
router.post("/", middleware.isLoggedIn, function(req, res) {

    //get data from form and add to campgrouunds array
    const name = req.body.name;
    const price = req.body.price;
    const image = req.body.image;
    const desc = req.body.description;
    const author = {
        id: req.user._id,
        username: req.user.username
    }
    const newCampground = { name: name, price: price, image: image, description: desc, author: author }

    //Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated) {
        if (err) {
            console.log(err)
        } else {
            //redirect to campgrounds page
            console.log(newlyCreated);
            res.redirect("/campgrounds"); //when we use redirect,it will go to GET in case of two or more same route name
        }
    })
})

//NEW- show form to create new csmpground
router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("campgrounds/new")
})

//SHOW- shows more info about one campground
router.get("/:id", function(req, res) {
    //find the campground with the provided ID
    Campground.findById(req.params.id).populate('comments').exec(function(err, foundCampground) {
        if (err) {
            console.log(err)
        } else {
            //console.log(foundCampground);
            //render show template with that campground
            res.render("campgrounds/show", { campground: foundCampground })
        }
    })
})

// EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        res.render("campgrounds/edit", { campground: foundCampground })
    })
})

// UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res) {
    // find and update the corect campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
        if (err) {
            res.redirect("/campgrounds");
        } else {
            //rediect somewhere(shoow page)
            res.redirect("/campgrounds/" + req.params.id)
        }

    })
})

// DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findByIdAndRemove(req.params.id, function(err, ) {
        if (err) {
            res.redirect("/campgrounds")
        } else {
            req.flash('error', 'Campground deleted!');
            res.redirect("/campgrounds")
        }
    })
});

module.exports = router;