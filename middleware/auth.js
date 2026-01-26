
const jwt = require ("jsonwebtoken")

const auth = async (req, res, next) => {
    const authHeader = req.headers.authorization

    if(!authHeader) {
        return res.status(400).json({msg : "silahkan login!"})
    }

    const token = authHeader.split(" ")[1]

    try {
        const decode = jwt.verify (token, process.env.SECRET_KEY)

        req.user = decode
        next ()
    } catch (error) {
        res.status(401).json({msg : "token salah"})
    }
}

module.exports = auth