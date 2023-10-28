import { useState, useCallback } from 'react'
import { Alert, FlatList } from 'react-native'
import { useNavigation, useFocusEffect } from '@react-navigation/native'

import { Header } from '@components/Header'
import { Highlight } from '@components/Highlight'
import { GroupCard } from '@components/GroupCard'
import { ListEmpty } from '@components/ListEmpty'
import { Button } from '@components/Button'
import { Loading } from '@components/Loading'

import { groupsGetAll } from '@storage/group/groupsGetAll'
import { GroupStorageDTO } from '@storage/group/GroupStorageDTO'

import { Container } from './styles'

export function Groups() {
  const [isLoading, setIsLoading] = useState(true)
  const [groups, setGroups] = useState<GroupStorageDTO[]>([])

  const navigation = useNavigation()

  function handleCreateGroup() {
    navigation.navigate('create')
  }

  async function fecthGroups() {
    try {
      setIsLoading(true)

      const storadGroups = await groupsGetAll()
      setGroups(storadGroups)
    } catch (err) {
      Alert.alert('Turmas', 'Não foi posível carregar as turmas.')
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }

  function handleOpenGroup(group: GroupStorageDTO) {
    navigation.navigate('players', { group })
  }

  useFocusEffect(
    useCallback(() => {
      fecthGroups()
    }, []),
  )

  return (
    <Container>
      <Header />

      <Highlight title="Turmas" description="jogue com a sua turma" />

      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={groups}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <GroupCard group={item} onPress={() => handleOpenGroup(item)} />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={groups.length === 0 && { flex: 1 }}
          ListEmptyComponent={() => (
            <ListEmpty message="Que tal cadastrar a primeira turma?" />
          )}
          showsHorizontalScrollIndicator={false}
        />
      )}

      <Button title="Criar nova turma" onPress={handleCreateGroup} />
    </Container>
  )
}
