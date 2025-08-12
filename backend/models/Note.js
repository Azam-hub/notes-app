import { model, Schema } from "mongoose"

const noteSchema = new Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    pinned: {
        type: Boolean,
        default: false,
    }
},{
    timestamps: true,
})

const Note = model("Note", noteSchema);

export default Note