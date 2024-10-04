let varForm = document.getElementById('form-contacto');
const varNombre = document.getElementById('txt-nombre');
const varEmail = document.getElementById('txt-correo');
const varMensaje = document.getElementById('txt-mensaje');

varForm.addEventListener('submit', (e) => {
    console.log('submit event triggered');
    e.preventDefault();
    if(validarForm())
    {
        alert('Formulario enviado correctamente');
        window.location.href = 'index.html';
    }
});


validarForm = () => {
    let errorNombre = document.getElementById('error-nombre');
    let errorCorreo = document.getElementById('error-correo');
    let errorMensaje = document.getElementById('error-mensaje');

    errorNombre.textContent = '';
    errorCorreo.textContent = '';
    errorMensaje.textContent = '';

    let isValid = true;

    if (varNombre.value === '') {
        errorNombre.textContent = 'El campo nombre es obligatorio';
        isValid = false;
    }

    if (varEmail.value === '') {
        errorCorreo.textContent = 'El campo correo es obligatorio';
        isValid = false;
    } else if (!validarEmail(varEmail.value)) {
        errorCorreo.textContent = 'Email no válido';
        isValid = false;
    }

    if (varMensaje.value === '') {
        errorMensaje.textContent = 'El campo mensaje es obligatorio';
        isValid = false;
    }

    return isValid;
}


validarEmail = (email) => {
    const expresion = /\w+@\w+\.[a-z]{2,}$/;
    return expresion.test(email);

}