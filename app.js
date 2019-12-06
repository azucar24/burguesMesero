// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
  apiKey: "AIzaSyCZTfcGWvoLhtGWKm1JIxb-_wWCVipxiDo",
  authDomain: "reservacion-bc34e.firebaseapp.com",
  projectId: "reservacion-bc34e"
});

var db = firebase.firestore();

/*==================================================================================================================
     Capturar la fecha actual
====================================================================================================================*/		
	var dt = new Date();
	var month = dt.getMonth() + 1;
	var mes = "";
	if(month == 1 || month == 2 || month == 3 || month == 4 || month == 5 || month == 6 || month == 7 || month == 8 || month == 9){
		mes = "0" + month;
	}else{
		mes = month;
	}
	var day = dt.getDate();
	var year = dt.getFullYear();
	var fecha_formato = year + "-" + mes + "-" + day
	console.log(fecha_formato);

/*==================================================================================================================
     Capturar la hora actual
====================================================================================================================*/
	var hora = dt.getHours();
	var minutos = dt.getMinutes();
	var segundos = dt.getSeconds();
	var hora_formato = hora + ":" + minutos + ":" + segundos;
	console.log(hora_formato);
/*===============================================================================================================================

	Metodos para Guardar

===============================================================================================================================*/
function guardar_reservacion(){
	var responsable = document.getElementById('responsable').value;
	var fecha = document.getElementById('fecha').value;
	var hora = document.getElementById('hora').value;
	var telefono = document.getElementById('telefono').value;
	var cant_personas = document.getElementById('cant_personas').value;
	var zona = document.getElementById('zona').value;
	var estado = "ep";
	
	db.collection("Reservaciones").add({
        responsable: responsable,
        fecha: fecha,
        hora: hora,
        telefono: telefono,
        cant_personas: cant_personas,
        zona: zona,
        estado: estado,
    })
    .then(function (docRef) {
       	console.log("Document written with ID: ", docRef.id);
        responsable = document.getElementById('responsable').value;
		fecha = document.getElementById('fecha').value;
		hora = document.getElementById('hora').value;
		telefono = document.getElementById('telefono').value;
		cant_personas = document.getElementById('cant_personas').value;
		zona = document.getElementById('zona').value;
        alert(" Registro Exitosamente!!");
    })
    .catch(function (error) {
        console.error("Error adding document: ", error);
    });

}

function guardar_orden(){
	var plato1 = "";
	var plato2 = "";
	var plato3 = "";
	var plato4 = "";
	var plato5 = "";
	var cant_plato1 = 0;
	var cant_plato2 = 0;
	var cant_plato3 = 0;
	var cant_plato4 = 0;
	var cant_plato5 = 0;
	var extras = document.getElementById('extras').value;
	var name_mesa = document.getElementById('mesa').value;
	var responsable_mesa = document.getElementById("responsable_mesa").value;
	if(orden1 == "" && orden2 == "" && orden3 == "" && orden4 == "" && orden5 == ""){
		alert("No hay platillos que guardar");
	}else{
		if(orden1 != ""){
			plato1 = orden1;
			cant_plato1 = cant_orden1;
		}
		if(orden2 != ""){
			plato2 = orden2;
			cant_plato2 = cant_orden2;
		}
		if(orden3 != ""){
			plato3 = orden3;
			cant_plato3 = cant_orden3;
		}
		if(orden4 != ""){
			plato4 = orden4;
			cant_plato4 = cant_orden4;
		}
		if(orden5 != ""){
			plato5 = orden5;
			cant_plato5 = cant_orden5;
		}
	}
	
	db.collection("Ordenes").add({
        platillo1: plato1,
        cant_platillo1: cant_plato1,
        platillo2: plato2,
        cant_platillo2: cant_plato2,
        platillo3: plato3,
        cant_platillo3: cant_plato3,
        platillo4: plato4,
        cant_platillo4: cant_plato4,
        platillo5: plato5,
        cant_platillo5: cant_plato5,
        extra: extras,
        mesa: name_mesa,
        fecha: fecha_formato,
        hora: hora_formato,
        responsable: responsable_mesa,
        estado: "pendiente",

         
    })
    .then(function (docRef) {
       	console.log("Document written with ID: ", docRef.id);
        ordenes.innerHTML = "";
		document.getElementById('extras').value = "";
		document.getElementById('mesa').value = "";
		document.getElementById('responsable_mesa').value = "";
        alert(" Registro Exitosamente!!");
    })
    .catch(function (error) {
        console.error("Error adding document: ", error);
    });

}

/*==============================================================================================================================
	Generacion de pedidos y captura de los platos que el cliente quiere.
==============================================================================================================================*/
var orden1 = ""; 
var orden2 = "";
var orden3 = "";
var orden4 = "";
var orden5 = "";
var cant_orden1 = 0;
var cant_orden2 = 0;
var cant_orden3 = 0;
var cant_orden4 = 0; 
var cant_orden5 = 0;

