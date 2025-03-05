// Função para gerar o HTML das categorias e itens
function generateCategories(searchTerm = '') {
    const container = document.getElementById('categories-container');
    container.innerHTML = ''; // Limpa o container antes de regenerar

    shoppingListData.forEach(category => {
        // Filtra os itens da categoria com base no termo de pesquisa
        const filteredItems = category.items.filter(item =>
            item.toLowerCase().includes(searchTerm.toLowerCase())
        );

        // Só exibe a categoria se houver itens correspondentes ao termo de pesquisa
        if (filteredItems.length > 0 || searchTerm === '') {
            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'category';

            const categoryTitle = document.createElement('h2');
            categoryTitle.textContent = category.category;
            categoryDiv.appendChild(categoryTitle);

            // Se houver termo de pesquisa, usa os itens filtrados; caso contrário, usa todos
            const itemsToDisplay = searchTerm ? filteredItems : category.items;
            itemsToDisplay.forEach(item => {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'item';
                itemDiv.innerHTML = `<input type="checkbox" name="${category.category.toLowerCase().replace(' ', '_')}" value="${item}"> ${item}`;
                categoryDiv.appendChild(itemDiv);
            });

            container.appendChild(categoryDiv);
        }
    });
}

// Função para realizar a pesquisa
function searchItems() {
    const searchInput = document.getElementById('search-input').value;
    generateCategories(searchInput);
}

// Adiciona evento de pesquisa ao pressionar "Enter" no campo de pesquisa
document.getElementById('search-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        searchItems();
    }
});

// Função para adicionar um produto personalizado
function addCustomProduct() {
    const customProductInput = document.getElementById('custom-product');
    const customProduct = customProductInput.value.trim();

    if (customProduct) {
        // Adiciona o produto personalizado à lista de itens selecionados
        const selectedItems = JSON.parse(localStorage.getItem('selectedItems')) || [];
        if (!selectedItems.includes(customProduct)) {
            selectedItems.push(customProduct);
            localStorage.setItem('selectedItems', JSON.stringify(selectedItems));
            exibirMensagem('Produto personalizado adicionado com sucesso!', 'sucesso');
            customProductInput.value = ''; // Limpa o campo após adicionar
        } else {
            exibirMensagem('Este produto já foi adicionado!', 'erro');
        }
    } else {
        exibirMensagem('Digite um produto válido!', 'erro');
    }
}

// Função para exibir mensagens de feedback
function exibirMensagem(mensagem, tipo) {
    const divMensagens = document.createElement('div');
    divMensagens.id = 'mensagens';
    divMensagens.innerHTML = `<div class="${tipo}">${mensagem}</div>`;
    document.body.appendChild(divMensagens);
    setTimeout(() => divMensagens.remove(), 3000); // Remove a mensagem após 3 segundos
}

// Função para enviar os itens selecionados
function submitSelection() {
    const selectedItems = [];
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    checkboxes.forEach(checkbox => {
        selectedItems.push(checkbox.value);
    });

    // Adiciona qualquer produto personalizado já salvo no localStorage
    const storedItems = JSON.parse(localStorage.getItem('selectedItems')) || [];
    selectedItems.push(...storedItems.filter(item => !selectedItems.includes(item)));

    localStorage.setItem('selectedItems', JSON.stringify(selectedItems));
    window.location.href = 'index.html';
}

// Chama a função ao carregar a página
window.addEventListener('load', () => generateCategories());

// Carrega o tema ao carregar a página
window.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    const body = document.body;
    if (savedTheme === 'light') {
        body.classList.add('light-theme');
        document.querySelector('#theme-icon').className = 'fas fa-sun';
    } else {
        body.classList.remove('light-theme');
        document.querySelector('#theme-icon').className = 'fas fa-moon';
    }
});