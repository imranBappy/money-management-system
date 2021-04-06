const validator = require('validator')

const validate = (user) =>
{
    let errors = {}
    if (!user.name) errors.name = 'Please Provide Your Name'
    if (!user.email) {
        errors.email = 'Please Provide Your email'
    } else if (!validator.isEmail(user.email)) {
        errors.email = 'Please Provide Your Email'
    }
    // if (!user.username) {
    //     errors.username = 'Please Provide Your username'
    // } else {
    //     const usernameResult = usernames.find(name => name.toLowerCase() === user.username.toLowerCase())
    //     if (usernameResult) errors.username = 'Username allrady deciler'
    // }

    if (!user.password) {
        errors.password = 'Please Provide Your Password'
    } else if (!user.password.length > 6) {
        errors.password = 'Password must be at least 6 characters'
    }

    if (!user.confirmPassword) {
        errors.confirmPassword = 'Please Provide Your Confirm Password'
    } else if (user.confirmPassword !== user.password) {
        errors.confirmPassword = 'Password dose not match'
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0,
    }
}
module.exports = validate