//Id donde mostraremos los pedidos actuales------------------------------------------------------------------------------------
var ordenes;
function guardar_plato(){
	ordenes = document.getElementById("ordenes");
	ordenes.innerHTML = "";
	var platillo = document.getElementById("name_platillo").value;
	var cant_platillo = document.getElementById("cant_platillo").value;

	if(platillo != "" && cant_platillo != ""){
		if(cant_platillo == "0"){
			alert("Cantidad invalida (0)");
		}else{
			var num_platillo = parseInt(cant_platillo);
			if(platillo == orden1){
				cant_orden1 = cant_orden1 + num_platillo;
				alert("1");
				document.getElementById("cant_platillo").value = "";
			}else if(platillo == orden2){
				cant_orden2 = cant_orden2 + num_platillo;
				alert("2");
				document.getElementById("cant_platillo").value = "";
			}else if(platillo == orden3){
				cant_orden3 = cant_orden3 + num_platillo;
				alert("3");
				document.getElementById("cant_platillo").value = "";
			}else if(platillo == orden4){
				cant_orden4 = cant_orden4 + num_platillo;
				alert("4");
				document.getElementById("cant_platillo").value = "";
			}else if(platillo == orden5){
				cant_orden5 = cant_orden5 + num_platillo;
				alert("5");
				document.getElementById("cant_platillo").value = "";
			}else if(orden1 == "" && cant_orden1 == "") {
				orden1 = platillo;
				cant_orden1 = num_platillo;
				alert("6");
				document.getElementById("cant_platillo").value = "";
			}else if(orden2 == "" && cant_orden2 == ""){
				orden2 = platillo;
				cant_orden2 = num_platillo;
				alert("7");
				document.getElementById("cant_platillo").value = "";
			}else if(orden3 == "" && cant_orden3 == ""){
				orden3 = platillo;
				cant_orden3 = num_platillo;
				alert("8");
				document.getElementById("cant_platillo").value = "";
			}else if(orden4 == "" && cant_orden4 == ""){
				orden4 = platillo;
				cant_orden4 = num_platillo;
				alert("9");
				document.getElementById("cant_platillo").value = "";
			}else if(orden5 == "" && cant_orden5 == ""){
				orden5 = platillo;
				cant_orden5 = num_platillo;
				alert("10");
				document.getElementById("cant_platillo").value = "";
			}
		}
		
	}
	console.log(orden1);
	console.log(cant_orden1);
	console.log(orden2);
	console.log(cant_orden2);
	console.log(orden3);
	console.log(cant_orden3);
	console.log(orden4);
	console.log(cant_orden4);
	console.log(orden5);
	console.log(cant_orden5);
	ordenes.innerHTML = "";
	if(orden1 != "" && orden2 != "" && orden3 != "" && orden4 != "" && orden5 != ""){
		document.getElementById("select_platillos").disabled = true;
		console.log("Esta bloqueado");
	}else if(orden1 == "" || orden2 == "" || orden3 == "" || orden4 == "" || orden5 == ""){
		document.getElementById("select_platillos").disabled = false;
		console.log("Esta desbloqueado");
	}
	if(orden1 != ""){
		ordenes.innerHTML +=`
			<div class="input-group">
				<p class="input-group-addon" style="text-align: justify; font-size: 18px;">
					Platillo 1: <b>${orden1}</b><br>
					Cantidad: <b>${cant_orden1}</b><br>
				</p>
				<p class="input-group-addon">
					<button onclick="delete_platillo('${orden1}')" type="button" class="btn btn-danger">Eliminar</button>
				</p>
			</div>
			
		`;
		if(orden2 != ""){
			ordenes.innerHTML +=`
				<div class="input-group">
					<p class="input-group-addon" style="text-align: justify; font-size: 18px;">
						Platillo 2: <b>${orden2}</b><br>
						Cantidad: <b>${cant_orden2}</b><br>
					</p>
					<p class="input-group-addon">
					<button onclick="delete_platillo('${orden2}')" type="button" class="btn btn-danger">Eliminar</button>
				</p>
				</div>
			`;
		}
		if(orden3 != ""){
			ordenes.innerHTML +=`
				<div class="input-group">
					<p class="input-group-addon" style="text-align: justify; font-size: 18px;">
						Platillo 3: <b>${orden3}</b><br>
						Cantidad: <b>${cant_orden3}</b><br>
					</p>
					<p class="input-group-addon">
						<button onclick="delete_platillo('${orden3}')" type="button" class="btn btn-danger">Eliminar</button>
					</p>
				</div>
			`;
		}
		if(orden4 != ""){
			ordenes.innerHTML +=`
				<div class="input-group">
					<p class="input-group-addon" style="text-align: justify; font-size: 18px;">
						Platillo 4: <b>${orden4}</b><br>
						Cantidad: <b>${cant_orden4}</b><br>
					</p>
					<p class="input-group-addon">
						<button onclick="delete_platillo('${orden4}')" type="button" class="btn btn-danger">Eliminar</button>
					</p>
				</div>
			`;
		}
		if(orden5 != ""){
			ordenes.innerHTML +=`
				<div class="input-group">
					<p class="input-group-addon" style="text-align: justify; font-size: 18px;">
						Platillo 5: <b>${orden5}</b><br>
						Cantidad: <b>${cant_orden5}</b><br>
					</p>
					<p class="input-group-addon">
						<button onclick="delete_platillo('${orden5}')" type="button" class="btn btn-danger">Eliminar</button>
					</p>
				</div>
			`;
		}
	}else if(orden2 != ""){
		ordenes.innerHTML +=`
			<div class="input-group">
				<p class="input-group-addon" style="text-align: justify; font-size: 18px;">
					Platillo 1: <b>${orden2}</b><br>
					Cantidad: <b>${cant_orden2}</b><br>
				</p>
				<p class="input-group-addon">
					<button onclick="delete_platillo('${orden2}')" type="button" class="btn btn-danger">Eliminar</button>
				</p>
			</div>
			
		`;
		if(orden1 != ""){
			ordenes.innerHTML +=`
				<div class="input-group">
					<p class="input-group-addon" style="text-align: justify; font-size: 18px;">
						Platillo 2: <b>${orden1}</b><br>
						Cantidad: <b>${cant_orden1}</b><br>
					</p>
					<p class="input-group-addon">
					<button onclick="delete_platillo('${orden1}')" type="button" class="btn btn-danger">Eliminar</button>
				</p>
				</div>
			`;
		}
		if(orden3 != ""){
			ordenes.innerHTML +=`
				<div class="input-group">
					<p class="input-group-addon" style="text-align: justify; font-size: 18px;">
						Platillo 3: <b>${orden3}</b><br>
						Cantidad: <b>${cant_orden3}</b><br>
					</p>
					<p class="input-group-addon">
						<button onclick="delete_platillo('${orden3}')" type="button" class="btn btn-danger">Eliminar</button>
					</p>
				</div>
			`;
		}
		if(orden4 != ""){
			ordenes.innerHTML +=`
				<div class="input-group">
					<p class="input-group-addon" style="text-align: justify; font-size: 18px;">
						Platillo 4: <b>${orden4}</b><br>
						Cantidad: <b>${cant_orden4}</b><br>
					</p>
					<p class="input-group-addon">
						<button onclick="delete_platillo('${orden4}')" type="button" class="btn btn-danger">Eliminar</button>
					</p>
				</div>
			`;
		}
		if(orden5 != ""){
			ordenes.innerHTML +=`
				<div class="input-group">
					<p class="input-group-addon" style="text-align: justify; font-size: 18px;">
						Platillo 5: <b>${orden5}</b><br>
						Cantidad: <b>${cant_orden5}</b><br>
					</p>
					<p class="input-group-addon">
						<button onclick="delete_platillo('${orden5}')" type="button" class="btn btn-danger">Eliminar</button>
					</p>
				</div>
			`;
		}
	}else if(orden3 != ""){
		ordenes.innerHTML +=`
			<div class="input-group">
				<p class="input-group-addon" style="text-align: justify; font-size: 18px;">
					Platillo 1: <b>${orden3}</b><br>
					Cantidad: <b>${cant_orden3}</b><br>
				</p>
				<p class="input-group-addon">
					<button onclick="delete_platillo('${orden3}')" type="button" class="btn btn-danger">Eliminar</button>
				</p>
			</div>
			
		`;
		if(orden1 != ""){
			ordenes.innerHTML +=`
				<div class="input-group">
					<p class="input-group-addon" style="text-align: justify; font-size: 18px;">
						Platillo 2: <b>${orden1}</b><br>
						Cantidad: <b>${cant_orden1}</b><br>
					</p>
					<p class="input-group-addon">
					<button onclick="delete_platillo('${orden1}')" type="button" class="btn btn-danger">Eliminar</button>
				</p>
				</div>
			`;
		}
		if(orden2 != ""){
			ordenes.innerHTML +=`
				<div class="input-group">
					<p class="input-group-addon" style="text-align: justify; font-size: 18px;">
						Platillo 3: <b>${orden2}</b><br>
						Cantidad: <b>${cant_orden2}</b><br>
					</p>
					<p class="input-group-addon">
						<button onclick="delete_platillo('${orden2}')" type="button" class="btn btn-danger">Eliminar</button>
					</p>
				</div>
			`;
		}
		if(orden4 != ""){
			ordenes.innerHTML +=`
				<div class="input-group">
					<p class="input-group-addon" style="text-align: justify; font-size: 18px;">
						Platillo 4: <b>${orden4}</b><br>
						Cantidad: <b>${cant_orden4}</b><br>
					</p>
					<p class="input-group-addon">
						<button onclick="delete_platillo('${orden4}')" type="button" class="btn btn-danger">Eliminar</button>
					</p>
				</div>
			`;
		}
		if(orden5 != ""){
			ordenes.innerHTML +=`
				<div class="input-group">
					<p class="input-group-addon" style="text-align: justify; font-size: 18px;">
						Platillo 5: <b>${orden5}</b><br>
						Cantidad: <b>${cant_orden5}</b><br>
					</p>
					<p class="input-group-addon">
						<button onclick="delete_platillo('${orden5}')" type="button" class="btn btn-danger">Eliminar</button>
					</p>
				</div>
			`;
		}
	}else if(orden4 != ""){
		ordenes.innerHTML +=`
			<div class="input-group">
				<p class="input-group-addon" style="text-align: justify; font-size: 18px;">
					Platillo 1: <b>${orden4}</b><br>
					Cantidad: <b>${cant_orden4}</b><br>
				</p>
				<p class="input-group-addon">
					<button onclick="delete_platillo('${orden4}')" type="button" class="btn btn-danger">Eliminar</button>
				</p>
			</div>
			
		`;
		if(orden1 != ""){
			ordenes.innerHTML +=`
				<div class="input-group">
					<p class="input-group-addon" style="text-align: justify; font-size: 18px;">
						Platillo 2: <b>${orden1}</b><br>
						Cantidad: <b>${cant_orden1}</b><br>
					</p>
					<p class="input-group-addon">
					<button onclick="delete_platillo('${orden1}')" type="button" class="btn btn-danger">Eliminar</button>
				</p>
				</div>
			`;
		}
		if(orden2 != ""){
			ordenes.innerHTML +=`
				<div class="input-group">
					<p class="input-group-addon" style="text-align: justify; font-size: 18px;">
						Platillo 3: <b>${orden2}</b><br>
						Cantidad: <b>${cant_orden2}</b><br>
					</p>
					<p class="input-group-addon">
						<button onclick="delete_platillo('${orden2}')" type="button" class="btn btn-danger">Eliminar</button>
					</p>
				</div>
			`;
		}
		if(orden3 != ""){
			ordenes.innerHTML +=`
				<div class="input-group">
					<p class="input-group-addon" style="text-align: justify; font-size: 18px;">
						Platillo 4: <b>${orden3}</b><br>
						Cantidad: <b>${cant_orden3}</b><br>
					</p>
					<p class="input-group-addon">
						<button onclick="delete_platillo('${orden3}')" type="button" class="btn btn-danger">Eliminar</button>
					</p>
				</div>
			`;
		}
		if(orden5 != ""){
			ordenes.innerHTML +=`
				<div class="input-group">
					<p class="input-group-addon" style="text-align: justify; font-size: 18px;">
						Platillo 5: <b>${orden5}</b><br>
						Cantidad: <b>${cant_orden5}</b><br>
					</p>
					<p class="input-group-addon">
						<button onclick="delete_platillo('${orden5}')" type="button" class="btn btn-danger">Eliminar</button>
					</p>
				</div>
			`;
		}
	}else if(orden5 != ""){
		ordenes.innerHTML +=`
			<div class="input-group">
				<p class="input-group-addon" style="text-align: justify; font-size: 18px;">
					Platillo 1: <b>${orden5}</b><br>
					Cantidad: <b>${cant_orden5}</b><br>
				</p>
				<p class="input-group-addon">
					<button onclick="delete_platillo('${orden5}')" type="button" class="btn btn-danger">Eliminar</button>
				</p>
			</div>
			
		`;
		if(orden1 != ""){
			ordenes.innerHTML +=`
				<div class="input-group">
					<p class="input-group-addon" style="text-align: justify; font-size: 18px;">
						Platillo 2: <b>${orden1}</b><br>
						Cantidad: <b>${cant_orden1}</b><br>
					</p>
					<p class="input-group-addon">
					<button onclick="delete_platillo('${orden1}')" type="button" class="btn btn-danger">Eliminar</button>
				</p>
				</div>
			`;
		}
		if(orden2 != ""){
			ordenes.innerHTML +=`
				<div class="input-group">
					<p class="input-group-addon" style="text-align: justify; font-size: 18px;">
						Platillo 3: <b>${orden2}</b><br>
						Cantidad: <b>${cant_orden2}</b><br>
					</p>
					<p class="input-group-addon">
						<button onclick="delete_platillo('${orden2}')" type="button" class="btn btn-danger">Eliminar</button>
					</p>
				</div>
			`;
		}
		if(orden3 != ""){
			ordenes.innerHTML +=`
				<div class="input-group">
					<p class="input-group-addon" style="text-align: justify; font-size: 18px;">
						Platillo 4: <b>${orden3}</b><br>
						Cantidad: <b>${cant_orden3}</b><br>
					</p>
					<p class="input-group-addon">
						<button onclick="delete_platillo('${orden3}')" type="button" class="btn btn-danger">Eliminar</button>
					</p>
				</div>
			`;
		}
		if(orden4 != ""){
			ordenes.innerHTML +=`
				<div class="input-group">
					<p class="input-group-addon" style="text-align: justify; font-size: 18px;">
						Platillo 5: <b>${orden4}</b><br>
						Cantidad: <b>${cant_orden4}</b><br>
					</p>
					<p class="input-group-addon">
						<button onclick="delete_platillo('${orden4}')" type="button" class="btn btn-danger">Eliminar</button>
					</p>
				</div>
			`;
		}
	}else{
		alert("Ya has seleccionado el maximo de platillos(5)");
	}


}


