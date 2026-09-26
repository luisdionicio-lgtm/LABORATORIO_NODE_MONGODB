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
}

export default new UserService();
