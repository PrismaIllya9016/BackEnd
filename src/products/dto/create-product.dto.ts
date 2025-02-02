import { IsString, IsNumber, IsNotEmpty, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
    @ApiProperty({
        example: 'MacBook Pro',
        description: 'The name of the product'
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        example: '16-inch laptop with M1 Pro chip, 16GB RAM',
        description: 'Detailed description of the product'
    })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({
        example: 1299.99,
        description: 'The price of the product',
        minimum: 0
    })
    @IsNumber()
    @Min(0)
    price: number;

    @ApiProperty({
        example: 100,
        description: 'Available quantity in stock',
        minimum: 0
    })
    @IsNumber()
    @Min(0)
    stock: number;
}
