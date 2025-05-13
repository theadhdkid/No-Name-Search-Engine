import { IconBookmark, IconHeart, IconShare } from "@tabler/icons-react";
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
  onClickRating = () => {}, // ✅ default fallback
}) {
  const theme = useMantineTheme();

  // MANTINE CARD COMPONENT HAVENT IMPLEMENTED SAVED
  return (
    <Card withBorder radius="md" style={{ maxWidth: 300 }}>
      <Badge variant="gradient" gradient={{ from: "blue", to: "cyan" }}>
        {category || "Uncategorized"}
      </Badge>

      <Text fw={500} size="lg" mt="xs">
        {title}
      </Text>

      <Text size="sm" color="dimmed" lineClamp={3}>
        {description || "No description available."}
      </Text>

      <Group justify="space-between" mt="md">
        <Center>
          <Avatar
            src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png"
            size={24}
            radius="xl"
            mr="xs"
          />
          <Text size="sm">Verified</Text>
          <Text
            size="sm"
            style={{
              marginLeft: "8px",
              textDecoration: "underline",
              cursor: "pointer",
            }}
            onClick={onClickRating ?? (() => {})}
          >
            Reviews
          </Text>
        </Center>

        <Group gap={8}>
          <ActionIcon>
            <IconHeart size={16} color={theme.colors.red[6]} />
          </ActionIcon>
          <ActionIcon onClick={onBookmark} style={{ cursor: "pointer" }}>
            <IconBookmark size={16} color={theme.colors.yellow[7]} />
          </ActionIcon>
          <ActionIcon onClick={onReview} style={{ cursor: "pointer" }}>
            <IconShare size={16} color={theme.colors.red[6]} />
          </ActionIcon>
        </Group>
      </Group>
    </Card>
  );
}
