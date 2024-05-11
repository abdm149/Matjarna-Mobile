import {BASE_URL} from '../commons/constants';

export interface Category {
    id: string;
    title: string;
    imageUrl: string;
    numberOfProducts: number;
  }

export const categoryMapper = (item: any): Category => ({
    id: item.id,
    title: item.descriptions[0].title,
    imageUrl: BASE_URL + item.image,
    numberOfProducts: item.numberOfProducts,
  });

export const fakeCategories = () => {
  const fake = [];
  for (let i = 0; i <= 5; i++) {
    fake.push({
      id: `${i}`,
      title: '',
      imageUrl: 'dummyImage',
      numberOfProducts: 0,
    });
  }
  return fake;
};
