const produto = document.querySelector('.input-prod')
const botao = document.querySelector('.add-prod')
const listaCompleta = document.querySelector('.list-prod')

let minhaLista = []

function novoProduto(){
  if (produto.value === ''){
  alert('Digite o nome do produto')}
  else{
  
  minhaLista.push({
    produtos: produto.value,
    concluida: false
  })}

  produto.value = ''

  mostrarProdutos()
}

function mostrarProdutos(){
  let novoitem = ''
minhaLista.forEach((item, index) => {
novoitem = novoitem + `
    <li class="prod ${item.concluida && "comprado"}"> 
      <img src="assets/images/bag-check.svg" alt="" onclick="done(${index})">
      <p>${item.produtos}</p>
      <img src="assets/images/trash.svg" alt="" onclick="del(${index})">
    </li>`
})
listaCompleta.innerHTML= novoitem
localStorage.setItem('listaDeCompras', JSON.stringify(minhaLista))
}

function del(index){
  minhaLista.splice(index, 1)
  mostrarProdutos()
}

function done(index){ 
  minhaLista[index].concluida = !minhaLista[index].concluida
  mostrarProdutos()

}

function recarregar(){
const saveLocalStorage = localStorage.getItem('listaDeCompras')
if (saveLocalStorage){
minhaLista = JSON.parse(saveLocalStorage)
}
mostrarProdutos()
}

recarregar()

botao.addEventListener('click', novoProduto)


