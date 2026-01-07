const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const Review= require ("./review.js");
const { required } = require("joi");

const listingSchema = new Schema ({
    title:{
        type:String,
        required:true,
    },

    description: {
      type:String,
      required:true,
    },
    image: {
       
        url:String,
        filename:String,
        // url:"https://images.unsplash.com/photo-1669673614578-210179f1cbde?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        // // set:(v) => v=== "" ? "default link" :v,
        // set: (v) => v === "" ? "https://images.unsplash.com/photo-1669673614578-210179f1cbde?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" : v,
    },

    price: {
      type:Number,
      required:true,
    },

    location: {
      type:String,
      required:true,
    },

    country: {
      type:String,
      required:true,
    },
    category: {
  type: String,
  required: true,
  default:"rooms",      //imp for old listings
  enum: [
    "trending",
    "rooms",
    "cities",
    "mountains",
    "castles",
    "pools",
    "camping",
    "farms",
    "arctic",
    "domes",
    "boats"
  ],
},

    reviews:[
      {  
        type:Schema.Types.ObjectId,
        ref:"Review",
},
],

owner : {
    type:Schema.Types.ObjectId,
    ref:"User",
},

geometry :  {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },

    coordinates: {
      type: [Number],
      required: true
    },
  },
 
});

listingSchema.post("findOneandDelete", async (listing) =>{
if (listing) {
    await Review.deleteMany({_id: {$in: listing.reviews}});
}
});

const Listing=mongoose.model("Listing", listingSchema);
module.exports=Listing;