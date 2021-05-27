const form = document.querySelector('#form');
const formEdit = document.querySelector('#formEdit');
const inputs = document.querySelectorAll('#form input');
// const inputsEdit = document.querySelectorAll('#formEdit input');
let mostrarDatos = document.getElementById('fila-mostrar-datos');
let guardarInformacion = []
let salario, salud, pension, totalDevengado, totalDescuentos, valorNeto;
let aTransporte = 106454;

//expresiones regualares para validar la información introducida en los campos
const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{3,50}$/, // Letras y espacios, pueden llevar acentos.    
    telefono: /^\d{1,10}$/, // 1 a 10 numeros.
}

const campos = {
    nombre: false,
    apellidos: false,
    numDoc: false,
    diasTrabajados: false,
    sueldo: false
}

addEventListener('DOMContentLoaded', () => {
    $(document).ready(function () {
        $('#example').DataTable({
            language: {
                "sProcessing": "Procesando...",
                "sLengthMenu": "Mostrar _MENU_ registros",
                "sZeroRecords": "No se encontraron resultados",
                "sEmptyTable": "Ningún dato disponible en esta tabla =(",
                "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
                "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
                "sInfoPostFix": "",
                "sSearch": "Buscar:",
                "sUrl": "",
                "sInfoThousands": ",",
                "sLoadingRecords": "Cargando...",
                "oPaginate": {
                    "sFirst": "Primero",
                    "sLast": "Último",
                    "sNext": "Siguiente",
                    "sPrevious": "Anterior"
                },
                "oAria": {
                    "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
                    "sSortDescending": ": Activar para ordenar la columna de manera descendente"
                },
                "buttons": {
                    "copy": "Copiar",
                    "colvis": "Visibilidad"
                }
            },
            //para usar los botones   
            responsive: true,
            dom: 'Bfrtip',
            buttons: [
                'excel', 'copy', 'pdf'
            ]
        });
    });
    if (localStorage.getItem('nomina')) {
        guardarInformacion = JSON.parse(localStorage.getItem('nomina'));
    }
    mostrarVectores();
});

const validarFormulario = (e) => {
    switch (e.target.name) {
        case 'txtNombre':
            if (expresiones.nombre.test(e.target.value)) {
                campos['nombre'] = true;
            } else {
                swal("Dato incorrecto!", "El valor introducido en el campo nombre es incorrecto. Intente nuevamente.", "error");
            }
            break;

        case 'txtApellido':
            if (expresiones.nombre.test(e.target.value)) {
                campos['apellidos'] = true;
            } else {
                swal("Dato incorrecto!", "El valor introducido en el campo apellido es incorrecto. Intente nuevamente.", "error");
            }
            break;

        case 'txtNumDoc':
            if (expresiones.telefono.test(parseInt(e.target.value))) {
                campos['numDoc'] = true;
            } else {
                swal("Dato incorrecto!", "El valor introducido en el campo número de documento es incorrecto. Intente nuevamente.", "error");
            }
            break;

        case 'txtDiasTrabajados':
            if (expresiones.telefono.test(parseInt(e.target.value))) {
                campos['diasTrabajados'] = true;
            } else {
                swal("Dato incorrecto!", "El valor introducido en el campo días trabajados es incorrecto. Intente nuevamente.", "error");
            }
            break;

        case 'txtSueldo':
            if (expresiones.telefono.test(parseInt(e.target.value))) {
                campos['sueldo'] = true;
            } else {
                swal("Dato incorrecto!", "El valor introducido en el campo días sueldo es incorrecto. El valor ingresado debe ser un número entero mayor a cero. Intente nuevamente.", "error");
            }
            break;
    }
}

//les vamos a agregar un evento a cada uno de los inputs del formulario
inputs.forEach(input => {
    // input.addEventListener('keyup', validarFormulario)
    input.addEventListener('blur', validarFormulario);
})

form.addEventListener('submit', e => {
    e.preventDefault();
    cargarVectores();
});

