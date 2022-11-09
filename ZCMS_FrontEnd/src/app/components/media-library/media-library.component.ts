import { Component, OnInit } from '@angular/core';
import {FeatherIconCustomList} from "../../util/featherIconCustomList";
import {FileService} from "../../service/file.service";
import {SystemConstant} from "../../const/SystemConstant";

@Component({
  selector: 'app-media-library',
  templateUrl: './media-library.component.html',
  styleUrls: ['./media-library.component.scss']
})
export class MediaLibraryComponent implements OnInit {
  plusIcon = FeatherIconCustomList.PLUS_ICON;
  fileList: { name: string, imgPath: string}[] = [];
  showAddNewAssetPopup: boolean;

  private url: string = SystemConstant.BASE_PATH + '/files';

  constructor(private fileService: FileService) { }

  ngOnInit(): void {
    this.fileService.getAllFiles().subscribe((pathList: string[]) => {
      pathList.splice(0, 1);
      pathList.forEach(path => {
        const nameSplit = path.split('/');
        const fileName = nameSplit[nameSplit.length - 1];
        this.fileList.push({name: fileName, imgPath: this.url + '/' + fileName});
      })
    })
  }

  onCloseAssetPopup() {
    this.showAddNewAssetPopup = false;
  }
}
