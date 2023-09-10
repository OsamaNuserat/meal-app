import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import client from "../../services/api";
import Loader from "../../components/Loader/Loader";
import { useState } from "react";
import { Link } from "react-router-dom";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [productid, setproductid] = useState('');
  const queryClient = useQueryClient();
  const getCart = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      try {
        const result = await client.get("/cart");
        return result.data;
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess: (data) => {
      setProducts(data.cart.Products);
      setTotalPrice(
        data.cart.Products.reduce((acc, item) => {
          const { categoryId: product } = item;
          const price = product.price * item.qty;
          return acc + price;
        }, 0)
      );
    },
  });
 
const addToCartMutaion = useMutation({
    mutationFn: async () => {
      try {
        const result = await client.post(`/cart/${productid}/-1`);
        return result.data;
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess: (data) => {
      queryClient.refetchQueries("cart");
    },
  });
  const addToCart = async () => {
    try {
      await addToCartMutaion.mutateAsync();
    } catch (error) {
      errorMessage(error.message);
    }
  };
  console.log(getCart.data);
  if (getCart.isLoading) {
    return <Loader />;
  }
  return (
    <section className=" px-4 text-gray-600 antialiased">
      <div className="flex h-full flex-col justify-center">
        <div className="mx-auto w-full max-w-2xl rounded-sm border border-gray-200 bg-white shadow-lg">
          <header className="border-b border-gray-100 px-5 py-4">
            <div className="font-semibold text-gray-800">Manage Cart</div>
          </header>

          <div className="overflow-x-auto p-3">
            <table className="w-full table-auto">
              <thead className="bg-gray-50 text-xs font-semibold uppercase text-gray-400">
                <tr>
                  <th></th>
                  <th className="p-2">
                    <div className="text-left font-semibold">Product Name</div>
                  </th>
                  <th className="p-2">
                    <div className="text-left font-semibold">Quantity</div>
                  </th>
                  <th className="p-2">
                    <div className="text-left font-semibold">Total</div>
                  </th>
                  <th className="p-2">
                    <div className="text-center font-semibold">Action</div>
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100 text-sm">
                {products &&
                  products.map((item) => {
                    const { categoryId: product } = item;
                    const price = product.price * item.qty;
                    return (
                      <tr key={item.id}>
                        <td className="p-2">
                          <input
                            type="checkbox"
                            className="h-5 w-5"
                            value="id-1"
                          />
                        </td>
                        <td className="p-2">
                          <div className="font-medium text-gray-800">
                            {product.name}
                          </div>
                        </td>
                        <td className="p-2">
                          <div className="text-left">{item.qty}</div>
                        </td>
                        <td className="p-2">
                          <div className="text-left font-medium text-green-500">
                            {price.toFixed(2) + "JOD"}
                          </div>
                        </td>
                        <td className="p-2">
                          <div className="flex justify-center">
                            <button onClick={()=> {
                              setproductid(product._id)
                              addToCart()
                            }}>
                              <svg
                                className="h-8 w-8 rounded-full p-1 hover:bg-gray-100 hover:text-blue-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                ></path>
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between space-x-4 border-t border-gray-100 px-5 py-4 ">
            <div className="flex items-center gap-4">
              <span className="font-bold">Total</span>
              <div className="text-indigo-600">
                {totalPrice.toFixed(2)} <span>JOD</span>
              </div>
            </div>
            <button>
              <Link
                to="/checkout"
                className="bg-indigo-100 text-indigo-900 py-2 px-4 rounded-md font-normal text-md"
              >
                Procced to checkout
              </Link>
            </button>
          </div>

          <div className="flex justify-end">
            <input type="hidden" className="border border-black bg-gray-50" />
          </div>
        </div>
      </div>
    </section>
  );
};
export default Cart;