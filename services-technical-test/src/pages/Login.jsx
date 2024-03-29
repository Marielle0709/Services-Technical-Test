import { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const SignupLogin = () => {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLogin, setIsLogin] = useState(true); 
  const history = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      const response = await axios.post('http://localhost:3000/utilisateurs', {
        nom,
        prenom,
        email,
        motDePasse: password
      });
      console.log('New user created:', response.data);
      setError('');
    } catch (error) {
      console.error('Error:', error.response.data.error);
      setError(error.response.data.error);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/login', {
        email,
        motDePasse: password
      });
      console.log('Login successful:', response.data);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('email', email);

      history('/rooms');
    } catch (error) {
      console.error('Error:', error.response.data.error);
      setError(error.response.data.error);
    }
  };

  return (
    <Container>
      <h1>{isLogin ? 'Log In' : 'Sign Up'}</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      {isLogin ? (
        <Form onSubmit={handleLogin}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={handleLogin}>
            Log In
          </Button>
          <p>Dont have an account? <Link onClick={() => setIsLogin(false)}>Sign up</Link></p>
        </Form>
      ) : (
        <Form onSubmit={handleSignup}>
          <Form.Group controlId="formBasicNom">
            <Form.Label>Nom</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your last name"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPrenom">
            <Form.Label>Prénom</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your first name"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={handleSignup}>
            Sign Up
          </Button>
          <p>Already have an account? <Link onClick={() => setIsLogin(true)}>Log in</Link></p>
        </Form>
      )}
    </Container>
  );
};

export default SignupLogin;
