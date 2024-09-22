import mongoose from 'mongoose';

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://gauravh4123:asd123@cluster0.cbqus.mongodb.net/food-del').then(()=>console.log("DB connected"))
}