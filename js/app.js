const form = document.querySelector('#form');
const formEdit = document.querySelector('#formEdit');
const inputs = document.querySelectorAll('#form input');
const inputsEdit = document.querySelectorAll('#formEdit input');
let guardarInformacion = [];
let informacionNomina = [];

//expresiones regualares para validar la información introducida en los campos
const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{3,50}$/, // Letras y espacios, pueden llevar acentos.    
    telefono: /^\d{1,10}$/, // 1 a 10 numeros.
    horas: /^\d{1,5}$/,
    numerosDeci: /^\d*\.?\d*$/
}

const campos = {
    nombre: false,
    apellidos: false,
    numDoc: false,
    diasTrabajados: false,
    sueldo: false,
    horasDiurnas: false,
    horasNocturnas: false,
    horasDominicalesDiur: false,
    horasDominicalesNoc: false,
    libranza: false,
    embargosJud: false,
    sindicatos: false,
    deudas: false,
    nivelArl: false
}

addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('nomina')) {
        guardarInformacion = JSON.parse(localStorage.getItem('nomina'));
    }
    permisosBotones();
    mostrarVectores();
    document.querySelector('#exportar-pdf').addEventListener('click', () => {
        generarPdf();
    })
});

const permisosBotones = () => {
    if (guardarInformacion.length === 0) {
        document.querySelector('.btn-agregar').removeAttribute('disabled');
        document.querySelector('.btn-editar').setAttribute('disabled', 'disabled');
        document.querySelector('.btn-eliminar').setAttribute('disabled', 'disabled');
        document.querySelector('.btn-nueva-nomina').setAttribute('disabled', 'disabled');
        document.querySelector('#exportar-pdf').setAttribute('disabled', 'disabled');
    } else {
        document.querySelector('.btn-agregar').setAttribute('disabled', 'disabled');
        document.querySelector('.btn-editar').removeAttribute('disabled');
        document.querySelector('.btn-eliminar').removeAttribute('disabled');
        document.querySelector('.btn-nueva-nomina').removeAttribute('disabled');
        document.querySelector('#exportar-pdf').removeAttribute('disabled');
    }
}

