import { Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { JwtAuthGuard } from 'src/common/auth/guards/jwt-auth.guard';
import { ChatsService } from './chats.service';

import type { RequestWithUser } from 'src/common/auth/dto/request-with-user.type';
import { SendMessagesRequest } from './dto/chats.send-message.request.dto';

@Controller('chats')
export class ChatsController {
  constructor(private readonly chatService: ChatsService) {}

  @Post('sended/:id')
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  async sendMessage(
    @Req() req: RequestWithUser,
    @Param() messages: SendMessagesRequest,
  ) {
    const result = await this.chatService.handlerSendedMessage(
      Number(req.user.id),
      messages.id,
    );

    return {
      result,
    };
  }
}
// viets fun seen, action messageesỨ
