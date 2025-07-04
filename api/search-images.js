// Arquivo: /api/search-images.js
// Este código roda no servidor seguro da Vercel, não no navegador!

export default async function handler(request, response) {
  // Pega o nome do produto que o nosso app enviou (ex: "q=Abacate")
  const productName = request.query.q;

  if (!productName) {
    return response.status(400).json({ error: 'Nenhum produto para pesquisar foi fornecido.' });
  }

  // Pega as chaves secretas das "Environment Variables" da Vercel
  // Elas NÃO estão no código, a Vercel as injeta de forma segura
  const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
  const SEARCH_ENGINE_ID = process.env.SEARCH_ENGINE_ID;

  if (!GOOGLE_API_KEY || !SEARCH_ENGINE_ID) {
      return response.status(500).json({ error: 'As chaves da API de busca não estão configuradas no servidor.' });
  }

  const searchUrl = `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${SEARCH_ENGINE_ID}&q=${encodeURIComponent(productName)}&searchType=image&num=1&imgSize=medium`;

  try {
    const googleResponse = await fetch(searchUrl);
    if (!googleResponse.ok) {
      // Se a resposta do Google não for boa, retorna o erro
      return response.status(googleResponse.status).json({ error: 'Erro ao buscar imagem no Google.' });
    }
    
    const data = await googleResponse.json();
    const imageUrl = data.items && data.items.length > 0 ? data.items[0].link : null;

    // Envia a URL da imagem (ou nulo) de volta para o nosso app no navegador
    response.status(200).json({ imageUrl: imageUrl });
    
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Ocorreu um erro interno no servidor.' });
  }
}