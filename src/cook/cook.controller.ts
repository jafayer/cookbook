import {
  Controller,
  Get,
  Post,
  Param,
  Render,
  NotFoundException,
  Body,
  UseGuards,
  Res,
} from '@nestjs/common';
import { CookService } from './cook.service';
import { Recipe } from 'src/recipes/entities/recipe.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TextDto } from './dto/text.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@Controller('cook')
export class CookController {
  constructor(
    private readonly cookService: CookService,
    @InjectRepository(Recipe)
    private recipeRepository: Repository<Recipe>,
  ) {}

  @Get(':id')
  @Render('recipe')
  async get(@Param('id') id: number) {
    return await this.cookService.render(id);
  }

  @Get('json/:id')
  async getJson(@Param('id') id: number) {
    return this.cookService.getJson(id);
  }

  @Get('download/:id')
  async download(@Res() res, @Param('id') id: number) {
    const recipe = await this.recipeRepository.findOneBy({id});
    res.setHeader('Content-disposition', `attachment; filename=${recipe.title}.cook`);
    res.setHeader('Content-type', 'text/plain');
    res.write(recipe.body);
    res.end();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/edit')
  @Render('add')
  async edit(@Param('id') id: number) {
    const method = 'PATCH';
    const result = await this.recipeRepository.findOneBy({ id });
    return { method, ...result };
  }

  @Post('from-text')
  async fromText(@Body() request: TextDto) {
    return this.cookService.fromText(request.text);
  }
}
