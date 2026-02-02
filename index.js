require ('dotenv').config()
const express = require ("express")
const app = express ()
const userRoutes = require ("./routes/userRoute.js")
const authRoutes = require ("./routes/authRoute.js")
const produkRoutes = require ("./routes/produkRoute.js")
const transactionRoutes = require ("./routes/transactionRoute.js")


app.use(express.json())

app.use("/users", userRoutes)
app.use("/login", authRoutes)
app.use("/product", produkRoutes)
app.use("/transaction", transactionRoutes)
app.listen(3000, () => {
    console.log("Server up and running at http://localhost:3000");
})