import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';

interface GameCardProps {
  title: string;
  imageUrl: string;
  rating: number;
  onAddClick: () => void;
}

export function GameCard({
  title,
  imageUrl,
  rating,
  onAddClick,
}: GameCardProps) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src={imageUrl || 'https://placehold.co/600x400?text=Sem+Imagem'}
          height={160}
          alt={title}
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500} lineClamp={1} style={{ flex: 1 }}>
          {title}
        </Text>
        <Badge color="violet" variant="light">
          Nota: {rating}
        </Badge>
      </Group>

      <Button
        variant="light"
        color="violet"
        fullWidth
        mt="md"
        radius="md"
        onClick={onAddClick}>
        Adicionar ao Backlog
      </Button>
    </Card>
  );
}
