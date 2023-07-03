import express from "express";
import cors from 'cors'
import routerPizza from "./controllers/pizzaController.js";
import routerIngXPizza from './controllers/ingredienteXpizzaController.js'
import routerUnidad from './controllers/unidadController.js'
import routerIngrediente from './controllers/ingredienteController.js'

const app = express()

//Middlewares opcionales

const autenticacionMiddleware = function (req, res, next) {
    let token;
    let usuario;
    let fechaAhora = new Date()
    let TokenExpirationDate = null
    let newExpirationDate = null
    let rowsAffected = 0

    if (req.path.toLowerCase().startsWith("/public/")) return next()
    if (req.path.toLowerCase().startsWith("/api/ingredientesXpizzas")) return next()
    if (req.path.toLowerCase().startsWith("/api/unidades")) return next()
    if (req.path.toLowerCase().startsWith("/api/ingredientes")) return next()

}

const tiempoTranscurridoMiddleware = function (req, res, next) {
    const inicio = Date.now();

    res.on('finish', () => {
        const fin = Date.now();
        const tiempoTranscurrido = fin - inicio;
        console.log(`Tiempo de procesamiento: ${tiempoTranscurrido} ms`)
    })
    next();
}

const apikeyMiddleware = function (req, res, next) {
    const clave = '123456789';

    if (req.headers.apikey === clave) {
        next();
    }
    else {
        return res.status(401).send("Unauthorized, es necesario una ApiKey Valida");
    }
}

const createdByMiddleware = function (req, res, next) {
    res.header('CreatedBy', 'Federico Gomboc')
    next();
}

//INCLUSION DE LOS MIDDLEWARES

//Estos se van a ejecutar siempre
app.use(tiempoTranscurridoMiddleware);
app.use(apikeyMiddleware);
app.use(createdByMiddleware);

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

//Estos se van a ejecutar cuando se mande esa ruta en especifico

app.use('/api/pizzas', routerPizza);
app.use('/api/ingredientesXpizzas', routerIngXPizza);
app.use('/api/unidades', routerUnidad);
app.use('/api/ingredientes', routerIngrediente);

app.listen(3000, () => {
    console.log("Servidor a la espera de conexiones")
})  