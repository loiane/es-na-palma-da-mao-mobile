import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { UIState } from './ui-state';


@Injectable()
export class UIStateService {

  
  /**
   * 
   * 
   * @type {number}
   */
  public onGoingBackendRequests: number = 0;

  /**
   * 
   * 
   * @private
   */
  private loadingSubject = new Subject<UIState>();

  /**
   * 
   * 
   * @readonly
   * @private
   */
  public get state() {
    return this.loadingSubject.asObservable();
  }

  /**
   * 
   */
  public startBackendAction() {
    this.onGoingBackendRequests += 1;
    this.loadingSubject.next( <UIState>{
      startedBackendRequest: true,
      completedBackendRequest: false,
      onGoingBackendRequests: this.onGoingBackendRequests
    });
  }


  /**
   * 
   */
  public endBackendAction() {
    this.onGoingBackendRequests -= 1;
    this.loadingSubject.next( <UIState>{
      startedBackendRequest: false,
      completedBackendRequest: true,
      onGoingBackendRequests: this.onGoingBackendRequests
    });
  }
}