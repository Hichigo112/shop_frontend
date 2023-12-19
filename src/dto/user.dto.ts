export interface ShortUserDto {
  password: string;
  username: string;
}

export interface LongUserDto extends ShortUserDto{
  id?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
}

export interface UserToken {
  auth_token: string;
}
