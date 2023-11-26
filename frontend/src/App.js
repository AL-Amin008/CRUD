import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import axios from 'axios';

const StudentList = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/students')
            .then(response => setStudents(response.data))
            .catch(error => console.error('Error fetching data: ', error));
    }, []);

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:5000/api/students/${id}`);
        setStudents(students.filter(student => student._id !== id));
    };

    return (
        <div>
            <h2>Student List</h2>
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Gender</th>
                        <th>Date of Birth</th>
                        <th>Nationality</th>
                        <th>Address</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Admission Date</th>
                        <th>Courses</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map(student => (
                        <tr key={student._id}>
                            <td>{student.firstName}</td>
                            <td>{student.lastName}</td>
                            <td>{student.gender}</td>
                            <td>{student.dateOfBirth}</td>
                            <td>{student.nationality}</td>
                            <td>{student.address}</td>
                            <td>{student.email}</td>
                            <td>{student.phone}</td>
                            <td>{student.admissionDate}</td>
                            <td>{student.courses}</td>
                            <td>
                                <button onClick={() => handleDelete(student._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });

    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://your-api-endpoint/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('User registered successfully:', data);
                setRegistrationSuccess(true);
            } else {
                const errorData = await response.json();
                console.error('Registration failed:', errorData);
                setError(errorData.message || 'Registration failed. Please try again.');
            }
        } catch (error) {
            console.error('Error during registration:', error);
            setError('An error occurred. Please try again later.');
        }
    };

    // Redirect logic
    if (registrationSuccess) {
        return <Redirect to="/thank-you" />;
    }

    return (
        <div>
            <h2>Registration Form</h2>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <form onSubmit={handleSubmit}>
                <label htmlFor="firstName">First Name:</label>
                <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="lastName">Last Name:</label>
                <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                <button type="submit">Register</button>
            </form>
        </div>
    );
};

const App = () => {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li><Link to="/">Student List</Link></li>
                        <li><Link to="/registration">Registration Form</Link></li>
                    </ul>
                </nav>

                <hr />

                <Route exact path="/" component={StudentList} />
                <Route path="/registration" component={RegistrationForm} />
            </div>
        </Router>
    );
};

export default App;
