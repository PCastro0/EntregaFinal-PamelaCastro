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
const shopContent = document.getElementById("shopContent");
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modal-container");

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
const producto = function(id, tipo, marca, precio, img) {
    this.id = id;
    this.tipo = tipo;
    this.marca = marca;
    this.precio = precio;
    this.imagen = img;
}

let producto1 = new producto(1, "CORTE", "Tendencia 2024", "3000", "../img/corte.jpg");
let producto2 = new producto(2, "PEINADO", "Recogidos & Novias", "7000", "/img/peinado.jpg");
let producto3 = new producto(3, "ALISADO", "Alisados Meth", "10000 ", "/img/alisado.jpg");
let producto4 = new producto(4, "TINTURA", "Sin Amoniaco", "4500 ", "./img/tintura.jpg");

let lista = [producto1, producto2, producto3, producto4];

let carrito = [];

lista.forEach((product) => {
    let content = document.createElement("div");
    content.className = "card";
    content.innerHTML = `
    <img src="${product.imagen}" alt="${product.tipo}">
    <h3>${product.tipo}</h3>
    <p>Marca: ${product.marca}</p>
    <p class="price">Precio: ${product.precio}</p>
    `;
    shopContent.appendChild(content);

    let comprar = document.createElement("button");
    comprar.innerText = "comprar";
    comprar.className = "comprar";

    content.appendChild(comprar);

    comprar.addEventListener("click", () => {
        carrito.push({
            id: product.id,
            img: product.imagen,
            nombre: product.tipo,
            marca: product.marca,
            precio: product.precio
        });
        console.log(carrito);
    });
});

verCarrito.addEventListener("click", () => {
    modalContainer.innerHTML = "";
    modalContainer.style.display = "flex";
    const modalHeader= document.createElement("div");
    modalHeader.className = "modal-header";
    modalHeader.innerHTML =`
    <h1 class="modal-header-tittle>Carrito.</h1>"
    `; 
    modalContainer.append(modalHeader);

    const modalbutton = document.createElement("h1");
    modalbutton.innerText = "Salir";
    modalbutton.className = "modal-header-button";

    modalbutton.addEventListener("click",() =>{
        modalContainer.style.display = "none";
    });

    modalHeader.append(modalbutton);


    carrito.forEach((product) => {
    let carritoContent = document.createElement("div")
    carritoContent.className = "modal-content"
    carritoContent.innerHTML =`
    <img src="${product.img}">
    <h3>${product.tipo}</h3>
    <p>${product.precio}</p>
    `;

    modalContainer.append(carritoContent)
}); 

    carrito.forEach((product) => {
        let carritoContent = document.createElement("div");
        carritoContent.className = "cart-item";
        carritoContent.innerHTML = `
            <img src="${product.img}">
            <p>${product.tipo}</p>
            <p>Marca: ${product.marca}</p>
            <p>Precio: ${product.precio}</p>
        `;

        modalContainer.append(carritoContent);
    });
    
        const total = carrito.reduce((acc, product) => acc + product.precio, 0);
        const totalBuying = document.createElement("div");
        totalBuying.className = "total-content"
        totalBuying.innerHTML = `total a pagar: ${total} $ `;
        modalContainer.append (totalBuying);

        const removeButton = carritoContent.querySelector(".remove-item");
        removeButton.addEventListener("click", () => {
            const carritoContent = carrito.findIndex((carritoContent) => carritoContent.id === item.id);
            if (itemIndex !== -1) {
                carrito.splice(itemIndex, 1);
                updateCartModal();
            }
        });

        modalContent.appendChild(carritoContent);
    });

    
    modalContainer.appendChild(modalContent);

//function updateCartModal() {
    // actualizar el contenido modal del carrito de compras
    



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
/*function BuscarProducto () {
    const body = document.querySelector("body")
     const input = document.getElementById("BuscarProducto").value // traigo el valor del input
    const palabraClave = input.trim().toUpperCase()
    const resultado = lista.filter((producto) => producto.tipo.toUpperCase().includes(palabraClave))
    if(resultado.length > 0){
        const container = document.createElement("div")
        container.classList.add("container")// le agrego clase para editarla en css

        resultado.forEach((producto) => {           const card = document.createElement("div")
        card.classList.add("card-carrito")
        const tipo = document.createElement("h2")
        tipo.textContent = producto.tipo
        card.appendChild(tipo)

        const marca = document.createElement("p")
        marca.textContent = producto.marca
        card.appendChild(marca)

        const precio = document.createElement("p")
    precio.textContent = producto.precio
        card.appendChild(precio)

        container.appendChild(card)
        })
        body.appendChild(container)
    }else{
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: '<a href="#">Why do I have this issue?</a>'
        });
    }
}
const filtrarBoton = document.getElementById("filtrar")
/filtrarBoton.addEventListener("click", BuscarProducto*/