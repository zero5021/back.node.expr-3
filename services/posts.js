const express= require('express');
const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: '1234',
  database: 'likeme',
  allowExitOnIdle: true  
});

const getAllPosts = async() => {
  const { rows } = await pool.query("SELECT * FROM posts");
  return rows;
};

const createPost = async (payload) => {
  const query = "INSERT INTO posts values (DEFAULT, $1, $2, $3) RETURNING *";
  const values = [payload.titulo, payload.img, payload.descripcion];
    
  const result = await pool.query(query, values);
console.log(result.rows, "creacion exitosa");
}; 

const createNewpost = async (payload) => {
    const SQLquery = {text: 'INSERT INTO posts values (DEFAULT, $1, $2, $3) RETURNING *',Values : [
      payload.titulo, 
      payload.img, 
      payload.descripcion
    ],
    } 
    try {    
    const result = await pool.query(SQLquery, values);
    return result.rows;
  } catch (e){
    console.log('error, faltan datos: ', e.code, e.message)} 
    throw new Error(e)
  }

module.exports = { getAllPosts, createPost, createNewpost};