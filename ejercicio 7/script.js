const listadoUsuarios = document.getElementById('listadoUsuarios');

fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(datos => {
        datos.forEach(usuario => {
            const usuarioHTML = crearElementoUsuario(usuario);
            listadoUsuarios.appendChild(usuarioHTML);

            usuarioHTML.querySelector('.btnVerTareas').addEventListener('click', () => {
                mostrarTareasUsuario(usuario.id);
            });
        });
    });

function crearElementoUsuario(usuario) {
    const divUsuario = document.createElement('div');
    divUsuario.classList.add('usuario');

    const nombre = document.createElement('h2');
    nombre.textContent = usuario.name;
    divUsuario.appendChild(nombre);

    const detalles = document.createElement('p');
    detalles.innerHTML = `Usuario: ${usuario.username}<br>Correo: ${usuario.email}<br>Sitio web: ${usuario.website}`;
    divUsuario.appendChild(detalles);

    const btnVerTareas = document.createElement('button');
    btnVerTareas.classList.add('btnVerTareas');
    btnVerTareas.textContent = 'Ver tareas';
    divUsuario.appendChild(btnVerTareas);

    return divUsuario;
}

function mostrarTareasUsuario(idUsuario) {
    fetch(`https://jsonplaceholder.typicode.com/todos?userId=${idUsuario}`)
        .then(response => response.json())
        .then(tareas => {
            const divTareas = document.createElement('div');
            divTareas.classList.add('tareasUsuario');

            tareas.forEach(tarea => {
                const divTarea = document.createElement('div');
                divTarea.classList.add('tarea');
                divTarea.innerHTML = `<strong>${tarea.title}</strong>: ${tarea.completed ? 'Completada' : 'Pendiente'}`;
                divTareas.appendChild(divTarea);
            });

            const tareasUsuarioExistentes = document.querySelectorAll('.tareasUsuario');
            if (tareasUsuarioExistentes.length > 0) {
                tareasUsuarioExistentes[0].remove();
            }

            listadoUsuarios.appendChild(divTareas);
        });
}
