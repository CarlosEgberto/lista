const produtoInput = document.querySelector('.input-prod');
const botaoAdicionar = document.querySelector('.add-prod');
const listaCompleta = document.querySelector('.list-prod');
const botaoApagarTudo = document.querySelector('.apagarLista');
const totalCompraElemento = document.querySelector('.tot');

let minhaLista = JSON.parse(localStorage.getItem('listaDeCompras')) || [];

function novoProduto() {
  const nomeProduto = produtoInput.value.trim();

  if (nomeProduto === '') {
    alert('Digite o nome do produto');
    return;
  }

  if (minhaLista.some(item => item.produtos === nomeProduto)) {
    alert('Produto já cadastrado');
    return;
  }

  minhaLista.push({
    produtos: nomeProduto,
    concluida: false,
    preco: 0
  });

  produtoInput.value = '';
  mostrarProdutos();
}

function mostrarProdutos() {
  listaCompleta.innerHTML = minhaLista.map((item, index) => `
    <li class="prod ${item.concluida ? "comprado" : ""}"> 
      <img src="assets/images/bag-check.svg" alt="" onclick="done(${index})">
      <p class="itemNome" onclick="solicitarPreco(${index})">${item.produtos}</p>
      <img src="assets/images/trash.svg" alt="" onclick="del(${index})">
    </li>
  `).join('');

  localStorage.setItem('listaDeCompras', JSON.stringify(minhaLista));
  atualizarTotal();
}

function del(index) {
  minhaLista.splice(index, 1);
  mostrarProdutos();
}

function done(index) {
  minhaLista[index].concluida = !minhaLista[index].concluida;
  mostrarProdutos();
}

function solicitarPreco(index) {
  let preco = parseFloat(prompt("Digite o preço do produto:", minhaLista[index].preco) || 0);

  if (isNaN(preco) || preco < 0) {
    alert("Preço inválido. Digite um número maior ou igual a zero.");
    return;
  }

  minhaLista[index].preco = preco;
  localStorage.setItem('listaDeCompras', JSON.stringify(minhaLista));
  if (preco != 0){
      done(index);
    }
  atualizarTotal();
  mostrarProdutos();
}

function atualizarTotal() {
  let total = minhaLista.reduce((soma, item) => soma + item.preco, 0);
  totalCompraElemento.textContent = `${total.toFixed(2)}`;
}

function apagarTudo() {
  localStorage.removeItem('listaDeCompras');
  minhaLista = [];
  mostrarProdutos();
}

botaoAdicionar.addEventListener('click', novoProduto);
botaoApagarTudo.addEventListener('click', apagarTudo);

mostrarProdutos();



