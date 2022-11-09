import {Field} from "./Field";
import {Status} from "../enum/Status";
import {User} from "./User";
import {ContentModel} from "./ContentModel";

export class Content{
  public id: string;
  public title: string;
  public fields: Field[];
  public createdDate: Date;
  public updatedDate: Date;
  public publishStatus: Status;
  public contentModel: ContentModel;
  public createdUser: User;

  constructor() {
  }
}
