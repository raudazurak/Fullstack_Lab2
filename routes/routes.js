const router = require("express").Router()
const Employee = require("../models/employee.js")
const Project = require("../models/project.js")
const Assignment = require("../models/projectAssignment.js")


router.get('/employees', async(req,res)=>
{
    try{
        const employees = await Employee.find()
        res.status(200).json(employees)
    }
    catch (err)
    {
        res.json({"error": console.log(err)})
    }
})


router.get('/projects', async(req,res)=>
{
    try{
        const projects = await Project.find()
        res.status(200).json(projects)
    }
    catch (err)
    {
        res.json({"error": console.log(err)})
    }
})

router.get('/project_assignments', async(req,res)=>
{
    try{
        const assignments = await Assignment.find()
        res.status(200).json(assignments)
    }
    catch (err)
    {
        res.json({"error": console.log(err)})
    }
})


router.post('/employees', async(req,res)=>{
 const employees = await Employee.find()
 if(employees.length == 0){
    largest = "0"
 }else{
    for(let Employee of employees){
        var largest = Employee.id
        if(Employee.id > largest){
            largest = Employee.id}
        }
        if (largest == "Nan"){
            largest = "0"
        }
    }
    const employee_id = parseInt(largest) + 1
    const existing_employee = await Employee.findOne({id: employee_id})
    if (existing_employee){
        return res.status(409).json({error: "employee already exists."})
    }
    const newEmployee = new Employee({
        employee_id: employee_id,
        full_name: req.body.full_name,
        email: req.body.email,
        hashed_password: req.body.hashed_password

    })

    try{
        await newEmployee.save()
        const employees = await Employee.find()
        res.status(200).json(employees)
        console.log('employee saved!')
    }catch(error){
        console.log(error)
        res.status(400).json(error)
    }

})


  router.post('/projects',async (req,res)=>{

    const newProject = new Project({
        project_code:  req.body.project_code,
        project_name:  req.body.project_name,
        project_description:  req.body.project_description

    })

    try{
        await newProject.save()
        const projects = await Project.find()
        res.status(200).json(projects)
        console.log('project saved!')
    }catch(error){
        console.log(error)
        res.status(400).json(error)
    }

    
  })

  
  router.post('/projects_assignments',async (req,res)=>{

    const newAssignment = new Assignment({
        employee_id: req.body.employee_id,
        project_code:  req.body.project_code,
        project_name:  req.body.project_name,
        start_date: new Date().toLocaleDateString()

    })

    try{
        await newAssignment.save()
        const assignments = await Assignment.find()
        res.status(200).json(assignments)
        console.log('assignment saved!')
    }catch(error){
        console.log(error)
        res.status(400).json(error)
    }

    
  })

 /* router.get('/info', async(req,res)=>
{
    try{
        const employees = await Employee.find()
        const projects = await Project.find()
        const assignments = await Assignment.find()

        res.status(200).json()
    }
    catch (err)
    {
        res.json({"error": console.log(err)})
    }
})*/

router.get('/info', async (req, res) => {
    try {
        const employees = await Employee.find();
        const projects = await Project.find();
        const assignments = await Assignment.find();
        const infoArray = [];

        employees.forEach((employee, index) => {
            const employeeInfo = {
                employee_id: employee.employee_id,
                employee_name: employee.full_name,
                project_name: projects[index].project_name,
                start_date: assignments[index].start_date
            };
            infoArray.push(employeeInfo);
        });

        res.status(200).json(infoArray);
        console.log('All sent!')

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


  module.exports = router
