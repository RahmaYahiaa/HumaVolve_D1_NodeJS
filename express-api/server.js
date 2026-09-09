import express from 'express';
import studentsRouter from './routes/students.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/students', studentsRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
} );

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
}
);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
