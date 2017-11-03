const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports = function() {
  const db = mongoose.connect("mongodb://localhost/myapp", {
    useMongoClient: true
  });

  const UserSchema = new Schema({
    twitterProvider: {
      type: {
        id: String,
        token: String
      },
      select: false
    }
  });

  UserSchema.set("toJSON", { getters: true, virtuals: true });

  UserSchema.statics.upsertTwitterUser = function(
    token,
    tokenSecret,
    profile,
    cb
  ) {
    const that = this;
    return this.findOne(
      {
        "twitterProvider.id": profile.id
      },
      function(err, user) {
        // no user was found, lets create a new one
        if (!user) {
          const newUser = new that({
            twitterProvider: {
              id: profile.id,
              token: token,
              tokenSecret: tokenSecret
            }
          });

          newUser.save(function(error, savedUser) {
            if (error) {
              console.log(error);
            }
            return cb(error, savedUser);
          });
        } else {
          return cb(err, user);
        }
      }
    );
  };

  mongoose.model("User", UserSchema);

  return db;
};
