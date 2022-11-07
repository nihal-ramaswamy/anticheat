import strapi from "../config/axios.config";

interface responseData {
  data?: any;
  error?: any;
  status: string;
};

export const getBlackListedApps = async () => {
  try {

    const res = await strapi.get("black-listed-apps");
    return { data: res.data.data, status: "ok" } as responseData;

  } catch (err: any) {
    return { error: err, status: "error" } as responseData;
  }
};
