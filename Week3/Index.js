function EmployeeInfo(name,Salary)
{
console.log("Welcome " + name+ "Your monthly Salary is "+ Salary)
}
console.log ("This is my first progame")
var EmpName="Irfan"
var EmpSalary= 500000
// calling of the function EmployeeInfo
EmployeeInfo(EmpName,EmpSalary)

const EmpSkills= (skills)=> {
 console.log("Expert in "+ skills)
}
EmpSkills("java")

const student= require('./StudentInfo')
const person = require('./Person')

console.log("Student Name:" +student.getName())
console.log(student.Location())
console.log(student.dob)

console.log(student.Studentgrade())
console.log("grade is "+student.Studentgrade(55) )

person1= new person("Irfan","UK","irfanans2004@gmail.com")
console.log("using Person Module",person1.getPersonInfo())
console.log("Programe ended")

