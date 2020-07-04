var Campground = require("../models/campground"),
    Comment    = require("../models/comment");


var middlewareObj = {}

middlewareObj.checkCampgroundOwnership = function(req,res,next){
    if(req.isAuthenticated ()){    
        Campground.findById(req.params.id, function(err, foundedCampground){
            if(err){
                res.redirect("back");
            } else{
                if(foundedCampground.author.id.equals(req.user._id)){
                    next();
                } else {
                    res.redirect("back");
                }
            }
        });
    }else{
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function(req, res,next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err,foundedComment){
            if(err){
                consolse.log(err);
                res.redirect("back");
            } else {
                if(foundedComment.author.id.equals(req.user._id)){
                    next();
                } else {
                    res.redirect("back");
                }
            }
        });
    } else {
        res.redirect("back");
    }
    
}

middlewareObj.isLoggedIn = function(req,res,next){
    if(req.isAuthenticated()){
       return next();
    }
    req.flash("error", "You must login first!");
    res.redirect("/login");
}

module.exports = middlewareObj; 



