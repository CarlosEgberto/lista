// 1. CONFIGURAÇÃO E INICIALIZAÇÃO
const firebaseConfig = {
    apiKey: "AIzaSyCejKQPQNKlHdm5nHcznUgQ50SQQltg5Ig",
    authDomain: "salva-compras.firebaseapp.com",
    projectId: "salva-compras",
    storageBucket: "salva-compras.firebasestorage.app",
    messagingSenderId: "562952906397",
    appId: "1:562952906397:web:9439aecf8702b00baa5674"
};

// Inicialização dos serviços do Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const productImagesCollection = db.collection('productImages');

