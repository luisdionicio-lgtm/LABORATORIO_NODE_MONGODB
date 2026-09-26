import postRepository from "../repositories/postRepository.js";
import userRepository from "../repositories/userRepository.js";

class PostService {

  normalizePostData(postData) {
    const hashtags = Array.isArray(postData.hashtags)
      ? postData.hashtags
      : String(postData.hashtags || "")
          .split(",")
          .map((tag) => tag.trim().replace(/^#/, ""))
          .filter(Boolean);

    return {
      title: String(postData.title || "").trim(),
      content: String(postData.content || "").trim(),
      imageUrl: String(postData.imageUrl || "").trim(),
      hashtags
    };
  }

  async createPost(userId, postData) {

    const user =
      await userRepository.findById(userId);

    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    return await postRepository.create({
      ...this.normalizePostData(postData),
      user: user._id
    });
  }


  async getPosts() {

    return await postRepository.findAll();

  }

  async getUsers() {
    return await userRepository.findAll();
  }


  async getPostsByUser(userId) {

    return await postRepository.findByUser(userId);

  }

  async getPostById(postId) {
    const post = await postRepository.findById(postId);

    if (!post) {
      throw new Error("Publicación no encontrada");
    }

    return post;
  }

  async getFeaturedPost() {
    return await postRepository.findFeatured();
  }

  async featurePost(postId) {
    const post = await postRepository.feature(postId);

    if (!post) {
      throw new Error("Publicación no encontrada");
    }

    return post;
  }

  async updatePost(postId, postData) {
    const post = await postRepository.update(
      postId,
      this.normalizePostData(postData)
    );

    if (!post) {
      throw new Error("Publicación no encontrada");
    }

    return post;
  }

  async deletePost(postId) {
    const post = await postRepository.delete(postId);

    if (!post) {
      throw new Error("Publicación no encontrada");
    }

    return post;
  }

}

export default new PostService();
