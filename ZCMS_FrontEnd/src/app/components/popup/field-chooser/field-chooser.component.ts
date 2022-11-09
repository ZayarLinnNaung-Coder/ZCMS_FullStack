import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {FieldType} from "../../../enum/FieldType";
import {FeatherIconCustomList} from "../../../util/featherIconCustomList";
import {ContentModel} from "../../../model/ContentModel";
import {Field} from "../../../model/Field";

@Component({
  selector: 'app-field-chooser',
  templateUrl: './field-chooser.component.html',
  styleUrls: ['./field-chooser.component.scss']
})
export class FieldChooserComponent implements OnInit {
  closeIcon = FeatherIconCustomList.CLOSE_ICON;
  fieldTypes: {type: FieldType, desc: string }[] = [];
  selectedFieldType: {type: FieldType, desc: string };
  showFieldDetailsPopup: boolean;

  @Input() activeContentModel: ContentModel;

  @Output() fileChooserCloseEvent = new EventEmitter<void>();
  @Output() addNewFieldEvent = new EventEmitter<Field>();

  constructor() { }

  ngOnInit(): void {
    for (let fieldTypeKey in FieldType) {
      let desc = "";
      switch (fieldTypeKey){
        case FieldType.TEXT:
          desc = "Small or long text like for your title or description";
          break;
        case FieldType.RICH_TEXT:
          desc = "A rich text editor for formatting options";
          break;
        case FieldType.DATE:
          desc = "A date picker with hours, minutes and seconds";
          break;
        case FieldType.MEDIA:
          desc = "A media picker for image, videos and so on";
          break;
      }
      const fieldType = {type: FieldType[fieldTypeKey], desc: desc};
      this.fieldTypes.push(fieldType);
    }
  }

  selectFieldType(fieldType) {
    this.selectedFieldType = fieldType;
    this.showFieldDetailsPopup = true;
  }

  closeFileChooserPopup() {
    console.log("ON CLOSING")
    this.fileChooserCloseEvent.emit();
  }

  onCloseFieldDetailsPopup() {
    this.showFieldDetailsPopup = false;
  }

  onAddNewField(newField: Field){
    this.addNewFieldEvent.emit(newField);
  }
}
