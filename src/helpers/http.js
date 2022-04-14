export const anyOriginJsonRequest = async (url, options = {}) => {
  const request = new Request(
    `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`,
    {
      ...options,
    }
  );
  const response = await fetch(request);
  const data = await response.json();
  return JSON.parse(data.contents);
};
