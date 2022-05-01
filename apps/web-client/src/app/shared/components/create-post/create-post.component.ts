import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { EmojiEvent } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { Subject, takeUntil } from 'rxjs';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent implements OnInit , OnDestroy{
  selectedFile: string | ArrayBuffer | null = null;
  postText: FormControl;
  showEmoji: boolean = false;
  destroy$: Subject<void> = new Subject<void>();

  get textVal() {
    return this.postText.value;
  }

  constructor(private fb: FormBuilder, private postService: PostService) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.postText = this.fb.control('', Validators.required);
  }

  handleToggleEmoji() {
    this.showEmoji = !this.showEmoji;
  }

  handleEmojiSelect($event: EmojiEvent) {
    // add the emoji to the postText control
    this.postText.setValue(this.postText.value + $event.emoji.native);
  }
  handleFileInputChange(event: Event) {}

  addImageToPost(event: Event) {
    const reader = new FileReader();
    const target = event.target as HTMLInputElement;
    target.files instanceof FileList
      ? reader.readAsDataURL(target.files[0])
      : null;
    reader.onerror = () => console.log('error');
    reader.onload = () => {
      this.selectedFile = reader.result;
    };
  }

  submitTweet(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.postService.createPost({ content: this.textVal }).pipe(takeUntil(this.destroy$)).subscribe()
  }
}
