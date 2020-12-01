const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../midlewares/requireAuth');

const Artist= mongoose.model('Artist');

const router = express.Router();

router.use(requireAuth);

router.get('/Artist', async (req, res) => {
  const artist = await Artist.find();

  res.send(artist);
});

router.post('/Artist', async (req, res) => {
  const { artistname, artistimage,album } = req.body;

  if (!artistname || !artistimage || !album) {
    return res
      .status(422)
      .send({ error: 'You must provide a name,image and album' });
  }

  try {
    const artist = new Artist({ artistname, artistimage, album});
    await artist.save();
    res.send(artist);
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
});



//router.delete(`/tracks/${_id}`);

module.exports = router;
