import Professor from "../models/professor_model.js";
export const reviewProfessor = async (req, res) => {
    try {
      const { professorName, comment, rating } = req.body;
  
      // Validate request data
      if (!professorName || !comment || !rating) {
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      // Find the professor by name
      const professor = await Professor.findOne({ name: professorName });
  
      if (!professor) {
        return res.status(404).json({ message: 'Professor not found' });
      }
  
      // Create a new review
      const newReview = {
        comment,
        rating,
        date: new Date()
      };
  
      // Add the new review to the professor's reviews array
      professor.reviews.push(newReview);
  
      // Save the updated professor to the database
      await professor.save();
  
      // Respond with success message
      res.status(201).json({ message: 'Review added successfully', professor });
    } catch (error) {
      res.status(500).json({ message: 'Error adding review', error });
    }
  };

  export const showRatings = async (req, res) => {
    try {
      const { name, subject } = req.body;
  
      if (!name || !subject) {
        return res.status(400).json({ message: "Both the fields are required" });
      }
  
      const professor = await Professor.findOne({ name, subject });
  
      if (!professor) {
        return res.status(404).json({ message: "No such professor exists" });
      }
  
      return res.status(200).json({ name: professor.name, subject: professor.subject, reviews: professor.reviews });
    } catch (error) {
      return res.status(500).json({ message: "Something went wrong with the server", error });
    }
  };