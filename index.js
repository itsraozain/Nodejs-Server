require("./src/models/User");
require("./src/models/Artist");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("./src/routes/authRoutes");
const requireAuth = require("./src/midlewares/requireAuth");
const artist = require("./src/routes/artistRoutes");


const PORT = process.env.PORT || 3001;

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);


app.use(artist);


const MongoUri =
  "mongodb+srv://bongdev:bongcluster99$@bongcluster.xdmjl.mongodb.net/BongDatabase?retryWrites=true&w=majority";
mongoose.connect(MongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("connected to mongo");
});

mongoose.connection.on("error", (err) => {
  console.error("error connecting mongoose", err);
});

app.get("/", requireAuth, (req, res) => {
  res.send(`Your Email is: ${req.user.email}`);
});

app.listen(PORT, () => {
  console.log("listening on " + PORT);
});
