import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from '../components/popover/popover.component';
// import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from '@ionic-native/media-capture/ngx';
import { MediaObject } from '@ionic-native/media/ngx';
import { File } from '@ionic-native/file/ngx';
import { Media } from '@ionic-native/media/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-private-chat',
  templateUrl: './private-chat.page.html',
  styleUrls: ['./private-chat.page.scss'],
})
export class PrivateChatPage implements OnInit {

  username: string = 'Aashray Jain';
  time = '11:45 AM'
  toggled: boolean = false;
  message: string;
 
  status: string;
  audioFile: MediaObject;

  user;
  path;

  

  constructor(private popoverController: PopoverController, 
    private file: File, private media: Media, private router: Router) { }

  
  ngOnInit() {
    this.audioFile = this.media.create(this.file.externalRootDirectory + '/audiofile.mp3');
    this.user = this.router.getCurrentNavigation().extras.state.user;
    this.username = this.user.username;
    this.path = this.router.getCurrentNavigation().extras.state.path;
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }


  handleSelection(event) {
    console.log('Inside picker')
    this.message += event.char;
  }

  startRecording() {
    this.audioFile.startRecord();
    this.status = "recording..."
    console.log('Recording..')
  }

  stopRecording() {
    this.audioFile.stopRecord();
    this.status = "stopped";
    console.log('Stopping..')
  }
  

}
