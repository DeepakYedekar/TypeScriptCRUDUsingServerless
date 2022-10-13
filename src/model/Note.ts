import mongoose from 'mongoose';
import pagination from 'mongoose-paginate-v2'
interface Note{
    title: string,
    description:string
}

const noteSchema = new mongoose.Schema<Note>({
    title: { type: String, required: true },
    description:{type:String, require:true}
})

noteSchema.plugin(pagination);
const note:mongoose.Model<Note> = mongoose.models.Notes || mongoose.model('Data', noteSchema);
export default note;