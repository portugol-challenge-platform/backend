import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserSignInDTO } from './dto/userSignInDTO';
import { UserSignUpDTO } from './dto/userSignupDTO';
import { Public } from './public.decorator';

@Controller('auth')
@Public()
export class AuthController {
    constructor(private authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @Post('signin')
    signIn(@Body() signInDto: UserSignInDTO) {
        return this.authService.signIn(signInDto.username, signInDto.password);
    }

    @HttpCode(HttpStatus.OK)
    @Post('signup')
    signUp(@Body() signUpDTO: UserSignUpDTO) {
        return this.authService.signUp(signUpDTO.name);
    }
}
