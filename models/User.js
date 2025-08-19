// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['admin', 'dealer', 'staff'],
    default: 'staff',
  },
  // ✅ Add this only for staff
  dealerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: function () {
      return this.role === 'staff';
    },
  },
}, { timestamps: true });

export default mongoose.model('User', userSchema);
