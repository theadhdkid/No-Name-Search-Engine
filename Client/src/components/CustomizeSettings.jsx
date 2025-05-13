import { useState, useEffect } from "react";
import { Modal, Button, Select, Title, Text, Box } from "@mantine/core";

const PRESET_COLORS = [
  "#f4f4f4",
  "#1a1a1a",
  "#ff6f61",
  "#6a5acd",
  "#20c997",
  "#ffcc00",
  "#00bcd4",
  "#f06292",
  "#4caf50",
  "#ff7043",
];

function CustomizeSettings({ opened, onClose, onThemeChange }) {
  const [selectedTheme, setSelectedTheme] = useState("light");
  const [customColor, setCustomColor] = useState("");

  useEffect(() => {
    // Reset color selection when mode changes
    if (selectedTheme !== "custom") {
      setCustomColor("");
    }
  }, [selectedTheme]);

  const handleApply = () => {
    if (selectedTheme === "custom" && customColor) {
      onThemeChange(customColor);
    } else {
      onThemeChange(selectedTheme);
    }
    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Customize Your Theme"
      centered
    >
      <Title order={4} style={{ marginBottom: "12px" }}>
        Choose a Theme
      </Title>

      <Select
        placeholder="Select Theme"
        data={[
          { value: "light", label: "Light Mode" },
          { value: "dark", label: "Dark Mode" },
          { value: "custom", label: "Custom Color" },
        ]}
        value={selectedTheme}
        onChange={setSelectedTheme}
        mb="md"
      />

      {selectedTheme === "custom" && (
        <>
          <Text size="sm" mb="xs">
            Pick a Color:
          </Text>
          <Box
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              marginBottom: "1rem",
            }}
          >
            {PRESET_COLORS.map((color) => (
              <div
                key={color}
                onClick={() => setCustomColor(color)}
                style={{
                  backgroundColor: color,
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  cursor: "pointer",
                  border:
                    customColor === color
                      ? "2px solid black"
                      : "1px solid #ccc",
                }}
              />
            ))}
          </Box>
        </>
      )}

      <Button fullWidth onClick={handleApply}>
        Apply Theme
      </Button>
    </Modal>
  );
}

export default CustomizeSettings;
