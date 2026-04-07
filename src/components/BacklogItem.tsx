import { Group, Image, Text, ActionIcon } from '@mantine/core';
import { IconTrash, IconEdit } from '@tabler/icons-react';
import { Link } from '@tanstack/react-router';

interface BacklogItemProps {
  id: number;
  title: string;
  thumbnailUrl: string;
  onRemoveClick: () => void;
}

export function BacklogItem({
  id,
  title,
  thumbnailUrl,
  onRemoveClick,
}: BacklogItemProps) {
  return (
    <Group justify="space-between" wrap="nowrap" mb="sm">
      <Group wrap="nowrap" style={{ flex: 1, overflow: 'hidden' }}>
        <Image
          src={thumbnailUrl || 'https://placehold.co/40x40'}
          w={40}
          h={40}
          radius="sm"
        />
        <Text size="sm" fw={500} truncate>
          {title}
        </Text>
      </Group>

      <Group gap={4} wrap="nowrap">
        <Link to="/backlog/$id" params={{ id: String(id) }}>
          <ActionIcon
            color="violet"
            variant="subtle"
            title="Editar jogo">
            <IconEdit size={18} />
          </ActionIcon>
        </Link>
        <ActionIcon
          color="red"
          variant="subtle"
          onClick={onRemoveClick}
          title="Remover jogo">
          <IconTrash size={18} />
        </ActionIcon>
      </Group>
    </Group>
  );
}
