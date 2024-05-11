import {BASE_URL} from '../commons/constants';

export interface Product {
  id: string;
  title: string;
  imageUrl: string;
  price: string;
}

export const productMapper = (item: any): Product => ({
  id: item.id,
  title: item.descriptions[0].title,
  imageUrl: BASE_URL + item.mainImage,
  price: priceMapper(item.prices[0].price, item.prices[0].currencyCode),
});

const priceMapper = (price: number, currency: string) => {
  // Rounding the price to two decimal places
  const roundedPrice = price.toFixed(2);
  const currencySymbols: {[key: string]: string} = {
    USD: '$',
    ILS: '₪',
  };
  const symbol = currencySymbols[currency] || currency;
  return `${roundedPrice} ${symbol}`;
};

export const fakeProducts = () => {
  const fake = [];
  for (let i = 0; i <= 5; i++) {
    fake.push({
      id: `${i}`,
      title: '',
      price: '',
      imageUrl: 'dummyImage',
    });
  }
  return fake;
};
