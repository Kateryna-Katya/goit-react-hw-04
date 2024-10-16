import { useEffect, useState } from "react";
import axios from "axios";

import SearchBar from "./components/SearchBar/SearchBar.jsx";
import ImageGallery from "./components/ImageGallery/ImageGallery.jsx";
import Loader from "./components/Loader/Loader.jsx";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn.jsx";
import ImageModal from "./components/ImageModal/ImageModal.jsx";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage.jsx";

axios.defaults.baseURL = `https://api.unsplash.com`;

const API_KEY = `Ho75YQ174NzlkoOxkHTr6Id6eAukC4HGLacHmF6CR9A`;

function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    if (!query) return;

    const fetchImages = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`/search/photos`, {
          params: { query, page, per_page: 12 },
          headers: { Authorization: `Client-ID ${API_KEY}` },
        });
        const newImages = response.data.results;
        const total = response.data.total;
        setImages((prevImages) => [...prevImages, ...response.data.results]);
        setTotalResults(total);
      } catch (error) {
        setError("Failed to fetch images. Please try again.");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, [query, page]);

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
    setImages([]);
    setPage(1);
    setTotalResults(0);
  };
  const loadMoreImages = () => {
    setPage((prevPage) => prevPage + 1);
  };
  const openModal = (image) => {
    setShowModal(true);
    setSelectedImage(image);
  };
  const closeModal = () => {
    setShowModal(false);
    setSelectedImage(null);
  };
  const allImagesLoaded = images.length >= totalResults;

  return (
    <div>
      <SearchBar onSubmit={handleSearch} />
      {error ? (
        <ErrorMessage message={error} />
      ) : (
        <>
          <ImageGallery images={images} onImageClick={openModal} />
          {loading && <Loader />}
          {!allImagesLoaded && images.length > 0 && (
            <LoadMoreBtn onClick={loadMoreImages} />
          )}
          {showModal && (
            <ImageModal image={selectedImage} onClose={closeModal} />
          )}
        </>
      )}
    </div>
  );
}

export default App;
