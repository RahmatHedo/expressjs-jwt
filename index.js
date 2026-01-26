const express = require ("express")
const app = express ()
const userRoutes = require ("./routes/userRoute.js")

app.use(express.json())

app.use("/users", userRoutes)
app.listen(3000, () => {
    console.log("Server up and running at http://localhost:3000");
})