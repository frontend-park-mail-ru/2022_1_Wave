export default class StringWrapper {
  readonly data: string;

  domNode: Text | null;

  constructor(data: string, domNode?: Text) {
    this.data = data;
    this.domNode = domNode ?? null;
  }

  toString(): string {
    return this.data;
  }
}
