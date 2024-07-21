import db from "../Database/index.js";

export default function AssignmentRoutes(app) {
  // GET all assignments by course ID 
  app.get("/api/courses/:cid/assignments", (req, res) => {
    const { cid } = req.params;
    const assignments = db.assignments.filter((a) => a.course === cid);
    res.send(assignments);
  });

  // GET an assignment by assignment ID 
  app.get("/api/assignments/:aid", (req, res) => {
    const { aid } = req.params;
    const assignment = db.assignments.find((a) => a._id === aid);
    res.send(assignment);
  });

  // POST a new assignment by course ID 
  app.post("/api/courses/:cid/assignments", (req, res) => {
    console.log(req.body);
    const { cid } = req.params;
    const newAssignment = {
      ...req.body,
      course: cid,
      _id: new Date().getTime().toString(),
    }; 
    db.assignments.push(newAssignment);
    console.log(newAssignment);
    res.send(newAssignment);
  });
  
  // PUT an assignment update by ID 
  app.put("/api/assignments/:aid", (req, res) => {
    const { aid } = req.params;
    const assignmentIndex = db.assignments.findIndex((a) => a._id === aid);
    if (assignmentIndex !== -1) {
      db.assignments[assignmentIndex] = {
        ...db.assignments[assignmentIndex],
        ...req.body
      };
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  });

  // DELETE an assignment by assignment ID 
  app.delete("/api/assignments/:aid", (req, res) => {
    const { aid } = req.params;
    db.assignments = db.assignments.filter((a) => a._id !== aid);
    res.sendStatus(200);
  });
}



