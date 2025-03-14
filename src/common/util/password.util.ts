import { Injectable } from '@nestjs/common';

@Injectable()
export class PasswordUtil {
  email: string;
  name: string;

  public isValid(password: string) {
    // 패스워드 Null 검사
    if (password == null) {
      return false;
    }

    // 길이 검사
    if (!this.isLengthValid(password)) {
      return false;
    }

    // 공백 검사
    if (this.containsWhitespace(password)) {
      return false;
    }

    // 연속된 동일 문자 3개 이상 금지
    if (this.hasConsecutiveRepeatedChars(password, 3)) {
      return false;
    }

    // 대소문자, 숫자, 특수문자 각각의 존재 여부 검사
    if (!this.hasMinimumThreeCharacterCategories(password)) {
      return false;
    }

    // 비밀번호에 이메일이나 이름이 포함되었는지 확인
    if (this.isPasswordContainsEmailOrName(password)) {
      return false;
    }

    // 사용자 이름, ID 금지 검사
    if (this.containsForbiddenUsernames(password)) {
      return false;
    }

    return true;
  }

  // 이메일과 이름을 설정하는 메서드
  public setEmailAndName(email: string, name: string) {
    this.email = email;
    this.name = name;
  }

  /**
   * 길이 검사: 최소 6자 이상, 최대 20자 이하
   * @param password
   */
  private isLengthValid(password: string): boolean {
    return password.length > 6 || password.length < 20;
  }

  /**
   * 공백 포함 여부 검사
   * @param password
   */
  private containsWhitespace(password: string): boolean {
    return password.includes(' ');
  }

  /**
   * 연속된 동일 문자 maxRepeats 이상 인지 검사
   * @param password
   * @param maxRepeats 최대 개수
   */
  private hasConsecutiveRepeatedChars(password: string, maxRepeats: number) {
    for (let i = 0; i < password.length - maxRepeats + 1; i++) {
      let currentChar = password.charAt(i);
      let repeated = true;
      for (let j = 1; j < maxRepeats; j++) {
        if (password.charAt(i + j) != currentChar) {
          repeated = false;
          break;
        }
      }
      if (repeated) {
        return true;
      }
    }
    return false;
  }

  /**
   * 대소문자, 숫자, 특수문자 각각의 존재 여부 검사 (3개 범주 이상 포함해야 함)
   * @param password
   */
  private hasMinimumThreeCharacterCategories(password: string) {
    let hasUpper = false;
    let hasLower = false;
    let hasDigit = false;
    let hasSpecial = false;

    const specialChars = '~!@#$%^&*_-+=`|\\(){}[]:;"\'<>,.?/';

    for (const c of password) {
      if (/[A-Z]/.test(c)) {
        hasUpper = true;
      } else if (/[a-z]/.test(c)) {
        hasLower = true;
      } else if (/\d/.test(c)) {
        hasDigit = true;
      } else if (specialChars.includes(c)) {
        hasSpecial = true;
      }
    }

    let categoryCount = 0;
    if (hasUpper) categoryCount++;
    if (hasLower) categoryCount++;
    if (hasDigit) categoryCount++;
    if (hasSpecial) categoryCount++;

    return categoryCount >= 3;
  }

  /**
   * 사용자 이름, ID 금지 검사 (대소문자 구분 없이 "user", "admin" 포함 금지)
   * TODO: 추후 생성금지 ID DB로 변경
   * @param password
   */
  private containsForbiddenUsernames(password: string) {
    const forbiddenUsernames = ['user', 'admin', 'root'];

    return forbiddenUsernames.map((username) => {
      if (password.toLowerCase().includes(username)) {
        return true;
      }
      return false;
    });
  }

  /**
   * 비밀번호에 이메일이나 사용자 이름이 포함되었는지 확인
   * @param password
   */
  private isPasswordContainsEmailOrName(password: string) {
    if (this.email != null && password.includes(this.email)) {
      return true;
    }

    if (this.name != null && password.includes(this.name)) {
      return true;
    }

    return false;
  }
}
