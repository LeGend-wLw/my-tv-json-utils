export default class TV {
  id: number = 0;
  title: string;
  videoUrl: string[];
  videoIndex: number = 0;
  channel: string = '';
  logo: string = '';
  pid: string = '';
  sid: string = '';
  programId: string = '';
  needToken: boolean = false;
  mustToken: boolean = false;

  constructor(id: number, title: string, videoUrl: string[]) {
    this.id = id;
    this.title = title;
    this.videoUrl = videoUrl;
  }
}
