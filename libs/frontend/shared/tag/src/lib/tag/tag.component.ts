import { Component, EventEmitter, Input, Output } from '@angular/core';

import { TagType } from './tag.model';

@Component({
  selector: 'stud-asso-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
})
export class TagComponent {
  TagType: typeof TagType = TagType;
  @Input() type: string = TagType.Default;
  @Input() message = 'Ceci est un tag';

  @Input() icon = 'x';
  @Input() shouldDisplayIcon = false;

  @Input() shouldBeClickable = false;
  @Input() value = '';
  @Output() clickTag = new EventEmitter<string>();

  public onClickCross() {
    if (this.shouldBeClickable) {
      this.clickTag.emit(this.value);
    }
  }
}
