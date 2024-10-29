import { useForm } from "react-hook-form";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { FaUtensils } from "react-icons/fa";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_image_hosting_key;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const AddItems = () => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
const { register, handleSubmit , reset } = useForm();
  const onSubmit =async (data) => {
    console.log(data);
    // image upload t0 imgbb and get an url
    const imageFile = {image:data.image[0]}
    const res = await axiosPublic.post(image_hosting_api , imageFile, {
        headers:
        {
            "content-type": "multipart/form-data"
        }
    })
    if(res.data.success){
        // now send the menu item data to the server with the image url
        const menuItem={
            name: data.name,
            image: res.data.data.display_url,
            price:parseFloat(data.price),
            category: data.category,
            recipe:data.recipe
           
        }
        const menuRes = await axiosSecure.post('/menu' , menuItem)
        console.log(menuRes.data);
        if(menuRes.data.insertedId){
            reset();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${data.name} added on Menu`,    
                showConfirmButton: false,
                timer: 1500
              });
        }
    }
    
    console.log(res.data)

  };
  return (
    <div>
      <SectionTitle
        heading="---What's new?---"
        subHeading="ADD AN ITEM"
      ></SectionTitle>
      <div className="bg-[#F3F3F3] p-12">
        <form className="" onSubmit={handleSubmit(onSubmit)}>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Recipe name*</span>
            </div>
            <input
              {...register("name" ,{required: true})}
              type="text"
              placeholder="Recipe Name"
              className="input input-bordered w-full"
            />
          </label>

          <div className="flex gap-6 my-6 ">
            {/* category */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Category*</span>
              </div>
              <select
              defaultValue="default"
                {...register("category",{required: true})}
                className="select select-bordered w-full "
              >
                <option disabled value='default'>
                  Category
                </option>
                <option value="salad">Salad</option>
                <option value="pizza">Pizza</option>
                <option value="soup">Soup</option>
                <option value="dessert">Dessert</option>
                <option value="drinks">Drinks</option>
              </select>
            </label>

            {/* price  */}

            <label className="form-control w-full ">
              <div className="label">
                <span className="label-text">Price*</span>
              </div>
              <input
                {...register("price",{required: true})}
                type="number"
                placeholder="Price"
                className="input input-bordered w-full "
              />
            </label>
          </div>
          {/* recipe details */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Recipe Details*</span>
            </div>
            <textarea
            {...register('recipe',{required: true})}
              type="text"
              placeholder="Recipe Details"
              className="textarea textarea-bordered textarea-lg w-full "
            ></textarea>
          </label>

          <div className="form-control w-full my-6">
          <input {...register('image')} type="file" className="file-input w-full max-w-xs" />
          </div>

          <button className="btn bg-[#835D23] ">
          Add Item <FaUtensils></FaUtensils>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddItems;