formEdit.addEventListener('submit', e => {
    e.preventDefault();
    guardarInformacion.find(element => {
        if (element.numDoc === e.target[2].value) {
            let i = guardarInformacion.indexOf(element);
            cargarVectoresEditar(element.id, i);
        }
    });
})

mostrarDatos.addEventListener('click', e => {
    btnAccion(e);
});

const cargarVectores = () => {
    const nombre = document.getElementById('txtNombre');
    let apellido = document.getElementById('txtApellido');
    const numDoc = document.getElementById('txtNumDoc');
    let diasTrabajados = parseInt(document.getElementById('txtDiasTrabajados').value);
    let sueldo = parseFloat(document.getElementById('txtSueldo').value);

    if (campos.nombre === false || campos.apellidos === false || campos.numDoc === false
        || campos.diasTrabajados === false || campos.sueldo === false) {
        swal("Datos incorrectos!", "Los datos introducidos en los campos son incorrectos. Intente nuevamente!", "error");
    }
    if (nombre.value.trim() === '' || apellido.value.trim() === '' || numDoc.value.trim() === ''
        || diasTrabajados === '' || sueldo === '') {
        swal("Campos vacios!", "Ningún campo puede estar vacio, todos son obligatorios. Intene nuevamente!", "warning");
    }
    if (diasTrabajados <= 0 || diasTrabajados > 30) {
        swal("Campo incorrecto!", "El valor en el campo días trabajados debe ser un número mayor a 0 y menor a 30. Intene nuevamente!", "warning");
        campos['diasTrabajados'] = false;
    }

    if (sueldo <= 0) {
        swal("Campo incorrecto!", "El valor del campo suedo es incorrecto, debe ser un número entero mayor a 0; no debe contener ni puntos ni comas. Intente nuevamente!", "warning");
        campos['sueldo'] = false;
    }
    if (campos.nombre && campos.apellidos && campos.numDoc && campos.diasTrabajados && campos.sueldo) {
        //operaciones
        salario = ((sueldo / 30) * diasTrabajados);
        aTransporte = sueldo <= 1817052 ? aTransporte : aTransporte = 0;
        totalDevengado = (salario + aTransporte);
        //descuentos
        salud = ((totalDevengado - aTransporte) * 0.04);
        pension = ((totalDevengado - aTransporte) * 0.04);
        totalDescuentos = (salud + pension);

        //valor neto
        valorNeto = (totalDevengado - totalDescuentos);

        /*
         * Darle formato de número a moneda
        */
        const formatterPeso = new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0
        })
        salario = formatterPeso.format(salario);
        aTransporte = formatterPeso.format(aTransporte);
        totalDevengado = formatterPeso.format(totalDevengado);
        salud = formatterPeso.format(salud);
        pension = formatterPeso.format(pension);
        totalDescuentos = formatterPeso.format(totalDescuentos);
        valorNeto = formatterPeso.format(valorNeto);

        //crear el objeto que vamos a almacenar
        const valores = {
            id: Date.now(),
            nombre: nombre.value.trim(),
            apellido: apellido.value.trim(),
            numDoc: numDoc.value.trim(),
            diasTrabajados,
            sueldo,
            salario,
            aTransporte,
            totalDevengado,
            salud,
            pension,
            totalDescuentos,
            valorNeto
        }
        //vamos a insertar los valores dentro del arreglo 
        guardarInformacion.push({ ...valores });
        form.reset();
        window.location.reload();
        mostrarVectores();
    }
}

/*
 * Función para editar
*/

