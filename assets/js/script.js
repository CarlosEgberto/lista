// Seleciona os elementos HTML e os armazena em variáveis (serão inicializados no DOMContentLoaded)
let listaCompleta, botaoApagarTudo, totalCompraElemento, nomeUsuario, conteudoPrincipal, themeToggle, themeIcon;

// Recupera a lista de compras do localStorage ou inicializa um array vazio.
let minhaLista = JSON.parse(localStorage.getItem('listaDeCompras')) || [];

// Função para exibir mensagens de feedback
function exibirMensagem(mensagem, tipo) {
    const divMensagens = document.getElementById('mensagens');
    divMensagens.innerHTML = `<div class="${tipo}">${mensagem}</div>`;
}

// Função para exibir os produtos na lista, com verificação para null
function mostrarProdutos() {
    if (!listaCompleta) {
        console.error("Elemento .list-prod não encontrado no DOM.");
        return; // Sai da função se listaCompleta for null
    }

    listaCompleta.innerHTML = minhaLista.map((item, index) => `
        <li class="prod ${item.concluida ? 'comprado' : ''}" data-index="${index}">
            <p class="itemNome" onclick="solicitarPreco(${index})">${item.produtos}</p>
            <i class="fas fa-trash-alt" onclick="del(${index})"></i>
        </li>
    `).join('');

    localStorage.setItem('listaDeCompras', JSON.stringify(minhaLista));
    atualizarTotal();

    atualizarClassesComprado();
}

