import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { PlusIcon } from "@heroicons/react/24/outline";
import Product from "../Product";

const Products = ({ data }) => {
  return (
    <div className="mx-auto  py-24 px-24">
      <div className="mx-auto max-w-4xl lg:text-center mb-16">
        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Trending Meals
        </p>
        <p className="mt-6 text-lg leading-8 text-gray-900">
          Our app is designed to make your life easier. With a wide range of
          features and a user-friendly interface, you can enjoy a seamless and
          hassle-free experience from start to finish.
        </p>
      </div>
      <div>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {data &&
            data.categories.length > 0 &&
            data.categories.map((product) => (
              <Product
                key={product.id}
                product={product}
                buttonClassName="items-center absolute top-0 z-10 right-0 left-0 bottom-0 justify-center hidden group-hover:flex  group-hover:bg-black/30"
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
