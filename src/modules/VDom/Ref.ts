import Component from './Component';

type RefTypes = HTMLElement | Component;

export default class Ref<T extends RefTypes> {
  public instance: T;
}
