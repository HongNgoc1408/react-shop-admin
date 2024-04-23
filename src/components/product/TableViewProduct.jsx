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
  FaEyeSlash,
  FaRedo,
  FaSearch,
} from "react-icons/fa";
import * as ProductService from "../../services/ProductService";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Link, useNavigate } from "react-router-dom";
import { DownloadTableExcel } from "react-export-table-to-excel";

const TableViewProduct = () => {
  const navigate = useNavigate();
  const [successNotification, setSuccessNotification] = useState(null);
  const [errorNotification, setErrorNotification] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(null);
  // State cho phân trang
  const [pageNumber, setPageNumber] = useState(0);
  const productsPerPage = 10;
  const pagesVisited = pageNumber * productsPerPage;
  const [showSortModal, setShowSortModal] = useState(false);
  const [sortType, setSortType] = useState("price", "name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortIcon, setSortIcon] = useState(<FaSort />);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const tableRef = useRef(null);

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

  const handleDelete = async () => {
    if (!productIdToDelete) return;
    const res = await ProductService.deleteProduct(productIdToDelete);
    if (res.status === "OK") {
      setProductIdToDelete(null);
      setShowModal(false);
      setSuccessNotification("Delete product success!");
      setTimeout(() => {
        setSuccessNotification(null);
        window.location.reload();
      }, 3000);
    } else {
      console.error(res.message);
      setErrorNotification("Delete product failed! " + res.message);
      setTimeout(() => {
        setErrorNotification(null);
      }, 3000);
    }
  };

  const handleDetailsProduct = (productId) => {
    navigate(`/product/edit/${productId}`);
  };

  const handleViewDetailsProduct = (productId) => {
    navigate(`/product/view/${productId}`);
  };

  // Tính số trang
  const pageCount = Math.ceil(products?.data?.length / productsPerPage);

  // Thay đổi trang
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const handleSort = () => {
    // Đảo ngược thứ tự sắp xếp
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);

    // Cập nhật icon tương ứng
    setSortIcon(
      <FaSort
        className={
          newOrder === "asc"
            ? "rotate-180 m-1 cursor-pointer "
            : "m-1 cursor-pointer text-orange-500"
        }
      />
    );

    setSortType("price");
  };

  const sortedProducts = products?.data
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
    .slice(pagesVisited, pagesVisited + productsPerPage);

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

  const handleSearch = () => {
    const filteredProducts = products.data.filter((product) =>
      product.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredProducts(filteredProducts);
  };

  const handleReset = () => {
    setSearchText("");
    setFilteredProducts([]);
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
        filename="Products table"
        sheet="Products"
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
              ID
            </th>
            <th className="w-1/12 text-left py-3 px-4 uppercase font-semibold text-sm">
              Image
            </th>
            <th className="w-auto text-left text-wrap py-3 px-4 uppercase font-semibold text-sm relative">
              <div className="flex items-center justify-between">
                <span className="mr-3">Name</span>
                <span className="flex">
                  <FaSearch
                    onClick={() => setShowSearchModal(true)}
                    className="cursor-pointer mr-3"
                  />
                  <FaFilter
                    onClick={handleSortModal}
                    className="cursor-pointer"
                  />
                </span>
              </div>

              {showSearchModal && (
                <div className="modal z-10 fixed py-2 px-2 my-3 bg-gray-400 rounded-md">
                  {/* Nội dung modal */}
                  <div className="modal-content">
                    <button
                      onClick={() => setShowSearchModal(false)}
                      className="close-button size-5 m-1"
                    >
                      <FaTimesCircle />
                    </button>
                    <input
                      placeholder="Search ..."
                      className="text-Black p-1 rounded"
                      type="text"
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                    />
                    <span className="flex mt-1">
                      <button
                        onClick={handleSearch}
                        className="mx-4 hover:text-orange-500 flex"
                      >
                        <FaSearch className="size-4 m-1" />
                        <span>Search</span>
                      </button>
                      <button
                        onClick={handleReset}
                        className="mx-4 hover:text-orange-500 flex"
                      >
                        <FaRedo className="size-4 m-1" />
                        <span>Reset</span>
                      </button>
                    </span>
                  </div>
                </div>
              )}

              {showSortModal && (
                <div className="modal z-10 fixed py-2 px-2 my-3 bg-gray-400 rounded-md">
                  {/* Nội dung modal */}
                  <div className="modal-content">
                    <button
                      onClick={handleSortModal}
                      className="close-button size-5 m-1"
                    >
                      <FaTimesCircle />
                    </button>
                    <h6>Sort Options</h6>
                    <button
                      onClick={handleSortAZ}
                      className="mx-4 hover:text-orange-500"
                    >
                      <FaSortAlphaDown className="size-5" />
                    </button>
                    <button
                      onClick={handleSortZA}
                      className=" hover:text-orange-500"
                    >
                      <FaSortAlphaUp className="size-5" />
                    </button>
                  </div>
                </div>
              )}
            </th>

            <th className="w-auto text-left py-3 px-4 uppercase font-semibold text-sm">
              <div className="flex items-center" onClick={handleSort}>
                <span className="mr-3">Price</span>
                <span className="cursor-pointer">
                  {sortType === "price" && sortIcon}
                </span>
              </div>
            </th>
            <th className="w-auto text-left py-3 px-4 uppercase font-semibold text-sm">
              <div className="flex items-center" onClick={handleSort}>
                <span className="mr-3">Discount</span>
                <span className="cursor-pointer">
                  {sortType === "price" && sortIcon}
                </span>
              </div>
            </th>
            <th className="w-auto text-left py-3 px-4 uppercase font-semibold text-sm">
              <div className="flex items-center" onClick={handleSort}>
                <span className="mr-3">CountInStock</span>
                <span className="cursor-pointer">
                  {sortType === "price" && sortIcon}
                </span>
              </div>
            </th>

            <th className="w-auto text-left py-3 px-4 uppercase font-semibold text-sm">
              <div className="flex items-center" onClick={handleSort}>
                <span className="mr-3">Seller</span>
                <span className="cursor-pointer">
                  {sortType === "price" && sortIcon}
                </span>
              </div>
            </th>
            <th className="w-auto text-left py-3 px-4 uppercase font-semibold text-sm">
              Type
            </th>
            <th className="w-auto text-left py-3 px-4 uppercase font-semibold text-sm">
              Rating
            </th>
            <th className="w-auto text-left py-3 px-4 uppercase font-semibold text-sm">
              Status
            </th>
            <th className="w-auto text-left py-3 px-4 uppercase font-semibold text-sm">
              Description
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
        {filteredProducts.length > 0 ? (
          <tbody className="text-gray-700">
            {filteredProducts
              ?.slice(pagesVisited, pagesVisited + productsPerPage)
              .map((product, index) => (
                <tr key={product._id}>
                  <td className="w-auto text-left py-3 px-4 border">
                    {index + 1}
                  </td>
                  <td
                    onClick={() => handleViewDetailsProduct(product._id)}
                    className="w-auto text-left py-3 px-4 border"
                  >
                    <span className="hover:text-blue-500">{product._id}</span>
                  </td>
                  <td className="w-1/12 text-left py-3 px-4 border">
                    <img src={product.image} alt="" />
                  </td>
                  <td className="w-auto text-left text-nowrap py-3 px-4 border">
                    <span className="hover:text-blue-500">{product.name}</span>
                  </td>
                  <td className="w-auto text-left py-3 px-4 border">
                    <span className="hover:text-blue-500">{product.price}</span>
                  </td>
                  <td className="w-auto text-left py-3 px-4 border">
                    <span className="hover:text-blue-500">
                      {product.discount}
                    </span>
                  </td>
                  <td className="w-auto text-left py-3 px-4 border">
                    <span className="hover:text-blue-500">
                      {product.countInStock}
                    </span>
                  </td>
                  <td className="w-auto text-left py-3 px-4 border">
                    <span className="hover:text-blue-500">
                      {product.seller}
                    </span>
                  </td>
                  <td className="w-auto text-left text-nowrap py-3 px-4 border">
                    <span className="hover:text-blue-500">{product.type}</span>
                  </td>
                  <td className="w-auto text-left text-nowrap py-3 px-4 border">
                    <span className="hover:text-blue-500">
                      {product.rating}
                    </span>
                  </td>
                  <td className="w-auto text-left py-3 px-4 border">
                    <span
                      className={`px-2 py-1 font-semibold leading-tight text-red-500 text-nowrap rounded-sm ${
                        product.status ? "bg-red-100" : ""
                      }`}
                    >
                      {product.status}
                    </span>
                  </td>
                  <td className="w-auto text-left py-3 px-4 border ">
                    <span className="hover:text-blue-500 line-clamp-2">
                      {product.description}
                    </span>
                  </td>
                  <td className="w-auto text-left py-3 px-4 border">
                    <span className="hover:text-blue-500">
                      {format(Date(product.createdAt), "dd/MM/yyyy HH:mm:ss")}
                    </span>
                  </td>
                  <td className="w-auto text-left py-3 px-4 border">
                    <span className="hover:text-blue-500">
                      {format(Date(product.updatedAt), "dd/MM/yyyy HH:mm:ss")}
                    </span>
                  </td>
                  <td className="w-auto text-left py-3 px-4 border">
                    <div className="flex flex-row">
                      <span
                        onClick={() => handleViewDetailsProduct(product._id)}
                        className="text-black-500 mr-3"
                      >
                        <FaEyeSlash className="size-6" />
                      </span>
                      <span
                        onClick={() => handleDetailsProduct(product._id)}
                        className="text-yellow-500 mr-3"
                      >
                        <FaEdit className="size-6" />
                      </span>
                      <span
                        onClick={() => {
                          setProductIdToDelete(product._id);
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
                                  onClick={handleDelete}
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
        ) : (
          <tbody className="text-gray-700">
            {products?.data
              ?.slice(pagesVisited, pagesVisited + productsPerPage)
              .map((product, index) => (
                <tr key={product._id}>
                  <td className="w-auto text-left py-3 px-4 border">
                    {index + 1}
                  </td>
                  <td
                    onClick={() => handleViewDetailsProduct(product._id)}
                    className="w-auto text-left py-3 px-4 border"
                  >
                    <span className="hover:text-blue-500">{product._id}</span>
                  </td>
                  <td className="w-1/12 text-left py-3 px-4 border">
                    <img src={product.image} alt="" />
                  </td>
                  <td className="w-auto text-left text-nowrap py-3 px-4 border">
                    <span className="hover:text-blue-500">{product.name}</span>
                  </td>
                  <td className="w-auto text-left py-3 px-4 border">
                    <span className="hover:text-blue-500">{product.price}</span>
                  </td>
                  <td className="w-auto text-left py-3 px-4 border">
                    <span className="hover:text-blue-500">
                      {product.discount}
                    </span>
                  </td>
                  <td className="w-auto text-left py-3 px-4 border">
                    <span className="hover:text-blue-500">
                      {product.countInStock}
                    </span>
                  </td>
                  <td className="w-auto text-left py-3 px-4 border">
                    <span className="hover:text-blue-500">
                      {product.seller}
                    </span>
                  </td>
                  <td className="w-auto text-left text-nowrap py-3 px-4 border">
                    <span className="hover:text-blue-500">{product.type}</span>
                  </td>
                  <td className="w-auto text-left text-nowrap py-3 px-4 border">
                    <span className="hover:text-blue-500">
                      {product.rating}
                    </span>
                  </td>
                  <td className="w-auto text-left py-3 px-4 border">
                    <span
                      className={`px-2 py-1 font-semibold leading-tight text-red-500 text-nowrap rounded-sm ${
                        product.status ? "bg-red-100" : ""
                      }`}
                    >
                      {product.status}
                    </span>
                  </td>
                  <td className="w-auto text-left py-3 px-4 border ">
                    <span className="hover:text-blue-500 line-clamp-2">
                      {product.description}
                    </span>
                  </td>
                  <td className="w-auto text-left py-3 px-4 border">
                    <span className="hover:text-blue-500">
                      {format(Date(product.createdAt), "dd/MM/yyyy HH:mm:ss")}
                    </span>
                  </td>
                  <td className="w-auto text-left py-3 px-4 border">
                    <span className="hover:text-blue-500">
                      {format(Date(product.updatedAt), "dd/MM/yyyy HH:mm:ss")}
                    </span>
                  </td>
                  <td className="w-auto text-left py-3 px-4 border">
                    <div className="flex flex-row">
                      <span
                        onClick={() => handleViewDetailsProduct(product._id)}
                        className="text-black-500 mr-3"
                      >
                        <FaEyeSlash className="size-6" />
                      </span>
                      <span
                        onClick={() => handleDetailsProduct(product._id)}
                        className="text-yellow-500 mr-3"
                      >
                        <FaEdit className="size-6" />
                      </span>
                      <span
                        onClick={() => {
                          setProductIdToDelete(product._id);
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
                                  onClick={handleDelete}
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
        )}
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

export default TableViewProduct;
