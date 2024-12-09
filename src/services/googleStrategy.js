import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { User } from '../models/userModel.js';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '../config/env.js';

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    async (token, tokenSecret, profile, done) => {
      try {
        const existingUser = await User.findOne({ email: profile.emails[0].value });

        if (existingUser) {
          await existingUser.save();
          return done(null, existingUser);
        }

        const newUser = new User({
          name: profile.displayName,
          email: profile.emails[0].value,
          password: null,
          accountType: 0,
          userRole: 1,
          isProvider: true,
          authProvider:'google'
        });

        await newUser.save();
        done(null, newUser);
      } catch (error) {
        done(error, null);
      }
    }
  )
);
