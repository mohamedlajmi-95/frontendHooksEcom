import React, { useEffect, useState } from "react";
import {
  deletearticle,
  fetcharticlesPagination,
} from "../../../servises/articleservice";
import Affichearticles from "./Affichearticles";
import Pagination from "./Pagination";
import Headerarticle from "./Headerarticle";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import Listarticlescard from "../../client/Listarticlescard";
import Insertarticle from "./Insertarticle";

const Listarticle = () => {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(5);
  const [searchText, setSearchText] = useState("");
  const [show, setShow] = useState(false);

  const fetchProducts = async (page, limit, searchText) => {
    try {
      const res = await fetcharticlesPagination(page, limit, searchText);
      setArticles(res.data.products);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      alert("error connexion");
    }
  };
  console.log(articles);
  console.log(totalPages);

  useEffect(() => {
    fetchProducts(currentPage, limit, searchText);
  }, [currentPage, limit, searchText]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value, 10));

    setCurrentPage(1);
  };
  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };
  const handleDeletearticle = async (id, ref) => {
    confirmAlert({
      title: "Confirm delete...",
      message: " supprimer l' article: " + ref,
      buttons: [
        {
          label: "Oui",
          onClick: () =>
            deletearticle(id)
              .then((res) => fetchProducts(currentPage, limit, ""))
              .catch((error) => console.log(error)),
        },
        {
          label: "Non",
        },
      ],
    });
  };
  const handleShow = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };
  const modifarticle = (artmod) => {
    setArticles(articles.map((art) => (art._id === artmod._id ? artmod : art)));
  };

  return (
    <div>
      <button className="new" onClick={handleShow}>
        <i className="fa-solid fa-plus-square"></i> Nouveau
      </button>
      {show && (
        <Insertarticle
          show={show}
          handleClose={handleClose}
          limit={limit}
          fetchProducts={fetchProducts}
        />
      )}
      <Headerarticle
        handleSearchChange={handleSearchChange}
        searchText={searchText}
      />
      <Affichearticles
        articles={articles}
        handleLimitChange={handleLimitChange}
        limit={limit}
        handleDeletearticle={handleDeletearticle}
        modifarticle={modifarticle}
      />
      <Pagination
        handlePrevPage={handlePrevPage}
        handleNextPage={handleNextPage}
        handlePageChange={handlePageChange}
        handleLimitChange={handleLimitChange}
        totalPages={totalPages}
        currentPage={currentPage}
      />
    </div>
  );
};

export default Listarticle;
