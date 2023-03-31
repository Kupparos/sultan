import React, { useState, useEffect, useContext } from "react";
import { Product } from "../types";
import styles from "../styles/admin.module.css";
import { EditModal} from "../components/EditModal";
import { objLayout } from "../constants";

export default function Admin() {
  const [products, setProducts] = useState<Product[]>(JSON.parse(
    localStorage.getItem("products") || "[]"
  ));
  const [careTypes, setCareTypes] = useState<string[]>(JSON.parse(
    localStorage.getItem("careTypes") || "[]"
  ));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product>(objLayout);
  const [careTypeValue, setCareTypeValue] = useState<string>("");

  const handleEditClick = (product: Product) => {
    setCurrentProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    localStorage.setItem("careTypes", JSON.stringify(careTypes));
  }, [careTypes]);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const handleProductDelete = (id: string) => {
    const updatedProducts = products.filter(
      (product: Product) => product.id !== id
    );
    setProducts(updatedProducts)
    localStorage.setItem("cart", JSON.stringify([]));
  };

  const handleCareTypeDelete = (value: string) => {
    const updatedCareTypes = careTypes.filter((item: string) => item !== value);
    setCareTypes(updatedCareTypes)
    deleteCareTypeFromProducts(value)
  };

  const deleteCareTypeFromProducts = (value: string) => {
    const updatedProducts = products.map((product: Product) => {
      const updatedCareType = Object.values(product.care_type).filter((item: string) => item !== value)
      return {
        ...product,
        care_type: updatedCareType
      }
    })
    setProducts(updatedProducts)
  }

  const createCareType = () => {
    setCareTypes([...careTypes, careTypeValue])
    setCareTypeValue('')
  }

  return (
    <>
      {isModalOpen && <EditModal product={currentProduct} closeModal={closeModal} setProducts={setProducts}/>}
      <h2 className={styles.title}>Products</h2>
      <div className={styles.create}>
        <button onClick={() => handleEditClick(objLayout)}>Create product</button>
      </div>
      <div className={styles.table}>
        <table className={styles.product_table} border={1}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Barcode</th>
              <th>Name</th>
              <th>Image</th>
              <th>Size Type</th>
              <th>Size</th>
              <th>Manufacturer</th>
              <th>Brand</th>
              <th>Description</th>
              <th>Price</th>
              <th>Care Type</th>
              <th colSpan={2}>Edit</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product: Product) => (
              <tr key={product.id}>
                {Object.values(product)
                  .slice(0, Object.values(product).length - 1)
                  .map((value, index) => (
                    <td key={index}>
                      <p>{value as string}</p>
                    </td>
                  ))}
                <td><p>{Object.values(product.care_type).join(", ")}</p></td>
                <td>
                  <button onClick={() => handleEditClick(product)}>
                    CHANGE
                  </button>
                </td>
                <td>
                  <button onClick={() => handleProductDelete(product.id)}>
                    DELETE
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h2 className={styles.title}>Care types</h2>
      <div className={styles.create}>
        <input type="text" value={careTypeValue} onChange={(e) => setCareTypeValue(e.target.value)}/>
        <button onClick={createCareType}>Create care type</button>
      </div>
      <div className={styles.care_types}>
        {careTypes.map((item: string, index: number) => (
          <div className={styles.care_type} key={index}>
            {item}{" "}
            <button onClick={() => handleCareTypeDelete(item)}>DELETE</button>
          </div>
        ))}
      </div>
    </>
  );
}
