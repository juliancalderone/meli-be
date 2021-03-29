import { DetailResponse } from './interfaces';

const formatDetailResponse = (detail: Record<string, any>, description: Record<string, any>): DetailResponse => {
  const amount = Math.trunc(detail.price);
  return {
    author: {
      lastname: '',
      name: '',
    },
    item: {
      condition: detail.condition,
      description: description.plain_text,
      free_shipping: detail.shipping.free_shipping,
      id: detail.id,
      picture: detail.pictures[0].secure_url,
      price: {
        amount,
        currency: detail.currency_id,
        decimals: detail.price - amount,
      },
      sold_quantity: detail.sold_quantity,
      title: detail.title,
    },
  };
};

export default formatDetailResponse;
