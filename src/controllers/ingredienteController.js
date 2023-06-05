import { Router } from "express"
import IngredientesService from "./../services/ingredientes-services.js"
import { StatusCodes } from "http-status-codes"

const router = new Router();
const ingredientesService = new IngredientesService()

router.get('', async (req, res) => {
    let respuesta
    const lista = await ingredientesService.getAll()

    if (lista != null){
        respuesta = res.status(StatusCodes.OK).json(lista)
    } else {
        respuesta = res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Error interno")
    }

    return respuesta;
})

router.get('/:id', async (req, res) => {
    let respuesta
    const ingrediente = await ingredientesService.getById(req.params.id)
    
    if (ingrediente != null){
        respuesta = res.status(StatusCodes.OK).json(ingrediente)
    } else {
        respuesta = res.status(StatusCodes.NOT_FOUND).send(`<p>No se encontró el ingrediente (ID: ${req.params.id})</p>`)
    }

    return respuesta;
})

router.post('', async (req, res) => {
    const ingredienteNuevo = await ingredientesService.insert(req.body)
    
    return res.status(StatusCodes.CREATED).json(ingredienteNuevo)
})

router.put('', async (req, res) => {
    const updateIngrediente = await ingredientesService.update(req.body)

    return res.status(StatusCodes.OK).json(updateIngrediente)
})

router.delete('/:id', async (req, res) => {
    let respuesta 
    const deleteIngrediente = await ingredientesService.deleteById(req.params.id)
    
    if (deleteIngrediente != 0){
        respuesta = res.status(StatusCodes.OK).json(respuesta)
    } else {
        respuesta = res.status(StatusCodes.NOT_FOUND).send(`No se encontró el ingrediente (ID: ${req.params.id})`)
    }
})

export default router