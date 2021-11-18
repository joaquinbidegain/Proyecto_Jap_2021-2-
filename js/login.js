document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("formulario").addEventListener('submit', validarFormulario); 
  });
  
  function validarFormulario(evento) {
    evento.preventDefault();
    var user = document.getElementById('usuario').value;
    var clave = document.getElementById('contrasena').value;

    if(usuario.length < 4 && usuario.length >= 8) {
      alert('Ingrese un nombre de usuario correcto');
      return;
    }else{
        if (clave.length < 6) {
            alert('La clave no es válida');
            return;
          }else{
            window.location.href = "home.html";
            localStorage.setItem("usuario",user);
          }
    }
  }