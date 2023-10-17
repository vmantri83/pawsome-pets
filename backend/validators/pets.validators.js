import { body } from "express-validator";

export const addPetsValidator = () => {
    return [
        body("name")
            .trim()
            .notEmpty()
            .withMessage("name is required")
            .isLowercase()
            .withMessage("name must be lowercase"),
        body("gender")
            .trim()
            .notEmpty()
            .withMessage("Please enter a gender")
            .isLowercase()
            .withMessage("gender must be lowercase"),
        body("species")
            .trim()
            .notEmpty()
            .withMessage("Please enter your species name"),
        body("favFoods")
            .custom(value => Array.isArray(value))
            .withMessage("User field must be an array")
            .custom(value => Array.isArray(value) && value.length > 0)
            .withMessage("room cannot be created with empty users"),
        body("birthYear")
            .trim()
            .notEmpty()
            .withMessage("Please enter birth year"),
        body("photo")
            .trim()
            .notEmpty()
            .withMessage("Please photo url"),
        body("type")
            .trim()
            .notEmpty()
            .withMessage("Please enter pet type"),
    ]
}



