import express from "express";
import routes from "./routes/index.routes.js"
import PizzaService from "./services/pizzas-services.js";
import Pizza from "./models/pizza.js"

const app = express()
app.use(express.json());
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
    let pizzaNueva = new Pizza();
    pizzaNueva.Nombre = 'Pizza de anchoas';
    pizzaNueva.LibreGluten = false;
    pizzaNueva.Importe = 12345;
    pizzaNueva.Descripcion = "Pizza con anchoas capo, que  sos? lucho?";
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
    console.log(pizzaNueva);
    let respuesta = svc.update(pizzaNueva)
    respuesta.then((resp) => { res.send("Pizza actualizada")})
})

app.listen(3000, () => {
    console.log("Servidor a la espera de conexiones")
})  