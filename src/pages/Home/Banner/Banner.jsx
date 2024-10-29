import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Bimage1 from '../../../assets/home/01.jpg';
import Bimage2 from '../../../assets/home/02.jpg';
import Bimage3 from '../../../assets/home/03.jpg';
import Bimage4 from '../../../assets/home/04.jpg';
import Bimage5 from '../../../assets/home/05.png';
import Bimage6 from '../../../assets/home/06.png';



const Banner = () => {
    return (
        <Carousel>
        <div>
            <img src={Bimage1} />
        </div>
        <div>
        <img src={Bimage2} />
        </div>
        <div>
        <img src={Bimage3} />
        </div>
        <div>
        <img src={Bimage4} />
        </div>
        <div>
        <img src={Bimage5} />
        </div>
        <div>
        <img src={Bimage6} />
        </div>
    </Carousel>
    );
};

export default Banner;