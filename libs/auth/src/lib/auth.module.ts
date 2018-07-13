import { NgModule, InjectionToken } from '@angular/core';

export const AUTH = new InjectionToken<any>('auth');

// @dynamic
@NgModule()
export class AuthModule {}
