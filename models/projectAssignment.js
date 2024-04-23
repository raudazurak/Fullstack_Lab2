const mongoose  = require("mongoose")


const projectAssignmentSchema = new mongoose.Schema({
    employee_id: {
        type: String,
        required: true,
        },
    project_code: {
            type: String,
            required: true,
        },
    start_date: {
        type: Date,
        required: true,
    },
})
  
module.exports=mongoose.model("projectAssignment",projectAssignmentSchema)