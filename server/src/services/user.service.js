const supabase = require("../config/supabase.js");
const bcrypt = require("bcrypt");

const login = async (email, password) => {
    try {
        const checkEmail = await supabase
            .from("users")
            .select('id, name, email, password')
            .eq('email', email)
            .maybeSingle();

        if (checkEmail.error || !checkEmail.data) {
            const error = new Error("Email not found");
            error.statusCode = 404;
            error.errors = [{
                type: "email",
                value: email,
                msg: "Email not found",
                path: "email",
                location: "body",
            }];
            throw error;
        }

        const isPasswordValid = await bcrypt.compare(password, checkEmail.data.password);

        if (!isPasswordValid) {
            const error = new Error("Invalid email or password");
            error.statusCode = 404;
            error.errors = [{
                type: "password",
                value: email,
                msg: "Invalid email or password",
                path: "email",
                location: "body",
            }];
            throw error;
        }

        return checkEmail.data;
    } catch (error) {
        throw error;
    }
}

const register = async (name, email, password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const { data, error } = await supabase
            .from("users")
            .insert({
                name, 
                email, 
                password: hashedPassword,
                slug: name.replace(/\s+/g, "-").toLowerCase(),
                role: 'user',
            })
            .select('id, name, email');

        if (error) {
            throw error;
        }

        return data;
    } catch (error) {
        throw error;
    }
}

const getUserById = async (userId) => {
    try {
        const { data, error } = await supabase
            .from("users")
            .select('name, email')
            .eq('id', userId)
            .maybeSingle();

        if (error) {
            throw error;
        }

        return data;
    } catch (error) {
        throw error;
    }
}

module.exports = { login, register, getUserById };