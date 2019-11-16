require('./database');
const Course = require('./models/Course');
/**
 * Get all published courses that has tag backend
 * and sort them by their name in descending order
 * getting only some info
 */
async function queryOne() {
  const courses = await Course.find({
    isPublished: true,
    tags: 'backend',
  })
    .sort('-name')
    .select('name author isPublished price');
  console.log(courses);
}

/**
 * Get all the published frontend and backend courses
 * sort them by their price in descending order
 */
async function queryTwo() {
  const courses = await Course.find({
    isPublished: true,
    tags: { $in: ['frontend', 'backend'] },
  })
    // .or([{ tags: 'frontend' }, { tags: 'backend' }])
    .sort('-price');
  console.log(courses);
}

/**
 * Get all published courses that are $15 or more or have
 * the word 'by' in their title
 */
async function queryThree() {
  const courses = await Course.find({ isPublished: true }).or([
    { price: { $gte: 15 } },
    { name: /.*by.*/i },
  ]);
  console.log(courses);
}

(async function run() {
  await queryOne();
  await queryTwo();
  await queryThree();
  process.exit(0);
})();
