import { useState } from 'react'
import { Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { Header } from '@components/Header'
import { Highlight } from '@components/Highlight'
import { Button } from '@components/Button'
import { Input } from '@components/Input'

import { groupCreate } from '@storage/group/groupCreate'

import { AppError } from '@utils/AppError'

import { Container, Content, Icon } from './styles'

export function CreateGroup() {
  const [newGroupName, setGroupName] = useState('')

  const navigation = useNavigation()

  async function handleCreateGroup() {
    try {
      if (newGroupName.trim().length === 0) {
        return Alert.alert('Novo turma', 'Informe o nome da turma.')
      }

      const newGroup = await groupCreate(newGroupName)

      navigation.navigate('players', { group: newGroup })
    } catch (err) {
      if (err instanceof AppError) {
        Alert.alert('Novo turma', err.message)
      } else {
        Alert.alert('Novo turma', 'Não foi possível criar uma nova turma.')
        console.log(err)
      }
    }
  }

  return (
    <Container>
      <Header showBackButton />

      <Content>
        <Icon />
        <Highlight
          title="Nova turma"
          description="crie uma turma para adicionar pessoas"
        />
        <Input placeholder="Nome da turma" onChangeText={setGroupName} />
        <Button
          title="Criar"
          style={{ marginTop: 20 }}
          onPress={handleCreateGroup}
        />
      </Content>
    </Container>
  )
}
