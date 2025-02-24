// Seleciona os elementos HTML e os armazena em variáveis para facilitar o acesso.
const listaCompleta = document.querySelector('.list-prod');
const botaoApagarTudo = document.querySelector('.apagarLista');
const totalCompraElemento = document.querySelector('.tot');
const nomeUsuario = document.querySelector('#nome-usuario');
const conteudoPrincipal = document.querySelector('#conteudo-principal');

// Recupera a lista de compras do localStorage ou inicializa um array vazio.
let minhaLista = JSON.parse(localStorage.getItem('listaDeCompras')) || [];

// Função para exibir mensagens de feedback
function exibirMensagem(mensagem, tipo) {
    const divMensagens = document.getElementById('mensagens');
    divMensagens.innerHTML = `<div class="${tipo}">${mensagem}</div>`;
}

// Função para exibir os produtos na lista.
function mostrarProdutos() {
    listaCompleta.innerHTML = minhaLista.map((item, index) => `
        <li class="prod ${item.concluida ? "comprado" : ""}" data-index="${index}"> 
            <img src="assets/images/bag-check.svg" alt="Marcar como comprado" onclick="done(${index})">
            <p class="itemNome" onclick="solicitarPreco(${index})">${item.produtos}</p>
            <img src="assets/images/trash.svg" alt="Remover item" onclick="del(${index})">
        </li>
    `).join('');

    localStorage.setItem('listaDeCompras', JSON.stringify(minhaLista));
    atualizarTotal();

    const itensNomeLista = document.querySelectorAll('.itemNome');
    itensNomeLista.forEach(item => {
        item.addEventListener('click', solicitarPreco);
    });

    atualizarClassesComprado();
}

// Função para atualizar as classes "comprado" dos itens da lista.
function atualizarClassesComprado() {
    const itensLista = document.querySelectorAll('.prod');
    itensLista.forEach(item => {
        const index = item.dataset.index;
        if (minhaLista[index] && minhaLista[index].preco === 0) {
            item.classList.remove('comprado');
            minhaLista[index].concluida = false;
        }
    });
}

// Função para remover um produto da lista.
function del(index) {
    minhaLista.splice(index, 1);
    mostrarProdutos();
}

// Função para marcar um produto como comprado (ou desmarcar).
function done(index) {
    minhaLista[index].concluida = !minhaLista[index].concluida;
    mostrarProdutos();
}

// Função para solicitar o preço do produto ao usuário.
function solicitarPreco(index) {
    let precoStr = prompt("Digite o preço do produto:", minhaLista[index].preco);

    if (precoStr === null) {
        return;
    }

    const preco = parseFloat(precoStr.replace(",", "."));

    if (isNaN(preco) || preco < 0) {
        exibirMensagem("Preço inválido. Digite um número maior ou igual a zero.", 'erro');
        return;
    }

    minhaLista[index].preco = preco;
    localStorage.setItem('listaDeCompras', JSON.stringify(minhaLista));

    if (preco === 0) {
        minhaLista[index].concluida = false;
    } else {
        minhaLista[index].concluida = true;
    }

    atualizarTotal();
    mostrarProdutos();
    exibirMensagem('Preço atualizado com sucesso!', 'sucesso');
}

// Função para atualizar o total da compra.
function atualizarTotal() {
    let total = minhaLista.reduce((soma, item) => soma + item.preco, 0);
    totalCompraElemento.textContent = `${total.toFixed(2)}`;
}

// Função para apagar toda a lista de compras.
function apagarTudo() {
    localStorage.removeItem('listaDeCompras');
    minhaLista = [];
    mostrarProdutos();
    exibirMensagem('Lista apagada com sucesso!', 'sucesso');
}

// Função para verificar o login e redirecionar se necessário
function checkLogin() {
    const nome = localStorage.getItem('nome');
    const apelido = localStorage.getItem('apelido');

    if (!nome || !apelido) {
        window.location.href = 'login.html'; // Redireciona para login se não estiver logado
    } else {
        nomeUsuario.textContent = apelido; // Exibe o apelido do usuário
        conteudoPrincipal.style.display = 'block'; // Mostra a página principal
    }
}

// Função de login (para login.html)
function handleLogin() {
    const formularioLogin = document.getElementById('login-form');
    if (formularioLogin) {
        formularioLogin.addEventListener('submit', function(event) {
            event.preventDefault();

            const nome = document.getElementById('nome').value;
            const apelido = document.getElementById('apelido').value;

            if (nome && apelido) {
                localStorage.setItem('nome', nome);
                localStorage.setItem('apelido', apelido);
                window.location.href = 'index.html'; // Redireciona para a página principal após login
            } else {
                exibirMensagem('Preencha todos os campos!', 'erro');
            }
        });
    }
}

// Função para sair
function sair() {
    localStorage.removeItem('nome');
    localStorage.removeItem('apelido');
    window.location.href = 'login.html'; // Redireciona para a página de login após sair
}

// Carrega os itens selecionados e verifica o login ao carregar a página
window.addEventListener('DOMContentLoaded', function() {
    const selectedItems = JSON.parse(localStorage.getItem('selectedItems')) || [];
    if (selectedItems.length > 0) {
        selectedItems.forEach(item => {
            if (!minhaLista.some(existing => existing.produtos === item)) {
                minhaLista.push({
                    produtos: item,
                    concluida: false,
                    preco: 0
                });
            }
        });
        localStorage.removeItem('selectedItems');
        mostrarProdutos();
    }

    // Verifica se está na página de login ou principal
    if (window.location.pathname.includes('login.html')) {
        handleLogin();
    } else {
        checkLogin();
    }
});

// Adiciona os eventos de clique aos botões.
botaoApagarTudo.addEventListener('click', apagarTudo);