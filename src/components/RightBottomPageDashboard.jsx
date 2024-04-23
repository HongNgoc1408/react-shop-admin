import React, { useEffect, useState } from "react";
import { FaDotCircle, FaFill, FaList } from "react-icons/fa";
import * as TypeService from "../services/TypeService";
import * as UserService from "../services/UserService";
import * as ProductService from "../services/ProductService";
import * as OrderService from "../services/OrderService";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const RightBottomPageDashboard = () => {
  const [totalSeller, setTotalQuantitySold] = useState(0);
  const [totalCountInStocks, setTotalCountInStocks] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const fetchSellerTotal = async () => {
      try {
        const response = await ProductService.getAllProduct();
        const products = response.data;
        let totalSeller = 0;
        products.forEach((product) => {
          if (!isNaN(product.seller)) {
            totalSeller += product.seller;
          }
        });
        setTotalQuantitySold(totalSeller);
        let totalCountInStocks = 0;
        products.forEach((product) => {
          if (!isNaN(product.countInStock)) {
            totalCountInStocks += product.countInStock;
          }
        });
        setTotalCountInStocks(totalCountInStocks);
      } catch (error) {
        console.error("Error fetching seller data:", error);
      }
    };

    fetchSellerTotal();
  }, []);

  useEffect(() => {
    const fetchSalesTotal = async () => {
      try {
        const response = await OrderService.getAllOrder(user?.access_token);
        const orders = response.data;
        let totalSales = 0;
        orders.forEach((order) => {
          if (!isNaN(order.itemsPrice)) {
            totalSales += order.itemsPrice;
          }
        });
        setTotalSales(totalSales);
      } catch (error) {
        console.error("Error fetching seller data:", error);
      }
    };

    fetchSalesTotal();
  }, []);

  const fetchTypeAll = async () => {
    const res = await TypeService.getAllType();
    return res;
  };

  const { data: types } = useQuery({
    queryKey: ["types"],
    queryFn: fetchTypeAll,
    retry: 3,
    retryDelay: 100,
  });

  const fetchUserAll = async () => {
    const res = await UserService.getAllUser();
    return res;
  };

  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUserAll,
    retry: 3,
    retryDelay: 100,
  });

  const fetchProductAll = async () => {
    const res = await ProductService.getAllProduct();
    return res;
  };

  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProductAll,
    retry: 3,
    retryDelay: 100,
  });

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

  return (
    <div className="w-full overflow-x-hidden border-t flex flex-col">
      <main className="w-full flex-grow p-6">
        <h1 className="text-3xl text-black pb-6">Dashboard</h1>
        <div className="w-full ">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
              <div className="flex justify-between mb-6">
                <div>
                  <div className="flex items-center mb-1">
                    <div className="text-2xl font-semibold">
                      {users ? users.data.length : ""}
                    </div>
                  </div>
                  <div className="text-sm font-medium text-gray-400">Users</div>
                </div>
              </div>
              <Link
                to="/user"
                className="text-[#f84525] font-medium text-sm hover:text-red-800"
                target="_blank"
              >
                View
              </Link>
            </div>

            <div className="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
              <div className="flex justify-between mb-6">
                <div>
                  <div className="flex items-center mb-1">
                    <div className="text-2xl font-semibold">
                      {types ? types.data.length : ""}
                    </div>
                  </div>
                  <div className="text-sm font-medium text-gray-400">Types</div>
                </div>
              </div>
              <Link
                to="/type"
                className="text-[#f84525] font-medium text-sm hover:text-red-800"
                target="_blank"
              >
                View
              </Link>
            </div>
            <div className="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
              <div className="flex justify-between mb-6">
                <div>
                  <div className="text-2xl font-semibold mb-1">
                    {products ? products.data.length : ""}
                  </div>
                  <div className="text-sm font-medium text-gray-400">
                    Product
                  </div>
                </div>
              </div>
              <Link
                to="/product"
                className="text-[#f84525] font-medium text-sm hover:text-red-800"
                target="_blank"
              >
                View
              </Link>
            </div>
            <div className="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
              <div className="flex justify-between mb-4">
                <div>
                  <div className="flex items-center mb-1">
                    <div className="text-2xl font-semibold">
                      {orders ? orders.data.length : ""}
                    </div>
                  </div>
                  <div className="text-sm font-medium text-gray-400">
                    Orders
                  </div>
                </div>
              </div>
              <Link
                to="/order"
                className="text-[#f84525] font-medium text-sm hover:text-red-800"
                target="_blank"
              >
                View
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <div className="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
              <div className="flex justify-between mb-6">
                <div>
                  <div className="flex items-center mb-5">
                    <div className="text-xl font-semibold">
                      {totalCountInStocks}
                    </div>
                  </div>
                  <div className="text-xl font-medium text-red-500">
                    Product Stocks
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
              <div className="flex justify-between mb-6">
                <div>
                  <div className="flex items-center mb-5">
                    <div className="text-xl font-semibold">{totalSeller}</div>
                  </div>
                  <div className="text-xl font-medium text-red-500">
                    Product Seller
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
              <div className="flex justify-between mb-6">
                <div>
                  <div className="flex items-center mb-1">
                    <div className="text-xl font-semibold">{totalSales}</div>
                  </div>
                  <div className="text-xl font-medium text-red-500">
                    Total Sales
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RightBottomPageDashboard;
