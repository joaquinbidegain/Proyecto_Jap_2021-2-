//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
function guardarDatos(){
    
    localStorage.setItem("nombreyapellido",document.getElementById("nombreyapellido").value);
    localStorage.setItem("edad",document.getElementById("edad").value);
    localStorage.setItem("email",document.getElementById("email").value);
    localStorage.setItem("tel",document.getElementById("telcontacto").value);

}

function borrarDatos(){
    localStorage.setItem("nombreyapellido","");
    localStorage.setItem("edad","");
    localStorage.setItem("email","");
    localStorage.setItem("tel","");
    localStorage.setItem("imagen-nueva","");
}

function cargarDatos(){
    let htmlContentToAppend = "";
    htmlContentToAppend += `
                    <div class="container" >
                        <div>
                            <p><b>Nombre completo: </b><span id="imprimirnombre">${localStorage.getItem("nombreyapellido")}</span> </p>
                        </div>
                        <div>
                            <p> <b> Edad:</b> <span id="imprimirEdad">${localStorage.getItem("edad")}</span> </p>
                        </div>
                        <div>
                            <p><b> E-mail:</b> <span id="imprimircorreo">${localStorage.getItem("email")}</span> </p>
                        </div>
                        <div>
                            <p><b> Telefono:</b> <span id="imprimirtelefono">${localStorage.getItem("tel")}</span> </p>
                        </div>
                    </div>
                
    `
    if(localStorage.getItem("imagen-nueva") == ""){
        let html = "";
        html += `
        <img src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png" class="avatar img-circle img-thumbnail" alt="avatar">
        `
        document.getElementById("imagen-perfil").innerHTML = html;
    }else{
        const recentImageDataUrl = localStorage.getItem("imagen-nueva");
        document.querySelector("#imagen-nueva").setAttribute("src", recentImageDataUrl);
    }




    document.getElementById("infoPerfil").innerHTML = htmlContentToAppend;
}




document.querySelector("#imagenNueva").addEventListener("change",function(){
    const reader = new FileReader();
    reader.addEventListener("load", ()=>{
        localStorage.setItem("imagen-nueva", reader.result);
    });
    reader.readAsDataURL(this.files[0]);
});

document.addEventListener("DOMContentLoaded", function (e) {
    cargarDatos();
});