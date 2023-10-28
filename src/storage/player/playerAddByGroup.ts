/* eslint-disable no-useless-catch */
import AsyncStorage from '@react-native-async-storage/async-storage'
import uuid from 'react-native-uuid'

import { PLAYER_COLLECTION } from '@storage/storageConfig'

import { AppError } from '@utils/AppError'

import { PlayerStorageDTO } from './PlayerStorageDTO'
import { playersGetByGroup } from './playersGetByGroup'

export async function playerAddByGroup({
  groupId,
  name,
  team,
}: Omit<PlayerStorageDTO, 'id'>) {
  try {
    const storedPlayers = await playersGetByGroup(groupId)

    const playerAlreadyExists = storedPlayers.find(
      (player) => player.name === name,
    )

    if (playerAlreadyExists) {
      throw new AppError('Já existe um participante com esse nome nessa turma!')
    }

    const newPlayer: PlayerStorageDTO = {
      id: String(uuid.v4()),
      groupId,
      name,
      team,
    }

    const players = JSON.stringify([...storedPlayers, newPlayer])

    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${groupId}`, players)

    return newPlayer
  } catch (err) {
    throw err
  }
}
