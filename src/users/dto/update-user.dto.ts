import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class UpdateUserDto {
    @ApiProperty({
        example: false,
        description: 'The status of the user'
    })
    @IsBoolean()
    isActive: boolean;
} 