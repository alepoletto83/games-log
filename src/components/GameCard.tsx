import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import { Link } from '@tanstack/react-router';

interface GameCardProps {
  id: number;
  title: string;
  imageUrl: string;
  rating: number;
  onAddClick: () => void;
}

export function GameCard({
  id,
  title,
  imageUrl,
  rating,
  onAddClick,
}: GameCardProps) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Link to="/game/$id" params={{ id: String(id) }} style={{ textDecoration: 'none', color: 'inherit' }}>
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
      </Link>

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
