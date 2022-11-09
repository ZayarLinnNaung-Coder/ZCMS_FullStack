import {FieldType} from "../enum/FieldType";
import {ContentModel} from "./ContentModel";

export class Field{
  constructor(
    public id: string,
    public name: string,
    public type: FieldType,
    public data: string,
    public description: string,
    public contentModel: ContentModel
  ) {
  }
}
