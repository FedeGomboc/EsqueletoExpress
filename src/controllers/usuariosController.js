import { Router } from "express";
import { StatusCodes } from "http-status-codes"
import UsuariosService from "../services/usuarios-services.js";

const router = new Router()
const svc = new UsuariosService()

router.post("/login", async (req,res) => {
    let respuesta
    let entidad = req.body
    let returnEntity 
    
    returnEntity = await svc.login(entidad)

    if (returnEntity != null){
        returnEntity.password = '*'.repeat(10)
        respuesta = res.status(StatusCodes.OK).json(returnEntity)
    } else {
        respuesta = res.status(StatusCodes.NOT_FOUND).send("Usuario inexistente")
    }

    return respuesta
})

export default router