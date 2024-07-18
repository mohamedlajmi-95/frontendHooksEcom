import "@fortawesome/fontawesome-free/css/all.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Listarticle from "./components/admin/articles/Listarticle";
import Viewarticle from "./components/admin/articles/Viewarticle";
import Editarticle from "./components/admin/articles/Editarticle";
import Insertarticle from "./components/admin/articles/Insertarticle";
import Editcategorie from "./components/admin/categories/Editcategorie";
import Listcategorie from "./components/admin/categories/Listcategorie";
import Viewcategorie from "./components/admin/categories/Viewcategorie";
import Insertcategorie from "./components/admin/categories/Insertcategorie";
import Editscategorie from "./components/admin/scategories/Editscategorie";
import Insertscategorie from "./components/admin/scategories/Insertscategorie";
import Listscategorie from "./components/admin/scategories/Listscategorie";
import Viewscategorie from "./components/admin/scategories/Viewscategorie";
import Menu from "./components/shared/Menu";
import Listarticlescard from "./components/client/Listarticlescard";

function App() {
  return (
    <BrowserRouter>
      <Menu />
      <Routes>
        <Route path="/" element={<Listarticlescard />}></Route>
        <Route path="/articles" element={<Listarticle />}></Route>
        <Route path="/articles/:id" element={<Viewarticle />}></Route>
        <Route path="/editarticles/:id" element={<Editarticle />}></Route>
        <Route path="/addarticle" element={<Insertarticle />}></Route>

        <Route path="/categories" element={<Listcategorie />}></Route>
        <Route path="/categories/:id" element={<Viewcategorie />}></Route>
        <Route path="/editcategories/:id" element={<Editcategorie />}></Route>
        <Route path="/addcategorie" element={<Insertcategorie />}></Route>

        <Route path="/scategories" element={<Listscategorie />}></Route>
        <Route path="/scategories/:id" element={<Viewscategorie />}></Route>
        <Route path="/editscategories/:id" element={<Editscategorie />}></Route>
        <Route path="/addscategorie" element={<Insertscategorie />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
