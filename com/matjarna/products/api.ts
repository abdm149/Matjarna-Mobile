import commInstance from '../communicator/comm';

export const fetchProductsData = async (
  page: number,
  language: string,
  country: string,
): Promise<any> => {
  const response = await commInstance.get(`api/product/`, {
    params: {
      page: page,
      language: language,
      active: true,
      country: country,
    },
  });
  if (response.status < 300) {
    return response.data;
  } else {
    return Promise.reject();
  }
};
