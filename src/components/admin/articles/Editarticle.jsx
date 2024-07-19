import React, { useEffect, useState } from "react";
import "./insertarticle.css";
import axios from "axios";
import { Modal } from "react-bootstrap";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { editarticle } from "../../../servises/articleservice";
import { fetchscategories } from "../../../servises/scategorieservice";
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const Editarticle = ({ showe, handleClose, art, modifarticle }) => {
  const [article, setArticle] = useState([]);
  const [scategories, setScategories] = useState([]);
  const [category, setCategory] = useState(art.scategorieID._id);
  const [files, setFiles] = useState([]);
  const loadscategories = async () => {
    try {
      const res = await fetchscategories();
      setScategories(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    console.log(art.scategorieID._id);
    setArticle(art);
    loadscategories();
    setFiles([
      {
        source: art.imageart,
        options: { type: "local" },
      },
    ]);
  }, []);

  const serverOptions = () => {
    console.log("server pond");
    return {
      load: (source, load, error, progress, abort, headers) => {
        var myRequest = new Request(source);
        fetch(myRequest).then(function (response) {
          response.blob().then(function (myBlob) {
            load(myBlob);
          });
        });
      },
      process: (fieldName, file, metadata, load, error, progress, abort) => {
        console.log(file);
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "ecom2025");
        data.append("cloud_name", "dwncegvy3");
        data.append("public_id", file.name);
        axios
          .post("https://api.cloudinary.com/v1_1/dwncegvy3/image/upload", data)
          .then((response) => response.data)
          .then((data) => {
            console.log(data);
            setArticle({ ...article, imageart: data.url });
            load(data);
          })
          .catch((error) => {
            console.error("Error uploading file:", error);
            error("Upload failed");
            abort();
          });
      },
    };
  };
  const handlemodif = (e) => {
    setArticle({ ...article, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await editarticle(article).then((res) => {
        modifarticle(article);
      });
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="form-container">
      <Modal show={showe} onHide={handleClose}>
        <form className="article-form">
          <Modal.Header closeButton>
            <h2>Modifier Article </h2>
          </Modal.Header>
          <Modal.Body>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="title">Référence</label>
                <input
                  type="text"
                  id="reference"
                  value={article.reference}
                  onChange={(e) => handlemodif(e)}
                  className="form-input"
                  placeholder="Entrez référence article"
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Désignation</label>
                <input
                  type="text"
                  id="designation"
                  value={article.designation}
                  onChange={(e) => handlemodif(e)}
                  className="form-input"
                  placeholder="Entrez la désignation article"
                />
              </div>
              <div className="form-group">
                <label htmlFor="marque">Marque</label>
                <input
                  type="text"
                  id="marque"
                  value={article.marque}
                  onChange={(e) => handlemodif(e)}
                  className="form-input"
                  placeholder="Entrez marque"
                />
              </div>
              <div className="form-group">
                <label htmlFor="quantite">Quantité</label>
                <input
                  type="number"
                  id="qtestock"
                  value={article.qtestock}
                  onChange={(e) => handlemodif(e)}
                  className="form-input"
                  placeholder="Entrez quantité stock"
                />
              </div>
              <div className="form-group">
                <label htmlFor="prix">Prix</label>
                <input
                  type="number"
                  required
                  id="prix"
                  value={article.prix}
                  onChange={(e) => handlemodif(e)}
                  className="form-input"
                  placeholder="Entrez prix"
                />
              </div>
              <div className="form-group">
                <label htmlFor="prix">Catégorie</label>
                <select
                  id="category"
                  className="form-control"
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    handlemodif(e);
                  }}
                >
                  {scategories.map((scat, index) => (
                    <option key={index} value={scat._id}>
                      {scat.nomscategorie}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="prix">Image</label>
                <div style={{ width: "80%", margin: "auto", padding: "1%" }}>
                  <FilePond
                    files={files}
                    acceptedFileTypes="image/*"
                    onupdatefiles={setFiles}
                    allowMultiple={true}
                    server={serverOptions()}
                    name="file"
                  />
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              type="button"
              className="form-submit-button"
              onClick={(e) => handleSubmit(e)}
            >
              Enregistrer
            </button>
            <button
              type="reset"
              className="form-reset-button"
              onClick={() => handleClose()}
            >
              Annuler
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
};

export default Editarticle;
