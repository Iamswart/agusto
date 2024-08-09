export interface RegisterInterface {
  userName: string;
  email: string;
  phone: string;
  password: string;
}

export interface LoginInterface {
  email?: string;
  password: string;
  phone?: string;
}

export interface ChangePasswordInterface {
  oldPassword: string;
  newPassword: string;
}

export interface EmailInterface {
  email: string;
  data: any;
  template: string;
  subject: string;
}

export interface ResetPasswordInterface {
  email: string;
  code: string;
  password: string;
}

export interface AssignAdminInterface {
  userId: string;
}



