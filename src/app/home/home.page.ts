import { Component, OnInit } from '@angular/core';
import { SongService } from '../services/song.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {
  Songs: any = [];

  constructor(
    private songService: SongService
  ) {
  }

  ngOnInit() { }

  ionViewDidEnter() {
    this.songService.getAll().subscribe((res) => {
      console.log(res);
      this.Songs = res;
    });
  }

  deleteSong(song, position) {
    if (window.confirm('Do you want to delete this song ?')) {
      this.songService.delete(song._id)
        .subscribe(() => {
          this.Songs.splice(position, 1);
          console.log('Song deleted!');
        }
        );
    }
  }
}
