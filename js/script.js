function validar(){
    if(document.formulario.nombre.value.length == 0){
        alert("Debe completar el campo nombre");
        return 0;
    }

    if(document.formulario.rut.value.length == 0){
        alert("Debe completar el campo rut");
        validarRut();
        return 0;
    }

    if(document.formulario.razon_social.value.length == 0){
        alert("Debe completar el campo razón social");
        return 0;
    }

    if(document.formulario.email.value.length == 0 && document.formulario.telefono.value.length == 0){
        alert("Debe ingresar al menos un medio de contacto");
        return 0;
    }

    document.formulario.registrar();
}


function validarRut(rut) {
    // Despejar Puntos
    var valor = rut.value.replace('.','');
    // Despejar Guión
    valor = valor.replace('-','');
    
    // Aislar Cuerpo y Dígito Verificador
    cuerpo = valor.slice(0,-1);
    dv = valor.slice(-1).toUpperCase();
    
    // Formatear RUN
    rut.value = cuerpo + '-'+ dv
    
    // Si no cumple con el mínimo ej. (n.nnn.nnn)
    if(cuerpo.length < 7) { rut.setCustomValidity("RUT Incompleto"); return false;}
    
    // Calcular Dígito Verificador
    suma = 0;
    multiplo = 2;
    
    // Para cada dígito del Cuerpo
    for(i=1;i<=cuerpo.length;i++) {
    
        // Obtener su Producto con el Múltiplo Correspondiente
        index = multiplo * valor.charAt(cuerpo.length - i);
        
        // Sumar al Contador General
        suma = suma + index;
        
        // Consolidar Múltiplo dentro del rango [2,7]
        if(multiplo < 7) { multiplo = multiplo + 1; } else { multiplo = 2; }
  
    }
    
    // Calcular Dígito Verificador en base al Módulo 11
    dvEsperado = 11 - (suma % 11);
    
    // Casos Especiales (0 y K)
    dv = (dv == 'K')?10:dv;
    dv = (dv == 0)?11:dv;
    
    // Validar que el Cuerpo coincide con su Dígito Verificador
    if(dvEsperado != dv) { rut.setCustomValidity("RUT Inválido"); return false; }
    
    // Si todo sale bien, eliminar errores (decretar que es válido)
    rut.setCustomValidity('');
}

var arrayGuardar = [];

function registrar (){
    let proveedores = document.getElementsByClassName("datos");
    arrayGuardar.push(proveedores);
    for (var i = 0; i < proveedores.length; i++) {    
        arrayGuardar[i] = proveedores[i].value;
        console.log (proveedores[i].value);     
    }       
}