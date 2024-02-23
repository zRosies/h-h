import { useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { FaPaypal } from "react-icons/fa";
import { FaCreditCard } from "react-icons/fa";
import { IoMdCash } from "react-icons/io";
import { Product } from "./productCard";

export function Checkout({
  product,
  setCardOpen,
  setSucess,
}: {
  product: Product;
  setCardOpen: any;
  setSucess: any;
}) {
  const [submitting, setIsSubmitting] = useState(false);

  const submitPurchase = async (e: any) => {
    e.preventDefault();

    if (submitting) {
      return;
    }
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);

    const name = e.target.elements.name.value;
    const email = e.target.elements.email.value;
    const address = e.target.elements.address.value;
    const payment = formData.get("paymentMethod") as string;

    const payLoad = {
      name: name,
      email: email,
      address: address,
      paymentMethod: payment,
      productId: product._id,
    };
    console.log(payLoad);

    const response = await fetch("/api/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payLoad),
    });

    if (response.status === 200) {
      setSucess(true);
      setCardOpen(false);
    }
  };
  return (
    <>
      <div
        className="w-full h-full fixed z-30 bg-[rgba(0,0,0,0.6)] left-0 top-0"
        onClick={() => setCardOpen((prevState: boolean) => !prevState)}
      ></div>
      <form
        onSubmit={submitPurchase}
        action=""
        className="fixed inset-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[340px] md:max-w-[500px]  flex flex-col shadow-lg w-full justify-center bg-white z-50 rounded-[6px]"
      >
        <h1 className="border-b-2 border-gray-200 items-center font-bold p-2 px-4 bg-white justify-between flex  ">
          <span>Buy art</span>
        </h1>
        <section className="px-5 flex flex-col py-5 gap-5 bg-white">
          <label htmlFor="name">
            Name:
            <input
              type="text"
              name="name"
              id="name"
              required
              className="w-full border-2 border-gray-200"
            />
          </label>
          <label htmlFor="address">
            Address:
            <input
              type="text"
              name="address"
              id="address"
              required
              className="w-full  border-2 border-gray-200 "
            />
          </label>
          <label htmlFor="email">
            Email:
            <input
              type="text"
              name="email"
              id="email"
              required
              className="w-full  border-2 border-gray-200"
            />
          </label>
          <div className="w-full">
            <fieldset className="flex gap-5 my-2">
              <legend>Select Payment Method:</legend>
              <label>
                <input type="radio" name="paymentMethod" value="paypal" />
                <FaPaypal className="text-[#3B556E]" />
              </label>
              <label>
                <input type="radio" name="paymentMethod" value="debit" />{" "}
                <FaCreditCard className="text-[#ECA11F]" />
              </label>
              <label>
                <input type="radio" name="paymentMethod" value="cash" />{" "}
                <IoMdCash className="text-green-800" />
              </label>
            </fieldset>

            <div>
              <h3 className="my-5 border-b-2 border-gray-300">Total</h3>
              <p className="text-end font-bold">$ {product.price}</p>
            </div>
          </div>
          <button
            type="submit"
            className={`flex w-full bg-[#b14716] hover:bg-[#c6531f] text-white justify-center p-3 rounded-[6px] items-center ${
              submitting && " pointer-events-none"
            }`}
          >
            Buy
            {submitting && (
              <span className="animate-loading ml-2">
                <AiOutlineLoading />
              </span>
            )}
          </button>
        </section>
      </form>
    </>
  );
}
