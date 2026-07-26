import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { JwtAuthGuard } from 'src/common/auth/guards/jwt-auth.guard';
import { ChatsService } from './chats.service';

import type { RequestWithUser } from 'src/common/auth/dto/request-with-user.type';
import type { SendMessagesRequest } from './dto/chats.send-message.request.dto';

@Controller('chats')
export class ChatsController {
  constructor(private readonly chatService: ChatsService) {}

  @Post('sended')
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  sendMessage(
    @Req() req: RequestWithUser,
    @Body() messages: SendMessagesRequest,
  ) {
    const result = this.chatService.handlerSendedMessage(
      Number(req.user.sub),
      messages.id,
    );

    return {
      result,
    };
  }
}
// viets fun seen, action messageesỨ
