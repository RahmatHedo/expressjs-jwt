const db = require ("../config/connection.js")

const getProduk = async (req,res) => {
    try {
        const [produk] = await db.query(`SELECT * FROM produk`)

        res.status(200).json({
            msg : "produk berhasil didapat",
            data : produk
        })
    } catch (error) {
        res.status(500).json({
            msg: "gagal mengambil data produk",
            error : error.message
        })
    }
}

const getProdukById = async (req,res) => {
    try {
        const id_produk = req.params.id_produk

        if(!id_produk) {
        return res.status(400).json({msg : "semua field harus diisi"})
        }

        const [produk] = await db.query(`SELECT * FROM produk WHERE id_produk = ? `, [id_produk])

        if(produk.length === 0) {
            return res.status(404).json({
                msg : "produk dgn id tsb tidak ditemukan!"
            })
        }

        res.status(200).json({
            msg : "produk berhasil didapat",
            data : produk [0]
        })
    } catch (error) {
        res.status(500).json({
            msg: "gagal mengambil data produk",
            error : error.message
        })
    }
}


const createProduk = async (req, res) => {
    try {
        const {nama_produk, harga, stok} = req.body

    if(!nama_produk || !harga || stok === undefined) {
        return res.status(400).json({msg : "semua field harus diisi"})
    }

    await db.query ('INSERT INTO produk (nama_produk, harga, stok) VALUES (?, ? , ?)', [nama_produk,harga,stok])

    res.status(201).json({
        msg : "produk berhasil dibuat",
        payload : ({
           nama: nama_produk,
           harga : harga,
           stok: stok
        })
    })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "error 500"
        })
        
    }
}

const updateProduk = async (req, res) => {
    try {
        const id_produk = req.params.id_produk
        const {nama_produk, harga, stok} = req.body

    if(!id_produk || !nama_produk || !harga || stok === undefined) {
        return res.status(400).json({msg : "semua field harus diisi"})
    }

    const [produk] = await db.query (`SELECT * FROM produk WHERE id_produk = ?`, [id_produk])

    if(produk.length === 0) {
        return res.status(404).json({
            msg : "id produk tidak ditemukan"
        })
    }

    await db.query (`UPDATE produk SET nama_produk = ? , harga = ?, stok = ? WHERE id_produk = ?` , [nama_produk,harga,stok, id_produk])

    res.status(201).json({
        msg : "produk berhasil diupdate",
        payload : ({
        id_produk :id_produk,
           nama: nama_produk,
           harga : harga,
           stok: stok
        })
    })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "error 500"
        })
        
    }
}

const deleteProduk = async (req, res) => {
    try {
        const id_produk = req.params.id_produk
        

    if(!id_produk) {
        return res.status(400).json({msg : "semua field harus diisi"})
    }

    const [produk] = await db.query (`SELECT * FROM produk WHERE id_produk = ?`, [id_produk])
    

    if(produk.length === 0) {
        return res.status(404).json({
            msg : "id produk tidak ditemukan"
        })
    }
    const product = produk [0]

    await db.query (`DELETE FROM produk WHERE id_produk = ?`, [id_produk])

    res.status(200).json({
        msg : "produk berhasil dihapus",
        payload : ({
            id_produk : id_produk,
            nama_produk : product.nama_produk,
            harga : product.harga,
            stok : product.stok
        })
    })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "error 500"
        })
        
    }
}

module.exports = {
    getProduk,
    getProdukById,
    createProduk,
    updateProduk,
    deleteProduk
}