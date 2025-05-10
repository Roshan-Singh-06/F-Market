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
        enum: ['user', 'seller','admin'],
        default: 'user'
    },
    isSeller: {
        type: Boolean,
        default: false
    },
    sellerProfile: {
        username: {
            type: String,
            minLength: 3
        },
        description: {
            type: String,
            minLength: 20 // To ensure at least one proper sentence
        },
        categories: [{
            type: String,
            enum: ['Vegetables', 'Pulses', 'Rice', 'Wheat', 'Jowar']
        }],
        verified: {
            type: Boolean,
            default: false
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

export default User;