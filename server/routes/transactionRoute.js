const router = require('express').Router()
const {
    create, 
    getAll, 
    getSingleTransaction,
    update,
    remove
} = require('../controllers/transactionController')
const authorization = require('../authenticate')

// Transaction Route
router.get('/',authorization, getAll)
router.get('/:transactionId', authorization, getSingleTransaction)

router.post('/',authorization, create)

router.put('/:transactionId',authorization,  update)
router.delete('/:transactionId',authorization, remove)

module.exports = router