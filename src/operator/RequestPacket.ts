export interface RequestPacket {
    url: string;
    method: string;
    headers: Record<string, string>;
    body: string;
  }
