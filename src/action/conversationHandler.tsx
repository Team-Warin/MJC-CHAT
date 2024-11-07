'use server';

import type { Session } from 'next-auth';
import type { ChatRoom, Conversation } from '@prisma/client';

import prisma from '@/lib/prisma';