// Dados das categorias e itens (pode ser colocado em um arquivo separado, como data.js)
const shoppingListData = [
    {
        category: "Açougue",
        items: ["Alcatra", "Açém", "Bacon", "Calabresa", "Carne moída", "Carré", "Costela", "Coxa", "Filé Mignon Suíno","Filé de Peito", "Frios", "Guisado", "Lagarto bovino", "Linguiça", "Patinho", "Pernil", "Sobrecoxa"]
    },
    {
        category: "Aperitivos",
        items: ["Amendoim", "Batata Palha", "Milho para pipoca", "Tapioca"]
    },
    {
        category: "Bebidas",
        items: ["Água", "Achocolatado", "Café", "Cerveja", "Chá","Chá Gelado","Refrigerante", "Suco", "Vinho"]
    },
    {
        category: "Congelados",
        items: ["Almôndega", "Batatas pré-fritas", "Pizza Pronta", "Hambúrguer","Sorvete"]
    },
    {
        category: "Doces",
        items: ["Balas", "Chicletes", "Chocolates", "Doce de Amendoim", "Doce de Leite", "Pastilhas","Paçoca"]
    },
    {
        category: "Enlatados",
        items: ["Azeitona", "Cogumelo", "Creme de leite", "Ervilha", "Leite condensado", "Milho", "Salsicha", "Sardinhas"]
    },
    {
        category: "Frutas",
        items: ["Banana", "Limão", "Maça", "Mamão", "Manga", "Morango"]
    },
    {
        category: "Higiene",
        items: ["Condicionador","Creme Dental", "Desodorante", "Enxaguante Bucal", "Fio Dental", "Papel Higienico", "Prestobarba", "Sabonete","Shampoo"]
    },
    {
        category: "Lanche",
        items: ["Bolos", "Capuchino", "Cereais", "Doces e compotas","Doces pastosos", "Geleias ", "Mel"]
    },
    {
        category: "Laticínios ou Ovos",
        items: ["Danone","Iogurte", "Leite", "Leite em pó", "Manteiga", "Margarina", "Ovo", "Queijo ralado", "Requeijao", "Yakult"]
    },
    {
        category: "Legumes e Verduras",
        items: ["Aipim", "Alface","Alho", "Batata", "Batata Doce", "Beteraba", "Cebola", "Cenoura", "Chuchu", "Couve", "Limão", "Pimentão", "Tomate"]
    },
    {
        category: "Mercearia",
        items: ["Açúcar", "Amido de milho", "Arroz", "Aveia", "Azeite de oliva", "Ervilha", "Espaguete", "Extrato de tomate", "Farinha de mandioca", "Farinha de rosca", "Farinha de trigo", "Farofa", "Fécula", "Feijão", "Fermento", "Grão-de-bico", "Milho verde", "Molho", "Molho de tomate", "Molho inglês", "Óleo", "Palmito", "Penne", "Pepino", "Polvilho","Vinagre"]
    },
    {
        category: "Padaria",
        items: ["Croissant", "Filtro de Café", "Pão de forma", "Pão de queijo", "Pão p/ cachorro-quente","Pão p/ Hamburguer"]
    },
    {
        category: "Peixes e Frutos do Mar",
        items: ["Bacalhau", "Camarão", "Filé de merluza", "Lula", "Mexilhão", "Ostra", "Pescada", "Pintado", "Polvo","Tainha"]
    },
    {
        category: "Produtos de Limpeza",
        items: ["Amaciante", "Arpic", "Cheirinho de Chão", "Cif", "Cloro", "Cloro Ativo", "Desinfetante", "Detergente", "Esponja", "Limpa Vidro", "Lustra Moveis", "Pato", "Sabão Liquido", "Veja"]
    },
    {
        category: "Queijos",
        items: ["Brie","Cheddar", "Mussarela", "Prato"]
    },
    {
        category: "Refeições rápidas",
        items: ["Biscoito", "Empanados", "Massas prontas", "Tortas"]
    },
    {
        category: "Sobremesas",
        items: ["Calda para sorvete", "Frutas em calda", "Gelatina cristalizada", "Mousse","Pudim"]
    },
    {
        category: "Temperos",
        items: ["Caldo de aves", "Caldo de Carne", "Caldo de legumes", "Canela", "Colorau", "Cravo-da-Índia", "Curry", "ketchup", "Louro", "Maionese", "Mostarda", "Noz-moscada", "Oregano", "Paprica Defumada", "Paprica Doce", "Pimenta", "Pimenta malagueta", "Sal", "Shoyu"]
    }
  ];