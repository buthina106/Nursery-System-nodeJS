const { body, param, query } = require("express-validator");

exports.insertChildValidator = [
    body("_id")
        .isInt()
        .withMessage("ID should be an integer"),
    body("name")
        .isString()
        .withMessage("Name should be a string"),
    body("children")
        .isArray()
        .withMessage("Children should be an array of student IDs")
        .optional()
        .withMessage("Children array should contain only integers"),
];

exports.updateChildValidator = [
    body("_id")
        .optional()
        .isInt()
        .withMessage("ID should be an integer"),
    body("name")
        .optional()
        .isString()
        .withMessage("Name should be a string"),
    body("children")
        .optional()
        .isArray()
        .withMessage("Children should be an array of student IDs")
        .withMessage("Children array should contain only integers"),
];

exports.deleteValidator = [
    param("id")
        .isInt()
        .withMessage("ID must be an integer"),
];
