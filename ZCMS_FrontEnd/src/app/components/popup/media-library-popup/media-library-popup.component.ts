import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FeatherIconCustomList} from "../../../util/featherIconCustomList";
import {SystemConstant} from "../../../const/SystemConstant";
import {FileService} from "../../../service/file.service";

@Component({
  selector: 'app-media-library-popup',
  templateUrl: './media-library-popup.component.html',
  styleUrls: ['./media-library-popup.component.scss']
})
export class MediaLibraryPopupComponent implements OnInit {

  closeIcon = FeatherIconCustomList.CLOSE_ICON;
  plusIcon = FeatherIconCustomList.PLUS_ICON;
  fileList: { name: string, imgPath: string}[] = [];
  showAddNewAssetPopup: boolean;

  @Output() closeMediaLibraryPopupEvent = new EventEmitter<void>();
  @Output() selectedFileUrlEvent = new EventEmitter<string>();

  private url: string = SystemConstant.BASE_PATH + '/files';

  constructor(private fileService: FileService) { }

  ngOnInit(): void {
    this.fileService.getAllFiles().subscribe((pathList: string[]) => {
      pathList.forEach(path => {
        this.fileList.push(this.getFile(path));
      })
    })
  }

  onCloseAssetPopup() {
    this.showAddNewAssetPopup = false;
  }

  onAddFile(addedPath: string) {
    this.fileList.push(this.getFile(addedPath))
  }

  private getFile(path: string){
    const nameSplit = path.split('/');
    const fileName = nameSplit[nameSplit.length - 1];
    return {name: fileName, imgPath: this.url + '/' + fileName};
  }

  closeMediaLibraryPopup() {
    this.closeMediaLibraryPopupEvent.emit();
  }

  onSelectFile(file) {
    this.selectedFileUrlEvent.emit(file.imgPath);
    this.closeMediaLibraryPopup();
  }
}
