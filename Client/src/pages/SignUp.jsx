import { useForm } from '@mantine/form';
import { TextInput, PasswordInput, Button, Group, Text, Anchor } from "@mantine/core";
import { useState } from 'react';
import { Link } from "react-router-dom";

function SignUp() {
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
      const response = await fetch('http://localhost:5001/api/user/signup', {
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

  return(
    <div>


      <TextInput
        label="firstName"
        placeholder="First Name"
        mt="md"
        key={form.key('firstName')}
        {...form.getInputProps('firstName')}
      />

      <TextInput
        label="lastName"
        placeholder="Last Name"
        mt="md"
        key={form.key('lastName')}
        {...form.getInputProps('lastName')}
      />

      <TextInput
        label="email"
        placeholder="Email"
        mt="md"
        key={form.key('email')}
        {...form.getInputProps('email')}
      />

      <PasswordInput
        label="password"
        placeholder="Password"
        mt="md"
        key={form.key('password')}
        {...form.getInputProps('password')}
      />

      <PasswordInput
        label="confirmPassword"
        placeholder="Confirm Password"
        mt="md"
        key={form.key('confirmPassword')}
        {...form.getInputProps('confirmPassword')}
      />

      {errorMessage && <Text color="red" mt="md">{errorMessage}</Text>}

      <Group position="center" mt="xl">
        <Button
          onClick={form.onSubmit(handleSubmit)}
          loading={loading}
        >
          Sign Up
        </Button>
      </Group>
      <Text size="sm">
        <Anchor component={Link} to="/">Already have an account? Sign In</Anchor>
      </Text>
    </div>
    );
  }


export default SignUp;