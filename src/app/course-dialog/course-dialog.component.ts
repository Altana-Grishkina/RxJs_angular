import {AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild, ViewEncapsulation, ChangeDetectionStrategy} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {Course} from "../model/course";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import moment from 'moment';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import { LoadingComponent } from '../loading/loading.component';
import { LoadingService } from '../loading/loading.service';
import { CoursesService } from '../services/courses.service';
import { MessagesService } from '../messages/messages.service';

@Component({
    selector: 'course-dialog',
    templateUrl: './course-dialog.component.html',
    styleUrls: ['./course-dialog.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    providers: [LoadingService, MessagesService],
    standalone: false
})
export class CourseDialogComponent implements AfterViewInit {

    form: FormGroup;

    course:Course;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<CourseDialogComponent>,
        private loadingService: LoadingService,
        private coursesService: CoursesService,
        @Inject(MAT_DIALOG_DATA) course:Course,
        private messagesService: MessagesService
    ) {

        this.course = course;

        this.form = fb.group({
            description: [course.description, Validators.required],
            category: [course.category, Validators.required],
            releasedAt: [moment(), Validators.required],
            longDescription: [course.longDescription,Validators.required]
        });

    }

    ngAfterViewInit() {

    }

    save() {

      const changes = this.form.value;

      const saveCourses$ = this.coursesService.saveCourse(this.course.id, changes)
        .pipe(
            catchError(err => {
                const message = "Could not save course";
                console.log(message, err);
                this.messagesService.showErrors(message);
                return throwError(err);
            })
        );

      this.loadingService.showLoaderUntilCompleted(saveCourses$)
        .subscribe(val => {
            this.dialogRef.close(val);
        }
    );

    }

    close() {
        this.dialogRef.close();
    }

}
