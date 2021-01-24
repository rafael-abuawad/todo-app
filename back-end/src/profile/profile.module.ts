import { Module, forwardRef } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { UserModule } from '../user/user.module';

@Module({
  imports: [forwardRef(() => UserModule)],
  controllers: [ProfileController],
})
export class ProfileModule {}
