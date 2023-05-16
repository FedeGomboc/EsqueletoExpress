function GetAll() {
    axios
        .get("http://localhost:3000/getall")
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
    let url = "http://localhost:3000/getbyid/" + id.value

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
        })
}

function Insert() {
    let url = "http://localhost:3000/insert"

    const parametros = JSON.stringify({
        "Nombre": nombrePizza,
        "LibreGluten": glutenPizza,
        "Importe": importePizza,
        "Descripcion": descripcionPizza
    })

    axios
    .post(url, parametros)
    .then((result) => {
        console.log(parametros)
        console.log(result.data)
        document.querySelector("#listado").innerHTML = ""
        document.querySelector("#listado").innerHTML += `<p>La pizza ha sido creada</p>`
    }) 
    .catch((error) => {
        console.log(error)
    })

}