import { Router } from "express";
import IngredientesXPizzaService from "../services/ingredientesxpizzas-service.js";
import { StatusCodes } from "http-status-codes";

const router = new Router()
const ingredientesXPizzasService = new IngredientesXPizzaService

router.get('', async (req, res) => {
    let respuesta
    const lista = await ingredientesXPizzasService.getAll()

    if (lista != null){
        respuesta = res.status(StatusCodes.OK).json(listaPizzas)
    } else {
        respuesta = res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Error interno")
    }

    return respuesta;
})

router.get('/:id', async (req, res) => {
    let respuesta
    const pizza = await ingredientesXPizzasService.getById(req.params.id)
    
    if (pizza != null){
        respuesta = res.status(StatusCodes.OK).json(pizza)
    } else {
        respuesta = res.status(StatusCodes.NOT_FOUND).send(`<p>No se encontró el IngredienteXPizza (ID: ${req.params.id})</p>`)
    }

    return respuesta;
})

router.post('', async (req, res) => {
    const pizzaNueva = await ingredientesXPizzasService.insert(req.body)
    
    return res.status(StatusCodes.CREATED).json(pizzaNueva)
})

router.put('', async (req, res) => {
    const updatePizza = await ingredientesXPizzasService.update(req.body)

    return res.status(StatusCodes.OK).json(updatePizza)
})

router.delete('/:id', async (req, res) => {
    let respuesta 
    const deletePizza = await ingredientesXPizzasService.deleteById(req.params.id)
    
    if (deletePizza != 0){
        respuesta = res.status(StatusCodes.OK).json(respuesta)
    } else {
        respuesta = res.status(StatusCodes.NOT_FOUND).send(`No se encontró el IngredienteXPizza (ID: ${req.params.id})`)
    }
})

export default router;