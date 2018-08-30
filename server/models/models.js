import mongoose from 'mongoose';
import { EditorState } from 'draft-js';

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

var ownershipSchema = {
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  document: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Document'
  }
}

var User = mongoose.model("User", userSchema);
var Document = mongoose.model('Document', documentSchema);
var Ownership = mongoose.model('Ownership', ownershipSchema);

module.exports = {
  User: User,
  Document: Document,
  Ownership: Ownership
}