const cargarVectoresEditar = (id, index) => {
    const data = new FormData(formEdit);
    let diasTrabajados = parseInt(data.get('txtEditDiasTrabajados'));
    let sueldo = parseFloat(data.get('txtEditSueldo'));
    if (data.get('txtEditNombre').trim() !== '' || data.get('txtEditApellido').trim() !== ''
        || data.get('txtEditNumDoc').trim() !== '' || data.get('txtEditDiasTrabajados') !== '' || data.get('txtEditSueldo') !== '') {
        //operaciones
        salario = ((sueldo / 30) * diasTrabajados);
        aTransporte = sueldo <= 1817052 ? aTransporte : aTransporte = 0;
        totalDevengado = (salario + aTransporte);
        //descuentos
        salud = ((totalDevengado - aTransporte) * 0.04);
        pension = ((totalDevengado - aTransporte) * 0.04);
        totalDescuentos = (salud + pension);

        //valor neto
        valorNeto = (totalDevengado - totalDescuentos);
        /*
         * Darle formato de número a moneda
        */
        const formatterPeso = new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0
        })
        salario = formatterPeso.format(salario);
        aTransporte = formatterPeso.format(aTransporte);
        totalDevengado = formatterPeso.format(totalDevengado);
        salud = formatterPeso.format(salud);
        pension = formatterPeso.format(pension);
        totalDescuentos = formatterPeso.format(totalDescuentos);
        valorNeto = formatterPeso.format(valorNeto);

        //crear el objeto que vamos a almacenar
        const objetoSobreescrito = {
            id: id,
            nombre: data.get('txtEditNombre').trim(),
            apellido: data.get('txtEditApellido').trim(),
            numDoc: data.get('txtEditNumDoc').trim(),
            diasTrabajados,
            sueldo,
            salario,
            aTransporte,
            totalDevengado,
            salud,
            pension,
            totalDescuentos,
            valorNeto
        }
        //vamos a insertar los valores dentro del arreglo 
        if (index !== -1) {
            guardarInformacion.splice(index, 1);
            guardarInformacion.push(objetoSobreescrito);
            form.reset();
            window.location.reload();
            mostrarVectores();
        }
    }
}

const mostrarVectores = () => {

    localStorage.setItem('nomina', JSON.stringify(guardarInformacion));

    mostrarDatos.innerHTML = '';
    guardarInformacion.forEach(element => {
        // console.log(element);        
        mostrarDatos.innerHTML += `
        <tr>
          <td>${element.id}</td>
          <td>${element.nombre} ${element.apellido}</td>
          <td>${(element.numDoc)}</td>
          <td>${element.diasTrabajados}</td>
          <td>${element.salario}</td>
          <td>${element.aTransporte}</td>
          <td>${element.totalDevengado}</td>
          <td>${element.salud}</td>
          <td>${element.pension}</td>
          <td>${element.totalDescuentos}</td>
          <td>${element.valorNeto}</td>
          <td><span class="fas fa-pen btnEditar" role="button" data-id=${element.id} title="Editar"  data-bs-toggle="modal" data-bs-target="#editar_nomina"></span> | <span class="fas fa-trash" role="button" data-id=${element.id} title="Eliminar"></span></td>
        </tr>`
        // console.log(mostrarDatos);
    })
}

const eliminarElemento = (arr, item) => {
    let i = arr.indexOf(item);

    if (i !== -1) {
        arr.splice(i, 1);
        swal("Empleado eliminado correctamente.", {
            icon: "success",
        });
        mostrarVectores();
        window.location.reload();
    }
}

const btnAccion = e => {
    if (e.target.classList.contains('btnEditar')) {
        guardarInformacion.find(element => {
            if (element.id === parseInt(e.target.dataset.id)) {
                document.getElementById('txtEditNombre').value = element.nombre;
                document.getElementById('txtEditApellido').value = element.apellido;
                document.getElementById('txtEditNumDoc').value = element.numDoc;
                document.getElementById('txtEditDiasTrabajados').value = element.diasTrabajados;
                document.getElementById('txtEditSueldo').value = element.sueldo;
            }
        })
    }

    if (e.target.classList.contains('fa-trash')) {
        guardarInformacion.find(element => {
            if (element.id === parseInt(e.target.dataset.id)) {

                swal({
                    title: `Eliminar empleado ${element.nombre}`,
                    text: `Esta seguro de eliminar el empleado ${element.nombre}`,
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                })
                    .then((willDelete) => {
                        if (willDelete) {
                            eliminarElemento(guardarInformacion, element);
                            mostrarVectores();
                        } else {
                            swal("No has eliminado el empleado", "Sus datos estan ha salvo!", "success");
                        }
                    });
            }
        })
    }
}