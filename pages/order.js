import React from "react";
import { useRouter } from "next/router";
import Order from "../models/Order";
import mongoose from "mongoose";
import { useEffect } from "react";

function MyOrder(order, clearCart) {
  const router = useRouter();
  const products = order.products;
  useEffect(() => {
    if (router.query.clearCart == 1) {
      clearCart();
    }
  }, []);

  return (
    <div>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                CODESHOP
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">
                Order Id: #{order.orderId}
              </h1>
              <p className="leading-relaxed mb-4">
                Your order has been successfully placed. Your payment status is{" "}
                {order.status}
              </p>
              <div className="flex mb-4">
                <a className="flex-grow text-center border-gray-300 py-2 text-lg px-1">
                  Item Description
                </a>
                <a className="flex-grow text-center border-gray-300 py-2 text-lg px-1">
                  Quantity
                </a>
                <a className="flex-grow text-center border-gray-300 py-2 text-lg px-1">
                  Item Total
                </a>
              </div>

              {Object.keys(products).map((key) => {
                return (
                  <div key={key} className="flex border-t border-gray-200 py-2">
                    <span className="text-gray-500">
                      {products[key].name}({products[key].size}/
                      {products[key].variant})
                    </span>
                    <span className="ml-auto text-gray-900">
                      {products[key].qty}
                    </span>
                    <span className="ml-auto text-gray-900 text-center">
                      ₹{products[key].price} X {products[key].qty} = ₹
                      {products[key].price * products[key].qty}
                    </span>
                  </div>
                );
              })}

              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">
                  ₹{order.amount}.00
                </span>
                <button className="flex ml-auto text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded">
                  Track Order
                </button>
              </div>
            </div>
            <img
              alt="ecommerce"
              className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
              src="https://dummyimage.com/400x400"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let order = await Order.findById(context.query._id);

  return {
    props: {
      product: JSON.parse(JSON.stringify(order)),
    },
  };
}
export default MyOrder;
