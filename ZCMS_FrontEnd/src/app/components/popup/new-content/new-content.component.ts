import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FeatherIconCustomList} from "../../../util/featherIconCustomList";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ContentModelService} from "../../../service/content-model.service";
import {AuthService} from "../../../service/auth.service";
import {ContentModel} from "../../../model/ContentModel";
import {NotifierService} from "../../../service/notifier.service";
import {FieldService} from "../../../service/field.service";
import {FieldType} from "../../../enum/FieldType";
import {Content} from "../../../model/Content";
import {ContentService} from "../../../service/content.service";
import {Status} from "../../../enum/Status";
import {Field} from "../../../model/Field";

@Component({
  selector: 'app-new-content',
  templateUrl: './new-content.component.html',
  styleUrls: ['./new-content.component.scss']
})
export class NewContentComponent implements OnInit {
  closeIcon = FeatherIconCustomList.CLOSE_ICON;
  formGroup !: FormGroup;

  @Input() activeContentModel: ContentModel;
  showPreviewLabel: boolean;
  showMediaLibraryPopup: boolean;
  selectedFieldId: string;
  contentTitle: string;
  content: Content = new Content();

  @Input() contentModel: ContentModel;
  @Input() isUpdateMode: boolean;
  @Input() selectedUpdateContent: Content;
  @Output() closeEvent = new EventEmitter<void>();
  @Output() newContentEvent = new EventEmitter<Content>();
  @Output() updateContentEvent = new EventEmitter<Content>();
  @Output() addNewContentModelEvent = new EventEmitter<ContentModel>();
  @Output() updateContentModelEvent = new EventEmitter<ContentModel>();

  constructor(private contentModelService: ContentModelService,
              private contentService: ContentService,
              private formBuilder: FormBuilder,
              private authService: AuthService,
              private fieldService: FieldService
  ) { }

  ngOnInit(): void {
    if(this.selectedUpdateContent){
      this.content = this.selectedUpdateContent;
      this.contentTitle = this.content.title;
    }else{
      this.fieldService.findFieldsByContentModelId(this.activeContentModel.id).subscribe(fields => {
        this.content.fields = fields;
      })
    }
    this.showPreviewLabel = true;
  }

  createNewContent() {
    this.content.title = this.contentTitle;
    this.content.createdDate = new Date();
    this.content.publishStatus = Status.PUBLISH;
    this.content.contentModel = this.activeContentModel;
    this.content.createdUser = this.authService.getUserFromLocalStorage();

    this.content.fields.forEach(field => {
      if(FieldType.MEDIA == field.type){
        console.log(field)
      }
    })

    this.contentService.createNewContent(this.content).subscribe(createdContent => {
      NotifierService.success("Successfully created");
      this.closePopup();
      this.newContentEvent.emit(createdContent);
    })
  }

  updateExistingContent() {
    this.content.title = this.contentTitle;
    this.contentService.updateExistingContent(this.content).subscribe(updatedContent => {
      NotifierService.success("Successfully updated");
      this.closePopup();
      this.updateContentEvent.emit(updatedContent);
    })
  }

  onCloseMediaLibraryPopup() {
    this.showMediaLibraryPopup = false;
  }

  onSelectFile(fileUrl: string, field: Field) {
    field.data = fileUrl;
  }

  openMediaChooser(fieldId: string) {
    this.selectedFieldId = fieldId;
    this.showMediaLibraryPopup = true;
  }

  closePopup() {
    this.closeEvent.emit();
  }
}
