import express from "express";
import routes from "./routes/index.routes.js"
import PizzaService from "./services/pizzas-services.js";

const app = express()

//app.use(routes)

let svc = new PizzaService()

app.get('/getall', (req, res) =>{
    let listaPizzas = svc.getAll()
    listaPizzas.then((resp) => {res.send(resp)})
})

app.get('/getbyid/:id', (req, res) =>{
    let respuesta = svc.getById(req.params.id)
    respuesta.then((resp) => {res.send(resp)})
})

app.post('/', (req, res) =>{
    res.send("Hola mundo")
})
app.put('/',(req, res) =>{
    res.send("Hola mundo")
})

app.listen(3000, () => {
    console.log("Servidor a la espera de conexiones")
})  