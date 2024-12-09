import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { 
      type: String, 
      unique: true, 
      sparse: true
    },
    password: {
      type: String,
      validate: {
        validator: function (value) {
          // Password is required unless using Google or Facebook login
          if (!this.isProvider && this.authProvider === 'local' && !value) {
            return false;
          }
          return true;
        },
        message: 'Password is required unless signing in with Google or Facebook.',
      },
    },
    phoneNumber: {
      type: String,
      unique: true,
      sparse: true,
    },
    address: {
      latitude: { type: String },
      longitude: { type: String },
    },
    countryId: { type: Number },
    accountType: { 
      type: Number, 
      required: true, 
      enum: [0, 1], // 0 = Individual, 1 = Business
    },
    balance: { 
      type: mongoose.Types.Decimal128, 
      default: 0.0 
    },
    userRole: { 
      type: Number, 
      required: true, 
      enum: [0, 1], // 0 = Admin, 1 = User
    },
    isProvider: { 
      type: Boolean, 
      default: false 
    },
    authProvider: { 
      type: String, 
      required: true, 
      enum: ['local', 'google', 'facebook'], // Specify the provider
    },
  },
  {
    timestamps: true,
  }
);

// Custom validation to enforce email/phone requirements
userSchema.pre('validate', function (next) {
  // If authProvider is Facebook, require at least one: email or phoneNumber
  if (this.authProvider === 'facebook' && !this.email && !this.phoneNumber) {
    return next(new Error('At least one of email or phoneNumber must be provided for Facebook login.'));
  }

  // If authProvider is not Facebook, require email
  if (this.authProvider !== 'facebook' && !this.email) {
    return next(new Error('Email is required for non-Facebook login.'));
  }

  next();
});

export const User = mongoose.model('User', userSchema);
