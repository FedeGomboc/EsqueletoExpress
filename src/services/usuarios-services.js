import config from "./../../dbconfig.js";
import sql from "mssql";
import crypto from "crypto"

class UsuariosService {
  login = async (usuario) => {
    let respuesta = null;
    let token;

    console.log("Estoy en UsuariosService.login(usuario)");

    respuesta = await this.getByUsernamePassword(
      usuario.UserName,
      usuario.PassWord
    );

    if (respuesta != null) {
      token = await this.refreshTokenById(respuesta.Id);
      if (token != null) {
        respuesta = await this.getByUsernamePassword(
          usuario.UserName,
          usuario.PassWord
        );
      }
    }

    return respuesta;
  };

  getByUsernamePassword = async (UserName, Password) => {
    let respuesta = null;
    console.log("Estoy en UsuariosService.GetByUsernamePassword(id)");

    try {
      let pool = await sql.connect(config);
      let result = await pool
        .request()
        .input("pUserName", sql.VarChar, UserName)
        .input("pPassword", sql.VarChar, Password)
        .query(`SELECT * FROM Usuarios WHERE UserName = @pUserName`);
      respuesta = result.recordsets[0][0];
    } catch (error) {
      console.log(error);
    }
    return respuesta;
  };

  refreshTokenById = async (id) => {
    let rowsAffected = 0
    let token = crypto.randomUUID()
    let expirationDate = this. 
    console.log(token)


  };

  addMinutes = async (minutes, date) => {

/* // creacion de un metodo  addMins para la clase Date
Date.prototype.addMins = function(m) {     
    this.setTime(this.getTime() + (m*60*1000));  // minutos * seg * milisegundos
    return this;    
 } 
 
 // asignacion de valores de tiempo y suma de minutos en metodo addMins()
 var actividad = '2019-09-13 06:45:00';
 var fechaI2 = new Date (actividad);
 minutoSumar = 45;
 
 fechaI2.addMins(minutoSumar);
 console.log(fechaI2);
 
 */
  }
}

export default UsuariosService;
