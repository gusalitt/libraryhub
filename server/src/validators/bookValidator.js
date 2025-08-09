const { body } = require("express-validator");
const supabase = require("../config/supabase");

const commentValidation = [
    body("comment").notEmpty().withMessage("Comment cannot be empty"),
    body("rating").isInt({  min: 1, max: 5 }).withMessage("Rating must be an integer between 1 and 5")
];

module.exports = { commentValidation };