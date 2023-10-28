/* eslint-disable no-useless-catch */
import { PlayerStorageDTO } from './PlayerStorageDTO'
import { playersGetByGroup } from './playersGetByGroup'

export async function playersGetByGroupAndTeam(groupId: string, team: string) {
  try {
    const storage = await playersGetByGroup(groupId)

    const players: PlayerStorageDTO[] = storage.filter(
      (player) => player.team === team,
    )

    return players
  } catch (err) {
    throw err
  }
}
