import { ApiProperty } from '@nestjs/swagger';

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

interface FacebookPageRegisterMetaAppResponse {
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

export type {
  FacebookMeAccountsGrapResponse,
  FacebookPageGrap,
  FacebookPageRegisterMetaAppResponse,
};
