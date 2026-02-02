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

const isOwner = async (req, res, next) => {
    const idTarget = req.params.id_user
    const idPengguna = req.user.id
    console.log(idTarget)
    console.log (idPengguna)
    const rolePengguna = req.user.role

    if (rolePengguna === "admin"){
        return next()
    }

    if (!idPengguna || !idTarget) {
        return res.status(400).json({
            msg: "ID User atau ID Target tidak valid/kosong"
        });
    }

    if (idPengguna.toString() !== idTarget.toString()) {
        return res.status(403).json({
            msg : " anda tidak bisa mengatur user lain"
        })
    }

     next ()
}

module.exports = {
    isAdmin,
    isMember,
    isOwner
}