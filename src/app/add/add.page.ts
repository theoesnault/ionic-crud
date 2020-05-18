import { Component, OnInit, NgZone } from '@angular/core';
import { SongService } from '../services/song.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  songForm: FormGroup;

  constructor(private songAPI: SongService, private router: Router, public fb: FormBuilder, private zone: NgZone) {
    this.songForm = this.fb.group({
      title: [''],
      artist: ['']
    });
  }

  ngOnInit() {
  }

  onFormSubmit() {
    if (!this.songForm.valid) {
      return false;
    } else {
      this.songAPI.add(this.songForm.value)
        .subscribe((res) => {
          this.zone.run(() => {
            console.log(res);
            this.songForm.reset();
            this.router.navigate(['/home']);
          });
        });
    }
  }

}
