const express = require("express");
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require("cors");
const crypto = require("crypto");


dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(express.json());
// app.use(express.json({ limit: "50mb" }));
app.use(cors());
app.use(helmet());
app.use(morgan('common'));


const startApp = async () => {
    try {
        mongoose
            .connect(process.env.MONGODB_URL)
            .then(() => console.log("connected to database"))
            .catch(e => console.log(e));

        app.listen(PORT, () => {
            console.log(`server connected at Port: ${PORT} `);
        });
    }
    catch (err) {
        console.log(err);
    }
}

startApp();


const URL = require("./Url")


app.post('/api/shorturl', async (req, res) => {
    // console.log(req.body);
    const oldUrl = await URL.findOne({longUrl: req.body.longUrl});
    if(oldUrl) return res.status(200).json(oldUrl);
    let uid = crypto.randomBytes(3).toString("hex");
    // console.log(uid);
    const currUrl = await URL.findOne({shortUrl:uid});
    while(currUrl){
        uid = crypto.randomBytes(3).toString("hex");
    }
    const newUrl = new URL({ 
        longUrl: req.body.longUrl,
        shortUrl: uid
    })

    const savedUrl = await newUrl.save();
    console.log(savedUrl)
    res.status(200).json(savedUrl);
})

app.post('/api/longurl', async (req, res) => {

    const shortUrl = req.body.shortUrl

    const currUrl = await URL.findOne({ shortUrl: shortUrl })
    if (currUrl){
        // console.log(currUrl)
        return res.status(200).json(currUrl);
    }
    // console.log(currUrl)
    res.status(404).json('url not found'); 
})


app.get('/api', (req, res) => {
    res.status(200).json("i am alive");
})
