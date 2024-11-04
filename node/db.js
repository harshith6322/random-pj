const mongoose = require("mongoose");

try {
  mongoose
    .connect("mongodb://nwtwork-3000-27017:27017/")
    .then(() => console.log("database is connected"))
    .catch((err) => console.log(`error ${err}`));
} catch (err) {
  console.log(err);
}

const formmodel = new mongoose.Schema({
  firstname: String,
  lastname: String,
});
const FORM = mongoose.model("formdata", formmodel);
module.exports = {
  FORM,
};
