import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MantineProvider } from '@mantine/core';
import { GameCard } from './GameCard';

vi.mock('@tanstack/react-router', () => ({
  Link: ({ children, ...rest }: React.PropsWithChildren<{ to?: string }>) => (
    <a {...rest}>{children}</a>
  ),
}));

function renderWithProviders(ui: React.ReactElement) {
  return render(<MantineProvider>{ui}</MantineProvider>);
}

describe('GameCard', () => {
  const baseProps = {
    id: 1,
    title: 'The Witcher 3',
    imageUrl: 'https://example.com/witcher.jpg',
    rating: 95,
    onAddClick: vi.fn(),
  };

  it('renders title, rating and image', () => {
    renderWithProviders(<GameCard {...baseProps} />);

    expect(screen.getByText('The Witcher 3')).toBeInTheDocument();
    expect(screen.getByText(/Nota: 95/)).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'The Witcher 3' })).toHaveAttribute(
      'src',
      'https://example.com/witcher.jpg',
    );
  });

  it('falls back to placeholder image when imageUrl is empty', () => {
    renderWithProviders(<GameCard {...baseProps} imageUrl="" />);

    expect(screen.getByRole('img', { name: 'The Witcher 3' })).toHaveAttribute(
      'src',
      expect.stringContaining('placehold.co'),
    );
  });

  it('shows "Adicionar ao Backlog" button and calls onAddClick', async () => {
    const onAddClick = vi.fn();
    renderWithProviders(<GameCard {...baseProps} onAddClick={onAddClick} />);

    const button = screen.getByRole('button', { name: /Adicionar ao Backlog/i });
    await userEvent.click(button);

    expect(onAddClick).toHaveBeenCalledTimes(1);
  });

  it('shows "Jogo finalizado" badge when isFinished is true', () => {
    renderWithProviders(<GameCard {...baseProps} isFinished />);

    expect(screen.getByText('Jogo finalizado')).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /Adicionar ao Backlog/i }),
    ).not.toBeInTheDocument();
  });

  it('shows "Já no backlog" badge when isInBacklog is true', () => {
    renderWithProviders(<GameCard {...baseProps} isInBacklog />);

    expect(screen.getByText('Já no backlog')).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /Adicionar ao Backlog/i }),
    ).not.toBeInTheDocument();
  });

  it('prioritizes finished state over backlog state', () => {
    renderWithProviders(<GameCard {...baseProps} isFinished isInBacklog />);

    expect(screen.getByText('Jogo finalizado')).toBeInTheDocument();
    expect(screen.queryByText('Já no backlog')).not.toBeInTheDocument();
  });
});
