const express = require ('express')
const router = express.Router()

const {
    createTransaction,
    getTransaction,
    getTransactionById
} = require ("../controller/transactionController.js")

const auth = require ("../middleware/auth.js")
const {isAdmin,
        isMember,
        isOwner 
    } = require ("../middleware/role.js")


router.get("/", auth, isAdmin, getTransaction)
router.get("/:id_user", auth, isOwner, getTransactionById)
router.post("/", auth, isMember, createTransaction)

module.exports = router