export interface Population {
  prefName: string
  data: {
    label: string
    data: {
      year: number
      value: number
    }[]
  }[]
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