// Função para atualizar as classes "comprado" dos itens da lista.
function atualizarClassesComprado() {
    const itensLista = document.querySelectorAll('.prod');
    itensLista.forEach(item => {
        const index = item.dataset.index;
        if (minhaLista[index] && (minhaLista[index].preco === 0 || !minhaLista[index].quantidade)) {
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

// Função para solicitar o preço e a quantidade do produto ao usuário.
function solicitarPreco(index) {
    let precoStr = prompt("Digite o preço do produto (R$):", minhaLista[index].preco || 0);
    let quantidadeStr = prompt("Digite a quantidade do produto:", minhaLista[index].quantidade || 1);

    if (precoStr === null || quantidadeStr === null) {
        return;
    }

    const preco = parseFloat(precoStr.replace(",", "."));
    const quantidade = parseInt(quantidadeStr);

    if (isNaN(preco) || preco < 0 || isNaN(quantidade) || quantidade <= 0) {
        exibirMensagem("Preço ou quantidade inválidos. Digite números maiores que zero.", 'erro');
        return;
    }

    minhaLista[index].preco = preco;
    minhaLista[index].quantidade = quantidade;
    minhaLista[index].concluida = true; // Marca como comprado ao inserir preço e quantidade
    localStorage.setItem('listaDeCompras', JSON.stringify(minhaLista));

    atualizarTotal();
    mostrarProdutos();
    exibirMensagem('Preço e quantidade atualizados com sucesso!', 'sucesso');
}

// Função para atualizar o total da compra.
function atualizarTotal() {
    if (!totalCompraElemento) {
        console.error("Elemento .tot não encontrado no DOM.");
        return;
    }

    let total = minhaLista.reduce((soma, item) => soma + (item.preco * (item.quantidade || 1)), 0);
    totalCompraElemento.textContent = total.toFixed(2);
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
        window.location.href = 'login.html';
    } else {
        if (!nomeUsuario) {
            console.error("Elemento #nome-usuario não encontrado no DOM.");
            return;
        }
        nomeUsuario.textContent = apelido;
        if (!conteudoPrincipal) {
            console.error("Elemento #conteudo-principal não encontrado no DOM.");
            return;
        }
        conteudoPrincipal.style.display = 'block';
    }
}

// Função para alternar entre temas claro e escuro com ícones
function toggleTheme() {
    if (!themeIcon || !themeToggle) {
        console.error("Elementos .theme-toggle ou #theme-icon não encontrados no DOM.");
        return;
    }

    const body = document.body;
    const isLight = body.classList.toggle('light-theme');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');

    // Alterna entre os ícones de lua (escuro) e sol (claro)
    if (isLight) {
        themeIcon.className = 'fas fa-sun'; // Sol para tema claro
    } else {
        themeIcon.className = 'fas fa-moon'; // Lua para tema escuro
    }
}

// Função de login (para login.html)
function handleLogin() {
    const formularioLogin = document.getElementById('login-form');
    if (formularioLogin) {
        formularioLogin.addEventListener('submit', function(event) {
            event.preventDefault();

            const nome = document.getElementById('nome').value.trim(); // Remove espaços extras
            const apelido = document.getElementById('apelido').value.trim(); // Remove espaços extras

            if (nome && apelido) {
                localStorage.setItem('nome', nome);
                localStorage.setItem('apelido', apelido);
                window.location.href = 'index.html'; // Redireciona para a página principal
                console.log("Login bem-sucedido, redirecionando para index.html");
            } else {
                exibirMensagem('Preencha todos os campos!', 'erro');
            }
        });
    } else {
        console.error("Elemento #login-form não encontrado no DOM.");
    }
}

// Função para sair
function sair() {
    localStorage.removeItem('nome');
    localStorage.removeItem('apelido');
    window.location.href = 'login.html';
}

// Carrega o tema, elementos e a lista ao carregar a página
window.addEventListener('DOMContentLoaded', function() {
    // Inicializa os elementos do DOM
    listaCompleta = document.querySelector('.list-prod');
    botaoApagarTudo = document.querySelector('.apagarLista');
    totalCompraElemento = document.querySelector('.tot');
    nomeUsuario = document.querySelector('#nome-usuario');
    conteudoPrincipal = document.querySelector('#conteudo-principal');
    themeToggle = document.querySelector('.theme-toggle');
    themeIcon = document.querySelector('#theme-icon');

    // Verifica se os elementos principais existem
    if (!listaCompleta || !botaoApagarTudo || !totalCompraElemento || !nomeUsuario || !conteudoPrincipal || !themeToggle || !themeIcon) {
        console.error("Um ou mais elementos do DOM não foram encontrados. Verifique o HTML.");
    }

    // Carrega o tema salvo no localStorage (padrão: escuro)
    const savedTheme = localStorage.getItem('theme') || 'dark';
    const body = document.body;
    if (savedTheme === 'light') {
        body.classList.add('light-theme');
        themeIcon.className = 'fas fa-sun'; // Sol para tema claro
    } else {
        body.classList.remove('light-theme');
        themeIcon.className = 'fas fa-moon'; // Lua para tema escuro
    }

    // Carrega os itens selecionados e verifica o login, apenas se for a página correta
    const selectedItems = JSON.parse(localStorage.getItem('selectedItems')) || [];
    if (selectedItems.length > 0 && window.location.pathname.includes('index.html')) {
        selectedItems.forEach(item => {
            if (!minhaLista.some(existing => existing.produtos === item)) {
                minhaLista.push({
                    produtos: item,
                    concluida: false,
                    preco: 0,
                    quantidade: 1
                });
            }
        });
        localStorage.removeItem('selectedItems');
        if (listaCompleta) {
            mostrarProdutos(); // Carrega a lista apenas se o elemento existir
        }
    }

    if (window.location.pathname.includes('login.html')) {
        handleLogin();
        console.log("Carregando página de login, configurando handleLogin.");
    } else if (window.location.pathname.includes('index.html') && listaCompleta) {
        mostrarProdutos(); // Carrega a lista apenas se for index.html e o elemento existir
        checkLogin();
        console.log("Carregando página index, verificando login e exibindo lista.");
    } else if (window.location.pathname.includes('selection.html')) {
        console.log("Carregando página de seleção, sem lista de produtos.");
    }

    // Adiciona o evento de clique ao botão Apagar Lista, apenas se existir
    if (botaoApagarTudo) {
        botaoApagarTudo.addEventListener('click', apagarTudo);
    } else {
        console.error("Elemento .apagarLista não encontrado no DOM.");
    }
});