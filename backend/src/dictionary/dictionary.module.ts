import { Module } from '@nestjs/common';
import { DictionaryController } from './dictionary.controller';
import { DictionaryService } from './dictionary.service';
import { CoreModule } from '../core/core.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from '../core/entities/country.entity';

@Module({
  imports: [CoreModule, TypeOrmModule.forFeature([Country])],
  controllers: [DictionaryController],
  providers: [DictionaryService],
})
export class DictionaryModule {}
