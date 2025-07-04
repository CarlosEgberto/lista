// FUNÇÕES AJUDANTES E DADOS GLOBAIS
function removerAcentos(texto) {
    if (!texto) return "";
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

const shoppingListData = [
    { category: "Açougue", icon: "fas fa-drumstick-bite", items: ["Açém", "Alcatra", "Bacon", "Calabresa", "Carne de Frango", "Carne de Porco", "Carne moída", "Carré", "Costela", "Costela Bovina", "Costela de Boi", "Costela Ovina", "Costela Suína", "Coxa", "Coxa de Frango", "Filé de Coxa", "Filé de Peito", "Filé Mignon", "Filé Mignon Suíno", "Guisado", "Lagarto bovino", "Linguiça", "Linguicinha", "Paleta de Cordeiro", "Patinho", "Peito de Frango", "Pernil", "Peru", "Picanha", "salsicha", "Salsichão", "Sobrecoxa"] },
    { category: "Aperitivos", icon: "fas fa-cookie-bite", items: ["Amendoim", "Batata Palha", "Milho para pipoca", "Tapioca"] },
    { category: "Bebidas", icon: "fas fa-wine-glass-alt", items: ["Água", "Água Mineral C/ Gás", "Achocolatado", "Cacau em pó", "Cachaça", "Café", "Cerveja", "Cerveja Preta", "Champagne", "Chá", "Chá Gelado", "Coca-Cola", "Espumante", "Fanta", "Guaraná", "Pepsi", "Refrigerante", "Sprite", "Suco", "Vinho Branco", "Vinho Rosé", "Vinho Tinto", "Vodka", "Whisky"] },
    { category: "Congelados", icon: "fas fa-snowflake", items: ["Almôndega", "Batatas pré-fritas", "Batata Rosti", "Hambúrguer", "Lasanha", "Pizza Pronta", "Sorvete"] },
    { category: "Doces", icon: "fas fa-candy-cane", items: ["Balas", "Chicletes", "Chocolates", "Doce de Amendoim", "Doce de Leite", "BomBom", "Paçoca", "Pastilhas"] },
    { category: "Enlatados", icon: "fas fa-archive", items: ["Atum em lata", "Azeitona", "Cogumelo", "Creme de Leite", "Ervilha em Lata", "Leite Condensado", "Milho em Lata", "Salsicha em Lata", "Sardinhas"] },
    { category: "Frutas", icon: "fas fa-apple-alt", items: ["Abacate", "Banana", "Jambo", "Kiwi", "Laranja", "Limão", "Maçã", "Mamão", "Manga", "Melancia", "Melão", "Morango", "Pera", "Tangerina", "Uva"] },
    { category: "Higiene", icon: "fas fa-pump-soap", items: ["Absorvente", "Acetona", "Algodão", "Bronzeador", "Condicionador", "Cotonete", "Creme Dental", "Desodorante rollon", "Creme p/ o Rosto", "Desodorante Spray", "Enxaguante Bucal", "Escova Dental", "Fio Dental", "Papel Higienico", "Pasta de dentes", "Prestobarba", "Protetor Solar", "Sabonete", "Shampoo", "Talco p/ Pé"] },
    { category: "Lanche", icon: "fas fa-hamburger", items: ["Biscoito", "Bolos", "Capuchino", "Cereais", "Doces e compotas", "Doces pastosos", "Geleias", "Massa de pastel", "Mel"] },
    { category: "Laticínios ou Ovos", icon: "fas fa-cheese", items: ["Danone", "Embutidos", "Iogurte", "Leite integral", "Leite Desnatado", "Leite de Coco", "Leite em pó", "Manteiga", "Margarina", "Ovo", "Queijo", "Queijo ralado", "Requeijao", "Salame", "Yakult"] },
    { category: "Legumes e Verduras", icon: "fas fa-carrot", items: ["Abóbora", "Agrião", "Aipim", "Alface", "Batata Doce", "Batata Inglesa", "Beterraba", "Brócolis", "Cenoura", "Chuchu", "Couve", "Couve-Flor", "Jiló", "Mostarda", "Pepino", "Repolho", "Tomate", "Vagem"] },
    { category: "Mercearia", icon: "fas fa-shopping-basket", items: ["Açúcar", "Adoçante", "Amido de milho", "Arroz", "Aveia", "Azeite de oliva", "Café em Pó", "Canjica", "Chocolate", "Ervilha", "Espaguete", "Extrato de tomate", "Farinha de Aveia", "Farinha de mandioca", "Farinha de Milho", "Farinha de rosca", "Farinha de trigo", "Farofa", "Feijão", "Fécula", "Fermento", "Grão-de-bico", "Lentilha", "Macarrão", "Milho verde", "Molho", "Molho de tomate", "Molho inglês", "Nescafé", "Nescau", "Óleo", "Palmito", "Penne", "Polvilho", "Vinagre"] },
    { category: "Padaria", icon: "fas fa-bread-slice", items: ["Biscoito", "Croissant", "Filtro de Café", "Pão", "Pão de forma", "Pão de Milho", "Pão de queijo", "Pão de Sanduíche", "Pão Doce", "Pão p/ cachorro-quente", "Pão p/ Hamburguer", "Pão Sovado", "Torta"] },
    { category: "Peixes e Frutos do Mar", icon: "fas fa-fish", items: ["Bacalhau", "Camarão", "Filé de merluza", "Filé de Peixe", "Lagosta", "Lula", "Mexilhão", "Ostra", "Pescada", "Pintado", "Polvo", "Sardinha", "Tainha", "Traíra"] },
    { category: "Produtos de Limpeza", icon: "fas fa-broom", items: ["Álcool Gel", "Álcool Liquido", "Amaciante", "Arpic", "Bacia", "Balde", "Bombril", "Buchinha", "Cera em Pasta", "Cera Liquida", "Cheirinho de Chão", "Cif", "Cloro", "Cloro Ativo", "Desengordurante", "Desinfetante", "Desodorizante", "Detergente", "Esfregão de Aço", "Esponja", "Fósforo", "Inseticida", "Jóia Líquida", "Limpa Vidro", "Luva de Borracha", "Lustra Moveis", "Lustra Piso", "Lustra Vidro", "Pano de Limpeza", "Pato", "Pó de Limpeza", "Rodo", "Sabão em Barra", "Sabão em Pó", "Sabão Liquido", "Soda Cáustica", "Vassoura", "Vassoura de Vaso Sanitário", "Veja"] },
    { category: "Queijos", icon: "fas fa-cheese", items: ["Brie", "Cheddar", "Mussarela", "Parmesão", "Provolone", "Roquefort", "Prato"] },
    { category: "Refeições rápidas", icon: "fas fa-pizza-slice", items: ["Empanados", "Massas prontas", "Meu menu"] },
    { category: "Sobremesas", icon: "fas fa-birthday-cake", items: ["Calda para sorvete", "Frutas em calda", "Gelatina cristalizada", "Mousse", "Pudim"] },
    { category: "Temperos", icon: "fas fa-pepper-hot", items: ["Açafrão", "Alho", "Caldo de aves", "Caldo de Carne", "Caldo de legumes", "Canela", "Canela em pau", "Cebola", "Cebolinha", "Coentro", "Colorau", "Cominho", "Cravo-da-Índia", "Curry", "Ketchup", "Louro", "Maionese", "Molho de Galinha", "Molho de Mostarda", "Mostarda", "Noz-moscada", "Oregano", "Paprica Defumada", "Paprica Doce", "Pimenta", "Pimenta Malagueta", "Pimenta Vermelha", "Pimenta-do-Reino", "Pimentão", "Sal", "Salsa", "Sazon", "Shoyu", "Vinagre"] },
    { category: "Outros", icon: "fas fa-box", items: ["Alum. Ralado", "Beterraba p/ Galo", "Comida p/ Cachorro", "Comida p/ Galinha", "Comida p/ Pássaro", "Comida p/ Peixe", "Copos Descartáveis", "Corante alimenticio", "Guardanapo de Papel", "Lâmpada", "Papel Alumínio", "Pilha", "Toalha", "Vela"] }
];

// LÓGICA DE AUTENTICAÇÃO
auth.onAuthStateChanged(user => {
    const isLoginPage = window.location.pathname.includes('login.html');
    if (user && !isLoginPage) {
        initializeApp(user);
    } else if (!user && !isLoginPage) {
        window.location.href = 'login.html';
    }
});

async function fetchAndCacheImageUrl(productName) {
    const docId = removerAcentos(productName.toLowerCase()).replace(/[^a-z0-9]+/g, '-');

    try {
        const doc = await productImagesCollection.doc(docId).get();
        if (doc.exists) {
            return doc.data().url;
        }

        // NOVO: Chama o nosso intermediário seguro em vez da API do Google
        const response = await fetch(`/api/search-images?q=${encodeURIComponent(productName)}`);

        if (!response.ok) {
            console.error("Erro ao chamar nosso API de imagem.");
            return null;
        }

        const data = await response.json();
        const imageUrl = data.imageUrl;

        if (imageUrl) {
            await productImagesCollection.doc(docId).set({ url: imageUrl });
        }
        return imageUrl;

    } catch (error) {
        console.error("Erro na função fetchAndCacheImageUrl:", error);
        return null;
    }
}

// FUNÇÃO PRINCIPAL DO APP
function initializeApp(user) {
    const listasCollection = db.collection('users').doc(user.uid).collection('minhasListas');

    // Todas as referências a elementos do DOM
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
    const configSairBtn = document.getElementById('config-sair');

    let minhasTodasAsListas = [];
    let currentOpenListId = null;
    let categoriaCatalogoAtiva = 'Todos';
    let toastTimer;

    if (loadingIndicator) loadingIndicator.classList.add('show');

    listasCollection.orderBy("ultimaModificacao", "desc").onSnapshot(snapshot => {
        if (loadingIndicator) loadingIndicator.classList.remove('show');
        minhasTodasAsListas = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const activeViewEl = Object.values(views).find(view => view && view.style.display === 'block');
        const activeViewId = activeViewEl ? activeViewEl.id : 'view-minhas-listas';

        if (activeViewId === 'view-minhas-listas') renderizarListas();
        else if (activeViewId === 'view-lista-especifica' && currentOpenListId) {
            const listaAberta = minhasTodasAsListas.find(l => l.id === currentOpenListId);
            if (listaAberta) renderizarItensDaLista(listaAberta);
            else { currentOpenListId = null; showView('minhas-listas'); }
        } else if (activeViewId === 'view-resumo-compra') renderizarResumoDaCompra();
    }, error => {
        if (loadingIndicator) loadingIndicator.classList.remove('show');
        console.error("Erro ao buscar listas: ", error);
    });

    if (configSairBtn) configSairBtn.addEventListener('click', () => {
        if (confirm('Tem certeza que deseja sair?')) auth.signOut();
    });

    function showToast(message) {
        const toastEl = document.getElementById('toast-notification');
        if (!toastEl) return;
        clearTimeout(toastTimer);
        toastEl.textContent = message;
        toastEl.classList.add('show');
        toastTimer = setTimeout(() => {
            toastEl.classList.remove('show');
        }, 3000);
    }

    async function adicionarItemDoCatalogo(produto) {
        if (!currentOpenListId) {
            alert("Selecione ou crie uma lista primeiro.");
            showView('minhas-listas');
            return;
        }
        const lista = minhasTodasAsListas.find(l => l.id === currentOpenListId);
        if (!lista) return;

        if (lista.itens.find(i => i.nome.toLowerCase() === produto.nome.toLowerCase())) {
            showToast(`"${produto.nome}" já está na sua lista.`);
            return;
        }

        const novosItens = [...lista.itens, { nome: produto.nome, qtd: 1, preco: 0.00, comprado: false }];
        try {
            await listasCollection.doc(currentOpenListId).update({ itens: novosItens, ultimaModificacao: new Date().toISOString() });
            showToast(`"${produto.nome}" adicionado à lista!`);
        } catch (error) { console.error("Erro ao adicionar item: ", error); }
    }

    function renderizarProdutosCatalogo(termoBusca = "") {
        if (!catalogoProdutosListaContainer) return;
        catalogoProdutosListaContainer.innerHTML = '';
        termoBusca = removerAcentos(termoBusca.toLowerCase().trim());
        let itensParaMostrar = [];
        shoppingListData.forEach(cat => {
            if (categoriaCatalogoAtiva === 'Todos' || categoriaCatalogoAtiva === cat.category) {
                cat.items.forEach(itemNome => {
                    if (removerAcentos(itemNome.toLowerCase()).includes(termoBusca)) {
                        itensParaMostrar.push({ nome: itemNome });
                    }
                });
            }
        });

        if (itensParaMostrar.length === 0) {
            catalogoProdutosListaContainer.innerHTML = '<p>Nenhum produto encontrado.</p>';
            return;
        }

        itensParaMostrar.forEach(produto => {
            const itemLinha = document.createElement('div');
            itemLinha.className = 'produto-catalogo-item-linha';
            const placeholderId = `img-placeholder-${removerAcentos(produto.nome).toLowerCase().replace(/ /g, '-')}`;

            itemLinha.innerHTML = `
                <div class="produto-catalogo-imagem-placeholder" id="${placeholderId}">
                    <i class="fas fa-spinner fa-spin"></i>
                </div>
                <div class="produto-catalogo-info"><h4>${produto.nome}</h4></div>`;
            itemLinha.addEventListener('click', () => adicionarItemDoCatalogo(produto));
            catalogoProdutosListaContainer.appendChild(itemLinha);

            fetchAndCacheImageUrl(produto.nome).then(imageUrl => {
                const placeholderDiv = document.getElementById(placeholderId);
                if (placeholderDiv) {
                    placeholderDiv.innerHTML = imageUrl ? `<img src="${imageUrl}" alt="${produto.nome}" loading="lazy">` : `<i class="fas fa-image"></i>`;
                }
            });
        });
    }

    function renderizarBotoesCategoriaCatalogo() {
        if (!catalogoCategoriasAbasContainer) return;
        catalogoCategoriasAbasContainer.innerHTML = '';

        const categorias = ['Todos', ...shoppingListData.map(c => c.category)];

        categorias.forEach(nomeCategoria => {
            const btnCat = document.createElement('button');
            btnCat.className = 'aba-categoria';

            if (nomeCategoria === 'Todos') {
                btnCat.innerHTML = `<i class="fas fa-grip-horizontal"></i> Todos`;
            } else {
                const categoriaInfo = shoppingListData.find(c => c.category === nomeCategoria);
                btnCat.innerHTML = `<i class="${categoriaInfo.icon || 'fas fa-tag'}"></i> ${nomeCategoria}`;
            }

            if (nomeCategoria === categoriaCatalogoAtiva) {
                btnCat.classList.add('active');
            }

            btnCat.addEventListener('click', () => {
                categoriaCatalogoAtiva = nomeCategoria;
                if (catalogoSearchInput) catalogoSearchInput.value = '';
                renderizarBotoesCategoriaCatalogo();
                renderizarProdutosCatalogo();
            });
            catalogoCategoriasAbasContainer.appendChild(btnCat);
        });
    }

    function showView(viewIdToShow) {
        Object.values(views).forEach(v => { if (v) v.style.display = 'none' });
        if (views[viewIdToShow]) views[viewIdToShow].style.display = 'block';
        else views['minhas-listas'].style.display = 'block';

        if (viewIdToShow === 'adicionar-produto') { renderizarBotoesCategoriaCatalogo(); renderizarProdutosCatalogo(); }
        else if (viewIdToShow === 'resumo-compra') renderizarResumoDaCompra();
        else if (viewIdToShow === 'minhas-listas') renderizarListas();

        navButtons.forEach(b => {
            let isActive = b.getAttribute('data-view') === viewIdToShow;
            if (viewIdToShow === 'lista-especifica' && b.getAttribute('data-view') === 'minhas-listas') isActive = true;
            b.classList.toggle('active', isActive);
        });
    }

    function renderizarListas() {
        if (!listasCardsContainer) return;
        listasCardsContainer.innerHTML = '';
        if (minhasTodasAsListas.length === 0) {
            listasCardsContainer.innerHTML = '<p>Nenhuma lista criada ainda. Clique no + para criar uma!</p>';
            return;
        }
        minhasTodasAsListas.forEach((lista, index) => {
            const cartao = document.createElement('div');
            cartao.className = 'cartao-lista';
            const corIndex = (index % 4) + 1;
            cartao.classList.add(`borda-cor-${corIndex}`);
            cartao.setAttribute('data-lista-id', lista.id);
            const numItens = lista.itens ? lista.itens.length : 0;
            const dataModificacao = lista.ultimaModificacao ? new Date(lista.ultimaModificacao).toLocaleDateString('pt-BR') : '';
            cartao.innerHTML = `
                <div class="cartao-header">
                    <i class="fas fa-shopping-cart"></i>
                    <h3>${lista.nome}</h3>
                </div>
                <p>${numItens} itens</p>
                ${dataModificacao ? `<p class="card-data">Modificado em: ${dataModificacao}</p>` : ''}
                <div class="cartao-lista-acoes">
                    <button class="editar-lista-btn"><i class="fas fa-edit"></i></button>
                    <button class="apagar-lista-btn"><i class="fas fa-trash"></i></button>
                </div>`;
            cartao.querySelector('.editar-lista-btn').addEventListener('click', (e) => { e.stopPropagation(); editarNomeLista(lista.id); });
            cartao.querySelector('.apagar-lista-btn').addEventListener('click', (e) => { e.stopPropagation(); apagarLista(lista.id); });
            cartao.addEventListener('click', () => abrirListaEspecifica(lista.id));
            listasCardsContainer.appendChild(cartao);
        });
    }
    function renderizarItensDaLista(lista) {
        if (!itensListaEspecificaContainer || !totalListaEspecifica || !lista || !lista.itens) return;
        itensListaEspecificaContainer.innerHTML = '';
        let totalValorComprado = 0;
        if (lista.itens.length === 0) {
            itensListaEspecificaContainer.innerHTML = '<p>Nenhum item nesta lista.</p>';
        } else {
            lista.itens.forEach((item, index) => {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'item-da-lista' + (item.comprado ? ' comprado' : '');
                const precoNumerico = parseFloat(item.preco) || 0;
                const qtdNumerica = parseInt(item.qtd) || 1;
                const precoTotalItem = precoNumerico * qtdNumerica;
                if (item.comprado) totalValorComprado += precoTotalItem;
                itemDiv.innerHTML = `
                    <input type="checkbox" class="item-checkbox-comprado" ${item.comprado ? 'checked' : ''}>
                    <div class="item-info-container">
                        <span class="item-nome">${item.nome}</span>
                        <span class="item-preco-unitario">R$ ${precoNumerico.toFixed(2)}/un</span>
                    </div>
                    <div class="item-quantidade-controles-inline">
                        <button class="btn-qtd-inline diminuir-qtd-item">-</button>
                        <span class="qtd-inline-display">${qtdNumerica}</span>
                        <button class="btn-qtd-inline aumentar-qtd-item">+</button>
                    </div>
                    <span class="item-preco-total">R$ ${precoTotalItem.toFixed(2)}</span>
                    <button class="item-acao-editar-preco"><i class="fas fa-edit"></i></button>`;
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
    function renderizarResumoDaCompra() {
        const resumoConteudoDiv = document.getElementById('resumo-conteudo');
        if (!resumoConteudoDiv) return;
        const lista = currentOpenListId ? minhasTodasAsListas.find(l => l.id === currentOpenListId) : null;
        if (!lista) {
            resumoConteudoDiv.innerHTML = '<p class="mensagem-sem-lista">Abra uma lista para ver o resumo.</p>';
            return;
        }
        let totalValorComprado = 0, totalUnidadesCompradas = 0, numeroTiposDeItensComprados = 0;
        if (lista.itens) lista.itens.forEach(item => {
            if (item.comprado) {
                numeroTiposDeItensComprados++;
                totalValorComprado += (parseFloat(item.preco) || 0) * (parseInt(item.qtd) || 1);
                totalUnidadesCompradas += parseInt(item.qtd) || 1;
            }
        });
        resumoConteudoDiv.innerHTML = `
            <div class="nome-lista-resumo"><span>Resumo da Lista:</span><strong>${lista.nome}</strong></div>
            <div class="detalhe-resumo"><span>Tipos de Produtos Comprados:</span><strong class="valor-destaque">${numeroTiposDeItensComprados}</strong></div>
            <div class="detalhe-resumo"><span>Total de Unidades Compradas:</span><strong class="valor-destaque">${totalUnidadesCompradas}</strong></div>
            <div class="detalhe-resumo grand-total-resumo"><span>Valor Total dos Comprados:</span><strong>R$ ${totalValorComprado.toFixed(2)}</strong></div>`;
    }

    function openItemModal(mode, listId, itemDataForAdd = null, itemIndexForEdit = null) {
        if (!itemModal) return;
        itemForm.reset();
        modalItemListIdInput.value = listId;
        removerItemModalBtn.style.display = 'none';
        if (mode === 'add_manual') {
            modalItemIndexInput.value = '';
            itemNomeDisplayInput.value = '';
            itemNomeDisplayInput.readOnly = false;
            modalTitle.textContent = 'Adicionar Item Manualmente';
        } else if (mode === 'edit' && itemIndexForEdit !== null) {
            const lista = minhasTodasAsListas.find(l => l.id === listId);
            if (lista && lista.itens[itemIndexForEdit]) {
                const item = lista.itens[itemIndexForEdit];
                modalTitle.textContent = `Editando Preço: ${item.nome}`;
                itemNomeDisplayInput.value = item.nome;
                itemNomeDisplayInput.readOnly = true;
                itemPrecoInput.value = (parseFloat(item.preco) || 0).toFixed(2);
                modalItemIndexInput.value = itemIndexForEdit;
                removerItemModalBtn.style.display = 'inline-block';
            } else return;
        }
        itemModal.style.display = 'flex';
        if (mode === 'add_manual') itemNomeDisplayInput.focus();
        else itemPrecoInput.focus();
    }
    async function criarNovaLista() {
        const nomeNovaLista = prompt("Qual o nome da nova lista?");
        if (nomeNovaLista && nomeNovaLista.trim()) {
            try {
                const docRef = await listasCollection.add({ nome: nomeNovaLista.trim(), itens: [], ultimaModificacao: new Date().toISOString() });
                abrirListaEspecifica(docRef.id);
            } catch (error) { console.error("Erro ao criar lista: ", error); }
        }
    }
    async function apagarLista(listaId) {
        const lista = minhasTodasAsListas.find(l => l.id === listaId);
        if (!lista) return;
        if (confirm(`Apagar a lista "${lista.nome}"?`)) {
            try {
                await listasCollection.doc(listaId).delete();
                if (currentOpenListId === listaId) { currentOpenListId = null; showView('minhas-listas'); }
            } catch (error) { console.error("Erro ao apagar lista: ", error); }
        }
    }
    async function editarNomeLista(listaId) {
        const lista = minhasTodasAsListas.find(l => l.id === listaId);
        if (!lista) return;
        const novoNome = prompt("Novo nome para a lista:", lista.nome);
        if (novoNome && novoNome.trim() && novoNome.trim() !== lista.nome) {
            try { await listasCollection.doc(listaId).update({ nome: novoNome.trim(), ultimaModificacao: new Date().toISOString() }); } catch (error) { console.error("Erro ao editar nome: ", error); }
        }
    }
    async function salvarItem(event) {
        event.preventDefault();
        const listId = modalItemListIdInput.value, itemIndexStr = modalItemIndexInput.value, nome = itemNomeDisplayInput.value.trim(), preco = parseFloat(itemPrecoInput.value);
        if (!nome || isNaN(preco)) { alert("Preencha corretamente."); return; }
        const lista = minhasTodasAsListas.find(l => l.id === listId);
        if (!lista) { closeItemModal(); return; }
        const novosItens = [...lista.itens];
        if (itemIndexStr) {
            const idx = parseInt(itemIndexStr);
            if (novosItens[idx]) novosItens[idx].preco = preco; else return;
        } else {
            if (novosItens.find(i => i.nome.toLowerCase() === nome.toLowerCase())) { alert("Item já existe."); return; }
            novosItens.push({ nome, qtd: 1, preco, comprado: false });
        }
        try { await listasCollection.doc(listId).update({ itens: novosItens, ultimaModificacao: new Date().toISOString() }); closeItemModal(); } catch (error) { console.error("Erro ao salvar item: ", error); }
    }
    async function apagarItemDaLista(listId, itemIndex) {
        const lista = minhasTodasAsListas.find(l => l.id === listId);
        if (!lista || !lista.itens[itemIndex]) return;
        if (confirm(`Apagar "${lista.itens[itemIndex].nome}"?`)) {
            const novosItens = [...lista.itens];
            novosItens.splice(itemIndex, 1);
            try { await listasCollection.doc(listId).update({ itens: novosItens, ultimaModificacao: new Date().toISOString() }); } catch (error) { console.error("Erro ao apagar item: ", error); }
        }
    }
    async function toggleComprado(listId, itemIndex, estadoComprado) {
        const lista = minhasTodasAsListas.find(l => l.id === listId);
        if (!lista || !lista.itens[itemIndex]) return;
        const novosItens = [...lista.itens];
        novosItens[itemIndex].comprado = estadoComprado;
        try { await listasCollection.doc(listId).update({ itens: novosItens, ultimaModificacao: new Date().toISOString() }); } catch (error) { console.error("Erro ao atualizar item: ", error); }
    }
    async function ajustarQuantidadeItem(listId, itemIndex, delta) {
        const lista = minhasTodasAsListas.find(l => l.id === listId);
        if (!lista || !lista.itens[itemIndex]) return;
        const novosItens = [...lista.itens];
        novosItens[itemIndex].qtd = Math.max(1, (novosItens[itemIndex].qtd || 1) + delta);
        try { await listasCollection.doc(listId).update({ itens: novosItens, ultimaModificacao: new Date().toISOString() }); } catch (error) { console.error("Erro ao ajustar quantidade: ", error); }
    }
    function abrirListaEspecifica(listaId) {
        const lista = minhasTodasAsListas.find(l => l.id === listaId);
        if (lista) {
            currentOpenListId = listaId;
            if (tituloListaEspecifica) tituloListaEspecifica.textContent = lista.nome;
            renderizarItensDaLista(lista);
            showView('lista-especifica');
        } else showView('minhas-listas');
    }
    function closeItemModal() { if (itemModal) itemModal.style.display = 'none'; }

    // Event Listeners
    if (fabCriarLista) fabCriarLista.addEventListener('click', criarNovaLista);
    if (itemForm) itemForm.addEventListener('submit', salvarItem);
    if (cancelItemBtn) cancelItemBtn.addEventListener('click', closeItemModal);
    if (removerItemModalBtn) removerItemModalBtn.addEventListener('click', () => {
        const listId = modalItemListIdInput.value;
        const itemIndex = modalItemIndexInput.value ? parseInt(modalItemIndexInput.value, 10) : null;
        if (listId && itemIndex !== null) apagarItemDaLista(listId, itemIndex);
        closeItemModal();
    });
    if (fabBuscarNoCatalogoBtn) fabBuscarNoCatalogoBtn.addEventListener('click', () => {
        if (currentOpenListId) showView('adicionar-produto'); else { alert("Abra uma lista."); showView('minhas-listas'); }
    });
    if (catalogoAdicionarItemManualBtn) catalogoAdicionarItemManualBtn.addEventListener('click', () => {
        if (currentOpenListId) openItemModal('add_manual', currentOpenListId); else { alert("Abra ou crie uma lista."); showView('minhas-listas'); }
    });
    if (configApagarDadosBtn) configApagarDadosBtn.addEventListener('click', () => {
        if (confirm("Apagar TODAS as suas listas?")) if (confirm("AÇÃO IRREVERSÍVEL! Confirma?")) {
            listasCollection.get().then(qs => { const b = db.batch(); qs.forEach(d => b.delete(d.ref)); return b.commit(); }).then(() => alert("Listas apagadas!"))
                .catch(e => console.error("Erro ao apagar dados: ", e));
        }
    });
    if (configSobreAppBtn) configSobreAppBtn.addEventListener('click', () => alert("Salva Compras v3.0"));
    if (catalogoSearchInput) catalogoSearchInput.addEventListener('input', () => renderizarProdutosCatalogo(catalogoSearchInput.value));
    if (itemPrecoInput) {
        itemPrecoInput.addEventListener('focus', function () {
            this.select();
        });
    }

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const view = button.getAttribute('data-view');
            if (view === 'minhas-listas') currentOpenListId = null;
            showView(view);
        });
    });

    showView('minhas-listas');
}