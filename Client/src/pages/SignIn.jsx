import { useForm } from '@mantine/form';
import { TextInput, PasswordInput, Button, Group, Text, Anchor } from "@mantine/core";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function SignIn() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      password: '',
    },
  });

  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    setLoading(true);
    setErrorMessage(null);

    try {
      localStorage.removeItem('user');  // clearing any old data before login attempt

      const response = await fetch('/api/user/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: values.email, password: values.password }),
      });

      const data = await response.json();
      console.log("Backend Response Before Storing:", data);

      if (response.ok && data.email) {
        localStorage.setItem('user', JSON.stringify(data));
        console.log("Updated localStorage with:", JSON.parse(localStorage.getItem('user')));
        navigate('/Home'); // Redirect after login
      } else {
        setErrorMessage(data.message || 'Failed to sign in');
      }
    } catch (error) {
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
        <Text size="sm" align="center" mt="md">
          <Anchor component={Link} to="/SignUp">Don't have an account? Sign Up</Anchor>
        </Text>
      </div>
    </div>
  );
}

export default SignIn;
