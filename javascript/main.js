 // entrega 3
//formulario con guardado en local storage
const iniciarForm = document.getElementById("iniciar-form")
const inputNameForm = document.getElementById("nameForm")
const inputUserForm = document.getElementById("userForm")
const inputEmailForm = document.getElementById("emailForm")
const inputPasswordForm = document.getElementById("passwordForm")
const inputButtonForm = document.getElementById("sendData")
const DatosTerminados = document.getElementById("datosGuardadosBien")
// nuevos botones
const nuevobotton = document.getElementById("boton-nuevo")
const nuevoBoton2 = document.getElementById("boton-nuevo2")

// recupero los datos al cargar la página
window.onload = function() {
    const datosGuardados = localStorage.getItem("DatosDelForm");
    if (datosGuardados) {
        const datos = JSON.parse(datosGuardados);
        DatosTerminados.innerHTML = "¡Hola! " + datos.nombre + ". El ingreso de datos fue exitoso.";
    }
}

inputButtonForm.addEventListener("click", function(event){
    event.preventDefault();
    
    let DatosDelForm = {
        nombre: inputNameForm.value,
        usuario: inputUserForm.value,
        email: inputEmailForm.value,
        contrasenia: inputPasswordForm.value,
    }

    if (Object.values(DatosDelForm).some(value => !value.trim())) {
        Swal.fire({
            icon: "ocurrio un error",
            title: "lo lamentamos",
            text: "volvé a intentarlo",
            footer: '<a href="#">Why do I have this issue?</a>'
            });;
        return;
    } else {
        Swal.fire({
            position: "center",
            icon: "success",
            title: "tus datos son correctos",
            showConfirmButton: false,
            timer: 1300
            });;
    }

    DatosTerminados.innerHTML = "Bienvenido " + DatosDelForm.nombre + ". Tus datos han sido guardados correctamente";
    let resultado = JSON.stringify(DatosDelForm);
    localStorage.setItem("DatosDelForm", resultado);
});

// creo productos
const Producto = function(tipo, marca, precio,img) {
    this.tipo = tipo;
    this.marca = marca;
    this.precio = precio;
    this.imagen = img;
}

let producto1 = new Producto("CORTE", "Tendencia 2024","3000 ARS", `../img/corte.jpg` );
let producto2 = new Producto("PEINADO", "Recogidos & Novias", "7000 ARS", "/img/peinado.jpg");
let producto3 = new Producto("ALISADO", "Alisados Meth","10000 ARS","/img/alisado.jpg");
let producto4 = new Producto("TINTURA", "Sin Amoniaco","4500 ARS","./img/tintura.jpg");




let lista = [producto1, producto2, producto3, producto4];

//carrito de compras
const shopContent = document.getElementById("shopContent")
const verCarrito = document.getElementById("verCarrito")
const modalContainer = document.getElementById("modalContainer")

let carrito = []

lista.forEach((product) =>{
    let content = document.createElement("div")
    content.className = "card"
    content.innerHTML = `
    <img src="${product.imagen}">
    <h3>${product.tipo}</h3>
    <p>Marca: ${product.marca}
    <p class="price"> Precio: ${product.precio}</p>
    `
    shopContent.appendChild(content)

    let comprar = document.createElement("button")
    comprar.innerText = "comprar"
    comprar.className= "comprar"
    content.append(comprar)

    comprar.addEventListener("click", () => {
        carrito.push({

            id:product.id,
            img:product.img,
            nombre:product.tipo,
            marca:product.marca,
            precio:product.precio

        })
        console.log(carrito)  
    })
})

verCarrito.addEventListener("click", () => {
    const modalContainer = document.createElement("div");
    modalContainer.className = "modal";

    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header";
    modalHeader.innerHTML = `<h1><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-shop-window" viewBox="0 0 16 16">
    <path d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.371 2.371 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976l2.61-3.045zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0M1.5 8.5A.5.5 0 0 1 2 9v6h12V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5m2 .5a.5.5 0 0 1 .5.5V13h8V9.5a.5.5 0 0 1 1 0V13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5a.5.5 0 0 1 .5-.5"/>
</svg>
</h1>`;

    const modalButton = document.createElement("h1");
    modalButton.className = "modal-header-Button";  

    modalHeader.appendChild(modalButton);

    modalContainer.appendChild(modalHeader);

    document.body.appendChild(modalContainer);
});

// recorrer el array list para mostrar productos
// for (const producto of lista) {
//     let contenedor = document.createElement("div");
//     contenedor.classList.add("contenedorProducto")
//     contenedor.innerHTML = `
//         <img src= "${lista.img}"> 
//         <h2 class="ProductoTipo">${producto.tipo}</h2>
//         <p class="ProductoMarca">${producto.marca}</p>
//         <p class="ProductoPrecio">${producto.precio} ARS</p>
//         <button class="ProductoBotton"> agregar al carrito </button><br>
//     `;
//     document.body.appendChild(contenedor);
// }
// const guardarlocal = (clave, valor) => {localStorage.setItem(clave,valor)}

// for (const x of lista) {
//     guardarlocal(x.tipo, JSON.stringify(x));
// }
// guardarlocal("listaproductos",JSON.stringify(lista))



















// para filtrar productos
// function BuscarProducto () {
//     const body = document.querySelector("body")
//     const input = document.getElementById("BuscarProducto").value // traigo el valor del input
//     const palabraClave = input.trim().toUpperCase()
//     const resultado = lista.filter((producto) => producto.tipo.toUpperCase().includes(palabraClave))
//     if(resultado.length > 0){
//         const container = document.createElement("div")
//         container.classList.add("container")// le agrego clase para editarla en css

//         resultado.forEach((producto) => {
//             const card = document.createElement("div")
//             card.classList.add("card-carrito")

//         const tipo = document.createElement("h2")
//         tipo.textContent = producto.tipo
//         card.appendChild(tipo)

//         const marca = document.createElement("p")
//         marca.textContent = producto.marca
//         card.appendChild(marca)

//         const tamanio = document.createElement("p")
//         tamanio.textContent = producto.tamanio
//         card.appendChild(tamanio)

//         const precio = document.createElement("p")
//         precio.textContent = producto.precio
//         card.appendChild(precio)

//         container.appendChild(card)
//         })
//         body.appendChild(container)
//     }else{
//         Swal.fire({
//             icon: "error",
//             title: "Oops...",
//             text: "Something went wrong!",
//             footer: '<a href="#">Why do I have this issue?</a>'
//         });
//     }
// }
// const filtrarBoton = document.getElementById("filtrar")
// filtrarBoton.addEventListener("click", BuscarProducto)