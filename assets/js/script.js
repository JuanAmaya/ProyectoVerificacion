/* Barra de Navegacion */
const navSlide = () => {
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".menu"); // .nav-list li

  burger.addEventListener("click", () => {
    // Toggle Nav
    nav.classList.toggle("nav-active");

    // Animate Links
    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = "";
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${
          index / 30 + 0.01
        }s`;
      }
    });

    // Burger Animation
    burger.classList.toggle("toggle");

    // Se cierre el menu si se cierra la hamburgesa
    navLinks.forEach((e) => {
      if (e.classList.contains("activado")) {
        e.classList.toggle("activado");
      }
    });
  });

  // Que se abra el menu con click
  navLinks.forEach((e) => {
    e.onclick = function () {
      e.classList.toggle("activado");
    };
  });
};

function expandirMenu() {
  const opcion = document.querySelector(".activado");

  opcion.classList.toggle(".activado");
}

// Creacion de las cartas de los vehiculos
function cartasVehiculos() {
  let cartaVehiculo = document.getElementsByClassName("cartas-vehiculos")[0];

  function creacionCartas(carImage, name, price, year, color) {
    const div = document.createElement("div");
    const div2 = document.createElement("div");
    const image = document.createElement("img");
    const btnCita = document.createElement("a");
    var p = document.createElement("p");
    var p2 = document.createElement("p");
    var p3 = document.createElement("p");
    var p4 = document.createElement("p");

    var nombre = document.createTextNode(name);
    var precio = document.createTextNode(price);
    var tiempo = document.createTextNode("Año: " + year);
    var colorC = document.createTextNode("Color: " + color);
    var textoBoton = document.createTextNode("Pedir cita");

    image.src = "./../assets/images/carros/" + carImage + ".jpg";

    div.classList.add("carta");
    div2.classList.add("titulos-carta");
    btnCita.classList.add("boton-cita");

    p.appendChild(nombre);
    p2.appendChild(precio);
    p3.appendChild(tiempo);
    p4.appendChild(colorC);
    btnCita.appendChild(textoBoton);

    p3.classList.add("desc-carta");
    p4.classList.add("desc-carta");

    btnCita.setAttribute("id", name);
    btnCita.setAttribute("onclick", "apartarCarro(this.id)");

    div2.appendChild(p);
    div2.appendChild(p2);
    div2.classList.add("titulos-carta");

    div.appendChild(image);
    div.appendChild(div2);
    div.appendChild(p3);
    div.appendChild(p4);
    div.appendChild(btnCita);

    cartaVehiculo.appendChild(div);
  }

  creacionCartas("Cherokee", "Cherokee Laredo", "$39,900", "1994", "Verde");
  creacionCartas("Odyssey", "Honda Odyssey", "$239,900", "2013", "Plateada");
  creacionCartas("Cheyenne", "Cheyenne z71 4x4", "$79,900", "1995", "Verde");
  creacionCartas("Volvos80", "Volvo s80", "$39,900", "2002", "Negra");
  creacionCartas("Silverado", "Silverado", "$109,900", "1999", "Negra");
  creacionCartas("Camry", "Camry", "$109,900", "2009", "Plateada");
}

function apartarCarro(idAuto) {
  localStorage.setItem("autoPedido", idAuto);

  // Si el usuario esta dentro
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      var uid = user.uid;
      if (user != null) {
        window.location.href = "./citas.html";
      }
    } else {
      window.location.href = "./registro.html";
      alert("Debes de tener cuenta para pedir una cita.");
    }
  });
}

function cargarAuto() {
  const autoCita = localStorage.getItem("autoPedido");
  document.getElementById("cita-auto").value = autoCita;
}

function ordenarCita(pagina) {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      var uid = user.uid;
      if (user != null) {
        window.location.href = "./citas.html";
      }
    } else {
      window.location.href = "./registro.html";
      alert("Debes de tener cuenta para pedir una cita.");
    }
  });
}

// BASE DE DATOS
// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Configuracion de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCdNVVeRz7UMgZI1Q1AZBtKFRtJvkRu0Ao",
  authDomain: "matcars-cee9d.firebaseapp.com",
  projectId: "matcars-cee9d",
  storageBucket: "matcars-cee9d.appspot.com",
  messagingSenderId: "354686371368",
  appId: "1:354686371368:web:564bfc3a7f89f19cd1971d",
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

// USUARIO DENTRO
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    var uid = user.uid;
    // Se muestra logout
    document.getElementById("registrar-ses").style.display = "none";
    document.getElementById("abrir-ses").style.display = "none";
    document.getElementById("cerrar-ses").style.display = "flex";
    // document.getElementById("pagina-citas").style.display = "flex";

    // SACAR EL CORREO
    if (user != null) {
      var email_id = user.email;
      window.email_id = email_id;
    }
  } else {
    // Se muestran los metodos de registro
    document.getElementById("registrar-ses").style.display = "flex";
    document.getElementById("abrir-ses").style.display = "flex";
    document.getElementById("cerrar-ses").style.display = "none";
    // document.getElementById("pagina-citas").style.display = "none";
  }
});

// INICIO SESION
function login() {
  let userEmail = document.getElementById("email_field").value;
  let userPass = document.getElementById("password_field").value;

  if (userEmail.trim() === "" || userPass.trim() === "") {
    alert("Favor de llenar todos los campos");
    return;
  }

  firebase
    .auth()
    .signInWithEmailAndPassword(userEmail, userPass)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      window.location.href = "../index.html";
      console.log("funciono");
      if (user !== null) {
        //document.getElementById("texto").innerHTML = user.email;
      }
    })
    .catch((error) => {
      console.log("fallo");

      var errorCode = error.code;
      var errorMessage = error.message;

      if (errorCode === "auth/invalid-email") {
        alert("Error: El correo ingresado no es valido");
      } else if (
        errorCode === "auth/user-not-found" ||
        errorCode === "auth/wrong-password"
      ) {
        alert("El usuario o la contraseña es incorrecto");
      }
    });
}

// REGISTRARSE
function signUp() {
  let userEmail = document.getElementById("email").value;
  let userPass = document.getElementById("password").value;
  let userName = document.getElementById("nombre").value;

  if (
    userEmail.trim() === "" ||
    userPass.trim() === "" ||
    userName.trim() === ""
  ) {
    alert("Favor de llenar todos los campos");
    return;
  }

  firebase
    .auth()
    .createUserWithEmailAndPassword(userEmail, userPass)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      alert("Cuenta Registrada Exitosamente");
      window.location.href = "../index.html";
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;

      if (errorCode === "auth/email-already-in-use") {
        alert("Error: Este correo ya esta siendo utilizado");
      } else if (errorCode === "auth/invalid-email") {
        alert("Error: El correo ingresado no es valido");
      }
    });
}

// SALIRSE
function logout() {
  firebase
    .auth()
    .signOut()
    .then(function () {
      // Sign-out succesful.
      alert("Se ha salido de la sesion");
    })
    .catch(function (error) {
      // An error happend.
    });
}

// OLVIDAR CONTRA
function resetPassword() {
  const auth = firebase.auth();
  const email = document.getElementById("email").value;

  if (email == "") {
    alert("Ingrese el correo");
    return;
  }

  auth
    .sendPasswordResetEmail(email)
    .then(function () {
      alert("Se ha enviado un mensaje a tu correo, favor de checarlo.");
    })
    .catch(function (error) {
      const errorCode = error.code;

      if (errorCode === "auth/invalid-email") {
        alert("Error: El correo ingresado no es valido");
      } else if (errorCode === "auth/user-not-found") {
        alert("El correo no esta registrado");
      }
    });
}

// CITAS
function cargarCitas() {
  let firebaseRef = firebase.database().ref("citas");
}

function citasHandler() {
  let firebaseRef = firebase.database().ref("citas");

  const citaNombre = document.getElementById("cita-nombre").value;
  const citaNumero = document.getElementById("cita-numero").value;
  const citaFecha = document.getElementById("cita-fecha").value;
  const citaHora = document.getElementById("cita-hora").value;
  const citaAuto = document.getElementById("cita-auto").value;

  if (
    citaNombre.trim() === "" ||
    citaNumero.trim() === "" ||
    citaFecha.trim() === "" ||
    citaHora.trim() === ""
  ) {
    alert("Favor de llenar todos los campos");
    return;
  }

  const crearCita = {
    Nombre: citaNombre,
    Numero: citaNumero,
    Fecha: citaFecha,
    Hora: citaHora,
    Vehiculo: citaAuto,
  };

  firebaseRef.push(crearCita);
  alert("Fecha Agendada");
  document.getElementById("cita-nombre").value = "";
  document.getElementById("cita-numero").value = "";
  document.getElementById("cita-fecha").value = "";
  document.getElementById("cita-hora").value = "";
}

/* Iniciar funciones */
const app = () => {
  navSlide();
};

app();
