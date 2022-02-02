/* Validar Nombre y Apellido*/ 
function validarNomAp(id) {
    var n = document.getElementById(id).value;
    var nom = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s|\-*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g;
    var espacio = " ";
    var guion = "-";
    nfinal = '';
    n = n.trim();

    if (!nom.test(n)) {
        document.getElementById(id).style.border = '2px solid red';
        return false;
    }
    else {
        n = n.toLowerCase();
        nfinal = n.charAt(0).toUpperCase() + n.slice(1);
        if ((n.indexOf(" ") > -1)) {
            nfinal = '';
            ArrayNombre = n.split(espacio);
            for (var i = 0; i < ArrayNombre.length; i++) {
                ArrayNombre[i] = ArrayNombre[i].charAt(0).toUpperCase() + ArrayNombre[i].slice(1);
                nfinal = nfinal + ArrayNombre[i] + espacio;
            }
            nfinal = nfinal.slice(0, -1);
        }
        if ((n.indexOf("-") > -1)) {
            nfinal = '';
            ArrayNombre = n.split(guion);
            for (var i = 0; i < ArrayNombre.length; i++) {

                ArrayNombre[i] = ArrayNombre[i].charAt(0).toUpperCase() + ArrayNombre[i].slice(1);

                nfinal = nfinal + ArrayNombre[i] + guion;
            }
            nfinal = nfinal.slice(0, -1);
        }
        if ((n.indexOf(" ") > -1) && (n.indexOf("-") > -1)) {
            nfinal = '';
            ArrayNombre = n.split(espacio);
            for (var i = 0; i < ArrayNombre.length; i++) {

                ArrayNombre[i] = ArrayNombre[i].charAt(0).toUpperCase() + ArrayNombre[i].slice(1);

                nfinal = nfinal + ArrayNombre[i] + espacio;
            }
            nfinal = nfinal.slice(0, -1);
        }
        document.getElementById(id).style.border = '2px solid green';
        document.getElementById(id).value = nfinal;
        return true;

    }
}
function restriccionPalabras(palabras){
    var Rev_Palabras= /(\W|^)(SELECT|DELETE|CREATE|ALTER|RENAME|INSERT|LOAD|TRUNCATE|DROP|UPDATE|DO|DESCRIBE|USE|TRANSACTION|ROLLBACK|LOCK|UNLOCK|SET|SHOW|JOIN|INNER|FROM|WHERE|TABLES|INTO)(\W|$)/i;
    if(Rev_Palabras.test(palabras)){

    };
    return (Rev_Palabras.test(palabras));
}

/*--------------------------------------*/
/*Validar Run*/
function validarRut(run) {
    // var rutString = document.getElementById(run).value;
    var r = document.getElementById(run).value;
    if (r == '' || r == 0) {
        // document.getElementById(run).style.background  = 'red';
        document.getElementById(run).style.border = '2px solid red';
        return false
    };
    r = r.trim();
    r = r.toLowerCase();
    if ((r.indexOf(" ") > -1) || (r.indexOf(".") > -1) || (r.indexOf("-") > -1) || ((r.indexOf(".") > -1) && (r.indexOf("-") > -1)) || ((r.indexOf(".") > -1) && (r.indexOf("-") > -1) && (r.indexOf(" ") > -1))) {
        r = elimPunGui(r);
    }
    rutString = r;
    if (r.length < 9) {
        r = "0" + r;
    }
    if (r.length > 9) {
        document.getElementById(run).style.border = '2px solid red';
        return false
    };
    rut = r.substr(0, 8);
    dv = r.charAt(r.length - 1);


    let dvs = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", 'k', 'K'];
    var num = /^([0-9]+|[0-9]+[k])*$/
    if (num.test(r)) {

        if (!isNaN(rut)) {
            if (dvs.includes(dv)) {
                let _dv = calculaDv(rut);
                if (dv == _dv) {
                    // document.getElementById(run).style.background  = 'green';
                    document.getElementById(run).style.border = '2px solid green';


                    if (rutString.length < 9) {
                        document.getElementById(run).value = rutString.substr(0, 1) + "." + rutString.substr(1, 3) + "." + rutString.substr(4, 3) + "-" + dv;
                        return true;
                    } else {
                        document.getElementById(run).value = rutString.substr(0, 2) + "." + rutString.substr(2, 3) + "." + rutString.substr(5, 3) + "-" + dv;
                        return true;
                    }
                } else {
                    document.getElementById(run).value = rutString.substr(0, (rutString.length - 1)) + "-" + dv;

                    document.getElementById(run).style.border = '2px solid red';
                    return false;
                }
            } else {
                document.getElementById(run).value = rutString.substr(0, (rutString.length - 1)) + "-" + dv;

                document.getElementById(run).style.border = '2px solid red';
                return false;
            }
        } else {
            document.getElementById(run).value = rutString.substr(0, (rutString.length - 1)) + "-" + dv;

            document.getElementById(run).style.border = '2px solid red';

            return false;
        }
    }
    else {
        document.getElementById(run).value = rutString.substr(0, (rutString.length - 1)) + "-" + dv;

        document.getElementById(run).style.border = '2px solid red';

        return false;
    }
}

