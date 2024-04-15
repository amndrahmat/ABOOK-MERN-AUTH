import { useState } from "react";
import { useBooksContext } from "../hooks/useBooksContext";
import { useAuthContext } from "../hooks/useAuthContext";

const BookForm = () => {
  const { dispatch } = useBooksContext();
  const { user } = useAuthContext();

  const [title, setTitle] = useState("");
  const [page, setPage] = useState("");
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");
  const [language, setLanguage] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }
    const book = { title, page, category, language, author, description };

    const response = await fetch("/api/books", {
      method: "POST",
      body: JSON.stringify(book),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setEmptyFields([]);
      setError(null);
      setTitle("");
      setPage("");
      setCategory("");
      setLanguage("");
      setAuthor("");
      setDescription("");
      dispatch({ type: "CREATE_BOOK", payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Book</h3>
      <label>Book Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes("title") ? "error" : ""}
      />

      <label>page:</label>
      <input
        type="number"
        onChange={(e) => setPage(e.target.value)}
        value={page}
        className={emptyFields.includes("page") ? "error" : ""}
      />

      <label>category:</label>
      <input
        type="text"
        onChange={(e) => setCategory(e.target.value)}
        value={category}
        className={emptyFields.includes("category") ? "error" : ""}
      />

      <label>Language:</label>
      <input
        type="text"
        onChange={(e) => setLanguage(e.target.value)}
        value={language}
        className={emptyFields.includes("language") ? "error" : ""}
      />

      <label>author:</label>
      <input
        type="text"
        onChange={(e) => setAuthor(e.target.value)}
        value={author}
        className={emptyFields.includes("author") ? "error" : ""}
      />

      <label>description:</label>
      <input
        type="text"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        className={emptyFields.includes("description") ? "error" : ""}
      />

      <button>Add Book</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default BookForm;
