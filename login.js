const botonesLogin = document.getElementsByClassName("btn-login");
const botonX = document.getElementById("cerrar-popup");
const popup = document.querySelector(".login-popup");
const verContra = document.getElementById("visible");
const contra = document.getElementById("contraseña");
const btnSubmit = document.getElementById("submit");

function abrirPopUp () {
  popup.style.display = "flex";
  document.body.style.overflow = "hidden";
}

function cerrarPopUp () {
  popup.style.display = "none";
  document.body.style.overflow = "auto";
}

function verContrasena() {
  let valorActual =contra.type;
  contra.type = (valorActual==="text") ? "password" : "text";
}

for (const btnLogin of botonesLogin) {
  btnLogin.addEventListener("click", abrirPopUp);
}
botonX.addEventListener("click", cerrarPopUp);
verContra.addEventListener("change", verContrasena);

/* esto solo lo hago para que no se buguee el navegador al probar iniciar sesion mas de una vez */
btnSubmit.addEventListener("click",()=>{
  const usuario = document.getElementById("username");
  if (usuario.value !== "" && contra.value !== ""){
    cerrarPopUp();
    document.getElementById("formulario").reset();
  }
});