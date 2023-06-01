export async function getResponse(url, reqData = { method: "GET" }) {
  const response = await fetch(url, reqData);

  if (!response.ok) {
    throw new Error(response);
  }

  const data = await response.json();
  return data;
}

export const dommyfetch = async (data, type = "resolve") => {
  if (type === "resolve") {
    return await Promise.resolve(data);
  } else if (type === "reject") {
    return await Promise.reject({
      message: "something went wrong, try again !",
    });
  }
};
