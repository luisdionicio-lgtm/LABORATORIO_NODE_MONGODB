import userRepository from "../repositories/userRepository.js";

class UserService {
  normalizeUserData(userData) {
    return {
      name: String(userData.name || "").trim(),
      lastName: String(userData.lastName || "").trim(),
      email: String(userData.email || "").trim().toLowerCase(),
      age: Number(userData.age),
      phoneNumber: String(userData.phoneNumber || "").trim(),
      password: String(userData.password || "")
    };
  }

  async getUsers() {
    return await userRepository.findAll();
  }

  async createUser(userData) {
    const normalizedData = this.normalizeUserData(userData);
    const existingUser = await userRepository.findByEmail(normalizedData.email);

    if (existingUser) {
      throw new Error("Ya existe un usuario registrado con este correo.");
    }

    return await userRepository.create(normalizedData);
  }

  async getUserById(userId) {
    const user = await userRepository.findById(userId);

    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    return user;
  }

  async updateUser(userId, userData) {
    const currentUser = await this.getUserById(userId);
    const email = String(userData.email || "").trim().toLowerCase();
    const userWithEmail = await userRepository.findByEmail(email);

    if (userWithEmail && String(userWithEmail._id) !== String(userId)) {
      throw new Error("Ya existe otro usuario registrado con este correo.");
    }

    const updateData = {
      name: String(userData.name || "").trim(),
      lastName: String(userData.lastName || "").trim(),
      email,
      age: Number(userData.age),
      phoneNumber: String(userData.phoneNumber || "").trim()
    };

    if (userData.password) {
      updateData.password = String(userData.password);
    }

    const updatedUser = await userRepository.update(currentUser._id, updateData);

    if (!updatedUser) {
      throw new Error("Usuario no encontrado");
    }

    return updatedUser;
  }
}

export default new UserService();
