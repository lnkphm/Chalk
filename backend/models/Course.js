const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Roles = require('./enums/Roles');

const CourseSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    dateStart: { type: Date },
    dateFinish: { type: Date }, 
    public: { type: Boolean },
    password: { type: String },
    users: [
      {
        id: { type: Schema.Types.ObjectId, ref: 'User' },
        role: { type: String, enums: Roles },
      },
    ],
    tags: [{ type: Schema.Types.ObjectId, ref: 'CourseTag' }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Course', CourseSchema);
