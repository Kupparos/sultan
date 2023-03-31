import { Product } from "../types";

export const sizeIcon = (type: string) => {
  switch (type) {
    case "мл":
      return (
        <img
          src="https://api.iconify.design/mdi:bottle-wine.svg?color=%23d6d6d6"
          alt="bottle"
        />
      );
    case "г":
      return (
        <img
          src="https://api.iconify.design/fluent:box-20-filled.svg?color=%23d6d6d6"
          alt=""
        />
      );
  }
};

export function countObjectsWithPropertyValue(
  products: Product[],
  value: string
) {
  let count = 0;
  for (let i = 0; i < products.length; i++) {
    if (products[i].manufacturer === value) {
      count++;
    }
  }
  return count;
}

export function filterProducts(
  products: Product[],
  careTypes: string[],
  sortOption: string,
  manufOptions: string[],
  submitManuf: string,
  piceFromTo: { [key: string]: number }
) {
  let sortedProducts = products.slice();
  const maxPrice = products.reduce((prev, current) =>
  Number(prev.price) > Number(current.price) ? prev : current
).price;

  if (careTypes.length)
    sortedProducts = sortedProducts.filter((item) => {
      return careTypes.every((value) =>
        Object.values(item.care_type).includes(value)
      );
    });

  if (submitManuf)
    sortedProducts = sortedProducts.filter((item) => {
      return item.manufacturer
        .toLowerCase()
        .includes(submitManuf.toLowerCase().trim());
    });

  if (manufOptions.length)
    sortedProducts = sortedProducts.filter((item) => {
      return manufOptions.every((value) => item.manufacturer.includes(value));
    });


  if (piceFromTo.to === 0) piceFromTo.to = Number(maxPrice)
  sortedProducts = sortedProducts.filter(
    (item) =>
      Number(item.price) >= piceFromTo.from &&
      Number(item.price) <= piceFromTo.to
  );

  sortedProducts.sort((a, b) => {
    switch (sortOption) {
      case "priceAsc":
        return Number(a.price) - Number(b.price);
      case "priceDesc":
        return Number(b.price) - Number(a.price);
      case "nameAsc":
        return a.name.localeCompare(b.name);
      case "nameDesc":
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  return sortedProducts;
}

export function generateUUID() {
  var d = new Date().getTime();
  if (
    typeof performance !== "undefined" &&
    typeof performance.now === "function"
  ) {
    d += performance.now();
  }
  var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    }
  );
  return uuid;
}
