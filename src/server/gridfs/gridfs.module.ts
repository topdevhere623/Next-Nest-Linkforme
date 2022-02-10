import { Module } from '@nestjs/common';
import { FilesService } from './gridfs.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [
    FilesService
  ],
  exports: [FilesService],
})
export class GridfsModule {}