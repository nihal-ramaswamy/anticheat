import strapi from "../config/axios.config";

export const getBlackListedApps = async () => {
  let response = {};
  await strapi.get<{ data?: any }>("black-listed-apps")
    .then(data => {
      response = { data: data.data.data, status: "ok" };
    })
    .catch(err => {
      response = { error: err, status: "error" };
    });

  return response as { data?: any, status: string, error?: any };
};
