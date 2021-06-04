let mostrarDatos = document.getElementById('fila-mostrar-datos');
let mostrarTotales = document.getElementById('mostrar-totales');
let guardarInformacion = [];

//expresiones regualares para validar la información introducida en los campos
const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{3,50}$/, // Letras y espacios, pueden llevar acentos.    
    telefono: /^\d{1,10}$/, // 1 a 10 numeros.
}

const campos = {
    nombrePersona: false,
    apellidos: false,
    numDoc: false,
    telefono: false,
    nombre: false,
    porIva: false,
    precioConIva: false,
    cantidad: false
}

addEventListener('DOMContentLoaded', () => {
    $(document).ready(function () {
        $('#example').DataTable({
            responsive: true,
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
            dom: 'Bfrtip',
            buttons: ['copy', 'excel']
        });
    });
    if (localStorage.getItem('nomina-antigua')) {
        guardarInformacion = JSON.parse(localStorage.getItem('nomina-antigua'));
        mostrarVectores();
    }
    document.querySelector('#exportar-pdf').addEventListener('click', () => {
        generarPdf();
    });
});

const generarPdf = () => {
    const documentoAConvertir = document.querySelector('#elementos-para-convertir');
    html2pdf()
        .set({
            margin: 0.5,
            filename: 'Sistema de Nómina.pdf',
            image: {
                type: 'jpeg',
                quiality: 0.98
            },
            html2canvas: {
                scale: 3,
                letterRendering: true
            },
            jsPDF: {
                unit: "in",
                format: "a3",
                orientation: 'Portrait'
            }
        })
        .from(documentoAConvertir)
        .save()
        .catch(err => console.log(err));
}

const cargarVectores = () => {
}

const mostrarVectores = () => {

    localStorage.setItem('nomina-antigua', JSON.stringify(guardarInformacion));
    /*
      * Darle formato de número a moneda
    */
    const formatterPeso = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
    })
    mostrarDatos.innerHTML = '';
    guardarInformacion.forEach(element => {
        // console.log(element);        
        mostrarDatos.innerHTML += `
        <tr>
          <td>${element.nombre} ${element.apellido}</td>
          <td>${formatterPeso.format(element.salario)}</td>
          <td>${formatterPeso.format(element.totalDevengado)}</td>
          <td>${formatterPeso.format(element.totalDescuentos)}</td>
          <td>${formatterPeso.format(element.netoAPagar)}</td>
          <td>${formatterPeso.format(element.totalSeguridadSoc)}</td>
          <td>${formatterPeso.format(element.totalParafiscales)}</td>
          <td>${formatterPeso.format(element.totalPrestaciones)}</td>
          <td>${formatterPeso.format(element.totalApropiaciones)}</td>
          <td>${formatterPeso.format(element.totalNomina)}</td>
          </tr>`
    })
    let salario = guardarInformacion.reduce((total, item) => {
        return total += item.salario;
    }, 0);

    let totalDevengado = guardarInformacion.reduce((total, item) => {
        return total += item.totalDevengado;
    }, 0);

    let totalDescuentos = guardarInformacion.reduce((total, item) => {
        return total += item.totalDescuentos;
    }, 0);

    let netoAPagar = guardarInformacion.reduce((total, item) => {
        return total += item.netoAPagar;
    }, 0);

    let totalSeguridadSoc = guardarInformacion.reduce((total, item) => {
        return total += item.totalSeguridadSoc;
    }, 0);

    let totalParafiscales = guardarInformacion.reduce((total, item) => {
        return total += item.totalParafiscales;
    }, 0);

    let totalPrestaciones = guardarInformacion.reduce((total, item) => {
        return total += item.totalPrestaciones;
    }, 0);

    let totalApropiaciones = guardarInformacion.reduce((total, item) => {
        return total += item.totalApropiaciones;
    }, 0);

    let totalNomina = guardarInformacion.reduce((total, item) => {
        return total += item.totalNomina;
    }, 0);

    salario = formatterPeso.format(salario);
    totalDevengado = formatterPeso.format(totalDevengado);
    totalDescuentos = formatterPeso.format(totalDescuentos);
    netoAPagar = formatterPeso.format(netoAPagar);
    totalSeguridadSoc = formatterPeso.format(totalSeguridadSoc);
    totalParafiscales = formatterPeso.format(totalParafiscales);
    totalPrestaciones = formatterPeso.format(totalPrestaciones);
    totalApropiaciones = formatterPeso.format(totalApropiaciones);
    totalNomina = formatterPeso.format(totalNomina);

    mostrarTotales.innerHTML = `
    <tr>
        <th>Total:</th>
        <th>${salario}</th>
        <th>${totalDevengado}</th>
        <th>${totalDescuentos}</th>
        <th>${netoAPagar}</th>
        <th>${totalSeguridadSoc}</th>
        <th>${totalParafiscales}</th>
        <th>${totalPrestaciones}</th>
        <th>${totalApropiaciones}</th>
        <th>${totalNomina}</th>
    </tr>
    `
}