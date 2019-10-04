

var empleado=[];

function Valida_Rut( Objeto )
{
	var tmpstr = "";
	var intlargo = Objeto.value
	if (intlargo.length> 0)
	{
		crut = Objeto.value
		largo = crut.length;
		if ( largo <2 )
		{
			alert('rut inválido')
			Objeto.focus()
			return false;
		}
		for ( i=0; i <crut.length ; i++ )
		if ( crut.charAt(i) != ' ' && crut.charAt(i) != '.' && crut.charAt(i) != '-' )
		{
			tmpstr = tmpstr + crut.charAt(i);
		}
		rut = tmpstr;
		crut=tmpstr;
		largo = crut.length;
 
		if ( largo> 2 )
			rut = crut.substring(0, largo - 1);
		else
			rut = crut.charAt(0);
 
		dv = crut.charAt(largo-1);
 
		if ( rut == null || dv == null )
		return 0;
 
		var dvr = '0';
		suma = 0;
		mul  = 2;
 
		for (i= rut.length-1 ; i>= 0; i--)
		{
			suma = suma + rut.charAt(i) * mul;
			if (mul == 7)
				mul = 2;
			else
				mul++;
		}
 
		res = suma % 11;
		if (res==1)
			dvr = 'k';
		else if (res==0)
			dvr = '0';
		else
		{
			dvi = 11-res;
			dvr = dvi + "";
		}
 
		if ( dvr != dv.toLowerCase() )
		{
			alert('El Rut Ingresado es Invalido')
			Objeto.focus()
			return false;
		}
		return true;
	}
}


// Solo permite ingresar numeros.
function soloNumeros(e){
  var key = window.Event ? e.which : e.keyCode
  return (key >= 48 && key <= 57)
}



function ingreso(){
    var nom, rut,email,fono,tipo;
    
    if(document.getElementById('cargo').value === "Seleccione"){
        alert("Debe seleccionar un cargo");
    }else
    {
        nom = document.getElementById('txtnom').value;
        rut = document.getElementById('txtrut').value;
        email = document.getElementById('txte').value;
        fono = document.getElementById('txtt').value;
        tipo = document.getElementById('cargo').value;
        empleado.push({"nombre":nom
        ,"rut":rut,
        "email":email,
        "telefono":fono,
        "cargo":tipo});
        document.getElementById("miForm").reset();
        console.log(empleado);
    }
}

function buscar(){
    alert("Hola me voy a modificar jaja saludos ");
    var o = 0;
    for (i=0;i<empleado.length;i++){ 
        if(empleado[i].rut === document.getElementById('txtbuscar').value){
            console.log(empleado[i]);
            document.getElementById('txtnom').value = empleado[i].nombre;
            document.getElementById('txtrut').value = empleado[i].rut;
            document.getElementById('txtrut').disabled = true;
            document.getElementById('txte').value = empleado[i].email;
            document.getElementById('txtt').value = empleado[i].telefono;
            document.getElementById('cargo').value = empleado[i].cargo;
            $('#modalmodificar').modal('hide');
            document.getElementById('btnC').style.display = 'none';
            document.getElementById('btnU').style.display = 'block';
      
            o=o+1;
        }
            
    }
    if(o === 0){
        alert("no se encontro nada");
    }
}

function modificar(){
    for (i=0;i<empleado.length;i++){ 
        if(empleado[i].rut === document.getElementById('txtrut').value){
             
            empleado[i].nombre = document.getElementById('txtnom').value
            empleado[i].email = document.getElementById('txte').value
            document.getElementById('txtrut').disabled = false;
            empleado[i].telefono = document.getElementById('txtt').value
            empleado[i].cargo = document.getElementById('cargo').value
            document.getElementById("miForm").reset();
            document.getElementById('btnC').style.display = 'block';
            document.getElementById('btnU').style.display = 'none';   
        }
    }
    alert("Empleado Modificado");
}

function eliminar(){
    var a = 0;
    
    for (i=0;i<empleado.length;i++){ 

        if(empleado[i].rut === document.getElementById('txteliminar').value){
            
            var r = confirm("Deseas eliminar al empleado: "+empleado[i].nombre + " rut:" +empleado[i].rut);
            if (r == true) {
                alert("boton aceptar");
                empleado.splice(i);
                console.log(empleado);
                $('#modaleliminar').modal('hide');
                document.getElementById('btnC').style.display = 'block';
            document.getElementById('btnU').style.display = 'none';  
            document.getElementById("miForm").reset();
            

            } else {
                return;
                document.getElementById('btnC').style.display = 'block';
            document.getElementById('btnU').style.display = 'none';  

            }
            a = a +1;
        }
    }
    if(a === 0){
        alert("No se encontro empleado");
        $('#modaleliminar').modal('hide');
    }
    
   
}



function listar(){
    
    




    document.getElementById('contenido').innerHTML = null;
    var a = 1;

    for (i=0;i<empleado.length;i++){ 
     
      

        document.getElementById('contenido').innerHTML += `
            <tr >
            <th scope="row">`+a+`</th>
            <td>`+empleado[i].nombre+`</td>
            <td>`+empleado[i].email+`</td>
            <td>`+empleado[i].telefono+`</td>
            <td>`+empleado[i].cargo+`</td>
            </tr>`

            a= a + 1;
    } if(a > 1){
        document.getElementById('formulario').style.display = 'none';  
        document.getElementById('tabla').style.display = 'block';
    }else{
        alert("No hay datos para motrar");
    }
    }

    function volver(){
        document.getElementById('formulario').style.display = 'block';  
        document.getElementById('tabla').style.display = 'none'; 
    }

