import { Switch } from './Switch';
import { Module } from './Module';

export interface Switchboard {
  id: string;
  repoName: string;
  switches: Switch[];
  modules?: Module[];
}
