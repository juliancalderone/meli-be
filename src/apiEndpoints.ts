const API_URL = 'https://api.mercadolibre.com/';

export const getSearchEndpoint = (query: string) => `${API_URL}sites/MLA/search?q=${query}`;
export const getDetailsEndpoint = (id: string) => `${API_URL}/items/${id}`;
export const getDescriptionEndpoint = (id: string) => `${API_URL}/items/${id}/description`;
