const { body, param, query } = require("express-validator");

exports.insertValidator = [ 
    // body("fullName")
    //     .isString()
    //     .withMessage("Full name should be a string")
    //     .isLength({ max: 10 })
    //     .withMessage("Teacher name should be less than 10 characters"),
    // body("email")
    //     .isEmail()
    //     .withMessage("Email should be a valid email address"),
    // body("image")
    //     .isString()
    //     .withMessage("Image should be a string")
];

exports.updateValidator = [
    param("id")
    .isMongoId()
    .withMessage("Invalid ID format"),
    body("fullName")
        .optional()
        .isString()
        .withMessage("Full name should be a string")
        .isLength({ max: 10 })
        .withMessage("Teacher name should be less than 10 characters"),
    body("email")
        .optional()
        .isEmail()
        .withMessage("Email should be a valid email address"),
    body("image")
        .optional()
        .isString()
        .withMessage("Image should be a string")
];
