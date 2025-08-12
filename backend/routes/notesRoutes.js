import { Router } from "express"
import { create, deleteNote, fetch, update } from "../controllers/notesController.js"
import loggedin from "../middlewares/loggedin.js";

const notesRouter = Router()

notesRouter.post("/create", loggedin, create)
notesRouter.get("/", loggedin, fetch)
notesRouter.post("/update", loggedin, update)
notesRouter.post("/delete", loggedin, deleteNote)


export default notesRouter;