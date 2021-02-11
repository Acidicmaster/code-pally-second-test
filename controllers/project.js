const asyncHandler = require("../middleware/async");
const createError = require("../utility/createError");
const Project = require("../model/project");




const getProjects = asyncHandler(async (req, res, next) => {
  Project.find()
    .then(project => {
        res.send({status : 'success', count: project.length, data : project }).sort(['updatedAt', 1])
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred ."
        });
    });
});

const getProject = asyncHandler(async (req, res, next) => {
  const project = await Project.findById(req.params.projectId)

  if (!project)
    throw createError(
      404,
      `Project is not found`
    );

  res.status(200).send({ status: "success", data: project });
});

// create new Project
const createProject = asyncHandler(async (req, res, next) => {
  
    const project = await Project.create({
      ...req.body,
    });
    res.status(200).send({ status: "success", data: project });
  });

const updateProject = asyncHandler(async (req, res, next) => {
    // Validate Request
if(!req.body) {
    return res.status(400).send({
        message: "Data content can not be empty"
    });
}

// Find Project and Update
Project.findByIdAndUpdate(req.params.projectId, {
    ...req.body
   
}, {new: true})
.then(project => {
    if(!project) {
        return res.status(404).send({
            message: "Project not found  "
        });
    }
    const data = [
      project
    ]
    res.status(200).send({ data });
}).catch(err => {
    if(err.kind === 'ObjectId') {
        return res.status(404).send({
            message: "Project not found with id "
        });                
    }
    return res.status(500).send({
        message: "Error updating Project "
    });
});
});


// delete Project
const deleteProject = asyncHandler(async (req, res, next) => {
  const deleteProject = await Project.findById(req.params.projectId);

  if (!deleteProject)
    throw createError(
      404,
      `Not Found`
    );

  await deleteProject.remove();

  res
    .status(204)
    .send({ status: "success", message: "Deleted Successfully" });
});
module.exports = {
   getProjects,
   getProject,
   createProject,
   updateProject,
   deleteProject
};
