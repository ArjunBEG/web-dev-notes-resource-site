// Copyright 2020 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.




/*! THIS FILE IS AUTO-GENERATED */

import {AuthPlus, getAPI, GoogleConfigurable} from 'googleapis-common';
import {vectortile_v1} from './v1';

export const VERSIONS = {
  v1: vectortile_v1.Vectortile,
};

export function vectortile(version: 'v1'): vectortile_v1.Vectortile;
export function vectortile(
  options: vectortile_v1.Options
): vectortile_v1.Vectortile;
export function vectortile<T = vectortile_v1.Vectortile>(
  this: GoogleConfigurable,
  versionOrOptions: 'v1' | vectortile_v1.Options
) {
  return getAPI<T>('vectortile', versionOrOptions, VERSIONS, this);
}

const auth = new AuthPlus();
export {auth};
export {vectortile_v1};
export {
  AuthPlus,
  GlobalOptions,
  APIRequestContext,
  GoogleConfigurable,
  StreamMethodOptions,
  GaxiosPromise,
  MethodOptions,
  BodyResponseCallback,
} from 'googleapis-common';