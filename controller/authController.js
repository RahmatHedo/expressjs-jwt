const db = require ("../config/connection.js")
const bcrypt = require ("bcrypt")
const jwt = require ("jsonwebtoken")

const login = async (req,res) => {
    try {
        const {email,password} = req.body

        if(!email || !password){
            return res.status(400).json({msg : "semua field harus diisi"})
        }

        const [cekEmail] = await db.query(`SELECT * FROM users WHERE email = ? `, [email])

        if(cekEmail.length === 0) {
            return res.status(401).json({
                msg : "email atau password salah"
            })
        }

        const user = cekEmail[0]

        const cekPassword = await bcrypt.compare(password, user.password)
        if (!cekPassword) {
            return res.status(401).json({
                msg : "password salah"
            })
        }

        const token = jwt.sign({
            id : user.id,
            role : user.role
        },
            process.env.SECRET_KEY,
        {
            expiresIn: "1d"
        })
        
        res.status(200).json({
            msg : "login berhasil",
            token
        })
    } catch (error) {
        res.status(500).json({msg : "error"})

        console.log(error)
    }
}

module.exports = login