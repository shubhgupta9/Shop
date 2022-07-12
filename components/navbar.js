import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AiOutlineShoppingCart,
  AiFillCloseCircle,
  AiFillPlusCircle,
  AiFillMinusCircle,
} from "react-icons/ai";
import { BsFillBagCheckFill } from "react-icons/bs";
import { MdAccountCircle } from "react-icons/md";
import { useRef, useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import Router from "next/dist/server/router";

function Navbar({
  logout,
  user,
  cart,
  addToCart,
  removeFromCart,
  clearCart,
  subTotal,
}) {
  const [dropdown, setDropdown] = useState(false);

  const [sidebar, setSidebar] = useState(false);

  useEffect(() => {
    Object.keys(cart).length !== 0 && setSidebar(true);
    let exempted = ["/checkout", "/order", "/orders", "/myaccount"];
    if (exempted.includes(Router.pathname)) setSidebar(false);
  }, []);

  const toggleCart = () => {
    setSidebar(!sidebar);
    // if (ref.current.classList.contains("translate-x-full")) {
    //   ref.current.classList.remove("translate-x-full");
    //   ref.current.classList.add("translate-x-0");
    // } else if (!ref.current.classList.contains("translate-x-full")) {
    //   ref.current.classList.remove("translate-x-0");
    //   ref.current.classList.add("translate-x-full");
    // }
  };
  const ref = useRef();
  return (
    <>
      {!sidebar && (
        <span className="absolute right-12 top-4 z-30">
          {dropdown && (
            <div
              onMouseOver={() => {
                setDropdown(true);
              }}
              onMouseLeave={() => {
                setDropdown(false);
              }}
              className="fixed right-12 bg-white shadow-lg top-11 border rounded-md py-2 px-5 w-32 z-30"
            >
              <ul>
                <Link href={"/myaccount"}>
                  <li className="py-1 hover:text-pink-800 text-sm">
                    My Account
                  </li>
                </Link>
                <Link href={"/orders"}>
                  <li className="py-1 hover:text-pink-800 text-sm">Orders</li>
                </Link>

                <li
                  onClick={logout}
                  className="py-1 hover:text-pink-800 text-sm"
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
          <span
            onMouseOver={() => {
              setDropdown(true);
            }}
            onMouseLeave={() => {
              setDropdown(false);
            }}
          >
            {user.value && (
              <MdAccountCircle className=" fixed right-12 text-xl md:text-3xl mx-2" />
            )}
          </span>
        </span>
      )}
      <div
        className={`flex flex-col md:flex-row md:justify-start font-semibold items-center justify-center mb-1 py-2 shadow-xl sticky top-0 bg-white z-10 ${
          !sidebar && "overflow-hidden"
        }`}
      >
        <div className="logo mx-5">
          <Link href={"/"}>
            <a>
              <Image width={50} height={40} src="/logo.png" alt="codeshop" />
            </a>
          </Link>
        </div>
        <div className="nav">
          <ul className="flex items-center space-x-4 font-bold md:text-sm">
            <Link href={"/tshirts"}>
              <a>
                <li className="hover:text-pink-500">Tshirts</li>
              </a>
            </Link>
            <Link href={"/hoodies"}>
              <a href="">
                <li className="hover:text-pink-500">Hoodies</li>
              </a>
            </Link>
            <Link href={"/jeans"}>
              <a href="">
                <li className="hover:text-pink-500">Jeans</li>
              </a>
            </Link>
            <Link href={"/shoes"}>
              <a href="">
                <li className="hover:text-pink-500">Sneakers</li>
              </a>
            </Link>
          </ul>
        </div>
        <div className="cursor-pointer items-center cart absolute right-0 top-4 mx-5 flex">
          {!user.value && (
            <Link href={"/login"}>
              <a>
                <button className="bg-pink-600 px-2 py-1 mx-2 rounded-md text-sm text-white">
                  Login
                </button>
              </a>
            </Link>
          )}

          <AiOutlineShoppingCart
            onClick={toggleCart}
            className="text-2xl md:text-3xl"
          />
        </div>
        <div
          ref={ref}
          className={`w-72 h-[100vh] overflow-y-scroll sideCart top-0 z-10 absolute bg-pink-100 px-8 py-10  transition-all ${
            sidebar ? `right-0` : `-right-96`
          }`}
        >
          <h2 className="font-bold text-xl text-center">Shopping Cart</h2>
          <span
            onClick={toggleCart}
            className="absolute top-4 right-4 font-bold text-pink-500 cursor-pointer text-2xl"
          >
            <AiFillCloseCircle />
          </span>
          <ol className="list-decimal font-semibold">
            {Object.keys(cart).length == 0 && (
              <div className="my-4 font-normal">Your cart is empty!</div>
            )}

            {Object.keys(cart).map((k) => {
              return (
                <li key={k}>
                  <div className="item flex my-5">
                    <div className="w-2/3 font-semibold">
                      {cart[k].Name}({cart[k].size}/{cart[k].variant})
                    </div>
                    <div className="flex font-semibold items-center justify-center w-40 h-auto">
                      <AiFillMinusCircle
                        onClick={() => {
                          removeFromCart(
                            k,
                            1,
                            cart[k].price,
                            cart[k].Name,
                            cart[k].size,
                            cart[k].variant
                          );
                        }}
                        className="mx-3 text-pink-500 text-xl"
                      />
                      <span className="mx-2 text-sm">{cart[k].qty}</span>
                      <AiFillPlusCircle
                        onClick={() => {
                          addToCart(
                            k,
                            1,
                            cart[k].price,
                            cart[k].Name,
                            cart[k].size,
                            cart[k].variant
                          );
                        }}
                        className="text-pink-500 mx-3 text-xl"
                      />
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
          <div className="total font-bold my-2">Subtotal: ₹{subTotal}</div>

          <div className="flex">
            <Link href={"/checkout"}>
              <button
                disabled={Object.keys(cart).length === 0}
                className="disabled:bg-pink-300 flex mr-2 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm"
              >
                <BsFillBagCheckFill className="m-1" /> Checkout
              </button>
            </Link>
            <button
              disabled={Object.keys(cart).length === 0}
              onClick={clearCart}
              className="disabled:bg-pink-300 flex mr-2 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm"
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
