const express = require('express');
const router = express.Router();

const { body } = require('express-validator');
const validation_result = require('../mixins/validation_result');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = require('../config/secret');

const User = require('../models/user.model');

router.post('/', [
    body('email').trim().isEmail().withMessage("Please enter a valid email.").not().isEmpty().normalizeEmail().withMessage("Please enter your email."),
    body('password').escape().not().isEmpty().withMessage("Please enter a password.")
], validation_result, async (req, res) => {
    const { email, password } = req.body;

    const findUser = await User.findOne({ email });
    if(!findUser) return res.status(401).send({email: "Your email or password is incorrect."});

    const pass_matches = await bcrypt.compare(password, findUser.password);
    if(!pass_matches) return res.status(401).send({email: "Your email or password is incorrect."});

    const token = jwt.sign(findUser._id, secret);

    return res.status(200).send(token);
});

module.exports = router;