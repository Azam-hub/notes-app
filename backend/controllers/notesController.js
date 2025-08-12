import Note from "../models/Note.js"



const create = async (req, res) => {
    const { userId } = req;
    const { title, description, pinned } = req.body;

    if ((!title && !description) || !userId || pinned === undefined) {
        return res.status(400).json({ success: false, message: "Missing fields." });
    }

    await Note.create({
        title, description, userId, pinned
    });

    return res.status(201).json({ success: true, message: "Note has been saved!" });
}

const fetch = async (req, res) => {
    const { userId } = req;

    const notes = await Note.find({userId}).sort("-_id");

    return res.status(200).json({ success: true, message: "All notes fetched.", notes });
}

const update = async (req, res) => {
    const { noteId, title, description, pinned } = req.body

    if (!title && !description) {
        await Note.findByIdAndDelete(noteId);
        return res.status(200).json({success: true, message: "Note deleted."});
    }

    if (pinned === undefined) {
        return res.status(400).json({success: false, message: "Fields are missing."})
    }

    await Note.findByIdAndUpdate(noteId, {
        title, description, pinned
    });

    return res.status(200).json({success: true, message: "Note updated."});
}

const deleteNote = async (req, res) => {
    const { noteId } = req.body
    
    await Note.findByIdAndDelete(noteId);
    
    return res.status(200).json({success: true, message: "Note deleted."});
}



export {
    create,
    fetch,
    update,
    deleteNote
}