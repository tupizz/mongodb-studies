require('./database');
const CourseWithValidation = require('./models/CourseWithValidation');

function isValidSchema(model) {
  return new Promise(resolve => {
    model.validate(err => {
      if (err) {
        resolve(false);
      }
      resolve(true);
    });
  });
}

async function testValidations() {
  let course = new CourseWithValidation({
    // name: 'Tadeu',
    author: 'Tadeu',
    tags: ['test', 'unit', 'tdd'],
    isPublished: true,
    price: 19.99,
  });
  let result = await isValidSchema(course);
  console.log('isValid', result);

  course = new CourseWithValidation({
    name: 'Unit Testing with Mocha',
    author: 'Tadeu Tupinambá',
    category: 'mobile',
    tags: ['test', 'unit', 'tdd'],
    isPublished: true,
    price: 99.828,
  });

  await course.save();
  result = await isValidSchema(course);
  console.log('isValid', result);
}

async function trySaveWithErrors() {
  const course = new CourseWithValidation({
    name: 'Tadeu',
    author: 'Tadeu',
    category: 'mobile',
    tags: [],
    isPublished: true,
    price: 1.99,
  });
  try {
    await course.save();
  } catch (ex) {
    const errorsArray = Object.keys(ex.errors).map(
      field => ex.errors[field].message,
    );

    const errorObj = {
      errors: [...errorsArray],
    };

    console.log(errorObj);
  }
}

(async function run() {
  await testValidations();
  await trySaveWithErrors();
  process.exit(0);
})();
