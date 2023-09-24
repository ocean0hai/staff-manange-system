export interface objType {
  [key: string]: any;
}
export interface userObj {
  id: string;
  username: string;
  status: string;
  time: string;
}
export interface roleType extends objType {
  id: number;
  name: string;
  remark: string;
  descr: string;
  createTime: number;
  createBy: string;
  updateTime: number;
  updateBy: number;
}
export interface userType extends objType {
  id: string;
  username: string;
  isLocked: string;
  nickName: string;
  descr: string;
}
export interface authorityType {}
export interface fileType extends objType {
  id: number;
  title: string;
  fileName: string;
  filePath: string;
  descr: string;
  createTime: number;
  createBy: string;
  updateTime: number;
  updateBy: string;
}
export interface depType extends objType {
  id: number;
  name: string;
  remark: number;
  descr: string;
  createTime: number;
  createBy: string;
  updateTime: number;
  updataBy: string;
}
export interface posType extends objType {
  id: number;
  name: string;
  descr: string;
  createTime: number;
  craeteBy: string;
  updateTime: number;
  updateBy: string;
}
export interface staffType extends objType {
  id: number;
  dpetId: number;
  jobId: number;
  name: string;
  cardId: string;
  address: string;
  postCode: string;
  tel: string;
  phone: string;
  qqNum: string;
  email: string;
  sex: string;
  party: string;
  birthday: string;
  race: string;
  education: string;
  speciality: string;
  hobby: string;
  descr: string;
  createTime: number;
  createBy: string;
  updateTime: number;
  updateBy: string;
}
export interface noticeType extends objType {
  id: number;
  title: string;
  content: string;
  descr: string;
  createTime: number;
  createBy: string;
  updateTime: number;
  updateBy: string;
}
