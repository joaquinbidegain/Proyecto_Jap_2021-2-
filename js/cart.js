
let productosCarrito=[];


let moneda = "UYU";

/*completa la función para actualizar el subtotal del producto al modificar la cantidad del mismo*/
function updateProductoSubtotal(id){
    let costo = convertir(productosCarrito[id-1].unitCost, productosCarrito[id-1].currency);
    let cantidad = document.getElementById(id).value;
    if (cantidad<=0){
    	cantidad = 1;
    	document.getElementById(id).value = 1;
    }
    document.getElementById("subtotal"+id).innerHTML = cantidad*costo;
    sumaSubtotales();
}

//mostrar suma de subtotales
function sumaSubtotales(){
    let htmlToAppend = "";
    let subtotal = 0;
    
    for(let i=1; i<=productosCarrito.length; i++){
        subtotal = subtotal + parseFloat(document.getElementById("subtotal"+i).textContent);
    }

    document.getElementById("Subtotal").innerHTML = subtotal;
    document.getElementById("Total").innerHTML = subtotal;
}

/*modificar la función showCarrito para que aparezca el subtotal del producto en base a la cantidad y precio unitario*/
function showCarrito(){
    /*mostrar los productos del carrito con el input correspondiente a la cantidad*/
    let htmlToAppend = "";
    let id = 1;
    let costo = 0;
    for(let article of productosCarrito){
        costo = convertir(article.unitCost, article.currency);

        htmlToAppend += `
        <tr>
        <td><img src="${article.src}" class = "img-fluid" style ="max-width:50px!important"></td>
        <td class="align-middle">${article.name}</td>
        <td class="align-middle" id="unitCost${id}">${moneda} ${costo}</td>
        <td class="align-middle"><input id="${id}" onchange="updateProductoSubtotal(${id});" type="number" min ="1" value=${article.count}></td>
        <td id="subtotal${id}">${article.count * costo}</td>
        <td><button type="input" class="btn btn-danger" onclick="borrarProducto('${id-1}')">eliminar</button></td>
        </tr>
        `
        
        id++;         
    }

    document.getElementById("carrito").innerHTML = htmlToAppend;
}

function borrarProducto(i){

    productosCarrito.splice( i, 1 );
    let id = 1;
    for(let product of productosCarrito){
        let memoryCount = document.getElementById(id).value;
        product.count = memoryCount;
        id++;
    }
    showCarrito();
    sumaSubtotales();
    
}


function cambiarMonedas(){
    let costoUnitario = 0;
    let cantidad = 0;
    for(let i=1;i<=productosCarrito.length;i++){
        costoUnitario = convertir(productosCarrito[i-1].unitCost, productosCarrito[i-1].currency)
        cantidad = document.getElementById(i).value;
        if (cantidad<=0){
    		cantidad = 1;
    		document.getElementById(i).value = 1;
    	}
        document.getElementById("subtotal"+i).innerHTML = cantidad*costoUnitario;
        document.getElementById("unitCost"+i).innerHTML = moneda +" "+costoUnitario;
    }
    sumaSubtotales();
}


function convertir(costo, currency){
    if (moneda == 'UYU' && currency=='USD'){
        costo = costo*40;
    } else if (moneda == 'USD' && currency=='UYU'){
        costo = costo/40;
    }
    return costo;
}

function getCarrito(url){
    
    return fetch(url)
    .then(respuesta=>{
        return respuesta.json();
    })
    
}

