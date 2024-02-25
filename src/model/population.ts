export type PopulationTyoes = 'total' | 'working' | 'juniors' | 'old'

export interface Population {
  prefName: string
  // data: {
  //   mode: string
  //   data: {
  //     year: number
  //     value: number
  //   }[]
  // }[]
  data: {
    [key in PopulationTyoes]: {
      year: number
      value: number
    }[];
  }
}

export interface PopulationResponse {
  message: string
  result: {
    boundaryYear: number
    data: {
      label: string
      data: {
        year: number
        value: number
      }[]
    }[]
  }
}
