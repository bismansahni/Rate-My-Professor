import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Review Schema
const reviewSchema = new Schema({
  comment: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  date: { type: Date, default: Date.now }
});

// Professor Schema
const professorSchema = new Schema({
  name: { type: String, required: true },
  subject: { type: String, required: true },
  reviews: [reviewSchema]
});

const Professor = mongoose.model('Professor', professorSchema);
export default Professor;
