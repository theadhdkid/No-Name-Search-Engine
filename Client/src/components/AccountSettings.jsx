import { Modal, TextInput, PasswordInput, Button, Group, Text } from "@mantine/core";
import { useState } from "react";

export default function AccountSettings({ opened, onClose, userData }) {
const [editFirstName, setEditFirstName] = useState(false);
const [editLastName, setEditLastName] = useState(false);
const [editEmail, setEditEmail] = useState(false);
  const [firstName, setFirstName] = useState(userData?.firstName || "");
  const [lastName, setLastName] = useState(userData?.lastName || "");
  const [email, setEmail] = useState(userData?.email || "");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSave = async () => {
    const payload = {};
  
    if (editFirstName) payload.firstName = firstName;
    if (editLastName) payload.lastName = lastName;
    if (editEmail) payload.email = email;
    if (oldPassword && newPassword) {
      payload.oldPassword = oldPassword;
      payload.newPassword = newPassword;
    }
  
    if (Object.keys(payload).length === 0) {
      alert("No changes to save.");
      return;
    }
  
    try {
      const res = await fetch("/api/user/update-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
  
      if (res.ok) {
        alert("Profile updated!");
        onClose();
        // Optional: Reload user data from backend if needed
      } else {
        const error = await res.json();
        alert("Failed to update: " + (error.message || "Unknown error."));
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while saving changes.");
    }
  };
  

  const handleDelete = async () => {
    const confirm = window.confirm("Are you sure you want to delete your account?");
    if (!confirm) return;

    const res = await fetch("/api/user/delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (res.ok) {
      alert("Account deleted.");
      localStorage.clear();
      window.location.href = "/";
    } else {
      alert("Failed to delete account.");
    }
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Account Settings" centered size="lg">
      <Group position="apart" align="center" mt="md">
  <div style={{ flex: 1 }}>
    <Text weight={500}>First Name</Text>
    {editFirstName ? (
      <TextInput
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="Enter new first name"
        mt={5}
      />
    ) : (
      <Text mt={5}>{firstName || <em>(Not set)</em>}</Text>
    )}
  </div>
  <Button
    size="xs"
    variant="outline"
    onClick={() => setEditFirstName(!editFirstName)}
  >
    {editFirstName ? "Cancel" : "Change"}
  </Button>
</Group>
<Group position="apart" align="center" mt="md">
  <div style={{ flex: 1 }}>
    <Text weight={500}>Last Name</Text>
    {editLastName ? (
      <TextInput
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        placeholder="Enter new last name"
        mt={5}
      />
    ) : (
      <Text mt={5}>{lastName || <em>(Not set)</em>}</Text>
    )}
  </div>
  <Button
    size="xs"
    variant="outline"
    onClick={() => setEditLastName(!editLastName)}
  >
    {editLastName ? "Cancel" : "Change"}
  </Button>
</Group>
<Group position="apart" align="center" mt="md">
  <div style={{ flex: 1 }}>
    <Text weight={500}>Email</Text>
    {editEmail ? (
      <TextInput
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter new email"
        mt={5}
      />
    ) : (
      <Text mt={5}>{email || <em>(Not set)</em>}</Text>
    )}
  </div>
  <Button
    size="xs"
    variant="outline"
    onClick={() => setEditEmail(!editEmail)}
  >
    {editEmail ? "Cancel" : "Change"}
  </Button>
</Group>
<PasswordInput label="Current Password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} mt="sm" />
<PasswordInput label="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} mt="sm" />
<Group position="apart" mt="xl">
    <Button color="red" onClick={handleDelete}>Delete Account</Button>
    <Button onClick={handleSave}>Save Changes</Button>
  </Group>
    </Modal>
  );
}
