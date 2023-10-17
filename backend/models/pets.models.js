import mongoose from "mongoose";

const petSchema = mongoose.Schema({
    name: {
        type: String
    },
    gender: {
        type: String
    },
    species: {
        type: String
    },
    favFoods: {
        type: Array
    },
    birthYear: {
        type: String
    },
    photo: {
        type: String
    },
    type: {
        type: String
    }
})

export const Pets = mongoose.model("Pets", petSchema)