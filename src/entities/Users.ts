import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { ChannelChats } from './ChannelChats';
import { ChannelMembers } from './ChannelMembers';
import { Channels } from './Channels';
import { DMs } from './DMs';
import { Mentions } from './Mentions';
import { WorkspaceMembers } from './WorkspaceMembers';
import { Workspaces } from './Workspaces';

@Index('email', ['email'], { unique: true })
@Entity({ schema: 'sleact', name: 'users' })
export class Users {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'email', unique: true, length: 30 })
  email: string;

  @Column('varchar', { name: 'nickname', length: 30 })
  nickname: string;

  @Column('varchar', { name: 'password', length: 100, select: false })
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @OneToMany(() => ChannelChats, (channelchats) => channelchats.User)
  ChannelChats: ChannelChats[];

  @OneToMany(() => ChannelMembers, (channelmembers) => channelmembers.User)
  ChannelMembers: ChannelMembers[];

  @OneToMany(() => DMs, (dms) => dms.Sender)
  DMs: DMs[];

  @OneToMany(() => DMs, (dms) => dms.Receiver)
  DMs2: DMs[];

  @OneToMany(() => Mentions, (mentions) => mentions.Sender)
  Mentions: Mentions[];

  @OneToMany(() => Mentions, (mentions) => mentions.Receiver)
  Mentions2: Mentions[];

  @OneToMany(
    () => WorkspaceMembers,
    (workspacemembers) => workspacemembers.User,
  )
  WorkspaceMembers: WorkspaceMembers[];

  @OneToMany(() => Workspaces, (workspaces) => workspaces.Owner)
  OwnedWorkspaces: Workspaces[];

  /**
   * ManyToMany는 중간 테이블(맵핑테이블)이 생기기 때문에
   * JoinTable()을 명시해야 함
   * user나 workspace 둘 중 하나에만 넣으면 됨.
   */
  @ManyToMany(() => Workspaces, (workspaces) => workspaces.Members)
  @JoinTable({
    name: 'workspacemembers',
    joinColumn: {
      name: 'UserId', // 현재 엔티티는 joinColumn에 넣기
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'WorkspaceId', // 현재 영역을 inverseJoinColumn에 넣기
      referencedColumnName: 'id',
    },
  })
  Workspaces: Workspaces[];

  @ManyToMany(() => Channels, (channels) => channels.Members)
  @JoinTable({
    name: 'channelmembers',
    joinColumn: {
      name: 'UserId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'ChannelId',
      referencedColumnName: 'id',
    },
  })
  Channels: Channels[];
}
