import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  Optional,
  Self,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Profile } from '../model/profile';

@Component({
  selector: 'pip-profile-select',
  templateUrl: './profile-select.component.html',
  styleUrls: ['./profile-select.component.css'],
  providers: [
    { provide: MatFormFieldControl, useExisting: ProfileSelectComponent },
  ],
})
export class ProfileSelectComponent
  implements OnDestroy, MatFormFieldControl<Profile>, ControlValueAccessor
{
  @Input()
  public set profiles(value: Profile[] | null) {
    if (value === null) {
      value = [];
    } else {
      value.forEach((p: Profile) => {
        this.profileMap.set(p.id, p);
      });
    }

    if (this.profileId && value === null) {
      this.setValueByProfileId(this.profileId);
    }

    this._profiles = value;
  }
  public get profiles(): Profile[] {
    return this._profiles;
  }
  private _profiles: Profile[] = [];

  @Input() public set disabled(value) {
    this._disabled = coerceBooleanProperty(value);
    this.stateChanges.next();
  }

  public get disabled() {
    return this._disabled;
  }

  private _disabled = false;

  @Input()
  set required(req) {
    this._required = coerceBooleanProperty(req);
    this.stateChanges.next();
  }

  get required() {
    return this._required;
  }

  private _required = true;

  @ViewChild(MatSelect) matSelect?: MatSelect;

  autofilled? = false;

  controlType?: string;

  empty = false;

  errorState = false;

  focused = false;

  id = 'pip-profile-select-input';

  placeholder = '';

  shouldLabelFloat = true;

  stateChanges = new Subject<void>();

  userAriaDescribedBy?: string | undefined;

  value: Profile | null = null;

  private profileId: number | null = null;

  private profileMap = new Map<number, Profile>();

  private destroyed$ = new Subject<void>();

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange: () => void = () => {};

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouched: () => void = () => {};

  constructor(
    private elementRef: ElementRef,
    @Optional() @Self() public ngControl: NgControl,
    private focusMonitor: FocusMonitor
  ) {
    if (ngControl != null) {
      ngControl.valueAccessor = this;
    }
    this.focusMonitor
      .monitor(this.elementRef.nativeElement, true)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((origin) => {
        this.focused = !!origin;
        this.stateChanges.next();
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }

  private setValueByProfileId(profileId: number): void {
    const profile: Profile | undefined = this.profileMap.get(profileId);
    if (profile) {
      this.setValue(profile);
    }
  }

  private setValue(profile: Profile): void {
    this.value = profile;
    this.stateChanges.next();
  }

  // #region ValueControlAccessor implementation
  writeValue(profileId: number): void {
    this.profileId = profileId;
    const profile: Profile | undefined = this.profileMap.get(profileId);
    if (profile !== undefined) {
      this.setValue(profile);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  // #endregion

  // #region MatFormControl implementation
  onContainerClick(event: MouseEvent): void {
    if (
      (event.target as Element).tagName.toLowerCase() != 'input' &&
      this.matSelect !== undefined
    ) {
      this.matSelect.open();
      this.onTouched();
    }
  }

  setDescribedByIds(ids: string[]): void {
    const controlElement = this.elementRef.nativeElement;
    controlElement.setAttribute('aria-describedby', ids.join(' '));
  }
  // #endregion
}
