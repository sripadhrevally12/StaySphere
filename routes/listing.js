const express = require ("express");
const router =  express.Router();
const wrapAsync =require("../utils/wrapAsync.js");
const  Listing= require("../models/listing.js");
const {isLoggedIn, isOwner,validateListing} =require("../middleware.js");
const listingController = require ("../controllers/listing.js");
const multer  = require('multer');
const {storage} = require ("../cloudConfig.js");
const upload = multer({ storage});
const escapeRegex = require("../utils/escapeRegex");



//Index and create Routes

router.route("/")
.get( wrapAsync(listingController.index))
.post ( isLoggedIn ,
  upload.single("listing[image]" ),
    validateListing,
    wrapAsync (listingController.createListing)
);


//New Route 

router.get("/new", isLoggedIn , listingController.renderNewForm);

// Search Route
router.get("/search", async (req, res) => {
  let { q } = req.query;

  if (!q || q.trim() === "") {
    return res.redirect("/listings");
  }

  const safeQuery = escapeRegex(q);

  const listings = await Listing.find({
    $or: [
      { title: { $regex: safeQuery, $options: "i" } },
      { location: { $regex: safeQuery, $options: "i" } },
      { country: { $regex: safeQuery, $options: "i" } }
    ]
  });

  res.render("listings/index", {
    allListings: listings,
    searchQuery: q
  });
});


//Show route , update route ,and Delete Route

router.route("/:id")
.get( wrapAsync(listingController.showListing))
.put( isLoggedIn , isOwner,
   upload.single("listing[image]" ), 
  validateListing,
   wrapAsync(listingController.updateListing))
.delete(isLoggedIn , isOwner, wrapAsync(listingController.destroyListing));


//Edit Route

router.get("/:id/edit", isLoggedIn ,isOwner, wrapAsync(listingController.renderEditForm));




module.exports = router;