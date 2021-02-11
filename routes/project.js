const {
    getProjects,
    getProject,
    createProject,
    updateProject,
    deleteProject
  } = require("../controllers/project");
  
 
  const router = require("express").Router();

  router.post('/',createProject );
  
   // Retrieve all 
   router.get('/', getProjects);
  
   // Retrieve a project with Id
   
   router.get('/:projectId', getProject);

   // update project
   router.put('/:projectId',updateProject);
  
   // Delete Project with Id
  router.delete('/:projectId', deleteProject);
  
  
  module.exports = router;
  
  