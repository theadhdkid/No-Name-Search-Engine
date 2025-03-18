import { IconBookmark, IconHeart, IconShare } from '@tabler/icons-react';
import { ActionIcon, Avatar, Badge, Card, Center, Group, Image, Text, useMantineTheme } from '@mantine/core';

export function ArticleCard({ title, description, category, image }) {
  const theme = useMantineTheme();

  return (
    <Card withBorder radius="md" style={{ maxWidth: 300 }}>

      <Badge variant="gradient" gradient={{ from: 'blue', to: 'cyan' }}>
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
          <Avatar src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png" size={24} radius="xl" mr="xs" />
          <Text size="sm">Verified</Text>
        </Center>

        <Group gap={8}>
          <ActionIcon>
            <IconHeart size={16} color={theme.colors.red[6]} />
          </ActionIcon>
          <ActionIcon>
            <IconBookmark size={16} color={theme.colors.yellow[7]} />
          </ActionIcon>
          <ActionIcon>
            <IconShare size={16} color={theme.colors.blue[6]} />
          </ActionIcon>
        </Group>
      </Group>
    </Card>
  );
}
