const db = require ("../config/connection.js")
const bcrypt = require ("bcrypt")

const getUsers = async (req,res) => {
    try {
        const [users] =  await db.query(`SELECT * FROM users`) 
       
        res.status(200).json({
            msg : "user berhasil did_userapat",
            data : users
        })
        
    } catch (error) {
        res.status(500).json({
            msg: "gagal mengambil data users",
            error : error.message
        })
    }
}

const getUserById = async (req,res) =>{
    try {
        const id_user = req.params.id_user 

        const [rows] = await db.query(`SELECT * FROM users WHERE id_user = ?`, [id_user])

        if(rows.length === 0){
            return res.status(404).json({
                msg : "id_user tidak ada",
            })
        }

        res.status(200).json({
            msg : "user berhasil diambil",
            data : rows
        })
    } catch (error) {
         res.status(500).json({
            msg: "gagal mengambil data users",
            error : error.message
        })
    }
}

const createUser = async (req,res) => {
    try {
        const {name,email,password,role, saldo} = req.body

        if(!name|| !email || !password || !role || !saldo){
            return res.status(400).json({
                msg : "semua field harus diisi"
            })
        }
        
        const [cekEmail] = await db.query(`SELECT id_user FROM users WHERE email = ?`, [email])

        if(cekEmail.length >0) {
            return res.status(409).json({
                msg : "email sudah ada"
            })
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const [result] = await db.query(`INSERT INTO users (name, email, password, role, saldo) VALUES (?, ? , ?, ?,?)`, [name,email,hashPassword, role, saldo])
        
        res.status(201).json({
            msg : "user berhasil dibuat"
        })
    } catch (error) {
        res.status(500).json({
            msg :"gagal membuat user",
            error : error.message
        })
    }
}

const updateUser = async (req,res) => {
    try {
        const id_user = req.params.id_user
        const {name, email, password,role} = req.body

        if(!name || !email || !password || !role) {
            return res.status(400).json({
                msg : "semua field wajib diisi"
            })
        }

        const [cekUser] = await db.query (`SELECT id_user, email FROM users WHERE id_user = ?`, [id_user])

        if(cekUser.length === 0) {
            return res.status(404).json({
                msg : "user not found"
            })
        }
        const [cekEmail] = await db.query ('SELECT id_user FROM users WHERE email = ? AND id_user != ? ', [email,id_user])

        if(cekEmail.length > 0 ) {
            return res.status(409).json({
                msg : "email sudah ada"
            })
        }

        const hashPassword = await bcrypt.hash(password, 10)

        await db.query (`UPDATE users SET name = ?, email = ?, password = ?, role = ? WHERE id_user = ? `, [name, email,hashPassword, role, id_user])
        res.status(200).json({
            msg : "user berhasil di update",
            payload : ({
                id_user : cekUser[0].id_user,
                name : name,
                email : email,
                role : role
            })
        })

        
    } catch (error) {
         console.error(error); 
        res.status(500).json({
        msg: "gagal mengupdate user",
        error: error.message || error
    });
    }
}

const deleteUser = async (req,res) => {

    try {
        const id_user =req.params.id_user

    if(!id_user) {
        return res.status(400).json({
            msg : "semua field harus diisi"
        })
    }

    const [cekid_user] = await db.query(`SELECT email FROM users WHERE id_user =? `,[id_user])

    if(cekid_user.length === 0) {
        return res.status(404).json({
            msg : "user not found"
        })
    }


    await db.query(`DELETE from users WHERE id_user = ? `, [id_user])

    res.status(200).json({
        msg : `user dengan id_user = ${id_user} berhasil dihapus`
    })

    } catch (error) {
        res.status(500).json({
            msg : "error",
            error :error.message
        })
    }
    

}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}