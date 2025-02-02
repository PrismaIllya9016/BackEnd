import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpStatus, HttpCode, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth, ApiSecurity } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Post()
  @ApiOperation({
    summary: 'Create a new product',
    description: 'Create a new product. Requires JWT authentication token.'
  })
  @ApiBody({
    type: CreateProductDto,
    examples: {
      example1: {
        summary: 'New Laptop Example',
        value: {
          name: 'MacBook Pro',
          description: '16-inch laptop with M1 Pro chip',
          price: 1299.99,
          stock: 100
        }
      },
      example2: {
        summary: 'New Phone Example',
        value: {
          name: 'iPhone 13',
          description: 'Latest iPhone model',
          price: 999.99,
          stock: 50
        }
      }
    }
  })
  @ApiResponse({
    status: 201,
    description: 'The product has been successfully created.',
    type: CreateProductDto
  })
  @ApiResponse({ status: 401, description: 'Unauthorized - JWT required' })
  @ApiResponse({ status: 409, description: 'A product with this name already exists' })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({ status: 200, description: 'Return all products.' })
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a product by id' })
  @ApiResponse({ status: 200, description: 'Return the found product.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Patch(':id')
  @ApiOperation({
    summary: 'Update a product',
    description: 'Update a product. Requires JWT authentication token.'
  })
  @ApiBody({
    type: UpdateProductDto,
    examples: {
      priceUpdate: {
        summary: 'Update Price',
        value: {
          price: 1199.99
        }
      },
      stockUpdate: {
        summary: 'Update Stock',
        value: {
          stock: 75
        }
      },
      multipleUpdate: {
        summary: 'Update Multiple Fields',
        value: {
          price: 1199.99,
          stock: 75,
          description: 'Updated description'
        }
      }
    }
  })
  @ApiResponse({
    status: 200,
    description: 'The product has been successfully updated.'
  })
  @ApiResponse({ status: 401, description: 'Unauthorized - JWT required' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a product',
    description: 'Delete a product. Requires JWT authentication token.'
  })
  @ApiResponse({ status: 204, description: 'The product has been successfully deleted.' })
  @ApiResponse({ status: 401, description: 'Unauthorized - JWT required' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
