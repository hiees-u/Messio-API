type MessagesCreate = {
  mid: string;
  roomId: number;
  readed: boolean;
  text: string;
  type?: string | null;
};

export type { MessagesCreate };
