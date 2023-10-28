import { useEffect, useState, useRef } from 'react'
import { Alert, FlatList, TextInput } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'

import { Header } from '@components/Header'
import { Highlight } from '@components/Highlight'
import { Input } from '@components/Input'
import { Button } from '@components/Button'
import { ButtonIcon } from '@components/ButtonIcon'
import { Filter } from '@components/Filter'
import { PlayerCard } from '@components/PlayerCard'
import { ListEmpty } from '@components/ListEmpty'
import { Loading } from '@components/Loading'

import { GroupStorageDTO } from '@storage/group/GroupStorageDTO'
import { PlayerStorageDTO } from '@storage/player/PlayerStorageDTO'
import { playerAddByGroup } from '@storage/player/playerAddByGroup'
import { groupRemoveById } from '@storage/group/groupRemoveById'
import { playersGetByGroupAndTeam } from '@storage/player/playersGetByGroupAndTeam'
import { playerRemoveByGroup } from '@storage/player/playerRemoveByGroup'

import { AppError } from '@utils/AppError'

import { Container, Form, HeaderList, NumberOfPlayers } from './styles'

type RouteParams = {
  group: GroupStorageDTO
}

export function Players() {
  const [isLoading, setIsLoading] = useState(true)
  const [newPlayerName, setNewPlayerName] = useState('')
  const [team, setTeam] = useState('Time A')
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([])

  const route = useRoute()

  const navigation = useNavigation()

  const newPlayerNameInputRef = useRef<TextInput>(null)

  const { group } = route.params as RouteParams

  async function handleAddPlayer() {
    try {
      if (newPlayerName.trim().length === 0) {
        return Alert.alert(
          'Novo participante',
          'Informe o nome do participante.',
        )
      }

      await playerAddByGroup({
        groupId: group.id,
        name: newPlayerName,
        team,
      })

      newPlayerNameInputRef.current?.blur()

      setNewPlayerName('')
      fetchPlayersByTeam()
    } catch (err) {
      if (err instanceof AppError) {
        Alert.alert('Novo Participante', err.message)
      } else {
        Alert.alert(
          'Novo participante',
          'Não foi possível adiciona um novo participante.',
        )
        console.log(err)
      }
    }
  }

  async function handleRemovePlayer(playerId: string) {
    try {
      await playerRemoveByGroup(playerId, group.id)
      fetchPlayersByTeam()
    } catch (err) {
      Alert.alert(
        'Remove participante',
        'Não foi possível remove o participante.',
      )
      console.log(err)
    }
  }

  function handleRemoveQuestionPlayer(playerId: string) {
    Alert.alert('Remove participante', 'Deseja remove a tarefa?', [
      {
        text: 'Sim',
        onPress: () => handleRemovePlayer(playerId),
      },
      {
        text: 'Não',
        style: 'cancel',
      },
    ])
  }

  async function handleRemoveGroup() {
    try {
      await groupRemoveById(group.id)
      navigation.navigate('groups')
    } catch (err) {
      Alert.alert('Remove turma', 'Não foi possível remove a turma.')
      console.log(err)
    }
  }

  function handleRemoveQuestionGroup() {
    Alert.alert('Remove turma', 'Deseja remove a turma?', [
      {
        text: 'Sim',
        onPress: () => handleRemoveGroup(),
      },
      {
        text: 'Não',
        style: 'cancel',
      },
    ])
  }

  async function fetchPlayersByTeam() {
    try {
      setIsLoading(true)

      const playersByTeam = await playersGetByGroupAndTeam(group.id, team)
      setPlayers(playersByTeam)
    } catch (err) {
      console.log(err)
      Alert.alert(
        'Participantes',
        'Não foi possível carregar os participantes do time selecionado.',
      )
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchPlayersByTeam()
  }, [team])

  return (
    <Container>
      <Header showBackButton />
      <Highlight
        title={group.name}
        description="adicione a galera e separe os times"
      />

      <Form>
        <Input
          inputRef={newPlayerNameInputRef}
          placeholder="Nome do participante"
          autoCorrect={false}
          onChangeText={setNewPlayerName}
          value={newPlayerName}
          onSubmitEditing={handleAddPlayer}
          returnKeyType="done"
        />
        <ButtonIcon icon="add" onPress={handleAddPlayer} />
      </Form>

      <HeaderList>
        <FlatList
          data={['Time A', 'Time B']}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
          horizontal
        />

        <NumberOfPlayers>{players.length}</NumberOfPlayers>
      </HeaderList>

      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={players}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <PlayerCard player={item} onRemove={handleRemoveQuestionPlayer} />
          )}
          ListEmptyComponent={() => (
            <ListEmpty message="Não há pessoas nesse time" />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            { paddingBottom: 100 },
            players.length === 0 && { flex: 1 },
          ]}
        />
      )}

      <Button
        title="Remover turma"
        type="SECONDARY"
        onPress={handleRemoveQuestionGroup}
      />
    </Container>
  )
}
