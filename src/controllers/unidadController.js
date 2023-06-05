import { Router } from "express";
import { StatusCodes } from "http-status-codes"
import UnidadesService from "../services/unidades-services.js";

const router = new Router()
const unidadesService = new UnidadesService

router.get('', async (req, res) => {
    let respuesta
    const lista = await unidadesService.getAll()

    if (lista != null){
        respuesta = res.status(StatusCodes.OK).json(lista)
    } else {
        respuesta = res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Error interno")
    }

    return respuesta;
})

router.get('/:id', async (req, res) => {
    let respuesta
    const unidad = await unidadesService.getById(req.params.id)
    
    if (unidad != null){
        respuesta = res.status(StatusCodes.OK).json(unidad)
    } else {
        respuesta = res.status(StatusCodes.NOT_FOUND).send(`<p>No se encontró la unidad (ID: ${req.params.id})</p>`)
    }

    return respuesta;
})

export default router