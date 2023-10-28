/* eslint-disable no-useless-catch */
import AsyncStorage from '@react-native-async-storage/async-storage'

import { GROUP_COLLECTION, PLAYER_COLLECTION } from '@storage/storageConfig'

import { groupsGetAll } from './groupsGetAll'

export async function groupRemoveById(groupId: string) {
  try {
    const storageGroups = await groupsGetAll()

    const filteredGroups = storageGroups.filter((group) => group.id !== groupId)

    const groups = JSON.stringify(filteredGroups)

    await AsyncStorage.setItem(GROUP_COLLECTION, groups)

    await AsyncStorage.removeItem(`${PLAYER_COLLECTION}-${groupId}`)
  } catch (err) {
    throw err
  }
}
