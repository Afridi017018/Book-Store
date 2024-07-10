import { Request, Response } from 'express';
import pool from '../models/db';
import { Author } from '../models/author';
import { validationResult } from 'express-validator';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

interface QueryResult extends RowDataPacket {
  insertId?: number;
  affectedRows?: number;
  changedRows?: number;
}

export const getAllAuthors = async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query<QueryResult[]>('SELECT * FROM authors');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
};

export const getAuthorById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query<QueryResult[]>('SELECT * FROM authors WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Author not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
};

export const createAuthor = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, bio, birthdate }: Author = req.body;
  try {
    const [result] = await pool.query<ResultSetHeader>('INSERT INTO authors (name, bio, birthdate) VALUES (?, ?, ?)', [name, bio, birthdate]);
    res.status(201).json({ id: result.insertId, name, bio, birthdate });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
};

export const updateAuthor = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, bio, birthdate }: Author = req.body;
  try {
    const [result] = await pool.query<ResultSetHeader>('UPDATE authors SET name = ?, bio = ?, birthdate = ? WHERE id = ?', [name, bio, birthdate, id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Author not found' });
    }
    res.status(200).json({ id, name, bio, birthdate });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
};

export const deleteAuthor = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query<ResultSetHeader>('DELETE FROM authors WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Author not found' });
    }
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
};
