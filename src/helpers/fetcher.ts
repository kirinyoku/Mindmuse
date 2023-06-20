import ky from 'ky';

const fetcher = async <T>(url: string) => {
  const data: T = await ky.get(`/api${url}`).json();
  return data;
};

export default fetcher;
