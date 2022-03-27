export type HandlerDescriptor = {
  eventName: string,
  handler: EventListener,
  useCapture: boolean,
};

export type HandlersTable = Map<string, HandlerDescriptor>;

export const createHandlersStable = (): HandlersTable => (
  new Map<String, HandlerDescriptor>() as HandlersTable
);