function calculaDv(T) {
    var M = 0, S = 1;
    for (; T; T = Math.floor(T / 10)) S = (S + T % 10 * (9 - M++ % 6)) % 11;
    return S ? (S - 1).toString() : 'k';
}

function elimPunGui(n) {


    while (n.toString().indexOf(".") != -1) {
        n = n.toString().replace(".", "");
    }
    while (n.toString().indexOf("-") != -1) {
        n = n.toString().replace("-", "");
    }
    while (n.toString().indexOf(" ") != -1) {
        n = n.toString().replace(" ", "");
    }
    return n;


}


function setRun(run, dv) {
    // console.log(run.length < 8)
    if (run.length < 8) {
        var rut = run.substr(0, 1) + "." + run.substr(1, 3) + "." + run.substr(4, 3) + "-" + dv;
        return rut;
    } else {
        rut = run.substr(0, 2) + "." + run.substr(2, 3) + "." + run.substr(5, 3) + "-" + dv;
        return rut;
    }
}
/*----------------------------------*/
/*Marcas y Modelos , Colores de auto y version movil*/
var marcasYmodelos = {

    "Marcas": [{
            "Marca": "Chevrolet",
            "Modelo": ["Aveo", "Sail"]
    },
        {
            "Marca": "Ferrari",
            "Modelo": ["Ferrari 812", "Ferrari Portofino"]
    },
        {
            "Marca": "Kia",
            "Modelo": ["KIA Niro", "Morning"]
    },
        {
            "Marca": "Susuki",
            "Modelo": ["Suzuki Across", "Suzuki Maruti"]
    },
        {
            "Marca": "Tesla",
            "Modelo": ["Tesla Model 3", "Tesla Model Y"]
    }]
}
let colores = ["Amarillo","Azul","Blanco","Rojo","Verde"];
document.addEventListener("DOMContentLoaded", function() {

    if(screen.width< 993){
        window.location="indexMob.html";

    };

var iMarca = 0;
var htmlMarca = '<option value="sin-Marca">Seleccione Marca</option><option value="sin-Marca">--</option>';
var htmlModelo = '<option value="sin-Modelo">Seleccione Modelo</option><option value="sin-Modelo">--</option>';
var htmlColor = '<option value="sin-Color">Seleccione Color</option><option value="sin-Color">--</option>';

for (let i = 0; i < marcasYmodelos.Marcas.length; i++) {
    htmlMarca = htmlMarca + '<option value="' + marcasYmodelos.Marcas[iMarca].Marca + '">' + marcasYmodelos.Marcas[iMarca].Marca + '</option>';
    iMarca++;
    
}
for (let i = 0; i < colores.length; i++) {
    htmlColor = htmlColor + '<option value="' + colores[i] + '">' + colores[i] + '</option>';
    
}
document.getElementById("color").innerHTML = htmlColor;


document.getElementById('Marcas').innerHTML = htmlMarca;
document.getElementById('Modelo').innerHTML = htmlModelo;

const selectElementMarca = document.getElementById('Marcas');
selectElementMarca.addEventListener('change', (event) => {
    var iMarca = 0;
    const resultado = document.getElementById('Marcas').value;
    var htmlModelo = '<option value="sin-Modelo">Seleccione Modelo</option><option value="sin-Modelo">--</option>';
    for (let i = 0; i < marcasYmodelos.Marcas.length; i++) {
        if (resultado == marcasYmodelos.Marcas[iMarca].Marca) {
            for (let j = 0; j < marcasYmodelos.Marcas[iMarca].Modelo.length; j++) {
                htmlModelo = htmlModelo + '<option value="' + marcasYmodelos.Marcas[iMarca].Modelo[j] + '">' + marcasYmodelos.Marcas[iMarca].Modelo[j] + '</option>';
            }
        }
        iMarca++;
    }
    document.getElementById('Modelo').innerHTML = htmlModelo;

});


});
function validarSelectModelo(id){
    if(document.getElementById(id).value == 'sin-Modelo'){
        document.getElementById(id).style.border = '2px solid red';
    }else{
        document.getElementById(id).style.border = '2px solid green';
    };
}
function validarSelectMarca(id){
    if(document.getElementById(id).value == 'sin-Marca'){
        document.getElementById(id).style.border = '2px solid red';

    }else{
        document.getElementById(id).style.border = '2px solid green';

    };
}
function validarSelectColor(id){
    if(document.getElementById(id).value == 'sin-Color'){
        document.getElementById(id).style.border = '2px solid red';
    }else{
        document.getElementById(id).style.border = '2px solid green';
    };
}
/*-------------------------------------*/ 


