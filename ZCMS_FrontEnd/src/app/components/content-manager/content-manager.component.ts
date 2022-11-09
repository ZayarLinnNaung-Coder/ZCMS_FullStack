import { Component, OnInit } from '@angular/core';
import {FeatherIconCustomList} from "../../util/featherIconCustomList";
import {ContentModel} from "../../model/ContentModel";
import {ContentModelService} from "../../service/content-model.service";

@Component({
  selector: 'app-content-manager',
  templateUrl: './content-manager.component.html',
  styleUrls: ['./content-manager.component.scss']
})
export class ContentManagerComponent implements OnInit {

  searchIcon = FeatherIconCustomList.SEARCH_ICON;
  plusIcon = FeatherIconCustomList.PLUS_ICON;

  contentModelList: ContentModel[] = [];
  selectedContentModel: ContentModel;

  constructor(private contentModelService: ContentModelService) { }

  ngOnInit(): void {
    this.contentModelService.getAllContentModelByCurrentUser().subscribe(contentModelList => {
      this.contentModelList = contentModelList;
    })
  }

  showContentEntries(contentModel: ContentModel) {
    this.selectedContentModel = contentModel;
  }

}
