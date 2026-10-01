import { inject, Injectable } from '@angular/core';
import { UserModel } from '../models/auth/user-model';
import { LocalStorageKeys } from '../models/local-storage-keys';
import { NavigationService } from './navigation.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {
  private readonly storageService = inject(StorageService);
  private readonly navigationService = inject(NavigationService);

  private _currentUser: UserModel;

  public get currentUser(): UserModel {
    return this._currentUser;
  }

  constructor() {
    this._currentUser = this.storageService.getValue<UserModel>(LocalStorageKeys.UserId);
    if (!this._currentUser) {
      this.navigationService.navigateToLoginPage();
    }
  }

  setUser(id: number, name: string, accessToken: string) {
    this._currentUser = { id, email: name };
    this.storageService.saveValue(LocalStorageKeys.UserId, JSON.stringify(this._currentUser));
    this.storageService.saveValue(LocalStorageKeys.Token, accessToken);
  }
}
