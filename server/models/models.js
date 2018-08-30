var mongoose = require('mongoose');

if (!process.env.MONGODB_URI) {
  console.log('Error: MONGODB_URI NOT SET');
  process.exit(1);
}

var userSchema = {
  email: {
    type: String
  },
  password: {
    type: String
  }
}

var documentSchema = {
  title: {
    type: String
  },
  password: {
    type: String
  },
  content: {
    type: String
  }
}

var User = mongoose.model("User", userSchema);
var Document = mongoose.model('Document', documentSchema);

module.exports = {
  User: User,
  Document: Document
}
