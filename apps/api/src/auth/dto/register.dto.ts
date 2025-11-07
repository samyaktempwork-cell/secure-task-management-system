import { UserRole } from '../../entities/user.entity';

export class RegisterDto {
  email: string;
  password: string;
  role?: UserRole;
}
