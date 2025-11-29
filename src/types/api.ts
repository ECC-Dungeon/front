export type BaseEntity = {
  id: string;
  createdAt: number;
};

// 全てのエンティティにBaseEntityのプロパティを追加する
export type Entity<T> = {
  [K in keyof T]: T[K];
} & BaseEntity;

// ユーザーのエンティティ
export type User = Entity<{
  // password: string;
  // loginStatus: boolean;
  // lastLoginTime: number;
  email: string;
}>;

export type GameToken = {
  msg: string;
  result: string;
};

export type TeamName = {
  name: string;
};

// 使用する階層のエンティティ
export type Floor = {
  FloorNum: number;
  Name: string;
  Enabled: boolean;
};

// ゲーム進捗のエンティティ
export type NextEntity = {
  NextNum: number;
  AllClear: boolean;
  ClearFloor: Array<number>;
};

export type TeamData = {
  TeamID: string;
  Name: string;
  GameID: string;
  Status: string;
  NickName: string;
  Creator: string;
  CreatedAt: number;
};

export type ApiResponse = {
  msg: TeamData;
  result: string;
};

export type GameStatus = {
  msg: {
    NextNum: number;
    AllClear: boolean;
    CleardFloor: number[];
  };
  result: string;
};
