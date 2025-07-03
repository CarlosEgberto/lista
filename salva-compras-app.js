// 1. CONFIGURAÇÃO E INICIALIZAÇÃO DO FIREBASE

const firebaseConfig = {
     apiKey: "AIzaSyCejKQPQNKlHdm5nHcznUgQ50SQQltg5Ig",
  authDomain: "salva-compras.firebaseapp.com",
  projectId: "salva-compras",
  storageBucket: "salva-compras.firebasestorage.app",
  messagingSenderId: "562952906397",
  appId: "1:562952906397:web:9439aecf8702b00baa5674"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth(); // Adiciona o serviço de autenticação

// 2. DADOS DO CATÁLOGO (não muda)
const shoppingListData = [
    { category: "Açougue", items: ["Açém", "Alcatra", "Bacon", "Calabresa", "Carne de Frango", "Carne de Porco", "Carne moída", "Carré", "Churrasco Bovino", "Churrasco Bovino Light", "Costela", "Costela Bovina", "Costela de Boi", "Costela Ovina", "Costela Suína", "Coxa", "Coxa de Frango", "Filé de Coxa", "Filé de Peito", "Filé Mignon", "Filé Mignon Suíno", "Frios", "Guisado", "Guisado de 1ª", "Guisado de 2ª", "Lagarto bovino", "Linguiça", "Linguicinha", "Paleta de Cordeiro", "Patinho", "Peito de Frango", "Pele de Cordeiro", "Pele de Ovina", "Pernil", "Peru", "Picanha", "Salchichão", "Sobrecoxa"] }, { category: "Aperitivos", items: ["Amendoim", "Batata Palha", "Milho para pipoca", "Tapioca"] }, { category: "Bebidas", items: ["Água", "Água Mineral C/ Gás", "Achocolatado", "Aguardente", "Cacau em pó", "Cachaça", "Café", "Cerveja", "Cerveja Preta", "Champagne", "Chá", "Chá Gelado", "Coca-Cola", "Espumante", "Fanta", "Guaraná", "Pepsi", "Refrigerante", "Sprite", "Suco", "Vinho", "Vinho Branco", "Vinho Rosé", "Vinho Tinto", "Vodka", "Whisky"] }, { category: "Congelados", items: ["Almôndega", "Batatas pré-fritas", "Hambúrguer", "Lasanha", "Pizza Pronta", "Sorvete"] }, { category: "Doces", items: ["Balas", "Chicletes", "Chocolates", "Doce de Amendoim", "Doce de Leite", "JBomBom", "Paçoca", "Pastilhas"] }, { category: "Enlatados", items: ["Azeitona", "Cogumelo", "Creme de Leite", "Ervilha em Lata", "Leite Condensado", "Milho em Lata", "Salsicha em Lata", "Sardinhas"] }, { category: "Frutas", items: ["Abacate", "Banana", "Kiwi", "Laranja", "Limão", "Maçã", "Mamão", "Manga", "Melancia", "Melão", "Morango", "Pera"] }, { category: "Higiene", items: ["Absorvente", "Acetona", "Algodão", "Algodão Hidrófilo", "Bronzeador", "Condicionador", "Cotonete", "Creme Dental", "Creme p/ Desodorante", "Creme p/ o Rosto", "Desodorante", "Enxaguante Bucal", "Escova Dental", "Fio Dental", "Papel Higienico", "Pasta", "Prestobarba", "Protetor Solar", "Sabonete", "Shampoo", "Talco p/ Pé"] }, { category: "Lanche", items: ["Bolacha", "Bolos", "Capuchino", "Cereais", "Doces e compotas", "Doces pastosos", "Geleias", "Massa de pastel", "Mel"] }, { category: "Laticínios ou Ovos", items: ["Danone", "Embutidos", "Iogurte", "Leite", "Leite Desnatado", "Leite em pó", "Manteiga", "Margarina", "Ovo", "Queijo", "Queijo ralado", "Requeijao", "Salame", "Yakult"] }, { category: "Legumes e Verduras", items: ["Abóbora", "Agrião", "Aipim", "Alface", "Batata", "Batata Doce", "Batata Inglesa", "Bergamota", "Beterraba", "Brócolis", "Chuchu", "Couve", "Couve-Flor", "Jiló", "Mostarda", "Pepino", "Repolho", "Rodela", "Tomate", "Vagem"] }, { category: "Mercearia", items: ["Açúcar", "Adoçante", "Amido de milho", "Arroz", "Aveia", "Azeite de oliva", "Café em Pó", "Canjica", "Chocolate", "Ervilha", "Ervilha Seca", "Espaguete", "Extrato de tomate", "Farinha de Aveia", "Farinha de mandioca", "Farinha de Milho", "Farinha de rosca", "Farinha de trigo", "Farofa", "Farofa Temperada", "Feijão", "Fécula", "Fermento", "Grão-de-bico", "Lentilha", "Macarrão", "Milho verde", "Mistura", "Molho", "Molho de tomate", "Molho inglês", "Nescafé", "Óleo", "Palmito", "Penne", "Polvilho", "Vinagre"] }, { category: "Padaria", items: ["Biscoito", "Croissant", "Filtro de Café", "Pão", "Pão de forma", "Pão de Milho", "Pão de queijo", "Pão de Sanduíche", "Pão Doce", "Pão p/ cachorro-quente", "Pão p/ Hamburguer", "Pão Sovado", "Torta"] }, { category: "Peixes e Frutos do Mar", items: ["Bacalhau", "Camarão", "Filé de merluza", "Filé de Peixe", "Lagosta", "Lula", "Mexilhão", "Ostra", "Pescada", "Pintado", "Polvo", "Sardinha", "Tainha", "Traíra"] }, { category: "Produtos de Limpeza", items: ["Álcool Gel", "Álcool Liquido", "Amaciante", "Arpic", "Bacia", "Balde", "Bombril", "Buchinha", "Cera em Pasta", "Cera Liquida", "Cheirinho de Chão", "Cif", "Cloro", "Cloro Ativo", "Desengordurante", "Desinfetante", "Desodorizante", "Detergente", "Esfregão de Aço", "Esponja", "Fósforo", "Inseticida", "Jóia Líquida", "Limpa Vidro", "Luva de Borracha", "Lustra Moveis", "Lustra Piso", "Lustra Vidro", "Pano de Limpeza", "Pato", "Pó de Limpeza", "Rodo", "Sabão em Barra", "Sabão em Pó", "Sabão Liquido", "Soda Cáustica", "Vassoura", "Vassoura de Vaso Sanitário", "Veja"] }, { category: "Queijos", items: ["Brie", "Cheddar", "Mussarela", "Prato"] }, { category: "Refeições rápidas", items: ["Empanados", "Massas prontas"] }, { category: "Sobremesas", items: ["Calda para sorvete", "Frutas em calda", "Gelatina cristalizada", "Mousse", "Pepinha", "Pudim"] }, { category: "Temperos", items: ["Açafrão", "Alho", "Barinha", "Caldo de aves", "Caldo de Carne", "Caldo de legumes", "Canela", "Canela em Casca", "Cebola", "Cebolinha Verde", "Coentro", "Colorau", "Cominho", "Cravo-da-Índia", "Curry", "Ketchup", "Louro", "Maionese", "Molho de Galinha", "Molho de Mostarda", "Mostarda", "Noz-moscada", "Óleo", "Oregano", "Paprica Defumada", "Paprica Doce", "Pimenta", "Pimenta Malagueta", "Pimenta Vermelha", "Pimenta-do-Reino", "Pimentão", "Sal", "Salsa", "Sazon", "Shoyu", "Vinagre"] }, { category: "Outros", items: ["Alum. Ralado", "Beterraba p/ Galo", "Comida p/ Cachorro", "Comida p/ Galinha", "Comida p/ Pássaro", "Comida p/ Peixe", "Copos Descartáveis", "Guardanapo de Papel", "Lâmpada", "Papel Alumínio", "Pilha", "Toalha", "Vela"] }
];


// 3. LÓGICA PRINCIPAL DO APLICATIVO
// Tudo agora roda dentro do onAuthStateChanged
auth.onAuthStateChanged(user => {
    if (user) {
        // --- USUÁRIO ESTÁ LOGADO ---
        console.log("Usuário logado:", user.uid);
        initializeApp(user); // Inicia o aplicativo com os dados do usuário
    } else {
        // --- USUÁRIO NÃO ESTÁ LOGADO ---
        console.log("Nenhum usuário logado. Redirecionando para login.html");
        window.location.href = 'login.html'; // Protege a página
    }
});


function initializeApp(user) {
    // A referência da coleção agora é específica para o usuário logado
    const listasCollection = db.collection('users').doc(user.uid).collection('minhasListas');

    // Referências aos elementos do HTML (movidas para dentro da função)
    const loadingIndicator = document.getElementById('loading-indicator');
    const navButtons = document.querySelectorAll('.nav-button');
    const views = {
        'minhas-listas': document.getElementById('view-minhas-listas'),
        'adicionar-produto': document.getElementById('view-adicionar-produto'),
        'resumo-compra': document.getElementById('view-resumo-compra'),
        'configuracoes': document.getElementById('view-configuracoes'),
        'lista-especifica': document.getElementById('view-lista-especifica')
    };
    const listasCardsContainer = document.getElementById('listas-cards-container');
    const fabCriarLista = document.getElementById('fab-criar-lista');
    const tituloListaEspecifica = document.getElementById('titulo-lista-especifica');
    const itensListaEspecificaContainer = document.getElementById('itens-lista-especifica-container');
    const totalListaEspecifica = document.getElementById('total-lista-especifica');
    const fabBuscarNoCatalogoBtn = document.getElementById('fab-buscar-no-catalogo-btn');
    const itemModal = document.getElementById('item-modal');
    const modalTitle = document.getElementById('modal-title');
    const itemForm = document.getElementById('item-form');
    const modalItemListIdInput = document.getElementById('modal-item-list-id');
    const modalItemIndexInput = document.getElementById('modal-item-index');
    const itemNomeDisplayInput = document.getElementById('item-nome-display');
    const itemPrecoInput = document.getElementById('item-preco');
    const cancelItemBtn = document.getElementById('cancel-item-btn');
    const removerItemModalBtn = document.getElementById('remover-item-modal-btn');
    const catalogoSearchInput = document.getElementById('catalogo-search-input');
    const catalogoCategoriasAbasContainer = document.getElementById('catalogo-categorias-abas');
    const catalogoProdutosListaContainer = document.getElementById('catalogo-produtos-lista-container');
    const catalogoAdicionarItemManualBtn = document.getElementById('catalogo-adicionar-item-manual-btn');
    const configApagarDadosBtn = document.getElementById('config-apagar-dados');
    const configSobreAppBtn = document.getElementById('config-sobre-app');
    const configSairBtn = document.getElementById('config-sair'); // Botão de Sair

    // Variáveis de estado
    let minhasTodasAsListas = [];
    let currentOpenListId = null;
    let categoriaCatalogoAtiva = 'Todos';

    if(loadingIndicator) loadingIndicator.classList.add('show');

    listasCollection.orderBy("ultimaModificacao", "desc").onSnapshot(snapshot => {
        if(loadingIndicator) loadingIndicator.classList.remove('show');
        
        console.log("Dados do usuário recebidos do Firebase!");
        
        minhasTodasAsListas = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        // Atualiza a tela com os novos dados
        if (views['minhas-listas'].style.display === 'block') {
            renderizarListas();
        }
        if (views['lista-especifica'].style.display === 'block' && currentOpenListId) {
            const listaAberta = minhasTodasAsListas.find(l => l.id === currentOpenListId);
            if (listaAberta) renderizarItensDaLista(listaAberta);
            else {
                currentOpenListId = null;
                showView('minhas-listas');
            }
        }
        if (views['resumo-compra'].style.display === 'block') {
            renderizarResumoDaCompra();
        }
    }, error => {
        if(loadingIndicator) loadingIndicator.classList.remove('show');
        console.error("Erro ao buscar listas do Firebase: ", error);
        alert("Não foi possível conectar ao banco de dados.");
    });

    // --- FUNÇÃO DE LOGOUT ---
    if (configSairBtn) {
        configSairBtn.addEventListener('click', () => {
            if (confirm('Tem certeza que deseja sair da sua conta?')) {
                auth.signOut().then(() => {
                    console.log('Usuário deslogado com sucesso.');
                    // O onAuthStateChanged vai detectar a mudança e redirecionar para login.html
                }).catch(error => {
                    console.error('Erro ao sair:', error);
                });
            }
        });
    }

    // O restante de todas as funções (renderizar, criar, apagar, etc.) continua o mesmo,
    // pois a variável `listasCollection` já aponta para o lugar certo no banco de dados.
    // O código abaixo é idêntico ao da versão anterior.

    function renderizarListas() {
        if (!listasCardsContainer) return;
        listasCardsContainer.innerHTML = '';
        if (minhasTodasAsListas.length === 0) {
            listasCardsContainer.innerHTML = '<p>Nenhuma lista criada ainda. Clique no + para criar uma!</p>';
            return;
        }
        minhasTodasAsListas.forEach(lista => {
            const cartao = document.createElement('div');
            cartao.className = 'cartao-lista';
            cartao.setAttribute('data-lista-id', lista.id);
            const numItens = lista.itens ? lista.itens.length : 0;
            const dataModificacao = lista.ultimaModificacao ? new Date(lista.ultimaModificacao).toLocaleDateString('pt-BR') : '';
            cartao.innerHTML = `
                <h3>${lista.nome}</h3>
                <p>${numItens} itens</p>
                ${dataModificacao ? `<p class="card-data">Modificado em: ${dataModificacao}</p>` : ''}
                <div class="cartao-lista-acoes">
                    <button class="editar-lista-btn" aria-label="Editar nome da lista ${lista.nome}"><i class="fas fa-edit"></i></button>
                    <button class="apagar-lista-btn" aria-label="Apagar lista ${lista.nome}"><i class="fas fa-trash"></i></button>
                </div>`;
            cartao.querySelector('.editar-lista-btn').addEventListener('click', (e) => { e.stopPropagation(); editarNomeLista(lista.id); });
            cartao.querySelector('.apagar-lista-btn').addEventListener('click', (e) => { e.stopPropagation(); apagarLista(lista.id); });
            cartao.addEventListener('click', () => abrirListaEspecifica(lista.id));
            listasCardsContainer.appendChild(cartao);
        });
    }
    function renderizarItensDaLista(lista) {
        if (!itensListaEspecificaContainer || !totalListaEspecifica || !lista || !lista.itens) {
            if (itensListaEspecificaContainer) itensListaEspecificaContainer.innerHTML = '<p>Erro ao carregar itens.</p>';
            if (totalListaEspecifica) totalListaEspecifica.textContent = '0.00';
            return;
        }
        itensListaEspecificaContainer.innerHTML = '';
        let totalValorComprado = 0;
        if (lista.itens.length === 0) {
            itensListaEspecificaContainer.innerHTML = '<p>Nenhum item nesta lista. Adicione itens do catálogo ou manualmente!</p>';
        } else {
            lista.itens.forEach((item, index) => {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'item-da-lista' + (item.comprado ? ' comprado' : '');
                const precoNumerico = parseFloat(item.preco) || 0;
                const qtdNumerica = parseInt(item.qtd) || 1;
                const precoTotalItem = precoNumerico * qtdNumerica;
                if (item.comprado) {
                    totalValorComprado += precoTotalItem;
                }
                itemDiv.innerHTML = `
                    <input type="checkbox" class="item-checkbox-comprado" ${item.comprado ? 'checked' : ''}>
                    <div class="item-info-container">
                        <span class="item-nome">${item.nome}</span>
                        <span class="item-preco-unitario">R$ ${precoNumerico.toFixed(2)}/un</span>
                    </div>
                    <div class="item-quantidade-controles-inline">
                        <button class="btn-qtd-inline diminuir-qtd-item" aria-label="Diminuir quantidade">-</button>
                        <span class="qtd-inline-display">${qtdNumerica}</span>
                        <button class="btn-qtd-inline aumentar-qtd-item" aria-label="Aumentar quantidade">+</button>
                    </div>
                    <span class="item-preco-total">R$ ${precoTotalItem.toFixed(2)}</span>
                    <button class="item-acao-editar-preco" aria-label="Editar preço do item ${item.nome}"><i class="fas fa-edit"></i></button>
                `;
                itemDiv.querySelector('.item-checkbox-comprado').addEventListener('change', (e) => toggleComprado(lista.id, index, e.target.checked));
                itemDiv.querySelector('.diminuir-qtd-item').addEventListener('click', () => ajustarQuantidadeItem(lista.id, index, -1));
                itemDiv.querySelector('.aumentar-qtd-item').addEventListener('click', () => ajustarQuantidadeItem(lista.id, index, 1));
                itemDiv.querySelector('.item-acao-editar-preco').addEventListener('click', () => openItemModal('edit', lista.id, null, index));
                itemDiv.querySelector('.item-info-container').addEventListener('click', () => openItemModal('edit', lista.id, null, index));
                itensListaEspecificaContainer.appendChild(itemDiv);
            });
        }
        totalListaEspecifica.textContent = totalValorComprado.toFixed(2);
    }
    function renderizarBotoesCategoriaCatalogo() {
        if (!catalogoCategoriasAbasContainer || !shoppingListData) return;
        catalogoCategoriasAbasContainer.innerHTML = '';
        const btnTodos = document.createElement('button');
        btnTodos.className = 'aba-categoria';
        btnTodos.textContent = 'Todos';
        btnTodos.setAttribute('data-categoria', 'Todos');
        if (categoriaCatalogoAtiva === 'Todos') btnTodos.classList.add('active');
        btnTodos.addEventListener('click', () => {
            categoriaCatalogoAtiva = 'Todos';
            if (catalogoSearchInput) catalogoSearchInput.value = '';
            renderizarBotoesCategoriaCatalogo();
            renderizarProdutosCatalogo();
        });
        catalogoCategoriasAbasContainer.appendChild(btnTodos);
        shoppingListData.forEach(cat => {
            const btnCat = document.createElement('button');
            btnCat.className = 'aba-categoria';
            btnCat.textContent = cat.category;
            btnCat.setAttribute('data-categoria', cat.category);
            if (cat.category === categoriaCatalogoAtiva) btnCat.classList.add('active');
            btnCat.addEventListener('click', () => {
                categoriaCatalogoAtiva = cat.category;
                if (catalogoSearchInput) catalogoSearchInput.value = '';
                renderizarBotoesCategoriaCatalogo();
                renderizarProdutosCatalogo();
            });
            catalogoCategoriasAbasContainer.appendChild(btnCat);
        });
    }
    function renderizarProdutosCatalogo(termoBusca = "") {
        if (!catalogoProdutosListaContainer || !shoppingListData) {
            if (catalogoProdutosListaContainer) catalogoProdutosListaContainer.innerHTML = '<p>Erro.</p>';
            return;
        }
        catalogoProdutosListaContainer.innerHTML = '';
        termoBusca = termoBusca.toLowerCase().trim();
        let itensParaMostrar = [];
        if (categoriaCatalogoAtiva === 'Todos') {
            shoppingListData.forEach(cat => {
                cat.items.forEach(itemNome => {
                    if (itemNome.toLowerCase().includes(termoBusca)) {
                        itensParaMostrar.push({
                            nome: itemNome,
                            categoria: cat.category
                        });
                    }
                });
            });
        } else {
            const categoriaObj = shoppingListData.find(cat => cat.category === categoriaCatalogoAtiva);
            if (categoriaObj) {
                categoriaObj.items.forEach(itemNome => {
                    if (itemNome.toLowerCase().includes(termoBusca)) {
                        itensParaMostrar.push({
                            nome: itemNome,
                            categoria: categoriaObj.category
                        });
                    }
                });
            }
        }
        if (itensParaMostrar.length === 0) {
            catalogoProdutosListaContainer.innerHTML = '<p>Nenhum produto encontrado.</p>';
            return;
        }
        itensParaMostrar.forEach(produto => {
            const itemLinha = document.createElement('div');
            itemLinha.className = 'produto-catalogo-item-linha';
            itemLinha.innerHTML = `
                <div class="produto-catalogo-imagem-placeholder"><i class="fas fa-shopping-basket"></i></div>
                <div class="produto-catalogo-info"><h4>${produto.nome}</h4></div>
                <div class="produto-catalogo-acoes">
                    <button class="btn-qtd menos" aria-label="Diminuir" style="visibility: hidden;">-</button>
                    <span class="qtd-display" style="visibility: hidden;">1</span>
                    <button class="btn-qtd mais" aria-label="Aumentar" style="visibility: hidden;">+</button>
                </div>`;
            itemLinha.addEventListener('click', () => {
                if (currentOpenListId !== null) {
                    openItemModal('add', currentOpenListId, {
                        nome: produto.nome
                    });
                } else {
                    alert("Selecione ou crie uma lista em 'Minhas Listas' primeiro.");
                    showView('minhas-listas');
                }
            });
            catalogoProdutosListaContainer.appendChild(itemLinha);
        });
    }
    function renderizarResumoDaCompra() {
        const resumoConteudoDiv = document.getElementById('resumo-conteudo');
        if (!resumoConteudoDiv) return;
        if (currentOpenListId === null) {
            resumoConteudoDiv.innerHTML = '<p class="mensagem-sem-lista">Nenhuma lista selecionada.</p>';
            return;
        }
        const lista = minhasTodasAsListas.find(l => l.id === currentOpenListId);
        if (!lista) {
            resumoConteudoDiv.innerHTML = '<p class="mensagem-sem-lista">Lista não encontrada.</p>';
            return;
        }
        let totalValorComprado = 0;
        let totalUnidadesCompradas = 0;
        let numeroTiposDeItensComprados = 0;
        if (lista.itens) {
            lista.itens.forEach(item => {
                if (item.comprado) {
                    numeroTiposDeItensComprados++;
                    const precoNumerico = parseFloat(item.preco) || 0;
                    const qtdNumerica = parseInt(item.qtd) || 1;
                    totalValorComprado += precoNumerico * qtdNumerica;
                    totalUnidadesCompradas += qtdNumerica;
                }
            });
        }
        resumoConteudoDiv.innerHTML = `
            <p class="nome-lista-resumo">Resumo da Lista (Itens Comprados): ${lista.nome}</p>
            <div class="detalhe-resumo"><span>Tipos de Produtos Comprados:</span><span>${numeroTiposDeItensComprados}</span></div>
            <div class="detalhe-resumo"><span>Total de Unidades Compradas:</span><span>${totalUnidadesCompradas}</span></div>
            <div class="detalhe-resumo grand-total-resumo"><span>Valor Total dos Comprados:</span><span>R$ ${totalValorComprado.toFixed(2)}</span></div>`;
    }
    async function criarNovaLista() {
        const nomeNovaLista = prompt("Qual o nome da nova lista?");
        if (nomeNovaLista && nomeNovaLista.trim() !== "") {
            try {
                const novaLista = {
                    nome: nomeNovaLista.trim(),
                    itens: [],
                    ultimaModificacao: new Date().toISOString()
                };
                const docRef = await listasCollection.add(novaLista);
                console.log("Lista criada com ID: ", docRef.id);
                abrirListaEspecifica(docRef.id);
            } catch (error) {
                console.error("Erro ao criar lista: ", error);
                alert("Falha ao criar a lista.");
            }
        }
    }
    async function apagarLista(listaId) {
        const lista = minhasTodasAsListas.find(l => l.id === listaId);
        if (!lista) return;
        if (confirm(`Tem certeza que deseja apagar a lista "${lista.nome}"?`)) {
            try {
                await listasCollection.doc(listaId).delete();
                console.log("Lista apagada com sucesso!");
                if (currentOpenListId === listaId) {
                    currentOpenListId = null;
                    showView('minhas-listas');
                }
            } catch (error) {
                console.error("Erro ao apagar lista: ", error);
                alert("Falha ao apagar a lista.");
            }
        }
    }
    async function editarNomeLista(listaId) {
        const lista = minhasTodasAsListas.find(l => l.id === listaId);
        if (!lista) return;
        const novoNome = prompt("Digite o novo nome para a lista:", lista.nome);
        if (novoNome && novoNome.trim() !== "" && novoNome.trim() !== lista.nome) {
            try {
                await listasCollection.doc(listaId).update({
                    nome: novoNome.trim(),
                    ultimaModificacao: new Date().toISOString()
                });
                console.log("Nome da lista atualizado!");
            } catch (error) {
                console.error("Erro ao editar nome da lista: ", error);
                alert("Falha ao editar nome da lista.");
            }
        }
    }
    async function salvarItem(event) {
        event.preventDefault();
        const listId = modalItemListIdInput.value;
        const itemIndexStr = modalItemIndexInput.value;
        const nome = itemNomeDisplayInput.value.trim();
        const preco = parseFloat(itemPrecoInput.value);
        if (!nome) {
            alert("O nome do produto é necessário.");
            return;
        }
        if (isNaN(preco) || preco < 0) {
            alert("Por favor, digite um preço válido.");
            return;
        }
        const lista = minhasTodasAsListas.find(l => l.id === listId);
        if (!lista) {
            alert("Lista não encontrada!");
            closeItemModal();
            return;
        }
        const novosItens = [...lista.itens];
        if (itemIndexStr !== '') {
            const itemIndex = parseInt(itemIndexStr);
            if (novosItens[itemIndex] !== undefined) {
                novosItens[itemIndex].preco = preco;
            } else {
                alert("Erro ao encontrar o item para editar.");
                return;
            }
        } else {
            const itemJaExistente = novosItens.find(i => i.nome.toLowerCase() === nome.toLowerCase());
            if (itemJaExistente) {
                alert(`"${nome}" já está na sua lista. Você pode editar o item existente.`);
            } else {
                novosItens.push({
                    nome: nome,
                    qtd: 1,
                    preco: preco,
                    comprado: false
                });
            }
        }
        try {
            await listasCollection.doc(listId).update({
                itens: novosItens,
                ultimaModificacao: new Date().toISOString()
            });
            console.log("Item salvo com sucesso!");
            closeItemModal();
        } catch (error) {
            console.error("Erro ao salvar item: ", error);
            alert("Falha ao salvar o item.");
        }
    }
    async function apagarItemDaLista(listId, itemIndex) {
        const lista = minhasTodasAsListas.find(l => l.id === listId);
        if (!lista || lista.itens[itemIndex] === undefined) return;
        if (confirm(`Tem certeza que deseja apagar o item "${lista.itens[itemIndex].nome}"?`)) {
            const novosItens = [...lista.itens];
            novosItens.splice(itemIndex, 1);
            try {
                await listasCollection.doc(listId).update({
                    itens: novosItens,
                    ultimaModificacao: new Date().toISOString()
                });
                console.log("Item apagado com sucesso!");
            } catch (error) {
                console.error("Erro ao apagar item: ", error);
                alert("Falha ao apagar item.");
            }
        }
    }
    async function toggleComprado(listId, itemIndex, estadoComprado) {
        const lista = minhasTodasAsListas.find(l => l.id === listId);
        if (!lista || lista.itens[itemIndex] === undefined) return;
        const novosItens = [...lista.itens];
        novosItens[itemIndex].comprado = estadoComprado;
        try {
            await listasCollection.doc(listId).update({
                itens: novosItens,
                ultimaModificacao: new Date().toISOString()
            });
            console.log("Status de 'comprado' atualizado.");
        } catch (error) {
            console.error("Erro ao atualizar item: ", error);
            alert("Falha ao atualizar o item.");
        }
    }
    async function ajustarQuantidadeItem(listId, itemIndex, delta) {
        const lista = minhasTodasAsListas.find(l => l.id === listId);
        if (!lista || lista.itens[itemIndex] === undefined) return;
        const novosItens = [...lista.itens];
        let qtdAtual = parseInt(novosItens[itemIndex].qtd) || 1;
        qtdAtual += delta;
        if (qtdAtual >= 1) {
            novosItens[itemIndex].qtd = qtdAtual;
        } else {
            novosItens[itemIndex].qtd = 1;
        }
        try {
            await listasCollection.doc(listId).update({
                itens: novosItens,
                ultimaModificacao: new Date().toISOString()
            });
            console.log("Quantidade atualizada.");
        } catch (error) {
            console.error("Erro ao ajustar quantidade: ", error);
            alert("Falha ao ajustar quantidade.");
        }
    }
    function abrirListaEspecifica(listaId) {
        const lista = minhasTodasAsListas.find(l => l.id === listaId);
        if (lista) {
            currentOpenListId = listaId;
            if (tituloListaEspecifica) tituloListaEspecifica.textContent = lista.nome;
            renderizarItensDaLista(lista);
            showView('lista-especifica');
        } else {
            showView('minhas-listas');
        }
    }
    function openItemModal(mode, listId, itemDataForAdd = null, itemIndexForEdit = null) {
        if (!itemModal || !itemForm || !itemNomeDisplayInput || !itemPrecoInput || !modalTitle || !removerItemModalBtn) return;
        itemForm.reset();
        modalItemListIdInput.value = listId;
        itemNomeDisplayInput.readOnly = false;
        removerItemModalBtn.style.display = 'none';
        if (mode === 'add') {
            modalItemIndexInput.value = '';
            if (itemDataForAdd && typeof itemDataForAdd.nome === 'string') {
                itemNomeDisplayInput.value = itemDataForAdd.nome;
                itemNomeDisplayInput.readOnly = true;
                modalTitle.textContent = `Adicionar: ${itemDataForAdd.nome}`;
            } else {
                itemNomeDisplayInput.value = '';
                itemNomeDisplayInput.readOnly = false;
                modalTitle.textContent = 'Adicionar Novo Item Manualmente';
            }
            itemPrecoInput.value = "0.00";
        } else if (mode === 'edit' && itemIndexForEdit !== null) {
            const lista = minhasTodasAsListas.find(l => l.id === listId);
            if (lista && lista.itens && lista.itens[itemIndexForEdit]) {
                const item = lista.itens[itemIndexForEdit];
                modalTitle.textContent = `Editando Preço: ${item.nome}`;
                itemNomeDisplayInput.value = item.nome;
                itemNomeDisplayInput.readOnly = true;
                itemPrecoInput.value = (parseFloat(item.preco) || 0).toFixed(2);
                modalItemIndexInput.value = itemIndexForEdit;
                removerItemModalBtn.style.display = 'inline-block';
            } else {
                return;
            }
        }
        itemModal.style.display = 'flex';
        itemPrecoInput.focus();
    }
    function closeItemModal() {
        if (itemModal) itemModal.style.display = 'none';
    }
    function showView(viewIdToShow) {
        for (const viewId in views) {
            if (views[viewId]) views[viewId].style.display = 'none';
        }
        const viewElement = views[viewIdToShow];
        if (viewElement) {
            viewElement.style.display = 'block';
            if (viewIdToShow === 'minhas-listas') {
                renderizarListas();
            } else if (viewIdToShow === 'lista-especifica') {
                const lista = minhasTodasAsListas.find(l => l.id === currentOpenListId);
                if (lista) renderizarItensDaLista(lista);
                else showView('minhas-listas');
            } else if (viewIdToShow === 'adicionar-produto') {
                renderizarBotoesCategoriaCatalogo();
                renderizarProdutosCatalogo(catalogoSearchInput ? catalogoSearchInput.value : "");
            } else if (viewIdToShow === 'resumo-compra') {
                renderizarResumoDaCompra();
            }
        } else {
            showView('minhas-listas');
        }
        navButtons.forEach(button => {
            const buttonView = button.getAttribute('data-view');
            let isActive = (buttonView === viewIdToShow);
            if (viewIdToShow === 'lista-especifica' && buttonView === 'minhas-listas') {
                isActive = true;
            }
            button.classList.toggle('active', isActive);
        });
    }

    if (fabCriarLista) fabCriarLista.addEventListener('click', criarNovaLista);
    if (itemForm) itemForm.addEventListener('submit', salvarItem);
    if (cancelItemBtn) cancelItemBtn.addEventListener('click', closeItemModal);
    if (removerItemModalBtn) {
        removerItemModalBtn.addEventListener('click', () => {
            const listId = modalItemListIdInput.value;
            const itemIndex = modalItemIndexInput.value !== '' ? parseInt(modalItemIndexInput.value) : null;
            if (listId && itemIndex !== null) {
                apagarItemDaLista(listId, itemIndex);
            }
            closeItemModal();
        });
    }
    if (fabBuscarNoCatalogoBtn) {
        fabBuscarNoCatalogoBtn.addEventListener('click', () => {
            if (currentOpenListId !== null) {
                showView('adicionar-produto');
            } else {
                alert("Abra uma lista primeiro para adicionar itens do catálogo.");
                showView('minhas-listas');
            }
        });
    }
    if (catalogoAdicionarItemManualBtn) {
        catalogoAdicionarItemManualBtn.addEventListener('click', () => {
            if (currentOpenListId !== null) {
                openItemModal('add', currentOpenListId, null);
            } else {
                alert("Para adicionar um item manual, primeiro abra ou crie uma lista em 'Minhas Listas'.");
                showView('minhas-listas');
            }
        });
    }
    if (configApagarDadosBtn) {
        configApagarDadosBtn.addEventListener('click', function() {
            if (confirm("TEM CERTEZA?\nTODAS as suas listas serão apagadas para sempre.")) {
                if (confirm("CONFIRMAÇÃO FINAL:\nRealmente apagar todas as suas listas? Esta ação não pode ser desfeita.")) {
                    listasCollection.get().then(querySnapshot => {
                        const batch = db.batch();
                        querySnapshot.forEach(doc => {
                            batch.delete(doc.ref);
                        });
                        return batch.commit();
                    }).then(() => {
                        alert("Todas as suas listas foram apagadas!");
                    }).catch(error => {
                        console.error("Erro ao apagar todos os dados: ", error);
                        alert("Falha ao apagar os dados.");
                    });
                }
            }
        });
    }
    if (configSobreAppBtn) {
        configSobreAppBtn.addEventListener('click', () => alert("Salva Compras v2.0 (com Login!)\nSeu app de listas na nuvem!"));
    }

    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const viewIdToNavigate = this.getAttribute('data-view');
            if (viewIdToNavigate === 'minhas-listas') {
                currentOpenListId = null;
            }
            showView(viewIdToNavigate);
        });
    });

    // Inicia o app na tela principal (se o usuário estiver logado)
    showView('minhas-listas');
}