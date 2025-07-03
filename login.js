// 1. CONFIGURAÇÃO E INICIALIZAÇÃO DO FIREBASE
const firebaseConfig = {
     apiKey: "AIzaSyCejKQPQNKlHdm5nHcznUgQ50SQQltg5Ig",
  authDomain: "salva-compras.firebaseapp.com",
  projectId: "salva-compras",
  storageBucket: "salva-compras.firebasestorage.app",
  messagingSenderId: "562952906397",
  appId: "1:562952906397:web:9439aecf8702b00baa5674"
};

// Inicia o Firebase NESTA PÁGINA
firebase.initializeApp(firebaseConfig);


// 2. LÓGICA DA PÁGINA DE LOGIN
document.addEventListener('DOMContentLoaded', function() {
    // --- Referências aos Elementos ---
    const loginView = document.getElementById('login-view');
    const registerView = document.getElementById('register-view');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const showRegisterLink = document.getElementById('show-register');
    const showLoginLink = document.getElementById('show-login');
    const errorMessageP = document.getElementById('error-message');
    const allInputs = document.querySelectorAll('input');

    // Inicializa o serviço de autenticação do Firebase
    const auth = firebase.auth();

    // --- Lógica para alternar entre os formulários ---
    showRegisterLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginView.style.display = 'none';
        registerView.style.display = 'block';
        errorMessageP.textContent = ''; // Limpa erros antigos
    });

    showLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginView.style.display = 'block';
        registerView.style.display = 'none';
        errorMessageP.textContent = ''; // Limpa erros antigos
    });
    
    // Limpa a mensagem de erro quando o usuário começa a digitar
    allInputs.forEach(input => {
        input.addEventListener('input', () => {
            errorMessageP.textContent = '';
        });
    });

    // --- Processo de Cadastro ---
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const button = registerForm.querySelector('button');
        const buttonOriginalText = button.innerHTML;

        button.disabled = true;
        button.innerHTML = 'Aguarde...';

        auth.createUserWithEmailAndPassword(email, password)
            .then(userCredential => {
                console.log('Usuário cadastrado com sucesso!', userCredential.user);
                window.location.href = 'index.html';
            })
            .catch(error => {
                if (error.code === 'auth/weak-password') {
                    errorMessageP.textContent = 'Sua senha deve ter no mínimo 6 caracteres.';
                } else if (error.code === 'auth/email-already-in-use') {
                    errorMessageP.textContent = 'Este e-mail já está cadastrado.';
                } else {
                    errorMessageP.textContent = 'Ocorreu um erro ao cadastrar. Tente novamente.';
                }
                console.error('Erro de cadastro:', error);
            })
            .finally(() => {
                button.disabled = false;
                button.innerHTML = buttonOriginalText;
            });
    });

    // --- Processo de Login ---
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        const button = loginForm.querySelector('button');
        const buttonOriginalText = button.innerHTML;
        
        button.disabled = true;
        button.innerHTML = 'Aguarde...';

        auth.signInWithEmailAndPassword(email, password)
            .then(userCredential => {
                console.log('Usuário logado com sucesso!', userCredential.user);
                window.location.href = 'index.html';
            })
            .catch(error => {
                if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
                    errorMessageP.textContent = 'E-mail ou senha inválidos.';
                } else {
                    errorMessageP.textContent = 'Ocorreu um erro ao entrar. Tente novamente.';
                }
                console.error('Erro de login:', error);
            })
             .finally(() => {
                button.disabled = false;
                button.innerHTML = buttonOriginalText;
            });
    });

    // --- Verificador de Estado de Login ---
    auth.onAuthStateChanged(user => {
        if (user) {
            setTimeout(() => {
                 window.location.href = 'index.html';
            }, 50);
        }
    });
});