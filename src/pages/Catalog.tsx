import React, { useEffect, useState } from "react";
import style from "../styles/catalog.module.css";
import ItemCard from "../components/ItemCard";
import { Product } from "../types";
import { countObjectsWithPropertyValue, filterProducts } from "../utils";
import BreadCrumbs from "../components/BreadCrumbs";
import ReactPaginate from "react-paginate";
import careTypesFromJSON from "../careType.json";
import goodsFromJSON from "../goods.json";
import { selectOptions } from "../constants";

const productsFromLS = JSON.parse(localStorage.getItem("products") || "[]");
const careTypesFromLS = JSON.parse(localStorage.getItem("careTypes") || "[]");

const dataProducts = productsFromLS.length ? productsFromLS : goodsFromJSON;
const careTypes: string[] = careTypesFromLS.length
  ? careTypesFromLS
  : careTypesFromJSON;

const products: Product[] = dataProducts.map(
  (item: Product) => item as Product
);
const manufacturers: string[] = Array.from(
  new Set(products.map((product: Product) => product.manufacturer))
);
const maxPrice = products.reduce((prev: Product, current: Product) =>
  Number(prev.price) > Number(current.price) ? prev : current
).price;

export default function Catalog() {
  const [sortOption, setSortOption] = useState<string>(selectOptions[2].value);
  const [filterOptions, setFilterOptions] = useState<string[]>([]);
  const [manufOptions, setManufOptions] = useState<string[]>([]);
  const [searchedManuf, setSearchedManuf] = useState("");
  const [submitManuf, setSubmitManuf] = useState("");
  const [piceFromTo, setPiceFromTo] = useState({
    from: 0,
    to: Number(maxPrice),
  });
  const [filteredData, setFilteredData] = useState<Product[]>([]);
  const [showManuf, setShowManuf] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  window.addEventListener("resize", () => setWindowWidth(window.innerWidth));
  const [currentPage, setCurrentPage] = useState(0);

  const addFilterOption = (value: string) => {
    if (filterOptions.includes(value))
      return setFilterOptions((prevArray) =>
        prevArray.filter((element) => element !== value)
      );
    setFilterOptions((prevArray) => prevArray.concat(value));
  };

  const addManufOption = (value: string) => {
    if (manufOptions.includes(value))
      return setManufOptions((prevArray) =>
        prevArray.filter((element) => element !== value)
      );
    setManufOptions((prevArray) => prevArray.concat(value));
  };

  const currentPageData = filteredData.slice(
    currentPage * 9,
    (currentPage + 1) * 9
  );

  const pageCount = Math.ceil(filteredData.length / 9);

  const handlePageClick = (selectedPage: { selected: number }) => {
    setCurrentPage(selectedPage.selected);
  };

  useEffect(() => {
    setFilteredData(
      filterProducts(
        products,
        filterOptions,
        sortOption,
        manufOptions,
        submitManuf,
        piceFromTo
      )
    );
  }, [
    filterOptions,
    products,
    sortOption,
    manufOptions,
    submitManuf,
    piceFromTo,
  ]);

  return (
    <div className={style.catalog} data-testid="catalog-part">
      <div className="container">
        <div className={style.bread_crumbs}>
          <BreadCrumbs />
        </div>
        <div className={style.title}>
          <h1>{"Косметика и гигиена".toUpperCase()}</h1>
          <div className={style.sort_by}>
            <p>Сортировка:</p>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              {selectOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}{" "}
                  {option.value === "priceAsc" || option.value === "nameAsc" ? (
                    <>&#129061;</>
                  ) : (
                    <>&#129063;</>
                  )}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className={style.tags}>
          {careTypes.map((item: string, index: number) => (
            <button
              className={
                filterOptions.includes(item) ? style.tag_active : style.tag
              }
              key={index}
              onClick={() => addFilterOption(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <div className={style.main}>
          <div className={style.filter}>
            <div className={style.filter_title}>
              <h2>ПОДБОР ПО ПАРАМЕТРАМ</h2>
              <button
                className={style.filter_title_button}
                onClick={() => setShowDropdown((prev) => !prev)}
              >
                {showDropdown ? <>&#708;</> : <>&#709;</>}
              </button>
            </div>
            {(windowWidth > 650 || showDropdown) && (
              <>
                <div className={style.price}>
                  <p>
                    Цена <span>&#8376;</span>
                  </p>
                  <div className={style.price_range}>
                    <input
                      type="number"
                      className={style.range}
                      placeholder="0"
                      onChange={(e) =>
                        setPiceFromTo((prevObj) => ({
                          ...prevObj,
                          from: Number(e.target.value),
                        }))
                      }
                    />{" "}
                    &ndash;{" "}
                    <input
                      type="number"
                      className={style.range}
                      placeholder={`${maxPrice}`}
                      onChange={(e) =>
                        setPiceFromTo((prevObj) => ({
                          ...prevObj,
                          to: Number(e.target.value),
                        }))
                      }
                    />
                  </div>
                </div>
                <div className={style.manufacturer}>
                  <p>Производитель</p>
                  <div className={style.search}>
                    <input
                      type="text"
                      placeholder="Поиск..."
                      value={searchedManuf}
                      onChange={(e) => setSearchedManuf(e.target.value)}
                    />
                    <button onClick={() => setSubmitManuf(searchedManuf)}>
                      <img
                        src="https://api.iconify.design/ep:search.svg?color=%23ffffff"
                        alt="search"
                      />
                    </button>
                  </div>
                  <div className={style.checkName}>
                    {(showManuf
                      ? manufacturers
                      : manufacturers.slice(0, 4)
                    ).map((item: string, index: number) => (
                      <div key={index}>
                        <input
                          type="checkbox"
                          name={item}
                          onChange={() => addManufOption(item)}
                        />
                        <label>
                          <>
                            {item}{" "}
                            <span>
                              &#40;
                              {countObjectsWithPropertyValue(products, item)}
                              &#41;
                            </span>
                          </>
                        </label>
                      </div>
                    ))}
                    {!showManuf && (
                      <button onClick={() => setShowManuf((prev) => !prev)}>
                        Показать все
                        <img
                          src="https://api.iconify.design/material-symbols:arrow-drop-down-rounded.svg?color=%233f4e65"
                          alt=""
                        />
                      </button>
                    )}
                  </div>
                </div>
              </>
            )}
            <div className={style.tags_side}>
              {careTypes.map((item: string, index: number) => (
                <button
                  className={
                    filterOptions.includes(item) ? style.tag_active : style.tag
                  }
                  key={index}
                  onClick={() => addFilterOption(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div className={style.card_list}>
            <div className={style.cards}>
              {currentPageData.length ? (
                currentPageData.map((item: Product) => (
                  <ItemCard key={item.id} item={item} />
                ))
              ) : (
                <p style={{ color: "#3f4e65", margin: "10px" }}>
                  Ничего не найдено
                </p>
              )}
            </div>
            <ReactPaginate
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              nextLabel=">"
              previousLabel="<"
              containerClassName={style.pagination}
              activeClassName={style.active}
              nextClassName={style.next}
              previousClassName={style.previous}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
