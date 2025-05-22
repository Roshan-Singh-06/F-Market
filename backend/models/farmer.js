import mongoose from 'mongoose';

const FarmerSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  name: { type: String, required: true },
  imageUrl: { type: String },
  description: { type: String, required: true },
}, { timestamps: true });

const Farmer = mongoose.model('Farmer', FarmerSchema);
export default Farmer;