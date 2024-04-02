import { Component, DestroyRef } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DataService } from '../../services/data.service';
import { take } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { formatTime } from './controls.helpers';

@Component({
  selector: 'app-controls',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatCardModule, MatButtonModule, MatDatepickerModule, FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './controls.component.html',
  styleUrl: './controls.component.scss'
})
export class ControlsComponent {

  form = new FormGroup({
    date: new FormControl(new Date(), { nonNullable: true }),
    coal: new FormControl<number | null>(null, [Validators.min(0), Validators.max(1000), Validators.required]),
    gas: new FormControl<number | null>(null, [Validators.min(0), Validators.max(1000), Validators.required]),
  })

  constructor(private dataService: DataService, private destroyRef: DestroyRef) { }

  updateFormDate(selectedDate: Date): void {
    this.dataService
        .getRateCalendar()
        .pipe(take(1))
        .subscribe((calendar) => {
          const rate = calendar.get(formatTime(selectedDate))
          if (rate) {
            this.form.patchValue({
              gas: rate.gas,
              coal: rate.coal,
              date: selectedDate,
            })
          } else {
            this.form.patchValue({ date: selectedDate })
          }
        })
  }

  submit(): void {
    const formValue = this.form.value,
      date = formatTime(formValue.date || new Date()),
      gas = formValue.gas ? Number(formValue.gas) : 0,
      coal = formValue.coal ? Number(formValue.coal) : 0,
      total = gas + coal;

    const rate = { gas, coal, total };

    this.dataService.addRate(date, rate);
  }
}