function validarCompra(id){
    if (id == 'comprar1'){
        var valor_mes = document.getElementById("mes").value;
        var valor_anio = document.getElementById("anio").value;
        var valor_codigo = document.getElementById("codigo").value;
        var valor_numero = document.getElementById("tarjetaNumero").value;
        var valor_nombre = document.getElementById("tarjetaNombre").value;
        if ((valor_mes == "") && (valor_anio == "") && (valor_nombre == "") && (valor_numero == "") && (valor_codigo == "")){
            document.getElementById("errorpagocred").innerHTML = "Debe ingresar datos en todos los campos";
            mes.style.borderColor = "red";
            anio.style.borderColor = "red";
            codigo.style.borderColor = "red";
            tarjetaNumero.style.borderColor = "red";
            tarjetaNombre.style.borderColor = "red";
    
        } else if (valor_mes == "") {
            document.getElementById("errorpagocred").innerHTML = "Debe completar el campo";
            mes.style.borderColor = "red";
        } else if (valor_anio == "") {
            document.getElementById("errorpagocred").innerHTML = "Debe completar el campo";
            anio.style.borderColor = "red";
        } else if (valor_codigo == "") {
            document.getElementById("errorpagocred").innerHTML = "Debe completar el campo";
            codigo.style.borderColor = "red";
        } else if (valor_numero == "") {
            document.getElementById("errorpagocred").innerHTML = "Debe completar el campo";
            tarjetaNumero.style.borderColor = "red";
        } else if (valor_nombre == "") {
            document.getElementById("errorpagocred").innerHTML = "Debe completar el campo";
            tarjetaNombre.style.borderColor = "red";
        } else {
            document.getElementById("errorpagocred").innerHTML = "";
            mes.style.borderColor = "green";
            anio.style.borderColor = "green";
            codigo.style.borderColor = "green";
            tarjetaNumero.style.borderColor = "green";
            tarjetaNombre.style.borderColor = "green";
    
        }
    }else if (id == 'comprar2'){
        var valor_titular = document.getElementById("titular").value;
        var valor_numcuenta = document.getElementById("numerocuentabanc").value;
        var valor_iban = document.getElementById("iban").value;
    
        if ((valor_titular == "") && (valor_numcuenta == "") && (valor_iban == "")) {
            document.getElementById("errorpagobanc").innerHTML = "Debe ingresar datos en todos los campos";
            titular.style.borderColor = "red";
            numerocuentabanc.style.borderColor = "red";
            iban.style.borderColor = "red";
        } else if (valor_titular == "") {
            document.getElementById("errorpagobanc").innerHTML = "Debe completar el campo";
            titular.style.borderColor = "red";
        } else if (valor_numcuenta == "") {
            document.getElementById("errorpagobanc").innerHTML = "Debe completar el campo";
            numerocuentabanc.style.borderColor = "red";
        } else if (valor_iban == "") {
            document.getElementById("errorpagobanc").innerHTML = "Debe completar el campo";
            iban.style.borderColor = "red";
        } else {
            document.getElementById("errorpagobanc").innerHTML = "";
            titular.style.borderColor = "green";
            numerocuentabanc.style.borderColor = "green";
            iban.style.borderColor = "green";
        
        }
    }
}

// Get the modal
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function actualizarSubtotal(id){
    let cuenta = 0;
    let total = parseFloat(document.getElementById("Subtotal").innerHTML);
    if (id == "radio1"){
        cuenta = (15*total)/100;
    }else if (id == "radio2"){
        cuenta = 7*total/100;
    }else if (id == "radio3"){
        cuenta = 5*total/100;
    }
    let totalFinal = cuenta + total;

    document.getElementById("envioCosto").innerHTML = Math.round(cuenta);
    document.getElementById("Total").innerHTML = Math.round(totalFinal);
}



document.getElementById("buyBtn").addEventListener("click",function(e){
    var valor_dato1 = document.getElementById("datosDomicilio1").value;
    var valor_dato2 = document.getElementById("datosDomicilio2").value;
    var valor_dato3 = document.getElementById("datosDomicilio3").value;
    if ((valor_dato1 == "") && (valor_dato2 == "") && (valor_dato3 == "")){
        datosDomicilio1.style.borderColor = "red";
        datosDomicilio2.style.borderColor = "red";
        datosDomicilio3.style.borderColor = "red";
        document.getElementById("alertaDireccion").innerHTML = "Debe completar todos los campos";
    }else if (valor_dato1 == ""){
        datosDomicilio1.style.borderColor = "red";
        document.getElementById("alertaDireccion").innerHTML = "Debe completar todos los campos";
    }else if (valor_dato2 == ""){
        datosDomicilio2.style.borderColor = "red";
        document.getElementById("alertaDireccion").innerHTML = "Debe completar todos los campos";
    }else if (valor_dato3 == ""){
        datosDomicilio3.style.borderColor = "red";
        document.getElementById("alertaDireccion").innerHTML = "Debe completar todos los campos";
    }else{
        datosDomicilio1.style.borderColor = "green";
        datosDomicilio2.style.borderColor = "green";
        datosDomicilio3.style.borderColor = "green";
        document.getElementById("alertaDireccion").innerHTML = "";
    }
    
})
    
document.addEventListener("DOMContentLoaded", function(e){
        getCarrito("https://japdevdep.github.io/ecommerce-api/cart/654.json")
        .then(respuesta=>{
            productosCarrito = respuesta.articles;
            moneda = 'UYU';
            showCarrito();
            sumaSubtotales();
            document.getElementById("uruguayos").addEventListener("click", function(e){
                moneda = 'UYU';
                cambiarMonedas();
            });
            document.getElementById("dolares").addEventListener("click", function(e){
                moneda = 'USD';
                cambiarMonedas();
            });
            console.log(productosCarrito);
        })
    })