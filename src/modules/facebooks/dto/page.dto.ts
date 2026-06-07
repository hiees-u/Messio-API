interface PagesDto {
  id: string;
  token: string;
  name: string;
  tasks: string[];
  registered?: boolean;
}

export type { PagesDto };
