import { Injectable } from '@nestjs/common';

@Injectable()
export class JsonUtil {
  stringify(data: any) {
    return JSON.stringify(data);
  }

  prettyStringify(data: any) {
    return JSON.stringify(data, null, 2);
  }
}
