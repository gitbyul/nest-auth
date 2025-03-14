import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import * as _ from 'lodash';
import { Observable, tap } from 'rxjs';
import { LogUtil } from 'src/config/log/log.util';

@Injectable()
export class LogInterceptor implements NestInterceptor {
  constructor(private readonly logger: LogUtil) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const { method, url, body, query } = request;
    const className = context.getClass().name;
    const handlerName = context.getHandler().name;

    let logParam = { query: '', body: '' };
    logParam.query = _.cloneDeep(query);
    logParam.body = _.cloneDeep(body);

    this.logger.info(
      `[Request][${method}][${url}][${className}][${handlerName}]=>${JSON.stringify(logParam)}`,
    );

    return next.handle().pipe(
      tap((data) => {
        this.logger.info(
          `[Response][${className}][${handlerName}]=>${JSON.stringify(data)}`,
        );
      }),
    );
  }
}
