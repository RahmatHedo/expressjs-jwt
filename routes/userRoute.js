const express = require ("express")
const router = express.Router()

const {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require ("../controller/usersController.js")


router.get("/", getUsers)

router.get("/:id", getUserById)

router.post("/", createUser)

router.put("/:id", updateUser)

router.delete("/" , deleteUser)

module.exports = router