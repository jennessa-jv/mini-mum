import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(//defining the schema
  {
    name: { type: String, required: true }, //here an object is passed through because we need the required field
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
  },
  { timestamps: true } 
);
// console.log(userSchema);

userSchema.pre("save", async function (next) { // save- Mongoose LIFECYCLE EVENT -only if we save it , it gets set into the database
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  // next();
});

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

export default mongoose.model("User", userSchema); //the "User" is the name we will be seeing in the database


// for objects and shit we have to use the arrow function or else it will generate a static value
// for example date: will be {Date: ()=>{Date.now()}} and not new Date() 
// also since date is a default value we will delare the "default" keyword so : default: ()=> {Date.now()}
