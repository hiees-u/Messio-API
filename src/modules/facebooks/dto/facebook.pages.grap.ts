interface Category {
  id: string;
  name: string;
}

interface FacebookPageGrap {
  access_token: string;
  category: string;
  category_list: Category[];
  name: string;
  id: string;
  tasks: string[];
}

interface FacebookPagingCursors {
  before: string;
  affter: string;
}

interface FacebookPaging {
  cursors: FacebookPagingCursors;
}

interface FacebookMeAccountsGrapResponse {
  data: FacebookPageGrap[];
  paging: FacebookPaging;
}
export type { FacebookMeAccountsGrapResponse, FacebookPageGrap };
