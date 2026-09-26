import userService from "../services/userService.js";

class UserController {
  async index(req, res) {
    try {
      const users = await userService.getUsers();
      res.render("users", {
        users,
        formData: {},
        error: "",
        notice: req.query.notice || ""
      });
    } catch (error) {
      res.status(500).render("error", { message: error.message });
    }
  }

  async create(req, res) {
    try {
      await userService.createUser(req.body);
      res.redirect("/users?notice=created");
    } catch (error) {
      const users = await userService.getUsers();
      res.status(400).render("users", {
        users,
        formData: req.body,
        error: error.message,
        notice: ""
      });
    }
  }

  async showEdit(req, res) {
    try {
      const user = await userService.getUserById(req.params.id);
      res.render("user-edit", { user, error: "" });
    } catch (error) {
      res.status(404).render("error", { message: error.message });
    }
  }

  async update(req, res) {
    try {
      await userService.updateUser(req.params.id, req.body);
      res.redirect("/users?notice=updated");
    } catch (error) {
      res.status(400).render("user-edit", {
        user: { _id: req.params.id, ...req.body },
        error: error.message
      });
    }
  }
}

export default new UserController();
