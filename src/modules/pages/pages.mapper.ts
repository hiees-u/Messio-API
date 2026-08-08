import { Injectable } from '@nestjs/common';

import { FaceBookPage } from 'src/generated/prisma/client';
import { CreatePageResponse } from './dto/createPage.response';

@Injectable()
export class PageMapper {
  toCreateResponse(page: FaceBookPage): CreatePageResponse {
    return {
      id: page.id,
      name: page.name,
    };
  }

  toCreateResponseList(pages: FaceBookPage[]): CreatePageResponse[] {
    return pages.map((page) => this.toCreateResponse(page));
  }
}
