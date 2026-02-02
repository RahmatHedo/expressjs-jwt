const db = require ("../config/connection.js")

const getTransaction =async (req,res) => {
    try {
        const [transaction] = await db.query (`SELECT * FROM transaksi`)

        res.status(200).json({
            msg : "data berhasil diambil", 
            data : transaction
        })
    } catch (error) {
        
    }
}

const getTransactionById = async (req,res) => {
    try {
        const id = req.params.id_user
        const [transaction] = await db.query (`SELECT * FROM transaction WHERE id_user`, [id])

        if(transaction.length === 0) {
            return res.status(404)({
                msg : "transaksi not found, user tidak pernah belanja"
            })
        }

        res.status(200).json({
            msg : "data berhasil diambil", 
            data : transaction
        })
    } catch (error) {
        
    }
}

const createTransaction = async (req,res) => {

    try {
         const {id_produk, jumlah_beli} = req.body
        const id_user = req.user.id
    

    if(!id_produk || !jumlah_beli) {
        return res.status(400).json({msg : "semua field harus diisi"})
    }

    const[users] = await db.query(`SELECT * FROM users WHERE id_user = ?` ,[id_user])
    if(users.length === 0) {
        return res.status(404).json({
            msg : "user not found"
        })
    } 
    const[produk] = await db.query(`SELECT * FROM produk WHERE id_produk = ?` ,[id_produk])
    if(produk.length === 0) {
        return res.status(404).json({
            msg : "produk not found"
        })
    } 
    const pembeli = users [0]
    const barang = produk [0]

    const saldo = pembeli.saldo

    if (barang.stok < jumlah_beli){
        return res.status(400).json({
            msg : "stok tidak cukup"
        })
    } 

    const jumlah_bayar = barang.harga * jumlah_beli

    if(saldo < jumlah_bayar) {
        return res.status (400).json({
            msg : "saldo anda tidak cukup"
        })
    }

    await db.query(`UPDATE users SET saldo = saldo - ? WHERE id_user = ? `, [jumlah_bayar, pembeli.id_user])
    await db.query(`UPDATE produk SET stok = stok - ? WHERE id_produk = ? `, [jumlah_beli ,barang.id_produk])
    await db.query(`INSERT INTO transaksi (id_user, id_produk, jumlah_beli, jumlah_bayar) VALUES (?, ?, ?, ?)`, [pembeli.id_user, barang.id_produk, jumlah_beli, jumlah_bayar])

    res.status(200).json({
                msg: "Transaksi Berhasil!",
                sisa_saldo: pembeli.saldo - jumlah_bayar
            });
    } catch (error) {
        console.log(error);
        
        res.status(500).json ({
            msg : error
        })
    }
   
}

module.exports = {
    createTransaction,
    getTransaction,
    getTransactionById
}