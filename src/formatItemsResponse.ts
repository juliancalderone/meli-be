import { ItemsResponse } from './interfaces';
const formatItemsResponse = (response: Record<string, any>): ItemsResponse => {
  const filters = response.filters as any[];

  const categories = filters.reduce<string[]>((accum, filter) => {
    filter.values.forEach((value: Record<string, string>) => {
      accum.push(value.name);
    });
    return accum;
  }, []);

  const author = {
    lastname: '',
    name: '',
  };

  const results = response.results as any[];

  const items = results.slice(0, 4).map((item) => {
    const amount = Math.trunc(item.price);

    return {
      condition: item.condition,
      free_shipping: item.shipping.free_shipping,
      id: item.id,
      picture: item.thumbnail,
      price: {
        amount,
        currency: item.currency_id,
        decimals: item.price - amount,
      },
      state: item.address.state_name,
      title: item.title,
    };
  });

  return {
    author,
    categories,
    items,
  };
};

export default formatItemsResponse;
