import {
  AppShell,
  Avatar,
  Group,
  Image,
  Menu,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";


function Layout() {
  const [userData, setUserData] = useState(null);
  const [accountOpen, setAccountOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [theme, setTheme] = useState("light");

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const userInitials = userData
    ? `${userData.firstName[0]}${userData.lastName[0]}`
    : "";

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <>
      <CustomizeSettings
        opened={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        onThemeChange={handleThemeChange}
        customColor="#646cff"
        setCustomColor={() => {}} // optional: lift state if needed
      />

      <AccountSettings
        opened={accountOpen}
        onClose={() => setAccountOpen(false)}
        userData={userData}
      />

      <AppShell header={{ height: 60 }} withBorder={false}>
        <AppShell.Header>
          <Group justify="space-between" h="100%" px="lg">
            <Image src="/assets/Logo.svg" h="36%" w="auto" />
            {userData && (
              <Menu shadow="md" width={200} withArrow position="bottom-end">
                <Menu.Target>
                  <Avatar radius="xl" color="gray" style={{ cursor: "pointer" }}>
                    {userInitials}
                  </Avatar>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item onClick={() => setSettingsOpen(true)}>
                    Customize Settings
                  </Menu.Item>
                  <Menu.Item onClick={() => setAccountOpen(true)}>
                    Account Settings
                  </Menu.Item>
                  <Menu.Item
                    color="red"
                    onClick={() => {
                      localStorage.removeItem("user");
                      navigate("/");
                    }}
                  >
                    Logout
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            )}
          </Group>
        </AppShell.Header>

        <AppShell.Main>
          <Outlet />
        </AppShell.Main>
      </AppShell>
    </>
  );
}

export default Layout;
