const express = require("express");
const app = express();
const { Pool } = require("pg");

app.use(express.json());

 app.use((req, res, next) => {
  console.log("PATH:", req.path);
  next();
});

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

const init = async () => {
  app.get("/getsql", async (req, res) => {
    const client = await pool.connect();
    const [commentRes, boardRes] = await Promise.all([
      client.query(
        `
                SELECT * FROM comments NATURAL LEFT JOIN rich_content WHERE board_id = $1
                `,
        [res.query.search]
      ),
      client.query(
        `
                SELECT * FROM boards WHERE board_id = 1$
                `,
        [res.query.search]
      ),
    ]);
    res.json({
      status: success,
      board: boardRes.rows[0] || {},
      posts: commentRes.rows,
    });
    await client.end();
  });
  app.use(express.static("./static"));

  app.listen(5000);

 
  console.log(" server listening on post 5000");
};

init();
