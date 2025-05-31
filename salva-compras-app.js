// salva-compras-app.js

document.addEventListener('DOMContentLoaded', function() {

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

    let minhasTodasAsListas = []; // Será populado pelo localStorage
    let currentOpenListId = null;

    // ---- Funções de Persistência com localStorage ----
    function saveListsToLocalStorage() {
        localStorage.setItem('salvaCompras_todasListas', JSON.stringify(minhasTodasAsListas));
    }

    function loadListsFromLocalStorage() {
        const listasSalvas = localStorage.getItem('salvaCompras_todasListas');
        if (listasSalvas) {
            minhasTodasAsListas = JSON.parse(listasSalvas);
        } else {
            // Se não houver nada salvo, começa com um array vazio
            // Ou você pode adicionar algumas listas de exemplo para o primeiro uso:
            // minhasTodasAsListas = [
            //    { id: 1, nome: "Exemplo: Supermercado", itens: [], ultimaModificacao: new Date().toLocaleDateString('pt-BR') }
            // ];
            minhasTodasAsListas = [];
        }
    }

    // ---- Funções da Tela "Minhas Listas" ----
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

            let numItens = lista.itens ? lista.itens.length : 0;

            cartao.innerHTML = `
                <h3>${lista.nome}</h3>
                <p>${numItens} itens</p>
                <div class="cartao-lista-acoes">
                    <button class="editar-lista-btn" data-id="${lista.id}" aria-label="Editar nome da lista ${lista.nome}"><i class="fas fa-edit"></i></button>
                    <button class="apagar-lista-btn" data-id="${lista.id}" aria-label="Apagar lista ${lista.nome}"><i class="fas fa-trash"></i></button>
                </div>
            `;

            cartao.querySelector('.editar-lista-btn').addEventListener('click', (event) => {
                event.stopPropagation();
                editarNomeLista(lista.id);
            });
            cartao.querySelector('.apagar-lista-btn').addEventListener('click', (event) => {
                event.stopPropagation();
                apagarLista(lista.id);
            });

            cartao.addEventListener('click', function() {
                abrirListaEspecifica(lista.id);
            });

            listasCardsContainer.appendChild(cartao);
        });
    }
    
    function editarNomeLista(listaId) {
        const lista = minhasTodasAsListas.find(l => l.id === listaId);
        if (!lista) return;

        const novoNome = prompt("Digite o novo nome para a lista:", lista.nome);
        if (novoNome && novoNome.trim() !== "") {
            lista.nome = novoNome.trim();
            lista.ultimaModificacao = new Date().toLocaleDateString('pt-BR'); // Atualiza data
            saveListsToLocalStorage(); // SALVA NO LOCALSTORAGE
            renderizarListas();
            if (views['lista-especifica'].style.display === 'block' && currentOpenListId === listaId) {
                tituloListaEspecifica.textContent = lista.nome;
            }
        }
    }

    function apagarLista(listaId) {
        const lista = minhasTodasAsListas.find(l => l.id === listaId);
        if (!lista) return;
        
        if (confirm(`Tem certeza que deseja apagar a lista "${lista.nome}"?`)) {
            minhasTodasAsListas = minhasTodasAsListas.filter(l => l.id !== listaId);
            saveListsToLocalStorage(); // SALVA NO LOCALSTORAGE
            renderizarListas();
            if (views['lista-especifica'].style.display === 'block' && currentOpenListId === listaId) {
                showView('minhas-listas'); // Volta para a lista de listas se a atual foi apagada
                currentOpenListId = null;
            }
        }
    }

    if (fabCriarLista) {
        fabCriarLista.addEventListener('click', function() {
            const nomeNovaLista = prompt("Qual o nome da nova lista?");
            if (nomeNovaLista && nomeNovaLista.trim() !== "") {
                const novoId = minhasTodasAsListas.length > 0 ? Math.max(...minhasTodasAsListas.map(l => l.id)) + 1 : 1;
                minhasTodasAsListas.push({
                    id: novoId,
                    nome: nomeNovaLista.trim(),
                    itens: [], // Array de itens começa vazio
                    ultimaModificacao: new Date().toLocaleDateString('pt-BR')
                });
                saveListsToLocalStorage(); // SALVA NO LOCALSTORAGE
                renderizarListas();
                abrirListaEspecifica(novoId); // Opcional: abrir a lista recém-criada
            }
        });
    }

    // ---- Funções da Tela "Lista Específica" ----
    function abrirListaEspecifica(listaId) {
        const lista = minhasTodasAsListas.find(l => l.id === listaId);
        if (lista && tituloListaEspecifica && itensListaEspecificaContainer && totalListaEspecifica) {
            currentOpenListId = listaId;
            tituloListaEspecifica.textContent = lista.nome;
            renderizarItensDaLista(lista);
            showView('lista-especifica');
        } else {
            console.error("Não foi possível abrir a lista. ID:", listaId);
            showView('minhas-listas'); // Fallback: volta para a tela de listas
        }
    }

    function renderizarItensDaLista(lista) {
        if (!itensListaEspecificaContainer || !totalListaEspecifica) return;
        itensListaEspecificaContainer.innerHTML = '';
        let totalValorLista = 0;

        if (!lista.itens || lista.itens.length === 0) {
            itensListaEspecificaContainer.innerHTML = '<p>Nenhum item nesta lista ainda. Adicione itens para começar!</p>';
            totalListaEspecifica.textContent = '0.00';
            return;
        }

        // Por enquanto, os itens são apenas nomes. Vamos adaptar para o formato que usamos antes.
        // Ex: {nome: "Maçã", qtd: 2, preco: 1.50}
        lista.itens.forEach((item, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'item-da-lista';
            const precoTotalItem = (item.preco || 0) * (item.qtd || 1);
            totalValorLista += precoTotalItem;

            itemDiv.innerHTML = `
                <span class="item-info" data-index="${index}">${item.qtd || 1}x ${item.nome}</span>
                <span class="item-preco">R$ ${precoTotalItem.toFixed(2)}</span>
                <div class="item-acoes">
                    <button class="editar-item-btn" data-index="${index}" aria-label="Editar item ${item.nome}"><i class="fas fa-edit"></i></button>
                    <button class="apagar-item-btn" data-index="${index}" aria-label="Apagar item ${item.nome}"><i class="fas fa-trash"></i></button>
                </div>
            `;
            // Eventos para editar/apagar itens serão adicionados aqui futuramente
            itensListaEspecificaContainer.appendChild(itemDiv);
        });
        totalListaEspecifica.textContent = totalValorLista.toFixed(2);
    }

    // ---- Controle de Navegação e Inicialização ----
    function showView(viewIdToShow) {
        for (const viewId in views) {
            if (views[viewId]) {
                views[viewId].style.display = 'none';
            }
        }

        if (views[viewIdToShow]) {
            views[viewIdToShow].style.display = 'block';
            if (viewIdToShow === 'minhas-listas') {
                renderizarListas(); // Renderiza as listas ao mostrar esta view
                currentOpenListId = null;
            } else if (viewIdToShow === 'lista-especifica') {
                // A lógica de renderizar itens da lista específica já é chamada por abrirListaEspecifica
                // Mas se o usuário navegar diretamente para cá (improvável sem uma lista aberta),
                // podemos redirecionar ou mostrar uma mensagem.
                if (currentOpenListId === null) {
                    showView('minhas-listas'); // Se nenhuma lista estiver "aberta", volta para Minhas Listas
                }
            }
            // Adicionar aqui outras lógicas de renderização para outras views quando forem ativadas
        } else {
            console.warn('View não encontrada:', viewIdToShow);
        }

        navButtons.forEach(button => {
            const isActive = button.getAttribute('data-view') === viewIdToShow;
            // Se a view for 'lista-especifica', o botão 'minhas-listas' pode continuar ativo visualmente
            let effectiveActiveView = viewIdToShow;
            if (viewIdToShow === 'lista-especifica') {
                effectiveActiveView = 'minhas-listas'; // Mantém "Listas" ativo na nav
            }
            button.classList.toggle('active', button.getAttribute('data-view') === effectiveActiveView);
        });
    }

    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const viewId = this.getAttribute('data-view');
            // Se estiver na tela de lista-especifica e clicar em 'Minhas Listas',
            // ou se clicar em outro botão de navegação, reseta currentOpenListId.
            if (viewId === 'minhas-listas' || (currentOpenListId !== null && viewId !== 'lista-especifica')) {
                currentOpenListId = null;
            }
            showView(viewId);
        });
    });

    // ---- Inicialização do App ----
    loadListsFromLocalStorage(); // CARREGA DO LOCALSTORAGE PRIMEIRO
    showView('minhas-listas');   // Depois mostra a view inicial, que vai chamar renderizarListas()

});