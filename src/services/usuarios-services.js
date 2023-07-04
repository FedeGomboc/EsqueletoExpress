import config from "./../../dbconfig.js";
import sql from "mssql";
import crypto from "crypto";

class UsuariosService {
  login = async (usuario) => {
    let respuesta;
    let token;

    console.log("Estoy en UsuariosService.login(usuario)");

    respuesta = await this.getByUsernamePassword(
      usuario.userName,
      usuario.password
    );

    if (respuesta != null) {

      console.log("el usuario existe");

      if ((respuesta.token == null) || (respuesta.expirationDate == null)) {
        token = await this.generateTokenById(respuesta.id)
      }
      else {
        token = await this.refreshTokenById(respuesta.id, respuesta.token, respuesta.TokenExpirationDate);
      }

      if (token != null) {

        respuesta = await this.getByUsernamePassword(
          usuario.userName,
          usuario.password

        );
      }
    }

    return respuesta;
  };

  getByUsernamePassword = async (userName, password) => {
    let respuesta;
    console.log(
      "Estoy en UsuariosService.GetByUsernamePassword(userName, password)"
    );

    try {
      let pool = await sql.connect(config);
      let result = await pool
        .request()
        .input("pUserName", sql.VarChar, userName)
        .input("pPassword", sql.VarChar, password)
        .query(`SELECT * FROM Usuarios WHERE UserName = @pUserName`);
      respuesta = result.recordsets[0];
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
      console.log("Estoy en UsuariosService.GenerateTokenById");

      let rowsAffected = 0;
    let token = crypto.randomUUID();
    let expirationDate = new Date();
    expirationDate.setMinutes(expirationDate.getMinutes() + 15)
    console.log(expirationDate)
    console.log(typeof expirationDate)


    try {
      rowsAffected = await this.refreshTokenById(id, token, expirationDate);
    } catch (error) {
      console.log(error);
    }
    return rowsAffected;
  };

  refreshTokenById = async (id, token, expirationDate) => {
    console.log("Estoy en UsuariosService.RefreshTokenById");

    let rowsAffected = 0;

    console.log(typeof expirationDate)

    try {
      let pool = await sql.connect(config);
      let result = await pool
        .request()
        .input("pToken", sql.VarChar, token)
        .input("pId", sql.Int, id)
        .input("pExpirationDate", sql.DateTime, expirationDate)
        .query(
          `UPDATE Usuarios SET Token = @pToken, TokenExpirationDate = @pExpirationDate WHERE Id = @pId`
        );
      rowsAffected = result.rowsAffected;
    } catch (error) {
      console.log(error);
    }
    return rowsAffected;
  };

  addMinutes = async (minutes, date) => {
    console.log("Estoy en UsuariosService.addMinutes");

    if (typeof minutes !== "number") {
      throw new Error('Invalid "minutes" argument');
    }

    if (!(date instanceof Date)) {
      throw new Error('Invalid "date" argument');
    }

    date.setMinutes(date.getMinutes() + minutes);

    return date;
  };
}

export default UsuariosService;
