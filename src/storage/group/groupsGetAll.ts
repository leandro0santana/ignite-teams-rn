/* eslint-disable no-useless-catch */
import AsyncStorage from '@react-native-async-storage/async-storage'

import { GROUP_COLLECTION } from '@storage/storageConfig'

import { GroupStorageDTO } from './GroupStorageDTO'

export async function groupsGetAll() {
  try {
    const storage = await AsyncStorage.getItem(GROUP_COLLECTION)

    const groups: GroupStorageDTO[] = storage ? JSON.parse(storage) : []

    return groups
  } catch (err) {
    throw err
  }
}
