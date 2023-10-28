import { ButtonIcon } from '@components/ButtonIcon'

import { PlayerStorageDTO } from '@storage/player/PlayerStorageDTO'

import { Container, Icon, Name } from './styles'

type PlayerProps = {
  player: PlayerStorageDTO
  onRemove: (playerId: string) => void
}

export function PlayerCard({ player, onRemove }: PlayerProps) {
  return (
    <Container>
      <Icon />
      <Name>{player.name}</Name>
      <ButtonIcon
        type="SECONDARY"
        icon="close"
        onPress={() => onRemove(player.id)}
      />
    </Container>
  )
}
