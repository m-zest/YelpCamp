const express = require("express");
const router = express.Router({ mergeParams: true });
const Campground = require("../models/campground");
const Comment = require("../models/comment");
const middleware = require("../middleware")


// Comments new
router.get("/new", middleware.isLoggedIn, function(req, res) {
    // find campground by id
    Campground.findById(req.params.id, function(err, campground) {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", { campground: campground })
        }
    })
})

//Comments Create
// POST for Comments
router.post("/", middleware.isLoggedIn, function(req, res) {
    // look up campground using ID
    Campground.findById(req.params.id, function(err, campground) {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds")
        } else {
            // create new comment
            // connect new comment to campground
            // redirect campground show page
            Comment.create(req.body.comment, function(err, comment) {
                if (err) {
                    req.flash("error", "Something went wrong")
                    console.log(err);
                } else {
                    //add username and id to comments
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //save comment
                    comment.save();
                    campground.comments.push(comment)
                    campground.save()
                    req.flash("success", "Successfully added comment")
                    res.redirect('/campgrounds/' + campground._id)
                }
            })
        }
    })
})

// COMMENT EDIT ROUTE
router.route("/:comment_id/edit").get(middleware.checkCommnetOwnership, function(req, res) {
    Comment.findById(req.params.comment_id, function(err, foundComment) {
        if (err) {
            res.redirect("back")
        } else {
            res.render("comments/edit", {
                campground_id: req.params.id,
                comment: foundComment
            })
        }
    })
})

// COMMENT UPDATE
router.route("/:comment_id").put(middleware.checkCommnetOwnership, function(req, res) {
    Comment.findOneAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment) {
        if (err) {
            res.redirect("back")
        } else {
            res.redirect("/campgrounds/" + req.params.id)
        }
    })
})

// COMMENTS DESTROY ROUTE
router.route("/:comment_id").delete(middleware.checkCommnetOwnership, function(req, res) {
    // find by id and remove
    Comment.findOneAndRemove(req.params.comment_id, function(err) {
        if (err) {
            res.redirect("back")
        } else {
            req.flash("success", "Comment Deleted!")
            res.redirect("/campgrounds/" + req.params.id)
        }
    })
})

module.exports = router;