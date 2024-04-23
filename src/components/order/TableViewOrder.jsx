import React, { useRef, useState } from "react";
import ReactPaginate from "react-paginate";
import {
  FaCheckCircle,
  FaEdit,
  FaFilter,
  FaSortAlphaDown,
  FaSortAlphaUp,
  FaSort,
  FaTimesCircle,
  FaTrashAlt,
  FaXRay,
  FaEyeSlash,
} from "react-icons/fa";
import * as OrderService from "../../services/OrderService";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { DownloadTableExcel } from "react-export-table-to-excel";

const TableViewOrder = () => {
  const navigate = useNavigate();
  const [successNotification, setSuccessNotification] = useState(null);
  const [errorNotification, setErrorNotification] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [orderIdToDelete, setOrderIdToDelete] = useState(null);
  const user = useSelector((state) => state?.user);
  // State cho phân trang
  const [pageNumber, setPageNumber] = useState(0);
  const ordersPerPage = 10;
  const pagesVisited = pageNumber * ordersPerPage;
  const [showSortModal, setShowSortModal] = useState(false);
  const [sortType, setSortType] = useState("price", "name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortIcon, setSortIcon] = useState(<FaSort />);
  const tableRef = useRef(null);

  const fetchOrderAll = async () => {
    const res = await OrderService.getAllOrder(user?.access_token);
    return res;
  };

  const { data: orders, refetch: refetchOrders } = useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrderAll,
    retry: 3,
    retryDelay: 100,
  });

  const handleDelete = async (order) => {
    try {
      const res = await OrderService.deleteOrder(order?._id, user?.token);
      refetchOrders();
      setSuccessNotification("Delete order successfully!");
      setTimeout(() => {
        setSuccessNotification(null);
      }, 3000);
    } catch (error) {
      setErrorNotification("Delete order failed!");
      setTimeout(() => {
        setErrorNotification(null);
      }, 3000);
      console.log("Error canceling order:", error);
    }
  };

  const handleDetailsOrder = (orderId) => {
    navigate(`/order/${orderId}`);
  };
  const handleViewDetailsOrder = (orderId) => {
    navigate(`/order/view/${orderId}`);
  };

  // Tính số trang
  const pageCount = Math.ceil(orders?.data?.length / ordersPerPage);

  // Thay đổi trang
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const handleSort = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);

    setSortIcon(
      <FaSort
        className={
          newOrder === "asc"
            ? "rotate-180 m-1 cursor-pointer "
            : "rotate-0 m-1 cursor-pointer text-orange-500"
        }
      />
    );

    setSortType("price");
  };

  const sortedOrders = orders?.data
    ?.sort((a, b) => {
      if (sortType === "price") {
        const priceA = parseFloat(a.price);
        const priceB = parseFloat(b.price);
        return sortOrder === "asc" ? priceA - priceB : priceB - priceA;
      }

      if (sortType === "name") {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (sortOrder === "asc") {
          return nameA.localeCompare(nameB);
        } else {
          return nameB.localeCompare(nameA);
        }
      }
      return 0;
    })
    .slice(pagesVisited, pagesVisited + ordersPerPage);

  const handleSortModal = () => {
    setShowSortModal(!showSortModal);
  };

  const handleSortAZ = () => {
    setSortType("name");
    setSortOrder("asc");
  };

  const handleSortZA = () => {
    setSortType("name");
    setSortOrder("desc");
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
      <DownloadTableExcel
        filename="Orders table"
        sheet="Orders"
        currentTableRef={tableRef.current}
      >
        <button className="bg-dark-button justify-items-end">
          Export excel
        </button>
      </DownloadTableExcel>
      <table ref={tableRef} className="min-w-full bg-white my-5">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="w-auto text-left py-3 px-4 uppercase font-semibold text-sm">
              STT
            </th>
            <th className="w-auto text-left py-3 px-4 uppercase font-semibold text-sm">
              ID Order
            </th>
            <th className="w-auto text-left py-3 px-4 uppercase font-semibold text-sm">
              ID User
            </th>
            <th className="w-auto text-left py-3 px-4 uppercase font-semibold text-sm">
              <div className="flex items-center" onClick={handleSort}>
                <span className="mr-3">Buy Price </span>
                <span className="cursor-pointer">
                  {sortType === "price" && sortIcon}
                </span>
              </div>
            </th>
            <th className="w-auto text-left text-wrap py-3 px-4 uppercase font-semibold text-sm relative">
              Shipping Price
            </th>
            <th className="w-auto text-left py-3 px-4 uppercase font-semibold text-sm">
              <div className="flex items-center" onClick={handleSort}>
                <span className="mr-3">Total Price </span>
                <span className="cursor-pointer">
                  {sortType === "price" && sortIcon}
                </span>
              </div>
            </th>
            <th className="w-auto text-left py-3 px-4 uppercase font-semibold text-sm">
              <div className="flex items-center" onClick={handleSort}>
                <span className="mr-3">Information product order</span>
                <span className="cursor-pointer">
                  {sortType === "price" && sortIcon}
                </span>
              </div>
            </th>
            <th className="w-auto text-left py-3 px-4 uppercase font-semibold text-sm">
              <div className="flex items-center" onClick={handleSort}>
                <span className="mr-3">Information shipping address</span>
                <span className="cursor-pointer">
                  {sortType === "price" && sortIcon}
                </span>
              </div>
            </th>
            <th className="w-auto text-left py-3 px-4 uppercase font-semibold text-sm">
              Payment Delivery
            </th>
            <th className="w-auto text-left py-3 px-4 uppercase font-semibold text-sm">
              Payment Method
            </th>
            <th className="w-auto text-left py-3 px-4 uppercase font-semibold text-sm">
              Status Delivery
            </th>
            <th className="w-auto text-left py-3 px-4 uppercase font-semibold text-sm">
              Status Payment
            </th>
            <th className="w-auto text-left py-3 px-4 uppercase font-semibold text-sm">
              CreatedAt
            </th>
            <th className="w-auto text-left py-3 px-4 uppercase font-semibold text-sm">
              UpdatedAt
            </th>
            <th className="w-auto text-left py-3 px-4 uppercase font-semibold text-sm">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {orders?.data
            ?.slice(pagesVisited, pagesVisited + ordersPerPage)
            .map((order, index) => (
              <tr key={order._id}>
                <td className="w-auto text-left py-3 px-4 border">
                  {index + 1}
                </td>
                <td
                  onClick={() => handleViewDetailsOrder(order._id)}
                  className="w-auto text-left py-3 px-4 border"
                >
                  <span className="hover:text-blue-500">{order._id}</span>
                </td>
                <td className="w-1/12 text-left py-3 px-4 border">
                  <span className="hover:text-blue-500">{order.user}</span>
                </td>
                <td className="w-auto text-left text-nowrap py-3 px-4 border">
                  <span className="hover:text-blue-500">
                    {order.itemsPrice}
                  </span>
                </td>
                <td className="w-auto text-left py-3 px-4 border">
                  <span className="hover:text-blue-500">
                    {order.shippingPrice}
                  </span>
                </td>
                <td className="w-auto text-left py-3 px-4 border">
                  <span className="hover:text-blue-500">
                    {order.totalPrice}
                  </span>
                </td>
                <td
                  onClick={() => handleViewDetailsOrder(order._id)}
                  className="w-auto text-left text-nowrap py-3 px-4 border"
                >
                  <span className="hover:text-blue-500">Product in order</span>
                </td>
                <td
                  onClick={() => handleViewDetailsOrder(order._id)}
                  className="w-auto text-left py-3 px-4 border"
                >
                  <span className="hover:text-blue-500">Customer of order</span>
                </td>
                <td className="w-auto text-left text-nowrap py-3 px-4 border">
                  <span className="hover:text-blue-500">
                    {order.paymentDelivery}
                  </span>
                </td>
                <td className="w-auto text-left py-3 px-4 border">
                  <span className="hover:text-blue-500">
                    {order.paymentMethod}
                  </span>
                </td>
                <td className="w-auto text-left py-3 px-4 border">
                  <span
                    className={`px-2 py-1 font-semibold leading-tight  text-nowrap rounded-sm ${
                      !order.isDelivered
                        ? "bg-red-100 text-red-500"
                        : "bg-green-100 text-green-500"
                    }`}
                  >
                    {`${order.isDelivered}`}
                  </span>
                </td>
                <td className="w-auto text-left py-3 px-4 border">
                  <span
                    className={`px-2 py-1 font-semibold leading-tight text-nowrap rounded-sm ${
                      !order.isPaid
                        ? "bg-red-100  text-red-500"
                        : "bg-green-100 text-green-500"
                    }`}
                  >
                    {`${order.isPaid}`}
                  </span>
                </td>
                <td className="w-auto text-left py-3 px-4 border">
                  <span className="hover:text-blue-500">
                    {format(Date(order.createdAt), "dd/MM/yyyy HH:mm:ss")}
                  </span>
                </td>
                <td className="w-auto text-left py-3 px-4 border">
                  <span className="hover:text-blue-500">
                    {format(Date(order.updatedAt), "dd/MM/yyyy HH:mm:ss")}
                  </span>
                </td>
                <td className="w-auto text-left py-3 px-4 border">
                  <div className="flex flex-row">
                    <span
                      onClick={() => handleViewDetailsOrder(order._id)}
                      className="text-black-500 mr-3"
                    >
                      <FaEyeSlash className="size-6" />
                    </span>
                    <span
                      onClick={() => handleDetailsOrder(order._id)}
                      className="text-yellow-500 mr-3"
                    >
                      <FaEdit className="size-6" />
                    </span>
                    <span
                      onClick={() => {
                        setOrderIdToDelete(order._id);
                        setShowModal(true);
                      }}
                      className="text-red-500"
                    >
                      <FaTrashAlt className="size-6" />
                    </span>

                    {showModal && (
                      <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                          {/* Modal panel */}
                          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                              {/* Modal content */}
                              <div className="sm:flex sm:items-start">
                                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                  {/* Icon */}
                                  <FaTimesCircle className="h-6 w-6 text-red-600" />
                                </div>
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                                    Delete Item
                                  </h3>
                                  <div className="mt-2">
                                    <p className="text-sm text-gray-500">
                                      Are you sure you want to delete{" "}
                                      <span className="font-bold">
                                        Sample Item
                                      </span>
                                      ? This action cannot be undone.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                              {/* Delete Button */}
                              <button
                                onClick={() => handleDelete(order)}
                                type="button"
                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-500 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                              >
                                Delete
                              </button>
                              {/* Cancel Button */}
                              <button
                                onClick={() => setShowModal(false)}
                                type="button"
                                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* Phân trang */}
      <div className="flex justify-center">
        <nav aria-label="Page navigation example">
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={"flex list-style-none page-item"}
            previousLinkClassName={
              "page-link relative block py-1 px-3 mr-3 rounded-md border-0 bg-transparent outline-none transition-all duration-300 text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
            }
            nextLinkClassName={
              "page-link relative block py-1 px-3 mr-3 rounded-md border-0 bg-transparent outline-none transition-all duration-300 text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
            }
            disabledClassName={
              "page-link relative block py-1 px-3 mr-3 rounded-md border-0 bg-transparent outline-none transition-all duration-300 text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
            }
            activeClassName={
              "page-link relative block py-1 px-3 mr-3 rounded-md border-0 bg-blue-400 outline-none transition-all duration-300 text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
            }
          />
        </nav>
      </div>
    </>
  );
};

export default TableViewOrder;
