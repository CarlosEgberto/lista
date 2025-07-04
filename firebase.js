// 1. CONFIGURAÇÃO E INICIALIZAÇÃO
const firebaseConfig = {
    apiKey: "AIzaSyCejKQPQNKlHdm5nHcznUgQ50SQQltg5Ig",
    authDomain: "salva-compras.firebaseapp.com",
    projectId: "salva-compras",
    storageBucket: "salva-compras.firebasestorage.app",
    messagingSenderId: "562952906397",
    appId: "1:562952906397:web:9439aecf8702b00baa5674"
}

// Insira aqui as chaves que você gerou para a busca de imagens
const GOOGLE_API_KEY = "AIzaSyCjXyMqlfIbNeTLB6na-qZ3UEeolL88NVM"; // Substitua pela sua chave da API de Busca
const SEARCH_ENGINE_ID = "114d9dc63a22a41d4";

// Inicialização dos serviços do Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const productImagesCollection = db.collection('productImages');