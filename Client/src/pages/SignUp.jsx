import { useForm } from '@mantine/form';
import { TextInput, PasswordInput, Button, Group, Text, Anchor } from "@mantine/core";
import { useState } from 'react';
import { Link, useNavigate} from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();
  const form = useForm({
    mode: 'uncontrolled', // meaning input values are handled by the DOM, not React state
      initialValues: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
      }
  });

  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true); // telling UI that a request has been made
    setErrorMessage(null);

    try {
      // communicating a POST request to backend
      const response = await fetch('/api/user/signup', {
        method: 'POST', // because we are POSTing user info to database with back end
        headers: {
          'Content-Type': 'application/json', // telling the server that the request body contains JSON data.
        },
        body: JSON.stringify({
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
          confirmPassword: values.confirmPassword,
        }),
      });

      const { data } = await response.json();

      if (response.ok) {
        console.log('User signed up:', data);
        localStorage.setItem('user', JSON.stringify(data));

        navigate('/Home'); // redirecting to Home.jsx
      } else {
        setErrorMessage(data.message || 'Failed to sign up.');
      }
    } catch(error) {
        setErrorMessage('Something went wrong. Please try again.');
      } finally {
        setLoading(false);
      }
    };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        padding: '20px',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        backgroundColor: 'white'
      }}>
        <TextInput
          label="First Name"
          placeholder="First Name"
          mt="md"
          key={form.key('firstName')}
          {...form.getInputProps('firstName')}
        />

        <TextInput
          label="Last Name"
          placeholder="Last Name"
          mt="md"
          key={form.key('lastName')}
          {...form.getInputProps('lastName')}
        />

        <TextInput
          label="Email"
          placeholder="Email"
          mt="md"
          key={form.key('email')}
          {...form.getInputProps('email')}
        />

        <PasswordInput
          label="Password"
          placeholder="Password"
          mt="md"
          key={form.key('password')}
          {...form.getInputProps('password')}
        />

        <PasswordInput
          label="Confirm Password"
          placeholder="Confirm Password"
          mt="md"
          key={form.key('confirmPassword')}
          {...form.getInputProps('confirmPassword')}
        />

        {errorMessage && <Text color="red" mt="md">{errorMessage}</Text>}

        <Group position="center" mt="xl">
          <Button onClick={form.onSubmit(handleSubmit)} loading={loading}>
            Sign Up
          </Button>
        </Group>

        <Text size="sm" align="center" mt="md">
          <Anchor component={Link} to="/">Already have an account? Sign In</Anchor>
        </Text>
      </div>
    </div>
  );
}


export default SignUp;