import React from "react";
import Slider from "react-slick";
import { Container } from "reactstrap";
import { useRouter } from "next/router";

interface SlideData {
  id: number;
  title: string;
  image_url: string;
  link?: string;
}

interface SlideShowProps {
  slides: SlideData[];
}

const SlideShow: React.FC<SlideShowProps> = ({ slides }) => {
  const router = useRouter();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
  };

  if (!slides || slides.length === 0) return null;

  return (
    <div className="portal-slideshow mb-4">
      <Slider {...settings}>
        {slides.map((slide) => (
          <div key={slide.id} className="slide-item position-relative" style={{ cursor: slide.link ? "pointer" : "default" }} 
               onClick={() => slide.link && (slide.link.startsWith('http') ? window.open(slide.link, '_blank') : router.push(slide.link))}>
            <img
              src={slide.image_url}
              alt={slide.title}
              className="w-100"
              style={{ height: "450px", objectFit: "cover", borderRadius: "8px" }}
            />
            <div className="slide-caption position-absolute bottom-0 start-0 w-100 p-4 text-white" 
                 style={{ background: "linear-gradient(transparent, rgba(0,0,0,0.7))", borderBottomLeftRadius: "8px", borderBottomRightRadius: "8px" }}>
              <Container>
                <h2 className="mb-0">{slide.title}</h2>
              </Container>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SlideShow;
