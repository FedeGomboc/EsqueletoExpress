import { Router } from "express"
import PizzaService from "./../services/pizzas-services.js"
import { StatusCodes } from "http-status-codes"

const router = new Router();
const pizzaService = new PizzaService()

router.get('', async (req, res) => {
    let respuesta
    let incluirIngredientes = (typeof req.query.incluirIngredientes !== 'undefined' && req.query.incluirIngredientes.toLowerCase() === 'true')
    const listaPizzas = await pizzaService.getAll(incluirIngredientes)

    if (listaPizzas != null){
        respuesta = res.status(StatusCodes.OK).json(listaPizzas)
    } else {
        respuesta = res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Error interno")
    }

    return respuesta;
})

router.get('/:id', async (req, res) => {
    let respuesta
    let incluirIngredientes = (typeof req.query.incluirIngredientes !== 'undefined' && req.query.incluirIngredientes.toLowerCase() === 'true')

    const pizza = await pizzaService.getById(req.params.id, incluirIngredientes)
    
    if (pizza != null){
        respuesta = res.status(StatusCodes.OK).json(pizza)
    } else {
        respuesta = res.status(StatusCodes.NOT_FOUND).send(`<p>No se encontró la pizza (ID: ${req.params.id})</p>`)
    }

    return respuesta;
})

router.post('', async (req, res) => {
    const pizzaNueva = await pizzaService.insert(req.body)
    
    return res.status(StatusCodes.CREATED).json(pizzaNueva)
})

router.put('', async (req, res) => {
    const updatePizza = await pizzaService.update(req.body)

    return res.status(StatusCodes.OK).json(updatePizza)
})

router.delete('/:id', async (req, res) => {
    let respuesta 
    const deletePizza = await pizzaService.deleteById(req.params.id)
    
    if (deletePizza != 0){
        respuesta = res.status(StatusCodes.OK).json(respuesta)
    } else {
        respuesta = res.status(StatusCodes.NOT_FOUND).send(`No se encontró la pizza (ID: ${req.params.id})`)
    }
})

export default router;