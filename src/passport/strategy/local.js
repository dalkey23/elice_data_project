const LocalStrategy = require("passport-local").Strategy;
const { User } = require("../../data-access/model");
const bcrypt = require("bcrypt");

const config = {
    usernameField: 'email',
    passwordField: 'password'
};

const local = new LocalStrategy(config, async ())