/**
 * @format
 */
import 'reflect-metadata';
import { AppRegistry } from 'react-native';
import 'react-native-url-polyfill/auto';
import { App } from '@core/presentation';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
