import { Controller, Delete, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('WORKSPACE')
@Controller('api/workspaces')
export class WorkspacesController {
  @Get()
  getMyWorkspaces() {}

  @Post()
  createWorkspace() {}

  @Get(':url/users')
  getAllUsersFromWorkspace() {}

  @Post(':url/users')
  inviteUsersToWorkspace() {}

  @Delete(':url/users')
  kickMemberFromWorkspace() {}

  @Get(':url/users/:id')
  getUsersInfoInWorkspace() {}
}
