let employee_id = "01"
let full_name = "Jon Carl"
let email = "jcarl@gmail.com"
let hashed_password = "gny0569504"
let start_date = new Date().toLocaleDateString()
let project_name ="hospital project"
let project_description ="hospital project description"
let project_code ="01HA"





let emp = {employee_id, full_name, email, hashed_password}
let project = {project_code, project_name, project_description}
let pa = {employee_id, project_code, start_date}


displayRecipes()


async function addEm(recipe){
    try{
        let results = await fetch('http://localhost:3000/employees',{
            method: 'POST',
            body: JSON.stringify(recipe),
            headers: {'content-type': 'application/json'}
            
        })
        let receive = results
        console.log(receive)
        return receive
         
    }catch (error){
        console.log(error)
    }
}

async function addProj(recipe){
    try{
        let results = await fetch('http://localhost:3000/projects',{
            method: 'POST',
            body: JSON.stringify(recipe),
            headers: {'content-type': 'application/json'}
            
        })
        let receive = results
        console.log(receive)
        return receive
         
    }catch (error){
        console.log(error)
    }
}

async function addAssignment(recipe){
    try{
        let results = await fetch('http://localhost:3000/projects_assignments',{
            method: 'POST',
            body: JSON.stringify(recipe),
            headers: {'content-type': 'application/json'}
            
        })
        let receive = results
        console.log(receive)
        return receive
         
    }catch (error){
        console.log(error)
    }
}

async function displayRecipes(){
    await addEm(emp)
    await addProj(project)
    await addAssignment(pa)
}