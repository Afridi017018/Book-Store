import { Router } from 'express';
import { body } from 'express-validator';
import { getAllAuthors, getAuthorById, createAuthor, updateAuthor, deleteAuthor } from '../controllers/authorController';

const router = Router();

router.get('/authors', getAllAuthors);
router.get('/authors/:id', getAuthorById);
router.post(
  '/authors',
  [
    body('name').not().isEmpty().withMessage('Name is required'),
    body('birthdate').isDate().withMessage('Birthdate must be a valid date'),
  ],
  createAuthor,
);
router.put(
  '/authors/:id',
  [
    body('name').not().isEmpty().withMessage('Name is required'),
    body('birthdate').isDate().withMessage('Birthdate must be a valid date'),
  ],
  updateAuthor,
);
router.delete('/authors/:id', deleteAuthor);

export default router;
