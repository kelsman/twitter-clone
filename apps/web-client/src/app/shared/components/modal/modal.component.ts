import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { AppState } from '../../../store';
import { ModalActions } from '../../../store/layout';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() modalId: string;
  destroy$: Subject<void> = new Subject<void>();

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  closeModal() {
    this.store.dispatch(ModalActions.closeModal({ modalId: this.modalId }));
  }
}
