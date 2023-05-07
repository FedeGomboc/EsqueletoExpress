const controller = {};

controller.index = (req, res) => {
  let obj = {
    nombre: "Elvis",
    edad: 50,
    casado: true,
  };
  res.send(obj);
};

export default controller;
