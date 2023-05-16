import express from "express";
import cors from  'cors'
import PizzaService from "./services/pizzas-services.js";
import Pizza from "./models/pizza.js"

const app = express()
app.use(express.json());
app.use(cors());
app.use(express.static('public'))
//app.use(routes)

let svc = new PizzaService()

app.get('/getall', (req, res) => {
    let listaPizzas = svc.getAll()
    listaPizzas.then((resp) => { res.send(resp) })
})

app.get('/getbyid/:id', (req, res) => {
    let respuesta = svc.getById(req.params.id)
    respuesta.then((resp) => { res.send(resp) })
})

app.post('/insert', (req, res) => {
    let pizzaNueva = new Pizza()
    pizzaNueva.Nombre = req.body.Nombre
    pizzaNueva.LibreGluten = req.body.LibreGluten
    pizzaNueva.Importe = req.body.Importe
    pizzaNueva.Descripcion = req.body.Descripcion
    let respuesta = svc.insert(pizzaNueva)
    respuesta.then((resp) => { res.send("Pizza creada")})
})

app.put('/update', (req, res) => {
    let pizzaNueva = new Pizza();
    pizzaNueva.Id = req.body.Id;
    pizzaNueva.Nombre = req.body.Nombre;
    pizzaNueva.LibreGluten = req.body.LibreGluten;
    pizzaNueva.Importe = req.body.Importe;
    pizzaNueva.Descripcion = req.body.Descripcion;
    let respuesta = svc.update(pizzaNueva)
    respuesta.then((resp) => { res.send("Pizza actualizada")})
})

app.delete('/delete/:id', (req, res) => {
    let respuesta = svc.deleteById(req.params.id)
    respuesta.then((resp) => { res.send("Pizza eliminada") })
})

app.listen(3000, () => {
    console.log("Servidor a la espera de conexiones")
})  