require('./src/models/user');
require('./src/models/Track');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser=require('body-parser');
const authRoutes= require('./src/routes/authRoutes');
const trackRoutes=require('./src/routes/trackRoutes');
const requireAuth=require('./src/midlewares/requireAuth');

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);

const MongoUri='mongodb+srv://admin:xZNTEfCwgrYtHiVr@cluster0-qhbwl.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority'
mongoose.connect(MongoUri,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
});

mongoose.connection.on('connected',()=>{
    console.log('connected to mongo')
})

mongoose.connection.on('error',(err)=>{
    console.error('error connecting mongoose',err)
})

app.get('/',requireAuth,(req,res)=>{
    res.send(`Your Email is: ${req.user.email}`);
})

app.listen(3001,()=>{
    console.log('listening on port 3001');
})