import { Injectable } from '@nestjs/common';
import { Message } from '@manager-helper/api-interfaces';

@Injectable()
export class AppService {
  getData(): Message {
    return { message: 'Welcome to api!' };
  }
}
