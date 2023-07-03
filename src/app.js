import express from "express";
import cors from 'cors'
import routerPizza from "./controllers/pizzaController.js";
import routerIngXPizza from './controllers/ingredienteXpizzaController.js'
import routerUnidad from './controllers/unidadController.js'
import routerIngrediente from './controllers/ingredienteController.js'
import UsuariosService from "./services/usuarios-services.js";

const app = express()

//Middlewares opcionales

const autenticacionMiddleware = async function (req, res, next) {
    let token;
    let usuario;
    let fechaAhora = new Date()
    let tokenExpirationDate = null
    let newExpirationDate = null
    let rowsAffected = 0

    if (req.path.toLowerCase().startsWith("/public/")) return next()
    if (req.path.toLowerCase().startsWith("/login/")) return next()
    if (req.path.toLowerCase().startsWith("/api/ingredientesXpizzas")) return next()
    if (req.path.toLowerCase().startsWith("/api/unidades")) return next()
    if (req.path.toLowerCase().startsWith("/api/ingredientes")) return next()
    
    token = req.get("token")

    if ((token==null) || (token=='undefined')){
        res.status(401).send ("401 unauthorized, es necesario un token valido")
    }
    else {
        let svc = new UsuariosService()
        usuario = await svc.getByToken(token)

        if (usuario != null){
            tokenExpirationDate = new Date(usuario.tokenExpirationDate)

            if (fechaAhora < tokenExpirationDate){
                newExpirationDate = svc.addMinutes(15, new Date())
                rowsAffected = await svc.refreshTokenById(usuario.Id, usuario.Token, newExpirationDate)
                next()
            }
            else {
                res.status(401).send ("401 unauthorized, el token ha expirado")
            }
        }
        else {
            res.status(401).send ("401 unauthorized, token / usuario inexistente")
        }
    }
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
app.use(autenticacionMiddleware);

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