const express = require("express");
const {
  getBook,
  getBooks,
  createBook,
  deleteBook,
  updateBook,
} = require("../controllers/bookController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// require auth for all book routes
router.use(requireAuth);

router.get("/", getBooks);
router.get("/:id", getBook);
router.post("/", createBook);
router.delete("/:id", deleteBook);
router.patch("/:id", updateBook);

module.exports = router;
