import { Controller, Get, Post, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('users')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('JWT-auth')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    @ApiOperation({
        summary: 'Create a new user',
        description: 'Create a new user. Requires JWT authentication token.'
    })
    @ApiResponse({ status: 201, description: 'User successfully created.' })
    @ApiResponse({ status: 401, description: 'Unauthorized - JWT required' })
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Get()
    @ApiOperation({
        summary: 'Get all users',
        description: 'Get all users. Requires JWT authentication token.'
    })
    @ApiResponse({ status: 200, description: 'Return all users.' })
    @ApiResponse({ status: 401, description: 'Unauthorized - JWT required' })
    findAll() {
        return this.usersService.findAll();
    }

    @Get(':id')
    @ApiOperation({
        summary: 'Get user by id',
        description: 'Get user by id. Requires JWT authentication token.'
    })
    @ApiResponse({ status: 200, description: 'Return the user.' })
    @ApiResponse({ status: 401, description: 'Unauthorized - JWT required' })
    @ApiResponse({ status: 404, description: 'User not found.' })
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(id);
    }

    @Patch(':id/status')
    @ApiOperation({
        summary: 'Update user status',
        description: 'Activate or deactivate a user. When a user is deactivated, they cannot log in to the system.'
    })
    @ApiBody({
        type: UpdateUserDto,
        examples: {
            deactivate: {
                summary: 'Deactivate User',
                description: 'Disable user access to the system',
                value: {
                    isActive: false
                }
            },
            activate: {
                summary: 'Activate User',
                description: 'Enable user access to the system',
                value: {
                    isActive: true
                }
            }
        }
    })
    @ApiResponse({
        status: 200,
        description: 'User status updated successfully.',
        schema: {
            example: {
                id: '507f1f77bcf86cd799439011',
                name: 'John Doe',
                email: 'john@example.com',
                role: 'user',
                isActive: false,
                createdAt: '2024-02-01T15:00:00.000Z',
                updatedAt: '2024-02-01T15:30:00.000Z'
            }
        }
    })
    @ApiResponse({ status: 401, description: 'Unauthorized - JWT required' })
    @ApiResponse({ status: 404, description: 'User not found' })
    updateStatus(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.updateStatus(id, updateUserDto);
    }
} 