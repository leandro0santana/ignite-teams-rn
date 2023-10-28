/* eslint-disable no-useless-catch */
import AsyncStorage from '@react-native-async-storage/async-storage'

import { PLAYER_COLLECTION } from '@storage/storageConfig'

import { playersGetByGroup } from './playersGetByGroup'

export async function playerRemoveByGroup(playerId: string, groupId: string) {
  try {
    const storage = await playersGetByGroup(groupId)

    const filteredPlayers = storage.filter((player) => player.id !== playerId)

    const players = JSON.stringify(filteredPlayers)

    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${groupId}`, players)
  } catch (err) {
    throw err
  }
}
