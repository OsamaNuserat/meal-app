// Import Swiper React components
import { Navigation, Pagination, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


export default  () => {
  return (
    <div className="container">
      <h2>Italian Food</h2>
    <Swiper
    modules={[Navigation,Pagination,A11y]}
    spaceBetween={50}
    slidesPerView={3}
    navigation
    pagination={{ clickable: true }}
    >
    
     
        
          <SwiperSlide>
              <div className="card" >
                <img src="images/three.jpg" className="card-img-top img-fluid" alt="burger promo" />
                <div className="card-body">
                  <p className="card-text">
                    Some quick example text to build on the card title and make up
                    the bulk of the card's content.
                  </p>
                </div>
                <div className="card-footer">
                  <button className="btn btn-primary">Order Now</button>
                </div>
              </div>
          </SwiperSlide>
          
          <SwiperSlide>
              <div className="card" >
                <img src="images/three.jpg" className="card-img-top img-fluid" alt="burger promo" />
                <div className="card-body">
                  <p className="card-text">
                    Some quick example text to build on the card title and make up
                    the bulk of the card's content.
                  </p>
                </div>
                <div className="card-footer">
                  <button className="btn btn-primary">Order Now</button>
                </div>
              </div>
          </SwiperSlide>

          <SwiperSlide>
              <div className="card" >
                <img src="images/three.jpg" className="card-img-top img-fluid" alt="burger promo" />
                <div className="card-body">
                  <p className="card-text">
                    Some quick example text to build on the card title and make up
                    the bulk of the card's content.
                  </p>
                </div>
                <div className="card-footer">
                  <button className="btn btn-primary">Order Now</button>
                </div>
              </div>
          </SwiperSlide>

          <SwiperSlide>
              <div className="card" >
                <img src="images/three.jpg" className="card-img-top img-fluid" alt="burger promo" />
                <div className="card-body">
                  <p className="card-text">
                    Some quick example text to build on the card title and make up
                    the bulk of the card's content.
                  </p>
                </div>
                <div className="card-footer">
                  <button className="btn btn-primary">Order Now</button>
                </div>
              </div>
          </SwiperSlide>
      
        
     
      </Swiper>
      </div>
    
  );
};