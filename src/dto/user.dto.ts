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

export type UserTableDto = Required<Pick<LongUserDto, 'id' | 'email' | 'phone' | 'username'>>

export interface UserToken {
  auth_token: string;
}
