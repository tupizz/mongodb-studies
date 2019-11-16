require('./database');
const Course = require('./models/Course');

async function updateCourse(id) {
  const course = await Course.findByIdAndUpdate(
    id,
    {
      $set: {
        name: 'Novo nome de agorinha',
        isPublished: false,
        date: new Date('2019-12-24 00:00:00'),
      },
    },
    { new: true },
  );
  console.log(course);
}

(async function run() {
  await updateCourse('5a68fe2142ae6a6482c4c9cb');
  process.exit(0);
})();
