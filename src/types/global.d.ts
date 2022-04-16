type CustomNodeJsGlobal = {
  requestId?: string;
};

declare type Global = typeof global & CustomNodeJsGlobal;
