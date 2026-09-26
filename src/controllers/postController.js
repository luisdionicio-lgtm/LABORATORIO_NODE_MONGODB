import postService from "../services/postService.js";

class PostController {


  async create(req, res) {

    try {

      const { userId } = req.body;

      const post =
        await postService.createPost(
          userId,
          req.body
        );

      res.redirect("/posts?notice=created");

    } catch (error) {

      const users = await postService.getUsers();
      res.status(400).render("post-form", {
        pageTitle: "Nueva publicación",
        formAction: "/posts",
        submitLabel: "Publicar ahora",
        post: req.body,
        users,
        error: error.message
      });

    }

  }


  async getAll(req, res) {

    try {

      const posts =
        await postService.getPosts();

      res.render(
        "posts",
        {
          posts,
          notice: req.query.notice || ""
        }
      );

    } catch (error) {

      res.status(500).json({
        error: error.message
      });

    }

  }

  async showCreate(req, res) {
    try {
      const users = await postService.getUsers();
      res.render("post-form", {
        pageTitle: "Nueva publicación",
        formAction: "/posts",
        submitLabel: "Publicar ahora",
        post: {},
        users,
        error: ""
      });
    } catch (error) {
      res.status(500).render("error", { message: error.message });
    }
  }

  async showEdit(req, res) {
    try {
      const post = await postService.getPostById(req.params.id);
      res.render("post-form", {
        pageTitle: "Editar publicación",
        formAction: `/posts/${post._id}/edit`,
        submitLabel: "Guardar cambios",
        post,
        users: [],
        error: ""
      });
    } catch (error) {
      res.status(404).render("error", { message: error.message });
    }
  }

  async update(req, res) {
    try {
      await postService.updatePost(req.params.id, req.body);
      res.redirect("/posts?notice=updated");
    } catch (error) {
      res.status(400).render("post-form", {
        pageTitle: "Editar publicación",
        formAction: `/posts/${req.params.id}/edit`,
        submitLabel: "Guardar cambios",
        post: { _id: req.params.id, ...req.body },
        users: [],
        error: error.message
      });
    }
  }

  async delete(req, res) {
    try {
      await postService.deletePost(req.params.id);
      res.redirect("/posts?notice=deleted");
    } catch (error) {
      res.status(404).render("error", { message: error.message });
    }
  }

  async feature(req, res) {
    try {
      await postService.featurePost(req.params.id);
      res.redirect("/posts?notice=featured");
    } catch (error) {
      res.status(404).render("error", { message: error.message });
    }
  }

}

export default new PostController();
