const express = require ("express")
const router = express.Router()
const login = require ("../controller/authController.js")

router.post ("/", login)

module.exports = router