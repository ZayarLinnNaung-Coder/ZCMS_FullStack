import { Component, OnInit } from '@angular/core';
import {FeatherIconCustomList} from "../../util/featherIconCustomList";
import {ContentModel} from "../../model/ContentModel";
import {ContentModelService} from "../../service/content-model.service";

@Component({
  selector: 'app-content-type-builder',
  templateUrl: './content-type-builder.component.html',
  styleUrls: ['./content-type-builder.component.scss']
})
export class ContentTypeBuilderComponent implements OnInit {

  searchIcon = FeatherIconCustomList.SEARCH_ICON;
  plusIcon = FeatherIconCustomList.PLUS_ICON;

  contentModelList: ContentModel[] = [];
  selectedContentModel: ContentModel;
  showCreateNewContentTypePopup: boolean;

  constructor(private contentModelService: ContentModelService) { }

  ngOnInit(): void {
    this.contentModelService.getAllContentModelByCurrentUser().subscribe(contentModelList => {
      this.contentModelList = contentModelList;
    })
  }

  showContentModelDetails(contentModel: ContentModel) {
    this.selectedContentModel = contentModel;
  }

  createNewContentType() {
    this.showCreateNewContentTypePopup = true;
  }

  onClosePopup() {
    this.showCreateNewContentTypePopup = false;
  }

  onAddNewContentModel(newContentModel: ContentModel) {
    this.contentModelList.push(newContentModel);
  }

  onUpdateContentModel(contentModel: ContentModel) {
    this.contentModelList = this.contentModelList.map(value => value.id == contentModel.id ? contentModel : value);
    console.log(this.contentModelList)
  }

  onDeleteContentModel(id: string) {
    this.contentModelList.splice(this.contentModelList.findIndex(contentModel => contentModel.id == id), 1);
    this.selectedContentModel = null;
  }
}
