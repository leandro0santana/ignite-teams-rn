import { TouchableOpacityProps } from 'react-native'

import { GroupStorageDTO } from '@storage/group/GroupStorageDTO'

import { Container, Icon, Title } from './styles'

type GroupCardProps = TouchableOpacityProps & {
  group: GroupStorageDTO
}

export function GroupCard({ group, ...rest }: GroupCardProps) {
  return (
    <Container {...rest}>
      <Icon />
      <Title>{group.name}</Title>
    </Container>
  )
}
