import { IsString, IsEmail, IsNotEmpty, MinLength, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../entities/user.entity';

export class CreateUserDto {
    @ApiProperty({
        example: 'John Doe',
        description: 'The name of the user'
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        example: 'john@example.com',
        description: 'The email of the user'
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        example: 'password123',
        description: 'The password of the user'
    })
    @IsString()
    @MinLength(6)
    password: string;

    @ApiProperty({
        example: 'admin',
        description: 'User role',
        enum: UserRole,
        required: true
    })
    @IsNotEmpty()
    @IsEnum(UserRole)
    role: UserRole;
} 