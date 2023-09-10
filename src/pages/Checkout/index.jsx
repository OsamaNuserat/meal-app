import { FormProvider, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CheckoutForm from "./components/CheckoutForm";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import client from "../../services/api";
import Loader from "../../components/Loader/Loader";
import { errorMessage, successMessage } from "../../utils/toast";

const CheckoutSchema = z.object({
  address: z.string().nonempty(),
  phonenumber: z.string().nonempty(),
  paymentMethod: z.string().nonempty(),
  Products: z.array(
    z.object({
      categoryId: z.string().nonempty(),
      quantity: z.number(),
      price: z.number(),
    })
  ),
});

const Checkout = () => {
  const checkoutFormProps = useForm({
    mode: "onChange",
    resolver: zodResolver(CheckoutSchema),
  });
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const getCart = useQuery({
    queryKey: ["cart"],
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: false,
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
      checkoutFormProps.setValue(
        "Products",
        data.cart.Products.map((item) => {
          const { categoryId: product } = item;
          return {
            categoryId: product.id,
            quantity: product.quantity,
            price: product.price,
          };
        })
      );
      setTotalPrice(
        data.cart.Products.reduce((acc, item) => {
          const { categoryId: product } = item;
          const price = product.price * product.quantity;
          return acc + price;
        }, 0)
      );
    },
  });

  const createOrder = useMutation({
    mutationFn: async (body) => {
      try {
        const result = await client.post("/order", body);
        return result;
      } catch (error) {
        errorMessage({
          message: error.message,
        });
      }
    },
    onSuccess: () => {
      successMessage({
        message: `Order created`,
      });
    },
  });

  const onSubmit = async (body) => {
    try {
      const result = await createOrder.mutateAsync(body);
      return result;
    } catch (error) {
      errorMessage({
        message: error.message,
      });
      console.log(error);
    }
  };

  if (getCart.isLoading) {
    return <Loader />;
  }
  return (
    <div className="container mt-12">
      <div className="grid grid-cols-3">
        <div className="lg:col-span-2 col-span-3 px-12">
          <div className="mt-8 p-4 relative flex flex-col sm:flex-row sm:items-center bg-white shadow rounded-md">
            <div className="flex flex-row items-center border-b sm:border-b-0 w-full sm:w-auto pb-4 sm:pb-0">
              <div className="text-yellow-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 sm:w-5 h-6 sm:h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="text-sm font-medium ml-3">Checkout</div>
            </div>
            <div className="text-sm tracking-wide text-gray-500 sm:ml-4">
              Complete your shipping and payment details below.
            </div>
            <div className="absolute sm:relative sm:top-auto sm:right-auto ml-auto right-4 top-4 text-gray-400 hover:text-gray-800 cursor-pointer">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </div>
          </div>
          <div className="rounded-md">
            <FormProvider {...checkoutFormProps}>
              <CheckoutForm totalPrice={totalPrice} onSubmit={onSubmit} />
            </FormProvider>
          </div>
        </div>
        <div className="col-span-1 bg-white lg:block hidden">
          <h1 className="py-6 border-b-2 text-xl text-gray-600 px-8">
            Order Summary
          </h1>
          <ul className="py-6 border-b space-y-6 px-8">
            {products &&
              products.map((item) => {
                const { categoryId: product } = item;
                const price = product.price * product.quantity;
                return (
                  <li
                    key={item.id}
                    className="grid grid-cols-6 gap-2 border-b-1"
                  >
                    <div className="col-span-1 self-center h-10">
                      <img
                        src={product.image.secure_url}
                        alt="Product"
                        className="rounded w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col col-span-3 pt-2">
                      <span className="text-gray-600 text-md font-semi-bold">
                        {product.name}
                      </span>
                    </div>
                    <div className="col-span-2 pt-3">
                      <div className="flex items-center space-x-2 text-sm justify-between">
                        <span className="text-gray-400">
                          {" "}
                          {product.quantity} x {product.price.toFixed(2)}JOD
                        </span>
                        <span className="text-pink-400 font-semibold inline-block">
                          {price.toFixed(2)}JOD
                        </span>
                      </div>
                    </div>
                  </li>
                );
              })}
          </ul>
          <div className="px-8 border-b">
            <div className="flex justify-between py-4 text-gray-600">
              <span>Subtotal</span>
              <span className="font-semibold text-pink-500">
                {totalPrice.toFixed(2)}JOD
              </span>
            </div>
            <div className="flex justify-between py-4 text-gray-600">
              <span>Shipping</span>
              <span className="font-semibold text-pink-500">Free</span>
            </div>
          </div>
          <div className="font-semibold text-xl px-8 flex justify-between py-8 text-gray-600">
            <span>Total</span>
            <span>{totalPrice.toFixed(2)}JOD</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Checkout;
