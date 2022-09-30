import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "../style/index.css";
import { Grid, Pagination, Autoplay, Navigation } from "swiper";
import { connect } from "react-redux";

function Carrousel(props) {

  return (
    <>
    <div className="titleCarrousel">
      <h2 className="myTinenariesCarrousel">Popular MyTineraries</h2>
    </div>
      <Swiper
      breakpoints={{
        // when window width is >= 768px
        768: {
          slidesPerView: 2,
          grid: {rows: 2},
          slidesPerGroup: 2,
        },
      }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false
        }} 
        slidesPerView={1}
        grid={{
          rows: 4,
        }}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Grid, Pagination, Navigation]}
        className="mySwiper"
        
      >
        {props.cities?.map(city =>
        <SwiperSlide style={{backgroundImage:`url(${city.image})`}} key={city.name}>
          <div className="divCarrousel">
          <span className="carrouselItemName">{city.name}</span>
          </div>
        </SwiperSlide>
      )}
      </Swiper>
    </>
    
  );
}

const mapStateToProps = (state) => {
  return{
    cities: state.citiesReducer.cities
  }
}

export default connect(mapStateToProps, null)(Carrousel)