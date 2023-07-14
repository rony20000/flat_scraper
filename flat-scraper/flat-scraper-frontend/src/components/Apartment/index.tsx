import { Carousel } from "react-responsive-carousel";
import ApartmentType from "../../types/apartment";

import "./Apartment.css";

interface Props {
  apartment: ApartmentType;
}

const Apartment = ({ apartment }: Props) => {
  return (
    <div key={apartment.url} className="apartment">
      <Carousel showThumbs={false} showIndicators={false}>
        {apartment.images.map((image) => (
          <div key={image}>
            <img src={image} alt="" />
          </div>
        ))}
      </Carousel>
      <a href={apartment.url} target="_blank" rel="noreferrer">
        {apartment.title}
      </a>
    </div>
  );
};

export default Apartment;
