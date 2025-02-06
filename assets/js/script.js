// Seleciona os elementos HTML e os armazena em variáveis para facilitar o acesso.
const produtoInput = document.querySelector('.input-prod'); // Campo de input para o nome do produto.
const botaoAdicionar = document.querySelector('.add-prod'); // Botão para adicionar o produto.
const listaCompleta = document.querySelector('.list-prod'); // Lista (<ul>) onde os produtos serão exibidos.
const botaoApagarTudo = document.querySelector('.apagarLista'); // Botão para apagar toda a lista.
const totalCompraElemento = document.querySelector('.tot'); // Elemento (<span>) onde o total da compra será exibido.

// Recupera a lista de compras do localStorage ou inicializa um array vazio.
// O localStorage permite que os dados sejam mantidos mesmo quando o usuário fecha a página.
let minhaLista = JSON.parse(localStorage.getItem('listaDeCompras')) || [];

// Função para exibir mensagens de feedback
function exibirMensagem(mensagem, tipo) {
    const divMensagens = document.getElementById('mensagens');
    divMensagens.innerHTML = `<div class="${tipo}">${mensagem}</div>`;
}

// Função para adicionar um novo produto à lista.
function novoProduto() {
    const nomeProduto = produtoInput.value.trim(); // Obtém o nome do produto do input, removendo espaços em branco extras.

    // Verifica se o nome do produto é válido.
    if (nomeProduto === '') {
        exibirMensagem('Digite o nome do produto', 'erro'); // Exibe mensagem de erro.
        return; // Sai da função se o nome for inválido.
    }

    // Verifica se o produto já está cadastrado na lista.
    if (minhaLista.some(item => item.produtos === nomeProduto)) {
        exibirMensagem('Produto já cadastrado', 'erro'); // Exibe mensagem de erro.
        return; // Sai da função se o produto já existir.
    }

    // Adiciona o novo produto à lista.
    minhaLista.push({
        produtos: nomeProduto, // Nome do produto.
        concluida: false, // Indica se o produto foi comprado (inicialmente, não foi comprado).
        preco: 0 // Preço do produto (inicialmente, 0).
    });

    produtoInput.value = ''; // Limpa o campo de input.
    mostrarProdutos(); // Atualiza a exibição da lista.
    exibirMensagem('Produto adicionado com sucesso!', 'sucesso'); // Exibe mensagem de sucesso.
}

// Função para exibir os produtos na lista.
function mostrarProdutos() {
    // Mapeia cada item da lista para um elemento <li> e atualiza o HTML da lista.
    listaCompleta.innerHTML = minhaLista.map((item, index) => `
        <li class="prod ${item.concluida ? "comprado" : ""}" data-index="${index}"> 
            <img src="assets/images/bag-check.svg" alt="" onclick="done(${index})">
            <p class="itemNome" onclick="solicitarPreco(${index})">${item.produtos}</p>
            <img src="assets/images/trash.svg" alt="" onclick="del(${index})">
        </li>
    `).join('');

    // Salva a lista atualizada no localStorage.
    localStorage.setItem('listaDeCompras', JSON.stringify(minhaLista));
    atualizarTotal(); // Atualiza o total da compra.

    // Adiciona o evento de clique aos elementos <p> após renderizar a lista.
    const itensNomeLista = document.querySelectorAll('.itemNome');
    itensNomeLista.forEach(item => {
        item.addEventListener('click', solicitarPreco);
    });

    atualizarClassesComprado(); // Atualiza as classes "comprado" após renderizar a lista.
}

// Função para atualizar as classes "comprado" dos itens da lista.
function atualizarClassesComprado() {
    const itensLista = document.querySelectorAll('.prod'); // Seleciona todos os elementos <li> da lista.
    itensLista.forEach(item => {
        const index = item.dataset.index; // Obtém o índice do item a partir do atributo data-index.
        // Verifica se o item existe na lista e se o preço é 0.
        if (minhaLista[index] && minhaLista[index].preco === 0) {
            item.classList.remove('comprado'); // Remove a classe "comprado" do elemento <li>.
            minhaLista[index].concluida = false; // Define a propriedade "concluida" como false no objeto da lista.
        }
    });
}

