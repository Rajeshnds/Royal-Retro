if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const mongoose=require('mongoose');
const cities=require('./cities');
const {places,descriptors}=require('./seedHelpers');
const Restaurant=require('../models/restaurant');

const dbUrl=process.env.DB_URL || 'mongodb://localhost:27017/Retro'
// const dbUrl=process.env.DB_URL
// const dbUrl = 'mongodb://localhost:27017/retro';

mongoose.connect(dbUrl,{
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
    await Restaurant.deleteMany({});
    for(let i=0;i<300;i++){
        const random1000=Math.floor(Math.random()*400);
        const price=Math.floor(Math.random()*20)+10;
        const retro=new Restaurant({
            // Your User ID
            // author: '6275417923309fe345c0553f',
            author: '6294d5d7766da1c2de52237f',
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
                  url: 'https://res.cloudinary.com/dragonmas-cloud/image/upload/v1654253390/Retro/al5uauivpecqcgrdo4zg.jpg',
                },
                {
                  url: 'https://res.cloudinary.com/dragonmas-cloud/image/upload/v1654253239/Retro/jrphwe8z2k9hfo5lclov.jpg',
                }
              ]
        })
        await retro.save();
    }
}

seedDB().then(()=>{
    mongoose.connection.close();
})

// seedDB();