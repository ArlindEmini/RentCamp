var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    flash       = require("connect-flash"),
    passport    = require("passport"),
    localStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    User        = require("./models/user"),
    SeedDB       = require("./seeds");

var commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes       = require("./routes/index");


mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect("mongodb://localhost/yelp_camp_v11test");

// mongoose.connect("mongodb+srv://arlind:Voidmainstring1@cluster0-tzh81.mongodb.net/yelpcamp?retryWrites=true&w=majority")


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));   
app.use(methodOverride("_method"));  
app.use(flash());
// SeedDB();


// PASSPORT CONFIGURATION
 app.use(require("express-session")({
    secret: "arlind secret",
    resave: false,
    saveUninitialized: false
 }));

 app.use(passport.initialize());
 app.use(passport.session());
 passport.use(new localStrategy(User.authenticate()));
 passport.serializeUser(User.serializeUser());
 passport.deserializeUser(User.deserializeUser());

// app.use will call this function in every single routes
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error"); 
    res.locals.success = req.flash("success");
    next();
});


app.use(commentRoutes);
app.use(campgroundRoutes);
app.use(indexRoutes);



app.listen(3000, function(){
    console.log("YelpCamp server has started");
});

// app.listen(process.env.PORT, process.env.IP);