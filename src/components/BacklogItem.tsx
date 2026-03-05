import { Group, Image, Text, ActionIcon } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';

interface BacklogItemProps {
  title: string;
  thumbnailUrl: string;
  // Callback para você plugar a função de remover do Zustand
  onRemoveClick: () => void;
}

export function BacklogItem({
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

      <ActionIcon
        color="red"
        variant="subtle"
        onClick={onRemoveClick}
        title="Remover jogo">
        <IconTrash size={18} />
      </ActionIcon>
    </Group>
  );
}
