import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { EmojiEvent } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { AppState } from '../../../store';
import { PostActions, PostSelectors } from '../../../store/post';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent implements OnInit, OnDestroy {
  selectedFile: File;
  previewFile: string | ArrayBuffer | null = null;
  postText: FormControl;
  showEmoji: boolean = false;
  isLoading$: Observable<boolean> = this.store.select(
    PostSelectors.selectLoading
  );
  destroy$: Subject<void> = new Subject<void>();

  @HostListener('document:click', ['$event']) closeEmoji(e) {
    //e.stopPropagation();
    if (this.showEmoji === true) {
      this.showEmoji = false;
    }
  }

  get textVal() {
    return this.postText.value;
  }

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private store: Store<AppState>
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.postText = this.fb.control('', Validators.required);
  }

  handleToggleEmoji(e: Event) {
    e.stopPropagation();
    this.showEmoji = !this.showEmoji;
  }

  handleEmojiSelect($event: EmojiEvent) {
    // add the emoji to the postText control
    this.postText.setValue(this.postText.value + $event.emoji.native);
  }
  handleFileInputChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.selectedFile = target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = () => {
      this.previewFile = reader.result;
    };
  }

  submitTweet(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    const formData = new FormData();
    formData.append('content', this.postText.value);

    if (this.selectedFile) {
      formData.append('file', this.selectedFile);
      this.store.dispatch(PostActions.createPost({ data: formData }));

      // this.postService
      //   .createPost(formData)
      //   .pipe(takeUntil(this.destroy$))
      //   .subscribe(() => {
      //     this.isLoading = false;
      //     this.postText.setValue('');
      //     this.selectedFile = null;
      //     this.previewFile = null;
      //   });
    } else {
      this.store.dispatch(PostActions.createPost({ data: formData }));
      // this.postService
      //   .createPost(formData)
      //   .pipe(
      //     takeUntil(this.destroy$),
      //     catchError(() => {
      //       this.isLoading = false;
      //       return EMPTY;
      //     })
      //   )
      //   .subscribe(() => {
      //     this.isLoading = false;
      //     this.postText.setValue('');
      //     this.selectedFile = null;
      //     this.previewFile = null;
      //   });
    }

    this.previewFile = null;
    this.selectedFile = null;
    this.postText.setValue('');
  }
}
