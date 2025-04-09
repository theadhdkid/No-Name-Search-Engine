import { useForm } from '@mantine/form';
import { TextInput, PasswordInput, Button, Group, Text, Anchor, Paper } from "@mantine/core";
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
      localStorage.removeItem('user');

      const response = await fetch(' http://localhost:5001/api/user/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: values.email, password: values.password }),
      });

      const data = await response.json();
      console.log("Backend Response Before Storing:", data);

      if (response.ok && data.email) {
        localStorage.setItem('user', JSON.stringify(data));
        navigate('/home');
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
      height: '100vh',
      width: '100vw',
      backgroundColor: 'white',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
      position: 'relative'
    }}>
      {/* Top-left logo */}
      <img
        src="/logo.png" // make sure your logo file is saved in /Client/public/logo.png
        alt="No Name Search Engine"
        style={{
          position: 'absolute',
          top: '20px',
          left: '30px',
          width: '130px',
          height: 'auto'
        }}
      />

      <Paper
        shadow="md"
        radius="md"
        p="xl"
        style={{
          width: '100%',
          maxWidth: '400px',
          backgroundColor: 'white',
          border: '1px solid #ddd'
        }}
      >
        <Text align="center" size="lg" weight={600} mb="xs">
          WELCOME BACK!
        </Text>

        <Text align="center" size="sm" color="dimmed" mb="lg">
          Sign up or login to use a vast range of AI tools
        </Text>

        <TextInput
          label="Email"
          placeholder="you@example.com"
          key={form.key('email')}
          {...form.getInputProps('email')}
          radius="md"
          mb="sm"
        />
        <PasswordInput
          label="Password"
          placeholder="••••••••"
          key={form.key('password')}
          {...form.getInputProps('password')}
          radius="md"
          mb="md"
        />

        {errorMessage && <Text color="red" mt="md" align="center">{errorMessage}</Text>}

        <Group position="center" mt="xl">
          <Button
            onClick={form.onSubmit(handleSubmit)}
            loading={loading}
            radius="md"
            fullWidth
            style={{ backgroundColor: '#0F2E81' }}
          >
            Sign In
          </Button>
        </Group>

        <Text align="center" size="sm" mt="md">
          Don’t have an account?{' '}
          <Anchor component={Link} to="/signup" style={{ color: '#0F2E81' }}>
            Create Account
          </Anchor>
        </Text>
      </Paper>
    </div>
  );
}

export default SignIn;
