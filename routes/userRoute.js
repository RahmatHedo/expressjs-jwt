const express = require ("express")
const router = express.Router()

const {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require ("../controller/usersController.js")

const auth = require ("../middleware/auth.js")
const {isAdmin,
        isMember 
    } = require ("../middleware/role.js")



router.get("/", getUsers)

router.get("/:id", getUserById)

router.post("/", createUser)

router.put("/:id", auth, isAdmin, updateUser)

router.delete("/:id" , auth, isAdmin, deleteUser)

module.exports = router