/*===============================================================================================================================

	Metodos para listar

===============================================================================================================================*/
//Listar reservaciones
var section = document.getElementById("panelitos");
var conta_reservaciones = 0;
var hora = "";
var section_ordenes_hechas;
	db.collection("Reservaciones").onSnapshot((querySnapshot) => {
		section.innerHTML = "";
	    querySnapshot.forEach((doc) => {
	        //console.log(`${doc.id} => ${doc.data().responsable}`);

	    	if(doc.data().fecha == fecha_formato){
	    		if(doc.data().estado == "asistio"){
	    			section.innerHTML +=`	
			           	<div class="col-md-4">
				            <div class="panel panel-primary">
				                <div class="panel-heading">${doc.data().responsable}
				                    <span class="pull-right clickable panel-toggle"><em class="fa fa-toggle-up"></em></span></div>
				                <div class="panel-body">
				                    <p style="font-size:18px;"><b>Telefono: ${doc.data().telefono}</b></p>
				                    <p style="font-size:18px;"><b>Personas: ${doc.data().cant_personas}</b></p>
				                    <p style="font-size:18px;"><b>Fecha: ${doc.data().fecha}</b></p>
				                    <p style="font-size:18px;"><b>Hora: ${doc.data().hora}</b></p>
				                    <center>
					                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal_options${conta_reservaciones}">
										  Opciones
										</button>
										<!-- MODAL -->
										<div class="modal fade" id="exampleModal_options${conta_reservaciones}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
										  <div class="modal-dialog" role="document">
										    <div class="modal-content">
										      <div class="modal-header">
										        <h5 class="modal-title" id="exampleModalLabel">Opciones</h5>
										        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
										          <span aria-hidden="true">&times;</span>
										        </button>
										      </div>
										      <div class="modal-body">
										        <button onclick="set_mesa_cliente('${doc.data().zona}', '${doc.data().responsable}')" type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal_tomarOrden">
								                  Tomar Orden
								                </button>
								              </div>
										      <div class="modal-footer">
										        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
										      </div>
										    </div>
										  </div>
										</div>
									</center>
				                </div>
				                <div class="panel-footer foot"><center><p style="font-size:18px;"><b>${doc.data().zona}</b></p></center></div>
				            </div>
				        </div>

			        `
	    		}else if(doc.data().estado == "ep"){
	    			section.innerHTML +=`	
			           	<div class="col-md-4">
				            <div class="panel panel-primary">
				                <div class="panel-heading">${doc.data().responsable}
				                    <span class="pull-right clickable panel-toggle"><em class="fa fa-toggle-up"></em></span></div>
				                <div class="panel-body">
				                    <p style="font-size:18px;"><b>Telefono: ${doc.data().telefono}</b></p>
				                    <p style="font-size:18px;"><b>Personas: ${doc.data().cant_personas}</b></p>
				                    <p style="font-size:18px;"><b>Fecha: ${doc.data().fecha}</b></p>
				                    <p style="font-size:18px;"><b>Hora: ${doc.data().hora}</b></p>
				                    <center>
					                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal_options${conta_reservaciones}">
										  Opciones
										</button>
										<!-- MODAL -->
										<div class="modal fade" id="exampleModal_options${conta_reservaciones}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
										  <div class="modal-dialog" role="document">
										    <div class="modal-content">
										      <div class="modal-header">
										        <h5 class="modal-title" id="exampleModalLabel">Opciones</h5>
										        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
										          <span aria-hidden="true">&times;</span>
										        </button>
										      </div>
										      <div class="modal-body">
										        <button onclick="marcar_asistencia('${doc.id}')" type="button" class="btn btn-success" data-dismiss="modal">Asistencia</button>
										        <button onclick="marcar_inasistencia('${doc.id}')" type="button" class="btn btn-danger" data-dismiss="modal">Inasistencia</button>
										      </div>
										      <div class="modal-footer">
										        <button id="close_modal" type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
										      </div>
										    </div>
										  </div>
										</div>
									</center>
				                </div>
				                <div class="panel-footer foot"><center><p style="font-size:18px;"><b>${doc.data().zona}</b></p></center></div>
				            </div>
				        </div> 
			        `
	    		}
	        }
	        conta_reservaciones++;
	    });
	});
