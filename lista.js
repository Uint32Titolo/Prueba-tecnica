document.addEventListener("DOMContentLoaded", function() {
    if(localStorage.getItem('registro') && localStorage.getItem('registro') != "0"){
        let registros = '['+localStorage.getItem('registro')+']';
        console.log(JSON.parse(registros));
        jason = JSON.parse(registros);
        console.log(jason.length);
        var table = document.getElementById("listaRegistros");
        if(jason.length < 10){
            for (let i = 0; i < jason.length; i++) {
                var row ='<tr><td>'+jason[i].nombreApellido+'</td><td>'+jason[i].run+'</td><td>'+jason[i].patente+'</td><td>'+jason[i].marca+'</td><td>'+jason[i].modelo+'</td><td>'+jason[i].color+'</td><td><div onclick="eliminarRegistro('+i+')"><i class="fas fa-trash"></i></div></td></tr>';   
                table.innerHTML += row;
            }
        }else{
            // jason.length -10
            for (let i = jason.length - 10 ; i < jason.length; i++) {
                var row ='<tr><td>'+jason[i].nombreApellido+'</td><td>'+jason[i].run+'</td><td>'+jason[i].patente+'</td><td>'+jason[i].marca+'</td><td>'+jason[i].modelo+'</td><td>'+jason[i].color+'</td><td><div onclick="eliminarRegistro('+i+')"><i class="fas fa-trash"></i></div></td></tr>';   
                table.innerHTML += row;
            }
        }
    }else{
        var vacio = document.getElementById("vacio");
        vacio.innerHTML = "No existen registros de vehículos";
    }
});


function eliminarRegistro(i){
    jason.splice(i, 1);
    jasonText = JSON.stringify(jason);
    while (jasonText.toString().indexOf("[") != -1) {
        jasonText = jasonText.toString().replace("[", "");
    }
    while (jasonText.toString().indexOf("]") != -1) {
        jasonText = jasonText.toString().replace("]", "");
    }
    localStorage.setItem('registro', jasonText);
    location.reload();
}
