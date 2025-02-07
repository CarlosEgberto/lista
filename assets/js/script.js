// Seleciona os elementos HTML e os armazena em variáveis para facilitar o acesso.
const produtoInput = document.querySelector('.input-prod');
const botaoAdicionar = document.querySelector('.add-prod');
const listaCompleta = document.querySelector('.list-prod');
const botaoApagarTudo = document.querySelector('.apagarLista');
const totalCompraElemento = document.querySelector('.tot');

// Recupera a lista de compras do localStorage ou inicializa um array vazio.
let minhaLista = JSON.parse(localStorage.getItem('listaDeCompras')) || [];

// Função para exibir mensagens de feedback
function exibirMensagem(mensagem, tipo) {
    const divMensagens = document.getElementById('mensagens');
    divMensagens.innerHTML = `<div class="${tipo}">${mensagem}</div>`;
}

// Função para adicionar um novo produto à lista.
function novoProduto() {
    const nomeProduto = produtoInput.value.trim();

    if (nomeProduto === '') {
        exibirMensagem('Digite o nome do produto', 'erro');
        return;
    }

    if (minhaLista.some(item => item.produtos === nomeProduto)) {
        exibirMensagem('Produto já cadastrado', 'erro');
        return;
    }

    minhaLista.push({
        produtos: nomeProduto,
        concluida: false,
        preco: 0
    });

    produtoInput.value = '';
    mostrarProdutos();
    exibirMensagem('');
}

// Função para exibir os produtos na lista.
function mostrarProdutos() {
    listaCompleta.innerHTML = minhaLista.map((item, index) => `
        <li class="prod ${item.concluida ? "comprado" : ""}" data-index="${index}"> 
            <img src="assets/images/bag-check.svg" alt="" onclick="done(${index})">
            <p class="itemNome" onclick="solicitarPreco(${index})">${item.produtos}</p>
            <img src="assets/images/trash.svg" alt="" onclick="del(${index})">
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

// Adiciona os eventos de clique aos botões.
botaoAdicionar.addEventListener('click', novoProduto);
botaoApagarTudo.addEventListener('click', apagarTudo);

mostrarProdutos();

// Verifica se o dispositivo é móvel antes de adicionar o ouvinte de evento para a tecla Enter.
if (window.innerWidth > 768) {
    produtoInput.addEventListener('keyup', function(event) {
        if (event.keyCode === 13) {
            novoProduto();
            produtoInput.focus();
        }
    });
}

// Código para o login simplificado
const formularioLogin = document.getElementById('login-form');
const nomeUsuario = document.getElementById('nome-usuario');
const conteudoPrincipal = document.getElementById('conteudo-principal');

formularioLogin.addEventListener('submit', function(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const apelido = document.getElementById('apelido').value.toUpperCase(0);

    localStorage.setItem('nome', nome);
    localStorage.setItem('apelido', apelido);

    nomeUsuario.textContent = apelido;
    conteudoPrincipal.style.display = 'block';
    formularioLogin.style.display = 'none';
});

window.addEventListener('DOMContentLoaded', function() {
    const nome = localStorage.getItem('nome');
    const apelido = localStorage.getItem('apelido');

    if (nome && apelido) {
        nomeUsuario.textContent = apelido;
        conteudoPrincipal.style.display = 'block';
        formularioLogin.style.display = 'none';
    }
});