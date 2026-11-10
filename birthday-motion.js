/* Geometry for the native Canvas photo cascade; no external dependencies. */
const NYCBirthdayMotion = (() => {
  const TIMING = Object.freeze({formed:11.2, scatter:14.2, scatterEnd:16, message:16.4, letter:17.4, end:21});
  const clamp = x => Math.max(0, Math.min(1, x));
  const random = i => {const x=Math.sin(i*127.1+42.37)*43758.5453; return x-Math.floor(x);};

  function alphaBounds(alpha, width, height) {
    let left=width, top=height, right=-1, bottom=-1;
    for (let y=0;y<height;y++) for (let x=0;x<width;x++) if (alpha[y*width+x]>=24) {
      left=Math.min(left,x); right=Math.max(right,x); top=Math.min(top,y); bottom=Math.max(bottom,y);
    }
    return right<0 ? null : {x:left,y:top,width:right-left+1,height:bottom-top+1};
  }

  function fillOutline(alpha, width, height) {
    const outside=new Uint8Array(alpha.length), queue=new Int32Array(alpha.length);
    let head=0, tail=0;
    const visit=i=>{if (!outside[i] && alpha[i]<24) {outside[i]=1;queue[tail++]=i;}};
    for (let x=0;x<width;x++) {visit(x);visit((height-1)*width+x);}
    for (let y=0;y<height;y++) {visit(y*width);visit(y*width+width-1);}
    while (head<tail) {
      const i=queue[head++], x=i%width, y=Math.floor(i/width);
      if (x>0) visit(i-1); if (x<width-1) visit(i+1);
      if (y>0) visit(i-width); if (y<height-1) visit(i+width);
    }
    return Uint8Array.from(outside, value=>value ? 0 : 255);
  }

  function makeTiles(mask, width, height, photoCount) {
    const columns=12, rows=36, cells=[];
    for (let row=0;row<rows;row++) for (let col=0;col<columns;col++) {
      const sx=Math.floor(col*width/columns), sy=Math.floor(row*height/rows);
      const sw=Math.floor((col+1)*width/columns)-sx, sh=Math.floor((row+1)*height/rows)-sy;
      let occupied=false;
      for (let y=sy;y<sy+sh && !occupied;y++) for (let x=sx;x<sx+sw;x++) if (mask[y*width+x]) {occupied=true;break;}
      if (occupied) cells.push({sx,sy,sw,sh,x:sx/width,y:sy/height,width:sw/width,height:sh/height,seed:row*columns+col});
    }
    cells.sort((a,b)=>random(a.seed+51)-random(b.seed+51));
    return cells.map((cell,i)=>({...cell,photo:i%photoCount,lead:i<photoCount,
      delay:i<photoCount ? i*.16 : 2.3+(i-photoCount)/Math.max(1,cells.length-photoCount-1)*5.5,
      duration:i<photoCount ? 3.2+random(i+11)*.45 : 2.7+random(i+11)*.3}));
  }

  function frameFor(width, height, aspect) {
    const h=Math.max(160,Math.min(760,height-220,(width-60)/aspect));
    return {x:(width-h*aspect)/2,y:Math.max(110,(height-h)/2-5),width:h*aspect,height:h};
  }

  function flightPose(tile, time, viewport, frame) {
    const p=time>=tile.delay+tile.duration ? 1 : clamp((time-tile.delay)/tile.duration), eased=1-Math.pow(1-p,3);
    const endX=frame.x+(tile.x+tile.width/2)*frame.width, endY=frame.y+(tile.y+tile.height/2)*frame.height;
    const endW=tile.width*frame.width, endH=tile.height*frame.height;
    const startW=Math.max(endW+1,Math.min(tile.lead?164:106,viewport.width*(tile.lead?.39:.25))), startH=startW*4/3;
    const edge=tile.seed%4, along=.12+random(tile.seed+17)*.76;
    const startX=edge===0 ? -startW : edge===1 ? viewport.width+startW : along*viewport.width;
    const startY=edge===2 ? -startH : edge===3 ? viewport.height+startH : along*viewport.height;
    const controlX=viewport.width*(.25+random(tile.seed+42)*.5), controlY=viewport.height*(.25+random(tile.seed+43)*.5);
    const q=1-eased;
    return {progress:p,started:time>=tile.delay,
      x:q*q*startX+2*q*eased*controlX+eased*eased*endX,
      y:q*q*startY+2*q*eased*controlY+eased*eased*endY,
      width:startW+(endW-startW)*eased,height:startH+(endH-startH)*eased,
      rotation:(random(tile.seed+67)-.5)*.5*q,opacity:clamp(p*7)};
  }

  function phaseAt(time) {
    if (time<TIMING.formed) return 'assembly';
    if (time<TIMING.scatter) return 'hold';
    if (time<TIMING.scatterEnd) return 'scatter';
    if (time<TIMING.message) return 'transition';
    return 'message';
  }

  return {TIMING,alphaBounds,fillOutline,makeTiles,frameFor,flightPose,phaseAt};
})();
if (typeof module!=='undefined' && module.exports) module.exports=NYCBirthdayMotion;
