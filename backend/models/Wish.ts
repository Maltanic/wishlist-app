import mongoose from 'mongoose';

const wishSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        link: {
            type: String
        }
    },
    { timestamps: true }
);

const Wish = mongoose.model("Wish", wishSchema);

export default Wish