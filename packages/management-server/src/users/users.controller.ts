import { Controller, Get, UseGuards, Req, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    async getProfile(@Req() req) {
        const user = await this.usersService.findOne(req.user.userId);

        if (!user) {
            throw new NotFoundException('User not found');
        }

        // Since user is now UserDocument, we can safely use toObject()
        const { password, ...result } = user.toObject();
        return result;
    }
}