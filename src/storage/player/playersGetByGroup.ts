/* eslint-disable no-useless-catch */
import AsyncStorage from '@react-native-async-storage/async-storage'

import { PLAYER_COLLECTION } from '@storage/storageConfig'

import { PlayerStorageDTO } from './PlayerStorageDTO'

export async function playersGetByGroup(groupId: string) {
  try {
    const storage = await AsyncStorage.getItem(
      `${PLAYER_COLLECTION}-${groupId}`,
    )

    const players: PlayerStorageDTO[] = storage ? JSON.parse(storage) : []

    return players
  } catch (err) {
    throw err
  }
}
