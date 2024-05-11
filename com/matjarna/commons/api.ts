import commInstance from "../communicator/comm";

export const getCountryCode = async (): Promise<any> => {
    const response = await commInstance.get(`api/countryCode`);
    if (response.status < 300) {
      return response.data;
    } else {
      return Promise.reject();
    }
  };