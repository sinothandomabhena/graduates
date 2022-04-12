import { Injectable } from '@nestjs/common';
import { PrismaService } from '@graduates/api/shared/services/prisma/data-access';
import { ShortCreateInput } from '@graduates/api/shorts/api/shared/entities/data-access';
import { Short } from '@prisma/client';

@Injectable()
export class ShortsRepository {
  constructor(private prisma: PrismaService) {}

  /**
   * Find all shorts from database
   * @return {Promise<Short[]>}
   */
  async findAll(): Promise<Short[]> {
    return this.prisma.short.findMany();
  }

  /**
   * Find a short by id
   * @param {string} id The id of the short to find
   * @return {Promise<Short | null>}
   */
  async findById(id: string): Promise<Short | null> {
    return this.prisma.short.findUnique({ where: { id: id } });
  }

  /**
   * Find all shorts by user id
   * @param {string} userId The id of the user to find the shorts for
   * @return {Promise<Short[]>}
   */
  async findByUser(userId: string): Promise<Short[]> {
    return this.prisma.short.findMany({
      where: {
        user: { id: userId },
      },
    });
  }

  /**
   * Find all shorts by tag id
   * @param {string} tagId The id of the tag to find the shorts for
   * @return {Promise<Short[]>}
   */
  async findByTag(tagId: string): Promise<Short[]> {
    return [];
  }

  /**
   * Create a new short
   * @param {Short} short The short to create
   * @param {string} userId The id of the user to create the short for
   * @return {Promise<Short | null>}
   */
  async createShort(short: ShortCreateInput, userId: string): Promise<Short> {
    return this.prisma.short.create({
      data: {
        media: short.media,
        data: short.data,
        archived: short.archived,
        user: {
          connect: { id: userId },
        },
        datePosted: new Date(),
      },
    });
  }
}
