class ingredienteXPizza{
    Id;
    IdPizza;
    IdIngrediente;
    Cantidad;
    IdUnidad;
    constructor(IdPizza, IdIngrediente, Cantidad, IdUnidad){
        this.IdPizza = IdPizza
        this.IdIngrediente = IdIngrediente
        this.Cantidad = Cantidad
        this.IdUnidad = IdUnidad
    }
}

export default ingredienteXPizza;