const isAdmin = async (req,res, next) => {
    if(req.user.role !== "admin"){
        return res.status(403).json({
            msg : "hanya admin yang bisa mengakses"
        })
    }
    next()
}

const isMember = async (req, res , next) => {
    if (req.user.role!== "member"){
        return res.status(403).json({
            msg : "hanya member yang bisa akses"
        })
    }
    next()
}

module.exports = {
    isAdmin,
    isMember
}