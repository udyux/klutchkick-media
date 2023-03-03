import { TinyEmitter } from 'tiny-emitter';

export const globalEventBus = new TinyEmitter();

export const createLocalEventBus = () => new TinyEmitter();
