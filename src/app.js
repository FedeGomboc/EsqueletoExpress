import express from "express";
import routes from "./routes/index.routes.js"
const app = express()

app.use(routes)

app.listen(3000, ()=>{
    console.log("Servidor a la espera de conexiones")
})