import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfirmRegistration } from '../authentication/model/confirm-registration.model';
import { LoginModel } from '../authentication/model/login.model';
import { RegisterModel } from '../authentication/model/register.model';
import { MessageResponse } from './models/message-response.model';
import { AuthenticationResponseModel, UserModel } from './models/user.model';

@Injectable()
export class PiperopniEntertainmentService {
  constructor(private http: HttpClient) {}

  confirmRegistration(
    confirmRegistration: ConfirmRegistration
  ): Observable<MessageResponse> {
    return this.http.post<MessageResponse>(
      `/api/authenticate/confirmregistration?userId=${confirmRegistration.userId}&token=${confirmRegistration.token}`,
      confirmRegistration
    );
  }

  getCurrentUser(): Observable<UserModel> {
    return this.http.get<UserModel>(`/api/currentUser`);
  }

  login(login: LoginModel): Observable<AuthenticationResponseModel> {
    return this.http.post<AuthenticationResponseModel>(
      `/api/authenticate/login`,
      login
    );
  }

  register(register: RegisterModel): Observable<MessageResponse> {
    return this.http.post<MessageResponse>(
      `/api/authenticate/register`,
      register
    );
  }
}
