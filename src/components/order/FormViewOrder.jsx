import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as OrderService from "../../services/OrderService";
import { useSelector } from "react-redux";

const FormViewOrder = () => {
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

  return (
    <>
      <form className="bg-white rounded p-5">
        <div className="mx-auto grid grid-cols-12 gap-4">
          <div className="col-span-4">
            <div className="md:w-full mb-3">
              <label
                className="block uppercase tracking-wide text-grey-darker text-sm font-bold mb-2"
                htmlFor="id"
              >
                OrderId
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
                required=""
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
              <input
                disabled
                value={isDelivered}
                className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
                id="isDelivered"
                name="isDelivered"
                type="text"
                required=""
                placeholder="isDelivered"
                aria-label="isDelivered"
              />
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
              <input
                disabled
                value={isPaid}
                className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
                id="isPaid"
                name="isPaid"
                type="text"
                required=""
                placeholder="isPaid"
                aria-label="isPaid"
              />
            </div>
          </div>

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
        </div>
        <table className="min-w-full bg-white my-5">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="w-auto text-left py-3 px-4 uppercase font-semibold text-sm">
                STT
              </th>
              <th className="w-auto text-left py-3 px-4 uppercase font-semibold text-sm">
                orderItemsId
              </th>
              <th className="w-auto text-left py-3 px-4 uppercase font-semibold text-sm">
                ProductId
              </th>
              <th className="w-auto text-left py-3 px-4 uppercase font-semibold text-sm">
                Image Product
              </th>
              <th className="w-auto text-left text-wrap py-3 px-4 uppercase font-semibold text-sm">
                Name Product
              </th>
              <th className="w-auto text-left text-wrap py-3 px-4 uppercase font-semibold text-sm">
                Amount Product
              </th>
              <th className="w-auto text-left text-wrap py-3 px-4 uppercase font-semibold text-sm">
                Price Product
              </th>
            </tr>
          </thead>
          {Array.isArray(orderItems) &&
            orderItems.map((item, index) => {
              return (
                <>
                  <tbody className="text-gray-700">
                    <tr key={item?._id}>
                      <td className="w-auto text-left py-3 px-4 border">
                        {index + 1}
                      </td>
                      <td className="w-auto text-left py-3 px-4 border">
                        <span className="hover:text-blue-500">{item._id}</span>
                      </td>
                      <td className="w-1/12 text-left py-3 px-4 border">
                        <span className="hover:text-blue-500">
                          {item?.product}
                        </span>
                      </td>
                      <td className="w-auto text-left py-3 px-4 border">
                        <img src={item?.image} alt="" width={100} />
                      </td>
                      <td className="w-auto text-left py-3 px-4 border">
                        <span className="hover:text-blue-500">{item.name}</span>
                      </td>
                      <td className="w-auto text-left py-3 px-4 border">
                        <span className="hover:text-blue-500">
                          {item.amount}
                        </span>
                      </td>
                      <td className="w-auto text-left py-3 px-4 border">
                        <span className="hover:text-blue-500">
                          {item.price}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </>
              );
            })}
        </table>
      </form>
    </>
  );
};

export default FormViewOrder;
