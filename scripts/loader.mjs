import { register } from 'node:module';

register(new URL('./resolver-hook.mjs', import.meta.url));
