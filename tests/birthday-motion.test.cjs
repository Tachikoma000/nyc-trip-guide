const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const helper = path.join(__dirname, '..', 'birthday-motion.js');
const motion = fs.existsSync(helper) ? require(helper) : null;

function outline(gap = false) {
  const a = new Uint8Array(9 * 11);
  for (let y = 2; y <= 8; y++) for (let x = 2; x <= 6; x++) {
    if (x === 2 || x === 6 || y === 2 || y === 8) a[y * 9 + x] = 255;
  }
  if (gap) a[2 * 9 + 4] = 0;
  return a;
}

test('a closed line outline fills its interior while the background stays empty', () => {
  assert.ok(motion, 'The new photo cascade is not implemented yet');
  const filled = motion.fillOutline(outline(), 9, 11);
  assert.equal(filled[5 * 9 + 4], 255);
  assert.equal(filled[0], 0);
  assert.equal(filled[10 * 9 + 8], 0);
  assert.equal(filled[2 * 9 + 4], 255);
});

test('open gaps remain connected to the exterior rather than becoming solid blocks', () => {
  assert.ok(motion, 'The new photo cascade is not implemented yet');
  const filled = motion.fillOutline(outline(true), 9, 11);
  assert.equal(filled[5 * 9 + 4], 0);
});

test('transparent padding is excluded from the statue bounds', () => {
  assert.ok(motion, 'The new photo cascade is not implemented yet');
  assert.deepEqual(motion.alphaBounds(outline(), 9, 11), {x:2, y:2, width:5, height:7});
});

test('tiles cover the silhouette and the first incoming photos include all 20 memories', () => {
  assert.ok(motion, 'The new photo cascade is not implemented yet');
  const a = new Uint8Array(60 * 120);
  for (let y = 3; y < 117; y++) for (let x = 12; x < 48; x++) a[y * 60 + x] = 255;
  const tiles = motion.makeTiles(a, 60, 120, 20);
  assert.deepEqual(new Set(tiles.slice(0,20).map(t => t.photo)), new Set(Array.from({length:20},(_,i)=>i)));
  const covered = new Uint8Array(a.length);
  for (const t of tiles) {
    let occupied = false;
    for (let y=t.sy; y<t.sy+t.sh; y++) for (let x=t.sx; x<t.sx+t.sw; x++) {
      if (a[y*60+x]) {occupied=true; covered[y*60+x]=255;}
    }
    assert.ok(occupied, 'No tile should target empty background');
    assert.ok(t.delay+t.duration <= motion.TIMING.formed, 'Every tile arrives before the statue hold');
  }
  assert.deepEqual(covered, a);
});

test('incoming photos start outside the screen, shrink, and settle on the statue', () => {
  assert.ok(motion, 'The new photo cascade is not implemented yet');
  const a = new Uint8Array(60*120).fill(255);
  const tiles = motion.makeTiles(a,60,120,20);
  for (const viewport of [{width:390,height:844},{width:1280,height:720}]) {
    const frame = motion.frameFor(viewport.width,viewport.height,.35);
    for (const tile of tiles) {
      const poses=[0,.25,.5,.75,1].map(p=>motion.flightPose(tile,tile.delay+p*tile.duration,viewport,frame));
      const first=poses[0],last=poses[4];
      assert.ok(first.x+first.width/2<=0 || first.x-first.width/2>=viewport.width || first.y+first.height/2<=0 || first.y-first.height/2>=viewport.height);
      for (let i=1;i<poses.length;i++) assert.ok(poses[i].width<=poses[i-1].width+1e-8);
      assert.ok(last.width<first.width);
      assert.equal(last.progress,1);
      assert.ok(last.x>=frame.x && last.x<=frame.x+frame.width);
      assert.ok(last.y>=frame.y && last.y<=frame.y+frame.height);
      assert.deepEqual(motion.flightPose(tile,1000,viewport,frame),last);
    }
  }
});

test('the completed statue holds before scattering and the message comes after', () => {
  assert.ok(motion, 'The new photo cascade is not implemented yet');
  const t=motion.TIMING;
  assert.ok(t.scatter-t.formed>=3);
  assert.ok(t.message>t.scatterEnd);
  assert.ok(t.letter>t.message);
  assert.equal(motion.phaseAt(t.formed+1),'hold');
  assert.equal(motion.phaseAt(t.scatter+.1),'scatter');
  assert.equal(motion.phaseAt(t.message+.1),'message');
});
