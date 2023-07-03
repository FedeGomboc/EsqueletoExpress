import config from "./../../dbconfig.js";
import sql from "mssql";
import crypto from "crypto"

class UsuariosService {

  login = async (usuario) => {
    let respuesta = null;
    let token;

    console.log("Estoy en UsuariosService.login(usuario)");

    respuesta = await this.getByUsernamePassword(usuario.userName, usuario.password);

    if (respuesta != null) {
      token = await this.refreshTokenById(respuesta.id);
      if (token != null) {
        respuesta = await this.getByUsernamePassword(usuario.userName, usuario.password);
      }
    }

    return respuesta;
  };

  getByUsernamePassword = async (userName, password) => {
    let respuesta = null;
    console.log("Estoy en UsuariosService.GetByUsernamePassword(id)");

    try {
      let pool = await sql.connect(config);
      let result = await pool
        .request()
        .input("pUserName", sql.VarChar, userName)
        .input("pPassword", sql.VarChar, password)
        .query(`SELECT * FROM Usuarios WHERE userName = @pUserName`);
      respuesta = result.recordsets[0][0];
    } catch (error) {
      console.log(error);
    }
    return respuesta;
  };

  getByToken = async (token) => {
    let respuesta = null;
    console.log("Estoy en UsuariosService.GetByToken(token)");

    try {
      let pool = await sql.connect(config);
      let result = await pool
        .request()
        .input("pToken", sql.VarChar, token)
        .query(`SELECT * FROM Usuarios WHERE Token = @pToken`);
      respuesta = result.recordsets[0][0];
    } catch (error) {
      console.log(error);
    }
    return respuesta;
  };

  generateTokenById = async (id) => {
    let rowsAffected = 0
    let token = crypto.randomUUID()
    let expirationDate = this.addMinutes(15, new Date())
    console.log(token)

    try {
      rowsAffected = await this.refreshTokenById(id, token, expirationDate)
    }
    catch (error) {
      console.log(error)
    }
    return rowsAffected
  };

  refreshTokenById = async (id, token, expirationDate) => {
    let rowsAffected = 0

    try {
      let pool = await sql.connect(config)
      let result = await pool.request()
        .input("pToken", sql.VarChar, token)
        .input("pId", sql.Int, id)
        .input("pExpirationDate", sql.VarChar, expirationDate.toISOString)
        .query(`UPDATE Usuarios SET TOKEN = @pToken, TokenExpirationDate = @pExpirationDate WHERE Id = @pId`);
      rowsAffected = result.rowsAffected
    }
    catch (error){
      console.log(error)
    }
    return rowsAffected
  }

  addMinutes = async (minutes, date) => {

    if (typeof minutes !== 'number') {
      throw new Error('Invalid "minutes" argument')
    }

    if (!(date instanceof Date)) {
      throw new Error('Invalid "date" argument')
    }

    date.setMinutes(date.getMinutes() + minutes)

    return date
  }
}

export default UsuariosService;
