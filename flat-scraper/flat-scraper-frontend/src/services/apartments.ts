import axios from "axios";
import Apartment from "../types/apartment";

const baseUrl = "http://localhost:3001/apartments";

const getAll = async () => {
  const { data } = await axios.get<Apartment[]>(baseUrl);
  return data;
};

const scrape = async () => {
  const { data } = await axios.get<string>(`${baseUrl}/scrape`);
  return data;
};

const getScrapeStatus = async () => {
  const { data } = await axios.get<{ isScraping: boolean }>(
    `${baseUrl}/scrape/status`
  );
  return data.isScraping;
};

export default { getAll, scrape, getScrapeStatus };
