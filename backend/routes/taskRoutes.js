const express = require("express");
const router = express.Router();
const { getTasks, getTask, postTask, putTask, deleteTask, updateStatus, moveToPriorityList} = require("../controllers/taskControllers");
const { verifyAccessToken } = require("../middleware/authMiddleware");

router.get("/", verifyAccessToken, getTasks);            
router.get("/:taskId", verifyAccessToken, getTask);      
router.post("/", verifyAccessToken, postTask);           
router.put("/:taskId", verifyAccessToken, putTask);     
router.put("/:taskId/status", verifyAccessToken, updateStatus);  
router.delete("/:taskId", verifyAccessToken, deleteTask); 
router.put("/:taskId/priority", verifyAccessToken, moveToPriorityList);

module.exports = router;
