const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var chao
var corda
var corda2
var corda3
var fruta
var linkzin
var linkzin2
var linkzin3
var cueio
var mudo
var balao
var pontos
//variaveis de imagem XD
var cueiopiscando
var cueiofaminto
var cueiochorando
var cueioimg
var fruitsimg
var fundoimg
var tesoura
var tesoura2
var tesoura3
var estrela
var estrala
var estrelaimg
var estrela1
var estrela2
var estrelavazia
//variaveis dos soms provavelmente vai fica um em cima do outro eeeeee
var cueiochorandomp3
var cordacortandomp3
var somdevento
var somdojogo
var cueiocomendomp3
//cria function preload XD
function preload(){
  cueiopiscando=loadAnimation("blink_1.png","blink_2.png","blink_3.png")
  cueiofaminto=loadAnimation("eat_0.png","eat_1.png","eat_2.png","eat_3.png","eat_4.png")
  cueioimg=loadImage("Rabbit-01.png")
  fruitsimg=loadImage("melon.png")
  fundoimg=loadImage("background.png")
  cueiochorando=loadAnimation("sad_2.png","sad_3.png")
  cueiochorandomp3=loadSound("sad.wav")
  cueiocomendomp3=loadSound("eating_sound.mp3")
  somdojogo=loadSound("sound1.mp3")
  cordacortandomp3=loadSound("rope_cut.mp3")
  somdevento=loadSound("air.wav")
  estrela1=loadImage("one_star.png")
  estrela2=loadImage("stars.png")
  estrelavazia=loadImage("empty.png")
  estrelaimg=loadImage("star.png")
  //propriedade de eita reprodução 0_0
  cueiopiscando.playing=true
  cueiofaminto.playing=true
  cueiochorando.playing=true
  cueiochorando.looping=false
  cueiofaminto.looping=false
}
function setup() 
{
  var mobile=/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
   if(mobile){
  canW=windowWidth;
  canH=windowHeight;
  createCanvas(displayWidth+30,windowHeight)
   }
  else{
    canW=windowWidth;
    canH=windowHeight;
    createCanvas(windowWidth,windowHeight);
  }

  engine = Engine.create();
  world = engine.world;

  rectMode(CENTER);
  ellipseMode(RADIUS);

  textSize(50)

  cueio=createSprite(350,620,50,50)
  //cueio.addImage(cueioimg)
  cueio.scale=0.2
  cueiopiscando.frameDelay=8
  cueiofaminto.frameDelay=10
  cueiochorando.frameDelay=10
  cueio.addAnimation("oquesegostapikachu",cueiopiscando)
  cueio.addAnimation("selocoocadeirantecorreu",cueiofaminto)
  cueio.changeAnimation("sonica")
  cueio.addAnimation("sonica",cueiochorando)
  cueio.changeAnimation("oquesegostapikachu")
  
  

  tesoura=createImg("cut_btn (1).png")
  tesoura.position(180,90)
  tesoura.size(50,50)
  tesoura.mouseClicked(drop)

  tesoura2=createImg("cut_btn (1).png")
  tesoura2.position(390,90)
  tesoura2.size(50,50)
  tesoura2.mouseClicked(drop2)

 
  
  mudo=createImg("mute.png")
  mudo.position(width-100,50)
  mudo.size(50,50)
  mudo.mouseClicked(silencio)

  balao=createImg("balloon.png")
  balao.position(50,175)
  balao.size(120,100)
  balao.mouseClicked(empurro)
  chao = new Ground(200,700,width+1100,40)

  corda = new Rope(7,{x:200,y:90})
  corda2 = new Rope(6,{x:400,y:90})
  

   fruta=Bodies.circle(300,310,15)
   Matter.Composite.add(corda.body,fruta)
   linkzin=new Link(corda,fruta)
   linkzin2=new Link(corda2,fruta)

   somdojogo.play()
   somdojogo.setVolume(0.2)

   //carregando estrela
   estrela=createSprite(50,370,20,20)
   estrala=createSprite(320,50,20,20)
   estrela.addImage(estrelaimg)
   estrala.addImage(estrelaimg)
   estrela.scale=0.02
   estrala.scale=0.02
   estrela.visible=true
   estrala.visible=true

   pontos=createSprite(50,20)
   pontos.addImage(estrelavazia)
   pontos.scale=0.2
   
}

function draw() 
{
  background(fundoimg);
   
  push()
  imageMode(CENTER)
  //ellipse(fruta.position.x,fruta.position.y,15,15)
  if (fruta!=null){
  image(fruitsimg,fruta.position.x,fruta.position.y,70,70)
  }
  pop ()
  if(collide(fruta,cueio)==true){
    cueio.changeAnimation("selocoocadeirantecorreu")
    cueiocomendomp3.play()
    World.remove(engine.world,fruta);
    fruta=null
  }
  if(collide(fruta,chao.body)==true){
    cueio.changeAnimation("sonica")
    cueiochorandomp3.play()
    fruta=null
  }
  if (fruta!=null&&fruta.position.y>680){
    cueio.changeAnimation("sonica")
    cueiochorandomp3.play()
    somdojogo.stop()
    fruta=null
  }
  //condição pra fazer a melancia bater nas estrelas
  if(collide(fruta,estrela,20)){
   estrela.visible=false
   estrela.x=600
   estrela.y=500
   pontos.addImage(estrela2)
   
  }
  if(collide(fruta,estrala,20)){
    estrala.visible=false
    estrala.x=600
    estrala.y=500
    pontos.addImage(estrela1)
    
   }
  Engine.update(engine);
  chao.show();
  corda.show();
  corda2.show();
 
  drawSprites()
}
//função para corta a corda 
function drop(){
  corda.break()
  linkzin.detach()
  linkzin=null
}
function drop2(){
  corda2.break()
  linkzin2.detach()
  linkzin2=null
}
function silencio(){
 if(somdojogo.isPlaying()){
   somdojogo.stop()
 }
 else{
   somdojogo.play()
 }
}
function empurro(){
  Matter.Body.applyForce(fruta,{x:0,y:0},{x:0.01,y:-0.05})
  somdevento.play()
  
}
function collide(body,sprite,x){
  if (body!=null){
    var alcance=dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
    if(alcance<=80){
      return true;
    }
    else{
      return false
    }
  }
  }


