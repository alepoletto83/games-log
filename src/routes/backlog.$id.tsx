import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import {
  Container,
  Card,
  Image,
  Title,
  Text,
  Button,
  Group,
  Stack,
  Select,
  Textarea,
  Slider,
  Loader,
} from '@mantine/core';
import { IconArrowLeft, IconDeviceFloppy } from '@tabler/icons-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from '@tanstack/react-form';
import {
  getBacklogGame,
  updateBacklogGame,
  type BacklogGame,
} from '../api/backlogService';

export const Route = createFileRoute('/backlog/$id')({
  component: BacklogEditPage,
});

const STATUS_OPTIONS = [
  { value: 'playing', label: 'Playing' },
  { value: 'finished', label: 'Finished' },
  { value: 'dropped', label: 'Dropped' },
];

function BacklogEditPage() {
  const { id } = Route.useParams();
  const gameId = Number(id);
  const { data: game, isLoading } = useQuery({
    queryKey: ['backlog', gameId],
    queryFn: () => getBacklogGame(gameId),
  });

  if (isLoading) {
    return (
      <Container size="sm" py="xl">
        <Loader color="violet" size="lg" />
      </Container>
    );
  }

  if (!game) {
    return (
      <Container size="sm" py="xl">
        <Text>Jogo não encontrado no backlog.</Text>
        <Button component={Link} to="/" mt="md" variant="light" color="violet">
          Voltar
        </Button>
      </Container>
    );
  }

  return <BacklogForm game={game} />;
}

function BacklogForm({ game }: { game: BacklogGame }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: {
      status: string;
      user_rating: number | null;
      description: string | null;
      finished_at: string | null;
    }) => updateBacklogGame(game.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['backlog'] });
      navigate({ to: '/' });
    },
  });

  const form = useForm({
    defaultValues: {
      status: game.status ?? 'playing',
      user_rating: game.user_rating ?? 0,
      description: game.description ?? '',
    },
    onSubmit: ({ value }) => {
      mutation.mutate({
        status: value.status,
        user_rating: value.user_rating || null,
        description: value.description || null,
        finished_at: value.status === 'finished' ? new Date().toISOString().split('T')[0] : null,
      });
    },
  });

  return (
    <Container size="sm" py="xl">
      <Button
        component={Link}
        to="/"
        variant="subtle"
        color="violet"
        leftSection={<IconArrowLeft size={18} />}
        mb="lg"
      >
        Voltar
      </Button>

      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Card.Section>
          <Image
            src={game.background_image || 'https://placehold.co/600x300?text=Sem+Imagem'}
            height={200}
            alt={game.name}
          />
        </Card.Section>

        <Title order={2} mt="lg" mb="md">
          {game.name}
        </Title>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <Stack gap="lg">
            <form.Field name="status">
              {(field) => (
                <Select
                  label="Status"
                  data={STATUS_OPTIONS}
                  value={field.state.value}
                  onChange={(val) => field.handleChange((val ?? 'playing') as typeof field.state.value)}
                />
              )}
            </form.Field>

            <form.Field name="user_rating">
              {(field) => (
                <Stack gap={4}>
                  <Text size="sm" fw={500}>
                    Rating
                  </Text>
                  <Group>
                    <Slider
                      min={0}
                      max={10}
                      step={0.5}
                      value={field.state.value}
                      onChange={(val: number) => field.handleChange(val)}
                      style={{ flex: 1 }}
                      marks={[
                        { value: 0, label: '0' },
                        { value: 5, label: '5' },
                        { value: 10, label: '10' },
                      ]}
                    />
                    <Text size="sm" c="dimmed" w={60} ta="center">
                      {field.state.value > 0 ? `${field.state.value} / 10` : 'No rating'}
                    </Text>
                  </Group>
                </Stack>
              )}
            </form.Field>

            <form.Field name="description">
              {(field) => (
                <Textarea
                  label="Your thoughts"
                  placeholder="What did you think about the game?"
                  minRows={4}
                  autosize
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.currentTarget.value)}
                />
              )}
            </form.Field>

            <Button
              type="submit"
              color="violet"
              fullWidth
              size="md"
              loading={mutation.isPending}
              leftSection={<IconDeviceFloppy size={18} />}
            >
              Salvar
            </Button>
          </Stack>
        </form>
      </Card>
    </Container>
  );
}