// Função para remover um produto da lista.
function del(index) {
    minhaLista.splice(index, 1); // Remove o item da lista.
    mostrarProdutos(); // Atualiza a exibição da lista.
}

// Função para marcar um produto como comprado (ou desmarcar).
function done(index) {
    minhaLista[index].concluida = !minhaLista[index].concluida; // Inverte o valor da propriedade "concluida".
    mostrarProdutos(); // Atualiza a exibição da lista.
}

// Função para solicitar o preço do produto ao usuário.
function solicitarPreco(index) {
    let precoStr = prompt("Digite o preço do produto:", minhaLista[index].preco); // Exibe um prompt para o usuário digitar o preço.

    // Verifica se o usuário digitou algo ou se clicou em cancelar.
    if (precoStr === null) {
        return; // Sai da função se o usuário clicou em cancelar.
    }

    // Converte a vírgula para ponto e converte a string para um número float.
    const preco = parseFloat(precoStr.replace(",", "."));

    // Verifica se o preço é válido.
    if (isNaN(preco) || preco < 0) {
        exibirMensagem("Preço inválido. Digite um número maior ou igual a zero.", 'erro'); // Exibe mensagem de erro.
        return; // Sai da função se o preço for inválido.
    }

    // Atualiza o preço do produto na lista.
    minhaLista[index].preco = preco;
    localStorage.setItem('listaDeCompras', JSON.stringify(minhaLista)); // Salva a lista atualizada no localStorage.

    // Marca o produto como comprado se o preço for diferente de 0.
    if (preco === 0) {
        minhaLista[index].concluida = false;
    } else {
        minhaLista[index].concluida = true;
    }

    atualizarTotal(); // Atualiza o total da compra.
    mostrarProdutos(); // Atualiza a exibição da lista.
    exibirMensagem('Preço atualizado com sucesso!', 'sucesso'); // Exibe mensagem de sucesso.
}

// Função para atualizar o total da compra.
function atualizarTotal() {
    // Calcula o total da compra somando o preço de todos os itens da lista.
    let total = minhaLista.reduce((soma, item) => soma + item.preco, 0);
    totalCompraElemento.textContent = `${total.toFixed(2)}`; // Exibe o total formatado com duas casas decimais.
}

// Função para apagar toda a lista de compras.
function apagarTudo() {
    localStorage.removeItem('listaDeCompras'); // Remove a lista do localStorage.
    minhaLista = []; // Limpa a lista na memória.
    mostrarProdutos(); // Atualiza a exibição da lista.
    exibirMensagem('Lista apagada com sucesso!', 'sucesso'); // Exibe mensagem de sucesso.
}

// Adiciona os eventos de clique aos botões.
botaoAdicionar.addEventListener('click', novoProduto); // Adiciona um novo produto ao clicar no botão "Adicionar".
botaoApagarTudo.addEventListener('click', apagarTudo); // Apaga toda a lista ao clicar no botão "Apagar Lista".

mostrarProdutos(); // Exibe a lista de produtos ao carregar a página.

// Verifica se o dispositivo é móvel antes de adicionar o ouvinte de evento para a tecla Enter.
if (window.innerWidth > 768) { // Se a largura da tela for maior que 768 pixels (ou seja, não é um dispositivo móvel).
    produtoInput.addEventListener('keyup', function(event) {
        if (event.keyCode === 13) { // Verifica se a tecla pressionada é Enter (código 13).
            novoProduto(); // Chama a função novoProduto() para adicionar o produto.
            produtoInput.focus(); // Define o foco de volta para o campo de input.
        }
    });
}