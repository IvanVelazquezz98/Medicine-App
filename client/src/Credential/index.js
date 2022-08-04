// Importamos la función para inicializar la aplicación de Firebase
import { initializeApp } from "firebase/app";

// Añade aquí tus credenciales
const firebaseConfig = {
    apiKey: "AIzaSyBEc2ILEygMxTaAyHDyFuvtTUbEOyaSDMM",
    authDomain: "medicine-app-role.firebaseapp.com",
    projectId: "medicine-app-role",
    storageBucket: "medicine-app-role.appspot.com",
    messagingSenderId: "868110344968",
    appId: "1:868110344968:web:0c5ec03fa043f61ce6c2bd",
};

// Inicializamos la aplicación y la guardamos en firebaseApp
const firebaseApp = initializeApp(firebaseConfig);
// Exportamos firebaseApp para poder utilizarla en cualquier lugar de la aplicación
export default firebaseApp;