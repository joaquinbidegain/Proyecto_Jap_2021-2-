const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_PROD_COUNT = "Cant.";
const ORDER_BY_PRICE = "Price";
const ORDER_BY_PRICE_ASC = "PriceAsc";
const ORDER_BY_PROD_COUNT_ASC = "CountAsc"
var currentProductsArray = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;


function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME)
    {
        result = array.sort(function(a, b) {
            if ( a.name < b.name ){ return -1; }
            if ( a.name > b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_NAME){
        result = array.sort(function(a, b) {
            if ( a.name > b.name ){ return -1; }
            if ( a.name < b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_COUNT){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PRICE){
        result = array.sort(function(a,b){
            let aCost = parseInt(a.cost);
            let bCost = parseInt(b.cost);

            if ( aCost > bCost ){ return -1; }
            if ( aCost < bCost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PRICE_ASC){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.cost);
            let bCount = parseInt(b.cost);

            if ( aCount < bCount ){ return -1; }
            if ( aCount > bCount ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_COUNT_ASC){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount < bCount ){ return -1; }
            if ( aCount > bCount ){ return 1; }
            return 0;
        });
    }
    return result;
}

function verProductsList(){
    let htmlContentToAppend = "";
    for(let i = 0; i < currentProductsArray.length; i++){
        let Products = currentProductsArray[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(Products.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(Products.cost) <= maxCount))){

                htmlContentToAppend += `
                                    <a href="Products-info.html" class="list-group-item list-group-item-action">
                    <div class="row">
                        <div class="col-3 col-md-3">
                            <img src="` + Products.imgSrc + `" alt="` + Products.description + `" class="img-thumbnail">
                        </div>
                        <div class="col-7 col-md-7">
                            <div class="d-flex w-100 justify-content-between">
                                <h4 class="mb-1">`+ Products.name +`</h4>
                            </div>
                            <p class="mb-1">` + Products.description + `</p>
                        </div>
                        <div class="col-2 col-md-2"> 
                            <div class="row">
                                <div class="container pr-0 pl-4"<small class="text-muted">` + Products.soldCount + ` artículos</small></div>
                            </div>
                            <div class="h-50"></div>
                            <div class="row">
                                <div class="container mt-2 pr-0 pl-4"><p class="text-dark h6 m-0">` + Products.currency +` `+ Products.cost + `</p></div>
                            </div>
                        </div>
                    </div>
                    </a>
            `

        }

        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
    }
}



function showProductsCuad(){

    let htmlContentToAppend = "";
    for(let i = 0; i < currentProductsArray.length; i++){
        let Products = currentProductsArray[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(Products.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(Products.cost) <= maxCount))){

                htmlContentToAppend += `
                
                <div class="col-md-4" style="display: inline-block;">    
                    <a href= "product-info.html" class="card mb-4 shadow-sm custom-card">
                        <img class="bd-placeholder-img card-img-top" src="` + Products.imgSrc + `">
                        <h3 class="ml-3 mr-3 mt-3 mb-0">` + Products.name + `  </h3>    
                        <div class="card-body pt-1">
                        <small class="text-muted">` + Products.soldCount + ` cantidad de vendidos </small>
                        <p class="card-text mt-3 mb-2"> ` + Products.description + `</p>
                        <small class="text-muted">` + Products.currency + ` ` + Products.cost + ` </small>
                        </div>
                    </a>
                </div>`

        }

        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
    }
}

function sortAndShowProducts(sortCriteria, ProductsArray){
    currentSortCriteria = sortCriteria;

    if(ProductsArray != undefined){
        currentProductsArray = ProductsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);
    
    //Muestro las categorías ordenadas
    showProductsCuad();

}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            sortAndShowProducts(ORDER_ASC_BY_NAME, resultObj.data);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_NAME);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_NAME);
    });

    document.getElementById("sortByCountAsc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_PROD_COUNT);
    });
    
    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_PROD_COUNT_ASC);
    });
    
    document.getElementById("sortByPrice").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_PRICE);
    });

    document.getElementById("sortByPriceAsc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_PRICE_ASC);
    });


    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCostMin").value = "";
        document.getElementById("rangeFilterCostMax").value = "";
        

        minCount = undefined;
        maxCount = undefined;

        verProductsList();
        showProductsCuad();
    });


    document.getElementById("rangeFilterCost").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("rangeFilterCostMin").value;
        maxCount = document.getElementById("rangeFilterCostMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }

        verProductsList();
        showProductsCuad();
    });
});
