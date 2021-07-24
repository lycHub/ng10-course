import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {NgForm} from '@angular/forms';

class Profile {
  constructor(
    public firstName: string,
    public lastName: string,
    public mobile: string,
    public password: string,
    public rePassword: string
  ) {}
}

@Component({
  selector: 'app-profile-editor',
  templateUrl: './profile-editor.component.html',
  styles: [
    `
        .profile-editor {
            width: 500px;
            margin: 100px auto;
        }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileEditorComponent implements OnInit {
  model = new Profile('', '', '', '', '');

  constructor() { }

  ngOnInit(): void {
  }


  onSubmit(f: NgForm) {
    console.log('submit value', f.value);
    // console.log('submit valid', f.valid);
  }

  onReset(f: NgForm) {
    // this.model = new Profile('', '', '', '', '');
    f.reset();
  }

  getError(f: NgForm) {
    // this.model = new Profile('', '', '', '', '');
    console.log(f.form.get('mobile').errors);
  }
}
