import { Module } from '@nestjs/common';
import { CookService } from './cook.service';
import { CookController } from './cook.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recipe } from '../recipes/entities/recipe.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Recipe])],
  providers: [CookService],
  controllers: [CookController]
})
export class CookModule {}
