import { Router } from "express";
import PizzaService from "./../services/pizzas-services.js";

const router = new Router();
const pizzaService = new PizzaService()

router.get('', async (req, res) => {
    const listaPizzas = await pizzaService.getAll()
    res.send(listaPizzas)
})

router.get('/:id', async (req, res) => {
    const respuesta = await pizzaService.getById(req.params.id)
    res.send(respuesta)
})

router.post('', async (req, res) => {
    const pizza = await pizzaService.insert(req.body)
    res.send(pizza)
})

router.put('', async (req, res) => {
    const updatePizza = await pizzaService.update(req.body)
    res.send(updatePizza)
})

router.delete('/:id', async (req, res) => {
    const deletePizza = await pizzaService.deleteById(req.params.id)
    res.send(deletePizza)
})

export default router;