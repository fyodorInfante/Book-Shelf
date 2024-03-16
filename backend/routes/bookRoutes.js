import express from 'express';
import { createBook, getBooks, getBook , deleteBook, updateBook} from '../controller/bookController.js';

const router = express.Router();

router.post('/', createBook);

router.get('/', getBooks);

router.get('/:id', getBook);

router.delete('/:id', deleteBook);

router.patch('/:id', updateBook);

export default router;