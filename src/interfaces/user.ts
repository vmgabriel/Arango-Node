export interface IUser {
  _id: string,
  name: string,
  lastName: string,
  email: string,
  cellPhone: string,
  alias: string,
  dateBorn: Date | string,
  country: string,
  urlPhoto: string,
  isValid: boolean | number,
  createdAt: Date | string,
  updatedAt: Date | string,
  deletedAt: Date | string,
  creatorId: number,
  updaterId: number,
  deleterId: number,
  _key: number
}
