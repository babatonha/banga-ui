import { Component, OnInit } from '@angular/core';
import { MessageService, PrimeNGConfig} from 'primeng/api';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { BadgeModule } from 'primeng/badge';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { BaseService } from '../../../../_services/base.service';


@Component({
  selector: 'app-step-three',
  templateUrl: './step-three.component.html',
  styleUrls: ['./step-three.component.scss'],
  standalone: true,
  imports: [
    FileUploadModule, 
    ButtonModule, 
    BadgeModule, 
    ProgressBarModule, 
    ToastModule, 
    CommonModule],
  providers: [MessageService]
})
export class StepThreeComponent implements OnInit {

  files!: File[];

  totalSize : number = 0;

  totalSizePercent : number = 0;
  baseUrl!: string;

  constructor(private config: PrimeNGConfig, private messageService: MessageService, private baseService: BaseService) {
    this.baseUrl = this.baseService.baseUrl;
  }
  ngOnInit() {
  }


  choose(event: any, callback: any) {
      callback();
  }

  onRemoveTemplatingFile(event:any, file: any, removeFileCallback: any, index: any) {
      removeFileCallback(event, index);
      this.totalSize -= parseInt(this.formatSize(file.size));
      this.totalSizePercent = this.totalSize / 10;
  }

  onClearTemplatingUpload(clear: any) {
      clear();
      this.totalSize = 0;
      this.totalSizePercent = 0;
  }

  onTemplatedUpload() {
    if(this.files && this.files.length > 0){

        if(this.files.length > 5){
            this.messageService.add({ severity: 'error', summary: 'Maximum limit reached', detail: 'You can only upload a maximun of 5 photos', life: 3000 });
        }else{
            this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File(s) Uploaded', life: 3000 });
        }
       
    }
      
  }

  onSelectedFiles(event: any) {
      this.files = event.currentFiles;
      this.files.forEach((file) => {
          this.totalSize += parseInt(this.formatSize(file.size));
      });
      this.totalSizePercent = this.totalSize / 10;
  }

  uploadEvent(callback: any) {
      callback();
  }

  clearAllFiles() {
      this.files = [];
      
  }

  formatSize(bytes: any) {
      const k = 1024;
      const dm = 3;
      const sizes = this.config.translation.fileSizeTypes;
      if (bytes === 0 && sizes) {
          return `0 ${sizes[0]}`;
      }

      const i = Math.floor(Math.log(bytes) / Math.log(k));
      const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

      return `${formattedSize}`; // return `${formattedSize} ${sizes[i]}`;
  }


}
