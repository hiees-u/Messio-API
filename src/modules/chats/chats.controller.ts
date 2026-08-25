import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { JwtAuthGuard } from 'src/common/auth/guards/jwt-auth.guard';
import { ChatsService } from './chats.service';

import type { RequestWithUser } from 'src/common/auth/dto/request-with-user.type';
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
    @Param('id', ParseIntPipe) messages: number,
  ) {
    const result = await this.chatService.handlerSendedMessage(
      Number(req.user.id),
      messages,
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
