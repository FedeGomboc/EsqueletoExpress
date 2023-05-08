import express from "express";
import routes from "./routes/index.routes.js"
import PizzaService from "./services/pizzas-services.js";

const app = express()

//app.use(routes)

app.get('/:id', (req, res) =>{
    let svc = new PizzaService()
    let respuesta = svc.getById(req.params.id)
    respuesta.then((resp) => {res.send(resp)})
  //console.log(respuesta)
//   res.send(respuesta)
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