export const makeApiUrl = (): string => {
  console.log(import.meta.env.PUBLIC_API_URL);

  return import.meta.env.PUBLIC_API_URL;
};
