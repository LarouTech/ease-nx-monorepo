// src/firebase/firebase.module.ts
import { Module, Global } from '@nestjs/common';
import { FirebaseService } from './firebase.service';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
  providers: [FirebaseService],
  exports: [FirebaseService],
  imports: [ConfigModule],
})
export class FirebaseAdminModule {}
