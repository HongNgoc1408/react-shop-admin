import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as OrderService from "../../services/OrderService";
import { useSelector } from "react-redux";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const FormEditOrder = () => {
  const [successNotification, setSuccessNotification] = useState(null);
  const [errorNotification, setErrorNotification] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  // const [orderId, setOrderId] = useState("");
  const [user, setUserId] = useState("");
  const [orderItems, setOrderItems] = useState("");
  const [shippingAddress, setshippingAddress] = useState("");
  const [paymentDelivery, setPaymentDelivery] = useState("");
  const [isDelivered, setIsDelivered] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isPaid, setIsPaid] = useState("");
  const [itemsPrice, setItemsPrice] = useState("");
  const [shippingPrice, setShippingPrice] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const userState = useSelector((state) => state.user);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      const res = await OrderService.getOrderByUserId(
        id,
        userState?.access_token
      );
      console.log("res.data", res?.data);
      if (res?.data) {
        setUserId(res?.data?.user);
        setOrderItems(res?.data?.orderItems);
        setshippingAddress(res?.data?.shippingAddress);
        setPaymentDelivery(res?.data?.paymentDelivery);
        setIsDelivered(res?.data?.isDelivered);
        setPaymentMethod(res?.data?.paymentMethod);
        setIsPaid(res?.data?.isPaid);
        setItemsPrice(res?.data?.itemsPrice);
        setShippingPrice(res?.data?.shippingPrice);
        setTotalPrice(res?.data?.totalPrice);
      }
    };

    fetchOrderDetails();
  }, [id, userState]);

  const data = {
    id,
    user,
    orderItems,
    shippingAddress,
    paymentDelivery,
    isDelivered,
    paymentMethod,
    isPaid,
    itemsPrice,
    shippingPrice,
    totalPrice,
  };

  const handleUpdateOrder = async (e) => {
    e.preventDefault();
    try {
      const res = await OrderService.updateOrder(id, user?.access_token, data);
      console.log("res", res);
      if (res.status === "OK") {
        navigate("/order");
        setSuccessNotification("Update successful!");
        setTimeout(() => {
          setSuccessNotification(null);
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
      <form className="bg-white rounded p-5">
        <div className="mx-auto grid grid-cols-12 gap-4">
          <div className="col-span-4">
            <div className="md:w-full mb-3">
              <label
                className="block uppercase tracking-wide text-grey-darker text-sm font-bold mb-2"
                htmlFor="user"
              >
                user
              </label>
              <input
                disabled
                value={user}
                className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
                id="user"
                name="user"
                type="text"
                required=""
                placeholder="UserID"
                aria-label="UserID"
              />
            </div>
            <div className="md:w-full mb-3">
              <label
                className="block uppercase tracking-wide text-grey-darker text-sm font-bold mb-2"
                htmlFor="fullName"
              >
                fullName
              </label>
              <input
                disabled
                value={shippingAddress?.fullName}
                className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
                id="fullName"
                name="fullName"
                type="text"
                required=""
                placeholder="Name Product"
                aria-label="Name Product"
              />
            </div>
            <div className="md:w-full mb-3">
              <label
                className="block uppercase tracking-wide text-grey-darker text-sm font-bold mb-2"
                htmlFor="phone"
              >
                Phone
              </label>
              <input
                disabled
                value={shippingAddress?.phone}
                className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
                id="phone"
                name="phone"
                type="text"
                required=""
                placeholder="Phone"
                aria-label="Phone"
              />
            </div>
            <div className="md:w-full mb-3">
              <label
                className="block uppercase tracking-wide text-grey-darker text-sm font-bold mb-2"
                htmlFor="address"
              >
                Address
              </label>
              <input
                disabled
                value={shippingAddress?.address}
                className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
                id="address"
                name="address"
                type="text"
                required=""
                placeholder="Address"
                aria-label="Address"
              />
            </div>
            <div className="md:w-full mb-3">
              <label
                className="block uppercase tracking-wide text-grey-darker text-sm font-bold mb-2"
                htmlFor="city"
              >
                City
              </label>
              <input
                disabled
                value={shippingAddress?.city}
                className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
                id="city"
                name="city"
                type="text"
                required=""
                placeholder="city"
                aria-label="city"
              />
            </div>
          </div>
          <div className="col-span-4">
            <div className="md:w-full mb-3">
              <label
                className="block uppercase tracking-wide text-grey-darker text-sm font-bold mb-2"
                htmlFor="paymentDelivery"
              >
                paymentDelivery
              </label>
              <input
                disabled
                value={paymentDelivery}
                className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
                id="paymentDelivery"
                name="paymentDelivery"
                type="text"
                required
                placeholder="paymentDelivery"
                aria-label="paymentDelivery"
              />
            </div>
            <div className="md:w-full mb-3">
              <label
                className="block uppercase tracking-wide text-grey-darker text-sm font-bold mb-2"
                htmlFor="isDelivered"
              >
                isDelivered
              </label>
              <select
                className="w-full px-5 py-2 text-gray-700 bg-gray-200 rounded"
                required
                name="isDelivered"
                id="isDelivered"
                value={isDelivered}
                onChange={(e) => setIsDelivered(e.target.value)}
              >
                <option disabled value="">
                  Select IsDelivered
                </option>
                <option value="Wait for confirmation">
                  Wait for confirmation
                </option>
                <option value="Confirmed">Confirmed</option>
                <option value="Order is being delivered">
                  Order is being delivered
                </option>
                <option value="The order has been delivered">
                  The order has been delivered
                </option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            <div className="md:w-full mb-3">
              <label
                className="block uppercase tracking-wide text-grey-darker text-sm font-bold mb-2"
                htmlFor="paymentMethod"
              >
                paymentMethod
              </label>
              <input
                disabled
                value={paymentMethod}
                className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
                id="paymentMethod"
                name="paymentMethod"
                type="text"
                required=""
                placeholder="paymentMethod"
                aria-label="paymentMethod"
              />
            </div>
            <div className="md:w-full mb-3">
              <label
                className="block uppercase tracking-wide text-grey-darker text-sm font-bold mb-2"
                htmlFor="isPaid"
              >
                isPaid
              </label>
              <select
                className="w-full px-5 py-2 text-gray-700 bg-gray-200 rounded"
                required
                name="IsPaid"
                id="IsPaid"
                value={isPaid}
                onChange={(e) => setIsPaid(e.target.value === "true")}
              >
                <option disabled value="">
                  Select IsPaid
                </option>
                <option value="false">Payment has not been successful</option>
                <option value="true">Payment has been successful</option>
              </select>
            </div>
          </div>
          <div className="col-span-4">
            <div className="md:w-full mb-3">
              <label
                className="block uppercase tracking-wide text-grey-darker text-sm font-bold mb-2"
                htmlFor="id"
              >
                id
              </label>
              <input
                disabled
                value={id}
                className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
                id="id"
                name="id"
                type="text"
                required=""
                placeholder="OrderId"
                aria-label="OrderId"
              />
            </div>
            <div className="md:w-full mb-3">
              <label
                className="block uppercase tracking-wide text-grey-darker text-sm font-bold mb-2"
                htmlFor="itemsPrice"
              >
                itemsPrice
              </label>
              <input
                disabled
                value={itemsPrice}
                className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
                id="itemsPrice"
                name="itemsPrice"
                type="text"
                required=""
                placeholder="itemsPrice"
                aria-label="itemsPrice"
              />
            </div>
            <div className="md:w-full mb-3">
              <label
                className="block uppercase tracking-wide text-grey-darker text-sm font-bold mb-2"
                htmlFor="shippingPrice"
              >
                shippingPrice
              </label>
              <input
                disabled
                value={shippingPrice}
                className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
                id="shippingPrice"
                name="shippingPrice"
                type="text"
                required=""
                placeholder="shippingPrice"
                aria-label="shippingPrice"
              />
            </div>
            <div className="md:w-full mb-3">
              <label
                className="block uppercase tracking-wide text-grey-darker text-sm font-bold mb-2"
                htmlFor="totalPrice"
              >
                totalPrice
              </label>
              <input
                disabled
                value={totalPrice}
                className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
                id="totalPrice"
                name="totalPrice"
                type="text"
                required=""
                placeholder="totalPrice"
                aria-label="totalPrice"
              />
            </div>
          </div>
        </div>

        {Array.isArray(orderItems) &&
          orderItems.map((item, index) => {
            return (
              <>
                <div
                  key={item?._id}
                  className="mx-auto grid grid-cols-12 gap-4"
                >
                  <div className="col-span-2">
                    <div className="md:w-full mb-3">
                      <label
                        className="block uppercase tracking-wide text-grey-darker text-sm font-bold mb-2"
                        htmlFor="id"
                      >
                        orderItemsId
                      </label>
                      <input
                        disabled
                        value={item?._id}
                        className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
                        id="id"
                        name="id"
                        type="text"
                        required=""
                        placeholder="orderItemsId"
                        aria-label="orderItemsId"
                      />
                    </div>
                  </div>
                  <div className="col-span-2">
                    <div className="md:w-full mb-3">
                      <label
                        className="block uppercase tracking-wide text-grey-darker text-sm font-bold mb-2"
                        htmlFor="product"
                      >
                        ProductId
                      </label>
                      <input
                        disabled
                        value={item?.product}
                        className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
                        id="product"
                        name="product"
                        type="text"
                        required=""
                        placeholder="ProductId"
                        aria-label="ProductId"
                      />
                    </div>
                  </div>

                  <div className="col-span-2">
                    <div className="md:w-full mb-3">
                      <label
                        className="block uppercase tracking-wide text-grey-darker text-sm font-bold mb-2"
                        htmlFor="name"
                      >
                        Name Product
                      </label>
                      <input
                        disabled
                        value={item?.name}
                        className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
                        id="name"
                        name="name"
                        type="text"
                        required=""
                        placeholder="Name Product"
                        aria-label="Name Product"
                      />
                    </div>
                  </div>
                  <div className="col-span-2">
                    <div className="md:w-full mb-3">
                      <label
                        className="block uppercase tracking-wide text-grey-darker text-sm font-bold mb-2"
                        htmlFor="amount"
                      >
                        Amount
                      </label>
                      <input
                        disabled
                        value={item?.amount}
                        className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
                        id="amount"
                        name="amount"
                        type="text"
                        required=""
                        placeholder="Amount Product"
                        aria-label="Amount Product"
                      />
                    </div>
                  </div>
                  <div className="col-span-2">
                    <div className="md:w-full mb-3">
                      <label
                        className="block uppercase tracking-wide text-grey-darker text-sm font-bold mb-2"
                        htmlFor="price"
                      >
                        Price
                      </label>
                      <input
                        disabled
                        value={item?.price}
                        className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
                        id="price"
                        name="price"
                        type="text"
                        required=""
                        placeholder="Price Product"
                        aria-label="Price Product"
                      />
                    </div>
                  </div>
                  <div className="col-span-2">
                    <div className="md:w-full mb-3">
                      <label
                        className="block uppercase tracking-wide text-grey-darker text-sm font-bold mb-2"
                        htmlFor="image"
                      >
                        Image
                      </label>
                      <img src={item?.image} alt="" />
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        <div className="flex items-center justify-center w-full">
          <button
            type="submit"
            onClick={handleUpdateOrder}
            className="mt-2 font-semibold leading-none text-white py-4 px-10 bg-blue-700 rounded hover:bg-blue-600 focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 focus:outline-none  disabled:bg-gray-400 disabled:cursor-no-drop"
          >
            Edit
          </button>
        </div>
      </form>
    </>
  );
};

export default FormEditOrder;