/*patentes*/
function revisarPatente(id) {
    var patente = document.getElementById(id).value;
    patente = patente.toUpperCase();
    validar = validarPatente(patente);
    if (validar) {
        document.getElementById(id).value = patente;
        document.getElementById(id).style.border = '2px solid green';
        return true;

    } else {
        document.getElementById(id).style.border = '2px solid red';

        document.getElementById(id).value = patente;

        return false;
    }
}
function validarPatente(patente) {

    Rev_patente_old = /[A-Z]{2}[1-9]{1}[0-9]{3}/;
	Rev_patente_new= /[BCDFGHJKLPRSTVWXYZ]{4}[0-9]{2}/;
    oldPat=Rev_patente_old.test(patente);
    newPat=Rev_patente_new.test(patente);
    if(Rev_patente_old.test(patente) != Rev_patente_new.test(patente)){
        return true;
    }else{
        return false;
    }
}
/*-------------------------------------*/ 
/* validar Campos*/

function validarCampos(){


    

    if(document.getElementById('nombreApellido').style.border!='2px solid green' || document.getElementById('run').style.border!='2px solid green'|| document.getElementById('patente').style.border!='2px solid green' || document.getElementById('color').style.border!='2px solid green' || document.getElementById('Marcas').style.border!='2px solid green' || document.getElementById('Modelo').style.border!='2px solid green'){
        alert('Verifique que todos los campos esten completos y correctos');
        return false;
    }else{
    

        nombreApellido = document.getElementById('nombreApellido').value;
        run = document.getElementById('run').value;
        patente = document.getElementById('patente').value;
        color = document.getElementById('color').value;
        marca = document.getElementById('Marcas').value;
        modelo = document.getElementById('Modelo').value;

        let registro = {
            nombreApellido: nombreApellido,
            run: run,
            patente: patente,
            color: color,
            marca: marca,
            modelo: modelo
        };
        if(localStorage.getItem('registro')){
            var antiguoregistro = localStorage.getItem('registro');
            var registroReciente = JSON.stringify(registro);
            var nuevoRegistro = antiguoregistro+','+registroReciente
            localStorage.setItem("registro", nuevoRegistro);
            limpiarCampos();
        }else{
            localStorage.setItem("registro", JSON.stringify(registro));
            limpiarCampos();
        }
    }
}
function limpiarCampos(){
    alert('Registro exitoso');
    location.reload();
}