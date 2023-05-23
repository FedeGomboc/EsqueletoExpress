function GetAll() {
    axios
        .get("http://localhost:3000/api/pizzas/")
        .then((result) => {
            const pizzas = result.data

            document.querySelector("#listado").innerHTML = ""
            pizzas.map((pizza, index) => {
                const { Id, Nombre, LibreGluten, Importe, Descripcion } = pizza

                document.querySelector("#listado").innerHTML += `
                <ul>ID: ${Id}</ul>
                <ul>Nombre: ${Nombre}</ul>
                <ul>Libre de gluten: ${LibreGluten}</ul>
                <ul>Precio: ${Importe}</ul>
                <ul>Descripcion: ${Descripcion}</ul>
                <br/>
                `
            })
        })
        .catch((error) => {
            console.log(error)
        });
}

function GetById() {
    let url = "http://localhost:3000/api/pizzas/" + id.value

    document.getElementById("id").value = '';

    axios
        .get(url)
        .then((result) => {
            let pizza = result.data

            document.querySelector("#listado").innerHTML = ""
            document.querySelector("#listado").innerHTML += `
          <ul>ID: ${pizza.Id}</ul>
          <ul>Nombre: ${pizza.Nombre}</ul>
          <ul>Libre de gluten: ${pizza.LibreGluten}</ul>
          <ul>Precio: ${pizza.Importe}</ul>
          <ul>Descripcion: ${pizza.Descripcion}</ul>
          <br/>`
        })
        .catch((error) => {
            console.log(error)
            document.querySelector("#listado").innerHTML = ""
            document.querySelector("#listado").innerHTML += `<p>La pizza no existe</p>`   
        })
        document.getElementById("id").value = '';
}

function Insert() {
    let url = "http://localhost:3000/api/pizzas/"

    const parametros = {
        Nombre: document.getElementById("nombrePizza").value,
        LibreGluten: document.getElementById("glutenPizza").value,
        Importe: document.getElementById("importePizza").value,
        Descripcion: document.getElementById("descripcionPizza").value
    }

    document.getElementById("nombrePizza").value = '';
    document.getElementById("glutenPizza").value = '';
    document.getElementById("importePizza").value = '';
    document.getElementById("descripcionPizza").value = '';

    axios
        .post(url, parametros)
        .then(() => {
            document.querySelector("#listado").innerHTML = ""
            document.querySelector("#listado").innerHTML += `<p>La pizza ha sido creada</p>`
        })
        .catch((error) => {
            console.log(error)
        })
    return false;
}

function Update() {
    let url = "http://localhost:3000/api/pizzas/"

    const parametros = {
        Id: document.getElementById("updateId").value,
        Nombre: document.getElementById("updateNombre").value,
        LibreGluten: document.getElementById("updateGluten").value,
        Importe: document.getElementById("updateImporte").value,
        Descripcion: document.getElementById("updateDescripcion").value
    }

    document.getElementById("updateId").value = '';
    document.getElementById("updateNombre").value = '';
    document.getElementById("updateGluten").value = '';
    document.getElementById("updateImporte").value = '';
    document.getElementById("updateDescripcion").value = '';

    axios
        .put(url, parametros)
        .then(() => {
            document.querySelector("#listado").innerHTML = ""
            document.querySelector("#listado").innerHTML += `<p>La pizza ha sido actualizada</p>`
        })
        .catch((error) => {
            console.log(error)
        })
    return false
}

function Delete() {
    let url = "http://localhost:3000/api/pizzas/" + deleteId.value

    document.getElementById("deleteId").value = '';

    axios
        .delete(url)
        .then(() => {
            document.querySelector("#listado").innerHTML = ""
            document.querySelector("#listado").innerHTML += `<p>La pizza ha sido eliminada</p>`
        })
        .catch((error) => {
            console.log(error)
            document.querySelector("#listado").innerHTML = ""
            document.querySelector("#listado").innerHTML += `<p>La pizza no existe</p>` 
        })
    return false
}