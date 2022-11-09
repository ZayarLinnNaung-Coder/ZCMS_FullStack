import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FeatherIconCustomList} from "../../../util/featherIconCustomList";
import {ContentModel} from "../../../model/ContentModel";
import {FieldService} from "../../../service/field.service";
import {Field} from "../../../model/Field";
import {ContentModelService} from "../../../service/content-model.service";

@Component({
  selector: 'app-content-type-details',
  templateUrl: './content-type-details.component.html',
  styleUrls: ['./content-type-details.component.scss']
})
export class ContentTypeDetailsComponent implements OnInit, OnChanges {

  plusIcon = FeatherIconCustomList.PLUS_ICON;
  editIcon = FeatherIconCustomList.EDIT_ICON;
  deleteIcon = FeatherIconCustomList.DELETE_ICON;

  showFieldChooserPopup: boolean;
  fields: Field[] = [];
  isFieldUpdateMode: boolean;
  selectedUpdateField: Field;

  isContentTypeUpdateMode: boolean;
  selectedUpdateContentType: ContentModel;

  @Input() contentModel: ContentModel;
  @Output() updateContentModelEvent  = new EventEmitter<ContentModel>();
  @Output() deleteContentModelEvent = new EventEmitter<string>();

  constructor(private fieldService: FieldService, private contentModelService: ContentModelService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    // On ContentModel Changes
    const contentModelChanges = changes['contentModel'];
    if(contentModelChanges){
      const contentModelId: string = contentModelChanges['currentValue'].id;
      this.fieldService.findFieldsByContentModelId(contentModelId).subscribe((fields: Field[]) => {
        this.fields = fields;
      })
    }
  }

  closeFieldChooserPopup() {
    this.showFieldChooserPopup = false;
  }

  onAddNewField(newField: Field) {
    this.fields.push(newField);
  }

  onEditField(field: Field) {
    this.isFieldUpdateMode = true;
    this.selectedUpdateField = field;
  }

  onEditContentType(){
    this.isContentTypeUpdateMode = true;
  }

  closeFieldDetailsPopup() {
    this.isFieldUpdateMode = false;
  }

  closeContentTypePopup(){
    this.isContentTypeUpdateMode = false;
  }

  onUpdateExistingField(updatedField: Field) {
    this.fields = this.fields.map(field => updatedField.id == field.id ? updatedField: field);
  }

  onDeleteField(id: string) {
    this.fieldService.deleteField(id).subscribe( data => {
      this.fields.splice(this.fields.findIndex(field => field.id == id), 1);
    });
  }

  onUpdateContentModelEvent(contentModel: ContentModel) {
    this.contentModel = contentModel;
    this.updateContentModelEvent.emit(contentModel);
  }

  onDeleteContentType(id: string) {
    this.contentModelService.deleteContentModelById(id).subscribe(data => {
      this.deleteContentModelEvent.emit(id);
    });
  }
}
