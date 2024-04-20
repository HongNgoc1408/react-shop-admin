import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useParams } from "react-router-dom";
import * as ProductService from "../../services/ProductService";
import { useSelector } from "react-redux";
import * as TypeService from "../../services/TypeService";

const FormEditProduct = () => {
  const [successNotification, setSuccessNotification] = useState(null);
  const [errorNotification, setErrorNotification] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState([]);
  const [selectedType, setSelectedType] = useState("");
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

  // useEffect(() => {
  //   const fetchTypes = async () => {
  //     try {
  //       const response = await TypeService.getAllType();
  //       const typesData = response.data;
  //       setType(typesData);
  //     } catch (error) {
  //       console.error("Error fetching types:", error);
  //     }
  //   };
  //   fetchTypes();
  // }, []);

  // useEffect(() => {
  //   const fetchProductDetails = async () => {
  //     const res = await ProductService.getDetailsProduct(id);
  //     const fetchTypes = async () => {
  //       try {
  //         const response = await TypeService.getAllType();
  //         const typesData = response.data;
  //         setType(typesData);
  //       } catch (error) {
  //         console.error("Error fetching types:", error);
  //       }
  //     };
  //     if (res?.data) {
  //       setName(res?.data?.name);
  //       setType(res?.data?.type);
  //       setCountInStock(res?.data?.countInStock);
  //       setPrice(res?.data?.price);
  //       setDescription(res?.data?.description);
  //       setStatus(res?.data?.status);
  //       setImage(res?.data?.image);
  //       setRating(res?.data?.rating);
  //       setDiscount(res?.data?.discount);
  //       // Kiểm tra nếu res?.data?.type là một mảng, nếu không, chuyển đổi nó thành một mảng rỗng
  //       const productType = Array.isArray(res?.data?.type)
  //         ? res?.data?.type
  //         : [fetchTypes()];
  //       setType(productType);
  //     }
  //   };

  //   fetchProductDetails();
  // }, [id]);
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const [productRes, typesRes] = await Promise.all([
          ProductService.getDetailsProduct(id),
          TypeService.getAllType(),
        ]);

        if (productRes?.data) {
          setName(productRes.data.name);
          setCountInStock(productRes.data.countInStock);
          setPrice(productRes.data.price);
          setDescription(productRes.data.description);
          setStatus(productRes.data.status);
          setImage(productRes.data.image);
          setRating(productRes.data.rating);
          setDiscount(productRes.data.discount);

          const productType = productRes.data.type;
          const typesData = typesRes.data;

          setType(typesData);

          if (
            productType &&
            typesData.find((type) => type._id === productType._id)
          ) {
            setSelectedType(productType._id);
          }
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleUpdateProduct = async (e) => {
    e.preventDefault();

    const selectedTypeName = type.find(
      (type) => type._id === selectedType
    )?.name;

    if (!selectedTypeName) {
      setErrorNotification("Selected type does not exist");
      return;
    }

    const data = {
      name,
      image,
      type: selectedTypeName,
      countInStock,
      price,
      description,
      status,
      rating,
      discount,
    };
    console.log(data);
    try {
      const res = await ProductService.updateProduct(
        id,
        user?.access_token,
        data
      );

      if (res.status === "OK") {
        setSuccessNotification("Update product success!");
        setTimeout(() => {
          setSuccessNotification(null);
          navigate("/product");
        }, 3000);
      } else {
        console.error(res.message);
        setErrorNotification("Update product failed! " + res.message);
        setTimeout(() => {
          setErrorNotification(null);
        }, 3000);
      }
    } catch (error) {
      console.log(error);
      setErrorNotification("Update failed!" + error);
      setTimeout(() => {
        setErrorNotification(null);
      }, 3000);
    }
  };

  return (
    <>
      {/* Thông báo thành công */}
      {successNotification && (
        <div className="absolute top-28 right-0 mt-4 mr-4 bg-green-400 text-white px-4 py-2 rounded">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <FaCheckCircle className="size-10" />
            </div>
            <div className="ml-3 pt-0.5">
              <p className="mt-1 text-md text-white">{successNotification}</p>
            </div>
          </div>
        </div>
      )}
      {/* Thông báo thất bại */}
      {errorNotification && (
        <div className="absolute top-28 right-0 mt-4 mr-4 bg-red-400 text-white px-4 py-2 rounded">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <FaTimesCircle className="size-10" />
            </div>
            <div className="ml-3 pt-0.5">
              <p className="mt-1 text-md text-white">{errorNotification}</p>
            </div>
          </div>
        </div>
      )}

      <form
        onSubmit={(e) => e.preventDefault()}
        className="bg-white rounded p-5"
      >
        <div className="-mx-3 md:flex mb-6">
          <div className="md:w-1/4 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-grey-darker text-sm font-bold mb-2"
              htmlFor="image"
            >
              Image
            </label>
            <input
              onChange={handleImageChange}
              className="w-full px-5 py-0.5 text-gray-700 bg-transparent rounded"
              id="image"
              name="image"
              type="file"
              required=""
              placeholder="Image Product"
              aria-label="Image Product"
            />
            <div className="md:w-1/4 px-3 py-3 items-center">
              {image && <img src={image} alt="Image Product" width={100} />}
            </div>
          </div>

          <div className="md:w-1/4 px-3">
            <label
              className="block uppercase tracking-wide text-grey-darker text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              value={price}
              onChange={(e) => setPrice(e.target.value)}
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
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
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
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
              className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
              id="countInStock"
              name="countInStock"
              type="number"
              required=""
              placeholder="CountInStock Product"
              aria-label="CountInStock Product"
            />
          </div>

          {/* Type */}
          <div className="md:w-1/4 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-grey-darker text-sm font-bold mb-2"
              htmlFor="selectedType"
            >
              Type
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              id="selectedType"
              name="selectedType"
              className="w-full px-5 py-2 text-gray-700 bg-gray-200 rounded"
            >
              <option value="" disabled defaultValue>
                Select Type
              </option>
              {type.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="md:w-1/4 px-3">
            <label
              className="block uppercase tracking-wide text-grey-darker text-sm font-bold mb-2"
              htmlFor="status"
            >
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
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
              value={rating}
              onChange={(e) => setRating(e.target.value)}
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
            id="description"
            name="description"
            rows="5"
            required=""
            placeholder="Description Product"
            aria-label="Description"
          ></textarea>
        </div>
        <div className="flex items-center justify-center w-full">
          <button
            type="submit"
            onClick={handleUpdateProduct}
            className="mt-2 font-semibold leading-none text-white py-4 px-10 bg-blue-700 rounded hover:bg-blue-600 focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 focus:outline-none  disabled:bg-gray-400 disabled:cursor-no-drop"
          >
            Edit
          </button>
        </div>
      </form>
    </>
  );
};

export default FormEditProduct;