//Buscar reservaciones
function buscar(){
	//Busqueda de reservaciones
	var parametro = document.getElementById("busqueda").value;
	var id = "";
	if(parametro == ""){
		alert("Parametro vacio");
	}else{
	    var encontrados = document.getElementById("encontrados");
		db.collection("Reservaciones").onSnapshot((querySnapshot) => {
			encontrados.innerHTML = "";
			panelitos.innerHTML = "";
			querySnapshot.forEach((doc1) => {
			    //console.log(`${doc.id} => ${doc.data().responsable}`);
			    if(doc1.data().responsable == parametro && doc1.data().fecha == fecha_formato){
					encontrados.innerHTML +=`	
					    <div class="col-md-4">
						    <div class="panel panel-primary">
						        <div class="panel-heading">${doc1.data().responsable}
						            <span class="pull-right clickable panel-toggle"><em class="fa fa-toggle-up"></em></span></div>
						           	<div class="panel-body">
						               <p style="font-size:18px;"><b>Telefono: ${doc1.data().telefono}</b></p>
						               <p style="font-size:18px;"><b>Personas: ${doc1.data().cant_personas}</b></p>
						               <p style="font-size:18px;"><b>Fecha: ${doc1.data().fecha}</b></p>
						               <p style="font-size:18px;"><b>Hora: ${doc1.data().hora}</b></p>
						        	</div>
						           <div class="panel-footer foot"><center><p style="font-size:18px;"><b>${doc1.data().zona}</b></p></center>
						           </div>
						        </div>
						    </div>
						</div>
					`
				}else if(doc1.data().telefono == parametro){
					encontrados.innerHTML +=`	
					    <div class="col-md-4">
						    <div class="panel panel-primary">
						        <div class="panel-heading">${doc1.data().responsable}
						            <span class="pull-right clickable panel-toggle"><em class="fa fa-toggle-up"></em></span></div>
						           	<div class="panel-body">
						               <p style="font-size:18px;"><b>Telefono: ${doc1.data().telefono}</b></p>
						               <p style="font-size:18px;"><b>Personas: ${doc1.data().cant_personas}</b></p>
						               <p style="font-size:18px;"><b>Fecha: ${doc1.data().fecha}</b></p>
						               <p style="font-size:18px;"><b>Hora: ${doc1.data().hora}</b></p>
						        	</div>
						           <div class="panel-footer foot"><center><p style="font-size:18px;"><b>${doc1.data().zona}</b></p></center>
						           </div>
						        </div>
						    </div>
						</div>
					`
				}
			});
		});
	}
}

