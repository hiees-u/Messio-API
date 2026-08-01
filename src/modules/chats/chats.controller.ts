import { Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { JwtAuthGuard } from 'src/common/auth/guards/jwt-auth.guard';
import { ChatsService } from './chats.service';

import type { RequestWithUser } from 'src/common/auth/dto/request-with-user.type';
import { SendMessagesRequest } from './dto/chats.send-message.request.dto';
import { AlertEmailProducer } from 'src/infrastructure/queues/alert-email/alert-email.producer';

@Controller('chats')
export class ChatsController {
  constructor(
    private readonly chatService: ChatsService,
    private readonly alertEmailProducer: AlertEmailProducer,
  ) {}

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

  //
  @Get('test')
  testQueue() {
    void this.alertEmailProducer.createJob('1');
    void this.alertEmailProducer.createJob('2');
    void this.alertEmailProducer.createJob('3');
  }

  @Get('test-cancel')
  testCancelQueue() {
    void this.alertEmailProducer.cancelJob('2');
  }
}
