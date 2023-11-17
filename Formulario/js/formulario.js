const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');
// El script comienza seleccionando el formulario y todos los elementos de entrada que contiene utilizando 'cosnt'.

const expresiones = { 
	usuario: /^[a-zA-ZÀ-ÿ\s]/, // Letras y espacios, pueden llevar acentos.
	nombre: /^[a-zA-ZÀ-ÿ\s]/, // Letras y espacios, pueden llevar acentos.
	password: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/ // 7 a 14 numeros.
}// Define un conjunto de expresiones regulares para validar las entradas utilizando 'const'.

const campos = {
	usuario: false,
	nombre: false,
	password: false,
	correo: false,
	telefono: false
}// Crea un objeto para realizar un seguimiento de la validez de cada campo utilizando 'const'.

const validarFormulario = (e) => {
	switch (e.target.name) {
		case "usuario":
			validarCampo(expresiones.usuario, e.target, 'usuario');
		break;
		case "nombre":
			validarCampo(expresiones.nombre, e.target, 'nombre');
		break;
		case "password":
			validarCampo(expresiones.password, e.target, 'password');
			validarPassword2();
		break;
		case "password2":
			validarPassword2();
		break;
		case "correo":
			validarCampo(expresiones.correo, e.target, 'correo');
		break;
		case "telefono":
			validarCampo(expresiones.telefono, e.target, 'telefono');
		break;
	}
}// Se utiliza 'switch' para validar los campos del formulario, 
// comprueba el nombre del campo de destino y llama a la función de validación adecuada.

const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)){
		document.getElementById(`grupo_${campo}`).classList.remove('formulario_grupo-incorrecto');
		document.getElementById(`grupo_${campo}`).classList.add('formulario_grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo_${campo} .formularioinput-error`).classList.remove('formulario_input-error-activo');
		campos[campo] = true;
	} else {
		document.getElementById(`grupo_${campo}`).classList.add('formulario_grupo-incorrecto');
		document.getElementById(`grupo_${campo}`).classList.remove('formulario_grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo_${campo} .formularioinput-error`).classList.add('formulario_input-error-activo');
		campos[campo] = false;
	}
}// Esta funcion valida un solo campo con 'if'.
// Prueba el valor del campo con la expresión correspondiente y 
// actualiza el estado de validez del campo y la retroalimentación visual.

const validarPassword2 = () => {
	const inputPassword1 = document.getElementById('password');
	const inputPassword2 = document.getElementById('password2');

	if(inputPassword1.value !== inputPassword2.value){
		document.getElementById(`grupo_password2`).classList.add('formulario_grupo-incorrecto');
		document.getElementById(`grupo_password2`).classList.remove('formulario_grupo-correcto');
		document.querySelector(`#grupo__password2 i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__password2 i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo_password2 .formularioinput-error`).classList.add('formulario_input-error-activo');
		campos['password'] = false;
	} else {
		document.getElementById(`grupo_password2`).classList.remove('formulario_grupo-incorrecto');
		document.getElementById(`grupo_password2`).classList.add('formulario_grupo-correcto');
		document.querySelector(`#grupo__password2 i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__password2 i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo_password2 .formularioinput-error`).classList.remove('formulario_input-error-activo');
		campos['password'] = true;
	}
} // Esta funcion es utilizada para validar el campo 'contraseña2', que debe coincidir con el campo 'contraseña'.

inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
}); // Se agregan detectores de eventos a todos los campos de entrada para llamar a
// validarFormulario cuando el usuario escribe en un campo o cuando el campo pierde el foco.


formulario.addEventListener('submit', (e) => {
	e.preventDefault();
// Se agrega un detector de eventos al formulario para manejar el envío del formulario.
	const terminos = document.getElementById('terminos');
	if(campos.usuario && campos.nombre && campos.password && campos.correo && campos.telefono && terminos.checked ){
		formulario.reset();

		document.getElementById('formulario_mensaje-exito').classList.add('formulario_mensaje-exito-activo');
		setTimeout(() => {
			document.getElementById('formulario_mensaje-exito').classList.remove('formulario_mensaje-exito-activo');
		}, 5000);

		document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
			icono.classList.remove('formulario__grupo-correcto');
		});
	} else {
		document.getElementById('formulario_mensaje').classList.add('formulario_mensaje-activo');
	}
}); 
// Si todos los campos son válidos y la casilla de verificación 'términos' está marcada,
// el formulario se restablece y se muestra un mensaje de éxito.
// De lo contrario, se muestra un mensaje de error.