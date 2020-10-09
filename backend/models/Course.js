const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CourseSchema = new Schema(
  {
    name: { type: String, required: true },
    shortName: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    description: { type: String },
    public: { type: Boolean },
    users: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Course", CourseSchema);
