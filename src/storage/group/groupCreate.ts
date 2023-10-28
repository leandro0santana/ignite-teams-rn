/* eslint-disable no-useless-catch */
import AsyncStorage from '@react-native-async-storage/async-storage'
import uuid from 'react-native-uuid'

import { AppError } from '@utils/AppError'
import { GROUP_COLLECTION } from '@storage/storageConfig'

import { groupsGetAll } from './groupsGetAll'
import { GroupStorageDTO } from './GroupStorageDTO'

export async function groupCreate(groupName: string) {
  try {
    const storedGroups = await groupsGetAll()

    const groupAlreadyExists = storedGroups.find(
      (group) => group.name === groupName,
    )

    if (groupAlreadyExists) {
      throw new AppError('Já existe uma turma com esse nome!')
    }

    const newGroup: GroupStorageDTO = {
      id: String(uuid.v4()),
      name: groupName,
    }

    const groups = JSON.stringify([...storedGroups, newGroup])

    await AsyncStorage.setItem(GROUP_COLLECTION, groups)

    return newGroup
  } catch (err) {
    throw err
  }
}
