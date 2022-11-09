import {User} from "./User";

export class ContentModel{
  constructor(
    public id: string,
    public name: string,
    public apiIdentifier: string,
    public description: string,
    public user: User
  ) {
  }
}
