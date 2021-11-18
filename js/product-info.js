var user = localStorage.getItem("usuario");
var prodComentarios = {};
var product = {};

function showImagesGallery(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];
        if (i==0){
            htmlContentToAppend += `
            <div class="carousel-item active">
            <img class="d-block w-100" src="` + imageSrc + `" alt="`+ i +`">
            </div>
            `
        }else{
            htmlContentToAppend += `
            <div class="carousel-item">
             <img class="d-block w-100" src="` + imageSrc + `" alt="`+ i +`">
            </div>
            `
        }
     

        document.getElementById("imagesCarousel").innerHTML = htmlContentToAppend;
    }
}

function mostrarEstrellas(cantEstrellas){
    let htmlContentToAppend = "";
    
    for(let i = 0; i < cantEstrellas; i++){
        htmlContentToAppend += ` <span class="fa fa-star checked"></span> `
    }
    for(let i = cantEstrellas; i < 5; i++){
        htmlContentToAppend += ` <span class="fa fa-star"></span>  `
    }
    return htmlContentToAppend;
}

function showComments(comentariosProductos){
    let htmlContentToAppend = "";
    
    for(let i = 0; i < comentariosProductos.length; i++){
        let comments = comentariosProductos[i];

        htmlContentToAppend += `
        <div class="card">
              <div class="card-header">
               `+ comments.user +' / '+ `<small>`+comments.dateTime+`</small> ` +' / '+ mostrarEstrellas(comments.score) +`
              </div>
              <div class="card-body">
                <blockquote class="blockquote mb-0">
                  <p>`+ comments.description +`</p>
                </blockquote>
              </div>
            </div>
        
        `

    document.getElementById("cajaComentarios").innerHTML = htmlContentToAppend;
    }
}

function formatoFecha(fecha, formato) {
    const map = {
        dd: fecha.getDate(),
        mm: fecha.getMonth() + 1,
        yy: fecha.getFullYear().toString().slice(),
        yyyy: fecha.getFullYear()
    }

    return formato.replace(/dd|mm|yy|yyy/gi, matched => map[matched])
}

function agregarComentario(){
    var radios = document.getElementsByName("estrellas");
    var formValid = false;
    var i = 0;
    while (!formValid && i < radios.length) {
        if (radios[i].checked) {
            formValid = true;
        }
        i++;
    }
    if (!formValid) {
        document.getElementById("errorEstrellas").innerHTML = "Debe ingresar su calificacion";
        return formValid;
    } else {
        let comentario = document.getElementById("escribirComentario").value;
        localStorage.setItem("escribirComentario",comentario);
        if (comentario != ""){
            const hoy = new Date();
            let htmlContentToAppend = "";
            htmlContentToAppend += `
                <div class="card">
                <div class="card-header">
                `+ user +' / '+`<small>` + formatoFecha(hoy,'yy-mm-dd') +`</small>`+' / '+ mostrarEstrellas(6-i) +`
                </div>
                <div class="card-body">
                <blockquote class="blockquote mb-0">
                    <p>`+ comentario +`</p>
                </blockquote>
                </div>
            </div>
                
            `
        document.getElementById("nuevoComentario").innerHTML += htmlContentToAppend;
        }else{
            document.getElementById("errorEstrellas").innerHTML = "Debe ingresar un comentario";
        }
    }
}

var relProd = [];

function guardarRelacionados(idRelacionados){
    relProd = idRelacionados;
}

function showProductsRelacionados(arrayP) {

    let htmlContentToAppend = "";
    for (let i = 0; i < relProd.length; i++) {

            let productos = arrayP[relProd[i]];

                htmlContentToAppend += `
                
                <div class="col-md-4" style="display: inline-block;">
                    <small><h6>Producto relacionado:</h6></small>    
                    <a href= "product-info.html" class="card mb-4 shadow-sm custom-card">
                        <img class="bd-placeholder-img card-img-top" src="` + productos.imgSrc + `">
                        <h3 class="ml-3 mr-3 mt-3 mb-0">` + productos.name + `  </h3>    
                        <div class="card-body pt-1">
                        <small class="text-muted">` + productos.soldCount + ` cantidad de vendidos </small>
                        <p class="card-text mt-3 mb-2"> ` + productos.description + `</p>
                        <small class="text-muted">` + productos.currency + ` ` + productos.cost + ` </small>
                        </div>
                    </a>
                </div>`

            document.getElementById("productosRelacionados").innerHTML = htmlContentToAppend;
        }
    }

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            product = resultObj.data;

            let productNameHTML  = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productCostHTML = document.getElementById("productCost");
            let productCountHTML = document.getElementById("productSoldCount");
            let productCategoryHTML = document.getElementById("productCategory");
        
            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productCountHTML.innerHTML = product.soldCount;
            productCostHTML.innerHTML = product.currency +' '+ product.cost;
            productCategoryHTML.innerHTML = product.category;
            
            
            document.getElementById("verUsu").innerHTML += user;
            //Muestro las imagenes en forma de galería
            showImagesGallery(product.images);
            guardarRelacionados(product.relatedProducts);
            
        }
    });
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            productComentarios = resultObj.data;
            showComments(productComentarios);
        }
    });
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            productList = resultObj.data;
            showProductsRelacionados(productList);
        }
    });
});