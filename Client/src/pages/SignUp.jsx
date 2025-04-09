import { useForm } from '@mantine/form';
import {
  TextInput,
  PasswordInput,
  Button,
  Group,
  Text,
  Anchor,
  Paper
} from "@mantine/core";
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();
  const form = useForm({
    mode: 'uncontrolled',
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
    setLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch(' http://localhost:5001/api/user/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const { data } = await response.json();

      if (response.ok) {
        console.log('User signed up:', data);
        localStorage.setItem('user', JSON.stringify(data));
        navigate('/home');
      } else {
        setErrorMessage(data.message || 'Failed to sign up.');
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
        src="/logo.png"
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
          CREATE ACCOUNT
        </Text>

        <Text align="center" size="sm" color="dimmed" mb="lg">
          Fill in your details to get started!
        </Text>

        <TextInput
          label="First Name"
          placeholder="First Name"
          key={form.key('firstName')}
          {...form.getInputProps('firstName')}
          radius="md"
          mb="sm"
        />

        <TextInput
          label="Last Name"
          placeholder="Last Name"
          key={form.key('lastName')}
          {...form.getInputProps('lastName')}
          radius="md"
          mb="sm"
        />

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
          mb="sm"
        />

        <PasswordInput
          label="Confirm Password"
          placeholder="••••••••"
          key={form.key('confirmPassword')}
          {...form.getInputProps('confirmPassword')}
          radius="md"
          mb="sm"
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
            Create Account
          </Button>
        </Group>

        <Text align="center" size="sm" mt="md">
          Already have an account?{' '}
          <Anchor component={Link} to="/" style={{ color: '#0F2E81' }}>
            Sign In
          </Anchor>
        </Text>
      </Paper>
    </div>
  );
}

export default SignUp;
