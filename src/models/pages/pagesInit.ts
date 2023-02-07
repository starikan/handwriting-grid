import { Base64 } from 'js-base64';

export const pagesInit = () => {
  try {
    const dataHash = JSON.parse(Base64.decode(window.location.hash));
    return dataHash;
  } catch (error) {
    console.log(error);
  }
  return [];
};
