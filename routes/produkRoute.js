const express = require ('express')
const router = express.Router()

const {
    getProduk,
    getProdukById,
    createProduk,
    updateProduk,
    deleteProduk
} = require ("../controller/produkController.js")

const auth = require ("../middleware/auth.js")
const {isAdmin,
        isMember,
        isOwner 
    } = require ("../middleware/role.js")


router.get("/" , getProduk)
router.get("/:id_produk", getProdukById)
router.post("/", auth, isAdmin, createProduk)
router.put("/:id_produk", auth, isAdmin, updateProduk)
router.delete("/:id_produk", auth, isAdmin, deleteProduk)

module.exports = router