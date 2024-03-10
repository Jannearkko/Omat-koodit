const { default: mongoose } = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name required.']
  },
  email: {
    type: String,
    required: [true, 'Email required.'],
    unique: true // make sure that all emails are unique, not used for validation yet.
  },
  password: {
    type: String,
    required: [true, 'Password required.']
  },
  passwordConf: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  },
  refreshToken: {
    type: String,
    default: '',
  },
  updatedAt: {
    type: Date
  }
}, {collection: 'users'});

userSchema.pre('save', async function (next) {
  // Check for unique email
  if (this.isModified('email') || this.isNew) {
    try {
      const existingUser = await this.constructor.findOne({ email: this.email });
      if (existingUser) {
        return next(new Error('Email already exists.'));
      }
    } catch (error) {
      return next(error);
    }
  }
  // Check if password is modified or is new
  if (this.isModified('password') || this.isNew) {
    // Check if the password and password confirmation match
    if (typeof this.passwordConf !== 'undefined' && this.password !== this.passwordConf) {
      // If they don't match, throw an error
      return next(new Error('Passwords must match.'));
    }

    try {
      // If the passwords match, proceed with hashing the password
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);

      // Clear the passwordConf field since it's no longer needed after validation
      this.passwordConf = undefined;
    } catch (error) {
      return next(error);
    }
  }

  // Update the updatedAt timestamp
  this.updatedAt = new Date();
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;