//Listar menu
var menus = document.getElementById("menus");
var count_platillos = 0;
	db.collection("menus").onSnapshot((querySnapshot) => {
		menus.innerHTML = "";
	    querySnapshot.forEach((doc) => {
	        //console.log(`${doc.id} => ${doc.data().responsable}`);
			menus.innerHTML +=`	
		    	<tr>
		    		<td>${doc.data().nombre}</td>
		    		<td>
		    			
                            <button onclick="listar_plat_select('${doc.data().nombre}')" type="button" class="btn btn-success" data-toggle="modal" data-target="#exampleModal_canti_platillo">
                                Select
                            </button>
                        
		    		</td>
		    	</tr>	
		    `
		    //document.getElementById("name_platillo").value = doc.data().nombre;
	    });
	});
	function listar_plat_select(nombre){
		document.getElementById("name_platillo").value = nombre;
	}

//Listar Ordenes
var cuenta_ordenes = 0;
var ordenes_view = document.getElementById("ordenes_view");
var plat1 = "";
var plat2 = "";
var plat3 = "";
var plat4 = "";
var plat5 = "";
var cant_plat1 = "";
var cant_plat2 = "";
var cant_plat3 = "";
var cant_plat4 = "";
var cant_plat5 = "";
var pantalla;
var timer;

	db.collection("Ordenes").onSnapshot((querySnapshot) => {
		ordenes_view.innerHTML = "";
	    querySnapshot.forEach((doc) => {
	        //console.log(`${doc.id} => ${doc.data().responsable}`);
	        if(doc.data().fecha == fecha_formato){
	        	if(doc.data().estado == "pendiente"){
	        		
					if(doc.data().platillo1 != ""){
	        			plat1 = doc.data().platillo1;
	        		}
	        		if(doc.data().cant_platillo1 != ""){
	        			cant_plat1 = "(" + doc.data().cant_platillo1 + ")";
	        		}
	        		if(doc.data().platillo2 != ""){
	        			plat2 = doc.data().platillo2;
	        		}
	        		if(doc.data().cant_platillo2 != ""){
	        			cant_plat2 = "(" + doc.data().cant_platillo2 + ")";
	        		}
	        		if(doc.data().platillo3 != ""){
	        			plat3 = doc.data().platillo3;
	        		}
	        		if(doc.data().cant_platillo3 != ""){
	        			cant_plat3 = "(" + doc.data().cant_platillo3 + ")";
	        		}
	        		if(doc.data().platillo4 != ""){
	        			plat4 = doc.data().platillo4;
	        		}
	        		if(doc.data().cant_platillo4 != ""){
	        			cant_plat4 = "(" + doc.data().cant_platillo4 + ")";
	        		}
	        		if(doc.data().platillo5 != ""){
	        			plat5 = doc.data().platillo5;
	        		}
	        		if(doc.data().cant_platillo5 != ""){
	        			cant_plat5 = "(" + doc.data().cant_platillo5 + ")";
	        		}

	        		ordenes_view.innerHTML +=`	
		    			<div class="col-md-4">
			                <div class="panel panel-warning">
			                    <div class="panel-heading">En proceso
			                        <span class="pull-right clickable panel-toggle"><em class="fa fa-toggle-up"></em></span></div>
			                    <div class="panel-body">
			                        <p style="font-size:18px;"><b>Orden:</b></p>
			                        <p style="font-size:17px;"><b>${plat1} ${cant_plat1}</b></p>
			                        <p style="font-size:17px;"><b>${plat2} ${cant_plat2}</b></p>
			                        <p style="font-size:17px;"><b>${plat3} ${cant_plat3}</b></p>
			                        <p style="font-size:17px;"><b>${plat4} ${cant_plat4}</b></p>
			                        <p style="font-size:17px;"><b>${plat5} ${cant_plat5}</b></p>
			                    </div>
			                    <div class="panel-footer foot-process">
				                    <center>
				                    	<p style="font-size:17px;"><b>${doc.data().mesa}</b></p>
				                    	<div class="chronometer">
				                    	</div>
				                    </center>
								</div>
			                </div>
			            </div>
		    		`

				}else if(doc.data().estado == "cocinado"){
	        		if(doc.data().platillo1 != ""){
	        			plat1 = doc.data().platillo1;
	        		}
	        		if(doc.data().cant_platillo1 != ""){
	        			cant_plat1 = "(" + doc.data().cant_platillo1 + ")";
	        		}
	        		if(doc.data().platillo2 != ""){
	        			plat2 = doc.data().platillo2;
	        		}
	        		if(doc.data().cant_platillo2 != ""){
	        			cant_plat2 = "(" + doc.data().cant_platillo2 + ")";
	        		}
	        		if(doc.data().platillo3 != ""){
	        			plat3 = doc.data().platillo3;
	        		}
	        		if(doc.data().cant_platillo3 != ""){
	        			cant_plat3 = "(" + doc.data().cant_platillo3 + ")";
	        		}
	        		if(doc.data().platillo4 != ""){
	        			plat4 = doc.data().platillo4;
	        		}
	        		if(doc.data().cant_platillo4 != ""){
	        			cant_plat4 = "(" + doc.data().cant_platillo4 + ")";
	        		}
	        		if(doc.data().platillo5 != ""){
	        			plat5 = doc.data().platillo5;
	        		}
	        		if(doc.data().cant_platillo5 != ""){
	        			cant_plat5 = "(" + doc.data().cant_platillo5 + ")";
	        		}
	        		ordenes_view.innerHTML +=`	
		    			<div class="col-md-4">
			                <div class="panel panel-success">
			                    <div class="panel-heading"><b>Orden Lista!</b>
			                        <span class="pull-right clickable panel-toggle"><em class="fa fa-toggle-up"></em></span></div>
			                    <div class="panel-body">
			                    	<p style="font-size:18px;"><b>Orden:</b></p>
			                        <p style="font-size:17px;"><b>${plat1} ${cant_plat1}</b></p>
			                        <p style="font-size:17px;"><b>${plat2} ${cant_plat2}</b></p>
			                        <p style="font-size:17px;"><b>${plat3} ${cant_plat3}</b></p>
			                        <p style="font-size:17px;"><b>${plat4} ${cant_plat4}</b></p>
			                        <p style="font-size:17px;"><b>${plat5} ${cant_plat5}</b></p>
			                    </div>
			                    <center>
			                    	<button onclick="entregar_orden('${doc.id}')" type="button" class="btn btn-primary">Entregado</button>
			                    </center>
			                    <br>
			                    <div class="panel-footer foot">
				                    <center>
				                    	<p style="font-size:17px;"><b>${doc.data().mesa}</b></p>
				                    </center>
			                    </div>
			                </div>
			            </div>
		    		`
	        	}
	        }
			plat1 = "";
			plat2 = "";
			plat3 = "";
			plat4 = "";
			plat5 = "";
			cant_plat1 = "";
			cant_plat2 = "";
			cant_plat3 = "";
			cant_plat4 = "";
			cant_plat5 = "";
			count_ordenes++;
	    });
	});

