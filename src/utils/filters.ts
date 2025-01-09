import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, NotFoundException, Render } from "@nestjs/common";
import { Request, Response } from "express";

/**
 * Render a 404 page when a NotFoundException is thrown
 */
@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
    catch(exception: NotFoundException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        response.status(HttpStatus.NOT_FOUND).render('404');
    }
}