const generarPdf = () => {
    const documentoAConvertir = document.querySelector('#elementos-exportar-pdf');
    html2pdf()
        .set({
            margin: 0.5,
            filename: 'Sistema de Nóminas.pdf',
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

const validarFormulario = (e, accion) => {
    switch (e.target.name) {
        case `txt${accion}Nombre`:
            if (expresiones.nombre.test(e.target.value)) {
                campos['nombre'] = true;
            } else {
                swal("Dato incorrecto!", "El valor introducido en el campo nombre es incorrecto. Intente nuevamente.", "error");
            }
            break;

        case `txt${accion}Apellido`:
            if (expresiones.nombre.test(e.target.value)) {
                campos['apellidos'] = true;
            } else {
                swal("Dato incorrecto!", "El valor introducido en el campo apellido es incorrecto. Intente nuevamente.", "error");
            }
            break;

        case `txt${accion}NumDoc`:
            if (expresiones.telefono.test(parseInt(e.target.value))) {
                campos['numDoc'] = true;
            } else {
                swal("Dato incorrecto!", "El valor introducido en el campo número de documento es incorrecto. Intente nuevamente.", "error");
            }
            break;

        case `txt${accion}DiasTrabajados`:
            if (expresiones.telefono.test(parseInt(e.target.value))) {
                campos['diasTrabajados'] = true;
            } else {
                swal("Dato incorrecto!", "El valor introducido en el campo días trabajados es incorrecto. Intente nuevamente.", "error");
            }
            break;

        case `txt${accion}Sueldo`:
            if (expresiones.telefono.test(parseInt(e.target.value))) {
                campos['sueldo'] = true;
            } else {
                swal("Dato incorrecto!", "El valor introducido en el campo días sueldo es incorrecto. El valor ingresado debe ser un número entero mayor a cero. Intente nuevamente.", "error");
            }
            break;
        /** */
        case `txt${accion}HorasDiurnas`:
            if (expresiones.horas.test(parseInt(e.target.value))) {
                campos['horasDiurnas'] = true;
            } else {
                swal("Dato incorrecto!", "El valor introducido en el campo horas extras diurnas es incorrecto. El valor ingresado debe ser un número entero mayor a cero. Intente nuevamente.", "error");
            }
            break;

        case `txt${accion}HorasNocturnas`:
            if (expresiones.horas.test(parseInt(e.target.value))) {
                campos['horasNocturnas'] = true;
            } else {
                swal("Dato incorrecto!", "El valor introducido en el campo horas extras nocturnas es incorrecto. El valor ingresado debe ser un número entero mayor a cero. Intente nuevamente.", "error");
            }
            break;

        case `txt${accion}HrsDomDiu`:
            if (expresiones.horas.test(parseInt(e.target.value))) {
                campos['horasDominicalesDiur'] = true;
            } else {
                swal("Dato incorrecto!", "El valor introducido en el campo horas extras dominicales diurnas es incorrecto. El valor ingresado debe ser un número entero mayor a cero. Intente nuevamente.", "error");
            }
            break;

        case `txt${accion}HrsDomNoc`:
            if (expresiones.horas.test(parseInt(e.target.value))) {
                campos['horasDominicalesNoc'] = true;
            } else {
                swal("Dato incorrecto!", "El valor introducido en el campo horas extras dominicales nocturnas es incorrecto. El valor ingresado debe ser un número entero mayor a cero. Intente nuevamente.", "error");
            }
            break;

        case `txt${accion}Libranza`:
            if (expresiones.telefono.test(parseInt(e.target.value))) {
                campos['libranza'] = true;
            } else {
                swal("Dato incorrecto!", "El valor introducido en el campo libranza es incorrecto. El valor ingresado debe ser un número entero mayor a cero. Intente nuevamente.", "error");
            }
            break;

        case `txt${accion}EmbargosJ`:
            if (expresiones.telefono.test(parseInt(e.target.value))) {
                campos['embargosJud'] = true;
            } else {
                swal("Dato incorrecto!", "El valor introducido en el campo embargos judiciales es incorrecto. El valor ingresado debe ser un número entero mayor a cero. Intente nuevamente.", "error");
            }
            break;

        case `txt${accion}Sindicatos`:
            if (expresiones.telefono.test(parseInt(e.target.value))) {
                campos['sindicatos'] = true;
            } else {
                swal("Dato incorrecto!", "El valor introducido en el campo aportes a sindicatos es incorrecto. El valor ingresado debe ser un número entero mayor a cero. Intente nuevamente.", "error");
            }
            break;

        case `txt${accion}Deudas`:
            if (expresiones.telefono.test(parseInt(e.target.value))) {
                campos['deudas'] = true;
            } else {
                swal("Dato incorrecto!", "El valor introducido en el campo deudas es incorrecto. El valor ingresado debe ser un número entero mayor a cero. Intente nuevamente.", "error");
            }
            break;

        case `txt${accion}NivelArl`:
            if (expresiones.numerosDeci.test(parseFloat(e.target.value))) {
                campos['nivelArl'] = true;
            } else {
                swal("Dato incorrecto!", "El valor introducido en el campo nivel ARL es incorrecto. El valor ingresado debe ser un número decimal, el número decimal debe estar separado por un puto 0.00056. Intente nuevamente.", "error");
            }
            break;
    }
}

//les vamos a agregar un evento a cada uno de los inputs del formulario
inputs.forEach(input => {
    // input.addEventListener('keyup', validarFormulario)
    input.addEventListener('blur', (e) => validarFormulario(e, 'Regis'));
})

inputsEdit.forEach(input => {
    // input.addEventListener('keyup', validarFormulario)
    input.addEventListener('blur', (e) => validarFormulario(e, 'Edit'));
})

form.addEventListener('submit', e => {
    e.preventDefault();
    fcCargarVectores(null, null, 'Regis');
});

formEdit.addEventListener('submit', e => {
    e.preventDefault();
    guardarInformacion.find(element => {
        if (element.id === parseInt(e.target[0].value)) {
            let i = guardarInformacion.indexOf(element);
            fcCargarVectores(element.id, i, 'Edit');
        }
    });
})

document.querySelectorAll('.btn-crud').forEach(item => {
    item.addEventListener('click', e => {
        btnAccion(e);
    });
});

document.querySelector('.btn-nueva-nomina').addEventListener('click', () => {
    guardarInformacion.forEach(item => informacionNomina.push({ ...item }));
    localStorage.setItem('nomina-antigua', JSON.stringify(informacionNomina));
    guardarInformacion = [];
    localStorage.removeItem('nomina')
    window.location.reload();
})

const fcCargarVectores = (id, index, accion) => {
    const nombre = document.getElementById(`txt${accion}Nombre`);
    let apellido = document.getElementById(`txt${accion}Apellido`);
    const numDoc = document.getElementById(`txt${accion}NumDoc`);
    let diasTrabajados = parseInt(document.getElementById(`txt${accion}DiasTrabajados`).value);
    let sueldo = parseFloat(document.getElementById(`txt${accion}Sueldo`).value);
    /* */
    let comisiones = parseFloat(document.getElementById(`txt${accion}Comisiones`).value);
    let hrsExtDiurnas = parseInt(document.getElementById(`txt${accion}HorasDiurnas`).value);
    let hrsExtNocturnas = parseInt(document.getElementById(`txt${accion}HorasNocturnas`).value);
    let hrsExtDominicalesDiu = parseInt(document.getElementById(`txt${accion}HrsDomDiu`).value);
    let hrsExtDominicalesNoc = parseInt(document.getElementById(`txt${accion}HrsDomNoc`).value);
    let libranzas = parseFloat(document.getElementById(`txt${accion}Libranza`).value);
    let embargosJ = parseFloat(document.getElementById(`txt${accion}EmbargosJ`).value);
    let cuotaSindicatos = parseFloat(document.getElementById(`txt${accion}Sindicatos`).value);
    let deudasEmpleador = parseFloat(document.getElementById(`txt${accion}Deudas`).value);
    let nivelArl = parseFloat(document.getElementById(`txt${accion}NivelArl`).value);

    const minimo = 908526;
    let aTransporte = 106454;
    const uvt = 36308;
    const horaOrdinaria = 3785.53;
    let salario = 0, salud = 0, pension = 0, totalDevengado = 0, totalDescuentos = 0,
        netoAPagar = 0, extrasDiurnas = 0, extrasNocturnas = 0, extrasDomiDiu = 0,
        extrasDomiNoc = 0;
    let saludEmpleador = 0, pensionEmpleador = 0, arlEmpleador = 0, sena = 0, icbf = 0,
        cajaCompensacion = 0, prima = 0, cesantias = 0, inCesantias = 0, vacaciones = 0,
        fondoSolidaridad = 0, retencionFuente = 0;

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
        /*
          * Valores a pagar por el empleado
        */
        /*
          * Devengado 
        */
        salario = ((sueldo / 30) * diasTrabajados);
        aTransporte = sueldo <= 1817052 ? aTransporte : aTransporte = 0;
        extrasDiurnas = ((horaOrdinaria * 1.25) * hrsExtDiurnas);
        extrasNocturnas = ((horaOrdinaria * 1.75) * hrsExtNocturnas);
        extrasDomiDiu = ((horaOrdinaria * 2) * hrsExtDominicalesDiu);
        extrasDomiNoc = ((horaOrdinaria * 2.5) * hrsExtDominicalesNoc);
        totalDevengado = (salario + aTransporte + extrasDiurnas + extrasNocturnas +
            extrasDomiDiu + extrasDomiNoc);
        /*
          *Deducido 
        */
        salud = ((totalDevengado - aTransporte) * 0.04);
        pension = ((totalDevengado - aTransporte) * 0.04);
        //fondo de solidaridad
        if (sueldo > (minimo * 4)) {
            if (sueldo < (minimo * 4)) {
                fondoSolidaridad = 0;
            } else if (sueldo >= (minimo * 4) && sueldo < (minimo * 16)) {
                fondoSolidaridad = (totalDevengado * 1) / 100;
            } else if (sueldo >= (minimo * 16) && sueldo < (minimo * 17)) {
                fondoSolidaridad = (totalDevengado * 1.2) / 100;
            } else if (sueldo >= (minimo * 17) && sueldo < (minimo * 18)) {
                fondoSolidaridad = (totalDevengado * 1.4) / 100;
            } else if (sueldo >= (minimo * 18) && sueldo < (minimo * 19)) {
                fondoSolidaridad = (totalDevengado * 1.8) / 100;
            } else if (sueldo > (minimo * 20)) {
                fondoSolidaridad = (totalDevengado * 2) / 100;
            }
        }

        //retención en la fuente
        if (totalDevengado > (uvt * 0) && totalDevengado <= (uvt * 95)) {
            retencionFuente = 0;
        } else if (totalDevengado > (uvt * 95) && totalDevengado <= (uvt * 150)) {
            retencionFuente = (totalDevengado * 19) / 100;
        } else if (totalDevengado > (uvt * 150) && totalDevengado <= (uvt * 360)) {
            retencionFuente = (totalDevengado * 28) / 100;
        } else if (totalDevengado > (uvt * 360) && totalDevengado <= (uvt * 640)) {
            retencionFuente = (totalDevengado * 33) / 100;
        } else if (totalDevengado > (uvt * 640) && totalDevengado <= (uvt * 945)) {
            retencionFuente = (totalDevengado * 35) / 100;
        } else if (totalDevengado > (uvt * 945 && totalDevengado <= (uvt * 2300))) {
            retencionFuente = (totalDevengado * 37) / 100;
        } else if (totalDevengado > (uvt * 2300)) {
            retencionFuente = (totalDevengado * 39) / 100;
        }
        totalDescuentos = (salud + pension + libranzas + embargosJ + cuotaSindicatos +
            deudasEmpleador + fondoSolidaridad + retencionFuente);
        /*
          * valor neto a pargar al empleado
        */
        netoAPagar = (totalDevengado - totalDescuentos);

        /*
         * Valores a pagar por el empleador
        */
        saludEmpleador = ((totalDevengado - aTransporte) * 0.085);
        pensionEmpleador = ((totalDevengado - aTransporte) * 0.12);
        arlEmpleador = ((totalDevengado - aTransporte) * (nivelArl / 100));
        let totalSeguridadSoc = (saludEmpleador + pensionEmpleador + arlEmpleador);
        /*
         * Aportes parafiscales
        */
        sena = ((totalDevengado - aTransporte) * 0.02);
        icbf = ((totalDevengado - aTransporte) * 0.03);
        cajaCompensacion = ((totalDevengado - aTransporte) * 0.04)
        let totalParafiscales = (sena + icbf + cajaCompensacion);
        /*
          * Prestaciones sociales
        */
        prima = ((totalDevengado * diasTrabajados) / 360)
        cesantias = ((totalDevengado * diasTrabajados) / 360)
        inCesantias = ((cesantias * diasTrabajados * 0.12) / 360);
        vacaciones = ((salario * diasTrabajados) / 720);
        let totalPrestaciones = prima + cesantias + inCesantias + vacaciones;
        /*
          * Total nómina
        */
        let totalApropiaciones = totalSeguridadSoc + totalParafiscales + totalPrestaciones;
        /*
          * Total nómina
        */
        let totalNomina = totalDevengado + totalSeguridadSoc + totalParafiscales + totalPrestaciones;

        if (accion === 'Regis') {
            //crear el objeto que vamos a almacenar
            const valores = {
                id: Date.now(),
                nombre: nombre.value.trim(),
                apellido: apellido.value.trim(),
                numDoc: numDoc.value.trim(),
                diasTrabajados,
                sueldo,
                salario,
                comisiones,
                extrasDiurnas,
                extrasNocturnas,
                extrasDomiDiu,
                extrasDomiNoc,
                aTransporte,
                totalDevengado,
                salud,
                pension,
                libranzas,
                embargosJ,
                cuotaSindicatos,
                deudasEmpleador,
                fondoSolidaridad,
                retencionFuente,
                totalDescuentos,
                netoAPagar,
                saludEmpleador,
                pensionEmpleador,
                arlEmpleador,
                totalSeguridadSoc,
                sena,
                icbf,
                cajaCompensacion,
                totalParafiscales,
                prima,
                cesantias,
                inCesantias,
                vacaciones,
                totalPrestaciones,
                totalApropiaciones,
                totalNomina,
                hrsExtDiurnas,
                hrsExtNocturnas,
                hrsExtDominicalesDiu,
                hrsExtDominicalesNoc,
                nivelArl
            }
            //vamos a insertar los valores dentro del arreglo 
            guardarInformacion.push({ ...valores });
            document.getElementById('editar-empleado').dataset.id = valores.id;
            document.getElementById('eliminar-empleado').dataset.id = valores.id;
            swal("Registro guardado correctamente!", `Se ha hecho el registro correcto de la persona ${valores.nombre} ${valores.apellido} : )`, "success");
            $('#agregar_nomina').modal("hide");//nos derigimos a la modal y lo ocultamos
            form.reset();
            mostrarVectores();
            permisosBotones();
        } else if (accion === 'Edit') {
            //crear el objeto que vamos a almacenar
            const objetoSobreescrito = {
                id: id,
                nombre: nombre.value.trim(),
                apellido: apellido.value.trim(),
                numDoc: numDoc.value.trim(),
                diasTrabajados,
                sueldo,
                salario,
                comisiones,
                extrasDiurnas,
                extrasNocturnas,
                extrasDomiDiu,
                extrasDomiNoc,
                aTransporte,
                totalDevengado,
                salud,
                pension,
                libranzas,
                embargosJ,
                cuotaSindicatos,
                deudasEmpleador,
                fondoSolidaridad,
                retencionFuente,
                totalDescuentos,
                netoAPagar,
                saludEmpleador,
                pensionEmpleador,
                arlEmpleador,
                totalSeguridadSoc,
                sena,
                icbf,
                cajaCompensacion,
                totalParafiscales,
                prima,
                cesantias,
                inCesantias,
                vacaciones,
                totalPrestaciones,
                totalApropiaciones,
                totalNomina,
                hrsExtDiurnas,
                hrsExtNocturnas,
                hrsExtDominicalesDiu,
                hrsExtDominicalesNoc,
                nivelArl
            }
            //vamos a insertar los valores dentro del arreglo 
            if (index !== -1) {
                guardarInformacion.splice(index, 1);
                guardarInformacion.push(objetoSobreescrito);
                swal("Modificación exitosa!", `La información de la persona ${objetoSobreescrito.nombre} ${objetoSobreescrito.apellido} ha sido modificado exitosamente!`, "success");
                $('#editar_nomina').modal("hide");//nos derigimos a la modal y lo ocultamos
                formEdit.reset();
                mostrarVectores();
                permisosBotones();
            }
        } else {
            swal("Error en el servidor!", "Ha ocurrido un error en el servidor. Por favor intente más tarde :(", "error");
        }
    }
}

const mostrarVectores = () => {

    localStorage.setItem('nomina', JSON.stringify(guardarInformacion));
    /*
       * Darle formato de número a moneda
    */
    const formatterPeso = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
    })

    guardarInformacion.forEach(element => {
        //datos personales
        document.querySelector('#nombre-em').innerHTML = `${element.nombre}`
        document.querySelector('#apellidos-em').innerHTML = `${element.apellido}`
        document.querySelector('#numeroDoc-em').innerHTML = `${element.numDoc}`
        document.querySelector('#dias-em').innerHTML = `${element.diasTrabajados}`
        document.querySelector('#sueldo-em').innerHTML = `${formatterPeso.format(element.sueldo)}`

        //devengado
        document.querySelector('#salario').innerHTML = `${formatterPeso.format(element.salario)}`;
        document.querySelector('#comisiones').innerHTML = `${formatterPeso.format(element.comisiones)}`;
        document.querySelector('#hed').innerHTML = `${formatterPeso.format(element.extrasDiurnas)}`;
        document.querySelector('#hen').innerHTML = `${formatterPeso.format(element.extrasNocturnas)}`;
        document.querySelector('#hedd').innerHTML = `${formatterPeso.format(element.extrasDomiDiu)}`;
        document.querySelector('#hedn').innerHTML = `${formatterPeso.format(element.extrasDomiNoc)}`;
        document.querySelector('#aTrasn').innerHTML = `${formatterPeso.format(element.aTransporte)}`;
        document.querySelector('#totalDev').innerHTML = `${formatterPeso.format(element.totalDevengado)}`;

        //deducidos
        document.querySelector('#aporSalud').innerHTML = `${formatterPeso.format(element.salud)}`;
        document.querySelector('#aporPension').innerHTML = `${formatterPeso.format(element.pension)}`;
        document.querySelector('#libranza').innerHTML = `${formatterPeso.format(element.libranzas)}`;
        document.querySelector('#embargos').innerHTML = `${formatterPeso.format(element.embargosJ)}`;
        document.querySelector('#cuotasSindi').innerHTML = `${formatterPeso.format(element.cuotaSindicatos)}`;
        document.querySelector('#deudas').innerHTML = `${formatterPeso.format(element.deudasEmpleador)}`;
        document.querySelector('#total-deducido').innerHTML = `${formatterPeso.format(element.totalDescuentos)}`;
        document.querySelector('#fondo-solidaridad').innerHTML = `${formatterPeso.format(element.fondoSolidaridad)}`;
        document.querySelector('#retencion-fuente').innerHTML = `${formatterPeso.format(element.retencionFuente)}`;

        //valor neto empleador
        document.querySelector('#neto-a-pagar').innerHTML = `${formatterPeso.format(element.netoAPagar)}`;

        //Seguridad social
        document.querySelector('#saludEmpleador').innerHTML = `${formatterPeso.format(element.saludEmpleador)}`;
        document.querySelector('#pensionEmpleador').innerHTML = `${formatterPeso.format(element.pensionEmpleador)}`;
        document.querySelector('#arlEmpleador').innerHTML = `${formatterPeso.format(element.arlEmpleador)}`;
        document.querySelector('#total-seguidad-social').innerHTML = `${formatterPeso.format(element.totalSeguridadSoc)}`;

        //Aportes parafiscales
        document.querySelector('#sena').innerHTML = `${formatterPeso.format(element.sena)}`;
        document.querySelector('#icbf').innerHTML = `${formatterPeso.format(element.icbf)}`;
        document.querySelector('#cajaCompensacion').innerHTML = `${formatterPeso.format(element.cajaCompensacion)}`;
        document.querySelector('#total-parafiscales').innerHTML = `${formatterPeso.format(element.totalParafiscales)}`;

        //Prestacione sociales
        document.querySelector('#prima').innerHTML = `${formatterPeso.format(element.prima)}`;
        document.querySelector('#cesantias').innerHTML = `${formatterPeso.format(element.cesantias)}`;
        document.querySelector('#intCesantias').innerHTML = `${formatterPeso.format(element.inCesantias)}`;
        document.querySelector('#vacaciones').innerHTML = `${formatterPeso.format(element.vacaciones)}`;
        document.querySelector('#total-prestaciones').innerHTML = `${formatterPeso.format(element.totalPrestaciones)}`;

        //total apropiaciones
        document.querySelector('#total-apropiaciones').innerHTML = `${formatterPeso.format(element.totalApropiaciones)}`;

        //total nómina
        document.querySelector('#total-nomina').innerHTML = `${formatterPeso.format(element.totalNomina)}`;

        document.getElementById('txtEditId').value = element.id;
        document.getElementById('editar-empleado').dataset.id = element.id;
        document.getElementById('eliminar-empleado').dataset.id = element.id;

        permisosBotones();
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
                document.getElementById('txtEditId').value = element.id;
                document.getElementById('txtEditNombre').value = element.nombre;
                document.getElementById('txtEditApellido').value = element.apellido;
                document.getElementById('txtEditNumDoc').value = element.numDoc;
                document.getElementById('txtEditDiasTrabajados').value = element.diasTrabajados;
                document.getElementById('txtEditSueldo').value = element.sueldo;
                document.getElementById('txtEditComisiones').value = element.comisiones;
                document.getElementById('txtEditHorasDiurnas').value = element.hrsExtDiurnas;
                document.getElementById('txtEditHorasNocturnas').value = element.hrsExtNocturnas;
                document.getElementById('txtEditHrsDomDiu').value = element.hrsExtDominicalesDiu;
                document.getElementById('txtEditHrsDomNoc').value = element.hrsExtDominicalesNoc;
                document.getElementById('txtEditLibranza').value = element.libranzas;
                document.getElementById('txtEditEmbargosJ').value = element.embargosJ;
                document.getElementById('txtEditSindicatos').value = element.cuotaSindicatos;
                document.getElementById('txtEditDeudas').value = element.deudasEmpleador;
                document.getElementById('txtEditNivelArl').value = element.nivelArl;
            }
        })
    }

    if (e.target.classList.contains('btnEliminar')) {
        guardarInformacion.find(element => {
            if (element.id === parseInt(e.target.dataset.id)) {
                swal({
                    title: `Eliminar empleado ${element.nombre} `,
                    text: `Esta seguro de eliminar el empleado ${element.nombre} `,
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
