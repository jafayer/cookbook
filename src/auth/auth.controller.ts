import { Controller, Request, Post, UseGuards, HttpStatus, HttpCode, Body, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local.guard';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) {}

    @UseGuards(LocalAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Post('login')
    async signIn(@Body() body: { username: string, password: string }, @Req() req, @Res() res: Response) {
        const result = await this.authService.signIn(body.username, body.password);
        if(result){
            res.cookie('access_token', result.access_token, { httpOnly: true, secure: true });
        }
        
        res.redirect('/');
    }
}
