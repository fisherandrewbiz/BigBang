const express = require('express');
const router = express.Router();

const { body } = require('express-validator');
const validation_result = require('../mixins/validation_result');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = require('../config/secret');

const User = require('../models/user.model');

router.post('/', [
    body('email').trim().not().isEmpty().withMessage("Your email is required.").isEmail().withMessage("Please enter a valid email.").normalizeEmail(),
    body('email').custom((value, {req}) => {
        return new Promise(async (resolve, reject) => {
            try {
                // ACCOUNT
                const account = await User.findOne({ email: value });
        
                // No account found, or not verified
                if(account) reject(new Error("This email is already in use."));
                resolve(true)
            } catch {
                reject(new Error("We're running into some problems."));
            }
        });
    }),
    body('password').escape().not().isEmpty().withMessage("Please enter a password."),
],
validation_result, async (req, res) => {
    const { email, password } = req.body;

    const salt = await bcrypt.genSaltSync(10);
    const hash = await bcrypt.hash(password, salt);

    const insertedUser = await User.create({
        name,
        email,
        password: hash,
        company: insertedCompany._id,
        isOwner: true
    });

    const token = jwt.sign(insertedUser._id, secret);

    return res.status(200).send(token);
});

module.exports = router;