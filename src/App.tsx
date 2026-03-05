import {
  Container,
  Grid,
  Card,
  TextInput,
  Button,
  Group,
  Title,
  Stack,
  Text,
  Loader,
} from '@mantine/core';
import { IconSearch, IconDeviceGamepad2 } from '@tabler/icons-react';
import { GameCard } from './components/GameCard';
import { BacklogItem } from './components/BacklogItem';
import { useGameSearch } from './hooks/useGameSearch';
import { useState } from 'react';
import { useBacklogStore } from './hooks/useBacklogStore';

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const { addGame, gameBacklog, removeGame } = useBacklogStore();

  const { isLoading, data } = useGameSearch(searchTerm);

  const games = data ?? [];

  return (
    <Container size="xl" py="xl">
      {/* Header do App */}
      <Group mb="xl">
        <IconDeviceGamepad2 size={40} color="#7950f2" />
        <Title order={1}>Gamer Log</Title>
      </Group>

      {/* Grid Principal dividindo a tela */}
      <Grid gutter="xl">
        {/* ==========================================
            LADO ESQUERDO: Busca e Resultados
            ========================================== */}
        <Grid.Col span={{ base: 12, md: 8 }}>
          <Group mb="lg" align="flex-end">
            <TextInput
              value={searchInput}
              onChange={(e) => setSearchInput(e.currentTarget.value)} // <-- Atualiza o texto
              placeholder="Ex: The Witcher 3, Elden Ring..."
              style={{ flex: 1 }}
              size="md"
            />
            <Button
              size="md"
              onClick={() => {
                setSearchTerm(searchInput);
              }}
              leftSection={<IconSearch size={18} />}>
              Buscar
            </Button>
          </Group>

          {isLoading && <Loader color="blue" />}

          {!isLoading && (
            <Grid>
              {games.map((game) => (
                <Grid.Col span={{ base: 12, sm: 6 }} key={game.id}>
                  <GameCard
                    title={game.name}
                    imageUrl={game.background_image}
                    rating={game.rating}
                    onAddClick={() => addGame(game)}
                  />
                </Grid.Col>
              ))}
            </Grid>
          )}
        </Grid.Col>

        {/* ==========================================
            LADO DIREITO: Sidebar do Backlog 
            ========================================== */}
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Card shadow="sm" padding="lg" radius="md" withBorder bg="dark.8">
            <Title order={3} mb="md">
              Meu Backlog ({gameBacklog.length})
            </Title>

            <Stack gap="sm">
              {gameBacklog.map((game) => (
                <BacklogItem
                  key={game.id}
                  title={game.name}
                  thumbnailUrl={game.background_image}
                  onRemoveClick={() => removeGame(game.id)}
                />
              ))}
            </Stack>

            {games.length === 0 && (
              <Text c="dimmed" size="sm">
                Nenhum jogo adicionado ainda.
              </Text>
            )}
          </Card>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
