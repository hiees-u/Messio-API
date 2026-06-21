interface Category {
  id: string;
  name: string;
}

interface PageGrapResponse {
  access_token: string;
  category: string;
  category_list: Category[];
  name: string;
  id: string;
  tasks: string[];
}

interface FacebookPaging {
  cursors: {
    before: string;
    affter: string;
  };
}

interface PagesGraphResponse {
  data: PageGrapResponse[];
  paging: FacebookPaging;
}

export type { PagesGraphResponse, PageGrapResponse };
