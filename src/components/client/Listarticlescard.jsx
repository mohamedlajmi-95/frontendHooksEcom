import React, { useEffect, useState } from "react";
import { fetcharticlesPagination } from "../../servises/articleservice";
import "./stylecard.css";
import Card from "./Card";
import Pagination from "../admin/articles/Pagination";

const Listarticlescard = () => {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(20);
  const [searchText, setSearchText] = useState("");

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
  return (
    <>
      <div className="card-container">
        {articles.map((art, index) => (
          <Card
            image={art.imageart}
            reference={art.reference}
            des={art.designation}
            prix={art.prix}
          />
        ))}
      </div>
      <div>
        <Pagination
          handlePrevPage={handlePrevPage}
          handleNextPage={handleNextPage}
          handlePageChange={handlePageChange}
          handleLimitChange={handleLimitChange}
          totalPages={totalPages}
          currentPage={currentPage}
        />
      </div>
    </>
  );
};

export default Listarticlescard;
