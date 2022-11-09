import {Authority} from "../enum/Authority";

export class User{
  constructor(
    private _id: string,
    public username: string,
    private password: string,
    private email: string,
    private firstName: string,
    private lastName: string,
    private authorities?: Authority[]
  ) {
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }
}
