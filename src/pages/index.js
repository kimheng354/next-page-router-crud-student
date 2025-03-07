// src/pages/index.js
import { useState } from 'react';
import InputField from '../components/InputField'; // Adjust path as needed

export default function Home() {
  const [studentInformation, setStudentInformation] = useState([]);
  const [newStudent, setNewStudent] = useState({
    id: '',
    name: '',
    age: '',
    gender: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editStudentId, setEditStudentId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent((prev) => ({ ...prev, [name]: value }));
  };

  // CREATE: Add a new student
  const addStudent = () => {
    if (newStudent.id && newStudent.name && newStudent.age && newStudent.gender) {
      if (isEditing) {
        // UPDATE: Edit existing student
        setStudentInformation((prev) =>
          prev.map((student) =>
            student.id === editStudentId ? { ...newStudent } : student
          )
        );
        setIsEditing(false);
        setEditStudentId(null);
      } else {
        // Check for duplicate ID
        if (studentInformation.some((student) => student.id === newStudent.id)) {
          alert('A student with this ID already exists!');
          return;
        }
        setStudentInformation((prev) => [...prev, newStudent]);
      }
      setNewStudent({ id: '', name: '', age: '', gender: '' }); // Reset form
    } else {
      alert('Please fill out all fields!');
    }
  };

  // UPDATE: Populate form with student data for editing
  const editStudent = (student) => {
    setIsEditing(true);
    setEditStudentId(student.id);
    setNewStudent({ ...student });
  };

  // DELETE: Remove a student
  const deleteStudent = (id) => {
    if (confirm('Are you sure you want to delete this student?')) {
      setStudentInformation((prev) => prev.filter((student) => student.id !== id));
      // Reset form if deleting the student being edited
      if (isEditing && editStudentId === id) {
        setIsEditing(false);
        setEditStudentId(null);
        setNewStudent({ id: '', name: '', age: '', gender: '' });
      }
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-8 gap-8">
      {/* Student Form */}
      <div className="w-96 p-6 rounded-lg shadow-md bg-white">
        <h4 className="text-xl font-bold text-gray-800 mb-4 text-center">
          {isEditing ? 'Edit Student' : 'Student Form'}
        </h4>
        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="ID"
            type="text"
            name="id"
            value={newStudent.id}
            onChange={handleInputChange}
            placeholder="Enter ID"
            disabled={isEditing} // Prevent changing ID during edit
          />
          <InputField
            label="Name"
            name="name"
            value={newStudent.name}
            onChange={handleInputChange}
            placeholder="Enter Name"
          />
          <InputField
            label="Age"
            type="number"
            name="age"
            value={newStudent.age}
            onChange={handleInputChange}
            placeholder="Enter Age"
          />
          <InputField
            label="Gender"
            name="gender"
            value={newStudent.gender}
            onChange={handleInputChange}
            placeholder="Enter Gender"
          />
        </div>
        <button
          onClick={addStudent}
          className="mt-6 w-full p-2 bg-red-400 text-white rounded-md hover:bg-red-500 transition-colors"
        >
          {isEditing ? 'Update Student' : 'Add Student'}
        </button>
      </div>

      {/* Student Table */}
      <div className="w-96 rounded-lg shadow-md overflow-hidden bg-white">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-red-400 text-white">
              <th className="p-2 border-b border-red-200">ID</th>
              <th className="p-2 border-b border-red-200">Name</th>
              <th className="p-2 border-b border-red-200">Age</th>
              <th className="p-2 border-b border-red-200">Gender</th>
              <th className="p-2 border-b border-red-200">Actions</th>
            </tr>
          </thead>
          <tbody>
            {studentInformation.map((student, index) => (
              <tr
                key={student.id}
                className={index % 2 === 0 ? 'bg-red-200' : 'bg-red-100'}
              >
                <td className="p-2 border-b border-red-200">{student.id}</td>
                <td className="p-2 border-b border-red-200">{student.name}</td>
                <td className="p-2 border-b border-red-200">{student.age}</td>
                <td className="p-2 border-b border-red-200">{student.gender}</td>
                <td className="p-2 border-b border-red-200 flex gap-2">
                  <button
                    onClick={() => editStudent(student)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteStudent(student.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}