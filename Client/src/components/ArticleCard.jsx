import { IconBookmark, IconPencil } from "@tabler/icons-react";
import {
  ActionIcon,
  Avatar,
  Badge,
  Card,
  Center,
  Group,
  Image,
  Text,
  useMantineTheme,
} from "@mantine/core";

export function ArticleCard({
  title,
  description,
  category,
  image,
  onBookmark,
  onReview,
  onClickRating = () => {}, // default fallback
}) {
  const theme = useMantineTheme();

  // MANTINE CARD COMPONENT HAVENT IMPLEMENTED SAVED
  return (
    <Card
  withBorder
  radius="lg"
  shadow="sm"
  style={{
    maxWidth: 300,
    backgroundColor: theme.colorScheme === "dark" ? "#1a1a1a" : "#ffffff",
    color: theme.colorScheme === "dark" ? "#f0f0f0" : "#000000",
    fontFamily: "'Montserrat', sans-serif",
    padding: "1.25rem",
    border: "1px solid #ccc",
  }}
>
<Badge
  variant="filled"
  color="gray"
  style={{
    fontSize: "0.7rem",
    fontWeight: 600,
    borderRadius: "999px",
    textTransform: "uppercase",
    backgroundColor: theme.colorScheme === "dark" ? "#3a3a3a" : "#e0e0e0",
    color: theme.colorScheme === "dark" ? "#ffffff" : "#000000",
  }}
>
        {category || "Uncategorized"}
      </Badge>

      <Text fw={500} size="lg" mt="xs">
        {title}
      </Text>

      <Group justify="space-between" mt="md">
  <Text
    size="sm"
    style={{
      textDecoration: "underline",
      cursor: "pointer",
    }}
    onClick={onClickRating ?? (() => {})}
  >
    Reviews
  </Text>
        <Group gap={8}>
        <ActionIcon
  onClick={onBookmark}
  variant="light"
  style={{
    cursor: "pointer",
    backgroundColor: theme.colorScheme === "dark" ? "#2c2c2c" : "#f0f0f0",
    color: theme.colorScheme === "dark" ? "#ffffff" : "#000000",
    border: "1px solid transparent",
    transition: "background-color 0.2s",
  }}
>
  <IconBookmark size={16} color={theme.colors.yellow[7]} />
</ActionIcon>

<ActionIcon
  onClick={onReview}
  variant="light"
  style={{
    cursor: "pointer",
    backgroundColor: theme.colorScheme === "dark" ? "#2c2c2c" : "#f0f0f0",
    color: theme.colorScheme === "dark" ? "#ffffff" : "#000000",
    border: "1px solid transparent",
    transition: "background-color 0.2s",
  }}
>
  <IconPencil size={16} color={theme.colors.blue[6]} />
</ActionIcon>
        </Group>
      </Group>
    </Card>
  );
}
