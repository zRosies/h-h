"use client";

import ProductCard, { Product } from "../product/productCard";
import { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { MdWarning } from "react-icons/md";

export function RenderProducts({ products }: { products: any[] }) {
  const [filteredProducts, setfilteredProducts] = useState<any[]>(products);
  const [query, setQuery] = useState("");

  //----------------- This function handles the filtering -------------------------------
  const setFiltered = () => {
    const queryFormatted = query.toLowerCase();
    const queryRegex = new RegExp(queryFormatted, "i");

    const filteredNames = products.filter((product) => {
      return (
        queryRegex.test(product.category) ||
        queryRegex.test(product.seller.level)
      );
    });
    setfilteredProducts(filteredNames);
  };
  // ---------- This part filters based on the category and crafter seller ------------

  const handleFilterChange = (string: string) => {
    setQuery(string);
  };

  //----------This part filters based on the the product price range-----------------

  const handlePriceRange = (minPrice: number, maxPrice: number) => {
    const filtered = products.filter(
      (product) => product.price >= minPrice && product.price <= maxPrice
    );
    setfilteredProducts(filtered);
  };

  useEffect(() => {
    if (query.length > 0) {
      setFiltered();
    }
  }, [query, products]);

  return (
    <>
      <section className="flex mb-[10rem] mx-2 md:gap-5 ">
        <section className="max-w-[150px] md:max-w-[200px] rounded-[8px] w-full border-2 border-gray-200 mx-[0.5rem]">
          <h1 className="bg-[#EDEDED] font-semibold p-2">Filters</h1>
          <details className="flex w-full">
            <summary className="font-semibold flex border-t-2 border-b-2 border-gray-100 px-1 py-3">
              <h3 className="flex flex-row justify-between items-center w-full mx-1 cursor-pointer  ">
                <span>Categories </span>
                <span>
                  <FaChevronDown />
                </span>
              </h3>
            </summary>
            <p
              onClick={() => setfilteredProducts(products)}
              className="cursor-pointer mx-2 py-3 border-b-2"
            >
              All
            </p>
            <p
              onClick={() => handleFilterChange("Art")}
              className="cursor-pointer mx-2  py-3 border-b-2"
            >
              Art
            </p>
            <p
              onClick={() => handleFilterChange("Accessory")}
              className="cursor-pointer mx-2  py-3 border-b-2"
            >
              Accessory
            </p>
            <p
              onClick={() => handleFilterChange("Ornment")}
              className="cursor-pointer mx-2  py-3 border-b-2"
            >
              Ornment
            </p>
            <p
              onClick={() => handleFilterChange("Sculpture")}
              className="cursor-pointer mx-2 py-3"
            >
              Sculpture
            </p>
          </details>
          <details>
            <summary className="font-semibold flex border-t-2 border-b-2 border-gray-100 px-1 py-3">
              <h3 className="flex flex-row justify-between items-center w-full mx-1 cursor-pointer">
                Price{" "}
                <span className="ml-2">
                  <FaChevronDown />
                </span>
              </h3>
            </summary>
            <div className=" cursor-pointer">
              <p
                onClick={() => handlePriceRange(0, 25)}
                className="cursor-pointer mx-2 py-3 border-b-2"
              >
                0$ - 25$
              </p>
              <p
                onClick={() => handlePriceRange(25, 50)}
                className="cursor-pointer mx-2 py-3 border-b-2"
              >
                25$ - 50${" "}
              </p>
              <p
                onClick={() => handlePriceRange(50, 100)}
                className="cursor-pointer mx-2 py-3 border-b-2"
              >
                50$ - 100$
              </p>
              <p
                onClick={() => handlePriceRange(100, 200)}
                className="cursor-pointer mx-2 py-3 border-b-2"
              >
                100$ - 200$
              </p>
              <p
                onClick={() => handlePriceRange(200, 1000000000000000)}
                className="py-2 mx-2"
              >
                {" "}
                Over 200$
              </p>
            </div>
          </details>
          <details>
            <summary className="font-semibold flex border-t-2 border-b-2 border-gray-100 px-1 py-2">
              <h3 className="flex flex-row justify-between items-center w-full mx-1 cursor-pointer py-2">
                Crafter level{" "}
                <span className="ml-2">
                  <FaChevronDown />
                </span>
              </h3>
            </summary>
            <div className="mx-2">
              <p
                onClick={() => handleFilterChange("Beginner")}
                className="cursor-pointer mx-2 py-3 border-b-2"
              >
                Beginner
              </p>
              <p
                onClick={() => handleFilterChange("Intermediate")}
                className="cursor-pointer mx-2 py-3 border-b-2"
              >
                Intermediate
              </p>
              <p
                onClick={() => handleFilterChange("Advanced")}
                className="cursor-pointer mx-2 py-3 border-b-2"
              >
                Advanced
              </p>
              <p
                onClick={() => handleFilterChange("Expert")}
                className="cursor-pointer mx-2 py-3 border-b-2"
              >
                Expert
              </p>
            </div>
          </details>
        </section>

        {filteredProducts.length > 0 ? (
          <div className="flex flex-wrap gap-5 max-w-[230px] w-full md:max-w-[1920px]">
            <>
              {filteredProducts.map((product: Product) => (
                <div
                  key={product.title}
                  className="lg:max-w-[250px] max-w-[220px] h-[380px]  w-full bg-[#EDEDED]"
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </>
          </div>
        ) : (
          <p className="text-center text-red-500 flex self-center content-center justify-center mt-40 mx-auto mb-[20rem] items-center text">
            No product found! <MdWarning className=" ml-4" />
          </p>
        )}
      </section>
    </>
  );
}
