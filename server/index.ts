import { Elysia, t } from "elysia";
import { cors } from "@elysiajs/cors";
import { Database } from "bun:sqlite";

const db = new Database("backlog.db");

db.run(`
  CREATE TABLE IF NOT EXISTS backlog (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    background_image TEXT,
    rating REAL,
    status TEXT NOT NULL DEFAULT 'playing',
    user_rating REAL,
    description TEXT,
    started_at TEXT NOT NULL DEFAULT (date('now')),
    finished_at TEXT
  )
`);

const app = new Elysia()
  .use(cors())
  .get("/backlog", () => {
    return db.query("SELECT * FROM backlog ORDER BY started_at DESC").all();
  })
  .post(
    "/backlog",
    ({ body }) => {
      db.prepare(`
        INSERT OR IGNORE INTO backlog (id, name, background_image, rating)
        VALUES ($id, $name, $background_image, $rating)
      `).run({
        $id: body.id,
        $name: body.name,
        $background_image: body.background_image,
        $rating: body.rating,
      });
      return db.query("SELECT * FROM backlog WHERE id = ?").get(body.id);
    },
    {
      body: t.Object({
        id: t.Number(),
        name: t.String(),
        background_image: t.String(),
        rating: t.Number(),
      }),
    }
  )
  .get("/backlog/:id", ({ params }) => {
    const game = db.query("SELECT * FROM backlog WHERE id = ?").get(Number(params.id));
    if (!game) throw new Error("Game not found");
    return game;
  })
  .put(
    "/backlog/:id",
    ({ params, body }) => {
      db.prepare(`
        UPDATE backlog
        SET status = $status,
            user_rating = $user_rating,
            description = $description,
            finished_at = $finished_at
        WHERE id = $id
      `).run({
        $id: Number(params.id),
        $status: body.status,
        $user_rating: body.user_rating,
        $description: body.description,
        $finished_at: body.finished_at,
      });
      return db.query("SELECT * FROM backlog WHERE id = ?").get(Number(params.id));
    },
    {
      body: t.Object({
        status: t.String(),
        user_rating: t.Optional(t.Nullable(t.Number())),
        description: t.Optional(t.Nullable(t.String())),
        finished_at: t.Optional(t.Nullable(t.String())),
      }),
    }
  )
  .delete("/backlog/:id", ({ params }) => {
    db.run("DELETE FROM backlog WHERE id = ?", [Number(params.id)]);
    return { ok: true };
  })
  .listen(3001);

console.log(`Server running at http://localhost:${app.server?.port}`);
