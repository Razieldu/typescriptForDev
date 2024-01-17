import { AES, enc } from 'crypto-js';

interface UserInfo {
  displayName: string;
  email: string;
  photoURL: string | null;
  emailVerified: boolean;
  uid: string;
}

// 加密密钥
const encryptionKey: string = 'THISISASECRETKEY';

// 将用户信息加密
export const encryptUserInfo = (userInfo: UserInfo): string => {
  const encryptedUserInfo: string = AES.encrypt(JSON.stringify(userInfo), encryptionKey).toString();
  return encryptedUserInfo;
};

// 将用户信息解密
export const decryptUserInfo = (encryptedUserInfo: string): UserInfo => {
  const decryptedBytes = AES.decrypt(encryptedUserInfo, encryptionKey);
  const decryptedUserInfo: UserInfo = JSON.parse(decryptedBytes.toString(enc.Utf8));
  return decryptedUserInfo;
};

// 存储加密后的用户信息到 localStorage
export const saveEncryptedUserInfoToLocal = (user: any): void => {
  const userInfo: UserInfo = {
    displayName: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
    emailVerified: user.emailVerified,
    uid: user.uid,
  };

  // 加密用户信息
  const encryptedUserInfo: string = encryptUserInfo(userInfo);

  // 存储加密后的用户信息在 localStorage
  localStorage.setItem('encryptedUserInfo', encryptedUserInfo);
};

// 从 localStorage 中获取并解密用户信息
export const getDecryptedUserInfoFromLocal = (): UserInfo | null => {
  const encryptedUserInfo: string | null = localStorage.getItem('encryptedUserInfo');

  if (encryptedUserInfo) {
    // 解密用户信息
    const decryptedUserInfo: UserInfo = decryptUserInfo(encryptedUserInfo);
    return decryptedUserInfo;
  }

  return null;
};

export const removeEncryptedUserInfoFromLocal = (): void => {
    localStorage.removeItem('encryptedUserInfo');
  };