import style from "./SearchBar.module.css";
import { useState } from "react";
import { toast } from "react-hot-toast";

const SearchBar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchQuery.trim() === "") {
      toast.error("Please enter your term");
      return;
    }
    onSubmit(searchQuery);
    setSearchQuery("");
  };
  return (
    <header className={style.header}>
      <form className={style.form} onSubmit={handleSubmit}>
        <input
          className={style.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className={style.button}>
          🔍
        </button>
      </form>
    </header>
  );
};
export default SearchBar;
