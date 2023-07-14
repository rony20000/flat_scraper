import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import ApartmentType from "./types/apartment";
import apartmentsApi from "./services/apartments";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "./App.css";
import Apartment from "./components/Apartment";
import Layout from "./components/Layout";

let intervalId: NodeJS.Timeout;

function App() {
  const [apartments, setApartments] = useState<ApartmentType[]>([]);
  const [pagination, setPagination] = useState(20);
  const [isScraping, setIsScraping] = useState(false);

  const initializeApartments = async () => {
    const apartments = await apartmentsApi.getAll();
    setApartments(apartments);
  };

  const fetchIsScraping = async () => {
    const isScraping = await apartmentsApi.getScrapeStatus();
    setIsScraping(isScraping);
  };

  useEffect(() => {
    initializeApartments();
    fetchIsScraping();
  }, []);

  useEffect(() => {
    intervalId = setInterval(() => fetchIsScraping(), 5000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {});

  return (
    <Layout
      isScraping={isScraping}
      hasPagination={pagination < apartments.length}
      onScrapeClicked={() => {
        apartmentsApi.scrape();
        setIsScraping(true);
      }}
      onPaginationClicked={() =>
        setPagination(
          pagination + 20 > apartments.length
            ? apartments.length
            : pagination + 20
        )
      }
    >
      <h2 className="hint">
        There are about ({apartments.length}) apartment available!
      </h2>
      <div className="apartments">
        {apartments
          .slice(
            0,
            pagination <= apartments.length ? pagination : apartments.length
          )
          .map((apartment) => (
            <Apartment apartment={apartment} />
          ))}
      </div>
    </Layout>
  );
}

export default App;
