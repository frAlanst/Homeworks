interface Gif {
  id: string;
  title: string;
  url: string;
  alt_text?: string;
  username?: string;
  images: { fixed_height: { url: string } };
}

export async function searchGifs(term: string, apiKey: string, signal: AbortSignal): Promise<Gif[]> {
  const params = new URLSearchParams({
    api_key: apiKey, q: term, limit: '25', offset: '0', rating: 'g', lang: 'en'
  });
  const response = await fetch('https://api.giphy.com/v1/gifs/search?' + params, { signal });
  if (response.status === 401 || response.status === 403) throw new Error('GIPHY rechazó la clave. Revisa tu .env y reinicia Angular.');
  if (response.status === 429) throw new Error('Alcanzaste el límite de consultas. Intenta más tarde.');
  if (!response.ok) throw new Error('GIPHY no pudo completar la búsqueda. Intenta de nuevo.');
  const body = await response.json();
  if (!Array.isArray(body.data)) throw new Error('La respuesta de GIPHY tiene un formato inesperado.');
  return body.data;
}
