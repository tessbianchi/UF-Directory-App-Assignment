
var fs = require('fs'),
    mongoose = require('mongoose'), 
    Schema = mongoose.Schema, 
    Listing = require('./ListingSchema.js'), 
    config = require('./config.js');

var findLibraryWest = function() 
{
  /* 
    Find the document that contains data corresponding to Library West,
    then log it to the console. 
   */
    
    var query = {"name" : "Library West"}
    Listing.find(query, function(err, docs) {
        if (!err){ 
            console.log(docs);
        } else {throw err;}
    });

};
var removeCable = function() 
{
  /*
    Find the document with the code 'CABL'. This cooresponds with courses that can only be viewed 
    on cable TV. Since we live in the 21st century and most courses are now web based, go ahead
    and remove this listing from your database and log the document to the console. 
   */
    var query = {"code" : "CABL"}
    Listing.find(query, function(err, docs) {
        if (!err){ 
            console.log(docs);
        } else {throw err;}
    }).remove(function(err, docs){
    });
};
var updatePhelpsLab = function() 
{
  /*
    Phelps Laboratory's address is incorrect. Find the listing, update it, and then 
    log the updated document to the console. 
   */
    Listing.findOneAndUpdate({"name": "Phelps Laboratory" }, 
                        { $set: { "address": '101 Gale Lemerand Dr, Gainesville, FL 32601, United States' }},
                        {new: true},
                        function(err, doc){
                            if(err){
                                console.log("Something wrong when updating data!");
                            }

                            console.log(doc);
                        });
                        

};
var retrieveAllListings = function() 
{
  /* 
    Retrieve all listings in the database, and log them to the console. 
   */
    Listing.find({}, function(err, docs) {
        if (!err){ 
            console.log(docs);
        } else {throw err;}
    });
};


mongoose.connect(config.db.uri);
var conn = mongoose.connection;             
     
conn.on('error', console.error.bind(console, 'connection error:'));  
 
conn.once('open', function() 
{
    findLibraryWest();
    removeCable();
    updatePhelpsLab();
    retrieveAllListings();
});


