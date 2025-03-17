import { useForm } from '@mantine/form';
import { TextInput, PasswordInput, Button, Group, Text, Anchor } from "@mantine/core";
import { useState } from 'react';
import { Link } from 'react-router-dom';


function Home() {
  const form = useForm({
    mode: 'uncontrolled', // meaning input values are handled by the DOM, not React state
    initialValues: {
      email: '',
      password: '',
    },
  });

  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  // form submission
  const handleSubmit = async (values) => {
    setLoading(true); // telling UI that a request has been made
    setErrorMessage(null);

    try {
      // communicating a POST request to backend
      const response = await fetch('http://localhost:5001/api/user/signin', {
        method: 'POST', // because we are POSTing user info to database with back end
        headers: {
          'Content-Type': 'application/json', // telling the server that the request body contains JSON data.
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });



      const data = await response.json();

      if (response.ok) {
        // handle working sign-in
        console.log('User signed in:', data);
      } else {
        // handling error from backend 3 reasons
        setErrorMessage(data.message || 'Failed to sign in');
      }
    } catch (error) {
      setErrorMessage('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
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

      {errorMessage && <Text color="red" mt="md">{errorMessage}</Text>}

      <Group position="center" mt="xl">
        <Button
          onClick={form.onSubmit(handleSubmit)}
          loading={loading}
        >
          Sign In
        </Button>
      </Group>
      <Text size="sm">
        <Anchor component={Link} to="/SignUp">Dont have an account? Sign Up</Anchor>
      </Text>
    </div>
  );
}

export default Home;
