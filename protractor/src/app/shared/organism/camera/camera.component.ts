import { Component, ViewChild, ElementRef, EventEmitter, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss']
})
export class CameraComponent implements OnInit {

  @ViewChild('camera', { static: true }) public camera: ElementRef;
  @ViewChild('previewImage', {static: false}) public image: ElementRef;

  @Output() eventSendPhoto = new EventEmitter();
  @Output() cameraError = new EventEmitter();

  enabledCamera = true;
  stream;
  dataUrl;
  videoTrack;
  imageCapture;
  blob;
  //
  cameraSizes = {
    width: 640,
    height: 480
  };


  constructor() {
    this.recapture();
  }

  ngOnInit() {
    this.recapture();
  }

  initCamera(settings: object) {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia(settings).then(
        stream => {
          this.stream = stream;
          this.camera.nativeElement.srcObject = stream;
          this.videoTrack = stream.getVideoTracks()[0];
          this.showCamera();
        },
        err => {
          this.eventSendPhoto.emit(false);
          this.cameraError.emit(err);
        }
      );
    } else {
      this.cameraError.emit(true);
    }
  }

  public takePhoto() {

    this.hideCamera();
    const canvas = document.createElement('canvas');
    canvas.setAttribute('width', this.cameraSizes.width + '');
    canvas.setAttribute('height', this.cameraSizes.height + '' );
    canvas.getContext('2d')
    .drawImage(this.camera.nativeElement, 0, 0, this.cameraSizes.width, this.cameraSizes.height);
    canvas.toBlob((blob) => {
      this.blob = blob;
      this.dataUrl = URL.createObjectURL(blob);
      this.image.nativeElement.setAttribute('src', this.dataUrl);
    });
  }

  showCamera() {
    this.enabledCamera = true;
  }

  hideCamera() { this.enabledCamera = false; }

  sendPhoto() {
    this.stream.getVideoTracks()[0].stop();
    const reader = new FileReader();
    reader.onload = () => {
      const file = this.dataURLtoFile(reader.result);
      this.eventSendPhoto.emit(file);
      this.recapture();
    };
    reader.readAsArrayBuffer(this.blob);
  }

  recapture() {
    this.showCamera();
    this.initCamera({ video: true, audio: false });
  }

  positionateCamera() {
    if ( this.enabledCamera ) {
      const posX = (this.camera.nativeElement.offsetWidth - this.cameraSizes.width) / 2;
      this.camera.nativeElement.removeAttribute('style');
      this.camera.nativeElement.setAttribute('style', `position: relative; left:-${posX}px` );
    }
  }

  private dataURLtoFile(dataUrl) {
    const u8arr = new Uint8Array(dataUrl);
    return new File([u8arr], 'filename', { type: this.blob.type });
  }
}
