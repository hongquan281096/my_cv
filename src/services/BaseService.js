import useSWR from "swr";
const BaseService = {

  async get(endpoint) {
    const response = await fetch(endpoint, {
      method: "GET",
    })
      .then((result) => result.json())
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    return response;
  },

  async post(endpoint, bodyData) {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: JSON.stringify(bodyData),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((result) => result.json())
        .then((data) => {
          return data;
        })
        .catch((error) => {
          console.error("Error:", error);
        });

      return response;
    } catch (error) {
      console.log("error post", error);
    }
  },

  async put(endpoint, bodyData) {
    try {
      const response = await fetch(endpoint, {
        method: "PUT",
        body: JSON.stringify(bodyData),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((result) => result.json())
        .then((data) => {
          return data;
        })
        .catch((error) => {
          console.error("Error:", error);
        });

      return response;
    } catch (error) {
      console.log("error", error);
    }
  },
  async delete(endpoint) {
    console.log("endpoint:", endpoint);
    const response = await fetch(endpoint, {
      method: "DELETE",
    })
      .then((result) => result.json())
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    return response;
  },
};

export default BaseService;
