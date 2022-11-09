import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FeatherIconCustomList} from "../../../util/featherIconCustomList";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ContentModel} from "../../../model/ContentModel";
import {AuthService} from "../../../service/auth.service";
import {ContentModelService} from "../../../service/content-model.service";
import {NotifierService} from "../../../service/notifier.service";

@Component({
  selector: 'app-new-content-type',
  templateUrl: './new-content-type.component.html',
  styleUrls: ['./new-content-type.component.scss']
})
export class NewContentTypeComponent implements OnInit {
  closeIcon = FeatherIconCustomList.CLOSE_ICON;
  formGroup !: FormGroup;

  constructor(private contentModelService: ContentModelService, private formBuilder: FormBuilder, private authService: AuthService) { }

  @Input() contentModel: ContentModel;
  @Input() isUpdateMode: boolean;
  @Output() closeEvent = new EventEmitter<void>();
  @Output() addNewContentModelEvent = new EventEmitter<ContentModel>();
  @Output() updateContentModelEvent = new EventEmitter<ContentModel>();

  ngOnInit(): void {
    this.formGroup = this.getFormGroup();
  }

  closePopup() {
    this.closeEvent.emit();
  }

  addNewContentModel() {
    const contentModel = new ContentModel(
      null, this.formGroup.value['name'], this.formGroup.value['apiId'], this.formGroup.value['description'], this.authService.getUserFromLocalStorage()
    );
    this.contentModelService.createNewContentModel(contentModel).subscribe((contentModel: ContentModel) => {
      this.closePopup();
      this.addNewContentModelEvent.emit(contentModel);
      NotifierService.success("Successfully added");
    })
  }

  updateContentModel() {
    const contentModel = new ContentModel(
      this.contentModel.id, this.formGroup.value['name'], this.formGroup.value['apiId'], this.formGroup.value['description'], this.authService.getUserFromLocalStorage()
    );
    this.contentModelService.updateContentModel(contentModel).subscribe((contentModel: ContentModel) => {
      this.closePopup();
      this.updateContentModelEvent.emit(contentModel);
      NotifierService.success("Successfully updated");
    })
  }

  private getFormGroup() {
    const name: string = this.isUpdateMode ? this.contentModel.name : '';
    const apiId: string = this.isUpdateMode ? this.contentModel.apiIdentifier : '';
    const description: string = this.isUpdateMode ? this.contentModel.description : '';

    return this.formBuilder.group({
      name: [name],
      apiId: [apiId],
      description: [description]
    });
  }
}
