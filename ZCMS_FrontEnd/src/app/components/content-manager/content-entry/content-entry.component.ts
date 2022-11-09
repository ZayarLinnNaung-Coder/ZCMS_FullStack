import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Field} from "../../../model/Field";
import {ContentModel} from "../../../model/ContentModel";
import {ContentModelService} from "../../../service/content-model.service";
import {FeatherIconCustomList} from "../../../util/featherIconCustomList";
import {Content} from "../../../model/Content";
import {ContentService} from "../../../service/content.service";
import {NotifierService} from "../../../service/notifier.service";

@Component({
  selector: 'app-content-entry',
  templateUrl: './content-entry.component.html',
  styleUrls: ['./content-entry.component.scss']
})
export class ContentEntryComponent implements OnInit, OnChanges {

  plusIcon = FeatherIconCustomList.PLUS_ICON;
  editIcon = FeatherIconCustomList.EDIT_ICON;
  deleteIcon = FeatherIconCustomList.DELETE_ICON;

  showAddNewContentPopup: boolean;
  isContentUpdateMode: boolean;
  selectedUpdateContent: Content;
  selectedUpdateContentType: ContentModel;
  fields: Field[] = [];
  contents: Content[] = [];

  @Input() contentModel: ContentModel;
  @Output() updateContentModelEvent  = new EventEmitter<ContentModel>();
  @Output() deleteContentModelEvent = new EventEmitter<string>();

  constructor(private contentService: ContentService, private contentModelService: ContentModelService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    const contentModelChanges = changes['contentModel'];
    if(contentModelChanges){
      const currentContentModelId: string = contentModelChanges.currentValue.id;
      this.contentService.getAllContentsByContentModelId(currentContentModelId).subscribe(contents => {
        this.contents = contents;
      })
    }
  }

  onAddNewContent(newContent: Content) {
    this.contents.push(newContent);
  }

  onDeleteContent(id: string) {
    this.contentService.deleteContentById(id).subscribe(result => {
      this.contents.splice(
        this.contents.findIndex(content => content.id == id), 1);
      NotifierService.success("Successfully Deleted");
    });
  }

  onEditContent(content: Content) {
    this.isContentUpdateMode = true;
    this.selectedUpdateContent = content;
  }

  onCloseNewContentPopup() {
    this.showAddNewContentPopup = false;
    this.isContentUpdateMode = false;
  }

  onUpdateContent(updatedContent: Content) {
    this.contents = this.contents.map(content => content.id == updatedContent.id ? updatedContent : content);
  }
}
