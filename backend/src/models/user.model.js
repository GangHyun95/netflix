import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        googleId: {
            type: String,
            unique: true,
            sparse: true,
        },
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: function () {
                return !this.googleId;
            },
            minlength: 6,
        },
        avatar: {
            type: String,
            default: '',
        },
        searchHistory: {
            type: Array,
            default: [],
        },
    },
    { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
