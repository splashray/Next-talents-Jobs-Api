const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    unique: true,
  },
  username: {
    type: String,
    default: "",
  },
  profilePhoto: {
    type: String,
    default: "default.jpg",
  },
  email: {
    type: String,
    required:[true,'please provide email'],
    match:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,'please provide valid email'],
    unique:true
  },
  phone: {
    type: String,
    default: "",
  },
  website: {
    type: String,
    default: "",
  },
  est: {
    type: String,
    default: "06.04.2020",
  },
  teamSize: {
    type: String,
    default: "50-100",
    enum:["50-100","100-150","150-200","200-250","250-300","300-350","350-400","400-450","450-500"]
  },
  multipleSelectBoxes: {
    type: String,
    default: "Retail",
    enum:["Retail","Banking","Digital & Creative","Human Resources","Management","Accounting & Finance","Digital","Creative art",]
  },
  allowInSearchListing: {
    type: String,
    default: "Yes",
    enum:["YES","No"]
  },
  

  
});

const Profile = mongoose.model("adminProfile", profileSchema);

module.exports = Profile;