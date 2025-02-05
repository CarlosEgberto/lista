const produto = document.querySelector('.input-prod');
const botao = document.querySelector('.add-prod');
const listaCompleta = document.querySelector('.list-prod');
const apagar = document.querySelector('.apagarLista')

let minhaLista = JSON.parse(localStorage.getItem('listaDeCompras')) || [];

function novoProduto() {
  const nomeProduto = produto.value.trim(); // Limpa espaços em branco

  if (nomeProduto === '') {
    alert('Digite o nome do produto');
    return; // Impede a adição se o campo estiver vazio
  }

  if (minhaLista.some(item => item.produtos === nomeProduto)) {
    alert('Produto já cadastrado');
    return; // Impede a duplicação de produtos
  }

  minhaLista.push({
    produtos: nomeProduto,
    concluida: false
  });

  produto.value = '';
  mostrarProdutos();
}

function mostrarProdutos() {
  listaCompleta.innerHTML = minhaLista.map((item, index) => `
    <li class="prod ${item.concluida ? "comprado" : ""}"> 
      <img src="assets/images/bag-check.svg" alt="" onclick="done(${index})">
      <p>${item.produtos}</p>
      <img src="assets/images/trash.svg" alt="" onclick="del(${index})">
    </li>
  `).join('');

  localStorage.setItem('listaDeCompras', JSON.stringify(minhaLista));
}

function del(index) {
  minhaLista.splice(index, 1);
  mostrarProdutos();
}

function done(index) {
  minhaLista[index].concluida = !minhaLista[index].concluida;
  mostrarProdutos();
}

mostrarProdutos(); // Carrega a lista ao iniciar a página

function apagarTudo() {
  localStorage.removeItem('listaDeCompras'); // Limpa o localStorage
  minhaLista = []; // Reseta o array
  mostrarProdutos(); // Atualiza a tela
}

botao.addEventListener('click', novoProduto);

apagar.addEventListener('click', apagarTudo);



