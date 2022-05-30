const mongoose=require('mongoose');
const cities=require('./cities');
const {places,descriptors}=require('./seedHelpers');
const Campground=require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp',{
    useNewUrlParser:true,
    // useCreateIndex:true,
    useUnifiedTopology:true
});

const db=mongoose.connection;
db.on("error", console.error.bind(console,"connection error:"));
db.once("open",()=>{
    console.log("Database connected");
});

const sample=(array)=>array[Math.floor(Math.random()*array.length)];



const seedDB=async()=>{
    await Campground.deleteMany({});
    for(let i=0;i<300;i++){
        const random1000=Math.floor(Math.random()*1000);
        const price=Math.floor(Math.random()*20)+10;
        const camp=new Campground({
            // Your User ID
            // author: '6275417923309fe345c0553f',
            author: '6294ddfc2f7b44e2b135c99a',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description:'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Obcaecati libero nihil saepe aspernatur. Nostrum neque minima quibusdam modi in architecto expedita adipisci, quidem voluptatum. Eveniet nesciunt architecto consectetur id ut.',
            price,
            geometry:{ 
                type : "Point",
                coordinates : [ 
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
             },
            images: [
                {
                  url: 'https://res.cloudinary.com/dragonmas-cloud/image/upload/v1651992940/YelpCamp/tishnli96jonloka8omo.jpg',
                  filename: 'YelpCamp/tishnli96jonloka8omo',
                },
                {
                  url: 'https://res.cloudinary.com/dragonmas-cloud/image/upload/v1651992945/YelpCamp/c6eupt59sgdexo03y6a9.jpg',
                  filename: 'YelpCamp/c6eupt59sgdexo03y6a9',
                }
              ]
        })
        await camp.save();
    }
}

seedDB().then(()=>{
    mongoose.connection.close();
})

// seedDB();