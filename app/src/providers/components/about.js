import { get } from "../api/main";

/**Method to get heading info */
export const getHeadingInfo = () => {
  let headerInfo = [];

  const load = async () => {
    try {
      const response = await get("api/about-headings").then((response) => {
        const data = response.data;
        const extractedData = data.data;
        // console.log(extractedData);
        if (data) {
          headerInfo = extractedData;
        }
      });
    } catch (error) {
      console.log(error);
    }
    // console.log(headerInfo);
    return headerInfo;
  };

  return { load };
};

/**Method to get vision info */
export const getVisionInfo = () => {
  let visionInfo = [];

  const load = async () => {
    try {
      const response = await get("api/about-visions").then((response) => {
        const data = response.data;
        const extractedData = data.data;
        // console.log(extractedData);
        if (data) {
          visionInfo = extractedData;
        }
      });
    } catch (error) {
      console.log(error);
    }
    // console.log(visionInfo);
    return visionInfo;
  };

  return { load };
};

/**Method to get stats info */
export const getStatsInfo = () => {
  let statsInfo = [];

  const load = async () => {
    try {
      const response = await get("api/about-stats").then((response) => {
        const data = response.data;
        const extractedData = data.data;
        // console.log(extractedData);
        if (data) {
          statsInfo = extractedData;
        }
      });
    } catch (error) {
      console.log(error);
    }
    // console.log(statsInfo);
    return statsInfo;
  };

  return { load };
};

/**Method to get mission info */
export const getMissionInfo = () => {
  let missionInfo = [];

  const load = async () => {
    try {
      const response = await get("api/about-missions").then((response) => {
        const data = response.data;
        const extractedData = data.data;
        // console.log(extractedData);
        if (data) {
          missionInfo = extractedData;
        }
      });
    } catch (error) {
      console.log(error);
    }
    // console.log(missionInfo);
    return missionInfo;
  };

  return { load };
};