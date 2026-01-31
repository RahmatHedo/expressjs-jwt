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
        isMember,
        isOwner 
    } = require ("../middleware/role.js")



router.get("/",auth, isAdmin, getUsers)

router.get("/:id_user",auth, isAdmin, getUserById)

router.post("/", createUser)

router.put("/:id_user", auth, isOwner, updateUser)

router.delete("/:id_user" , auth, isOwner, deleteUser)

module.exports = router