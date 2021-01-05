int time;
int playing = false;
void setup() {
  //size(1000,600);
  int scale = (window.innerWidth/1.8) / 1000;
  size((int)(1000 * scale/50) * 50, (int)(600 * scale/50)*50); //(ProjecessingJS) 
  // COLOR SCHEME = 220, 170, 100
  background(255, 230, 170);
  time = millis();
  noLoop();
  $('#play').click(function(){
      if (!playing){
        loop();
        playing = true;
      } else {
         noLoop();
         playing = false;
         
      }
  });
}

int delay = (int)random(0,3000);
void draw() {
    noStroke();
  //float delay = noise(random(1,1000));
  //delay((int)(500 * delay));
   
  //delay(delay);
  //println();
println(delay);
  if (millis() - time >= delay) {

    int block_size = 50; //size of blocks
  
      int x = ((int)random(0, width/block_size)) * block_size, 
          y = ((int)random(0, height/block_size)) * block_size; 
      
      
      float dr = random (0.9,1),
      dg = random (0.9,1),
      db = random (0.9,1),
           da = random(0, 1);
           
      float r = 250 * dr,
            g = 160 * dg,
            b = 70 * db,
            a = 255 * da;
    
     float rOff = random (0, 255-r),
           bgOff= random (0, 255-max(b,g));
           
           r += rOff;
           g += bgOff;
           b += bgOff;
           
      float s = (int)random (0,20);
      
      if (s == 10){
        block_size *= 2;
      }
      
      fill(r, g, b, a);
      rect(x, y, block_size, block_size);
      
      
          delay = (int)random(0,delay + random(-1000,2000)); 
          time = millis();
    }
  
}