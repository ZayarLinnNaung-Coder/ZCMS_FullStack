import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FieldType} from "../../../enum/FieldType";
import {FeatherIconCustomList} from "../../../util/featherIconCustomList";
import {Field} from "../../../model/Field";
import {FieldService} from "../../../service/field.service";
import {ContentModel} from "../../../model/ContentModel";
import {FormBuilder, FormGroup} from "@angular/forms";
import {NotifierService} from "../../../service/notifier.service";

@Component({
  selector: 'app-field-details',
  templateUrl: './field-details.component.html',
  styleUrls: ['./field-details.component.scss']
})
export class FieldDetailsComponent implements OnInit {

  closeIcon = FeatherIconCustomList.CLOSE_ICON;
  formGroup !: FormGroup;

  constructor(private fieldService: FieldService, private formBuilder: FormBuilder) { }

  @Input() contentModel: ContentModel;
  @Input() selectedFiledType: {type: FieldType, desc: string };
  @Input() isFieldUpdateMode: boolean;
  @Input() selectedUpdateField: Field;
  @Output() closeEvent = new EventEmitter<void>();
  @Output() addNewFieldEvent = new EventEmitter<Field>();
  @Output() updateFieldEvent = new EventEmitter<Field>();

  ngOnInit(): void {
    this.formGroup = this.getFormGroup();
  }

  closePopup() {
    this.closeEvent.emit();
  }

  addNewField() {
    const field: Field = new Field(
      null,
      this.formGroup.value['fieldName'],
      this.selectedFiledType.type,
      '',
      this.formGroup.value['description'],
      this.contentModel
    );
    this.fieldService.saveField(field).subscribe(field => {
      this.closePopup();
      this.addNewFieldEvent.emit(field);
    });
  }

  updateField() {
    const field: Field = new Field(
      this.selectedUpdateField.id,
      this.formGroup.value['fieldName'],
      this.selectedUpdateField.type,
      '',
      this.formGroup.value['description'],
      this.selectedUpdateField.contentModel
    );
    this.fieldService.updateField(field).subscribe(field => {
      NotifierService.success("Successfully updated");
      this.updateFieldEvent.emit(field);
      this.closePopup();
    });
  }

  private getFormGroup(): FormGroup {
    const fieldName: string = this.isFieldUpdateMode ? this.selectedUpdateField.name : '';
    const description: string = this.isFieldUpdateMode ? this.selectedUpdateField.description : '';

    return this.formBuilder.group({
      fieldName: [fieldName],
      description: [description]
    });
  }
}
