const db = require ("../config/connection.js")
const bcrypt = require ("bcrypt")

const getUsers = async (req,res) => {
    try {
        const [users] =  await db.query(`SELECT * FROM users`) 
       
        res.status(200).json({
            msg : "user berhasil didapat",
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
        const id = req.params.id 

        const [rows] = await db.query(`SELECT * FROM users WHERE id = ?`, [id])

        if(rows.length === 0){
            return res.status(404).json({
                msg : "id tidak ada",
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
        const {name,email,password,role} = req.body

        if(!name|| !email || !password || !role){
            return res.status(400).json({
                msg : "semua field harus diisi"
            })
        }
        
        const [cekEmail] = await db.query(`SELECT id FROM users WHERE email = ?`, [email])

        if(cekEmail.length >0) {
            return res.status(409).json({
                msg : "email sudah ada"
            })
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const [result] = await db.query(`INSERT INTO users (name, email, password, role) VALUES (?, ? , ?, ?)`, [name,email,hashPassword, role])
        
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
        const id = req.params.id
        const {name, email, password,role} = req.body

        if(!name || !email || !password || !role) {
            return res.status(400).json({
                msg : "semua field wajib diisi"
            })
        }

        const [cekUser] = await db.query (`SELECT id, email FROM users WHERE id = ?`, [id])

        if(cekUser.length === 0) {
            return res.status(404).json({
                msg : "user not found"
            })
        }
        const [cekEmail] = await db.query ('SELECT id FROM users WHERE email = ? AND id != ? ', [email,id])

        if(cekEmail.length > 0 ) {
            return res.status(409).json({
                msg : "email sudah ada"
            })
        }

        const hashPassword = await bcrypt.hash(password, 10)

        await db.query (`UPDATE users SET name = ?, email = ?, password = ?, role = ? WHERE id = ? `, [name, email,hashPassword, role, id])
        res.status(200).json({
            msg : "user berhasil di update",
            payload : ({
                id : cekUser[0].id,
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
        const id =req.body.id

    if(!id) {
        return res.status(400).json({
            msg : "semua field harus diisi"
        })
    }

    const [cekId] = await db.query(`SELECT email FROM users WHERE id =? `,[id])

    if(cekId.length === 0) {
        return res.status(404).json({
            msg : "user not found"
        })
    }


    await db.query(`DELETE from users WHERE id = ? `, [id])

    res.status(200).json({
        msg : `user dengan id = ${id} berhasil dihapus`
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