import TV from "./TV";
import { mappingEPG } from "./data/mappingEPG";
import { mappingLogo } from "./data/mappingLogo";
import { mappingVideo } from "./data/mappingVideo";
import { tvs } from "./data/tvs";
import fs from 'fs';


const map = [] as TV[];

let channel = "";
let count = 0;

for (let i of tvs.split("\n")) {
  if (i.trim() === "") {
    continue;
  }
  if (!i.includes(",")) {
    channel = i.trim();
    continue;
  }
  let p = i.split(",");

  let tv = new TV(count, p[0], p[1].split(";").map(it => it.trim()));

  let logo = mappingLogo.get(tv.title);
  if (logo != null && logo !== "") {
    tv.logo = logo;
  }
  tv.channel = channel;
  let programId = mappingEPG.get(tv.title);
  if (programId != null && programId !== "") {
    tv.programId = programId;
  }

  let video = mappingVideo.get(tv.title);
  if (video != null) {
    tv.pid = video[0];
    tv.sid = video[1];
  }

  map.push(tv);
  count++;
}

console.log(JSON.stringify(map, null, 2));

// 使用 fs.writeFile 方法写入文件
fs.writeFile('channels.json', JSON.stringify(map, null, 2), (err) => {
  if (err) {
    console.error('写入文件时出错:', err);
  } else {
    console.log('JSON 文件已成功写入');
  }
});