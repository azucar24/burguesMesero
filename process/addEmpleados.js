
var firebaseConfig = {
    apiKey: "AIzaSyDzAzzT_6qy-WWWWsXhVgenzxuKqTf_qZc",
    authDomain: "burgues-d5df4.firebaseapp.com",
    databaseURL: "https://burgues-d5df4.firebaseio.com",
    projectId: "burgues-d5df4",
    storageBucket: "burgues-d5df4.appspot.com",
    messagingSenderId: "856759946370",
    appId: "1:856759946370:web:8fdfc1eb151099e251389b"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);



//var categoria = document.getElementById('categoria');
//db.collection("categoria_producto").onSnapshot((querySnapshot) => {

//    querySnapshot.forEach((doc) => {
//        console.log(`${doc.id} => ${doc.data().nombre}`);
//        categoria.innerHTML +=
//            `        <option selected = "true"    hidden = "true"  value = "" disabled > --Elegir categoria-- </option>
//                <option> ${doc.data().nombre}</option>              `
 //   });
//});

//guardar datos
function RegistrarEmpleados() {
    var nombre = document.getElementById('nombre').value;
    var edad = document.getElementById('edad').value;
    var sexo = document.getElementById('sexo').value;
    var telefono = document.getElementById('telefono').value;
    var dui = document.getElementById('dui').value;
    var area_trabajo = document.getElementById('area_trabajo').value;
    var direccion = document.getElementById('direccion').value;
    var sucursal = document.getElementById('sucursal').value;
  // var direcccion = document.getElementById('direcccion').value;

   
    
    db.collection("empleados").add({
            
            nombre: nombre,
            edad: edad,
            sexo: sexo,
            telefono: telefono,
            dui: dui,
            area_trabajo: area_trabajo,
            direccion: direccion,
            sucursal: sucursal,
            //direcccion: direcccion,

        })
        .then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
            nombre = document.getElementById('nombre').value = '';
            edad = document.getElementById('edad').value = '';
            sexo = document.getElementById('sexo').value = '';
            telefono = document.getElementById('telefono').value = '';
            dui = document.getElementById('dui').value = '';
            area_trabajo = document.getElementById('area_trabajo').value = '';
            direccion = document.getElementById('direccion').value = '';
            sucursal = document.getElementById('sucursal').value = '';
            //direcccion = document.getElementById('direcccion').value = '';
            
            alert("Producto Registrado Exitosamente!!");

        })
        .catch(function (error) {
            console.error("Error adding document: ", error);
        });
}

//mostrar datos

var tablaU = document.getElementById('tablaU');
db.collection("productos").onSnapshot((querySnapshot) => {
    tablaU.innerHTML = '';
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().nombre}`);
        tablaU.innerHTML +=
            `
              <tr>
                  <th scope="row">${doc.data().nombre}</th>
                  <td>${doc.data().telefono}</td>
                  <td>${doc.data().direccion}</td>
                  <td>${doc.data().dui}</td>
                  <td>${doc.data().tipo}</td>
                  <td><button class="btn btn-danger" onclick="eliminar('${doc.id}')">Eliminar</button></td>

                  <td><button class="btn btn-warning" onclick="editar('${doc.id}','${doc.data().nombre}','${doc.data().telefono}','${doc.data().email}','${doc.data().direccion}','${doc.data().dui}','${doc.data().tipo}','${doc.data().password}')">Editar</button></td>
                </tr>
        `
    });
});

//borrar datos
function eliminar(id) {
    db.collection("usuarios").doc(id).delete().then(function () {
        alert("Datos de Usuario Eliminados Exitosamente!!");
        console.log("Document successfully deleted!");
    }).catch(function (error) {
        console.error("Error removing document: ", error);
    });
}

//actualizar datos

function editar(id, nombre, telefono, email, direccion, dui, tipo, password) {

    document.getElementById('nombre').value = nombre;
    document.getElementById('telefono').value = telefono;
    document.getElementById('email').value = email;
    document.getElementById('direccion').value = direccion;
    document.getElementById('dui').value = dui;
    document.getElementById('tipo').value = tipo;
    document.getElementById('password').value = password;

    var boton = document.getElementById('boton');
    boton.innerHTML = 'Actualizar';

    boton.onclick = function () {

        var washingtonRef = db.collection("usuarios").doc(id);

        var nombre = document.getElementById('nombre').value;
        var telefono = document.getElementById('telefono').value;
        var email = document.getElementById('email').value;
        var direccion = document.getElementById('direccion').value;
        var dui = document.getElementById('dui').value;
        var tipo = document.getElementById('tipo').value;
        var password = document.getElementById('password').value;


        var washingtonRef = db.collection("usuarios").doc(id);
        return washingtonRef.update({
                dui: dui,
                nombre: nombre,
                telefono: telefono,
                email: email,
                direccion: direccion,
                dui: dui,
                tipo: tipo,
                password: password
            })

            .then(function () {
                alert("Datos de Usuario Editados Exitosamente!!");
                console.log("Document successfully updated!");
                boton.innerHTML = 'Registrar';
                form.reset();
            })
            .catch(function (error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });
    }
}
