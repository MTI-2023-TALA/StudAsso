import { Component, OnInit } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

interface FileItem {
  name: string;
}

@Component({
  selector: 'stud-asso-formly-file',
  templateUrl: './formly-file.component.html',
})
export class FormlyFileComponent extends FieldType<FieldTypeConfig> implements OnInit {
  multiple = false;
  extensions = '';
  files: FileItem[] = [];

  ngOnInit(): void {
    if (this.to['extensions']) {
      this.extensions = this.to['extensions'] as string;
    }
    if (this.to['multiple']) {
      this.multiple = this.to['multiple'] as boolean;
    }
  }

  onFileSelect(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files) {
      for (let i = 0; i < target.files.length; i++) {
        const file = target.files.item(i);
        if (file) {
          this.files.push({ name: file.name });
        }
      }
    }
  }
}
