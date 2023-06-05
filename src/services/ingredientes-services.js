import config from './../../dbconfig.js'
import sql from 'mssql'

class IngredientesService {
    getAll = async () => {
        let returnEntity = null
        console.log('Estoy en IngredientesService.GetAll')
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .query('SELECT * FROM Ingredientes');
            returnEntity = result.recordsets[0]

        } catch (error) {
            console.log(error)
        }
        return returnEntity;
    }

    getById = async (id) => {
        let returnEntity = null
        console.log('Estoy en IngredientesService.GetById(id)')
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input("pId", sql.Int, id)
                .query(`SELECT * FROM Ingredientes WHERE id = @pId`);
            returnEntity = result.recordsets[0][0]

        } catch (error) {
            console.log(error)
        }

        return returnEntity;
    }

    insert = async (ingrediente) => {
        let rowsAffected = 0;
        console.log('Estoy en IngredientesService.Insert(ingrediente)')
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pNombre', sql.VarChar, ingrediente.Nombre)
                .query('INSERT INTO Ingredientes(Nombre) VALUES (@pNombre)');
            rowsAffected = result.rowsAffected;
            console.log('Ingrediente creado')

        } catch (error) {
            console.log(error)
        }
        return rowsAffected
    }

    update = async (ingrediente) => {
        let rowsAffected = 0
        console.log('Estoy en IngredientesService.Update(ingrediente)')
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('Id', sql.Int, ingrediente.Id)
                .input('Nombre', sql.VarChar, ingrediente.Nombre)
                .query('UPDATE Ingredientes SET Nombre = @Nombre WHERE Id = @Id');
            rowsAffected = result.rowsAffected;
            console.log('Pizza actualizada')

        } catch (error) {
            console.log(error)
        }
        return rowsAffected
    }

    deleteById = async (id) => {
        let rowsAffected = 0;
        console.log('Estoy en IngredientesService.DeleteById(id)')
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pId', sql.Int, id)
                .query('DELETE FROM Ingredientes WHERE id = @pId');
            rowsAffected = result.rowsAffected;
        } catch (error) {
            console.log(error)
        }
        return rowsAffected;
    }
}

export default IngredientesService