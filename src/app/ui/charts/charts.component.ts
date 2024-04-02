import { Component, DestroyRef } from "@angular/core";
import { NgApexchartsModule } from "ng-apexcharts";
import { DataService } from "../../services/data.service";
import { CalendarRatesToChartsData } from "./charts.helpers";
import { AsyncPipe } from "@angular/common";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [NgApexchartsModule, AsyncPipe],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.scss'
})
export class ChartsComponent {
  chartsData = this.dataService.getRateCalendar().pipe(
    CalendarRatesToChartsData,
    takeUntilDestroyed(this.destroyRef)
    )

  constructor(private dataService: DataService, private destroyRef: DestroyRef) {}
  
}
