const shoppingListData = [
    {
        category: "Açougue",
        items: [
            "Açém", "Alcatra", "Bacon", "Calabresa", "Carne de Frango", "Carne de Porco", 
            "Carne moída", "Carré", "Churrasco Bovino", "Churrasco Bovino Light", "Costela", 
            "Costela Bovina", "Costela de Boi", "Costela Ovina", "Costela Suína", "Coxa", 
            "Coxa de Frango", "Filé de Coxa", "Filé de Peito", "Filé Mignon", "Filé Mignon Suíno", 
            "Frios", "Guisado", "Guisado de 1ª", "Guisado de 2ª", "Lagarto bovino", "Linguiça", 
            "Linguicinha", "Paleta de Cordeiro", "Patinho", "Peito de Frango", "Pele de Cordeiro", 
            "Pele de Ovina", "Pernil", "Peru", "Picanha", "Salchichão", "Sobrecoxa"
        ]
    },
    {
        category: "Aperitivos",
        items: ["Amendoim", "Batata Palha", "Milho para pipoca", "Tapioca"]
    },
    {
        category: "Bebidas",
        items: [
            "Água", "Água Mineral C/ Gás", "Achocolatado", "Aguardente", "Cacau em pó", 
            "Cachaça", "Café", "Cerveja", "Cerveja Preta", "Champagne", "Chá", "Chá Gelado", 
            "Coca-Cola", "Espumante", "Fanta", "Guaraná", "Pepsi", "Refrigerante", "Sprite", 
            "Suco", "Vinho", "Vinho Branco", "Vinho Rosé", "Vinho Tinto", "Vodka", "Whisky"
        ]
    },
    {
        category: "Congelados",
        items: ["Almôndega", "Batatas pré-fritas", "Hambúrguer", "Lasanha", "Pizza Pronta", "Sorvete"]
    },
    {
        category: "Doces",
        items: [
            "Balas", "Chicletes", "Chocolates", "Doce de Amendoim", "Doce de Leite", 
            "JBomBom", "Paçoca", "Pastilhas"
        ]
    },
    {
        category: "Enlatados",
        items: [
            "Azeitona", "Cogumelo", "Creme de Leite", "Ervilha em Lata", "Leite Condensado", 
            "Milho em Lata", "Salsicha em Lata", "Sardinhas"
        ]
    },
    {
        category: "Frutas",
        items: [
            "Abacate", "Banana", "Kiwi", "Laranja", "Limão", "Maçã", "Mamão", "Manga", 
            "Melancia", "Melão", "Morango", "Pera"
        ]
    },
    {
        category: "Higiene",
        items: [
            "Absorvente", "Acetona", "Algodão", "Algodão Hidrófilo", "Bronzeador", 
            "Condicionador", "Cotonete", "Creme Dental", "Creme p/ Desodorante", 
            "Creme p/ o Rosto", "Desodorante", "Enxaguante Bucal", "Escova Dental", 
            "Fio Dental", "Papel Higienico", "Pasta", "Prestobarba", "Protetor Solar", 
            "Sabonete", "Shampoo", "Talco p/ Pé"
        ]
    },
    {
        category: "Lanche",
        items: [
            "Bolacha", "Bolos", "Capuchino", "Cereais", "Doces e compotas", "Doces pastosos", 
            "Geleias", "Massa de pastel", "Mel"
        ]
    },
    {
        category: "Laticínios ou Ovos",
        items: [
            "Danone", "Embutidos", "Iogurte", "Leite", "Leite Desnatado", "Leite em pó", 
            "Manteiga", "Margarina", "Ovo", "Queijo", "Queijo ralado", "Requeijao", 
            "Salame", "Yakult"
        ]
    },
    {
        category: "Legumes e Verduras",
        items: [
            "Abóbora", "Agrião", "Aipim", "Alface", "Batata", "Batata Doce", 
            "Batata Inglesa", "Bergamota", "Beterraba", "Brócolis", "Chuchu", "Couve", 
            "Couve-Flor", "Jiló", "Mostarda", "Pepino", "Repolho", "Rodela", "Tomate", "Vagem"
        ]
    },
    {
        category: "Mercearia",
        items: [
            "Açúcar", "Adoçante", "Amido de milho", "Arroz", "Aveia", "Azeite de oliva", 
            "Café em Pó", "Canjica", "Chocolate", "Ervilha", "Ervilha Seca", "Espaguete", 
            "Extrato de tomate", "Farinha de Aveia", "Farinha de mandioca", "Farinha de Milho", 
            "Farinha de rosca", "Farinha de trigo", "Farofa", "Farofa Temperada", "Feijão", 
            "Fécula", "Fermento", "Grão-de-bico", "Lentilha", "Macarrão", "Milho verde", 
            "Mistura", "Molho", "Molho de tomate", "Molho inglês", "Nescafé", "Óleo", 
            "Palmito", "Penne", "Polvilho", "Vinagre"
        ]
    },
    {
        category: "Padaria",
        items: [
            "Biscoito", "Croissant", "Filtro de Café", "Pão", "Pão de forma", "Pão de Milho", 
            "Pão de queijo", "Pão de Sanduíche", "Pão Doce", "Pão p/ cachorro-quente", 
            "Pão p/ Hamburguer", "Pão Sovado", "Torta"
        ]
    },
    {
        category: "Peixes e Frutos do Mar",
        items: [
            "Bacalhau", "Camarão", "Filé de merluza", "Filé de Peixe", "Lagosta", "Lula", 
            "Mexilhão", "Ostra", "Pescada", "Pintado", "Polvo", "Sardinha", "Tainha", "Traíra"
        ]
    },
    {
        category: "Produtos de Limpeza",
        items: [
            "Álcool Gel", "Álcool Liquido", "Amaciante", "Arpic", "Bacia", "Balde", "Bombril", 
            "Buchinha", "Cera em Pasta", "Cera Liquida", "Cheirinho de Chão", "Cif", "Cloro", 
            "Cloro Ativo", "Desengordurante", "Desinfetante", "Desodorizante", "Detergente", 
            "Esfregão de Aço", "Esponja", "Fósforo", "Inseticida", "Jóia Líquida", 
            "Limpa Vidro", "Luva de Borracha", "Lustra Moveis", "Lustra Piso", "Lustra Vidro", 
            "Pano de Limpeza", "Pato", "Pó de Limpeza", "Rodo", "Sabão em Barra", 
            "Sabão em Pó", "Sabão Liquido", "Soda Cáustica", "Vassoura", 
            "Vassoura de Vaso Sanitário", "Veja"
        ]
    },
    {
        category: "Queijos",
        items: ["Brie", "Cheddar", "Mussarela", "Prato"]
    },
    {
        category: "Refeições rápidas",
        items: ["Empanados", "Massas prontas"]
    },
    {
        category: "Sobremesas",
        items: [
            "Calda para sorvete", "Frutas em calda", "Gelatina cristalizada", "Mousse", 
            "Pepinha", "Pudim"
        ]
    },
    {
        category: "Temperos",
        items: [
            "Açafrão", "Alho", "Barinha", "Caldo de aves", "Caldo de Carne", "Caldo de legumes", 
            "Canela", "Canela em Casca", "Cebola", "Cebolinha Verde", "Coentro", "Colorau", 
            "Cominho", "Cravo-da-Índia", "Curry", "Ketchup", "Louro", "Maionese", 
            "Molho de Galinha", "Molho de Mostarda", "Mostarda", "Noz-moscada", "Óleo", 
            "Oregano", "Paprica Defumada", "Paprica Doce", "Pimenta", "Pimenta Malagueta", 
            "Pimenta Vermelha", "Pimenta-do-Reino", "Pimentão", "Sal", "Salsa", "Sazon", 
            "Shoyu", "Vinagre"
        ]
    },
    {
        category: "Outros",
        items: [
            "Alum. Ralado", "Beterraba p/ Galo", "Comida p/ Cachorro", "Comida p/ Galinha", 
            "Comida p/ Pássaro", "Comida p/ Peixe", "Copos Descartáveis", "Guardanapo de Papel", 
            "Lâmpada", "Papel Alumínio", "Pilha", "Toalha", "Vela"
        ]
    }
];