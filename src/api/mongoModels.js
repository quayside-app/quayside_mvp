import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    _id: Number,
    firstName: String,
    lastName: String,
});

export const User = mongoose.model('User', userSchema);
