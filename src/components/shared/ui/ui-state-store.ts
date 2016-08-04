import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { UIState } from './ui-state';

@Injectable()
export class UIStateStore {

  private readonly initialState = {
    startedBackendRequest: false,
    completedBackendRequest: false,
    onGoingBackendRequests: 0
  };

  /**
   * 
   * 
   * @private
   * @type {BehaviorSubject<UIState>}
   */
  private uiState: BehaviorSubject<UIState> = new BehaviorSubject<UIState>( this.initialState );


  /**
   * 
   * 
   * @readonly
   * @private
   */
  public get state() {
    return this.uiState.asObservable();
  }

  /**
   * 
   */
  public startBackendAction() {
    this.uiState.next( {
      startedBackendRequest: true,
      completedBackendRequest: false,
      onGoingBackendRequests: this.uiState.value.onGoingBackendRequests + 1
    } );
  }


  /**
   * 
   */
  public endBackendAction() {
    this.uiState.next( {
      startedBackendRequest: false,
      completedBackendRequest: true,
      onGoingBackendRequests: this.uiState.value.onGoingBackendRequests - 1
    } );
  }
}