const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Roles = require('./enums/Roles');

const CourseSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    dateStart: { type: Date },
    dateEnd: { type: Date }, 
    public: { type: Boolean },
    password: { type: String },
    users: [
      {
        data: { type: Schema.Types.ObjectId, ref: 'User' },
        role: { type: String, enums: Roles },
      },
    ],
    // category: { type: Schema.Types.ObjectId, ref: 'Category' },
  },
  {
    timestamps: true,
  }
);

CourseSchema.virtual('url').get(function() {
  return `/api/courses/${this._id}`;
})

module.exports = mongoose.model('Course', CourseSchema);
