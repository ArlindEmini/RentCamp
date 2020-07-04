var mongoose = require("mongoose");

var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name:"Mount rainer",
        img:"https://www.nps.gov/mora/planyourvisit/images/OhanaCampground2016_CMeleedy_01_web.jpeg?maxwidth=1200&maxheight=1200&autorotate=false",
        description:"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat"
    },
    {
        name:"Ela Camp",
        img:"https://www.elacampground.com/wp-content/uploads/2019/06/Ela-Campground-87.jpg",
        description:"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat"
    },
    {
        name:"Dry River ",
        img:"https://farm9.staticflickr.com/8605/16573646931_22fc928bf9_o.jpg",
        description:"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat"
    },
]

function seedDb(){
    // REMOVE ALL CAMPGROUNDS
    Campground.remove({}, function(err){
        // if(err){
        //     console.log(err);
        // }else{
        //     console.log("All campgrounds removed");
        //     // Add a few campgrounds
        //     data.forEach(function(seed){
        //         Campground.create(seed,function(err, campground){
        //             if(err){
        //                 console.log(err);
        //             }else{
        //                 console.log("added a Campground");
        //                 // Create a comment
        //                 Comment.create(
        //                     {
        //                         text:"This is a great place",
        //                         author: "Arlind Emini"
        //                 },function(err,comment){
        //                     if(err){
        //                         console.log(err);
        //                     }else{
        //                         campground.comments.push(comment);
        //                         campground.save();
        //                         console.log("Created new comment");
        //                     }
        //                 });
        //             }
        //         });
        //     });
        // }
    });
}

module.exports = seedDb;
