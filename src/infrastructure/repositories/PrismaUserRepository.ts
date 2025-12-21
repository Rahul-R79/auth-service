import { UserRepository } from "../../domain/repositories/UserRepository";
import { User } from "../../domain/entities/User";
import { PrismaClient } from "@prisma/client";

export class PrismaUserRepository implements UserRepository {
    constructor(private prisma: PrismaClient) {}

    async findByEmail(email: string): Promise<User | null> {
        const user = await this.prisma.user.findUnique({
            where: { email },
        });

        return user as User | null;
    }

    async findById(id: string): Promise<User | null> {
        const user = await this.prisma.user.findUnique({
            where: {id},
        });

        return user as User | null;
    }

    async create(data: Partial<User>): Promise<User> {
        const newUser = await this.prisma.user.create({
            data: {
                email: data.email!,
                password: data.password!,
                name: data.name!,
            },
        });

        return newUser as User;
    }
}

