import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'pip-confirm-registration',
  templateUrl: './confirm-registration.component.html',
  styleUrls: ['./confirm-registration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmRegistrationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
