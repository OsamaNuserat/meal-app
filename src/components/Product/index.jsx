import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { errorMessage, successMessage } from "../../utils/toast";
import { useNavigate } from "react-router-dom";
import client from "../../services/api";

const Product = ({ product, label, buttonClassName }) => {
  let [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const addToCartMutaion = useMutation({
    mutationFn: async () => {
      try {
        const result = await client.post(`/cart/${product.id}/1`);
        return result.data;
      } catch (error) {
        errorMessage({
          message: "Unable to add to cart",
        });
      }
    },
    onSuccess: (data) => {
      queryClient.refetchQueries("cart");
      setIsOpen(false);
      successMessage({
        message: "Added to cart successfully",
      });
    },
  });

  const addToCart = async () => {
    try {
      await addToCartMutaion.mutateAsync();
    } catch (error) {
      errorMessage(error.message);
    }
  };

  return (
    <div>
      <div key={product.id} className="group relative">
        <div className="aspect-h-1 aspect-w-1 w-full relative rounded-md bg-gray-200 lg:aspect-none lg:h-80">
          <img
            src={product.image.secure_url}
            alt={product.name}
            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
          />

          <button
            type="button"
            onClick={openModal}
            className={
              "items-center absolute top-0 z-10 right-0 left-0 bottom-0 justify-center hidden group-hover:flex  group-hover:bg-black/30"
            }
          >
            <PlusIcon className="w-12 h-12 stroke-white" />
          </button>
        </div>

        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-sm text-gray-700">
              <a href="#">{product.name}</a>
            </h3>
          </div>
          <p className="text-sm font-medium text-gray-900">{product.price} JOD</p>
        </div>
      </div>

      <Transition
        show={isOpen}
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
        as={Fragment}
      >
        <Dialog
          onClose={() => setIsOpen(false)}
          className="fixed inset-0 z-10 overflow-y-auto top-0 right-0 left-0 bottom-0 w-full h-screen"
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div
                className="fixed inset-0 z-[5] overflow-y-auto top-0 right-0 left-0 bottom-0 w-full h-screen bg-black/50"
                aria-hidden="true"
              />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full relative z-10 max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 border-b border-gray-800 pb-4 mb-4"
                >
                  {product.name}
                </Dialog.Title>
                <div>
                  <div>
                    <img
                      src={product.image.secure_url}
                      alt={product.name}
                      className="h-full w-full object-cover object-center rounded-md shadow-md lg:h-full lg:w-full"
                    />
                  </div>
                  <p className="text-sm text-gray-500 border-t pt-2">
                    {product.description}
                  </p>
                </div>

                <div className="mt-4 flex gap-5">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm text-indigo-900 bg-indigo-100 border border-transparent rounded-md hover:bg-indigo-200 duration-300"
                    onClick={addToCart}
                  >
                    Add to cart
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 duration-300"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default Product;
