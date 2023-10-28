type Group = {
  id: string
  name: string
}

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      groups: undefined
      create: undefined
      players: {
        group: Group
      }
    }
  }
}
