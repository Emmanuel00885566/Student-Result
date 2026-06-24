import db from "./models/index.js";

console.log("Loaded models:", Object.keys(db));
console.log("School associations:", Object.keys(db.School.associations));
console.log("User associations:", Object.keys(db.User.associations));
console.log("Teacher associations:", Object.keys(db.Teacher.associations));
console.log("Student associations:", Object.keys(db.Student.associations));
console.log("Session associations:", Object.keys(db.Session.associations));
console.log("Term associations:", Object.keys(db.Term.associations));
console.log("Class associations:", Object.keys(db.Class.associations));
console.log("Subject associations:", Object.keys(db.Subject.associations));
console.log("ClassSubject associations:", Object.keys(db.ClassSubject.associations));
console.log("TeacherClassSubject associations:", Object.keys(db.TeacherClassSubject.associations));

process.exit(0);