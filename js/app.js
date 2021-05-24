const form = document.querySelector('#form');
let mostrarDatos = document.getElementById('fila-mostrar-datos');
let guardarInformacion = [];

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
            responsive: true
        });
    });
    if (localStorage.getItem('nomina')) {
        guardarInformacion = JSON.parse(localStorage.getItem('nomina'));
    }
    mostrarVectores();
});

form.addEventListener('submit', e => {
    e.preventDefault();
    cargarVectores();
});

mostrarDatos.addEventListener('click', e => {
    btnAccion(e);
});

const cargarVectores = () => {
    const nombre = document.getElementById('txtNombre').value;
    let apellido = document.getElementById('txtApellido').value;
    const numDoc = document.getElementById('txtNumDoc').value;
    const diasTrabajados = parseInt(document.getElementById('txtDiasTrabajados').value);
    let sueldo = parseFloat(document.getElementById('txtSueldo').value);

    let salario, salud, pension, totalDevengado, totalDescuentos, valorNeto;
    let aTransporte = 106454;

    if (nombre.trim() === '' || apellido.trim() === '' || numDoc.trim() === '' || diasTrabajados === '' || sueldo === '') {
        swal("Campos vacios!", "Se debe completar todos los campos!", "warning");
        return;
    }

    //operaciones
    salario = ((sueldo / 30) * diasTrabajados);
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
        nombre: nombre,
        apellido: apellido,
        numDoc: numDoc,
        diasTrabajados: diasTrabajados,
        salario: salario,
        aTransporte: aTransporte,
        totalDevengado: totalDevengado,
        salud: salud,
        pension: pension,
        totalDescuentos: totalDescuentos,
        valorNeto: valorNeto
    }
    //vamos a insertar los valores dentro del arreglo 
    guardarInformacion.push({ ...valores });
    form.reset();
    window.location.reload();
    $('#agregar_nomina').modal("hide");//nos derigimos a la modal y lo ocultamos
    mostrarVectores();
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
          <td><span class="fas fa-trash" role="button" data-id=${element.id}></span></td>
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
    if (e.target.classList.contains('fa-edit')) {
        $('#agregar_nomina').modal("hide");
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
                            eliminarElemento(guardarInformacion, element)
                            swal("Empleado eliminado correctamente.", {
                                icon: "success",
                            });
                            mostrarVectores();
                        } else {
                            swal("No has eliminado el empleado", "Sus datos estan ha salvo!", "success");
                        }
                    });
            }
        })
    }

    e.stopPropagation();
}