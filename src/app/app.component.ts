import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import { LoadingService } from './loading/loading.service';
import { MessagesService } from './messages/messages.service';



@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false,
    providers: [
      LoadingService,
      MessagesService]
})
export class AppComponent implements  OnInit {

    constructor() {

    }

    ngOnInit() {


    }

  logout() {

  }

}
