import commInstance from '../communicator/comm';

export const fetchCategoryData = async (
  page: number,
  id: number | null,
  language: string,
): Promise<any> => {
  const response = await commInstance.get(`api/category/`, {
    params: {
      page: page,
      active: true,
      language: language,
      ...(id && {parentId: id}),
    },
  });
  if (response.status < 300) {
    return response.data;
  } else {
    return Promise.reject();
  }
};
