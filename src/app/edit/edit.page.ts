import { Component, OnInit } from '@angular/core';
import { SongService } from './../services/song.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-edit-song',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  updateSongForm: FormGroup;
  id: any;

  constructor(
    private songAPI: SongService,
    private actRoute: ActivatedRoute,
    private router: Router,
    public fb: FormBuilder
  ) {
    this.id = this.actRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.getOne(this.id);
    this.updateSongForm = this.fb.group({
      song_name: [''],
      artist: ['']
    });
  }

  getOne(id) {
    this.songAPI.getOne(id).subscribe(res => {
      this.updateSongForm.setValue({
        song_name: res['title'],
        artist: res['artist']
      });
    });
  }

  updateForm() {
    if (!this.updateSongForm.valid) {
      return false;
    } else {
      this.songAPI.update(this.id, this.updateSongForm.value)
        .subscribe((res) => {
          console.log(res)
          this.updateSongForm.reset();
          this.router.navigate(['/home']);
        });
    }
  }

}
