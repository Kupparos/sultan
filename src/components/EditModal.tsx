import React, { useState } from "react";
import { Product, SelectOption } from "../types";
import Select from "react-select";
import style from "../styles/editModal.module.css";
import { generateUUID } from "../utils";
import { pictures } from "../constants";

interface ModalProps {
  product: Product;
  closeModal: () => void;
  setProducts: (products: Product[]) => void;
}

export const EditModal: React.FC<ModalProps> = ({
  product,
  closeModal,
  setProducts,
}) => {
  const [currentProduct, setCurrentProduct] = useState<Product>(product);

  const careTypes = JSON.parse(localStorage.getItem("careTypes") || "[]");

  const selectOptions = careTypes.map((item: string) => {
    return { value: item, label: item };
  });

  const handleProductChange = (key: string, value: string) => {
    setCurrentProduct((prevObj) => ({ ...prevObj, [key]: value }));
  };

  const handleSave = () => {
    const products = JSON.parse(localStorage.getItem("products") || "[]");

    const updatedProduct = {
      ...currentProduct,
      id: currentProduct.id || generateUUID(),
    };
    const updatedProducts = products.filter(
      (product: Product) => product.id !== updatedProduct.id
    );
    setProducts([...updatedProducts, updatedProduct]);
    handleClose();
  };

  const handleClose = () => {
    closeModal();
  };

  const handleChangeCareTypeOptions = (
    key: keyof Product,
    option: readonly SelectOption[]
  ) => {
    setCurrentProduct((prevObj) => ({
      ...prevObj,
      [key]: option.map((item) => item.value),
    }));
  };

  return (
    <div className={style.modal}>
      <div className={style.modal_content}>
        <h2>Edit Data id: {currentProduct.id}</h2>
        <form>
          {Object.entries(currentProduct)
            .slice(1, Object.entries(currentProduct).length - 1)
            .map(([key, value], index) =>
              key !== "image" ? (
                <label key={index}>
                  {key}:
                  <input
                    type="text"
                    id={key}
                    name={key}
                    value={value as string}
                    onChange={(e) => handleProductChange(key, e.target.value)}
                  />
                </label>
              ) : (
                <label key={index}>
                  {key}:
                  <select
                    value={value as string}
                    onChange={(e) => handleProductChange(key, e.target.value)}
                  >
                    {pictures.map((picture, index) => (
                      <option key={index} value={picture}>
                        {picture}
                      </option>
                    ))}
                  </select>
                </label>
              )
            )}
          <Select
            defaultValue={selectOptions.filter(
              (item: { value: string; label: string }) =>
                Object.values(currentProduct.care_type).includes(item.value)
            )}
            isMulti
            name="careTypes"
            menuPlacement="top"
            options={selectOptions}
            onChange={(option: readonly SelectOption[]) =>
              handleChangeCareTypeOptions("care_type", option)
            }
          />
          <div className={style.modal_buttons}>
            <button type="button" onClick={handleSave}>
              Save
            </button>
            <button type="button" onClick={handleClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
