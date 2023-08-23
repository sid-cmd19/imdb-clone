import { lazy, Suspense } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./pages/home/Home";
// import MovieList from "./components/movieList/MovieList";
// import MovieDetail from "./pages/movieDetail/MovieDetail";
// import Movie from "./pages/movieDetail/Movie";

const MovieList = lazy(() => import("./components/movieList/MovieList"));
const Movie = lazy(() => import("./pages/movieDetail/Movie"));

function App() {
  return (
    <div className='App'>
      <Router>
        <Header />
        <Routes>
          <Route index element={<Home />}></Route>
          <Route
            path='movie/:id'
            element={
              <Suspense fallback={<p>Loading...</p>}>
                <Movie />
              </Suspense>
            }
            loader={() =>
              import("./pages/movieDetail/Movie").then((module) =>
                module.loader()
              )
            }
          ></Route>
          <Route
            path='movies/:type'
            element={
              <Suspense fallback={<p>Loading...</p>}>
                <MovieList />
              </Suspense>
            }
            loader={() =>
              import("./components/movieList/MovieList").then((module) =>
                module.loader()
              )
            }
          ></Route>
          <Route path='/*' element={<h1>Error page</h1>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
