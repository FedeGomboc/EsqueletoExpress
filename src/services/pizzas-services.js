import config from './../../dbconfig.js'
import sql from 'mssql'

class PizzaService {
    getAll = async () => {
        let returnEntity = null
        console.log('Estoy en PizzaService.GetAll')
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .query('SELECT * FROM Pizzas');
            returnEntity = result.recordsets[0]

        } catch (error) {
            console.log(error)
        }
        return returnEntity;
    }

    getById = async (id) => {
        let returnEntity = null
        console.log('Estoy en PizzaService.GetById(id)')
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input("pId", sql.Int, id)
                .query('SELECT * FROM Pizzas WHERE id = @pId');
            returnEntity = result.recordsets[0][0]

        } catch (error) {
            console.log(error)
        }

    //if incluirIngredientes

        return returnEntity;
    }

    insert = async (pizza) => {
        let rowsAffected = 0;
        console.log('Estoy en PizzaService.Insert(pizza)')
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pNombre', sql.VarChar, pizza.Nombre)
                .input('pLibreGluten', sql.Bit, pizza.LibreGluten)
                .input('pImporte', sql.Float, pizza.Importe)
                .input('pDescripcion', sql.VarChar, pizza.Descripcion)
                .query('INSERT INTO Pizzas(Nombre, LibreGluten, Importe, Descripcion) VALUES (@pNombre,@pLibreGluten,@pImporte,@pDescripcion)');
            rowsAffected = result.rowsAffected;
            console.log('Pizza creada')

        } catch (error) {
            console.log(error)
        }
        return rowsAffected
    }

    update = async (pizza) => {
        let rowsAffected = 0
        console.log('Estoy en PizzaService.Update(pizza)')
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('Id', sql.Int, pizza.Id)
                .input('Nombre', sql.VarChar, pizza.Nombre)
                .input('LibreGluten', sql.Bit, pizza.LibreGluten)
                .input('Importe', sql.Float, pizza.Importe)
                .input('Descripcion', sql.VarChar, pizza.Descripcion)
                .query('UPDATE Pizzas SET Nombre = @Nombre, LibreGluten = @LibreGluten, Importe = @Importe, Descripcion = @Descripcion WHERE Id = @Id');
            rowsAffected = result.rowsAffected;
            console.log('Pizza actualizada')

        } catch (error) {
            console.log(error)
        }
        return rowsAffected
    }

    deleteById = async (id) => {
        let rowsAffected = 0;
        console.log('Estoy en PizzaService.DeleteById(id)')
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pId', sql.Int, id)
                .query('DELETE FROM Pizzas WHERE id = @pId');
            rowsAffected = result.rowsAffected;
        } catch (error) {
            console.log(error)
        }
        return rowsAffected;
    }
}
export default PizzaService;