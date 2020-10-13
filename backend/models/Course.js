const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = new Schema(
  {
    name: { type: String, required: true },
    startDate: { type: Date },
    endDate: { type: Date },
    description: { type: String },
    public: { type: Boolean },
    password: { type: String },
    users: [
      {
        id: { type: Schema.Types.ObjectId, ref: 'User' },
        role: { type: Schema.Types.ObjectId, ref: 'Role' },
      },
    ],
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    tags: [{type: Schema.Types.ObjectId, ref: 'Tag'}]
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Course', CourseSchema);
