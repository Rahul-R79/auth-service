import bcrypt from 'bcryptjs';
import { PasswordHashRepository } from '../../domain/repositories/PasswordHashRepository';

export class BcryptPasswordService implements PasswordHashRepository{
    private readonly saltRounds = 10;

    async hash(password: string): Promise<string> {
        return bcrypt.hash(password, this.saltRounds);
    }

    async compare(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }
}