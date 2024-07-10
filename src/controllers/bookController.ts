import { Request, Response } from 'express';
import pool from '../models/db';
import { Book } from '../models/book';
import { validationResult } from 'express-validator';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM books');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
};

export const getBookById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM books WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
};

export const createBook = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, description, published_date, author_id }: Book = req.body;
  try {
    const [result] = await pool.query<ResultSetHeader>('INSERT INTO books (title, description, published_date, author_id) VALUES (?, ?, ?, ?)', [title, description, published_date, author_id]);
    res.status(201).json({ id: result.insertId, title, description, published_date, author_id });
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
};

export const updateBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, published_date, author_id }: Book = req.body;
  try {
    const [result] = await pool.query<ResultSetHeader>('UPDATE books SET title = ?, description = ?, published_date = ?, author_id = ? WHERE id = ?', [title, description, published_date, author_id, id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.status(200).json({ id, title, description, published_date, author_id });
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query<ResultSetHeader>('DELETE FROM books WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
};
