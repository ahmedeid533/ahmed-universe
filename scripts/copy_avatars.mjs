import fs from 'fs';

const dir = 'C:/Users/ahmed/.gemini/antigravity/brain/042997ea-650d-4ca4-9f7b-e6b093dcb250';
const dest = 'C:/Users/ahmed/OneDrive/Desktop/Work/ahmed-universe/public/avatars';

fs.copyFileSync(`${dir}/avatar_casual_idle_1776381527698.png`, `${dest}/casual.png`);
fs.copyFileSync(`${dir}/avatar_casual_hover_1776381626657.png`, `${dest}/casual_hover.png`);
fs.copyFileSync(`${dir}/avatar_engineer_idle_1776381543980.png`, `${dest}/engineer.png`);
fs.copyFileSync(`${dir}/avatar_engineer_hover_1776381640066.png`, `${dest}/engineer_hover.png`);
fs.copyFileSync(`${dir}/avatar_developer_idle_1776381557571.png`, `${dest}/developer.png`);
fs.copyFileSync(`${dir}/avatar_developer_hover_1776381659205.png`, `${dest}/developer_hover.png`);
fs.copyFileSync(`${dir}/avatar_hacker_idle_1776381572897.png`, `${dest}/hacker.png`);
fs.copyFileSync(`${dir}/avatar_hacker_hover_1776381676666.png`, `${dest}/hacker_hover.png`);
fs.copyFileSync(`${dir}/avatar_groom_idle_1776381585680.png`, `${dest}/groom.png`);
fs.copyFileSync(`${dir}/avatar_groom_hover_1776381695704.png`, `${dest}/groom_hover.png`);
fs.copyFileSync(`${dir}/avatar_architect_idle_1776381600698.png`, `${dest}/architect.png`);
fs.copyFileSync(`${dir}/avatar_architect_1776377976790.png`, `${dest}/architect_hover.png`);

console.log('Images copied successfully.');
