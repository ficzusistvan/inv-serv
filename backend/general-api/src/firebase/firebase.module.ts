import { DynamicModule, Module, Provider } from '@nestjs/common';
import { createFirebaseProvider } from './firebase.providers';
import { FirebaseModuleAsyncOptions, FirebaseModuleOptions, FirebaseOptionsFactory } from './firebase-module-options.interface';
import { FIREBASE_MODULE_OPTIONS } from './firebase.constants';
import { FirebaseService } from './firebase.service';

@Module({
  providers: [FirebaseService],
  exports: [FirebaseService]
})
export class FirebaseModule {
  static forRoot(options: FirebaseModuleOptions): DynamicModule {
    return {
      module: FirebaseModule,
      providers: createFirebaseProvider(options),
    };
  }

  static forRootAsync(options: FirebaseModuleAsyncOptions): DynamicModule {
    return {
        module: FirebaseModule,
        imports: options.imports || [],
        providers: this.createAsyncProviders(options)
    }
  }

  private static createAsyncProviders(
    options: FirebaseModuleAsyncOptions
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }
    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass
      }
    ];
  }

  private static createAsyncOptionsProvider(
    options: FirebaseModuleAsyncOptions
  ): Provider {
    if (options.useFactory) {
      return {
        provide: FIREBASE_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || []
      };
    }
    return {
      provide: FIREBASE_MODULE_OPTIONS,
      useFactory: async (optionsFactory: FirebaseOptionsFactory) =>
        await optionsFactory.createFirebaseOptions(),
      inject: [options.useExisting || options.useClass]
    };
  }
}
