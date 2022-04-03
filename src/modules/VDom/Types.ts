export type HandlerDescriptor = {
  eventName: string,
  handler: EventListener,
  useCapture: boolean,
};

export type HandlersTable = Map<string, HandlerDescriptor>;

export const createHandlersTable = (): HandlersTable => (
  new Map<String, HandlerDescriptor>() as HandlersTable
);
