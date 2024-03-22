const express = require('express')
const router = express.Router()
const accounts = require('../controllers/accountController')


router.post('/auth/signup', accounts.signUp)
router.post('/auth/login', accounts.login)

module.exports = router