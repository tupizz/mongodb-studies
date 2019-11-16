/* eslint-disable no-unused-vars */
require('./database');
const { Course, Author, Taggy } = require('./models/CourseReferenced');

async function createAuthor(name, bio, website) {
  const author = new Author({
    name,
    bio,
    website,
  });

  return author.save();
}

async function createCourse(name, authorId) {
  const course = new Course({
    name: name,
    date: new Date(),
    author: authorId,
  });

  return course.save();
}

async function listCourses() {
  // A segunda propriedade trás o nome do autor e exclui o id que vem como padrão
  const courses = await Course.find().populate('author', 'name -_id');
  console.log(courses);
}

async function createAnAuthorAndCourse() {
  const author = await createAuthor(
    'Tadeu',
    'Um espetácular ser humano e cientista, engenheiro e artista.',
    'http://www.tadeu.com.br',
  );
  console.log(author);

  const course = await createCourse('Nodejs e a câmera secreta', author.id);
  console.log(course);

  await listCourses();
}

async function createAListOfTaggysAndRefereeByAuthor() {
  const author = await Author.findById('5dd06b6bc7a17c53ba581cb2');
  author.name = 'Nathaly';
  author.taggys = [
    new Taggy({ serialNumber: 'QAZ223NASN', description: '' }),
    new Taggy({ serialNumber: 'WSX823NASN', description: '' }),
    new Taggy({ serialNumber: 'ERF15FDDF', description: 'Uau' }),
  ];

  const savedAuthor = await author.save();
  console.log(savedAuthor);
}

async function queringSubdocumentTaggys() {
  const authorTaggy = await Author.find({
    'taggys.serialNumber': { $in: ['QAZ223NASN', 'ABC223NASN'] },
  });
  console.log(JSON.stringify(authorTaggy, null, 2));
}

(async function run() {
  // await createAnAuthorAndCourse();
  // xawait createAListOfTaggysAndRefereeByAuthor();
  await queringSubdocumentTaggys();
  process.exit(0);
})();
