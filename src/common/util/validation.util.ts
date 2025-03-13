import { Injectable } from '@nestjs/common';

interface IValidationRegexObj {
  email: RegExp;
  phoneNum: {
    kr: RegExp;
  };
  telNum: {
    kr: RegExp;
  };
}

@Injectable()
export class ValidationUtil {
  validationRegex: IValidationRegexObj = {
    email:
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
    phoneNum: {
      kr: /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/,
    },
    telNum: {
      kr: /^(070|02|0[3-9]{1}[0-9]{1})[0-9]{3,4}[0-9]{4}$/,
    },
  };

  getRegexp(type: string, location: string): RegExp {
    if (location === 'kr') return this.validationRegex[type][location];
    else return this.validationRegex[type];
  }

  async checkRegexp(data: string, type: string, location: string) {
    const regexp = this.getRegexp(type, location);

    return regexp.test(data);
  }
}
