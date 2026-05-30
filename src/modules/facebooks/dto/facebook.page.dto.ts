interface FacebookPageDto {
  token: string;
  name: string;
  id: string;
  tasks: string[];
  registered?: boolean;
}

export type { FacebookPageDto };
