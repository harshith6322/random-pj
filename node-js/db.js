const mongoose = require("mongoose");

try {
  mongoose
    .connect(
      "mongodb+srv://harshith6322:vszGLXm6WhF3oDcO@cluster0.xb2hjbj.mongodb.net/test5"
    )
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
