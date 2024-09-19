import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageService, PrimeNGConfig} from 'primeng/api';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { BadgeModule } from 'primeng/badge';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { BaseService } from '../../../../_services/base.service';
import { PropertyPhotoService } from '../../../../_services/propertyPhoto.service';
import { Router } from '@angular/router';
import { PanelModule } from 'primeng/panel';
import { PropertyPhoto } from '../../../../_models/propertyPhoto';
import { ImageModule } from 'primeng/image';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';


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
    PanelModule, 
    ImageModule,
    CardModule,
    CarouselModule, 
    TagModule,
    CommonModule],
  providers: [MessageService]
})
export class StepThreeComponent implements OnInit {

  files!: File[];

  totalSize : number = 0;

  totalSizePercent : number = 0;
  baseUrl!: string;
  propertyPhotos: PropertyPhoto[] = [];
  responsiveOptions: any[] | undefined;
  @Input() currentPropertyId!: number;
  @Output() loadingEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private config: PrimeNGConfig,
    private router: Router, 
    private messageService: MessageService,
    private propertyPhotoService: PropertyPhotoService,
    private baseService: BaseService) {
    this.baseUrl = this.baseService.baseUrl;
    this.responsiveOptions = [
      {
          breakpoint: '1199px',
          numVisible: 1,
          numScroll: 1
      },
      {
          breakpoint: '991px',
          numVisible: 2,
          numScroll: 1
      },
      {
          breakpoint: '767px',
          numVisible: 1,
          numScroll: 1
      }
  ];
  }
  ngOnInit() {
    this.getPropertyPhotos(this.currentPropertyId);
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
            const propertyId = localStorage.getItem('newPropertyId');
            this.savePhotos(propertyId ? parseInt(propertyId) : 0);
        }
    } else{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No file selected', life: 3000 });
        this.loadingEmitter.emit(false);
    }   
  }

  savePhotos(propertyId: number) {
    if(!propertyId){
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Property Id not found', life: 3000 });
        return;
    }

    this.loadingEmitter.emit(true);
    const formData = new FormData();

    for (const file of this.files) {  
      formData.append('files', file);
    }
  
    this.propertyPhotoService.saveAll(formData, propertyId).subscribe({
      next: response =>{
        this.loadingEmitter.emit(false);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Photo(s) Uploaded', life: 3000 });
        localStorage.removeItem('newPropertyId');
        this.router.navigate(['/my-property']);
      },error: (error) => {
        console.log(error);
        this.loadingEmitter.emit(false);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error, life: 3000 });
      }
    });
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


  getPropertyPhotos(propertyId: number){
    this.propertyPhotoService.getPropertyPhotos(propertyId).subscribe({
      next: response =>{
        this.propertyPhotos = response;
      }
    })
  }

  deletePhoto(photoId: number){
    this.loadingEmitter.emit(true);
    this.propertyPhotoService.deletePhoto(photoId).subscribe({
      next: response =>{
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Deleted Successfully', life: 3000 });
        this.getPropertyPhotos(this.currentPropertyId); 
        this.loadingEmitter.emit(false);
      }
    })
  }


}
