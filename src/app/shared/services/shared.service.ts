import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ClickEditUser } from '../models/click-edit-user.model';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private subject = new Subject<any>()

  constructor() { }

  sendClickAddUserEvent(action: string) {
    this.subject.next(action);
  }

  sendClickEditUserEvent(action: string, userId: string) {
    this.subject.next({
      action: action,
      userId: userId
    });
  }

  getClickAddUserEvent(): Observable<string> {
    return this.subject.asObservable();
  }

  getClickEditUserEvent(): Observable<ClickEditUser> {
    return this.subject.asObservable();
  }

}
