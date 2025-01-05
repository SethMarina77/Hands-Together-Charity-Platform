import mongoose from "mongoose";

const charitySchema = new mongoose.Schema({
  image: {
    type: String,
    required: false, // image is not required
    default: "/uploads/default.png", // default image path/ may set this elsewhere unsure
  },
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }, // Reference to the User who created the post pretty much takes the users mongoDB id that mongo assigns to each user and assigns it here so I can handle deletion etc easier later on
});

const Charity = mongoose.model("Charity", charitySchema);
export default Charity;
