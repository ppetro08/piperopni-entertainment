import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TimeService {
  constructor() {}

  minutesToHoursMinutes(timeInMinutes: number): string {
    const hours = Math.floor(timeInMinutes / 60);
    const minutes = timeInMinutes % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  }
}
