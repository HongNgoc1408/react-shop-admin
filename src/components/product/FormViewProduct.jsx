import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as ProductService from "../../services/ProductService";
import { useSelector } from "react-redux";

const FormViewProduct = () => {
  const { id } = useParams();
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [rating, setRating] = useState("");
  const [discount, setDiscount] = useState("");
  const user = useSelector((state) => state.user);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
      const imageURL = e.target.result;
      setImage(imageURL);
    };

    reader.readAsDataURL(file);
  };
  useEffect(() => {
    const fetchProductDetails = async () => {
      const res = await ProductService.getDetailsProduct(id);
      if (res?.data) {
        setName(res?.data?.name);
        setType(res?.data?.type);
        setCountInStock(res?.data?.countInStock);
        setPrice(res?.data?.price);
        setDescription(res?.data?.description);
        setStatus(res?.data?.status);
        setImage(res?.data?.image);
        setRating(res?.data?.rating);
        setDiscount(res?.data?.discount);
      }
    };

    fetchProductDetails();
  }, [id]);

  const data = {
    name,
    type,
    countInStock,
    price,
    description,
    status,
    image,
    rating,
    discount,
  };

  return (
    <>
      <form className="bg-white rounded p-5">
        <div className="-mx-3 md:flex mb-6">
          <div className="md:w-1/4 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-grey-darker text-sm font-bold mb-2"
              htmlFor="image"
            >
              Image
            </label>
            {image && <img src={image} alt="Image Product" width={100} />}
          </div>
          <div className="md:w-1/4 px-3">
            <label
              className="block uppercase tracking-wide text-grey-darker text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              disabled
              value={name}
              className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
              id="name"
              name="name"
              type="text"
              required=""
              placeholder="Name Product"
              aria-label="Name Product"
            />
          </div>
          <div className="md:w-1/4 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-grey-darker text-sm font-bold mb-2"
              htmlFor="price"
            >
              Price
            </label>

            <input
              disabled
              value={price}
              className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
              id="price"
              name="price"
              type="text"
              required=""
              placeholder="Price Product."
              aria-label="Price Product"
            />
          </div>
          <div className="md:w-1/4 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-grey-darker text-sm font-bold mb-2"
              htmlFor="discount"
            >
              Discount
            </label>

            <input
              disabled
              value={discount}
              className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
              id="discount"
              name="discount"
              type="text"
              required=""
              placeholder="Discount Product"
              aria-label="Discount Product"
            />
          </div>
        </div>
        <div className="-mx-3 md:flex mb-6">
          <div className="md:w-1/4 px-3">
            <label
              className="block uppercase tracking-wide text-grey-darker text-sm font-bold mb-2"
              htmlFor="countInStock"
            >
              countInStock
            </label>
            <input
              disabled
              value={countInStock}
              className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
              id="countInStock"
              name="countInStock"
              type="number"
              required=""
              placeholder="CountInStock Product"
              aria-label="CountInStock Product"
            />
          </div>

          <div className="md:w-1/4 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-grey-darker text-sm font-bold mb-2"
              htmlFor="type"
            >
              Type
            </label>

            <select
              disabled
              value={type}
              id="type"
              name="type"
              className="w-full px-5 py-2 text-gray-700 bg-gray-200 rounded"
            >
              <option value="" disabled>
                Select Type
              </option>
              <option value="Dress">Dress</option>
              <option value="Suit">Suit</option>
              <option value="T-shirt">T-shirt</option>
              <option value="Hoodies">Hoodies</option>
              <option value="Pan">Pan</option>
            </select>
          </div>
          <div className="md:w-1/4 px-3">
            <label
              className="block uppercase tracking-wide text-grey-darker text-sm font-bold mb-2"
              htmlFor="status"
            >
              status
            </label>
            <select
              disabled
              value={status}
              id="status"
              name="status"
              className="w-full px-5 py-2 text-gray-700 bg-gray-200 rounded"
            >
              <option value="" disabled>
                Select Status
              </option>
              <option value="Best Sellers">Best Sellers</option>
              <option value="New">New</option>
              <option value="Sale">Sale</option>
            </select>
          </div>
          <div className="md:w-1/4 px-3">
            <label
              className="block uppercase tracking-wide text-grey-darker text-sm font-bold mb-2"
              htmlFor="rating"
            >
              Rating
            </label>
            <input
              disabled
              value={rating}
              className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
              id="rating"
              name="rating"
              type="number"
              required=""
              placeholder="Rating Product"
              aria-label="Rating Product"
            />
          </div>
        </div>

        <div className="mt-2">
          <label
            className="block uppercase tracking-wide text-grey-darker text-sm font-bold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            disabled
            value={description}
            className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
            id="description"
            name="description"
            rows="5"
            required=""
            placeholder="Description Product"
            aria-label="Description"
          ></textarea>
        </div>
      </form>
    </>
  );
};

export default FormViewProduct;
