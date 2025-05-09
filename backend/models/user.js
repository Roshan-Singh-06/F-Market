import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'seller'],
        default: 'user'
    },
    isSeller: {
        type: Boolean,
        default: false
    },
    sellerProfile: {
        businessName: String,
        description: String,
        address: String,
        phone: String
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

export default User;