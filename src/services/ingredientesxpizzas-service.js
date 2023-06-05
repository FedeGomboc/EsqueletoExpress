import config from './../../dbconfig.js'
import sql from 'mssql'

class IngredientesXPizzaService {
    getAll = async () => {
        let returnEntity = null
        console.log('Estoy en IngredientesXPizzaService.GetAll')
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .query('SELECT * FROM IngredientesXPizzas');
            returnEntity = result.recordsets[0]
        } catch (error) {
            console.log(error)
        }
        return returnEntity;
    }

    getById = async (id) => {
        let returnEntity = null
        console.log('Estoy en IngredientesXPizzaService.GetById(id)')
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input("pId", sql.Int, id)
                .query(`
                SELECT 
                    Ingredientes.Nombre AS Nombre, 
                    IngredientesXPizzas.Cantidad AS Cantidad, 
                    Unidades.Nombre AS Unidad 
                    FROM IngredientesXPizzas

                INNER JOIN Ingredientes ON IngredientesXPizzas.IdIngrediente = Ingredientes.Id
                INNER JOIN Unidades ON IngredientesXPizzas.IdUnidad = Unidades.Id

                WHERE IngredientesXPizzas.IdPizza = @pId
                    `);
            returnEntity = result.recordsets[0]

        } catch (error) {
            console.log(error)
        }

        return returnEntity;
    }

    insert = async (ingredienteXPizza) => {
        let rowsAffected = 0;
        console.log('Estoy en IngredientesXPizzaService.Insert(ingredienteXpizza)')
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pIdPizza', sql.Int, ingredienteXPizza.IdPizza)
                .input('pIdIngrediente', sql.Int, ingredienteXPizza.IdIngrediente)
                .input('pCantidad', sql.Int, ingredienteXPizza.Cantidad)
                .input('pIdUnidad', sql.Int, ingredienteXPizza.IdUnidad)
                .query('INSERT INTO IngredientesXPizzas(IdPizza, IdIngrediente, Cantidad, IdUnidad) VALUES (@pIdPizza,@pIdIngrediente,@pCantidad,@pIdUnidad)');
            rowsAffected = result.rowsAffected;
            console.log('IngredienteXPizza creado')

        } catch (error) {
            console.log(error)
        }
        return rowsAffected
    }
}

export default IngredientesXPizzaService