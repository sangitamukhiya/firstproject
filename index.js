import express from "express";

import connectDB from "./connect .db.js";
import Course from "./course.model.js";
import mongoose from "mongoose";

const app = express();

//to make app understand json

app.use(express.json());

//========================database connection================================
connectDB();

//=====================routes===============================================
app.post("/course/add", async (req, res) => {
  const newCourse = req.body;

  await Course.create(newCourse);
  return res.status(201).send({ message: "course is added successfully..." });
});

//?get course list

app.get("/course/list", async (req, res) => {
  const coursseList = await Course.find();
  return res.status(200).send({ message: "success", course: coursseList });
});

//************************************course detail by id*************************** */
//?course detail by id

//

app.get("/course/details/:id", async (req, res) => {
  // extract course id from req.params

  const courseId = req.params.id;

  //validate for mongo id

  const isValidMongoId = mongoose.isValidObjectId(courseId);

  //?if not valide id

  if (!isValidMongoId) {
    return res.status(404).send({ message: "Invalid mongo id." });
  }

  //find course by id

  const requiredCourse = await Course.findOne({ _id: courseId });

  // if not course,throw error

  if (!requiredCourse) {
    return res.status(404).send({ message: "Course dose not exist." });
  }

  // send res

  return res
    .status(200)
    .send({ message: "success", courseDetails: requiredCourse });
});
//**********************************delete opratioin*********************************** */
//? delete course by id

app.delete("/course/delete/:id", async (req, res) => {
  // extract course id from req.params

  const courseId = req.params.id;
  // check for mongo id validity

  const isValidMongoId = mongoose.isValidObjectId(courseId);

  // if not valid mongo id, throw error
  if (!isValidMongoId) {
    return res.status(404).send({ message: "Invalid mongo id." });
  }
  // find course by id
  const requiredCourse = await Course.findOne({ _id: courseId });
  // if not course, throw error
  if (!requiredCourse) {
    return res.status(404).send({ message: "Course does not exist." });
  }
  // delete course
  await Course.deleteOne({ _id: courseId });

  // send response
  return res.status(200).send({ message: "course is deleted successfully." });
});

//*************************port and server******************************** */

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