/*===============================================================================================================================

	Counts para el index, home

===============================================================================================================================*/
//Contador global
var count = 0;
var count_ordenes = 0;

//RESERVACIONES
var cant_reservaciones_actuales = document.getElementById("cant_reservaciones_actuales");
db.collection("Reservaciones").onSnapshot((querySnapshot) => {
	cant_reservaciones_actuales.innerHTML = "";
	count = 0;
	querySnapshot.forEach((doc) => {
	        	
	    if(doc.data().fecha == fecha_formato){
	        count = count + 1;
	    }
	    cant_reservaciones_actuales.innerHTML = count;
	});
});

//ORDENES
var cant_ordenes_actuales = document.getElementById("cant_ordenes_actuales");
db.collection("Ordenes").onSnapshot((querySnapshot) => {
	cant_ordenes_actuales.innerHTML = "";
	count_ordenes = 0;
	querySnapshot.forEach((doc) => {
	        	
	    if(doc.data().fecha == fecha_formato){
	        count_ordenes = count_ordenes + 1;
	    }
	    cant_ordenes_actuales.innerHTML = count_ordenes;
	});
});

/*===============================================================================================================================

	Sets de asistencia e inasistencia en las reservaciones

===============================================================================================================================*/

function marcar_asistencia(id, id_modal){
	var modal = "exampleModal_options" + id_modal;
	var washingtonRef = db.collection("Reservaciones").doc(id);
   	return washingtonRef.update({
        estado: "asistio",
	})
    .then(function () {
        alert("Datos Editados Exitosamente!!");
        console.log("Document successfully updated!");
        //console.log(id_modal);
        //location.reload();
        
    })
    .catch(function (error) {
                
        console.error("Error updating document: ", error);
    });
}

