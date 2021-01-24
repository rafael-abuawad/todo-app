import { ApiProperty } from '@nestjs/swagger';

export class CreateListDto {
  @ApiProperty({ name: 'title', required: true })
  title: string;

  @ApiProperty({ name: 'description', required: false })
  description?: string;
}
