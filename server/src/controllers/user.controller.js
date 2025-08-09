const userService = require("../services/user.service.js");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const signTokenAndSetCookie = (res, data) => {
	// Generate JWT token
	const token = jwt.sign(
		{
			id: data.id,
			name: data.name,
			email: data.email,
		},
		process.env.JWT_SECRET,
		{ expiresIn: "7d" }
	);

	res.cookie("token", token, {
		httpOnly: true,
		secure: true,
		sameSite: "None",
		maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
	});

	return token;
};

const userLogin = async (req, res, next) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ status: "error", message: "Validation failed", errors: errors.array() });
		}

		const { email, password } = req.body;
		const data = await userService.login(email, password);

		const token = signTokenAndSetCookie(res, data);

		return res.status(200).json({
			status: "success",
			message: "User logged in successfully",
			user: {
				name: data.name,
				email: data.email,
			},
			token,
		});
	} catch (error) {
		next(error);
	}
};

const userRegister = async (req, res, next) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ status: "error", message: "Validation failed", errors: errors.array() });
		}

		// Insert user
		const { name, email, password } = req.body;
		const data = await userService.register(name, email, password);

		const token = signTokenAndSetCookie(res, data[0]);

		return res.status(200).json({
			status: "success",
			message: "User registered successfully",
			user: {
				name: data[0].name,
				email: data[0].email,
			},
			token,	
		});
	} catch (error) {
		next(error);
	}
};

const userLogout = (req, res) => {
	res.clearCookie('token', {
		httpOnly: true,
		secure: true,
		sameSite: "None",
		maxAge: 0, // Clear the cookie
	});

	return res.status(200).json({
		status: "success",
		message: "User logged out successfully",
	});	
};

const me = async (req, res, next) => {
	try {
		const userId = req.user.id;

		const user = await userService.getUserById(userId);
		if (!user) {
			return res.status(404).json({ status: "error", message: "User not found" });
		}

		return res.status(200).json({ status: "success", message: "User found", user });
	} catch (error) {
		next(error);
	}
};

module.exports = { userLogin, userRegister, userLogout, me };
