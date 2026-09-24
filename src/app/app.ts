import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CustomCursorComponent } from './shared/ui/custom-cursor/custom-cursor.component';

@Component({
  imports: [RouterOutlet, CustomCursorComponent],
  selector: 'app-root',
  templateUrl: './app.html',
})
export class App {}
