import CategoryModel from "../models/Category";
import UserModel from "../models/User";
import NoteModel from "../models/Note";

class CategoryController {

  async store(req, res) {
    const user = req.user;
    const { name } = req.body;
    const category = new CategoryModel({ name: name, authorId: user._id });

    try {
      await category.save();
      const loggedUser = await UserModel.findById(user._id);
      await loggedUser.categoriesId.push(category._id);
      await loggedUser.save();

      res.status(201).send(category);
    } catch (e) {
      console.log(e);
      res.status(400).send(e);
    }
  }

  async index(req, res) {
    try {
      const categoryId = req.params.categoryId;
      const category = await CategoryModel.findById(categoryId);
      const notes = await NoteModel.find({ categoryId: categoryId });
      res.send({ category: category, notes: notes });
    } catch (error) {
      res.status(400).send(error);
    }
  }
  async list(req, res) {
    const { user } = req;
    try {
      const loggedUser = await UserModel.findById(user._id);
      const categories = await CategoryModel.find({ authorId: loggedUser._id });
      res.send(categories);
    } catch (e) {
      res.send(e);
    }
  }
  async associate(req, res) {
    try {
      const { notesId } = req.body;
      const { categoryId } = req.params;

      const findAllNotes = (notesId) => {
        return notesId.map((id) => {
          return NoteModel.findById(id);
        });
      };
      const saveNotes = (notes) => {
        return notes.map((note) => {
          return note.save();
        });
      };

      const notes = await Promise.all(findAllNotes(notesId));

      const updatedNotes = notes.map((note) => {
        note.categoryId = categoryId;
        return note;
      });
      await Promise.all(saveNotes(updatedNotes));

      res.send(updatedNotes);
    } catch { }
  }
  async remove(req, res) {
    try {
      const { categoryId } = req.params;

      await NoteModel.updateMany({ "categoryId": categoryId }, { "$set": { "categoryId": null } });

      await CategoryModel.deleteOne({ _id: categoryId });

      res.status(200).send({ message: 'Category removed' });
    } catch (e) {
      console.log(e);

    }
  }
};


export default new CategoryController()