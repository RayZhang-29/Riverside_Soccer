import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'timeRange'
})
export class TimeRangePipe implements PipeTransform {
  transform(start: number, end: number): number[] {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }
}
