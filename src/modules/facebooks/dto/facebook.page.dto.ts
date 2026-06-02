interface FacebookPageDto {
  token: string;
  name: string;
  id: string;
  tasks: string[];
  registered?: boolean;
}

interface FacebookPageDatabaseDTO {
  token: string;
  name: string;
  pageId: string;
}

export type { FacebookPageDto, FacebookPageDatabaseDTO };
