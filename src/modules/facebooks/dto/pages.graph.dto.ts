import { ApiProperty } from '@nestjs/swagger';

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

interface PageRegisterAppResponse {
  success?: boolean;
  error?: FacebookPageRegisterMetaAppError;
}

interface FacebookPageRegisterMetaAppError {
  message: string;
  type: string;
  code: number;
  error_subcode: number;
  fbtrace_id: string;
}

export class RegisterPageDto {
  @ApiProperty({
    type: [String],
    example: ['123456789', '987654321'],
  })
  pageIds!: string[];
}

export type { PagesGraphResponse, PageGrapResponse, PageRegisterAppResponse };
