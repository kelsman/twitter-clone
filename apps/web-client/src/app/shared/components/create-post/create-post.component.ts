import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { EmojiEvent } from '@ctrl/ngx-emoji-mart/ngx-emoji';

@Component({
  selector: 'create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent implements OnInit {
  selectedFile: string | ArrayBuffer | null = null;
  postText = new FormControl('', Validators.required);
  showEmoji: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  get textVal() {
    return this.postText.value;
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
}
