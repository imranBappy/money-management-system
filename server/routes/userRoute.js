const {
    registerGetController,
    registerPostController,
    loginPostController
} = require('../controllers/useController');

const router = require('express').Router()


// Registration Route

router.get('/register', registerGetController)
router.post('/register',registerPostController)


// Login Route
router.post('/login',loginPostController)



module.exports = router