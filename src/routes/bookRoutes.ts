import { Router } from 'express';
import { body } from 'express-validator';
import { getAllBooks, getBookById, createBook, updateBook, deleteBook } from '../controllers/bookController';

const router = Router();

router.get('/books', getAllBooks);
router.get('/books/:id', getBookById);
router.post(
  '/books',
  [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('published_date').isDate().withMessage('Published date must be a valid date'),
    body('author_id').isInt().withMessage('Author ID must be a valid integer'),
  ],
  createBook,
);
router.put(
  '/books/:id',
  [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('published_date').isDate().withMessage('Published date must be a valid date'),
    body('author_id').isInt().withMessage('Author ID must be a valid integer'),
  ],
  updateBook,
);
router.delete('/books/:id', deleteBook);

export default router;
