import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Render,
  Redirect,
  NotFoundException,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  @Render('index')
  async index() {
    const posts = await this.postsService.findAll();
    return { posts };
  }

  @Get('new')
  @Render('new')
  new() {
    return {};
  }

  @Post()
  @Redirect('/posts', 302)
  async create(@Body() createPostDto: CreatePostDto) {
    await this.postsService.create(createPostDto);
  }

  @Get(':id')
  @Render('show')
  async show(@Param('id') id: string) {
    const post = await this.postsService.findOne(id);
    if (!post) {
      throw new NotFoundException();
    }
    return { post };
  }

  @Get(':id/edit')
  @Render('edit')
  async edit(@Param('id') id: string) {
    const post = await this.postsService.findOne(id);
    if (!post) {
      throw new NotFoundException();
    }
    return { post };
  }

  @Post(':id')
  @Redirect('/posts', 302)
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    await this.postsService.update(id, updatePostDto);
    return { url: `/posts/${id}` };
  }

  @Post(':id/delete')
  @Redirect('/posts', 302)
  async remove(@Param('id') id: string) {
    await this.postsService.remove(id);
  }

  @Get(':id/reply')
  @Render('reply')
  async reply(@Param('id') id: string) {
    const post = await this.postsService.findOne(id);
    if (!post) {
      throw new NotFoundException();
    }
    return { post };
  }
}