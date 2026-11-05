'use strict';
// Checks the App Store / Google Play requirements that live in this repository, so a store build is not
// rejected for something we could have caught: real app IDs, icon sizes, no transparency in the iOS icon.
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const app = JSON.parse(fs.readFileSync(path.join(root, 'app.json'), 'utf8')).expo;
const png = (rel) => {
  const b = fs.readFileSync(path.join(root, rel));
  assert.equal(b.toString('hex', 0, 8), '89504e470d0a1a0a', rel + ' is not a PNG');
  return { w: b.readUInt32BE(16), h: b.readUInt32BE(20), depth: b[24], colorType: b[25] };
};

test('app IDs are real and the same on both stores (they can never change after the first upload)', () => {
  assert.equal(app.ios.bundleIdentifier, 'in.kiro.admin');
  assert.equal(app.android.package, 'in.kiro.admin');
  assert.doesNotMatch(JSON.stringify(app), /yourcompany|example/i);
});

test('versions are set for both stores', () => {
  assert.match(app.version, /^\d+\.\d+\.\d+$/);
  assert.ok(Number.isInteger(app.android.versionCode) && app.android.versionCode >= 1);
  assert.match(app.ios.buildNumber, /^\d+$/);
});

test('App Store icon: 1024 x 1024, no transparency channel', () => {
  const i = png(app.icon);
  assert.deepEqual([i.w, i.h], [1024, 1024]);
  assert.equal(i.colorType, 2, 'must be RGB without alpha: Apple rejects icons with an alpha channel');
});

test('Android adaptive icon and splash image exist at 1024 x 1024', () => {
  for (const rel of [app.android.adaptiveIcon.foregroundImage, app.plugins.find((p) => Array.isArray(p) && p[0] === 'expo-splash-screen')[1].image]) {
    const i = png(rel);
    assert.deepEqual([i.w, i.h], [1024, 1024], rel);
  }
});

test('Google Play listing icon: 512 x 512', () => {
  const i = png('assets/store-icon-512.png');
  assert.deepEqual([i.w, i.h], [512, 512]);
});

test('Android asks for no extra permissions; iOS export compliance answered (standard HTTPS only)', () => {
  assert.deepEqual(app.android.permissions, []);
  assert.equal(app.ios.infoPlist.ITSAppUsesNonExemptEncryption, false);
});

test('store builds need an https server address, never a secret in eas.json', () => {
  const eas = JSON.parse(fs.readFileSync(path.join(root, 'eas.json'), 'utf8'));
  const txt = JSON.stringify(eas);
  assert.doesNotMatch(txt, /password|secret|token|key|postgres:\/\//i);
  assert.equal(eas.build.production.android.buildType, 'app-bundle'); // Google Play needs an .aab
});
