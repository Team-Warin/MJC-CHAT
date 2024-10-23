export {};

import { PrismaClient } from '@prisma/client';

/* eslint no-var: "off" */
declare global {
  var prisma: PrismaClient;
}
