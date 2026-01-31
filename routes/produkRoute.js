const express = require ('express')
const router = express.Router()

const {
    getProduk,
    getProdukById,
    createProduk,
    updateProduk,
    deleteProduk
} = require ("../controller/produkController.js")

router.get("/" , getProduk)
router.get("/:id_produk", getProdukById)
router.post("/", createProduk)
router.put("/:id_produk", updateProduk)
router.delete("/:id_produk", deleteProduk)

module.exports = router