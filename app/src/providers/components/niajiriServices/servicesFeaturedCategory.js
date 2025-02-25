import { getAllShops } from "../../api/shops/shops";
import { getAllServices } from "../../api/services/services";

/**Method to get shops */
export const getShops = async () => {
  const allShops = await getAllShops();
  //console.log(allShops);
  return allShops;
};

/**Method to get service names */
export const getServiceNames = async () => {
  const data = await getAllServices();
  const services = data.services;
  let serviceNames = [];

  //Get the service names only
  for (let service of services) {
    serviceNames.push(service.service_title);
  }

  console.log(services);
  return services;
};

/**Method to get home carousel */
export const getCarouselInfo = () => {
  let carouselInfo = [];

  const load = async () => {
    try {
      const response = await get("api/home-carousels").then((response) => {
        const data = response.data;
        const extractedData = data.data;
        // console.log(extractedData);
        if (data) {
          carouselInfo = extractedData;
        }
      });
    } catch (error) {
      console.log(error);
    }
    // console.log(carouselInfo);
    return carouselInfo;
  };

  return { load };
};
