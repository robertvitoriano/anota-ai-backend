import Note from "../models/Note";
import User from "../models/User";
import Category from "../models/Category";

class NoteController {
  async store(req, res) {
    const user = req.user;
    const { title, body } = req.body;
    const note = new Note({ title, body, authorId: user._id, categoryId: req.body.categoryId });
    await note.save();
    const loggedUser = await User.findById(user._id);
    await loggedUser.notesId.push(note._id);
    await loggedUser.save();
    res.status(201).send(note);
  }

  async index(req, res) {
    const user = req.user;
    const notes = await Note.find({ authorId: user._id });
    if (!notes) {
      return console.log("You haven't post anything yet");
    }

    return res.send(notes);
  }

  async update(req, res) {
    try {
      const note = await Note.findById(req.params.id);
      const { title, body, categoryId } = req.body;
      Object.assign(note, { title, body, categoryId });
      await note.save();
      return res.send(note);
    } catch (e) {
      res.status(400).send(e);
    }
  }

  async read(req, res) {
    try {
      const note = await Note.findById(req.params.id);
      if (note.categoryId) {
        const category = await Category.findById(note.categoryId);
        return res.send({ ...note._doc, categoryName:category.name });
      }
      return res.send(note);
    } catch (e) {
      res.status(400).send(e);
    }
  }

  async delete(req, res) {
    try {
      const note = await Note.deleteOne({ _id: req.params.id });
      res.send();
    } catch (e) {
      res.status(400).send(e);
    }
  }
};

export default new NoteController()