import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FeatherIconCustomList} from "../../../util/featherIconCustomList";
import {FileService} from "../../../service/file.service";
import {NotifierService} from "../../../service/notifier.service";
import {ContentModel} from "../../../model/ContentModel";
import {SystemConstant} from "../../../const/SystemConstant";

@Component({
  selector: 'app-add-new-assets-popup',
  templateUrl: './add-new-assets-popup.component.html',
  styleUrls: ['./add-new-assets-popup.component.scss']
})
export class AddNewAssetsPopupComponent implements OnInit {

  closeIcon = FeatherIconCustomList.CLOSE_ICON;
  uploadAssetList: File;
  showNoAssetWarning: boolean = true;
  @Output() closeAssetPopupEvent = new EventEmitter<void>();
  @Output() addedFileEvent = new EventEmitter<string>();



  constructor(private fileService: FileService) { }

  ngOnInit(): void {
  }

  closeAddNewAssetsPopup() {
    this.closeAssetPopupEvent.emit();
  }

  onChangeUploadAssets(event) {
    let fReader = new FileReader();
    this.uploadAssetList = event.target.files[0];
    fReader.readAsDataURL(event.target.files[0]);
    let targetImgInput = document.querySelector("#assetImg") as HTMLInputElement;
    fReader.onloadend = function(event){
      targetImgInput.src = event.target.result as string;
    }
    this.showNoAssetWarning = false;
  }

  onUploadAssets() {
    this.fileService.uploadFile(this.uploadAssetList).subscribe(response => {
      NotifierService.success('Successfully added')
      this.closeAssetPopupEvent.emit();
      this.addedFileEvent.emit(response);
    });
  }
}
