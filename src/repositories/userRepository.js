import User from "../models/User.js";

class UserRepository {
  async create(user) {
    return await User.create(user);
  }

  async findAll() {
    return await User.find().sort({ createdAt: -1 });
  }

  async findById(id) {
    return await User.findById(id);
  }

  async findByEmail(email) {
    return await User.findOne({ email });
  }

  async update(userId, userData) {
    return await User.findByIdAndUpdate(
      userId,
      {
        ...userData,
        updatedAt: new Date()
      },
      {
        new: true,
        runValidators: true
      }
    );
  }
}

export default new UserRepository();
