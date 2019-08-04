var express    	  = require("express"),
	app        	  = express(),
	bodyParser 	  = require("body-parser"),
	mongoose   	  = require("mongoose"),
	Campground 	  = require("./models/campground"),
	Comment    	  = require("./models/comment"),
	seedDB     	  = require("./seeds"),
	passport   	  = require("passport"),
	LocalStrategy = require ("passport-local"),
	User 		  = require("./models/user"),
	methodOverride = require("method-override"),
	flash 		   = require("connect-flash");

// Requiring routes
var commentRoutes 	  = require("./routes/comments"),
	campgroundRoutes = require("./routes/campgrounds"),
	indexRoutes 	  = require("./routes/index");

// seedDB(); // Seed the database
// mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true });
mongoose.connect("mongodb+srv://onurcokyasar:123@cluster0-3oiad.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true });
// abc12343oban21
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

// PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret: "Once again Rusty wins cutest dog!",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(8080, function() { 
  console.log('Server listening on port 8080'); 
});