function marcar_inasistencia(id, id_modal){
	var modal = "exampleModal_options" + id_modal;
	var washingtonRef = db.collection("Reservaciones").doc(id);
   	return washingtonRef.update({
        estado: "inasistencia",
	})
    .then(function () {
        alert("Datos Editados Exitosamente!!");
        console.log("Document successfully updated!");
        //console.log(id_modal);
        //location.reload();
        
    })
    .catch(function (error) {
                
        console.error("Error updating document: ", error);
    });
}

/*===============================================================================================================================

	Marcar entrega de la orden al cliente

===============================================================================================================================*/
function entregar_orden(parametro_id){
	var washingtonRef = db.collection("Ordenes").doc(parametro_id);
   	return washingtonRef.update({
        estado: "entregado",
	})
    .then(function () {
        alert("Datos Editados Exitosamente!!");
        console.log("Document successfully updated!");
        //console.log(id_modal);
        //location.reload();
        
    })
    .catch(function (error) {
                
        console.error("Error updating document: ", error);
    });
}


/*===============================================================================================================================

	Setear el nombre de la mesa cuando damos en ordenar en una reservacion

===============================================================================================================================*/

function set_mesa_cliente(name_mesa, responsable_mesa){
	document.getElementById("mesa").value = name_mesa;
	document.getElementById("responsable_mesa").value = responsable_mesa;
}

