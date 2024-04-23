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
} from "react-icons/fa";
import * as TypeService from "../../services/TypeService";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Link, useNavigate } from "react-router-dom";
import { DownloadTableExcel } from "react-export-table-to-excel";

const TableViewType = () => {
  const navigate = useNavigate();
  const [successNotification, setSuccessNotification] = useState(null);
  const [errorNotification, setErrorNotification] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [typeIdToDelete, setTypeIdToDelete] = useState(null);
  // State cho phân trang
  const [pageNumber, setPageNumber] = useState(0);
  const typesPerPage = 10;
  const pagesVisited = pageNumber * typesPerPage;
  const [showSortModal, setShowSortModal] = useState(false);
  const [sortType, setSortType] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortIcon, setSortIcon] = useState(<FaSort />);
  const tableRef = useRef(null);

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

  const handleDelete = async () => {
    if (!typeIdToDelete) return;
    const res = await TypeService.deleteType(typeIdToDelete);
    if (res.status === "OK") {
      setTypeIdToDelete(null);
      setShowModal(false);
      setSuccessNotification("Delete type success!");
      setTimeout(() => {
        setSuccessNotification(null);
        window.location.reload();
      }, 3000);
    } else {
      console.error(res.message);
      setErrorNotification("Delete type failed! " + res.message);
      setTimeout(() => {
        setErrorNotification(null);
      }, 3000);
    }
  };

  const handleDetailsType = (typeId) => {
    navigate(`/type/edit/${typeId}`);
  };

  const handleViewDetailsType = (typeId) => {
    navigate(`/type/view/${typeId}`);
  };

  // Tính số trang
  const pageCount = Math.ceil(types?.data?.length / typesPerPage);

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

  const sortedTypes = types?.data
    ?.sort((a, b) => {
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
    .slice(pagesVisited, pagesVisited + typesPerPage);

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
        filename="Types table"
        sheet="Types"
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

            <th
              className="w-auto text-left text-wrap py-3 px-4 uppercase font-semibold text-sm relative"
              onClick={handleSortModal}
            >
              <div className="flex items-center" onClick={handleSortModal}>
                <span className="mr-3">Name</span>
                <FaFilter className="cursor-pointer" />
              </div>
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
              CreatedAt
            </th>
            <th className="w-auto text-left py-3 px-4 uppercase font-semibold text-sm">
              UpdatedAt
            </th>
            <th className="w-auto text-left py-3 px-4 uppercase font-semibold text-sm sr-only">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {types?.data
            ?.slice(pagesVisited, pagesVisited + typesPerPage)
            .map((type, index) => (
              <tr key={type._id}>
                <td className="w-auto text-left py-3 px-4 border">
                  {index + 1}
                </td>
                <td className="w-auto text-left py-3 px-4 border">
                  <span className="hover:text-blue-500">{type._id}</span>
                </td>

                <td className="w-auto text-left text-nowrap py-3 px-4 border">
                  <span className="hover:text-blue-500">{type.name}</span>
                </td>

                <td className="w-auto text-left py-3 px-4 border">
                  <span className="hover:text-blue-500">
                    {format(Date(type.createdAt), "dd/MM/yyyy HH:mm:ss")}
                  </span>
                </td>
                <td className="w-auto text-left py-3 px-4 border">
                  <span className="hover:text-blue-500">
                    {format(Date(type.updatedAt), "dd/MM/yyyy HH:mm:ss")}
                  </span>
                </td>
                <td className="w-auto text-left py-3 px-4 border">
                  <div className="flex flex-row">
                    <span
                      onClick={() => handleDetailsType(type._id)}
                      className="text-yellow-500 mr-3"
                    >
                      <FaEdit className="size-6" />
                    </span>
                    <span
                      onClick={() => {
                        setTypeIdToDelete(type._id);
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

export default TableViewType;
