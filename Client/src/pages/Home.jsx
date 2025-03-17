import { useForm } from '@mantine/form';
import { TextInput, PasswordInput, Button, Group, Text } from '@mantine/core';
import { randomId } from '@mantine/hooks';
import { useState } from 'react';

function Home() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      password: '',
    },
  });

  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  // form submission
  const handleSubmit = async (values) => {
    setLoading(true);
    setErrorMessage(null);

    try {
      // communicating a POST request to backend
      const response = await fetch('http://localhost:5001/api/user/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
    </div>
  );
}

export default Home;
