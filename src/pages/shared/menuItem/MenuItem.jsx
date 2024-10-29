
const MenuItem = ({item}) => {
    const {name , image ,recipe ,price }= item;
    return (
        <div className="flex  space-x-4">
            <img style={{borderRadius:'0  200px 200px 200px'}} className="w-[118px] h-[104px]" src={image} alt="" />
            <div>
                <h3 className="uppercase">{name}--------------------</h3>
                <p>{recipe}</p>
            </div>
            <p className="text-yellow-500">${price}</p>
        </div>
    );
};

export default MenuItem;