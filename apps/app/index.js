/**
 * @format
 */
import 'reflect-metadata';
import { AppRegistry } from 'react-native';
import '@core/shared';
import '@core/presentation';
import App from './App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
