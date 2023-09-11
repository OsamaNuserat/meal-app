import { useQuery } from "@tanstack/react-query";
import Products from "../../components/Products";
import WhyUs from "../WhyUs";
import client from "../../services/api";
import Loader from "../../components/Loader/Loader";

const HomePage = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      try {
        const result = await client.get("/category");
        return result.data;
      } catch (error) {
        console.log(error);
      }
    },
  });
  if (isLoading) {
    return <Loader />;
  }
  // console.log(data);
  return (
    <div>
      <div className="container">
        <div className="text-center mb-24 max-w-5xl mx-auto h-[60vh] flex justify-center flex-col">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Satisfy cravings swiftly with EatMore.
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Delight in the convenience of a world-class culinary experience
            brought to your doorstep with Talabat. Browse diverse menus,
            customize orders, track deliveries in real time, and savor every
            bite from your favorite restaurants, all through a seamless app
            interface.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="#"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Get started
            </a>
            <a
              href="#"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Learn more <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
      <WhyUs />
      <Products data={data} />
    </div>
  );
};
export default HomePage;
