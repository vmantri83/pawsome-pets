import { Pets } from "../models/pets.models.js"

export const addPets = async (req, res) => {
    const { name, gender, species, favFoods, birthYear, photo, type } = req.body
    try {
        const petCreated = await Pets.create({ name, gender, species, favFoods, birthYear, photo, type })
        const petGot = await Pets.findById(petCreated._id)
        if (!petGot) {
            return res.status(500).json({
                status: "failure",
                data: {
                    statusCode: 500,
                    message: "Failed to add pet"
                }

            })
        }
        return res.status(201).json({
            status: "success",
            data: {
                statusCode: 201,
                value: petGot
            }
        })
    } catch (error) {
        return res.status(500).json({
            status: "failure",
            data: {
                statusCode: 500,
                message: error.message || "Internal server error"
            }

        })
    }
}

export const getPets = async (req, res) => {
    const { type } = req.body
    if (!type) {
        return res.status(400).json({
            status: "failure",
            data: {
                statusCode: 400,
                message: "type is not provided"
            }
        })
    }
    try {
        const pets = await Pets.find({ type })
        return res.status(200).json({
            status: "success",
            data: {
                statusCode: 200,
                value: pets
            }
        })
    } catch (error) {
        return res.status(500).json({
            status: "failure",
            data: {
                statusCode: 500,
                message: error.message || "Internal server error"
            }
        })
    }
}