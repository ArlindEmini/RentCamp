var express     = require("express");
var router      = express.Router();
var Campground  = require("../models/campground");
var Comment     = require("../models/comment");
var middleware  = require("../middleware");
const campground = require("../models/campground");
const middlewareObj = require("../middleware");


//
// CAMPGROUNDS ROUTES===========
//INDEX 
// Shows  all the campgrounds that are in the database by renderin the campgrounds.ejs
router.get("/campgrounds", function(req, res){
    
    Campground.find({}, function(error, allCampgrounds){
        if(error){
            console.log(error);
        }
        else{
            res.render("campgrounds/index", {campgrounds: allCampgrounds, currentUser: req.user});
        }
    });
});


//CREATE
// get the name image and description from new.ejs Form and add the new campground to the database
//and redirect us to the GET campgrounds.ejs to show all the campgrounds
router.post("/campgrounds", middleware.isLoggedIn, function(req, res){
 
    var name = req.body.name;
    var price = req.body.price;
    var image =  req.body.image;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = {name: name, price:price, img:image, description:description, author};
    Campground.create(newCampground, function(error, newlyCreated){
        if(error){
            console.log(error);
        }else{
            console.log("new campground has added");
            req.flash("success", "successfuly added a campground");
            res.redirect("/campgrounds");
        }
    });   
});

// NEW -- show the form to create new campground
// show the new Campgound form .ejs after that send us to the POST campgrounds
router.get("/campgrounds/new", middleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new");
});

//SHOW -- shows more info about one campground
router.get("/campgrounds/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        }
        else{
            console.log(foundCampground);
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });  
});

// edit form
router.get("/campgrounds/:id/edit", middleware.checkCampgroundOwnership, function(req,res){
    // if(req.isAuthenticated){    
        Campground.findById(req.params.id, function(err, foundedCampground){
            // if(err){
                // console.log(err);
            // } else{
                // if(foundedCampground.author.id.equals(req.user._id)){
                    res.render("campgrounds/edit", {campground : foundedCampground});
                // } else {
                    // res.send("You donw have permission to edit this");
                // }
            // }
        });
    // }else{
        // res.send("You have to login first");
    // }
});

// update route
router.put("/campgrounds/:id", middleware.checkCampgroundOwnership, function(req,res){
    
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            res.redirect("/campgrounds");
        } else{
            req.flash("success", "successfuly edited a campground");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

router.delete("/campgrounds/:id", middleware.checkCampgroundOwnership ,function(req,res){
    Campground.findByIdAndRemove(req.params.id, function(err,deletedCampground){
        if(err){
            console.log(err);
        } else{
            req.flash("success", "successfuly deleted a campground");
            res.redirect("/campgrounds");
        }
    });
});

router.get("/specific", middleware.isLoggedIn, function(req,res){
    campground.find({}, function(err, campgrounds){
        if(err){
            console.log(err);
        }
        else {
            res.render("campgrounds/specificindex", {campgrounds: campgrounds});
        }
    });
});

module.exports = router;