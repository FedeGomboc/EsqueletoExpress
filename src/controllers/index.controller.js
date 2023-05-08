import PizzaService from "../services/pizzas-services.js";

const controller = {};

controller.index = (req, res) => {
  let svc = new PizzaService()
  let respuesta = svc.getById(req.params.id)
  res.send(respuesta)
};

export default controller;
