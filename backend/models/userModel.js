import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: { type: String, default: 'https://res.cloudinary.com/dreirplqv/image/upload/v1746968479/default-avatar-icon-of-social-media-user-vector_ce6sgj.jpg' },
    phone: { type: String, default: '000000000' },
    address: { type: Object, default: { line1: '', line2: '' } },
    gender: { type: String,enum:["Male","Female","Not Selected"], default: 'Not Selected' },
    dob: { type: String },
    password: { type: String, required: true },
})

const userModel = mongoose.models.user || mongoose.model("user", userSchema);
export default userModel; 