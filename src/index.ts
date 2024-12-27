import { Hono } from "hono"
import { cors } from "hono/cors"
import db from "./db"
import { notes } from "./db/schema"

const app = new Hono()

app.use(cors())

app.post("/create-note", async (c) => {
  const data = await c.req.json()
  const { text } = data

  if (!text) {
    return c.json({ error: "Text is required" })
  }

  const note = await db.insert(notes).values({ text })
  if (!note) {
    return c.json({ error: "An error occurred" })
  }
  return c.json({ note, message: "Note created successfully" })
})

app.get("/notes", async (c) => {
  const allNotes = await db.select().from(notes)
  return c.json({ allNotes, message: "All notes" })
})

export default app