/*===============================================================================================================================

	Metodo para eliminar un platillo de la lista

===============================================================================================================================*/

function delete_platillo(name_plato){
	if(name_plato == orden1){
		orden1 = "";
		cant_orden1 = 0;
		console.log("Reseteada, Orden: " + name_plato);
		console.log(orden1);
		console.log(cant_orden1);
		console.log(orden2);
		console.log(cant_orden2);
		console.log(orden3);
		console.log(cant_orden3);
		console.log(orden4);
		console.log(cant_orden4);
		console.log(orden5);
		console.log(cant_orden5);
		ordenes.innerHTML = "";
		//document.getElementById("select_platillos").disabled = "false";
		guardar_plato();
	}else if(name_plato == orden2){
		orden2 = "";
		cant_orden2 = 0;
		console.log("Reseteada, Orden: " + name_plato);
		console.log(orden1);
		console.log(cant_orden1);
		console.log(orden2);
		console.log(cant_orden2);
		console.log(orden3);
		console.log(cant_orden3);
		console.log(orden4);
		console.log(cant_orden4);
		console.log(orden5);
		console.log(cant_orden5);
		ordenes.innerHTML = "";
		//document.getElementById("select_platillos").disabled = "false";
		guardar_plato();
	}else if(name_plato == orden3){
		orden3 = "";
		cant_orden3 = 0;
		console.log("Reseteada, Orden: " + name_plato);
		console.log(orden1);
		console.log(cant_orden1);
		console.log(orden2);
		console.log(cant_orden2);
		console.log(orden3);
		console.log(cant_orden3);
		console.log(orden4);
		console.log(cant_orden4);
		console.log(orden5);
		console.log(cant_orden5);
		ordenes.innerHTML = "";
		//document.getElementById("select_platillos").disabled = "false";
		guardar_plato();
	}else if(name_plato == orden4){
		orden4 = "";
		cant_orden4 = 0;
		console.log("Reseteada, Orden: " + name_plato);
		console.log(orden1);
		console.log(cant_orden1);
		console.log(orden2);
		console.log(cant_orden2);
		console.log(orden3);
		console.log(cant_orden3);
		console.log(orden4);
		console.log(cant_orden4);
		console.log(orden5);
		console.log(cant_orden5);
		ordenes.innerHTML = "";
		//document.getElementById("select_platillos").disabled = "false";
		guardar_plato();
	}else if(name_plato == orden5){
		orden5 = "";
		cant_orden5 = 0;
		console.log("Reseteada, Orden: " + name_plato);
		console.log(orden1);
		console.log(cant_orden1);
		console.log(orden2);
		console.log(cant_orden2);
		console.log(orden3);
		console.log(cant_orden3);
		console.log(orden4);
		console.log(cant_orden4);
		console.log(orden5);
		console.log(cant_orden5);
		ordenes.innerHTML = "";
		//document.getElementById("select_platillos").disabled = "false";
		guardar_plato();
	}
}
/*===============================================================================================================================

	Algo

===============================================================================================================================*/
