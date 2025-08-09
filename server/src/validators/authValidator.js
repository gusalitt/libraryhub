const { body } = require("express-validator");
const supabase = require("../config/supabase");

const loginValidation = [
    body("email").isEmail().withMessage("Invalid email address"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
]

const registerValidation = [
	body("name")
		.isLength({ min: 3 })
		.withMessage("Name must be at least 3 characters long")
		.custom(async (value) => {
			const existingEmail = await supabase.from("users").select("name").eq("name", value).maybeSingle();
            if (existingEmail.data) {
                throw new Error("Name already exists");
            }
            return true;
		}),
    body("email").isEmail().withMessage("Invalid email address").custom(async (value) => {
        const existingEmail = await supabase.from("users").select("email").eq("email", value).maybeSingle();
        if (existingEmail.data) {
            throw new Error("Email already exists");
        }

        return true;
    }),
	body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
];

module.exports = { registerValidation, loginValidation };
