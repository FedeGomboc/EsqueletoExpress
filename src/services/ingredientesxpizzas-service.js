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
                .query('SELECT * FROM IngredientesXPizzas WHERE id = @pId');
            returnEntity = result.recordsets[0][0]

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

    update = async (ingredienteXPizza) => {
        let rowsAffected = 0
        console.log('Estoy en IngredientesXPizzaService.Update(ingredienteXpizza)')
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pId', sql.Int, ingredienteXPizza.Id)
                .input('pIdPizza', sql.Int, ingredienteXPizza.IdPizza)
                .input('pIdIngrediente', sql.Int, ingredienteXPizza.IdIngrediente)
                .input('pCantidad', sql.Int, ingredienteXPizza.Cantidad)
                .input('pIdUnidad', sql.Int, ingredienteXPizza.IdUnidad)
                .query('UPDATE IngredientesXPizzas SET IdPizza = @IdPizza, IdIngrediente = @IdIngrediente, Cantidad = @Cantidad, IdUnidad = @IdUnidad WHERE Id = @Id');
            rowsAffected = result.rowsAffected;
            console.log('IngredienteXPizza actualizado')

        } catch (error) {
            console.log(error)
        }
        return rowsAffected
    }

    deleteById = async (id) => {
        let rowsAffected = 0;
        console.log('Estoy en IngredientesXPizzaService.DeleteById(id)')
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pId', sql.Int, id)
                .query('DELETE FROM IngredientesXPizzas WHERE id = @pId');
            rowsAffected = result.rowsAffected;
        } catch (error) {
            console.log(error)
        }
        return rowsAffected;
    }
}

export default IngredientesXPizzaService