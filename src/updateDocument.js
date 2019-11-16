require('./database');
const Course = require('./models/Course');

async function updateCourse(id) {
  const course = await Course.find({ _id: id });
  console.log(course);
}

(async function run() {
  await updateCourse('5a68fe2142ae6a6482c4c9cb');
  process.exit(0);
})();
