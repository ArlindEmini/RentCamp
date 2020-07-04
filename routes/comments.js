var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

// COMMENTS ROUTES ================
router.get("/campgrounds/:id/comments/new", middleware.isLoggedIn, function(req, res){
    Campground.findById(req.params.id,function(err, foundCampground){
        if(err){
            console.log(err);
        }else{
            res.render("comments/new", {campground: foundCampground});
        }
    });
});

// comments create
router.post("/campgrounds/:id/comments", middleware.isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        }else{
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                }else{
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    console.log(comment);
                    req.flash("success", "Successfuly added a comment");
                    res.redirect("/campgrounds/"+ campground._id );
                }
            });
        }
    });
});

// edit comment route
router.get("/campgrounds/:id/comments/:comment_id/edit", middleware.checkCommentOwnership, function(req,res){
    Comment.findById(req.params.comment_id, function(err, foundedComment){
        if(err){
            console.log(err);
        }else{
            res.render("comments/edit", {campground_id : req.params.id, comment:foundedComment});
        }
    });
});

// update comment route
router.put("/campgrounds/:id/comments/:comment_id", middleware.checkCommentOwnership, function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        // if(err){
        //     console.log(err);
        // } else{
            req.flash("success", "successfuly edited a comment");
            res.redirect("/campgrounds/"+ req.params.id);
        // }
    });
});

// destroy comment route
router.delete("/campgrounds/:id/comments/:comment_id", middleware.checkCommentOwnership, function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err, removedComment){
        // if(err){
        //     console.log(err);
        //     res.redirect("back");
        // } else {
            req.flash("success", "successfuly deleted a comment");
            res.redirect("back");
        // }
    });
});

module.exports = router;
