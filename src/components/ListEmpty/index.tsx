import { Container, Icon, Message } from './styles'

type ListEmptyProps = {
  message: string
}

export function ListEmpty({ message }: ListEmptyProps) {
  return (
    <Container>
      <Icon />
      <Message>{message}</Message>
    </Container>
  )
}
