import { Helmet } from 'react-helmet-async';
import Cover from '../../shared/menuItem/Cover/Cover';
import menuImg from '../../../assets/menu/banner3.jpg'
import useMenu from '../../../hooks/useMenu';
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import dessertImg from '../../../assets/menu/dessert-bg.jpeg'
import pizzaImg from '../../../assets/menu/pizza-bg.jpg'
import saladImg from '../../../assets/menu/salad-bg.jpg'
import soupImg from '../../../assets/menu/soup-bg.jpg'
import MenuCategory from '../MenuCategory/MenuCategory';

 

const Menu = () => {
    const [menu]= useMenu()
   
    const dessert = menu.filter(item => item.category === 'dessert');
    const salad = menu.filter(item => item.category === 'salad');
    const pizza = menu.filter(item => item.category === 'pizza');
    const soup = menu.filter(item => item.category === 'soup');
    const offered = menu.filter(item => item.category === 'offered');

    
    return (
        <div>
            <Helmet>
                <title>Bistro | Menu</title>
            </Helmet>
            {/* cover section  */}
            <Cover
            bgImg={menuImg}
            title="our menu"
            ></Cover>
            
            {/* offer section */}
            <SectionTitle
            heading="---Don't miss---"
            subHeading="TODAY'S OFFER"
            ></SectionTitle>
            <MenuCategory items={offered}></MenuCategory>

            {/* dessert menu section  */}
            <MenuCategory title="dessert"  img={dessertImg} items={dessert}></MenuCategory>
            <MenuCategory title="pizza"  img={pizzaImg} items={pizza}></MenuCategory>
            <MenuCategory title="salad"  img={saladImg} items={salad}></MenuCategory>
            <MenuCategory title="soup"  img={soupImg} items={soup}></MenuCategory>



           
         
        </div>
    );
};

export default Menu;