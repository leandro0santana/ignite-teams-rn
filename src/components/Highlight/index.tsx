import { Container, Subtitle, Title } from './styles'

type HighlightProps = {
  title: string
  description: string
}

export function Highlight({ title, description }: HighlightProps) {
  return (
    <Container>
      <Title>{title}</Title>
      <Subtitle>{description}</Subtitle>
    </Container>
  )
}
