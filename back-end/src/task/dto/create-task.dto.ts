import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({ name: 'title', required: true })
  title: string;

  @ApiProperty({ name: 'description', required: false })
  description?: string;

  @ApiProperty({ name: 'list', required: true })
  list: number;
}

export class CreateTaskWithinListDto {
  @ApiProperty({ name: 'title', required: true })
  title: string;

  @ApiProperty({ name: 'description', required: false })
  description?: string;
}
