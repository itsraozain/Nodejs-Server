const mongoose = require('mongoose');

const SongsSchema = new mongoose.Schema({
    userid:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    songname:{type: String, required: true},
    songimage:{type: String,required: true},

});

const AlbumSchema = new mongoose.Schema({
  albumname:{type: String, required: true},
  albumimage:{type: String,required: true},
  albumlocation:{type: String,required: true},
  songs:[SongsSchema]
});

const ArtistSchema = new mongoose.Schema({

  artistname:{type:String, required:true},
  artistimage:{type:String, required:true},
  album:[AlbumSchema]
  
 
});
  

mongoose.model('Artist', ArtistSchema);