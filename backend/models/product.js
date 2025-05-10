import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  unit: {
    type: String,
    default: 'kg'
  },
  category: {
    type: String,
    required: true,
    enum: ['vegetables', 'fruits', 'grains', 'pulses']
  },
  stock: {
    type: Number,
    required: true,
    default: 0
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  images: [{
    type: String
  }]
}, {
  timestamps: true
});

export default mongoose.model('Product', productSchema);


