<!DOCTYPE html><!--


yay we now have music! more pain making all of the sounds :)
also the sounds have to be around multiples of 5 secs or else they break so i have to edit them



rn im creating the map so the mesh code thing is on the screen, but i'm using fullscreen for that so click the run button in a ka environment to close it and also stuff is wack in fullscreen rn so i can make the map better

or if u want then mess around with it lol



red: 57b
blue: 56b
white: 111b erm yikes



tutorial stuff:

-go to a field to collect pollen, go to hive to make honey

-press 'c' to convert ur pollen(testing thing), and h to get buffs, 'o' is a testing thing long agoooo

-hover ur mouse over the effects(if u have them) at the top to see what they do

-become a hive near the front of the big green hill place, directly right of red cannon, on the ground, 3 colors, red, blue, white

-use iventory items by clicking on the in the iventory to hold them. while holding, put ur mouse outside the inventory and click to use them. things like oil and glue give buffs, but things like treats and eggs u give to bees, put into the hive.

-jump while mid air to use glider, jump using glider to put it away

-becoming a hive color gives u gear. the boots are kinda needed to explore

-red hives use flames to collect pollen
-blue hives makes bubbles to fill up balloons, which gives more honey when converted at the hive
-white hives are unstable right now but they use goo and marks to get honey

-obviously hives get more pollen when farming in the same color field(red hives suck in blue fields, and vice versa)

-all bees are lvl 20 by default rn cuz testing, make them the corrent lvls by feeding them. feeding them restarts them at lvl 2(a lvl is gained from the treat)

-bitter berries cause mutations is 1% chance, 3% is bee is radioactive(caused by neonberry)

-beequips can be put on bees. a bit broken rn, but works. the beequips are deleted changing to new hive color

-the shop is just...there for me to have the code there...




-->
<html>
    <head>
        <meta charset="utf-8">
        <title>bss</title>
    </head>
    <body onload='main()'>
<canvas id='gl-canvas'></canvas>
<canvas id='ui-canvas'></canvas>
<canvas id='tex-canvas' width='2048' height='2048'></canvas>
<style>
    
    body{
        
        overflow:hidden;
        margin:0;
        font-family:cursive;
    }
    
    input {
        
        height:24px;
        outline:none;
        background-color:rgb(255,255,255);
        border:none;
        border-bottom:4px solid black;
        transition-duration:0.4s;
        border-radius:5px;
    }
    
    input:hover {
        
        background-color:rgb(200,200,255);
    }
    
    input:focus {
        
        background-color:rgb(170,200,255);
    }
    
    button {
        
        width:60px;
        height:30px;
        transition-duration:0.4s;
        border-radius:8px;
        font-size:16px;
        background-color:rgb(255,255,255);
    }
    
    button:hover {
        
        cursor:pointer;
        border-radius:13px;
        background-color:rgb(150,255,205);
    }
    
    #purchaseButton {
        
        transition-duration:0s;
        border:none;
    }
    
    #purchaseButton:hover {
        
        outline:2px solid rgb(0,0,0,0.4);
    }
    
    #leftShopButton:hover,#rightShopButton:hover{
        
        outline:2px solid rgb(0,0,0,0.4);
    }
    
    #gl-canvas,#tex-canvas{
        
        display:none;
	}
	
	#ui-canvas{
        
        position:fixed;
        left:0;
        top:0;
        z-index:-2;
	}
	
	div::-webkit-scrollbar,{
	    
        width:5px;
        height:8px;
        background-color:rgb(200,200,200); 
    }
    
    div::-webkit-scrollbar-thumb{
        
        background:rgb(120,120,120);
        border-radius:10px;
    }
    
    #inventoryButton:hover,#settingsButton:hover,#questButton:hover,#beequipButton:hover{
        
        transition-duration:0.4s;
        background-color:rgba(0,0,0,0.2);
        cursor:pointer;
    }
    
    #feedThisAmount{
        
        margin-top:50px;
        margin-left:5px;
        transition-duration:0s;
        border-radius:6px;
        position:fixed;
        background-color:rgb(0,200,0);
        border:none;
        color:rgb(255,255,255);
        font-size:17px;
        font-family:trebuchet ms;
    }
    
    #feedUntilGifted{
        
        margin-top:100px;
        margin-left:160px;
        transition-duration:0s;
        border-radius:6px;
        position:fixed;
        background-color:rgb(255,200,0);
        border:none;
        color:rgb(255,255,255);
        font-size:16.5px;
        width:135px;
        font-family:trebuchet ms;
    }
    
    #feedThisAmount:hover{
        
        background-color:rgb(0,170,0);
    }
    
    #feedAmount{
        
        margin-top:50px;
        margin-left:75px;
        transition-duration:0s;
        border-radius:6px;
        position:fixed;
        background-color:rgb(0,30,205);
        border:none;
        color:rgb(255,255,255);
        font-size:17px;
        font-family:arial;
        height:19px;
        width:200px;
        padding:5px;
        padding-left:10px;
    }
    
    #cancelFeeding{
        
        margin-top:100px;
        margin-left:5px;
        transition-duration:0s;
        border-radius:6px;
        position:fixed;
        background-color:rgb(255,30,30);
        border:none;
        color:rgb(255,255,255);
        font-size:17px;
        width:70px;
        font-family:trebuchet ms;
    }
    
    #cancelFeeding:hover{
        
        background-color:rgb(200,0,0);
    }
    
    #actionHoverDarken:hover{
        
        background-color:rgb(0,0,0,0.3);
    }
    
</style>

<script id='static_geometry_vsh' type='GLSL3D'>#version 300 es

    precision lowp float;
    
    in vec3 vertPos;
    in vec4 vertColor;
    in vec3 vertUV;
    
    out vec3 pixPos;
    out vec4 pixColor;
    out vec3 pixUV;
    
    uniform mat4 viewMatrix;
    
    void main(){
        
        vec4 pos=viewMatrix*vec4(vertPos,1);
        pixColor=vertColor;
        pixUV=vertUV;
        pixPos=pos.xyz;
        gl_Position=pos;
    }
    
</script>

<script id='static_geometry_fsh' type='GLSL3D'>#version 300 es
    
    precision lowp float;
    
    in vec3 pixPos;
    in vec4 pixColor;
    in vec3 pixUV;
    
    out vec4 fragColor;
    
    uniform sampler2D tex;
    uniform float isNight;
    
    void main(){
        
        vec4 t=texture(tex,pixUV.xy);
        
        fragColor=vec4(mix(mix(mix(pixColor.rgb,t.rgb,t.a),pixColor.rgb,pixUV.z),vec3(1,1,0.7),smoothstep(20.0,120.0,pixPos.z)*0.7)*isNight,pixColor.w);
        
    }
    
</script>

<script id='dynamic_geometry_vsh' type='GLSL3D'>#version 300 es

    precision lowp float;
    
    in vec3 vertPos;
    in vec3 vertColor;
    in vec3 vertNormal;
    
    out vec3 pixColor;
    out vec3 pixNormal;
    
    uniform mat4 viewMatrix;
    uniform mat4 modelMatrix;
    
    void main(){
        
        vec4 pos=viewMatrix*modelMatrix*vec4(vertPos,1);
        pixColor=vertColor;
        pixNormal=mat3(modelMatrix)*vertNormal;
        gl_Position=pos;
    }
    
</script>

<script id='dynamic_geometry_fsh' type='GLSL3D'>#version 300 es
    
    precision lowp float;
    
    in vec3 pixColor;
    in vec3 pixNormal;
    
    out vec4 fragColor;
    
    uniform float isNight;
    
    void main(){
        
        vec3 normal=normalize(pixNormal);
        float shade=dot(normal,LIGHT_DIR)*0.4+0.6;
        fragColor=vec4(pixColor*shade*isNight,1.0);
    }
    
</script>

<script id='token_geometry_vsh' type='GLSL3D'>#version 300 es

    precision lowp float;
    
    in vec3 vertPos;
    in vec2 vertUV;
    
    in vec4 instance_pos;
    //pos.w = rot
    in vec4 instance_uv;
    
    out vec3 pixUV;
    
    uniform mat4 viewMatrix;
    
    void main(){
        
        pixUV=vec3(vertUV,0)+instance_uv.xyz;
        
        vec3 vp=vertPos*instance_uv.w;
        float s=sin(instance_pos.w);
        float c=cos(instance_pos.w);
        
        vp=vec3(
            
            vp.x*s-vp.z*c,
            vp.y,
            vp.x*c+vp.z*s
        );
        
        gl_Position=viewMatrix*vec4(vp+instance_pos.xyz,1);
    }
    
</script>

<script id='token_geometry_fsh' type='GLSL3D'>#version 300 es
    
    precision lowp float;
    
    in vec3 pixUV;
    
    out vec4 fragColor;
    
    uniform sampler2D tex;
    uniform float isNight;
    
    void main(){
        
        fragColor=vec4(texture(tex,pixUV.xy).rgb*isNight,pixUV.z);
    }
    
</script>

<script id='flower_geometry_vsh' type='GLSL3D'>#version 300 es

    precision lowp float;
    
    in vec3 vertPos;
    in vec4 vertUV;
    in float vertGoo;
    
    out vec4 pixUV;
    out float goo;
    
    uniform mat4 viewMatrix;
    
    void main(){
        
        pixUV=vertUV;
        goo=vertGoo;
        gl_Position=viewMatrix*vec4(vertPos,1);
    }
    
</script>

<script id='flower_geometry_fsh' type='GLSL3D'>#version 300 es
    
    precision lowp float;
    
    in vec4 pixUV;
    in float goo;
    
    out vec4 fragColor;
    
    uniform sampler2D tex;
    uniform float isNight;
    
    void main(){
        
        vec3 c=mix(vec3(0,0.6,0),texture(tex,pixUV.xy).rgb*min(pixUV.w,1.0),pixUV.z);
        
        if(c.r+c.g<=0.1){
            
            c=vec3(0,0.35,0);
        }
        
        if(goo<0.0){
            
            fragColor=vec4(mix(c,vec3(0.1,1,0.5),-goo)*isNight,1.0);
            
        } else {
            
            fragColor=vec4(mix(c,vec3(1,0.2,1),goo)*isNight,1.0);
        }
    }
    
</script>

<script id='bee_geometry_vsh' type='GLSL3D'>#version 300 es

    precision lowp float;
    
    in vec3 vertPos;
    in vec4 vertUV;
    
    in vec3 instance_pos;
    in vec4 instance_rotation;
    in vec3 instance_uv;
    
    out vec3 pixUV;
    
    uniform mat4 viewMatrix;
    
    void main(){
        
        pixUV=vertUV.xyz+vec3(instance_uv.xy,0);
        
        if(instance_uv.z!=vertUV.w&&vertUV.w!=0.0){
            
            gl_Position=vec4(0,0,0,1);
            
        } else {
            
            vec3 del=normalize(instance_rotation.xyz);
            
            //i cant bee-lieve these few lines of code are compacted versions of euler angle from direction, quaternion definition from x-y euler angles, local z-axis rotation, and vec3 transformation :o
            //those 4 things would probably take like 125 lines lol
            //i guess i'm really good at optimizing lol
            
            float pitch=asin(-del.y)*0.5;
            float yaw=atan(del.x,del.z)*0.5;
            float roll=instance_rotation.w*0.5;
            
            vec3 s=vec3(sin(pitch),sin(yaw),sin(roll));
            vec3 c=vec3(cos(pitch),cos(yaw),cos(roll));
            
            vec4 quaternion=vec4(s.x*c.y,c.x*s.y,-s.x*s.y,c.x*c.y);
            
            quaternion=vec4(quaternion.x*c.z+quaternion.y*s.z,quaternion.y*c.z-quaternion.x*s.z,quaternion.z*c.z+quaternion.w*s.z,(quaternion.w*c.z-quaternion.z*s.z)*2.0);
            
            vec3 u=vec3(quaternion.y*vertPos.z-quaternion.z*vertPos.y,quaternion.z*vertPos.x-quaternion.x*vertPos.z,quaternion.x*vertPos.y-quaternion.y*vertPos.x);
            
            vec3 uu=vec3(quaternion.y*u.z-quaternion.z*u.y,quaternion.z*u.x-quaternion.x*u.z,quaternion.x*u.y-quaternion.y*u.x);
            
            gl_Position=viewMatrix*vec4(vertPos+u*quaternion.w+uu*2.0+instance_pos,1);
            
        }
    }
    
</script>

<script id='bee_geometry_fsh' type='GLSL3D'>#version 300 es
    
    precision lowp float;
    
    in vec3 pixUV;
    
    out vec4 fragColor;
    
    uniform sampler2D tex;
    uniform float isNight;
    
    void main(){
        
        if(pixUV.z>0.1){
            
            fragColor=vec4(texture(tex,pixUV.xy).rgb*pixUV.z*isNight,1);
            
        } else {
            
            fragColor=vec4(vec3(0.1,0.4,1)*isNight,0.4);
        }
    }
    
</script>

<script id='particle_renderer_vsh' type='GLSL3D'>

    #version 300 es
    
    precision lowp float;
    
    uniform mat4 viewMatrix;
    
    in vec3 vertPos;
    in vec4 vertColor;
    in float vertSize;
    in float vertRot;
    
    out float particleSize;
    out vec2 particlePos;
    out vec4 pixColor;
    out vec2 particleRot;
    
    void main(){
        
        vec4 pos=viewMatrix*vec4(vertPos,1);
        pixColor=vertColor;
        particlePos=pos.xy/pos.w;
        gl_Position=pos;
        float projSize=(vertSize/pos.z)*1.5*SCREEN_CHANGE;
        gl_PointSize=projSize;
        particleSize=projSize*0.5;
        particleRot=vec2(sin(vertRot),cos(vertRot));
        
    }
    
</script>

<script id='particle_renderer_fsh' type='GLSL3D'>
    
    #version 300 es
    
    precision lowp float;
    
    in float particleSize;
    in vec2 particlePos;
    in vec4 pixColor;
    in vec2 particleRot;
    
    out vec4 fragColor;
    
    void main(){
        
        vec2 ssPos=(gl_FragCoord.xy-vec2(HALF_WIDTH,HALF_HEIGHT))*vec2(INV_HALF_WIDTH,INV_HALF_HEIGHT);
        
        vec2 del=particlePos-ssPos;
        
        del.x*=ASPECT;
        
        del=vec2(
            
            del.x*particleRot.x-del.y*particleRot.y,
            del.x*particleRot.y+del.y*particleRot.x
            
        );
        
        if(abs(del.x)+abs(del.y)>particleSize*INV_AVG_HALF_WIDTH_HEIGHT){
            discard;
        }
        
        fragColor=pixColor;
    }
    
</script>

<script id='explosion_renderer_vsh' type='GLSL3D'>#version 300 es

    precision lowp float;
    
    in vec3 vertPos;
    
    in vec3 instance_pos;
    in vec4 instance_color;
    in vec2 instance_scale;
    
    out vec4 pixColor;
    
    uniform mat4 viewMatrix;
    
    void main(){
        
        pixColor=instance_color;
        gl_Position=viewMatrix*vec4(vertPos*instance_scale.x*vec3(1,instance_scale.y,1)+instance_pos,1);
    }
    
</script>

<script id='explosion_renderer_fsh' type='GLSL3D'>#version 300 es
    
    precision lowp float;
    
    in vec4 pixColor;
    
    out vec4 fragColor;
    
    void main(){
        
        fragColor=pixColor;
    }
    
</script>

<script id='text_renderer_vsh' type='GLSL3D'>
    
    #version 300 es
    
    precision lowp float;
    
    uniform mat4 viewMatrix;
    
    in vec2 vertPos;
    in vec2 vertUV;
    
    in vec3 instance_origin;
    in vec2 instance_offset;
    in vec2 instance_uv;
    in vec3 instance_color;
    in vec3 instance_info;
    
    out vec3 pixColor;
    out vec2 pixUV;
    
    void main(){
        
        pixColor=instance_color;
        pixUV=vertUV+instance_uv;
        
        vec4 originPos=viewMatrix*vec4(instance_origin,1);
        
        float s=sin(instance_info.z);
        float c=cos(instance_info.z);
        
        vec2 vp=(vertPos+instance_offset)*instance_info.xy;
        
        vp=vec2(
            
            (vp.x*c-vp.y*s)*INV_ASPECT,
            vp.x*s+vp.y*c
        );
        
        vec4 pos=originPos+vec4(vp,0,0);
        
        if(pos.w<2.0&&pos.w>0.0){
            
            pos.w=2.0;
        }
        
        gl_Position=pos;
    }
    
</script>

<script id='text_renderer_fsh' type='GLSL3D'>
    
    #version 300 es
    
    precision lowp float;
    
    uniform sampler2D tex;
    
    in vec2 pixUV;
    in vec3 pixColor;
    
    out vec4 fragColor;
    
    void main(){
        
        vec4 c=texture(tex,pixUV)*vec4(pixColor,1);
        
        if(c.a<0.3){
            
            discard;
        }
        
        fragColor=c;
    }
    
</script>

<script id='mob_renderer_vsh' type='GLSL3D'>#version 300 es

    precision lowp float;
    
    in vec3 vertPos;
    in vec3 vertColor;
    
    out vec4 pixColor;
    
    uniform mat4 viewMatrix;
    uniform vec4 instance_info1;
    uniform vec2 instance_info2;
    uniform float isNight;
    
    void main(){
        
        pixColor=vec4(vertColor*isNight,instance_info2.y);
        vec3 vp=vertPos*instance_info2.x;
        
        float s=sin(instance_info1.w);
        float c=cos(instance_info1.w);
        
        vp=vec3(
            
            vp.x*c-vp.z*s,
            vp.y,
            vp.x*s+vp.z*c
        );
        
        vec4 pos=viewMatrix*vec4(vp+instance_info1.xyz,1);
        gl_Position=pos;
    }
    
</script>

<script id='mob_renderer_fsh' type='GLSL3D'>#version 300 es
    
    precision lowp float;
    
    in vec4 pixColor;
    
    out vec4 fragColor;
    
    void main(){
        
        fragColor=pixColor;
    }
    
</script>

<script id='trail_renderer_vsh' type='GLSL3D'>#version 300 es

    precision lowp float;
    
    in vec3 vertPos;
    in vec4 vertCol;
    
    out vec4 pixColor;
    
    uniform mat4 viewMatrix;
    uniform float isNight;
    
    void main(){
        
        pixColor=vec4(vertCol.xyz*isNight,vertCol.w);
        gl_Position=viewMatrix*vec4(vertPos,1);
    }
    
</script>

<script id='trail_renderer_fsh' type='GLSL3D'>#version 300 es
    
    precision lowp float;
    
    in vec4 pixColor;
    
    out vec4 fragColor;
    
    void main(){
        
        fragColor=pixColor;
    }
    
</script>

<div id='abilityUI' style='margin:5px;padding:0px;margin-top:35px;position:fixed'>
    
    <svg id='inspireCoconutsPassive' style='width:30;height:30;display:none;'>
        <circle cx='15' cy='15' r='14' fill='rgb(115,163,0)' stroke='rgb(0,0,0)' stroke-width='2'></circle>
        
        <circle cx='16' cy='14' r='8' fill='rgb(150,75,0)' stroke='rgb(0,0,0)' stroke-width='1'></circle>
        
        <circle cx='18' cy='15' r='1.5' fill='rgb(94, 51, 7)'></circle><circle cx='13' cy='12' r='1.5' fill='rgb(94, 51, 7)'></circle><circle cx='18' cy='11' r='1.5' fill='rgb(94, 51, 7)'></circle>
        
        <path d='M0.00000 3.00000L4.70228 6.47214L2.85317 0.92705L7.60845 -2.47214L1.76336 -2.42705L0.00000 -8.00000L-1.76336 -2.42705L-7.60845 -2.47214L-2.85317 0.92705L-4.70228 6.47214Z' transform='translate(12,19) scale(0.75,0.75)' fill='rgb(255,255,0)' stroke='rgb(200,200,0)'></path>
        
        <rect id='inspireCoconutsPassive_cooldown' width='30' height='0' style='fill:rgb(0,0,0);' opacity='0.45'></rect>
        <text id='inspireCoconutsPassive_amount' x='29' y='29' style='font-family:tahoma;font-size:12px;' text-anchor='end' fill='rgb(255,255,255)'></text>
        
    </svg>
    
    <svg id='emergencyCoconutShieldPassive' style='width:30;height:30;display:none;'>
        <circle cx='15' cy='15' r='14' fill='rgb(115,163,0)' stroke='rgb(0,0,0)' stroke-width='2'></circle>
        
        <circle cx='15' cy='15' r='11' fill='rgb(255,255,255,0.5)'></circle>
        <circle cx='15' cy='15' r='8' fill='rgb(150,75,0)' stroke='rgb(0,0,0)' stroke-width='1'></circle>
        
        <circle cx='17' cy='16' r='1.5' fill='rgb(94, 51, 7)'></circle><circle cx='12' cy='13' r='1.5' fill='rgb(94, 51, 7)'></circle><circle cx='17' cy='12' r='1.5' fill='rgb(94, 51, 7)'></circle>
        
        <rect id='emergencyCoconutShieldPassive_cooldown' width='30' height='0' style='fill:rgb(0,0,0);' opacity='0.45'></rect>
        <text id='emergencyCoconutShieldPassive_amount' x='29' y='29' style='font-family:tahoma;font-size:12px;' text-anchor='end' fill='rgb(255,255,255)'></text>
        
    </svg>
    
    <svg id='xFlamePassive' style='width:30;height:30;display:none;'>
        <circle cx='15' cy='15' r='14' fill='rgb(115,163,0)' stroke='rgb(0,0,0)' stroke-width='2'></circle>
        
        <path stroke='rgb(255,0,0)' stroke-width='6' d='M8 8L22 22M22 8L8 22'></path>
        <path stroke='rgb(255,100,0)' stroke-width='5' d='M8 8L22 22M22 8L8 22'></path>
        <path stroke='rgb(255,200,0)' stroke-width='1.5' d='M8 8L22 22M22 8L8 22'></path>
        
        <rect id='xFlamePassive_cooldown' width='30' height='0' style='fill:rgb(0,0,0);' opacity='0.45'></rect>
        <text id='xFlamePassive_amount' x='29' y='29' style='font-family:tahoma;font-size:12px;' text-anchor='end' fill='rgb(255,255,255)'></text>
        
    </svg>
    
    <svg id='ignitePassive' style='width:30;height:30;display:none;'>
        <circle cx='15' cy='15' r='14' fill='rgb(115,163,0)' stroke='rgb(0,0,0)' stroke-width='2'></circle>
        
        <path d='M15 25C5 24 5 13 15 5M15 25C25 24 25 13 15 5' fill='rgb(255,150,20)'></path>
        <path d='M15 25C10 24 10 17 15 10M15 25C20 24 20 17 15 10' fill='rgb(255,0,0)'></path>
        
        <rect id='ignitePassive_cooldown' width='30' height='0' style='fill:rgb(0,0,0);' opacity='0.45'></rect>
        <text id='ignitePassive_amount' x='29' y='29' style='font-family:tahoma;font-size:12px;' text-anchor='end' fill='rgb(255,255,255)'></text>
        
    </svg>
    
    <svg id='bubbleBombsPassive' style='width:30;height:30;display:none;'>
        <circle cx='15' cy='15' r='14' fill='rgb(115,163,0)' stroke='rgb(0,0,0)' stroke-width='2'></circle>
        
        <circle cx='15' cy='18' r='7' fill='rgb(80,200,255)' ></circle>
        <circle cx='15' cy='31' r='3' fill='rgb(80,80,80)'  transform='scale(1,0.4)'></circle>
        <path stroke='rgb(222, 222, 149)' stroke-width='2' fill='rgb(0,0,0,0)' d='M15 12C15 10 15 6 18 8'></path>
        <circle cx='18' cy='7' r='2' fill='rgb(255,100,0)' ></circle>
        
        <rect id='bubbleBombsPassive_cooldown' width='30' height='0' style='fill:rgb(0,0,0);' opacity='0.45'></rect>
        <text id='bubbleBombsPassive_amount' x='29' y='29' style='font-family:tahoma;font-size:12px;' text-anchor='end' fill='rgb(255,255,255)'></text>
        
    </svg>
    
    <svg id='coinScatterPassive' style='width:30;height:30;display:none;'>
        <circle cx='15' cy='15' r='14' fill='rgb(115,163,0)' stroke='rgb(0,0,0)' stroke-width='2'></circle>
        
        <circle cx='15' cy='15' r='9' fill='rgb(230, 208, 14)' ></circle>
        
        <path fill='rgb(217, 184, 52)' stroke='rgb(0,0,0)' stroke-width='1' d='M13 10C16 10 24 17 15 20C8 12 18 15 13 10Z'></path>
        <rect id='coinScatterPassive_cooldown' width='30' height='0' style='fill:rgb(0,0,0);' opacity='0.45'></rect>
        <text id='coinScatterPassive_amount' x='29' y='29' style='font-family:tahoma;font-size:12px;' text-anchor='end' fill='rgb(255,255,255)'></text>
        
    </svg>
    
    <svg id='diamondDrainPassive' style='width:30;height:30;display:none;'>
        <circle cx='15' cy='15' r='14' fill='rgb(115,163,0)' stroke='rgb(0,0,0)' stroke-width='2'></circle>
        
        <path fill='rgb(100,200,255)' d='M-2 0L2 0L4 2L0 6L-4 2Z' transform='translate(18,9) scale(1.9,2.15)' stroke='rgb(0,0,0)' stroke-width='0.6'></path>
        <path fill='rgb(242, 199, 29)' d='M13 10C16 10 24 17 15 20C8 12 18 15 13 10Z' transform='translate(-8,-4) scale(1.2,1.2)' stroke='rgb(0,0,0)' stroke-width='0.7'></path>
        
        <rect id='diamondDrainPassive_cooldown' width='30' height='0' style='fill:rgb(0,0,0);' opacity='0.45'></rect>
        <text id='diamondDrainPassive_amount' x='29' y='29' style='font-family:tahoma;font-size:12px;' text-anchor='end' fill='rgb(255,255,255)'></text>
        
    </svg>
    
    <svg id='gummyMorphPassive' style='width:30;height:30;display:none;'>
        <circle cx='15' cy='15' r='14' fill='rgb(115,163,0)' stroke='rgb(0,0,0)' stroke-width='2'></circle>
        
        <rect x='9' y='10' width='12' height='12' fill='rgb(255,50,255,0.75)'></rect>
        <path fill='rgb(25,255,126,0.75)' d='M9 21 C11 10 14 10 14 19C13 20 13 20 16 19C16 10 19 10 21 21'></path>
        <circle cx='10' cy='10' r='3' fill='rgb(25,255,126,0.75)'></circle><circle cx='20' cy='10' r='3' fill='rgb(25,255,126,0.75)'></circle>
        <circle cx='13' cy='15' r='0.7' fill='rgb(0,0,0)'></circle><circle cx='17' cy='15' r='0.7' fill='rgb(0,0,0)'></circle>
        
        <rect id='gummyMorphPassive_cooldown' width='30' height='0' style='fill:rgb(0,0,0);' opacity='0.45'></rect>
        <text id='gummyMorphPassive_amount' x='29' y='29' style='font-family:tahoma;font-size:12px;' text-anchor='end' fill='rgb(255,255,255)'></text>
        
    </svg>
    
    <svg id='focusPulserPassive' style='width:30;height:30;display:none;'>
        
        <circle cx='15' cy='15' r='14' fill='rgb(115,163,0)' stroke='rgb(0,0,0)' stroke-width='2'></circle>
        
        <path fill='rgb(255,255,255)' d='M15 25L7 18L12 15L 8 11C6 6 15 5 19 13L 20 15L13 20Z' transform='translate(2,0)' stroke='rgb(255,0,0)' stroke-width='2'></path>
        
        <rect id='focusPulserPassive_cooldown' width='30' height='0' style='fill:rgb(0,0,0);' opacity='0.45'></rect>
        <text id='focusPulserPassive_amount' x='29' y='29' style='font-family:tahoma;font-size:12px;' text-anchor='end' fill='rgb(255,255,255)'></text>
        
    </svg>
    
    <svg id='hastePulserPassive' style='width:30;height:30;display:none;'>
        <circle cx='15' cy='15' r='14' fill='rgb(115,163,0)' stroke='rgb(0,0,0)' stroke-width='2'></circle>
        
        <path fill='rgb(255,255,255)' d='M15 25L7 18L12 15L 8 11C6 6 15 5 19 13L 20 15L13 20Z' transform='translate(2,0)' stroke='rgb(0,0,255)' stroke-width='2'></path>
        
        <rect id='hastePulserPassive_cooldown' width='30' height='0' style='fill:rgb(0,0,0);' opacity='0.45'></rect>
        <text id='hastePulserPassive_amount' x='29' y='29' style='font-family:tahoma;font-size:12px;' text-anchor='end' fill='rgb(255,255,255)'></text>
        
    </svg>
    
    <svg id='popStarPassive' style='width:30;height:30;display:none;'>
        <circle cx='15' cy='15' r='14' fill='rgb(115,163,0)' stroke='rgb(0,0,0)' stroke-width='2'></circle>
        <circle cx='8' cy='8' r='2' fill='rgb(30,110,205)' stroke='rgb(0,0,0,0.4)'></circle><circle cx='22' cy='10' r='3' fill='rgb(30,110,205)' stroke='rgb(0,0,0,0.4)'></circle><circle cx='15' cy='22' r='3' fill='rgb(30,110,205)' stroke='rgb(0,0,0,0.4)'></circle>
        <path d='M0.00000 3.00000L4.70228 6.47214L2.85317 0.92705L7.60845 -2.47214L1.76336 -2.42705L0.00000 -8.00000L-1.76336 -2.42705L-7.60845 -2.47214L-2.85317 0.92705L-4.70228 6.47214Z' transform='translate(15,15) scale(1.3,1.3)' fill='rgb(60,170,255)' stroke='rgb(10,80,200)'></path>
        <rect id='popStarPassive_cooldown' width='30' height='0' style='fill:rgb(0,0,0);' opacity='0.45'></rect>
        <text id='popStarPassive_amount' x='29' y='29' style='font-family:tahoma;font-size:12px;' text-anchor='end' fill='rgb(255,255,255)'></text>
        
    </svg>
    
    <svg id='scorchingStarPassive' style='width:30;height:30;display:none;'>
        <circle cx='15' cy='15' r='14' fill='rgb(115,163,0)' stroke='rgb(0,0,0)' stroke-width='2'></circle>
        <path d='M8 12 C5 10 5 8 10 3C15 15 15 15 13 15M19 12C15 15 25 1 25 12Z' fill='rgb(255,100,0)'></path>
        <path d='M0.00000 3.00000L4.70228 6.47214L2.85317 0.92705L7.60845 -2.47214L1.76336 -2.42705L0.00000 -8.00000L-1.76336 -2.42705L-7.60845 -2.47214L-2.85317 0.92705L-4.70228 6.47214Z' transform='translate(15,15) scale(1.3,1.3)' fill='rgb(220,0,0)' stroke='rgb(150,0,0)'></path>
        <rect id='scorchingStarPassive_cooldown' width='30' height='0' style='fill:rgb(0,0,0);' opacity='0.45'></rect>
        <text id='scorchingStarPassive_amount' x='29' y='29' style='font-family:tahoma;font-size:12px;' text-anchor='end' fill='rgb(255,255,255)'></text>
        
    </svg>
    
    <svg id='gummyStarPassive' style='width:30;height:30;display:none;'>
        <defs>
            <linearGradient id='gummyStarGrad' x1='0.4' x2='0.6' y1='0.4' y2='0.6'>
                <stop offset='10%' stop-color='rgb(255, 50, 255)'/>
                <stop offset='90%' stop-color='rgb(25, 255, 126)'/>
            </linearGradient>
            <linearGradient id='gummyStarOutline' x1='0.4' x2='0.6' y1='0.4' y2='0.6'>
                <stop offset='10%' stop-color='rgb(0, 205, 86)'/>
                <stop offset='90%' stop-color='rgb(205, 10, 205)'/>
            </linearGradient>
        </defs>
        <circle cx='15' cy='15' r='14' fill='rgb(115,163,0)' stroke='rgb(0,0,0)' stroke-width='2'></circle>
        <circle cx='9' cy='7' fill='rgb(205,10,205)' r='2'></circle>
        <circle cx='20' cy='7' fill='rgb(0,205,86)' r='2'></circle>
        <circle cx='24' cy='19' fill='rgb(205,10,205)' r='2'></circle>
        <circle cx='6' cy='19' fill='rgb(0,205,86)' r='2'></circle>
        <path d='M0.00000 3.00000L4.70228 6.47214L2.85317 0.92705L7.60845 -2.47214L1.76336 -2.42705L0.00000 -8.00000L-1.76336 -2.42705L-7.60845 -2.47214L-2.85317 0.92705L-4.70228 6.47214Z' transform='translate(15,15) scale(1.3,1.3)' fill='url(#gummyStarGrad)' stroke='url(#gummyStarOutline)'></path>
        <rect id='gummyStarPassive_cooldown' width='30' height='0' style='fill:rgb(0,0,0);' opacity='0.45'></rect>
        <text id='gummyStarPassive_amount' x='29' y='29' style='font-family:tahoma;font-size:12px;' text-anchor='end' fill='rgb(255,255,255)'></text>
        
    </svg>
    
    <svg id='guidingStarPassive' style='width:30;height:30;display:none;'>
        <circle cx='15' cy='15' r='14' fill='rgb(115,163,0)' stroke='rgb(0,0,0)' stroke-width='2'></circle>
        
        <g transform='scale(0.75,0.75) translate(5,5)'>
        <circle cx='15' cy='15' r='13' fill='rgb(200,200,200)' stroke='rgb(90,90,90)' stroke-width='3'></circle>
        <path d='M0 -5L-2 10L2 10Z' fill='rgb(255,0,0)' transform='translate(15,15) rotate(40) translate(0,-8)'></path>
        <path d='M0 -5L-2 10L2 10Z' fill='rgb(0,0,255)' transform='translate(15,15) rotate(180) translate(0,-8)'></path>
        <path d='M0 -5L-2 10L2 10Z' fill='rgb(0,0,0)' transform='translate(15,15) rotate(-40) translate(0,-8)'></path>
        <path d='M0.00000 3.00000L4.70228 6.47214L2.85317 0.92705L7.60845 -2.47214L1.76336 -2.42705L0.00000 -8.00000L-1.76336 -2.42705L-7.60845 -2.47214L-2.85317 0.92705L-4.70228 6.47214Z' transform='translate(15,15) scale(1.3,1.3)' fill='rgb(255,235,100)' stroke='rgb(100,100,100)'></path>
        
        </g>
        
        <rect id='guidingStarPassive_cooldown' width='30' height='0' style='fill:rgb(0,0,0);' opacity='0.45'></rect>
        <text id='guidingStarPassive_amount' x='29' y='29' style='font-family:tahoma;font-size:12px;' text-anchor='end' fill='rgb(255,255,255)'></text>
        
    </svg>
    
    <svg id='tabbyLove' style='width:30;height:30;display:none'>
        
        <rect width='30' height='30' fill='rgb(252, 186, 3)'></rect>
        <rect id='tabbyLove_cooldown' width='30' height='0' style='fill:rgb(0,0,0);' opacity='0'></rect>
        
        <circle cx='10' cy='13' r='2.2'></circle>
        <circle cx='20' cy='13' r='2.1'></circle>
        
        <path fill='rgb(0,0,0,0)' stroke='rgb(0,0,0)' stroke-width='1.25' d='M12 17C 12 19 18 19 18 17M15 18L15 21M10 21C10 23 15 23 15 21M15 18L15 21M20 21C20 23 15 23 15 21M0 16L8 18M0 23L8 21M30 16L22 18M30 23L22 21'></path>
        
        <path fill='rgb(0,0,0,0)' stroke='rgb(166, 129, 43)' stroke-width='2.5' d='M10 0L10 5M15 0 L 15 6M20 0 L20 5'></path>

        <text id='tabbyLove_amount' x='28' y='28' style='font-family:calibri;font-size:11px;' text-anchor='end'></text>
        
    </svg>
    
    <svg id='haste' style='width:30;height:30;display:none'>
        
        <rect width='30' height='30' fill='rgb(255,255,255)'></rect>
        <rect id='haste_cooldown' width='30' height='0' style='fill:rgb(0,0,0);' opacity='0.45'></rect>
        <path d='M18 9L15 21M12 26L15 21M16 26L15 21M11 11L16 15M23 15L16 15' stroke='rgb(130,130,130)' stroke-width='2'></path>
        <path d='M5 7 L11 7M2 15L12 15M3 23L11 23' stroke='rgb(130,130,130)' stroke-width='1.5' opacity='0.5'></path>
        <circle cx='18' cy='9' r='4'fill='rgb(130,130,130)'></circle>
        <text id='haste_amount' x='28' y='28' style='font-family:calibri;font-size:13px;' text-anchor='end'></text>
        
    </svg>
    
    <svg id='focus' style='width:30;height:30;display:none'>
        
        <rect width='30' height='30' fill='rgb(0,200,0)'></rect>
        <rect id='focus_cooldown' width='30' height='0' style='fill:rgb(0,0,0);' opacity='0.45'></rect>
        <path fill='rgb(0,0,0)' d='M5 15C10 0 20 0 25 15M5 15C10 30 20 30 25 15'></path>
        <circle cx='15' cy='15' r='3' fill='rgb(0,200,0)'></circle>
        <text id='focus_amount' x='28' y='28' style='font-family:calibri;font-size:13px;' text-anchor='end'></text>
        
    </svg>
    
    <svg id='haste__' style='width:30;height:30;display:none'>
        
        <rect width='30' height='30' fill='rgb(255,220,10)'></rect>
        <rect id='haste___cooldown' width='30' height='0' style='fill:rgb(0,0,0);' opacity='0.45'></rect>
        <path d='M18 9L15 21M12 26L15 21M16 26L15 21M11 11L16 15M23 15L16 15' stroke='rgb(130,130,130)' stroke-width='2'></path>
        <path d='M5 7 L11 7M2 15L12 15M3 23L11 23' stroke='rgb(130,130,130)' stroke-width='1.5' opacity='0.5'></path>
        <circle cx='18' cy='9' r='4'fill='rgb(130,130,130)'></circle>
        <text id='haste___amount' x='28' y='28' style='font-family:calibri;font-size:13px;' text-anchor='end'></text>
        
    </svg>
    
    <svg id='melody' style='width:30;height:30;display:none'>
        
        <rect width='30' height='30' fill='rgb(255,255,255)'></rect>
        <rect id='melody_cooldown' width='30' height='0' style='fill:rgb(0,0,0);' opacity='0.45'></rect>
        <path d='M6 22L8 8M8 8L23 8M23 8L20 22' stroke='rgb(0,0,0)' stroke-width='3'></path>
        <circle cx='5' cy='22' r='3'fill='rgb(0,0,0)'></circle>
        <circle cx='19' cy='22' r='3'fill='rgb(0,0,0)'></circle>
        <text id='melody_amount' x='28' y='28' style='font-family:calibri;font-size:13px;' text-anchor='end'></text>
        
    </svg>
    
    <svg id='bombCombo' style='width:30;height:30;display:none'>
        
        <rect width='30' height='30' fill='rgb(0,0,0)'></rect>
        <path d='M15 26 L17.169 19.505 L23.600 21.858 L19.875 16.113 L25.724 12.552 L18.909 11.883 L19.773 5.089 L15 10 L10.227 5.089 L11.091 11.883 L4.276 12.552 L10.125 16.113 L6.400 21.858 L12.831 19.505' fill='rgb(255,255,255)'></path>
        <rect id='bombCombo_cooldown' width='30' height='0' style='fill:rgb(0,0,0);' opacity='0.45'></rect>
        <text id='bombCombo_amount' x='28' y='28' style='font-family:calibri;font-size:13px;' fill='rgb(255,255,255)' text-anchor='end'></text>
        
    </svg>
    
    <svg id='blueBoost' style='width:30;height:30;display:none'>
        
        <rect width='30' height='30' fill='rgb(150,255,150)'></rect>
        <rect id='blueBoost_cooldown' width='30' height='0' style='fill:rgb(0,0,0);' opacity='0.45'></rect>
        <path fill='rgb(78, 135, 242)' stroke='rgb(0,0,0)' stroke-width='1' d='M-3 -3C-9 -15 9 -15 3 -3' transform='translate(15,15)'></path>
        <path fill='rgb(78, 135, 242)' stroke='rgb(0,0,0)' stroke-width='1' d='M-3 -3C-9 -15 9 -15 3 -3' transform='translate(15,15) rotate(90)'></path>
        <path fill='rgb(78, 135, 242)' stroke='rgb(0,0,0)' stroke-width='1' d='M-3 -3C-9 -15 9 -15 3 -3' transform='translate(15,15) rotate(180)'></path>
        <path fill='rgb(78, 135, 242)' stroke='rgb(0,0,0)' stroke-width='1' d='M-3 -3C-9 -15 9 -15 3 -3' transform='translate(15,15) rotate(270)'></path>
        <rect x='12' y='12' width='6' height='6' fill='rgb(78, 135, 242)'></rect>
        <path stroke='rgb(255,255,255)' stroke-width='2' d='M10 15L20 15M15 10L15 20'></path>
        <text id='blueBoost_amount' x='28' y='28' style='font-family:calibri;font-size:13px;' text-anchor='end'></text>
        
    </svg>
    
    <svg id='redBoost' style='width:30;height:30;display:none'>
        
        <rect width='30' height='30' fill='rgb(150,255,150)'></rect>
        <rect id='redBoost_cooldown' width='30' height='0' style='fill:rgb(0,0,0);' opacity='0.45'></rect>
        <path fill='rgb(237, 82, 73)' stroke='rgb(0,0,0)' stroke-width='1' d='M-3 -3C-9 -15 9 -15 3 -3' transform='translate(15,15)'></path>
        <path fill='rgb(237, 82, 73)' stroke='rgb(0,0,0)' stroke-width='1' d='M-3 -3C-9 -15 9 -15 3 -3' transform='translate(15,15) rotate(90)'></path>
        <path fill='rgb(237, 82, 73)' stroke='rgb(0,0,0)' stroke-width='1' d='M-3 -3C-9 -15 9 -15 3 -3' transform='translate(15,15) rotate(180)'></path>
        <path fill='rgb(237, 82, 73)' stroke='rgb(0,0,0)' stroke-width='1' d='M-3 -3C-9 -15 9 -15 3 -3' transform='translate(15,15) rotate(270)'></path>
        <rect x='12' y='12' width='6' height='6' fill='rgb(237, 82, 73)'></rect>
        <path stroke='rgb(255,255,255)' stroke-width='2' d='M10 15L20 15M15 10L15 20'></path>
        <text id='redBoost_amount' x='28' y='28' style='font-family:calibri;font-size:13px;' text-anchor='end'></text>
        
    </svg>
    
    <svg id='whiteBoost' style='width:30;height:30;display:none'>
        
        <rect width='30' height='30' fill='rgb(150,255,150)'></rect>
        <rect id='whiteBoost_cooldown' width='30' height='0' style='fill:rgb(0,0,0);' opacity='0.45'></rect>
        <path fill='rgb(200,200,200)' stroke='rgb(0,0,0)' stroke-width='1' d='M-3 -3C-9 -15 9 -15 3 -3' transform='translate(15,15)'></path>
        <path fill='rgb(200,200,200)' stroke='rgb(0,0,0)' stroke-width='1' d='M-3 -3C-9 -15 9 -15 3 -3' transform='translate(15,15) rotate(90)'></path>
        <path fill='rgb(200,200,200)' stroke='rgb(0,0,0)' stroke-width='1' d='M-3 -3C-9 -15 9 -15 3 -3' transform='translate(15,15) rotate(180)'></path>
        <path fill='rgb(200,200,200)' stroke='rgb(0,0,0)' stroke-width='1' d='M-3 -3C-9 -15 9 -15 3 -3' transform='translate(15,15) rotate(270)'></path>
        <rect x='12' y='12' width='6' height='6' fill='rgb(200,200,200)'></rect>
        <path stroke='rgb(255,255,255)' stroke-width='2' d='M10 15L20 15M15 10L15 20'></path>
        <text id='whiteBoost_amount' x='28' y='28' style='font-family:calibri;font-size:13px;' text-anchor='end'></text>
        
    </svg>
    
    <svg id='babyLove' style='width:30;height:30;display:none'>
    
        <rect width='30' height='30' fill='rgb(140, 227, 244)'></rect>
        <rect id='babyLove_cooldown' width='30' height='0' style='fill:rgb(0,0,0);' opacity='0.45'></rect>
        <path stroke='rgb(50, 50, 50)' stroke-width='1.5' d='M5 10C 7 5 13 5 15 9C 19 5 24 6 24 11C 25 14 14 20 15 25C 10 14 6 19 5 10' fill='rgb(240, 177, 226)' transform='scale(1.2,1.2) translate(-2,-3)'></path>
        <circle cx='12.4' cy='11.4' r='1' fill='rgb(70,70,70)'></circle>
        <circle cx='18.4' cy='10.5' r='1' fill='rgb(70,70,70)'></circle>
        <circle cx='15.8' cy='12.2' r='0.75' fill='rgb(70,70,70)'></circle>
        <circle cx='10.2' cy='23.4' r='1.5' fill='rgb(234, 34, 105)' transform='scale(1,0.6)'></circle>
        <circle cx='20.5' cy='21.6' r='1.5' fill='rgb(234, 34, 105)' transform='scale(1,0.6)'></circle>
        <path stroke='rgb(70, 70, 70)' stroke-width='0.8' d='M 13 15.5C 14 15 16 17.6 18 14.5C 17 19 15 18.2 13 15.5' fill='rgb(220,220,220)'></path>
        
        <text id='babyLove_amount' x='28' y='28' style='font-family:calibri;font-size:13px;' text-anchor='end'></text>
        
    </svg>
    
    <svg id='rage' style='width:30;height:30;display:none'>
    
        <rect width='30' height='30' fill='rgb(255, 149, 125)'></rect>
        <rect id='rage_cooldown' width='30' height='0' style='fill:rgb(0,0,0);' opacity='0.45'></rect>
        <path stroke='rgb(255, 20, 0)' stroke-width='2' d='M5 10C5 5 10 5 14 11M25 10C25 5 20 5 16 11M7 25 C 7 15 23 15 23 25M10 10L 10 15M20 10 L 20 15' fill='rgb(0,0,0,0)'></path>
        <text id='rage_amount' x='28' y='28' style='font-family:calibri;font-size:13px;' text-anchor='end'></text>
        
    </svg>

    <svg id='flameHeat' style='width:30;height:30;display:none;'>
        
        <rect width='30' height='30' fill='rgb(255,20,20)'></rect>
        <rect id='flameHeat_cooldown' width='30' height='0' style='fill:rgb(0,0,0);' opacity='0.45'></rect>
        <path d='M15 25C5 24 5 13 15 5M15 25C25 24 25 13 15 5' fill='rgb(255,150,20)'></path>
        <path d='M15 25C10 24 10 17 15 10M15 25C20 24 20 17 15 10' fill='rgb(205,100,0)'></path>
        <text id='flameHeat_amount' x='29' y='29' style='font-family:calibri;font-size:12px;' text-anchor='end'></text>
        
    </svg>
    
    <svg id='darkHeat' style='width:30;height:30;display:none;'>
        
        <rect width='30' height='30' fill='rgb(205,0,205)'></rect>
        <rect id='darkHeat_cooldown' width='30' height='0' style='fill:rgb(0,0,0);' opacity='0.45'></rect>
        <path d='M15 25C5 24 5 13 15 5M15 25C25 24 25 13 15 5' fill='rgb(255,0,0)'></path>
        <path d='M15 25C10 24 10 17 15 10M15 25C20 24 20 17 15 10' fill='rgb(205,0,0)'></path>
        <text id='darkHeat_amount' x='29' y='29' style='font-family:calibri;font-size:12px;' text-anchor='end'></text>
        
    </svg>
    
    <svg id='pollenMark' style='width:30;height:30;display:none'>
        
        <rect width='30' height='30' fill='rgb(255,255,255)'></rect>
        <rect id='pollenMark_cooldown' width='30' height='0' style='fill:rgb(0,0,0);' opacity='0.45'></rect>
        <circle cx='15' cy='15' r='12'fill='rgb(255,255,180)'></circle>
        <path d='M7 7L22 22M22 7L7 22' stroke='rgb(0,0,0)' stroke-width='1.2'></path>
        <circle cx='15' cy='15' r='7'fill='rgb(180,180,180)'></circle>
        <text id='pollenMark_amount' x='28' y='28' style='font-family:calibri;font-size:13px;' text-anchor='end'></text>
        
    </svg>
    
    <svg id='honeyMark' style='width:30;height:30;display:none'>
        
        <rect width='30' height='30' fill='rgb(255,255,255)'></rect>
        <rect id='honeyMark_cooldown' width='30' height='0' style='fill:rgb(0,0,0);' opacity='0.45'></rect>
        <circle cx='15' cy='15' r='12'fill='rgb(180,180,180)'></circle>
        <path d='M7 7L22 22M22 7L7 22' stroke='rgb(0,0,0)' stroke-width='1.2'></path>
        <circle cx='15' cy='15' r='7'fill='rgb(255,226,8)'></circle>
        <text id='honeyMark_amount' x='28' y='28' style='font-family:calibri;font-size:13px;' text-anchor='end'></text>
        
    </svg>
    
    <svg id='preciseMark' style='width:30;height:30;display:none'>
        
        <rect width='30' height='30' fill='rgb(255,255,255)'></rect>
        <rect id='preciseMark_cooldown' width='30' height='0' style='fill:rgb(0,0,0);' opacity='0.45'></rect>
        <circle cx='15' cy='15' r='12'fill='rgb(180,180,180)'></circle>
        <path d='M7 7L22 22M22 7L7 22' stroke='rgb(0,0,0)' stroke-width='1.2'></path>
        <circle cx='15' cy='15' r='7'fill='rgb(143,0,236)'></circle>
        <text id='preciseMark_amount' x='28' y='28' style='font-family:calibri;font-size:13px;' text-anchor='end'></text>
        
    </svg>
    
    <svg id='balloonAura' style='width:30;height:30;display:none'>
        
        <rect width='30' height='30' fill='rgb(255,255,0)'></rect>
        <rect id='balloonAura_cooldown' width='30' height='0' style='fill:rgb(0,0,0);' opacity='0.45'></rect>
        <circle cx='12' cy='12' r='7'fill='rgb(0,0,255)'></circle>
        <path stroke='rgb(200,200,200)' stroke-width='2' d='M13 18C10 20 12 25 20 26' fill='rgba(0,0,0,0)'></path>
        <text id='balloonAura_amount' x='28' y='28' style='font-family:calibri;font-size:13px;' text-anchor='end'></text>
        
    </svg>
    
    <svg id='cloudBoost' style='width:30;height:30;display:none'>
        
        <rect width='30' height='30' fill='rgb(150,150,200)'></rect>
        <rect id='cloudBoost_cooldown' width='30' height='0' style='fill:rgb(0,0,0);' opacity='0.45'></rect>
        <circle cx='15' cy='14' r='5'fill='rgb(255,255,255)'></circle>
        <circle cx='10' cy='16' r='3'fill='rgb(255,255,255)'></circle>
        <circle cx='21' cy='15' r='4'fill='rgb(255,255,255)'></circle>
        <path stroke='rgb(255,255,255)' stroke-width='1.5' d='M 12 22L 11 27M 18 20L 17 25M 22 22L 21 27' fill='rgb(0,0,0,0)'></path>
        <text id='cloudBoost_amount' x='28' y='28' style='font-family:calibri;font-size:13px;' text-anchor='end'></text>
        
    </svg>
    
    <svg id='flameFuel' style='width:30;height:30;display:none'>
        
        <rect width='30' height='30' fill='rgb(230,0,0)'></rect>
        <rect id='flameFuel_cooldown' width='30' height='0' style='fill:rgb(0,0,0);' opacity='0.45'></rect>
        <path d='M15 25C5 24 5 13 15 5M15 25C25 24 25 13 15 5' fill='rgb(30,0,0)'></path>
        <path d='M15 25C10 24 10 17 15 10M15 25C20 24 20 17 15 10' fill='rgb(105,0,0)'></path>
        <text id='flameFuel_amount' x='28' y='28' style='font-family:calibri;font-size:13px;' text-anchor='end'></text>
        
    </svg>
    
    <svg id='balloonBlessing' style='width:30;height:30;display:none'>
        <rect width='30' height='30' fill='rgb(255,255,0)'></rect>
        <rect id='balloonBlessing_cooldown' width='30' height='0' style='fill:rgb(0,0,0);' opacity='0.45'></rect>
        <circle cx='12' cy='12' r='7'fill='rgb(0,0,255)'></circle>
        <path stroke='rgb(200,200,200)' stroke-width='2' d='M13 18C10 20 12 25 20 26' fill='rgba(0,0,0,0)'></path>
        <text id='balloonBlessing_amount' x='28' y='28' style='font-family:calibri;font-size:13px;' text-anchor='end'></text>
        
    </svg>
    
    <svg id='precision' style='width:30;height:30;display:none'>
        
        <rect width='30' height='30' fill='rgb(143,0,236)'></rect>
        <rect id='precision_cooldown' width='30' height='0' style='fill:rgb(0,0,0);' opacity='0.45'></rect>
        <path stroke='rgb(0,0,0)' stroke-width='2' d='M15 9L15 22M7 12C7 8 22 8 22 12' fill='rgb(0,0,0,0)'></path>
        <text id='precision_amount' x='28' y='28' style='font-family:calibri;font-size:13px;' text-anchor='end'></text>
        
    </svg>
    
    <svg id='rage' style='width:30;height:30;display:none'>
        
        <rect width='30' height='30' fill='rgb(255, 149, 125)'></rect>
        <rect id='rage_cooldown' width='30' height='0' style='fill:rgb(0,0,0);' opacity='0.45'></rect>
        <path stroke='rgb(255, 20, 0)' stroke-width='2' d='M5 10C5 5 10 5 14 11M25 10C25 5 20 5 16 11M7 25 C 7 15 23 15 23 25M10 10L 10 15M20 10 L 20 15' fill='rgb(0,0,0,0)'></path>
        <text id='rage_amount' x='28' y='28' style='font-family:calibri;font-size:13px;' text-anchor='end'></text>
        
    </svg>
    
    <svg id='gummyMorph' style='width:30;height:30;display:none;'>
        <rect width='30' height='30' fill='rgb(255,50,255,0.75)'></rect>
        
        <path fill='rgb(25,255,126,0.75)' d='M9 21 C11 10 14 10 14 19C13 20 13 20 16 19C16 10 19 10 21 21'></path>
        <circle cx='10' cy='10' r='3' fill='rgb(25,255,126,0.75)'></circle><circle cx='20' cy='10' r='3' fill='rgb(25,255,126,0.75)'></circle>
        <circle cx='13' cy='15' r='0.7' fill='rgb(0,0,0)'></circle><circle cx='17' cy='15' r='0.7' fill='rgb(0,0,0)'></circle>
        
        <rect id='gummyMorph_cooldown' width='30' height='0' style='fill:rgb(0,0,0);' opacity='0.45'></rect>
        <text id='gummyMorph_amount' x='29' y='29' style='font-family:tahoma;font-size:12px;' text-anchor='end' fill='rgb(255,255,255)'></text>
        
    </svg>
    
    <svg id='coconutShield' style='width:30;height:30;display:none;'>
        <rect width='30' height='30' fill='rgb(205,205,205)'></rect>
        
        <circle cx='15' cy='15' r='10' fill='rgb(255,255,255)'></circle>
        <circle cx='15' cy='15' r='8' fill='rgb(150,75,0)' stroke='rgb(0,0,0)' stroke-width='1'></circle>
        
        <circle cx='17' cy='16' r='1.5' fill='rgb(94, 51, 7)'></circle><circle cx='12' cy='13' r='1.5' fill='rgb(94, 51, 7)'></circle><circle cx='17' cy='12' r='1.5' fill='rgb(94, 51, 7)'></circle>
        
        <rect id='coconutShield_cooldown' width='30' height='0' style='fill:rgb(0,0,0);' opacity='0.45'></rect>
        <text id='coconutShield_amount' x='29' y='29' style='font-family:tahoma;font-size:12px;' text-anchor='end' fill='rgb(255,255,255)'></text>
        
    </svg>
    
    <svg id='tidePower' style='width:30;height:30;display:none'>
        
        <rect width='30' height='30' fill='rgb(70,130,255)'></rect>
        <rect id='tidePower_cooldown' width='30' height='0' style='fill:rgb(0,0,0);' opacity='0.45'></rect>
        
        <g transform="translate(2,32) scale(0.009,-0.011)" fill="rgb(200,200,200)" stroke="rgb(200,200,200)" stroke-width='100'>
        <path d="M1310 2473 c-52 -6 -226 -61 -295 -93 -100 -45 -201 -117 -298 -214
        -157 -156 -281 -363 -357 -596 -58 -176 -73 -270 -73 -450 -1 -200 24 -324 86
        -440 l42 -78 68 -17 c83 -20 139 -11 223 36 54 31 58 31 140 25 46 -4 100 -14
        119 -22 63 -26 159 -18 255 21 72 30 95 35 165 35 67 0 85 3 99 19 42 46 38
        135 -8 164 -13 9 -47 17 -76 19 l-52 3 -35 85 c-59 143 -61 333 -5 492 43 121
        119 193 218 204 43 5 52 3 70 -17 34 -39 53 -101 80 -265 26 -163 44 -210 117
        -312 54 -75 74 -82 233 -82 134 0 141 1 204 31 93 44 142 88 179 161 l31 63 0
        192 c0 205 -9 274 -55 405 -66 189 -214 362 -404 472 -150 87 -376 155 -531
        161 -58 2 -121 1 -140 -2z m270 -50 c92 -17 263 -74 333 -109 197 -100 366
        -282 436 -469 49 -130 61 -209 61 -396 0 -186 -5 -216 -49 -283 l-26 -40 -8
        135 c-24 426 -47 580 -101 673 -62 106 -234 249 -391 326 -150 72 -246 93
        -397 87 -142 -6 -213 -18 -318 -53 -114 -38 -213 -89 -279 -144 -69 -57 -96
        -98 -111 -165 -12 -58 -83 -166 -194 -300 -78 -93 -121 -163 -169 -275 -20
        -49 -26 -56 -22 -30 37 219 153 475 298 654 191 238 399 359 697 405 63 10
        132 6 240 -16z m14 -118 c168 -29 319 -107 476 -245 167 -147 187 -211 215
        -675 l15 -240 -23 -18 c-12 -11 -38 -32 -56 -48 -45 -38 -66 -43 -154 -35 -39
        4 -90 8 -112 9 -53 3 -64 11 -108 84 -36 59 -38 69 -62 250 -37 279 -77 410
        -156 504 -40 48 -79 68 -64 32 17 -38 17 -83 1 -108 -9 -14 -48 -41 -87 -60
        -94 -46 -144 -84 -192 -147 -109 -144 -161 -363 -126 -530 13 -59 61 -172 78
        -182 15 -10 14 -36 -1 -36 -7 0 -35 -12 -63 -26 -75 -37 -132 -46 -196 -29
        -30 8 -93 15 -140 15 -91 0 -86 2 -234 -78 -30 -17 -56 -22 -116 -22 l-76 0
        -16 62 c-30 114 -40 192 -40 313 0 234 50 379 193 555 155 191 200 259 215
        330 4 19 13 47 21 61 37 73 171 160 334 217 73 25 122 35 260 56 58 8 133 5
        214 -9z m79 -555 c14 -36 33 -96 42 -135 19 -80 55 -324 55 -371 0 -18 14 -58
        30 -89 45 -86 28 -78 -23 10 -40 70 -46 89 -66 213 -26 166 -55 254 -96 294
        -28 28 -34 30 -92 25 -40 -3 -75 -13 -98 -27 -20 -12 -38 -20 -41 -17 -3 3 34
        27 82 54 55 30 100 64 122 91 42 51 47 48 85 -48z m-326 -142 c-75 -100 -112
        -232 -111 -398 0 -92 4 -129 23 -185 41 -124 76 -175 121 -175 50 0 88 -20 95
        -49 7 -32 -9 -80 -27 -83 -7 0 -44 -2 -83 -3 -53 -1 -89 -9 -147 -33 -88 -37
        -177 -42 -275 -17 -31 8 -87 15 -124 15 -56 0 -79 -6 -143 -36 -67 -32 -84
        -36 -134 -32 -66 5 -112 25 -122 53 -7 19 -3 20 72 22 82 3 112 13 208 68 44
        26 47 26 175 20 222 -11 235 -10 314 30 89 44 94 60 52 147 -61 128 -75 241
        -46 368 28 121 59 186 132 278 40 49 55 57 20 10z"/>
        <path d="M1130 2124 c-71 -13 -220 -90 -220 -114 0 -5 22 -10 50 -10 55 0 291
        44 353 66 52 18 54 18 73 -11 15 -23 15 -27 0 -49 -9 -14 -55 -45 -103 -70
        -284 -147 -424 -401 -449 -816 l-7 -125 -14 45 c-8 25 -17 90 -20 145 -12 215
        69 440 209 587 30 30 119 99 199 151 211 139 251 191 56 73 -156 -95 -196
        -123 -260 -185 -223 -214 -299 -585 -183 -892 44 -119 53 -95 60 176 7 242 32
        353 111 503 78 146 165 232 315 307 154 77 182 147 80 200 -26 14 -60 19 -130
        21 -52 1 -106 0 -120 -2z m125 -33 c-13 -11 -194 -45 -202 -38 -8 9 44 28 102
        37 72 11 111 11 100 1z"/>
        <path d="M1966 1749 c-32 -25 -34 -59 -5 -131 32 -80 49 -148 49 -200 0 -81
        37 -126 87 -107 31 11 43 40 43 104 0 125 -91 355 -140 355 -4 0 -19 -9 -34
        -21z m73 -81 c59 -126 88 -266 62 -306 -5 -8 -17 -12 -27 -10 -14 2 -20 19
        -30 85 -6 45 -24 117 -39 160 -27 76 -29 133 -5 133 5 0 22 -28 39 -62z"/>
        </g>
        
        <text id='tidePower_amount' x='28' y='28' style='font-family:calibri;font-size:13px;' text-anchor='end'></text>
        
    </svg>
    
    <svg id='tidalSurge' style='width:30;height:30;display:none'>
        
        <rect width='30' height='30' fill='rgb(18, 60, 230)'></rect>
        <rect id='tidalSurge_cooldown' width='30' height='0' style='fill:rgb(0,0,0);' opacity='0.45'></rect>
        
        <g transform="translate(2,32) scale(0.009,-0.011)" fill="rgb(200,200,200)" stroke="rgb(200,200,200)" stroke-width='100'>
        <path d="M1310 2473 c-52 -6 -226 -61 -295 -93 -100 -45 -201 -117 -298 -214
        -157 -156 -281 -363 -357 -596 -58 -176 -73 -270 -73 -450 -1 -200 24 -324 86
        -440 l42 -78 68 -17 c83 -20 139 -11 223 36 54 31 58 31 140 25 46 -4 100 -14
        119 -22 63 -26 159 -18 255 21 72 30 95 35 165 35 67 0 85 3 99 19 42 46 38
        135 -8 164 -13 9 -47 17 -76 19 l-52 3 -35 85 c-59 143 -61 333 -5 492 43 121
        119 193 218 204 43 5 52 3 70 -17 34 -39 53 -101 80 -265 26 -163 44 -210 117
        -312 54 -75 74 -82 233 -82 134 0 141 1 204 31 93 44 142 88 179 161 l31 63 0
        192 c0 205 -9 274 -55 405 -66 189 -214 362 -404 472 -150 87 -376 155 -531
        161 -58 2 -121 1 -140 -2z m270 -50 c92 -17 263 -74 333 -109 197 -100 366
        -282 436 -469 49 -130 61 -209 61 -396 0 -186 -5 -216 -49 -283 l-26 -40 -8
        135 c-24 426 -47 580 -101 673 -62 106 -234 249 -391 326 -150 72 -246 93
        -397 87 -142 -6 -213 -18 -318 -53 -114 -38 -213 -89 -279 -144 -69 -57 -96
        -98 -111 -165 -12 -58 -83 -166 -194 -300 -78 -93 -121 -163 -169 -275 -20
        -49 -26 -56 -22 -30 37 219 153 475 298 654 191 238 399 359 697 405 63 10
        132 6 240 -16z m14 -118 c168 -29 319 -107 476 -245 167 -147 187 -211 215
        -675 l15 -240 -23 -18 c-12 -11 -38 -32 -56 -48 -45 -38 -66 -43 -154 -35 -39
        4 -90 8 -112 9 -53 3 -64 11 -108 84 -36 59 -38 69 -62 250 -37 279 -77 410
        -156 504 -40 48 -79 68 -64 32 17 -38 17 -83 1 -108 -9 -14 -48 -41 -87 -60
        -94 -46 -144 -84 -192 -147 -109 -144 -161 -363 -126 -530 13 -59 61 -172 78
        -182 15 -10 14 -36 -1 -36 -7 0 -35 -12 -63 -26 -75 -37 -132 -46 -196 -29
        -30 8 -93 15 -140 15 -91 0 -86 2 -234 -78 -30 -17 -56 -22 -116 -22 l-76 0
        -16 62 c-30 114 -40 192 -40 313 0 234 50 379 193 555 155 191 200 259 215
        330 4 19 13 47 21 61 37 73 171 160 334 217 73 25 122 35 260 56 58 8 133 5
        214 -9z m79 -555 c14 -36 33 -96 42 -135 19 -80 55 -324 55 -371 0 -18 14 -58
        30 -89 45 -86 28 -78 -23 10 -40 70 -46 89 -66 213 -26 166 -55 254 -96 294
        -28 28 -34 30 -92 25 -40 -3 -75 -13 -98 -27 -20 -12 -38 -20 -41 -17 -3 3 34
        27 82 54 55 30 100 64 122 91 42 51 47 48 85 -48z m-326 -142 c-75 -100 -112
        -232 -111 -398 0 -92 4 -129 23 -185 41 -124 76 -175 121 -175 50 0 88 -20 95
        -49 7 -32 -9 -80 -27 -83 -7 0 -44 -2 -83 -3 -53 -1 -89 -9 -147 -33 -88 -37
        -177 -42 -275 -17 -31 8 -87 15 -124 15 -56 0 -79 -6 -143 -36 -67 -32 -84
        -36 -134 -32 -66 5 -112 25 -122 53 -7 19 -3 20 72 22 82 3 112 13 208 68 44
        26 47 26 175 20 222 -11 235 -10 314 30 89 44 94 60 52 147 -61 128 -75 241
        -46 368 28 121 59 186 132 278 40 49 55 57 20 10z"/>
        <path d="M1130 2124 c-71 -13 -220 -90 -220 -114 0 -5 22 -10 50 -10 55 0 291
        44 353 66 52 18 54 18 73 -11 15 -23 15 -27 0 -49 -9 -14 -55 -45 -103 -70
        -284 -147 -424 -401 -449 -816 l-7 -125 -14 45 c-8 25 -17 90 -20 145 -12 215
        69 440 209 587 30 30 119 99 199 151 211 139 251 191 56 73 -156 -95 -196
        -123 -260 -185 -223 -214 -299 -585 -183 -892 44 -119 53 -95 60 176 7 242 32
        353 111 503 78 146 165 232 315 307 154 77 182 147 80 200 -26 14 -60 19 -130
        21 -52 1 -106 0 -120 -2z m125 -33 c-13 -11 -194 -45 -202 -38 -8 9 44 28 102
        37 72 11 111 11 100 1z"/>
        <path d="M1966 1749 c-32 -25 -34 -59 -5 -131 32 -80 49 -148 49 -200 0 -81
        37 -126 87 -107 31 11 43 40 43 104 0 125 -91 355 -140 355 -4 0 -19 -9 -34
        -21z m73 -81 c59 -126 88 -266 62 -306 -5 -8 -17 -12 -27 -10 -14 2 -20 19
        -30 85 -6 45 -24 117 -39 160 -27 76 -29 133 -5 133 5 0 22 -28 39 -62z"/>
        </g>
        <text id='tidalSurge_amount' x='28' y='28' style='font-family:calibri;font-size:13px;' text-anchor='end'></text>
        
    </svg>
    
    <svg id='tideBlessing' style='width:30;height:30;display:none'>
        
        <rect width='30' height='30' fill='rgb(38, 90, 220)'></rect>
        <rect id='tideBlessing_cooldown' width='30' height='0' style='fill:rgb(0,0,0);' opacity='0.45'></rect>
        
        <g transform="translate(2,32) scale(0.009,-0.011)" fill="rgb(200,200,200)" stroke="rgb(200,200,200)" stroke-width='100'>
        <path d="M1310 2473 c-52 -6 -226 -61 -295 -93 -100 -45 -201 -117 -298 -214
        -157 -156 -281 -363 -357 -596 -58 -176 -73 -270 -73 -450 -1 -200 24 -324 86
        -440 l42 -78 68 -17 c83 -20 139 -11 223 36 54 31 58 31 140 25 46 -4 100 -14
        119 -22 63 -26 159 -18 255 21 72 30 95 35 165 35 67 0 85 3 99 19 42 46 38
        135 -8 164 -13 9 -47 17 -76 19 l-52 3 -35 85 c-59 143 -61 333 -5 492 43 121
        119 193 218 204 43 5 52 3 70 -17 34 -39 53 -101 80 -265 26 -163 44 -210 117
        -312 54 -75 74 -82 233 -82 134 0 141 1 204 31 93 44 142 88 179 161 l31 63 0
        192 c0 205 -9 274 -55 405 -66 189 -214 362 -404 472 -150 87 -376 155 -531
        161 -58 2 -121 1 -140 -2z m270 -50 c92 -17 263 -74 333 -109 197 -100 366
        -282 436 -469 49 -130 61 -209 61 -396 0 -186 -5 -216 -49 -283 l-26 -40 -8
        135 c-24 426 -47 580 -101 673 -62 106 -234 249 -391 326 -150 72 -246 93
        -397 87 -142 -6 -213 -18 -318 -53 -114 -38 -213 -89 -279 -144 -69 -57 -96
        -98 -111 -165 -12 -58 -83 -166 -194 -300 -78 -93 -121 -163 -169 -275 -20
        -49 -26 -56 -22 -30 37 219 153 475 298 654 191 238 399 359 697 405 63 10
        132 6 240 -16z m14 -118 c168 -29 319 -107 476 -245 167 -147 187 -211 215
        -675 l15 -240 -23 -18 c-12 -11 -38 -32 -56 -48 -45 -38 -66 -43 -154 -35 -39
        4 -90 8 -112 9 -53 3 -64 11 -108 84 -36 59 -38 69 -62 250 -37 279 -77 410
        -156 504 -40 48 -79 68 -64 32 17 -38 17 -83 1 -108 -9 -14 -48 -41 -87 -60
        -94 -46 -144 -84 -192 -147 -109 -144 -161 -363 -126 -530 13 -59 61 -172 78
        -182 15 -10 14 -36 -1 -36 -7 0 -35 -12 -63 -26 -75 -37 -132 -46 -196 -29
        -30 8 -93 15 -140 15 -91 0 -86 2 -234 -78 -30 -17 -56 -22 -116 -22 l-76 0
        -16 62 c-30 114 -40 192 -40 313 0 234 50 379 193 555 155 191 200 259 215
        330 4 19 13 47 21 61 37 73 171 160 334 217 73 25 122 35 260 56 58 8 133 5
        214 -9z m79 -555 c14 -36 33 -96 42 -135 19 -80 55 -324 55 -371 0 -18 14 -58
        30 -89 45 -86 28 -78 -23 10 -40 70 -46 89 -66 213 -26 166 -55 254 -96 294
        -28 28 -34 30 -92 25 -40 -3 -75 -13 -98 -27 -20 -12 -38 -20 -41 -17 -3 3 34
        27 82 54 55 30 100 64 122 91 42 51 47 48 85 -48z m-326 -142 c-75 -100 -112
        -232 -111 -398 0 -92 4 -129 23 -185 41 -124 76 -175 121 -175 50 0 88 -20 95
        -49 7 -32 -9 -80 -27 -83 -7 0 -44 -2 -83 -3 -53 -1 -89 -9 -147 -33 -88 -37
        -177 -42 -275 -17 -31 8 -87 15 -124 15 -56 0 -79 -6 -143 -36 -67 -32 -84
        -36 -134 -32 -66 5 -112 25 -122 53 -7 19 -3 20 72 22 82 3 112 13 208 68 44
        26 47 26 175 20 222 -11 235 -10 314 30 89 44 94 60 52 147 -61 128 -75 241
        -46 368 28 121 59 186 132 278 40 49 55 57 20 10z"/>
        <path d="M1130 2124 c-71 -13 -220 -90 -220 -114 0 -5 22 -10 50 -10 55 0 291
        44 353 66 52 18 54 18 73 -11 15 -23 15 -27 0 -49 -9 -14 -55 -45 -103 -70
        -284 -147 -424 -401 -449 -816 l-7 -125 -14 45 c-8 25 -17 90 -20 145 -12 215
        69 440 209 587 30 30 119 99 199 151 211 139 251 191 56 73 -156 -95 -196
        -123 -260 -185 -223 -214 -299 -585 -183 -892 44 -119 53 -95 60 176 7 242 32
        353 111 503 78 146 165 232 315 307 154 77 182 147 80 200 -26 14 -60 19 -130
        21 -52 1 -106 0 -120 -2z m125 -33 c-13 -11 -194 -45 -202 -38 -8 9 44 28 102
        37 72 11 111 11 100 1z"/>
        <path d="M1966 1749 c-32 -25 -34 -59 -5 -131 32 -80 49 -148 49 -200 0 -81
        37 -126 87 -107 31 11 43 40 43 104 0 125 -91 355 -140 355 -4 0 -19 -9 -34
        -21z m73 -81 c59 -126 88 -266 62 -306 -5 -8 -17 -12 -27 -10 -14 2 -20 19
        -30 85 -6 45 -24 117 -39 160 -27 76 -29 133 -5 133 5 0 22 -28 39 -62z"/>
        </g>
        <text id='tideBlessing_amount' x='28' y='28' style='font-family:calibri;font-size:13px;' text-anchor='end'></text>
        
    </svg>
    
    <svg id='popStarAura' style='width:30;height:30;display:none;'>
        <rect width='30' height='30' fill='rgb(150,150,150)'></rect>
        <rect id='popStarAura_cooldown' width='30' height='0' style='fill:rgb(0,0,0);' opacity='0.45'></rect>
        <circle cx='6' cy='6' r='3' fill='rgb(30,110,205)' stroke='rgb(0,0,0,0.4)'></circle><circle cx='22' cy='10' r='3' fill='rgb(30,110,205)' stroke='rgb(0,0,0,0.4)'></circle><circle cx='15' cy='22' r='3' fill='rgb(30,110,205)' stroke='rgb(0,0,0,0.4)'></circle>
        <path d='M0.00000 3.00000L4.70228 6.47214L2.85317 0.92705L7.60845 -2.47214L1.76336 -2.42705L0.00000 -8.00000L-1.76336 -2.42705L-7.60845 -2.47214L-2.85317 0.92705L-4.70228 6.47214Z' transform='translate(15,15) scale(1.3,1.3)' fill='rgb(60,170,255)' stroke='rgb(10,80,200)'></path>
        <text id='popStarAura_amount' x='29' y='29' style='font-family:calibri;font-size:12px;' text-anchor='end'></text>
        
    </svg>
    
    <svg id='scorchingStarAura' style='width:30;height:30;display:none;'>
        <rect width='30' height='30' fill='rgb(150,150,150)'></rect>
        <rect id='scorchingStarAura_cooldown' width='30' height='0' style='fill:rgb(0,0,0);' opacity='0.45'></rect>
        <path d='M8 12 C5 10 5 8 10 3C15 15 15 15 13 15M19 12C15 15 25 1 25 12Z' fill='rgb(255,100,0)'></path>
        <path d='M0.00000 3.00000L4.70228 6.47214L2.85317 0.92705L7.60845 -2.47214L1.76336 -2.42705L0.00000 -8.00000L-1.76336 -2.42705L-7.60845 -2.47214L-2.85317 0.92705L-4.70228 6.47214Z' transform='translate(15,15) scale(1.3,1.3)' fill='rgb(220,0,0)' stroke='rgb(150,0,0)'></path>
        <text id='scorchingStarAura_amount' x='29' y='29' style='font-family:calibri;font-size:12px;' text-anchor='end'></text>
        
    </svg>
    
    <svg id='gummyStarAura' style='width:30;height:30;display:none;'>
    
        <defs>
            <linearGradient id='gummyStarGrad' x1='0.4' x2='0.6' y1='0.4' y2='0.6'>
                <stop offset='10%' stop-color='rgb(255, 50, 255)'/>
                <stop offset='90%' stop-color='rgb(25, 255, 126)'/>
            </linearGradient>
            <linearGradient id='gummyStarOutline' x1='0.4' x2='0.6' y1='0.4' y2='0.6'>
                <stop offset='10%' stop-color='rgb(0, 205, 86)'/>
                <stop offset='90%' stop-color='rgb(205, 10, 205)'/>
            </linearGradient>
        </defs>
        <rect width='30' height='30' fill='rgb(150,150,150)'></rect>
        <rect id='gummyStarAura_cooldown' width='30' height='0' style='fill:rgb(0,0,0);' opacity='0.45'></rect>
        <circle cx='9' cy='7' fill='rgb(205,10,205)' r='2'></circle>
        <circle cx='20' cy='7' fill='rgb(0,205,86)' r='2'></circle>
        <circle cx='24' cy='19' fill='rgb(205,10,205)' r='2'></circle>
        <circle cx='6' cy='19' fill='rgb(0,205,86)' r='2'></circle>
        <path d='M0.00000 3.00000L4.70228 6.47214L2.85317 0.92705L7.60845 -2.47214L1.76336 -2.42705L0.00000 -8.00000L-1.76336 -2.42705L-7.60845 -2.47214L-2.85317 0.92705L-4.70228 6.47214Z' transform='translate(15,15) scale(1.3,1.3)' fill='url(#gummyStarGrad)' stroke='url(#gummyStarOutline)'></path>
        <text id='gummyStarAura_amount' x='29' y='29' style='font-family:calibri;font-size:12px;' text-anchor='end'></text>
        
    </svg>
    
    <svg id='guidingStarAura' style='width:30;height:30;display:none'>
    
        <rect width='30' height='30' fill='rgb(150,150,150)'></rect>
        <rect id='guidingStarAura_cooldown' width='30' height='0' style='fill:rgb(0,0,0);' opacity='0.45'></rect>
        <circle cx='15' cy='15' r='13' fill='rgb(200,200,200)' stroke='rgb(90,90,90)' stroke-width='3'></circle>
        <path d='M0 -5L-2 10L2 10Z' fill='rgb(255,0,0)' transform='translate(15,15) rotate(40) translate(0,-8)'></path>
        <path d='M0 -5L-2 10L2 10Z' fill='rgb(0,0,255)' transform='translate(15,15) rotate(180) translate(0,-8)'></path>
        <path d='M0 -5L-2 10L2 10Z' fill='rgb(0,0,0)' transform='translate(15,15) rotate(-40) translate(0,-8)'></path>
        <path d='M0.00000 3.00000L4.70228 6.47214L2.85317 0.92705L7.60845 -2.47214L1.76336 -2.42705L0.00000 -8.00000L-1.76336 -2.42705L-7.60845 -2.47214L-2.85317 0.92705L-4.70228 6.47214Z' transform='translate(15,15) scale(1.3,1.3)' fill='rgb(255,235,100)' stroke='rgb(100,100,100)'></path>
        <text id='guidingStarAura_amount' x='29' y='29' style='font-family:calibri;font-size:12px;' text-anchor='end'></text>
        
    </svg>
    
    <svg id='glueBuff' style='width:30;height:30;display:none'>
        
        <rect width='30' height='30' fill='rgb(255,200,0)'></rect>
        <rect id='glueBuff_cooldown' width='30' height='0' style='fill:rgb(0,0,0);' opacity='0.45'></rect>
        <text id='glueBuff_amount' x='28' y='28' style='font-family:calibri;font-size:13px;' text-anchor='end'></text>
        <rect x='33' y='16' rx='7' width='20' height='30' fill='rgb(255,255,255)' stroke='rgb(0,0,0)' stroke-width='1.5' transform='scale(0.4285,0.4285) rotate(15)'></rect>
        <rect x='39.5' y='6' rx='1' width='8' height='10' fill='rgb(255,150,0)' stroke='rgb(0,0,0)' stroke-width='1.5' transform='scale(0.4285,0.4285) rotate(15)'></rect>
        <path fill='rgb(255,30,255)' d='M10 10L20 10L10 25Z' transform='scale(0.4285,0.4285) rotate(15) translate(28,12)'></path>
        <path fill='rgb(25,255,100)' d='M10 10L20 10L10 25Z' transform='scale(0.4285,0.4285) translate(44,62) rotate(195)'></path>
        
    </svg>
    
    <svg id='oilBuff' style='width:30;height:30;display:none'>
        
        <rect width='30' height='30' fill='rgb(255,200,0)'></rect>
        <rect id='oilBuff_cooldown' width='30' height='0' style='fill:rgb(0,0,0);' opacity='0.45'></rect>
        <text id='oilBuff_amount' x='28' y='28' style='font-family:calibri;font-size:13px;' text-anchor='end'></text>
        <path fill='rgb(255,255,120)' stroke='rgb(0,0,0)' stroke-width='1.5' d='M35 55C17 54 17 36 28 30C 31 28 31 21 30 20' transform='scale(0.4285,0.4285)'></path>
        <path fill='rgb(255,255,120)' stroke='rgb(0,0,0)' stroke-width='1.5' d='M35 55C17 54 17 36 28 30C 31 28 31 21 30 20' transform='scale(0.4285,0.4285) scale(-1,1) translate(-70,0)'></path>
        <path fill='rgb(255,255,120)' d='M35 55L31 27L40 27Z' transform='scale(0.4285,0.4285)'></path>
        <rect x='30.5' y='11' width='8' height='10' stroke='rgb(0,0,0)' stroke-width='1.5' rx='3' fill='rgb(200,150,0)' transform='scale(0.4285,0.4285)'></rect>
        <rect x='21' y='38' width='28' height='6'rx='3' fill='rgb(150,70,0)' transform='scale(0.4285,0.4285)'></rect>
        <circle cx='35' cy='41' r='5' fill='rgb(255,255,255)' transform='scale(0.4285,0.4285)'></circle>
        
    </svg>
    
    <svg id='enzymesBuff' style='width:30;height:30;display:none'>
        <rect width='30' height='30' fill='rgb(255,200,0)'></rect>
        <rect id='enzymesBuff_cooldown' width='30' height='0' style='fill:rgb(0,0,0);' opacity='0.45'></rect>
        <text id='enzymesBuff_amount' x='28' y='28' style='font-family:calibri;font-size:13px;' text-anchor='end'></text>
        <path d='M20 45 C20 30 50 30 50 45M20 45L20 47C20 60 50 60 50 47 L50 45' fill='rgb(100,255,100)' stroke='rgb(0,0,0)' strokeWeight='1.5' transform='scale(0.4285,0.4285) translate(36,-15) scale(0.9,0.9) rotate(25)'></path>
        
        <path d='M20 45 C20 30 50 30 50 45M20 45L20 47C20 60 50 60 50 47 L50 45' fill='rgb(255,255,80)' stroke='rgb(0,0,0)' strokeWeight='1.5' transform='scale(0.4285,0.4285) translate(-11,-9)'></path>
        
        <path d='M20 45 C20 30 50 30 50 45M20 45L20 47C20 60 50 60 50 47 L50 45' fill='rgb(0,0,0,0.2)' transform='scale(0.4285,0.4285) translate(0,11) scale(0.7,0.5)'></path>
        
        <path d='M20 45 C20 30 50 30 50 45M20 45L20 47C20 60 50 60 50 47 L50 45' fill='rgb(0,0,0,0.2)' transform='scale(0.4285,0.4285) translate(52,5) scale(0.7,0.5) rotate(44)'></path>
        
    </svg>
    
    <svg id='redExtractBuff' style='width:30;height:30;display:none'>
        <rect width='30' height='30' fill='rgb(255,200,0)'></rect>
        <rect id='redExtractBuff_cooldown' width='30' height='0' style='fill:rgb(0,0,0);' opacity='0.45'></rect>
        <text id='redExtractBuff_amount' x='28' y='28' style='font-family:calibri;font-size:13px;' text-anchor='end'></text>
        <path d='M 47 17L 45 42L 37 47L 23 40L 29 16' fill='rgb(0,0,0,0.1)' stroke='rgb(0,0,0)' stroke-width='1.5' transform='scale(0.4285,0.4285) translate(0,7)'></path>
        <path d='M 45 34L 45 42L 37 47L 23 40L 26 30' fill='rgb(200,0,0)' transform='scale(0.4285,0.4285) translate(0,7)'></path>
        <rect x='30' y='3' width='20' height='12' fill='rgb(100,100,100' rx='4' transform='scale(0.4285,0.4285) translate(0,7) rotate(10)'></rect>
        <path d='M 47 12L 45 42L 37 47L 39 10' fill='rgb(0,0,0,0.5)' transform='scale(0.4285,0.4285) translate(0,7)'></path>
        
    </svg>
    
    <svg id='blueExtractBuff' style='width:30;height:30;display:none'>
        <rect width='30' height='30' fill='rgb(255,200,0)'></rect>
        <rect id='blueExtractBuff_cooldown' width='30' height='0' style='fill:rgb(0,0,0);' opacity='0.45'></rect>
        <text id='blueExtractBuff_amount' x='28' y='28' style='font-family:calibri;font-size:13px;' text-anchor='end'></text>
        <path d='M 47 17L 45 42L 37 47L 23 40L 29 16' fill='rgb(0,0,0,0.1)' stroke='rgb(0,0,0)' stroke-width='1.5' transform='scale(0.4285,0.4285) translate(0,7)'></path>
        <path d='M 45 34L 45 42L 37 47L 23 40L 26 30' fill='rgb(0,0,200)' transform='scale(0.4285,0.4285) translate(0,7)'></path>
        <rect x='30' y='3' width='20' height='12' fill='rgb(100,100,100' rx='4' transform='scale(0.4285,0.4285)  translate(0,7) rotate(10)'></rect>
        <path d='M 47 12L 45 42L 37 47L 39 10' fill='rgb(0,0,0,0.5)' transform='scale(0.4285,0.4285) translate(0,7)'></path>
        
    </svg>
    
    <svg id='tropicalDrinkBuff' style='width:30;height:30;display:none'>
        <defs>
            <linearGradient id='strawStripes_' x1='0' x2='0' y1='0' y2='1'>
                <stop offset='10%' stop-color='rgb(235, 112, 235)'/>
                <stop offset='10%' stop-color='rgb(240, 56, 194)'/>
                <stop offset='20%' stop-color='rgb(240, 56, 194)'/>
                <stop offset='20%' stop-color='rgb(235, 112, 235)'/>
                <stop offset='30%' stop-color='rgb(235, 112, 235)'/>
                <stop offset='30%' stop-color='rgb(240, 56, 194)'/>
                <stop offset='40%' stop-color='rgb(240, 56, 194)'/>
                <stop offset='40%' stop-color='rgb(235, 112, 235)'/>
                <stop offset='50%' stop-color='rgb(235, 112, 235)'/>
                <stop offset='50%' stop-color='rgb(240, 56, 194)'/>
                <stop offset='60%' stop-color='rgb(240, 56, 194)'/>
                <stop offset='60%' stop-color='rgb(235, 112, 235)'/>
                <stop offset='70%' stop-color='rgb(235, 112, 235)'/>
                <stop offset='70%' stop-color='rgb(240, 56, 194)'/>
                <stop offset='80%' stop-color='rgb(240, 56, 194)'/>
                <stop offset='80%' stop-color='rgb(235, 112, 235)'/>
                <stop offset='90%' stop-color='rgb(235, 112, 235)'/>
                <stop offset='90%' stop-color='rgb(240, 56, 194)'/>
                
            </linearGradient>
        </defs>
        <rect width='30' height='30' fill='rgb(255,200,0)'></rect>
        <rect id='tropicalDrinkBuff_cooldown' width='30' height='0' style='fill:rgb(0,0,0);' opacity='0.45'></rect>
        <text id='tropicalDrinkBuff_amount' x='28' y='28' style='font-family:calibri;font-size:13px;' text-anchor='end'></text>
        <path d='M15 30C15 60 60 60 60 30C 60 15 15 15 15 30' fill='rgb(163, 90, 18)' stroke='rgb(0,0,0)'stroke-width='1.5'  transform='scale(0.4285,0.4285)'></path>
        <path d='M20 30C20 42 55 42 55 30C 55 20 20 20 20 30' fill='rgb(255,255,210)' stroke='rgb(0,0,0)'stroke-width='1.5' transform='scale(0.4285,0.4285)'></path>
        <path d='M 44 37L 39 38L 48 12L 60 7L 61 11L 52 15Z' fill='url(#strawStripes_)' stroke='rgb(0,0,0)'stroke-width='1.5' transform='scale(0.4285,0.4285)'></path>
        
    </svg>
    
    <svg id='purplePotionBuff' style='width:30;height:30;display:none'>
        <rect width='30' height='30' fill='rgb(255,200,0)'></rect>
        <rect id='purplePotionBuff_cooldown' width='30' height='0' style='fill:rgb(0,0,0);' opacity='0.45'></rect>
        <text id='purplePotionBuff_amount' x='28' y='28' style='font-family:calibri;font-size:13px;' text-anchor='end'></text>
        <path d='M50 50L 20 50L 32 25L32 15L37 15L37 25Z' fill='rgb(0,0,0,0.3)' stroke='rgb(0,0,0)' strokeWeight='1.5' transform='scale(0.4285,0.4285) rotate(15) translate(10,-8)'></path>
        <path d='M50 50L 20 50L 27 38L42.2 38Z' fill='rgb(200,0,200)' transform='scale(0.4285,0.4285) rotate(15) translate(10,-8)'></path>
        <rect x='30.5' y='10' width='8' height='6' transform='scale(0.4285,0.4285) rotate(15) translate(10,-8)'></rect>
        
    </svg>
    
    <svg id='superSmoothieBuff' style='width:30;height:30;display:none'>
        <defs>
            <linearGradient id='greenSmoothie' x1='0' x2='0' y1='0' y2='1'>
                <stop offset='46%' stop-color='rgb(0,0,0,0.2)'/>
                
                <stop offset='50%' stop-color='rgb(255,0,50)'/>
                
                <stop offset='60%' stop-color='rgb(255,0,50)'/>
                <stop offset='60%' stop-color='rgb(50,255,50)'/>
                
            </linearGradient>
            
            <linearGradient id='smoothieStraw' x1='0' x2='0' y1='0' y2='1'>
                <stop offset='20%' stop-color='rgb(255,0,0)'/>
                <stop offset='20%' stop-color='rgb(255,255,225)'/>
                <stop offset='40%' stop-color='rgb(255,255,225)'/>
                <stop offset='40%' stop-color='rgb(255,0,0)'/>
                <stop offset='60%' stop-color='rgb(255,0,0)'/>
                <stop offset='60%' stop-color='rgb(255,255,225)'/>
                <stop offset='80%' stop-color='rgb(255,255,225)'/>
                <stop offset='80%' stop-color='rgb(255,0,0)'/>
                
            </linearGradient>
        </defs>
        <rect width='30' height='30' fill='rgb(255,200,0)'></rect>
        <rect id='superSmoothieBuff_cooldown' width='30' height='0' style='fill:rgb(0,0,0);' opacity='0.45'></rect>
        <text id='superSmoothieBuff_amount' x='28' y='28' style='font-family:calibri;font-size:13px;' text-anchor='end'></text>
        
        <path d='M20 45C20 55 50 55 50 45C65 45 65 20 50 20C50 10 20 10 20 20Z' fill='url(#greenSmoothie)' stroke='rgb(0,0,0)' stroke-width='1.5' transform='scale(0.4285,0.4285) translate(0,3)'></path>
        <path d='M50 40 C 60 40 60 25 50 25M50 40 L 50 25' fill='rgb(225,225,225)' stroke='rgb(0,0,0)' stroke-width='1.5' transform='scale(0.4285,0.4285) translate(0,3)'></path>
        <rect transform='scale(0.4285,0.4285) translate(0,3) rotate(-17)' x='19' y='11' width='5' height='30' stroke='rgb(0,0,0)' stroke-width='1.5' fill='url(#smoothieStraw)'></rect>
        <path d='M50 20C50 25 20 25 20 20' fill='rgb(0,0,0,0)' stroke='rgb(0,0,0)' stroke-width='1.5' transform='scale(0.4285,0.4285) translate(0,3)'></path>
        <circle cx='35' cy='37.4' r='6' fill='rgb(255,0,50)'transform='scale(0.4285,0.4285)'></circle>
        <path d='M36 32C 30 30 30 35 35 35C 37 35 37 39 32 38' stroke='rgb(255,255,255)' stroke-width='2' fill='rgb(0,0,0,0)' transform='scale(0.4285,0.4285) translate(0,3)'></path>
        
    </svg>
    
    <svg id='stingerBuff' style='width:30;height:30;display:none'>
        <defs>
            
            <linearGradient id='stingerShade_' x1='-2.3' y1='0' x2='1.0' y2='0.7'>
                <stop offset='40%' stop-color='black'/>
                <stop offset='90%' stop-color='white'/>
                
            </linearGradient>
            
        </defs>
        
        <rect width='30' height='30' fill='rgb(240,0,0)'></rect>
        <rect id='stingerBuff_cooldown' width='30' height='0' style='fill:rgb(0,0,0);' opacity='0.45'></rect>
        <text id='stingerBuff_amount' x='28' y='28' style='font-family:calibri;font-size:13px;' text-anchor='end'></text>
        
        <g transform='scale(0.4285,0.4285) translate(0,-2) scale(0.9,0.9)'>
        <path stroke='black' stroke-width='2' fill='url(#stingerShade_)' d='M30 20L50 50C 73 53 13 71 30 54z'></path><path stroke='black' stroke-width='1' fill='rgb(0,0,0,0)' d='M 48 51 C 42 56 39 55 33 56'></path></g>
        
    </svg>
    
    <svg id='bubbleBloat' style='width:30;height:30;display:none;'>
        
        <rect width='30' height='30' fill='rgb(0,0,200)'></rect>
        <rect id='bubbleBloat_cooldown' width='30' height='0' style='fill:rgb(0,0,0);' opacity='0.45'></rect>
        <circle cx='10' cy='6' r='2' fill='rgb(100,100,255)'></circle><circle cx='19' cy='10' r='3' fill='rgb(100,100,255)'></circle><circle cx='11' cy='16' r='3' fill='rgb(100,100,255)'></circle><circle cx='19' cy='17' r='2' fill='rgb(100,100,255)'></circle><circle cx='15' cy='26' r='5' fill='rgb(100,100,255)'></circle>
        <text id='bubbleBloat_amount' x='29' y='29' style='font-family:calibri;font-size:12px;' text-anchor='end'></text>
        
    </svg>
    
    <svg id='gummyBall' style='width:30;height:30;display:none;'>
        
        <rect width='30' height='30' fill='rgb(30,255,100)'></rect>
        <rect id='gummyBall_cooldown' width='30' height='0' style='fill:rgb(0,0,0);' opacity='0.45'></rect>
        <!--30,255,100  255,50,255-->
        <circle cx='15' cy='15' r='7' fill='rgb(255,50,255)'></circle>
        <text id='gummyBall_amount' x='29' y='29' style='font-family:calibri;font-size:12px;' text-anchor='end'></text>
        
    </svg>
    
    <svg id='gummyBallCombo' style='width:30;height:30;display:none;'>
        
        <rect width='30' height='30' fill='rgb(30,255,100)'></rect>
        <rect id='gummyBallCombo_cooldown' width='30' height='0' style='fill:rgb(0,0,0);' opacity='0.45'></rect>
        <circle cx='10' cy='10' r='7' fill='rgb(255,50,255)'></circle><circle cx='16' cy='16' r='4' fill='rgb(255,50,255)'></circle><circle cx='20' cy='20' r='2' fill='rgb(255,50,255)'></circle>
        <text id='gummyBallCombo_amount' x='29' y='29' style='font-family:calibri;font-size:12px;' text-anchor='end'></text>
        
    </svg>
    
   <svg id='redBombSync' style='width:30;height:30;display:none'>
        
        <rect width='30' height='30' fill='rgb(0,0,0)'></rect>
        <text id='redBombSync_amount' x='29' y='29' style='font-family:calibri;font-size:12px;' text-anchor='end'></text>
        
        <circle cx='15' cy='17.5' r='6' fill='red'></circle>
        <rect x='11.25' y='11' width='7.5' height='3' fill='red'></rect>
        <path fill='white' d='M17.5 11L18.75 11L18.75 12.5C 25 18 18.4 25.1 13 23.2C 19 17 11 17 17.5 11'></path>
        <path stroke='red' d='M15 11C 15 6 20 11 20 6' stroke-width='1'></path>
        <rect id='redBombSync_cooldown' width='30' height='0' style='fill:rgb(0,0,0);' opacity='0.6'></rect>
            
    </svg>
    
    <svg id='blueBombSync' style='width:30;height:30;display:none'>
        
        <rect width='30' height='30' fill='rgb(0,0,0)'></rect>
        
        <text id='blueBombSync_amount' x='29' y='29' style='font-family:calibri;font-size:12px;' text-anchor='end'></text>
        
        <circle cx='15' cy='17.5' r='6' fill='blue'></circle>
        <rect x='11.25' y='11' width='7.5' height='3' fill='blue'></rect>
        <path fill='white' d='M17.5 11L18.75 11L18.75 12.5C 25 18 18.4 25.1 13 23.2C 19 17 11 17 17.5 11'></path>
        <path stroke='blue' d='M15 11C 15 6 20 11 20 6' stroke-width='1'></path>
        <rect id='blueBombSync_cooldown' width='30' height='0' style='fill:rgb(0,0,0);' opacity='0.6'></rect>
            
    </svg>
    
</div>

<div id='honeyAndPollenAmount' style='position:fixed;margin:0px;top:0px;z-index:-1;'>
    
    <svg style='margin:0px;width:600;height:35;'>
        
        <rect x='5' width='510' height='30' fill='rgb(210,210,210)' rx='5'></rect>
        <rect x='313' y='3' width='196' height='23' fill='rgb(120,120,120)' rx='2'></rect>
        <rect x='62' y='3' width='196' height='23' fill='rgb(120,120,120)' rx='2'></rect>
        <text x='10' y='20' style='font-family:trebuchet ms;font-size:16px;'>Honey:</text>
        <text x='262' y='20' style='font-family:trebuchet ms;font-size:16px;'>Pollen:</text>
        
        <rect id='capacityBar' x='313' y='3' width='0' height='23' style='fill:rgb(0,255,0);'></rect>
        
        <text id='honeyAmount2' x='68' y='20' style='font-family:trebuchet ms;font-size:16px;' fill='rgb(255, 226, 8)' stroke='rgb(0,0,0)' stroke-width='2'>0</text>
        <text id='honeyAmount' x='68' y='20' style='font-family:trebuchet ms;font-size:16px;' fill='rgb(255, 226, 8)'>0</text>
        
        <text id='pollenAmount2' x='319' y='20' style='font-family:trebuchet ms;font-size:16px;' fill='rgb(255,255,255)' stroke='rgb(0,0,0)' stroke-width='2'>0</text>
        <text id='pollenAmount' x='319' y='20' style='font-family:trebuchet ms;font-size:16px;' fill='rgb(255,255,255)'>0</text>
        
        <rect x='520' y='10' width='72' height='10' style='fill:rgb(100,100,100);' rx='2'></rect>
        <rect id='healthBar' x='520' y='10' width='72' height='10' style='fill:rgb(0,255,0);' rx='2'></rect>
        
    </svg>
</div>

<div id='hoverText' style='background-color:rgb(0,0,0);position:fixed;color:rgb(255,255,255);display:none;text-align:center;padding:5px'></div>

<div id='useFullscreen' style='position:fixed;z-index:1;background-color:rgb(0, 179, 255);top:0px;left:0px;bottom:0px;right:0px;'>
    
    <img style='position:fixed;left:0px;top:0px;margin:0px;padding:0px;width:600px;height:600px;z-index:-1' src='https://www.khanacademy.org/computer-programming/background/5476309507031040/latest.png'>
    
    <header style='text-align:center;margin-bottom:0px;font-size:35px;'>Bee Swarm Simulator</header>
    <p style='text-align:center;margin-top:0px;'>Dat Approved!</p>
    
    <span style='display:block;margin-top:50px;'></span>
    <button id='runFullScreen' style='margin-left:10px;width:200px;height:50px;background-color:rgb(248, 255, 150);'>New Fullscreen Game</button>
    <span style='display:block;margin-top:50px;'></span>
    <button id='noFullScreen' style='margin-left:10px;width:200px;height:50px;background-color:rgb(157, 255, 150)'>New Local Game</button>
    <span style='display:block;margin-top:50px;'></span>
    <button id='loadSavedGame' style='margin-left:10px;width:200px;height:50px;background-color:rgb(166, 166, 166)'>Load Saved Game<br>(not completed)</button>
    <!--<p></p>-->
</div>

<div id='UIBar' style='position:absolute;margin:0px;z-index:0;width:210px;height:30px;background-color:rgba(195,195,195,0.9);margin-top:105px;'>
    
    <svg id='inventoryButton' style='width:30;height:30;transition-duration:0.4s;'>
        
        <path fill='rgb(255,255,255)' d='M15 27C0 28 5 5 15 5ZM15 27C30 28 25 5 15 5'></path>
        
        <path stroke='rgb(195,195,195)' stroke-width='4' d='M5 15L 10 12L15 18L20 13L25 15'></path>
        
    </svg>
    
    <svg id='questButton' style='width:30;height:30;transition-duration:0.4s;'>
        
        <rect fill='rgb(255,255,255)' x='5' y='5' width='20' height='20'></rect>
        
    </svg>
    
    <svg id='settingsButton' style='width:30;height:30;transition-duration:0.4s;'>
        
        <circle cx='15' cy='15' r='8' fill='rgb(255,255,255)'></circle>
        <rect x='-3' y='-12' width='6' height='10' fill='rgb(255,255,255)' transform='translate(15,15) rotate(0)'></rect>
        <rect x='-3' y='-12' width='6' height='10' fill='rgb(255,255,255)' transform='translate(15,15) rotate(45)'></rect>
        <rect x='-3' y='-12' width='6' height='10' fill='rgb(255,255,255)' transform='translate(15,15) rotate(90)'></rect>
        <rect x='-3' y='-12' width='6' height='10' fill='rgb(255,255,255)' transform='translate(15,15) rotate(135)'></rect>
        <rect x='-3' y='-12' width='6' height='10' fill='rgb(255,255,255)' transform='translate(15,15) rotate(180)'></rect>
        <rect x='-3' y='-12' width='6' height='10' fill='rgb(255,255,255)' transform='translate(15,15) rotate(225)'></rect>
        <rect x='-3' y='-12' width='6' height='10' fill='rgb(255,255,255)' transform='translate(15,15) rotate(270)'></rect>
        <rect x='-3' y='-12' width='6' height='10' fill='rgb(255,255,255)' transform='translate(15,15) rotate(315)'></rect>
        <circle cx='15' cy='15' r='3' fill='rgb(195,195,195)'></circle>
        
    </svg>
    
    <svg id='beequipButton' style='width:30;height:30;transition-duration:0.4s;'>
        
        <rect fill='rgb(255,255,255)' x='5' y='5' width='20' height='20'></rect>
        
    </svg>
    
</div>

<div class='uiPage' style='position:absolute;margin:0px;z-index:-2;overflow-y:auto;overflow-x:hidden;width:200px;height:455px;background-color:rgba(195,195,195,0.9);margin-top:140px;display:none;padding:3px;'>
    
    <!--not an item, only used for item cost ui here-->
    <svg id='honey' style='width:200;height:70;cursor:pointer'>
        
        <text></text>
        
        <path fill='rgb(255, 207, 13)' stroke='rgb(0,0,0)' stroke-width='2' d='M32 20C 54 38 50 59 33 54C 20 44 41 34 32 20' transform='scale(1.06,1.06) translate(-6,-7)'></path>
        
    </svg>
    
    <svg id='gumdrops' style='width:200;height:70;cursor:pointer;border-radius:5px'>
        
        <rect width='200' height='70' fill='rgb(255,255,255)'></rect>
        <rect width='70' height='70' fill='rgb(225,225,225)'></rect>
        <text x='130' y='18' style='font-family:trebuchet ms;font-size:17px;' fill='rgb(0,0,0)' text-anchor='middle'>Gumdrops</text>
        <text x='132' y='35' style='font-family:trebuchet ms;font-size:10.5px;' fill='rgb(0,0,0)' text-anchor='middle'>Use while standing in a</text>
        <text x='132' y='50' style='font-family:trebuchet ms;font-size:10.5px;' fill='rgb(0,0,0)' text-anchor='middle'>field to cover flowers in</text>
        <text x='132' y='65' style='font-family:trebuchet ms;font-size:10.5px;' fill='rgb(0,0,0)' text-anchor='middle'>goo, giving bonus honey.</text>
        <text id='gumdrops_amount' x='67' y='67' style='font-family:calibri;font-size:14px;' fill='rgb(0,0,0)' text-anchor='end'></text>
        <path fill='rgb(255,100,255)' stroke='black' stroke-width='2' d='M30 60C 26 25 64 25 60 60C55 67 35 67 30 60' transform='translate(10,-6) scale(0.75,0.75)'></path>
        <path fill='rgb(0,255,100)' stroke='black' stroke-width='2' d='M30 60C 26 25 64 25 60 60C55 67 35 67 30 60' transform='translate(-7,3) scale(0.75,0.75)'></path><circle cx='49' cy='36' r='0.25' stroke='rgb(255,255,255)'></circle><circle cx='43' cy='24' r='0.25' stroke='rgb(255,255,255)'></circle><circle cx='50' cy='29' r='0.25' stroke='rgb(255,255,255)'></circle><circle cx='42' cy='32' r='0.25' stroke='rgb(255,255,255)'></circle><circle cx='41' cy='39' r='0.25' stroke='rgb(255,255,255)'></circle><circle cx='38' cy='27' r='0.25' stroke='rgb(255,255,255)'></circle><circle cx='25' cy='32' r='0.75' stroke='rgb(255,255,255)'></circle><circle cx='33' cy='40' r='0.75' stroke='rgb(255,255,255)'></circle><circle cx='28' cy='46' r='0.75' stroke='rgb(255,255,255)'></circle><circle cx='21' cy='40' r='0.75' stroke='rgb(255,255,255)'></circle><circle cx='27' cy='38' r='0.75' stroke='rgb(255,255,255)'></circle>
    </svg>
    
    <svg id='coconut' style='width:200;height:70;cursor:pointer;border-radius:5px'>
        
        <rect width='200' height='70' fill='rgb(255,255,255)'></rect>
        <rect width='70' height='70' fill='rgb(225,225,225)'></rect>
        <text x='130' y='18' style='font-family:trebuchet ms;font-size:17px;' fill='rgb(0,0,0)' text-anchor='middle'>Coconut</text>
        <text x='133' y='35' style='font-family:trebuchet ms;font-size:10.5px;' fill='rgb(0,0,0)' text-anchor='middle'>Drops a coconut into the</text>
        <text x='133' y='50' style='font-family:trebuchet ms;font-size:10.5px;' fill='rgb(0,0,0)' text-anchor='middle'>field. Catch it to convert</text>
        <text x='133' y='65' style='font-family:trebuchet ms;font-size:10.5px;' fill='rgb(0,0,0)' text-anchor='middle'>pollen into honey tokens.</text>
        <text id='coconut_amount' x='67' y='67' style='font-family:calibri;font-size:14px;' fill='rgb(0,0,0)' text-anchor='end'></text>
        <circle fill='rgb(160,80,20)' cx='35' cy='35' r='15' stroke='black' stroke-width='2'></circle><circle fill='rgb(70,20,0)' cx='43' cy='35' r='2.5'></circle><circle fill='rgb(70,20,0)' cx='36' cy='27' r='2.5'></circle><circle fill='rgb(70,20,0)' cx='33' cy='37' r='2.5'></circle>
    </svg>
    
    <svg id='stinger' style='width:200;height:70;cursor:pointer;border-radius:5px'>
        
        <defs>
            
            <linearGradient id='stingerShade' x1='-2.3' y1='0' x2='1.0' y2='0.7'>
                <stop offset='40%' stop-color='black'/>
                <stop offset='90%' stop-color='white'/>
                
            </linearGradient>
            
        </defs>
        
        <rect width='200' height='70' fill='rgb(255,255,255)'></rect>
        <rect width='70' height='70' fill='rgb(225,225,225)'></rect>
        <text x='130' y='18' style='font-family:trebuchet ms;font-size:17px;' fill='rgb(0,0,0)' text-anchor='middle'>Stinger</text>
        <text x='133' y='40' style='font-family:trebuchet ms;font-size:12px;' fill='rgb(0,0,0)' text-anchor='middle'>Grants your bees x1.5</text>
        <text x='133' y='56' style='font-family:trebuchet ms;font-size:12px;' fill='rgb(0,0,0)' text-anchor='middle'> attack for 30 seconds.</text>
        <text id='stinger_amount' x='67' y='67' style='font-family:calibri;font-size:14px;' fill='rgb(0,0,0)' text-anchor='end'></text>
        <g transform='translate(0,-2) scale(0.9,0.9)'>
        <path stroke='black' stroke-width='2' fill='url(#stingerShade)' d='M30 20L50 50C 73 53 13 71 30 54z'></path><path stroke='black' stroke-width='1' fill='rgb(0,0,0,0)' d='M 48 51 C 42 56 39 55 33 56'></path></g>
    </svg>
    
    <svg id='glitter' style='width:200;height:70;cursor:pointer;border-radius:5px'>
        
        <rect width='200' height='70' fill='rgb(255,255,255)'></rect>
        <rect width='70' height='70' fill='rgb(225,225,225)'></rect>
        <text x='130' y='18' style='font-family:trebuchet ms;font-size:17px;' fill='rgb(0,0,0)' text-anchor='middle'>Glitter</text>
        <text x='130' y='35' style='font-family:trebuchet ms;font-size:11px;' fill='rgb(0,0,0)' text-anchor='middle'>Boosts the field you're</text>
        <text x='130' y='50' style='font-family:trebuchet ms;font-size:11px;' fill='rgb(0,0,0)' text-anchor='middle'>in, giving +100% pollen</text>
        <text x='130' y='65' style='font-family:trebuchet ms;font-size:11px;' fill='rgb(0,0,0)' text-anchor='middle'>pollen for 15 minutes.</text>
        <text id='glitter_amount' x='67' y='67' style='font-family:calibri;font-size:14px;' fill='rgb(0,0,0)' text-anchor='end'></text>
        <g transform='scale(0.9,0.9) translate(3,-3)'>
        <path fill='rgb(251, 237, 255)' d='M 35 39 C 68 14 77 80 33 48'></path>
        <path fill='rgb(204, 228, 255)' stroke='rgb(0,0,0)' stroke-width='1.5' d='M 29 21 C 55 23 41 39 50 50C 53 68 33 51 37 54C 33 44 8 37 29 21' transform='translate(-27,26) scale(1.1,1.175) rotate(-38)'></path>
        <path fill='rgb(251, 237, 255)' d='M 46 43 C 68 14 77 80 43 48'></path>
        <circle cx='50' cy='53' r='1' fill='rgb(247, 222, 111)'></circle><circle cx='57' cy='41' r='1' fill='rgb(247, 222, 111)'></circle><circle cx='60' cy='51' r='1' fill='rgb(247, 222, 111)'></circle><circle cx='48' cy='45' r='1' fill='rgb(247, 222, 111)'></circle><circle cx='56' cy='53' r='1' fill='rgb(225, 177, 242)'></circle><circle cx='56' cy='47' r='1' fill='rgb(225, 177, 242)'></circle><circle cx='62' cy='45' r='1' fill='rgb(225, 177, 242)'></circle><circle cx='48' cy='48' r='1' fill='rgb(225, 177, 242)'></circle>
        <path stroke='rgb(181, 139, 49)' fill='rgb(0,0,0,0)' stroke-width='5' d='M 25 55 C 46 46 28 38 45 33'></path>
        <path stroke='rgb(250, 239, 142)' fill='rgb(0,0,0,0)' stroke-width='5' d='M 20 40 C 14 26 24 25 26 23'></path>
        </g>
        
    </svg>
    
    <svg id='glue' style='width:200;height:70;cursor:pointer;border-radius:5px'>
        
        <rect width='200' height='70' fill='rgb(255,255,255)'></rect>
        <rect width='70' height='70' fill='rgb(225,225,225)'></rect>
        <text x='130' y='18' style='font-family:trebuchet ms;font-size:17px;' fill='rgb(0,0,0)' text-anchor='middle'>Glue</text>
        <text x='130' y='35' style='font-family:trebuchet ms;font-size:11px;' fill='rgb(0,0,0)' text-anchor='middle'>Grants 1.25x pollen</text>
        <text x='130' y='50' style='font-family:trebuchet ms;font-size:11px;' fill='rgb(0,0,0)' text-anchor='middle'>from bees and tools</text>
        <text x='130' y='65' style='font-family:trebuchet ms;font-size:11px;' fill='rgb(0,0,0)' text-anchor='middle'>for 10 minutes.</text>
        <text id='glue_amount' x='67' y='67' style='font-family:calibri;font-size:14px;' fill='rgb(0,0,0)' text-anchor='end'></text>
        <rect x='33' y='16' rx='6' width='20' height='30' fill='rgb(255,255,255)' stroke='rgb(0,0,0)' stroke-width='1.5' transform='translate(0,-5) rotate(15)'></rect>
        <rect x='39.5' y='6' rx='1' width='8' height='10' fill='rgb(255,150,0)' stroke='rgb(0,0,0)' stroke-width='1.5' transform='translate(0,-5) rotate(15)'></rect>
        <path fill='rgb(255,30,255)' d='M10 10L20 10L10 25Z' transform='translate(0,-5) rotate(15) translate(28,12)'></path>
        <path fill='rgb(25,255,100)' d='M10 10L20 10L10 25Z' transform='translate(0,-5) translate(44,62) rotate(195)'></path>
        
    </svg>
    
    <svg id='oil' style='width:200;height:70;cursor:pointer;border-radius:5px'>
        
        <rect width='200' height='70' fill='rgb(255,255,255)'></rect>
        <rect width='70' height='70' fill='rgb(225,225,225)'></rect>
        <text x='130' y='18' style='font-family:trebuchet ms;font-size:17px;' fill='rgb(0,0,0)' text-anchor='middle'>Oil</text>
        <text x='130' y='35' style='font-family:trebuchet ms;font-size:12px;' fill='rgb(0,0,0)' text-anchor='middle'>Grants 1.2x  bee</text>
        <text x='130' y='50' style='font-family:trebuchet ms;font-size:12px;' fill='rgb(0,0,0)' text-anchor='middle'>and player  speed</text>
        <text x='130' y='65' style='font-family:trebuchet ms;font-size:12px;' fill='rgb(0,0,0)' text-anchor='middle'>for 10 minutes.</text>
        <text id='oil_amount' x='67' y='67' style='font-family:calibri;font-size:14px;' fill='rgb(0,0,0)' text-anchor='end'></text>
        <path fill='rgb(255,255,120)' stroke='rgb(0,0,0)' stroke-width='1.5' d='M35 55C17 54 17 36 28 30C 31 28 31 21 30 20' transform='translate(0,-5)'></path>
        <path fill='rgb(255,255,120)' stroke='rgb(0,0,0)' stroke-width='1.5' d='M35 55C17 54 17 36 28 30C 31 28 31 21 30 20' transform='scale(-1,1) translate(-70,-5)'></path>
        <path fill='rgb(255,255,120)' d='M35 55L31 27L40 27Z' transform='translate(0,-5)'></path>
        <rect x='30.5' y='11' width='9' height='10' stroke='rgb(0,0,0)' stroke-width='1.5' rx='3' fill='rgb(200,150,0)' transform='translate(0,-5)'></rect>
        <rect x='21' y='38' width='28' height='6'rx='3' fill='rgb(150,70,0)' transform='translate(0,-5)'></rect>
        <circle cx='35' cy='36' r='5' fill='rgb(255,255,255)'></circle>
        
    </svg>
    
    <svg id='enzymes' style='width:200;height:70;cursor:pointer;border-radius:5px'>
        
        <rect width='200' height='70' fill='rgb(255,255,255)'></rect>
        <rect width='70' height='70' fill='rgb(225,225,225)'></rect>
        <text x='130' y='18' style='font-family:trebuchet ms;font-size:17px;' fill='rgb(0,0,0)' text-anchor='middle'>Enzymes</text>
        <text x='130' y='35' style='font-family:trebuchet ms;font-size:11px;' fill='rgb(0,0,0)' text-anchor='middle'>Grants x1.5 convert</text>
        <text x='130' y='50' style='font-family:trebuchet ms;font-size:11px;' fill='rgb(0,0,0)' text-anchor='middle'>rate and 10% instant</text>
        <text x='130' y='62' style='font-family:trebuchet ms;font-size:10px;' fill='rgb(0,0,0)' text-anchor='middle'>conversion for 10 minutes.</text>
        <text id='enzymes_amount' x='67' y='67' style='font-family:calibri;font-size:14px;' fill='rgb(0,0,0)' text-anchor='end'></text>
        
        <path d='M20 45 C20 30 50 30 50 45M20 45L20 47C20 60 50 60 50 47 L50 45' fill='rgb(100,255,100)' stroke='rgb(0,0,0)' strokeWeight='1.5' transform='translate(36,-15) scale(0.9,0.9) rotate(25)'></path>
        
        <path d='M20 45 C20 30 50 30 50 45M20 45L20 47C20 60 50 60 50 47 L50 45' fill='rgb(255,255,80)' stroke='rgb(0,0,0)' strokeWeight='1.5' transform='translate(-11,-9)'></path>
        
        <path d='M20 45 C20 30 50 30 50 45M20 45L20 47C20 60 50 60 50 47 L50 45' fill='rgb(0,0,0,0.2)' transform='translate(0,11) scale(0.7,0.5)'></path>
        
        <path d='M20 45 C20 30 50 30 50 45M20 45L20 47C20 60 50 60 50 47 L50 45' fill='rgb(0,0,0,0.2)' transform='translate(52,5) scale(0.7,0.5) rotate(44)'></path>
        
    </svg>
    
    <svg id='redExtract' style='width:200;height:70;cursor:pointer;border-radius:5px'>
        
        <rect width='200' height='70' fill='rgb(255,255,255)'></rect>
        <rect width='70' height='70' fill='rgb(225,225,225)'></rect>
        <text x='130' y='18' style='font-family:trebuchet ms;font-size:17px;' fill='rgb(0,0,0)' text-anchor='middle'>Red Extract</text>
        <text x='130' y='35' style='font-family:trebuchet ms;font-size:12px;' fill='rgb(0,0,0)' text-anchor='middle'>Grants 1.25x  red</text>
        <text x='130' y='50' style='font-family:trebuchet ms;font-size:12px;' fill='rgb(0,0,0)' text-anchor='middle'>pollen for 10</text>
        <text x='130' y='65' style='font-family:trebuchet ms;font-size:12px;' fill='rgb(0,0,0)' text-anchor='middle'>minutes.</text>
        <text id='redExtract_amount' x='67' y='67' style='font-family:calibri;font-size:14px;' fill='rgb(0,0,0)' text-anchor='end'></text>
        <path d='M 47 17L 45 42L 37 47L 23 40L 29 16' fill='rgb(0,0,0,0.1)' stroke='rgb(0,0,0)' stroke-width='1.5'></path>
        <path d='M 45 34L 45 42L 37 47L 23 40L 26 30' fill='rgb(200,0,0)'></path>
        <rect x='30' y='3' width='20' height='12' fill='rgb(100,100,100' rx='4' transform='rotate(10)'></rect>
        <path d='M 47 12L 45 42L 37 47L 39 10' fill='rgb(0,0,0,0.5)'></path>
        
    </svg>
    
    <svg id='blueExtract' style='width:200;height:70;cursor:pointer;border-radius:5px'>
        
        <rect width='200' height='70' fill='rgb(255,255,255)'></rect>
        <rect width='70' height='70' fill='rgb(225,225,225)'></rect>
        <text x='130' y='18' style='font-family:trebuchet ms;font-size:17px;' fill='rgb(0,0,0)' text-anchor='middle'>Blue Extract</text>
        <text x='130' y='35' style='font-family:trebuchet ms;font-size:12px;' fill='rgb(0,0,0)' text-anchor='middle'>Grants 1.25x  blue</text>
        <text x='130' y='50' style='font-family:trebuchet ms;font-size:12px;' fill='rgb(0,0,0)' text-anchor='middle'>pollen for 10</text>
        <text x='130' y='65' style='font-family:trebuchet ms;font-size:12px;' fill='rgb(0,0,0)' text-anchor='middle'>minutes.</text>
        <text id='blueExtract_amount' x='67' y='67' style='font-family:calibri;font-size:14px;' fill='rgb(0,0,0)' text-anchor='end'></text>
        <path d='M 47 17L 45 42L 37 47L 23 40L 29 16' fill='rgb(0,0,0,0.1)' stroke='rgb(0,0,0)' stroke-width='1.5'></path>
        <path d='M 45 34L 45 42L 37 47L 23 40L 26 30' fill='rgb(0,0,200)'></path>
        <rect x='30' y='3' width='20' height='12' fill='rgb(100,100,100' rx='4' transform='rotate(10)'></rect>
        <path d='M 47 12L 45 42L 37 47L 39 10' fill='rgb(0,0,0,0.5)'></path>
        
    </svg>
    
    <svg id='tropicalDrink' style='width:200;height:70;cursor:pointer;border-radius:5px'>
        
        <defs>
            <linearGradient id='strawStripes' x1='0' x2='0' y1='0' y2='1'>
                <stop offset='10%' stop-color='rgb(235, 112, 235)'/>
                <stop offset='10%' stop-color='rgb(240, 56, 194)'/>
                <stop offset='20%' stop-color='rgb(240, 56, 194)'/>
                <stop offset='20%' stop-color='rgb(235, 112, 235)'/>
                <stop offset='30%' stop-color='rgb(235, 112, 235)'/>
                <stop offset='30%' stop-color='rgb(240, 56, 194)'/>
                <stop offset='40%' stop-color='rgb(240, 56, 194)'/>
                <stop offset='40%' stop-color='rgb(235, 112, 235)'/>
                <stop offset='50%' stop-color='rgb(235, 112, 235)'/>
                <stop offset='50%' stop-color='rgb(240, 56, 194)'/>
                <stop offset='60%' stop-color='rgb(240, 56, 194)'/>
                <stop offset='60%' stop-color='rgb(235, 112, 235)'/>
                <stop offset='70%' stop-color='rgb(235, 112, 235)'/>
                <stop offset='70%' stop-color='rgb(240, 56, 194)'/>
                <stop offset='80%' stop-color='rgb(240, 56, 194)'/>
                <stop offset='80%' stop-color='rgb(235, 112, 235)'/>
                <stop offset='90%' stop-color='rgb(235, 112, 235)'/>
                <stop offset='90%' stop-color='rgb(240, 56, 194)'/>
                
            </linearGradient>
        </defs>
        
        <rect width='200' height='70' fill='rgb(255,255,255)'></rect>
        <rect width='70' height='70' fill='rgb(225,225,225)'></rect>
        <text x='130' y='18' style='font-family:trebuchet ms;font-size:17px;' fill='rgb(0,0,0)' text-anchor='middle'>Tropical Drink</text>
        <text x='130' y='35' style='font-family:trebuchet ms;font-size:11px;' fill='rgb(0,0,0)' text-anchor='middle'>Grants 1.25x white</text>
        <text x='130' y='50' style='font-family:trebuchet ms;font-size:11px;' fill='rgb(0,0,0)' text-anchor='middle'>pollen and 5% critical</text>
        <text x='130' y='65' style='font-family:trebuchet ms;font-size:11px;' fill='rgb(0,0,0)' text-anchor='middle'>chance for 10 minutes.</text>
        <text id='tropicalDrink_amount' x='67' y='67' style='font-family:calibri;font-size:14px;' fill='rgb(0,0,0)' text-anchor='end'></text>
        <path d='M15 30C15 60 60 60 60 30C 60 15 15 15 15 30' fill='rgb(163, 90, 18)' stroke='rgb(0,0,0)'stroke-width='1.5'></path>
        <path d='M20 30C20 42 55 42 55 30C 55 20 20 20 20 30' fill='rgb(255,255,210)' stroke='rgb(0,0,0)'stroke-width='1.5'></path>
        <path d='M 44 37L 39 38L 48 12L 60 7L 61 11L 52 15Z' fill='url(#strawStripes)' stroke='rgb(0,0,0)'stroke-width='1.5'></path>
        
    </svg>
    
    <svg id='purplePotion' style='width:200;height:70;cursor:pointer;border-radius:5px'>
        
        <rect width='200' height='70' fill='rgb(255,255,255)'></rect>
        <rect width='70' height='70' fill='rgb(225,225,225)'></rect>
        <text x='130' y='18' style='font-family:trebuchet ms;font-size:17px;' fill='rgb(0,0,0)' text-anchor='middle'>Purple Potion</text>
        <text x='130' y='35' style='font-family:trebuchet ms;font-size:11px;' fill='rgb(0,0,0)' text-anchor='middle'>Grants better stats</text>
        <text x='130' y='50' style='font-family:trebuchet ms;font-size:11px;' fill='rgb(0,0,0)' text-anchor='middle'>of glue and red/blue</text>
        <text x='130' y='65' style='font-family:trebuchet ms;font-size:10.5px;' fill='rgb(0,0,0)' text-anchor='middle'>extracts for 10 minutes.</text>
        <text id='purplePotion_amount' x='67' y='67' style='font-family:calibri;font-size:14px;' fill='rgb(0,0,0)' text-anchor='end'></text>
        <path d='M50 50L 20 50L 32 25L32 15L37 15L37 25Z' fill='rgb(0,0,0,0.3)' stroke='rgb(0,0,0)' strokeWeight='1.5' transform='rotate(15) translate(10,-8)'></path>
        <path d='M50 50L 20 50L 27 38L42.2 38Z' fill='rgb(200,0,200)' transform='rotate(15) translate(10,-8)'></path>
        <rect x='30.5' y='10' width='8' height='6' transform='rotate(15) translate(10,-8)'></rect>
        
    </svg>
    
    <svg id='superSmoothie' style='width:200;height:70;cursor:pointer;border-radius:5px'>
        
        <defs>
            <linearGradient id='greenSmoothie_' x1='0' x2='0' y1='0' y2='1'>
                <stop offset='46%' stop-color='rgb(0,0,0,0.2)'/>
                
                <stop offset='50%' stop-color='rgb(255,0,50)'/>
                
                <stop offset='60%' stop-color='rgb(255,0,50)'/>
                <stop offset='60%' stop-color='rgb(50,255,50)'/>
                
            </linearGradient>
            
            <linearGradient id='smoothieStraw_' x1='0' x2='0' y1='0' y2='1'>
                <stop offset='20%' stop-color='rgb(255,0,0)'/>
                <stop offset='20%' stop-color='rgb(255,255,225)'/>
                <stop offset='40%' stop-color='rgb(255,255,225)'/>
                <stop offset='40%' stop-color='rgb(255,0,0)'/>
                <stop offset='60%' stop-color='rgb(255,0,0)'/>
                <stop offset='60%' stop-color='rgb(255,255,225)'/>
                <stop offset='80%' stop-color='rgb(255,255,225)'/>
                <stop offset='80%' stop-color='rgb(255,0,0)'/>
                
            </linearGradient>
        </defs>
        
        <rect width='200' height='70' fill='rgb(255,255,255)'></rect>
        <rect width='70' height='70' fill='rgb(225,225,225)'></rect>
        <text x='130' y='18' style='font-family:trebuchet ms;font-size:16.5px;' fill='rgb(0,0,0)' text-anchor='middle'>Super Smoothie</text>
        <text x='130' y='35' style='font-family:trebuchet ms;font-size:11px;' fill='rgb(0,0,0)' text-anchor='middle'>Grants improved buffs</text>
        <text x='130' y='50' style='font-family:trebuchet ms;font-size:11px;' fill='rgb(0,0,0)' text-anchor='middle'>of all items for 10 </text>
        <text x='130' y='65' style='font-family:trebuchet ms;font-size:10.5px;' fill='rgb(0,0,0)' text-anchor='middle'>minutes.</text>
        <text id='superSmoothie_amount' x='67' y='67' style='font-family:calibri;font-size:14px;' fill='rgb(0,0,0)' text-anchor='end'></text>
        <path d='M20 45C20 55 50 55 50 45C65 45 65 20 50 20C50 10 20 10 20 20Z' fill='url(#greenSmoothie_)' stroke='rgb(0,0,0)' stroke-width='1.5' transform='translate(0,3)'></path>
        <path d='M50 40 C 60 40 60 25 50 25M50 40 L 50 25' fill='rgb(225,225,225)' stroke='rgb(0,0,0)' stroke-width='1.5' transform='translate(0,3)'></path>
        <rect transform='translate(0,3) rotate(-17)' x='19' y='11' width='5' height='30' stroke='rgb(0,0,0)' stroke-width='1.5' fill='url(#smoothieStraw_)'></rect>
        <path d='M50 20C50 25 20 25 20 20' fill='rgb(0,0,0,0)' stroke='rgb(0,0,0)' stroke-width='1.5' transform='translate(0,3)'></path>
        <circle cx='35' cy='37.4' r='6' fill='rgb(255,0,50)'></circle>
        <path d='M36 32C 30 30 30 35 35 35C 37 35 37 39 32 38' stroke='rgb(255,255,255)' stroke-width='2' fill='rgb(0,0,0,0)' transform='translate(0,3)'></path>
        
    </svg>
    
    <svg id='bitterberry' style='width:200;height:70;cursor:pointer;border-radius:5px'>
        
        <defs>
            
            <radialGradient id='bitterberryShade' cx='39%' cy='39%'>
                
                <stop offset="10%" stop-color="rgb(235, 225, 138)" />
                <stop offset="100%" stop-color="rgb(179, 162, 34)" />
                
            </radialGradient>
            
        </defs>
        
        <rect width='200' height='70' fill='rgb(255,255,255)'></rect>
        <rect width='70' height='70' fill='rgb(225,225,225)'></rect>
        <text x='130' y='18' style='font-family:trebuchet ms;font-size:17px;' fill='rgb(0,0,0)' text-anchor='middle'>Bitterberry</text>
        <text x='130' y='37' style='font-family:trebuchet ms;font-size:11.5px;' fill='rgb(0,0,0)' text-anchor='middle'>Raises the bond of a</text>
        <text x='130' y='51' style='font-family:trebuchet ms;font-size:11.5px;' fill='rgb(0,0,0)' text-anchor='middle'> bee by 100 and  has a</text>
        <text x='130' y='64' style='font-family:trebuchet ms;font-size:11.5px;' fill='rgb(0,0,0)' text-anchor='middle'> chance to mutate it.</text>
        <text id='bitterberry_amount' x='67' y='67' style='font-family:calibri;font-size:14px;' fill='rgb(0,0,0)' text-anchor='end'></text>
        
        <g transform='scale(0.85,0.85) translate(6,7)'>
        
        <path fill='url(#bitterberryShade)' stroke='black' stroke-width='2' d='M35 16C 66 23 45 50 24 50C 12 57 19 55 18 48C 9 15 27 15 35 16'></path>
        
        <path fill='rgb(129, 57, 82)' stroke='black' stroke-width='2' d='M 35 12C 64 13 49 27 36 16C -2 11 38 3 36 12' transform='translate(4,1)'></path>
        
        <path fill='rgb(138, 78, 18)' stroke='black' stroke-width='2' d='M 37 13C 39 12 43 7 48 5C 50 12 48 7 43 13' transform='translate(2,0)'></path>
        
        <circle cx='39' cy='37' r='1.5' fill='rgb(171, 119, 36,0.5)'></circle><circle cx='41' cy='28' r='1.5' fill='rgb(171, 119, 36,0.5)'></circle><circle cx='31' cy='41' r='1.5' fill='rgb(171, 119, 36,0.5)'></circle><circle cx='25' cy='43' r='1.5' fill='rgb(171, 119, 36,0.5)'></circle><circle cx='46' cy='33' r='1.5' fill='rgb(171, 119, 36,0.5)'></circle>
        
        </g>
        
    </svg>
    
    <svg id='neonberry' style='width:200;height:70;cursor:pointer;border-radius:5px'>
        
        <defs>
            
            <radialGradient id='neonberryShade'>
                
                
                <stop offset="0%" stop-color="rgb(0,0,0)" />
                <stop offset="7%" stop-color="rgb(225,255,225)" />
                <stop offset="20%" stop-color="rgb(225,255,225)" />
                <stop offset="75%" stop-color="rgb(88, 227, 88)" />
                <stop offset="100%" stop-color="rgb(26, 102, 26)" />
                
            </radialGradient>
            
        </defs>
        
        <rect width='200' height='70' fill='rgb(255,255,255)'></rect>
        <rect width='70' height='70' fill='rgb(225,225,225)'></rect>
        <text x='130' y='18' style='font-family:trebuchet ms;font-size:17px;' fill='rgb(0,0,0)' text-anchor='middle'>Neonberry</text>
        <text x='130' y='37' style='font-family:trebuchet ms;font-size:11.5px;' fill='rgb(0,0,0)' text-anchor='middle'>Raises the bond of a</text>
        <text x='130' y='51' style='font-family:trebuchet ms;font-size:11.5px;' fill='rgb(0,0,0)' text-anchor='middle'> bee by 500 and </text>
        <text x='130' y='64' style='font-family:trebuchet ms;font-size:11.5px;' fill='rgb(0,0,0)' text-anchor='middle'> makes it radioactive.</text>
        <text id='neonberry_amount' x='67' y='67' style='font-family:calibri;font-size:14px;' fill='rgb(0,0,0)' text-anchor='end'></text>
        
        <g transform='scale(0.825,0.825) translate(8,8)'>
        
        <circle fill='url(#neonberryShade)' cx='35' cy='35' stroke='black' stroke-width='2' r='22'></circle>
        
        <path fill='rgb(0,0,0,0)' stroke='black' stroke-width='1' d='M 24 30C 28 12 41 22 40 20M 24 41C 24 49 37 50 36 48M 42 30C 47 28 46 43 39 43'></path>
        
        <path fill='rgb(138, 78, 18)' stroke='black' stroke-width='2' d='M 37 13C 39 12 43 7 42 5C 50 12 48 7 41 15' transform='translate(6,1)'></path>
        
        </g>
        
    </svg>
    
    <svg id='treat' style='width:200;height:70;cursor:pointer;border-radius:5px'>
        
        <rect width='200' height='70' fill='rgb(255,255,255)'></rect>
        <rect width='70' height='70' fill='rgb(225,225,225)'></rect>
        <text x='130' y='18' style='font-family:trebuchet ms;font-size:16.5px;' fill='rgb(0,0,0)' text-anchor='middle'>Treat</text>
        <text x='130' y='37' style='font-family:trebuchet ms;font-size:12px;' fill='rgb(0,0,0)' text-anchor='middle'>Improves a bee's </text>
        <text x='130' y='53' style='font-family:trebuchet ms;font-size:12px;' fill='rgb(0,0,0)' text-anchor='middle'>bond by 10.</text>
        <text id='treat_amount' x='67' y='67' style='font-family:calibri;font-size:14px;' fill='rgb(0,0,0)' text-anchor='end'></text>
        
        <path d='M 26 40C 14 39 4 12 30 28C 35 1 45 12 50 26C 68 10 73 31 60 41C 67 58 51 74 41 52C 37 58 2 74 26 40' stroke='rgb(0,0,0)' fill='rgb(138, 88, 18)' stroke-width='2' transform='scale(0.9,0.9) translate(-5,0)'></path>
        
        <path d='M 27 27L 29 34M 37 27L 39 34M 30 39 L 35 42L40 37' stroke='rgb(255,255,255)' fill='rgb(0,0,0,0)' stroke-width='2'></path>
        
    </svg>
    
    <svg id='blueberry' style='width:200;height:70;cursor:pointer;border-radius:5px'>
        
        <rect width='200' height='70' fill='rgb(255,255,255)'></rect>
        <rect width='70' height='70' fill='rgb(225,225,225)'></rect>
        <text x='130' y='18' style='font-family:trebuchet ms;font-size:17px;' fill='rgb(0,0,0)' text-anchor='middle'>Blueberry</text>
        <text x='130' y='39' style='font-family:trebuchet ms;font-size:12px;' fill='rgb(0,0,0)' text-anchor='middle'>Improves your bee's</text>
        <text x='130' y='54' style='font-family:trebuchet ms;font-size:12px;' fill='rgb(0,0,0)' text-anchor='middle'>bond by 25.</text>
        <text id='blueberry_amount' x='67' y='67' style='font-family:calibri;font-size:14px;' fill='rgb(0,0,0)' text-anchor='end'></text>
        
        <circle cx='19' cy='46' r='17' stroke='rgb(0,0,0)' strokeWeight='1.5' fill='rgb(88, 88, 219)' transform='scale(1,0.9) rotate(-26)'></circle>
        <circle cx='19' cy='46' r='7' fill='rgb(32, 32, 150)' transform='scale(1,0.7) rotate(-26)'></circle>
        
    </svg>
    
    <svg id='strawberry' style='width:200;height:70;cursor:pointer;border-radius:5px'>
        
        <rect width='200' height='70' fill='rgb(255,255,255)'></rect>
        <rect width='70' height='70' fill='rgb(225,225,225)'></rect>
        <text x='130' y='18' style='font-family:trebuchet ms;font-size:17px;' fill='rgb(0,0,0)' text-anchor='middle'>Strawberry</text>
        <text x='130' y='39' style='font-family:trebuchet ms;font-size:12px;' fill='rgb(0,0,0)' text-anchor='middle'>Improves your bee's</text>
        <text x='130' y='54' style='font-family:trebuchet ms;font-size:12px;' fill='rgb(0,0,0)' text-anchor='middle'>bond by 25.</text>
        <text id='strawberry_amount' x='67' y='67' style='font-family:calibri;font-size:14px;' fill='rgb(0,0,0)' text-anchor='end'></text>
        <path stroke='rgb(0,0,0)' stroke-width='1.5' fill='rgb(255,0,25)' d='M 24 27 L 46 22C 83 11 41 71 42 61C 20 39 15 36 24 27' transform='translate(7,3) scale(0.7,0.8)'></path>
        <path stroke='rgb(0,200,0)' stroke-width='3' fill='rgb(0,0,0,0)' d='M 38 24 C 37 16 34 16 24 11M 38 24 C 43 16 34 16 38 6M 38 24 C 37 16 21 16 24 21M 38 24 C 46 16 46 16 45 8' transform='translate(7,3) scale(0.7,0.8)'></path>
        <circle cx='35' cy='35' fill='rgb(250,170,100)' r='1'></circle><circle cx='27' cy='29' fill='rgb(250,170,100)' r='1'></circle><circle cx='35' cy='25' fill='rgb(250,170,100)' r='1'></circle><circle cx='40' cy='42' fill='rgb(250,170,100)' r='1'></circle><circle cx='43' cy='36' fill='rgb(250,170,100)' r='1'></circle><circle cx='41' cy='28' fill='rgb(250,170,100)' r='1'></circle><circle cx='31' cy='40' fill='rgb(250,170,100)' r='1'></circle>
        
    </svg>
    
    <svg id='pineapple' style='width:200;height:70;cursor:pointer;border-radius:5px'>
        
        <rect width='200' height='70' fill='rgb(255,255,255)'></rect>
        <rect width='70' height='70' fill='rgb(225,225,225)'></rect>
        <text x='130' y='18' style='font-family:trebuchet ms;font-size:17px;' fill='rgb(0,0,0)' text-anchor='middle'>Pineapple</text>
        <text x='130' y='39' style='font-family:trebuchet ms;font-size:12px;' fill='rgb(0,0,0)' text-anchor='middle'>Improves your bee's</text>
        <text x='130' y='54' style='font-family:trebuchet ms;font-size:12px;' fill='rgb(0,0,0)' text-anchor='middle'>bond by 25.</text>
        <text id='pineapple_amount' x='67' y='67' style='font-family:calibri;font-size:14px;' fill='rgb(0,0,0)' text-anchor='end'></text>
        <path transform='scale(1.1,1.1) translate(-10,0)'stroke='rgb(0,0,0)' stroke-width='1.5' fill='rgb(255,255,25)' d='M37 20L50 25L60 45C 56 52 43 53 34 49L 22 43Z' ></path><path fill='rgb(0,0,0,0.1)' d='M50 25L60 45C 56 52 43 53 34 49Z' transform='scale(1.1,1.1) translate(-10,0)'></path><path stroke='white' stroke-width='3' d='M38 22L30 35'transform='scale(1.1,1.1) translate(-10,0)'></path><path stroke='rgb(0,0,0,0.3)' stroke-width='2' d='M35 35 L 38 30M 45 52 L 46 45M 51 51 L 50 45M 58 48 L 54 44' transform='scale(1.1,1.1) translate(-10,0)'></path>
        
    </svg>
    
    <svg id='sunflowerSeed' style='width:200;height:70;cursor:pointer;border-radius:5px'>
        
        <rect width='200' height='70' fill='rgb(255,255,255)'></rect>
        <rect width='70' height='70' fill='rgb(225,225,225)'></rect>
        <text x='130' y='18' style='font-family:trebuchet ms;font-size:16px;' fill='rgb(0,0,0)' text-anchor='middle'>Sunflower Seed</text>
        <text x='130' y='39' style='font-family:trebuchet ms;font-size:12px;' fill='rgb(0,0,0)' text-anchor='middle'>Improves your bee's</text>
        <text x='130' y='54' style='font-family:trebuchet ms;font-size:12px;' fill='rgb(0,0,0)' text-anchor='middle'>bond by 25.</text>
        <text id='sunflowerSeed_amount' x='67' y='67' style='font-family:calibri;font-size:14px;' fill='rgb(0,0,0)' text-anchor='end'></text>
        <path stroke='rgb(0,0,0)' stroke-width='1.5' fill='rgb(252,231,202)' d='M37 20C 8 36 11 46 20 50C 44 63 43 31 37 20' transform='translate(5,0)'></path>
        
        <path stroke='rgb(98,99,90)' stroke-width='3' fill='rgb(0,0,0,0)' d='M37 20C 25 36 20 46 20 50M37 20C 14 36 17 46 20 50M37 20C 38 36 36 58 20 50M37 20C 36 36 20 49 20 50' transform='translate(5,0)'></path>
        
    </svg>
    
    <svg id='basicEgg' style='width:200;height:70;cursor:pointer;border-radius:5px'>
        
        <rect width='200' height='70' fill='rgb(255,255,255)'></rect>
        <rect width='70' height='70' fill='rgb(225,225,225)'></rect>
        <text x='130' y='18' style='font-family:trebuchet ms;font-size:17px;' fill='rgb(0,0,0)' text-anchor='middle'>Basic Egg</text>
        <text x='130' y='39' style='font-family:trebuchet ms;font-size:12px;' fill='rgb(0,0,0)' text-anchor='middle'>Hatches into a </text>
        <text x='130' y='54' style='font-family:trebuchet ms;font-size:12px;' fill='rgb(0,0,0)' text-anchor='middle'>basic bee!</text>
        <text id='basicEgg_amount' x='67' y='67' style='font-family:calibri;font-size:14px;' fill='rgb(0,0,0)' text-anchor='end'></text>
        <path fill='rgb(255,255,0)' stroke='rgb(0,0,0)' stroke-width='1.5' d='M35 15C 20 17 10 55 35 55M35 15C 50 17 60 55 35 55'></path>
        <path fill='rgb(0,0,0)' d='M20 30 C 20 40 50 40 50 30L50 40C50 50 20 50 20 40'></path>
        
        <path fill='rgb(0,0,0,0.3)' d='M47 25C 57 56 35 60 23 50C 32 48 41 50 50 35'></path>
        
    </svg>
    
    <svg id='silverEgg' style='width:200;height:70;cursor:pointer;border-radius:5px'>
        
        <rect width='200' height='70' fill='rgb(255,255,255)'></rect>
        <rect width='70' height='70' fill='rgb(225,225,225)'></rect>
        <text x='130' y='18' style='font-family:trebuchet ms;font-size:17px;' fill='rgb(0,0,0)' text-anchor='middle'>Silver Egg</text>
        <text x='130' y='39' style='font-family:trebuchet ms;font-size:12px;' fill='rgb(0,0,0)' text-anchor='middle'>Hatches into a </text>
        <text x='130' y='54' style='font-family:trebuchet ms;font-size:12px;' fill='rgb(0,0,0)' text-anchor='middle'>special bee!</text>
        <text id='silverEgg_amount' x='67' y='67' style='font-family:calibri;font-size:14px;' fill='rgb(0,0,0)' text-anchor='end'></text>
        
        <path fill='rgb(200,200,200)' stroke='rgb(0,0,0)' stroke-width='1.5' d='M35 15C 20 17 10 55 35 55M35 15C 50 17 60 55 35 55'></path><path stroke='rgb(255,255,255)' stroke-width='2' fill='rgb(0,0,0,0)' d='M 25 25C 25 25 40 25 40 18M 22 34C 25 35 40 35 47 28M 22 44C 25 45 40 45 49 38M 28 52C 25 53 40 53 47 47'></path>
        
        <path fill='rgb(0,0,0,0.3)' d='M47 25C 57 56 35 60 23 50C 32 48 41 50 50 35'></path>
    </svg>
    
    <svg id='goldEgg' style='width:200;height:70;cursor:pointer;border-radius:5px'>
        
        <rect width='200' height='70' fill='rgb(255,255,255)'></rect>
        <rect width='70' height='70' fill='rgb(225,225,225)'></rect>
        <text x='130' y='18' style='font-family:trebuchet ms;font-size:17px;' fill='rgb(0,0,0)' text-anchor='middle'>Gold Egg</text>
        <text x='130' y='36' style='font-family:trebuchet ms;font-size:12px;' fill='rgb(0,0,0)' text-anchor='middle'>Hatches into an </text>
        <text x='130' y='50' style='font-family:trebuchet ms;font-size:12px;' fill='rgb(0,0,0)' text-anchor='middle'>epic, legendary, or</text><text x='130' y='65' style='font-family:trebuchet ms;font-size:12px;' fill='rgb(0,0,0)' text-anchor='middle'>mythic bee!</text>
        
        <text id='goldEgg_amount' x='67' y='67' style='font-family:calibri;font-size:14px;' fill='rgb(0,0,0)' text-anchor='end'></text>
        
        <path fill='rgb(255,220,70)' stroke='rgb(0,0,0)' stroke-width='1.5' d='M35 15C 20 17 10 55 35 55M35 15C 50 17 60 55 35 55'></path><path stroke='rgb(235,205,0)' stroke-width='2' fill='rgb(0,0,0,0)' d='M 25 25C 25 25 40 25 40 18M 22 34C 25 35 40 35 47 28M 22 44C 25 45 40 45 49 38M 28 52C 25 53 40 53 47 47'></path><path stroke='rgb(255,255,255)' stroke-width='3' fill='rgb(0,0,0,0)' d='M 35 18C 30 20 28 22 27 26'></path>
        <path stroke='rgb(255,255,255)' stroke-width='3' fill='rgb(0,0,0,0)' d='M 35 18C 30 20 28 22 27 26M 25 16C 30 20 28 22 37 26' transform='translate(52,17) rotate(100) scale(0.5,0.5)'></path><path stroke='rgb(255,255,255)' stroke-width='3' fill='rgb(0,0,0,0)' d='M 35 18C 30 20 28 22 27 26M 25 16C 30 20 28 22 37 26' transform='translate(20,22) rotate(28) scale(0.5,0.5)'></path><path stroke='rgb(255,255,255)' stroke-width='3' fill='rgb(0,0,0,0)' d='M 35 18C 30 20 28 22 27 26M 25 16C 30 20 28 22 37 26' transform='translate(57,52) rotate(168) scale(0.5,0.5)'></path>
        
        <path fill='rgb(0,0,0,0.2)' d='M47 25C 57 56 35 60 23 50C 32 48 41 50 50 35'></path>
    </svg>
    
    <svg id='diamondEgg' style='width:200;height:70;cursor:pointer;border-radius:5px'>
        
        <rect width='200' height='70' fill='rgb(255,255,255)'></rect>
        <rect width='70' height='70' fill='rgb(225,225,225)'></rect>
        <text x='130' y='18' style='font-family:trebuchet ms;font-size:17px;' fill='rgb(0,0,0)' text-anchor='middle'>Diamond Egg</text>
        <text x='130' y='36' style='font-family:trebuchet ms;font-size:12px;' fill='rgb(0,0,0)' text-anchor='middle'>Hatches into a </text>
        <text x='130' y='50' style='font-family:trebuchet ms;font-size:12px;' fill='rgb(0,0,0)' text-anchor='middle'> legendary or</text><text x='130' y='65' style='font-family:trebuchet ms;font-size:12px;' fill='rgb(0,0,0)' text-anchor='middle'>mythic bee!</text>
        
        <text id='diamondEgg_amount' x='67' y='67' style='font-family:calibri;font-size:14px;' fill='rgb(0,0,0)' text-anchor='end'></text>
        
        <path fill='rgb(200,255,255)' stroke='rgb(0,0,0)' stroke-width='1.5' d='M35 15C 20 17 10 55 35 55M35 15C 50 17 60 55 35 55'></path><path stroke='rgb(255,255,255)' stroke-width='3' fill='rgb(0,0,0,0)' d='M 35 18C 30 20 28 22 27 26'></path>
        <path stroke='rgb(255,255,255)' stroke-width='3' fill='rgb(0,0,0,0)' d='M 35 18C 30 20 28 22 27 26M 25 16C 30 20 28 22 37 26' transform='translate(52,17) rotate(100) scale(0.5,0.5)'></path><path stroke='rgb(255,255,255)' stroke-width='3' fill='rgb(0,0,0,0)' d='M 35 18C 30 20 28 22 27 26M 25 16C 30 20 28 22 37 26' transform='translate(20,22) rotate(28) scale(0.5,0.5)'></path><path stroke='rgb(255,255,255)' stroke-width='3' fill='rgb(0,0,0,0)' d='M 35 18C 30 20 28 22 27 26M 25 16C 30 20 28 22 37 26' transform='translate(57,52) rotate(168) scale(0.5,0.5)'></path><path fill='rgb(0,0,0,0.08)' d='M35 26C 28 30 28 45 35 45M35 26C 42 30 42 45 35 45'></path>
        
        <path fill='rgb(0,0,0,0.2)' d='M47 25C 57 56 35 60 23 50C 32 48 41 50 50 35'></path>
    </svg>
    
    <svg id='mythicEgg' style='width:200;height:70;cursor:pointer;border-radius:5px'>
        
        <rect width='200' height='70' fill='rgb(255,255,255)'></rect>
        <rect width='70' height='70' fill='rgb(225,225,225)'></rect>
        <text x='130' y='18' style='font-family:trebuchet ms;font-size:17px;' fill='rgb(0,0,0)' text-anchor='middle'>Mythic Egg</text>
        <text x='130' y='40' style='font-family:trebuchet ms;font-size:12px;' fill='rgb(0,0,0)' text-anchor='middle'>Always hatches into</text>
        <text x='130' y='53' style='font-family:trebuchet ms;font-size:12px;' fill='rgb(0,0,0)' text-anchor='middle'>a mythic bee!</text>
        
        <text id='mythicEgg_amount' x='67' y='67' style='font-family:calibri;font-size:14px;' fill='rgb(0,0,0)' text-anchor='end'></text>
        
        <path fill='rgb(163, 91, 218)' stroke='rgb(0,0,0)' stroke-width='1.5' d='M35 15C 20 17 10 55 35 55M35 15C 50 17 60 55 35 55'></path><path stroke='rgb(255,255,255)' stroke-width='3' fill='rgb(0,0,0,0)' d='M 35 18C 30 20 28 22 27 26'></path>
        <path stroke='rgb(255,255,255)' stroke-width='3' fill='rgb(0,0,0,0)' d='M 35 18C 30 20 28 22 27 26M 25 16C 30 20 28 22 37 26' transform='translate(49,17) rotate(100) scale(0.35,0.35)'></path><path stroke='rgb(255,255,255)' stroke-width='3' fill='rgb(0,0,0,0)' d='M 35 18C 30 20 28 22 27 26M 25 16C 30 20 28 22 37 26' transform='translate(22,20) rotate(28) scale(0.35,0.5)'></path><path stroke='rgb(255,255,255)' stroke-width='3' fill='rgb(0,0,0,0)' d='M 35 18C 30 20 28 22 27 26M 25 16C 30 20 28 22 37 26' transform='translate(57,52) rotate(168) scale(0.45,0.45)'></path><path stroke='rgb(255,255,255)' stroke-width='3' fill='rgb(0,0,0,0)' d='M 35 18C 30 20 28 22 27 26M 25 16C 30 20 28 22 37 26' transform='translate(25,59) rotate(263) scale(0.35,0.35)'></path>
        <path fill='rgb(0,0,0)' d='M20 30 C 20 40 50 40 50 30L50 40C50 50 20 50 20 40'></path>
        <text fill='rgb(0,0,0)' x='21' y='45' style='font-family:cursive' transform='scale(1,0.7) scale(1.3,1.3)'>M</text>
        <text fill='rgb(255,255,255)' x='29' y='51' style='font-family:cursive' transform='scale(1,0.8)'>M</text>
        
        <path fill='rgb(0,0,0,0.3)' d='M47 25C 57 56 35 60 23 50C 32 48 41 50 50 35'></path>
    </svg>
    
</div>

<div class='uiPage' style='position:absolute;margin:0px;z-index:-2;overflow-y:auto;overflow-x:hidden;width:200px;height:455px;background-color:rgba(195,195,195,0.9);margin-top:140px;display:none;padding:3px;font-size:13px;'></div>

<div class='uiPage' style='position:absolute;margin:0px;z-index:-2;overflow-y:auto;overflow-x:hidden;width:200px;height:455px;background-color:rgba(195,195,195,0.9);margin-top:140px;display:none;padding:3px;font-size:13px;'></div>

<div class='uiPage' style='position:absolute;margin:0px;z-index:-2;overflow-y:auto;overflow-x:hidden;width:200px;height:455px;background-color:rgba(195,195,195,0.9);margin-top:140px;display:none;padding:3px;font-size:13px;'></div>

<div id='howManyToFeed' style='position:fixed;width:300px;height:160px;z-index:1;left:50%;top:50%;transform:translate(-50%,-50%);display:none'>
    
    <div id='howManyMessage' style='position:fixed;margin-left:0px;margin-top:0px;width:300px;height:160px;background-color:rgb(30,70,255);border-radius:10px;color:rgb(255,255,255);font-size:17px;text-align:center'></div>
    
    <button id='feedThisAmount'>Feed:</button>
    <input id='feedAmount' value='1' type='number' min='1'>
    <button id='cancelFeeding'>Cancel</button>
    <button id='feedUntilGifted'>⚠️ Until Gifted</button>
    
</div>

<div id='dialogueBox' style='position:fixed;width:450px;height:200px;z-index:1;left:50%;top:80%;transform:translate(-50%,-50%);display:none;background-color:rgb(30,70,255);border-radius:10px;'>
    
    <div style='position:fixed;margin-left:5px;margin-top:5px;width:200px;height:30px;background-color:rgb(0,30,205);border-radius:10px;padding-left:10px;color:white;font-size:19px' id='NPCName'></div>
    
    <div style='position:fixed;margin-left:5px;margin-top:40px;width:430px;height:155px;background-color:rgb(0,30,205);border-radius:10px;padding-left:10px;color:white;font-size:19px' id='NPCDialogue'></div>
    
</div>

<div id='shopUI' style='position:fixed;z-index:1;;width:100%;height:100%;display:none'>
    
    <div style='position:fixed;width:175px;height:300px;z-index:1;left:100%;top:45%;transform:translate(-100%,-50%);background-color:rgb(30,70,255);border-radius:10px;'>
        
        <div id='itemName' style='position:fixed;width:162px;height:30px;z-index:1;left:50%;top:7%;transform:translate(-50%,-50%);background-color:rgb(0,30,205);border-radius:10px;color:white;font-family:cursive;font-size:18px;text-align:center'></div><div id='itemDesc' style='position:fixed;width:182px;height:280px;z-index:1;left:50%;top:56%;transform:translate(-50%,-50%) scale(0.9,0.9);background-color:rgb(0,30,205);border-radius:10px;color:white;font-family:cursive;font-size:13px;text-align:center'></div>
        
    </div>
    
    <div style='position:fixed;width:115px;height:225px;z-index:1;left:0%;top:45%;transform:translate(0,-50%);background-color:rgb(30,70,255);border-radius:10px;'>
        
        <div id='itemCostSVG' style='position:fixed;width:110px;height:217px;z-index:1;left:50%;top:50%;transform:translate(-50%,-50%);background-color:rgb(0,30,205);border-radius:10px;color:white;font-family:cursive;font-size:18px;'>
            
        </div>
        
    </div>
    
    <div style='position:fixed;border-radius:10px;background-color:rgb(0,30,205);width:200px;height:50px;left:50%;top:85%;transform:translate(-50%,-50%)'>
        
        <button id='purchaseButton' style='position:fixed;border-radius:10px;font-family:cursive;background-color:rgb(0,200,0);text-align:center;width:100px;height:30px;left:50%;top:50%;transform:translate(-50%,-50%);color:white'>Purchase</button>
        
        <svg id='leftShopButton' style='position:fixed;width:30px;height:30px;left:13%;top:50%;transform:translate(-50%,-50%);background-color:rgb(30,90,255);border-radius:10px;cursor:pointer'>
            
            <path stroke='white' d='M20 10L10 15 L 20 20' stroke-width='3' fill='rgb(0,0,0,0)'></path>
            
        </svg>
        
        <svg id='rightShopButton' style='position:fixed;width:30px;height:30px;left:87%;top:50%;transform:translate(-50%,-50%);background-color:rgb(30,90,255);border-radius:10px;cursor:pointer'>
            
            <path stroke='white' d='M10 10L20 15 L 10 20' stroke-width='3' fill='rgb(0,0,0,0)'></path>
            
        </svg>
        
    </div>
    
</div>

<div id='actionWarning' style='position:fixed;margin-left:50%;margin-top:5px;width:360px;height:60px;z-index:2;transform:translate(-50%,0px);display:none'>
    
    <div style='position:fixed;margin-left:60px;margin-top:0px;width:300px;height:50px;background-color:rgb(30,70,255,0.8);border-radius:3px;padding:0px;font-size:18px;color:white;text-align:center;padding-top:0px' id='actionName'></div>
    <div style='position:fixed;margin-left:0px;margin-top:0px;width:45px;height:55px;background-color:rgb(200,200,200);border-radius:3px;font-size:40px;color:white;padding-left:15px;padding-top:0px;border:3px solid rgb(50,50,50)'>E</div>
    <div style='position:fixed;margin-left:0px;margin-top:0px;width:360px;height:50px;padding-left:0px;padding-top:10px' id='actionHoverDarken'></div>
    
</div>

<div id='passiveActivationPopup' style='position:fixed;z-index:1'></div>

<div id='meshCreator' style='position:fixed;background-color:rgb(200,200,200,0.4);left:500px;top:0px;width:300px;height:450px;'>
    
    <button id='runMeshStr' style='margin:3px'>Run</button>
    <span style='margin:3px;display:block'></span>
    <textarea id='meshStr' type='text' cols='45' rows='31'style='font-size:11px'></textarea>
    
</div>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/gl-matrix/2.8.1/gl-matrix-min.js"></script>

<script src='https://cdnjs.cloudflare.com/ajax/libs/cannon.js/0.6.2/cannon.min.js'></script>

<script src="https://cdn.jsdelivr.net/gh/Dddatt/bss/music_popStar.js"></script>
<script src="https://cdn.jsdelivr.net/gh/Dddatt/bss/music_scorchingStar.js"></script>
<script src="https://cdn.jsdelivr.net/gh/Dddatt/bss/music_gummyStar.js"></script>
<script src="https://cdn.jsdelivr.net/gh/Dddatt/bss/music_frog.js"></script>
<script src="https://cdn.jsdelivr.net/gh/Dddatt/bss/music_inflateBalloons.js"></script>
<script src="https://cdn.jsdelivr.net/gh/Dddatt/bss/music_haste.js"></script>
<script src="https://cdn.jsdelivr.net/gh/Dddatt/bss/music_bombToken.js"></script>
<script src="https://cdn.jsdelivr.net/gh/Dddatt/bss/music_markToken.js"></script>
<script src="https://cdn.jsdelivr.net/gh/Dddatt/bss/music_melodyToken.js"></script>
<script src="https://cdn.jsdelivr.net/gh/Dddatt/bss/music_focusToken.js"></script>
<script src="https://cdn.jsdelivr.net/gh/Dddatt/bss/music_rageToken.js"></script>
<script src="https://cdn.jsdelivr.net/gh/Dddatt/bss/music_surpriseParty.js"></script>
<script src="https://cdn.jsdelivr.net/gh/Dddatt/bss/music_infernoToken.js"></script>
<script src="https://cdn.jsdelivr.net/gh/Dddatt/bss/music_flameFuelToken.js"></script>

<script type='application/javascript'>

    window.audio_ctx=new AudioContext()
	
	function dataURItoBlob(dataURI) {
		
		let byteString=atob(dataURI.split(',')[1]),
		    mimeString=dataURI.split(',')[0].split(':')[1].split(';')[0],
		    ab=new ArrayBuffer(byteString.length),
		    ia=new Uint8Array(ab)
		
		for(let i=0;i<byteString.length;i++){
            
            ia[i]=byteString.charCodeAt(i)
		}
		
		return new Blob([ab],{type:mimeString})
	}
	
	function resample(sourceAudioBuffer,desiredSampleRate,resolve){
		let offlineCtx=new OfflineAudioContext(sourceAudioBuffer.numberOfChannels,sourceAudioBuffer.duration*desiredSampleRate,desiredSampleRate),
		cloneBuffer=offlineCtx.createBuffer(sourceAudioBuffer.numberOfChannels,sourceAudioBuffer.length,sourceAudioBuffer.sampleRate)
		
		for(let channel=0;channel<sourceAudioBuffer.numberOfChannels;channel++){
		   
            cloneBuffer.copyToChannel(sourceAudioBuffer.getChannelData(channel),channel)
		}
		
		let source=offlineCtx.createBufferSource()
		
		source.buffer=cloneBuffer
		source.connect(offlineCtx.destination)
		
		offlineCtx.oncomplete=e=>resolve(e.renderedBuffer)
		offlineCtx.startRendering()
		
		source.start(0)
	}
	
	function emptyArr(n){
	       
		return new Float32Array(n)
	}
	
	function playSound(sound,vol) {
		
		let src=window['music_'+sound]
		
		let SAMPLE_RATE=16000
		
		if(!window['blob_'+sound]){
		    
		    window['blob_'+sound]=dataURItoBlob(src)
		}
		
		let audioBufferPromise=new Promise(resolve=>window['blob_'+sound].arrayBuffer().then(arrBuffer=>audio_ctx.decodeAudioData(arrBuffer,resolve)))
		
		audioBufferPromise.then(buffer=>new Promise(resolve=>window['resampled_'+sound]||(function(){window['resampled_'+sound]=resample(buffer,SAMPLE_RATE,resolve);return window['resampled_'+sound]})())).then(buffer=>{
		    
			let phase=200,skipLength=5.25,freq=1/(phase*MATH.TWO_PI)
			
			if(!window['channelData_'+sound]){
			    
			    window['channelData_'+sound]=buffer.getChannelData(0)
			}
			
			let channelData=window['channelData_'+sound]
			
			let pcm=new Float32Array(SAMPLE_RATE*phase*2)
			
			let numSeconds=channelData.length/SAMPLE_RATE

			let gain=audio_ctx.createGain()
			gain.connect(audio_ctx.destination)
		    
			gain.gain.value=vol
			
			for (let i=0,j=0;i<numSeconds;i+=skipLength,j++){
			    
				let start=SAMPLE_RATE*i,end=SAMPLE_RATE*(i+phase)
                
				pcm.set(channelData.subarray(start|0,end|0),SAMPLE_RATE*phase)
				
				console.log('wave'+j+'_'+sound)
				
				if(!window['wave'+j+'_'+sound]){
				    
    				let waveShaper=audio_ctx.createWaveShaper()
    				let oscA=audio_ctx.createOscillator()
    				
    				oscA.connect(waveShaper)
        			waveShaper.connect(gain)
    				
    				waveShaper.curve=pcm
    				
    				window['wave'+j+'_'+sound]=waveShaper
    				
    				oscA.frequency.value=freq
    				
    				oscA.start(i+audio_ctx.currentTime)
    				oscA.stop(i+skipLength+audio_ctx.currentTime)
    				window['osc'+j+'_'+sound]=oscA
    				
				} else {
				    
				    window['osc'+j+'_'+sound].disconnect(window['wave'+j+'_'+sound])
				    
    				let oscA=audio_ctx.createOscillator()
    				
    				oscA.connect(window['wave'+j+'_'+sound])
    				
    				oscA.frequency.value=freq
    				
    				oscA.start(i+audio_ctx.currentTime)
    				oscA.stop(i+skipLength+audio_ctx.currentTime)
    				window['osc'+j+'_'+sound]=oscA
				}
				
			}
		})
		
		
	}
	
	window.playSound=play
	
</script>

<script type='application/javascript'>

var _M=Math

function main(){

let Math=_M

let width=window.thisProgramIsInFullScreen?500:window.innerWidth+1,height=window.thisProgramIsInFullScreen?500:window.innerHeight+1,half_width=width*0.5,half_height=height*0.5,aspect=width/height,FETCHED_CODE={},beeCanvas

let glCanvas=document.getElementById('gl-canvas')
let gl=glCanvas.getContext('webgl2',{antialias:true})

let uiCanvas=document.getElementById('ui-canvas')
let ctx=uiCanvas.getContext('2d')

let texCanvas=document.getElementById('tex-canvas')
let tex_ctx=texCanvas.getContext('2d')

if(!gl){
    
    // alert('WebGL2 is not suppoerted on  your brower')
    return
}

glCanvas.width=width
glCanvas.height=height
uiCanvas.width=width
uiCanvas.height=height

gl.canvas.width=width
gl.canvas.height=height

gl.viewport(0,0,width,height)

window.onresize=()=>{
    
    width=window.thisProgramIsInFullScreen?500:window.innerWidth+1
    height=window.thisProgramIsInFullScreen?500:window.innerHeight+1
    
    glCanvas.width=width
    glCanvas.height=height
    uiCanvas.width=width
    uiCanvas.height=height
    
    gl.canvas.width=width
    gl.canvas.height=height
    
    gl.viewport(0,0,width,height)
    
    half_width=width*0.5
    half_height=height*0.5
    aspect=width/height
    
    player.setProjectionMatrix(player.fov,aspect,0.1,500)
    
    staticGeometryProgram=createProgram('static_geometry_vsh','static_geometry_fsh')
    dynamicGeometryProgram=createProgram('dynamic_geometry_vsh','dynamic_geometry_fsh')
    tokenGeometryProgram=createProgram('token_geometry_vsh','token_geometry_fsh')
    flowerGeometryProgram=createProgram('flower_geometry_vsh','flower_geometry_fsh')
    beeGeometryProgram=createProgram('bee_geometry_vsh','bee_geometry_fsh')
    particleRendererProgram=createProgram('particle_renderer_vsh','particle_renderer_fsh')
    explosionRendererProgram=createProgram('explosion_renderer_vsh','explosion_renderer_fsh')
    textRendererProgram=createProgram('text_renderer_vsh','text_renderer_fsh')
    mobRendererProgram=createProgram('mob_renderer_vsh','mob_renderer_fsh')
    trailRendererProgram=createProgram('trail_renderer_vsh','trail_renderer_fsh')
    
    glCache=initGlCache({})
}

function runForFullScreen(){
    
    if(FETCHED_CODE.webCode){
        
        let w=window.open()
        w.document.open()
        w.document.write(FETCHED_CODE.webCode.replaceAll('\u0040','').replace('var _M=Math','var _M=Math;window.thisProgramIsInFullScreen=true'))
        w.document.close()
        
        FETCHED_CODE.webCode=''
        
    } else {
        
        window.setTimeout(runForFullScreen,250)
    }
}

function fetchCodeFromProgram(codeProp,ID){
    
    $.getJSON("https://www.khanacademy.org/api/labs/scratchpads/"+ID+"?callback=?",function(data){
        
        FETCHED_CODE[codeProp]=data.revision.code
        
    })
}

document.getElementById('runFullScreen').addEventListener('click',function(){
    
    fetchCodeFromProgram('webCode',5078889163440128)
    
    runForFullScreen()
})

let PLAYER_PHYSICS_GROUP=2,STATIC_PHYSICS_GROUP=4,BEE_COLLECT=0,BEE_FLY=0,then,dt,frameCount=0,TIME=0,player,honeyMarkConvert=TIME,NIGHT_DARKNESS=0.7

MATH=(function(MATH){
    
    MATH.Z=[0,0,1]
    MATH.TO_DEG=180/Math.PI
    MATH.TO_RAD=Math.PI/180
    MATH.HALF_TO_RAD=MATH.TO_RAD*0.5
    MATH.HALF_PI=Math.PI*0.5
    MATH.THIRD_PI=Math.PI/3
    MATH.Y_AXIS=[0,1,0]
    MATH.TWO_PI=Math.PI*2
    MATH.INV_255=1/255
    MATH.INV_13=1/13
    MATH.INV_9=1/9
    MATH.EIGHTth_PI=Math.PI/8
    MATH.QUATER_PI=Math.PI*0.25
    MATH.PI_SUB_QUATER=Math.PI-MATH.QUATER_PI
    
    MATH.random=(a,b)=>Math.random()*(b-a)+a
    MATH.constrain=(x,a,b)=>x<a?a:x>b?b:x
    
    MATH.map=(value, istart, istop, ostart, ostop)=>{
      return ostart+(ostop-ostart)*((value-istart)/(istop-istart))
    }
    
    MATH.generateBezierCurve=function(a,b,c1,c2,t){
        
        let l=vec3.lerp
        
        let a_c1=l([],a,c1,t),
            c1_c2=l([],c1,c2,t),
            b_c2=l([],b,c2,t),
            p1=l([],a_c1,c1_c2,t),
            p2=l([],b_c2,c1_c2,t)
            
        return l(p1,p1,p2,t)
        
    }
    
    MATH.mult=function(m,a,b){
    //optimized to multiply view and projection matrix
    //a=proj,b=view
        
        b=b.slice()
        
        m[0]=b[0]*a[0]
        m[1]=b[1]*a[5]
        m[2]=b[2]*a[10]+b[3]*a[14]
        m[3]=-b[2]
        m[4]=b[4]*a[0]
        m[5]=b[5]*a[5]
        m[6]=b[6]*a[10]+b[7]*a[14]
        m[7]=-b[6]
        m[8]=b[8]*a[0]
        m[9]=b[9]*a[5]
        m[10]=b[10]*a[10]+b[11]*a[14]
        m[11]=-b[10]
        m[12]=b[12]*a[0]
        m[13]=b[13]*a[5]
        m[14]=b[12]*a[2]+b[13]*a[6]+b[14]*a[10]+b[15]*a[14]
        m[15]=-b[14]+b[15]*a[15]
        
        return m
    }
    
    MATH.translate=function(m,x,y,z){
        
        let a=m
        
        a[12]=x*a[0]+y*a[4]+z*a[8]+a[12]
        a[13]=x*a[1]+y*a[5]+z*a[9]+a[13]
        a[14]=x*a[2]+y*a[6]+z*a[10]+a[14]
        a[15]=x*a[3]+y*a[7]+z*a[11]+a[15]
        
        return a
    }
    
    MATH.xRotate=function(m,c,s){
        
		let a=m
		let t=a[1]
		a[1]=t*c+a[2]*s
		a[2]=t*-s+a[2]*c
		t=a[5]
		a[5]=t*c+a[6]*s
		a[6]=t*-s+a[6]*c
		t=a[9]
		a[9]=t*c+a[10]*s
		a[10]=t*-s+a[10]*c
		t=a[13]
		a[13]=t*c+a[14]*s
		a[14]=t*-s+a[14]*c
		
		return a
    }
    
    MATH.yRotate=function(m,c,s){
        
        m[0]=c
        m[1]=0
        m[2]=-s
        m[3]=0
        m[4]=0
        m[5]=1
        m[6]=0
        m[7]=0
        m[8]=s
        m[9]=0
        m[10]=c
        m[11]=0
        m[12]=0
        m[13]=0
        m[14]=0
        m[15]=1
        
        return m
    }
    
    MATH.lerpMatrix=function(out,m,t){
        
        out[0]=(m[0]-out[0])*t+out[0]
        out[1]=(m[1]-out[1])*t+out[1]
        out[2]=(m[2]-out[2])*t+out[2]
        out[3]=(m[3]-out[3])*t+out[3]
        out[4]=(m[4]-out[4])*t+out[4]
        out[5]=(m[5]-out[5])*t+out[5]
        out[6]=(m[6]-out[6])*t+out[6]
        out[7]=(m[7]-out[7])*t+out[7]
        out[8]=(m[8]-out[8])*t+out[8]
        out[9]=(m[9]-out[9])*t+out[9]
        out[10]=(m[10]-out[10])*t+out[10]
        out[11]=(m[11]-out[11])*t+out[11]
        out[12]=(m[12]-out[12])*t+out[12]
        out[13]=(m[13]-out[13])*t+out[13]
        out[14]=(m[14]-out[14])*t+out[14]
        out[15]=(m[15]-out[15])*t+out[15]
        
    }
    
    MATH.addCommas=function(s){
        
        for(let i=s.length-3;i>0;i-=3){
            
            s=s.substr(0,i)+','+s.substr(i,s.length)
        }
        
        return s
    }
    
    MATH.lerp=function(a,b,x){
        
        return x*(b-a)+a
    }
    
    MATH.icosphere=function(order=0){
        
        let f=(1+5**0.5)*0.5;
        let T=4**order;
        
        let vertices=new Float32Array((10*T+2)*3);
        vertices.set(Float32Array.of(
        -1,f,0,1,f,0,-1,-f,0,1,-f,0,
        0,-1,f,0,1,f,0,-1,-f,0,1,-f,
        f,0,-1,f,0,1,-f,0,-1,-f,0,1));
        let triangles=Uint32Array.of(
        0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,
        11,10,2,5,11,4,1,5,9,7,1,8,10,7,6,
        3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,
        9,8,1,4,9,5,2,4,11,6,2,10,8,6,7);
        
        let v=12
        let midCache=order?new Map():null;
        
        function addMidPoint(a,b) {
            
            let key=Math.floor((a+b)*(a+b+1)*0.5)+Math.min(a,b)
            let i=midCache.get(key)
            if (i!==undefined){ midCache.delete(key); return i }
            midCache.set(key,v)
            for (let k=0; k < 3; k++) vertices[3*v+k]=(vertices[3*a+k]+vertices[3*b+k])*0.5
            i=v++
            return i
        }
        
        let trianglesPrev=triangles
        
        for (let i=0;i<order;i++){
            
            triangles=new Uint32Array(trianglesPrev.length<<2)
            
            for (let k=0;k<trianglesPrev.length;k+=3){
                
              let v1=trianglesPrev[k]
              let v2=trianglesPrev[k+1]
              let v3=trianglesPrev[k+2]
              let a=addMidPoint(v1,v2)
              let b=addMidPoint(v2,v3)
              let c=addMidPoint(v3,v1)
              let t=k<<2
              triangles[t++]=v1; triangles[t++]=a; triangles[t++]=c;
              triangles[t++]=v2; triangles[t++]=b; triangles[t++]=a;
              triangles[t++]=v3; triangles[t++]=c; triangles[t++]=b;
              triangles[t++]=a;  triangles[t++]=b; triangles[t++]=c;
            }
            
            trianglesPrev=triangles
        }
        
        for (let i=0;i<vertices.length;i+=3) {
            
            let m=0.5/Math.hypot(vertices[i],vertices[i+1],vertices[i+2])
            vertices[i]*=m
            vertices[i+1]*=m
            vertices[i+2]*=m
        }
        
        return {verts:vertices,index:triangles}
    }
    
    MATH.doGrammar=function(s){
        
        let str=s.slice(),_s=''
        
        for(let i in str){
            
            if(str[i].toUpperCase()===str[i]){
                
                _s=_s+' '+str[i]
                
            } else {
                
                _s=_s+str[i]
            }
        }
        
        return _s[0].toUpperCase()+_s.substr(1,_s.length)
    }
    
    MATH.doTime=function(s){
        
        return (s>=60?((0.0166666667*s)|0)+'m ':'')+(s|0)%60+'s'
    }
    
    MATH.doPlural=function(s){
        
        if(s[s.length-1]==='s'){
            
            return s
            
        } else {
            
            if(s[s.length-1]==='y'){
                
                return s.substr(0,s.length-1)+'ies'
                
            } else {
                
                return s+'s'
            }
        }
    }
    
    MATH.pointInTriangle=function(x,y,ax,ay,bx,by,cx,cy){
        
        let tri=[[ax,ay],[bx,by],[cx,cy]],pt=[x,y]
        
        let a=1/(-tri[1][1]*tri[2][0]+tri[0][1]*(-tri[1][0]+tri[2][0])+tri[0][0]*(tri[1][1]-tri[2][1])+tri[1][0]*tri[2][1]),
            s=a*(tri[2][0]*tri[0][1]-tri[0][0]*tri[2][1]+(tri[2][1]-tri[0][1])*pt[0]+(tri[0][0]-tri[2][0])*pt[1])
            
        if(s<0){
            
            return
            
        }else{
            
            let t=a*(tri[0][0]*tri[1][1]-tri[1][0]*tri[0][1]+(tri[0][1]-tri[1][1])*pt[0]+(tri[1][0]-tri[0][0])*pt[1])
            
            return((t>0) && (1-s-t>0))
            
        }
    }
    
    MATH.doStatGrammar=function(s){
        
        return s==='rhinoBeetle'?'Defeat':'Collect'
    }
    
    MATH.indexOfArrays=function(arr,val){
        
        let s=JSON.stringify(val)
        let a=arr.map(JSON.stringify)
        
        return a.indexOf(s)
    }
    
    MATH.abvNumber=function(n){
        
        let l=((n.length-1)/3)|0,suf=' KMBTQ'[l]||'',i=(n.length)%3,pre=n.substr(0,3)
        
        pre=pre.substr(0,i)+'.'+pre.substr(i,3)
        pre=pre[0]==='.'?pre.substr(1,3):pre
        pre=pre[pre.length-1]==='0'&&pre.includes('.')&&suf!==' '?pre.substr(0,pre.length-1):pre
        pre=pre[pre.length-1]==='.'?pre.substr(0,pre.length-1):pre
        return pre+suf
    }
    
    MATH._log=function(a,b){
        
        return Math.log(b)/Math.log(a)
    }
    
    MATH.simulateProbabilityTries=function(p){
        
        return Math.ceil(MATH._log(1-p,-Math.random()+1))
    }
    
    return MATH
    
})({})

gl.enable(gl.BLEND)
gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA)

gl.enable(gl.DEPTH_TEST)
gl.depthFunc(gl.LEQUAL)
gl.enable(gl.CULL_FACE)
gl.cullFace(gl.BACK)

let passiveActivationPopup=document.getElementById('passiveActivationPopup')
let pollenAmount=document.getElementById('pollenAmount')
let honeyAmount=document.getElementById('honeyAmount')
let pollenAmount2=document.getElementById('pollenAmount2')
let honeyAmount2=document.getElementById('honeyAmount2')
let healthBar=document.getElementById('healthBar')
let capacityBar=document.getElementById('capacityBar')
let inventoryButton=document.getElementById('inventoryButton')
let questButton=document.getElementById('questButton')
let settingsButton=document.getElementById('settingsButton')
let beequipButton=document.getElementById('beequipButton')
let pages=document.getElementsByClassName('uiPage')
let currentPage=null

let _code=pages[0].innerHTML

let _svgs=_code.split('<svg id="'),itemSVGCode={}

_svgs.shift()

for(let i in _svgs){
    
    let name=_svgs[i].substr(0,_svgs[i].indexOf('"'))
    
    _svgs[i]='<svg id="'+_svgs[i]
    
    itemSVGCode[name]=_svgs[i].split('</text>')
    itemSVGCode[name]='<svg style="transform:translate(0px,7px);width:150px;height:36px;"><g transform="scale(0.77,0.77) translate(0,-10)"><text x="70" y="45" stroke="rgb(0,0,0)" stroke-width="3" style="font-family:cursive;font-size:20px;">AMOUNTOFITEMREQUIREDTOCRAFT</text><text x="70" y="45" fill="TEXTCOLORDEPENDINGONIFENOUGHITEMS" style="font-family:cursive;font-size:20px;">AMOUNTOFITEMREQUIREDTOCRAFT</text>'+(itemSVGCode[name][itemSVGCode[name].length-1]).substr(0,itemSVGCode[name][itemSVGCode[name].length-1].indexOf('</svg>'))+'</g><title>'+MATH.doGrammar(name)+'</title></svg>'
}

document.getElementById('honey').style.display='none'

inventoryButton.onclick=function(e){
    
    if(currentPage!==0){
        
        if(currentPage!==null)
        pages[currentPage].style.display='none'
        currentPage=0
        pages[currentPage].style.display='block'
        player.itemDragging=false
        player.beequipDragging=false
        
    } else {
        
        pages[currentPage].style.display='none'
        currentPage=null
        player.itemDragging=false
        player.beequipDragging=false
    }
}

questButton.onclick=function(e){
    
    if(currentPage!==1){
        
        if(currentPage!==null)
        pages[currentPage].style.display='none'
        currentPage=1
        pages[currentPage].style.display='block'
        player.itemDragging=false
        player.beequipDragging=false
        
    } else {
        
        pages[currentPage].style.display='none'
        currentPage=null
        player.itemDragging=false
        player.beequipDragging=false
    }
}

settingsButton.onclick=function(e){
    
    if(currentPage!==2){
        
        if(currentPage!==null)
        pages[currentPage].style.display='none'
        currentPage=2
        pages[currentPage].style.display='block'
        player.itemDragging=false
        player.beequipDragging=false
        
    } else {
        
        pages[currentPage].style.display='none'
        currentPage=null
        player.itemDragging=false
        player.beequipDragging=false
    }
}

beequipButton.onclick=function(e){
    
    if(currentPage!==3){
        
        if(currentPage!==null)
        pages[currentPage].style.display='none'
        currentPage=3
        pages[currentPage].style.display='block'
        player.itemDragging=false
        player.beequipDragging=false
        player.updateBeequipPage()
        
    } else {
        
        pages[currentPage].style.display='none'
        currentPage=null
        player.itemDragging=false
        player.beequipDragging=false
    }
}

let world=new CANNON.World(),
raycastWorld=new CANNON.World()

world.broadphase=new CANNON.SAPBroadphase(world)
world.broadphase.useBoundingBoxes=true

world.gravity.set(0,-25,0)

world.quatNormalizeSkip=10
world.quatNormalizeFast=true

let solver=new CANNON.GSSolver()

solver.iterations=2
solver.tolerance=100000

world.solver=solver

world.defaultContactMaterial.friction=0
world.defaultContactMaterial.restitution=0.01

let triggers={
    
    hive:{
        
        minX:-5.9-4.5*0.5,
        maxX:-5.9+4.5*0.5,
        minY:-1.95-4*0.5,
        maxY:-1.95+4*0.5+4,
        minZ:-4-4.5*0.5,
        maxZ:-4+4.5*0.5
    },
    
    dat_NPC:{
        
        minX:-18,maxX:-13,minY:-3,maxY:4,minZ:-4,maxZ:0
    },
    
    cool_shop:{
        
        minX:-25,maxX:-20,minY:-3,maxY:4,minZ:20,maxZ:25
    },
    
    become_red_hive:{
        
        isMachine:true,minX:23-1,maxX:23+1,minY:-2,maxY:5,minZ:4-1,maxZ:4+1,message:'become red hive',func:function(player){
            player.currentGear={
                
                boots:'gummyBoots',
                belt:'petalBelt',
                backpack:'coconutCanister',
                mask:'demonMask',
                leftGuard:'crimsonGuard',
                rightGuard:'cobaltGuard',
                glider:'glider',
                supremeStarAmulet:'*2.5 capacityMultiplier,*1.5 convertRate,*1.1 redPollen,*1.1 bluePollen,*1.1 whitePollen,*1.6 redPollen,+0.1 instantBlueConversion,+0.1 instantWhiteConversion,+0.1 instantRedConversion,+0.05 criticalChance',
                beequips:[],
            }
            
            player.updateGear()
            player.updateTool('darkScythe')
            player.addEffect('superSmoothieBuff')
            player.hive=[[]]
            player.addSlot('basic')
            player.addSlot('looker')
            player.addSlot('fire')
            player.addSlot('rage')
            player.addSlot('rad')
            player.addSlot('rascal')
            player.addSlot('commander')
            player.addSlot('riley')
            player.addSlot('riley')
            player.addSlot('shy')
            player.addSlot('brave')
            player.addSlot('windy')
            player.addSlot('tabby')
            player.addSlot('hasty')
            player.addSlot('hasty')
            player.addSlot('fuzzy')
            player.addSlot('music')
            player.addSlot('music')
            player.addSlot('music')
            player.addSlot('tadpole')
            player.addSlot('tadpole')
            player.addSlot('tadpole')
            player.addSlot('gummy')
            player.addSlot('precise')
            player.addSlot('precise')
            player.addSlot('precise')
            player.addSlot('precise')
            player.addSlot('precise')
            player.addSlot('vector')
            player.addSlot('vector')
            player.addSlot('vector')
            player.addSlot('vector')
            player.addSlot('vector')
            player.addSlot('carpenter')
            player.addSlot('carpenter')
            player.addSlot('carpenter')
            player.addSlot('photon')
            player.addSlot('spicy')
            player.addSlot('spicy')
            player.addSlot('spicy')
            player.addSlot('spicy')
            player.addSlot('spicy')
            player.addSlot('spicy')
            player.addSlot('spicy')
            player.addSlot('spicy')
            player.addSlot('spicy')
            player.addSlot('spicy')
            player.addSlot('spicy')
            player.addSlot('spicy')
            player.addSlot('crimson')
            player.updateHive()
            if(!player.temp_active_saw){
                
                player.temp_active_saw=true
                objects.mobs.push(new StarSaw())
            }
        }
    },
    
    become_blue_hive:{
        
        isMachine:true,minX:23-1,maxX:23+1,minY:-2,maxY:5,minZ:6-1,maxZ:6+1,message:'become blue hive',func:function(player){
            
            player.currentGear={
                
                boots:'gummyBoots',
                belt:'petalBelt',
                backpack:'coconutCanister',
                mask:'diamondMask',
                leftGuard:'crimsonGuard',
                rightGuard:'cobaltGuard',
                glider:'glider',
                supremeStarAmulet:'*2.5 capacityMultiplier,*1.5 convertRate,*1.1 redPollen,*1.1 bluePollen,*1.1 whitePollen,*1.6 bluePollen,+0.1 instantBlueConversion,+0.1 instantWhiteConversion,+0.1 instantRedConversion,+0.05 criticalChance',
                beequips:[],
            }
            
            player.updateGear()
            player.updateTool('tidePopper')
            player.addEffect('superSmoothieBuff')
            player.hive=[[]]
            player.addSlot('basic')
            player.addSlot('looker')
            player.addSlot('bomber')
            player.addSlot('bubble')
            player.addSlot('bumble')
            player.addSlot('bucko')
            player.addSlot('cool')
            player.addSlot('frosty')
            player.addSlot('commander')
            player.addSlot('windy')
            player.addSlot('tabby')
            player.addSlot('diamond')
            player.addSlot('hasty')
            player.addSlot('fuzzy')
            player.addSlot('ninja')
            player.addSlot('music')
            player.addSlot('music')
            player.addSlot('music')
            player.addSlot('music')
            player.addSlot('gummy')
            player.addSlot('buoyant')
            player.addSlot('buoyant')
            player.addSlot('buoyant')
            player.addSlot('buoyant')
            player.addSlot('buoyant')
            player.addSlot('buoyant')
            player.addSlot('buoyant')
            player.addSlot('buoyant')
            player.addSlot('buoyant')
            player.addSlot('buoyant')
            player.addSlot('buoyant')
            player.addSlot('buoyant')
            player.addSlot('buoyant')
            player.addSlot('buoyant')
            player.addSlot('buoyant')
            player.addSlot('buoyant')
            player.addSlot('buoyant')
            player.addSlot('buoyant')
            player.addSlot('buoyant')
            player.addSlot('tadpole')
            player.addSlot('tadpole')
            player.addSlot('tadpole')
            player.addSlot('tadpole')
            player.addSlot('tadpole')
            player.addSlot('tadpole')
            player.addSlot('tadpole')
            player.addSlot('tadpole')
            player.addSlot('tadpole')
            player.addSlot('photon')
            player.addSlot('cobalt')
            player.updateHive()
            player.addEffect('balloonBlessing',false,50)
            player.addEffect('tideBlessing',1)
            player.addEffect('bubbleBloat',1)
        }
    },
    
    become_white_hive:{
        
        isMachine:true,minX:23-1,maxX:23+1,minY:-2,maxY:5,minZ:8-1,maxZ:8+1,message:'become white hive',func:function(player){
            player.currentGear={
                
                boots:'gummyBoots',
                belt:'petalBelt',
                backpack:'coconutCanister',
                mask:'gummyMask',
                leftGuard:'crimsonGuard',
                rightGuard:'cobaltGuard',
                glider:'glider',
                supremeStarAmulet:'*2.5 capacityMultiplier,*1.5 convertRate,*1.1 redPollen,*1.1 bluePollen,*1.1 whitePollen,*1.6 whitePollen,+0.1 instantBlueConversion,+0.1 instantWhiteConversion,+0.1 instantRedConversion,+0.05 criticalChance',
                beequips:[],
            }
            
            player.updateGear()
            player.updateTool('gummyBaller')
            player.addEffect('superSmoothieBuff')
            player.hive=[[]]
            player.addSlot('basic')
            player.addSlot('buoyant')
            player.addSlot('bomber')
            player.addSlot('looker')
            player.addSlot('rage')
            player.addSlot('stubborn')
            player.addSlot('brave')
            player.addSlot('windy')
            player.addSlot('honey')
            player.addSlot('commander')
            player.addSlot('shocked')
            player.addSlot('hasty')
            player.addSlot('hasty')
            player.addSlot('music')
            player.addSlot('music')
            player.addSlot('music')
            player.addSlot('music')
            player.addSlot('crimson')
            player.addSlot('tadpole')
            player.addSlot('tadpole')
            player.addSlot('tadpole')
            player.addSlot('lion')
            player.addSlot('gummy')
            player.addSlot('photon')
            player.addSlot('tabby')
            player.addSlot('carpenter')
            player.addSlot('carpenter')
            player.addSlot('carpenter')
            player.addSlot('carpenter')
            player.addSlot('demo')
            player.addSlot('exhausted')
            player.addSlot('vector')
            player.addSlot('vector')
            player.addSlot('vector')
            player.addSlot('vector')
            player.addSlot('vector')
            player.addSlot('vector')
            player.addSlot('vector')
            player.addSlot('vector')
            player.addSlot('vector')
            player.addSlot('vector')
            player.addSlot('vector')
            player.addSlot('vector')
            player.addSlot('fuzzy')
            player.addSlot('fuzzy')
            player.addSlot('precise')
            player.addSlot('precise')
            player.addSlot('precise')
            player.addSlot('precise')
            player.addSlot('precise')
            player.updateHive()
            
            if(!player.temp_active_saw){
                
                player.temp_active_saw=true
                objects.mobs.push(new StarSaw())
            }
                
        }
    },
    
    red_cannon:{
        
        isMachine:true,minX:33-4,maxX:33+4,minY:0,maxY:3,minZ:-13-4,maxZ:-13+4,message:'Use Red Cannon',func:function(player){
            
            player.body.position.x=34
            player.body.position.y=2.5
            player.body.position.z=-12
            player.body.velocity.x=-18.1
            player.body.velocity.y=52
            player.body.velocity.z=27
            player.removeAirFrictionUntilGrounded=true
            player.isGliding=false
            player.grounded=false
            player.updateGear()
        }
    },
    
    mountain_instant_converter:{
        
        isMachine:true,minX:-39-4,maxX:-39+4,minY:30,maxY:37,minZ:88-4,maxZ:88+4,message:'Use Instant Converter<br>(1 Ticket)',func:function(player){
            
            if(player.pollen){
                
                textRenderer.add(player.pollen,[player.body.position.x,player.body.position.y+1,player.body.position.z],COLORS.honey,1,'⇆')
                player.honey+=player.pollen
                player.pollen=0
                
            } else {
                
                player.addMessage('You need to have pollen to convert!',[255,0,0])
            }
        }
    }
}

let hoverText=document.getElementById('hoverText')

let beeInfo={
    
    basic:{
        
        u:0,v:0,meshPartId:0,gatherSpeed:4,gatherAmount:10,speed:14,convertSpeed:4,convertAmount:80,attack:1,energy:20,favoriteTreat:'sunflowerSeed',rarity:'common',color:'white',description:'An ordinary bee. Well rounded and hard working!',giftedHiveBonus:{oper:'*',stat:'redPollen,bluePollen,whitePollen',num:1.2}
    },
    
    looker:{
        
        u:128/2048,v:0,meshPartId:0,gatherSpeed:4,gatherAmount:13,speed:14,tokens:['focus'],convertSpeed:4,convertAmount:160,attack:1,attackTokens:['focus'],energy:162,favoriteTreat:'sunflowerSeed',rarity:'rare',color:'white',description:'This silent bee is always watching and gaining valuable insights.',giftedHiveBonus:{oper:'+',stat:'criticalPower',num:0.25}
        
    },
    
    music:{
        
        u:256/2048,v:0,meshPartId:5,gatherSpeed:4,gatherAmount:16,speed:16.1,tokens:['focus','melody','link'],convertSpeed:4,convertAmount:240,attack:1,attackTokens:['focus','melody','link'],energy:20,favoriteTreat:'blueberry',rarity:'legendary',color:'white',description:"This bee's buzz is so beautiful it can bring anyone to tears. It uses this gift to motivate others.",giftedHiveBonus:{oper:'*',stat:'pollenFromBees',num:1.25}
        
    },
    
    fire:{
        
        u:(256+128)/2048,v:0,meshPartId:0,gatherSpeed:4,gatherAmount:10,speed:11.5,gatheringPassive:function(bee){if(Math.random()<(bee.gifted?0.5:0.35)){objects.explosions.push(new Explosion({col:[1,0.5,0],pos:[Math.round(bee.pos[0]),bee.pos[1]-0.225,Math.round(bee.pos[2])],life:0.5,size:1.5,speed:0.5,aftershock:0.01,height:0.01}));objects.flames.push(new Flame(player.fieldIn,bee.flowerCollecting[0],bee.flowerCollecting[1]))}},particles:function(bee){ParticleRenderer.add({x:bee.pos[0],y:bee.pos[1],z:bee.pos[2],vx:MATH.random(-0.3,0.3),vy:MATH.random(-0.3,0.3),vz:MATH.random(-0.3,0.3),grav:0,size:MATH.random(80,120),col:[player.isNight,MATH.random(0.4,0.7)*player.isNight,0],life:1.5,rotVel:MATH.random(-3,3),alpha:2.5})},convertSpeed:4,convertAmount:80,attack:4,tokens:['redBomb'],energy:25,favoriteTreat:'pineapple',rarity:'epic',color:'red',description:'As an egg, this bee was accidentally left in the trunk of a car in the middle of the summer for over 3 days!',giftedHiveBonus:{oper:'*',stat:'flamePollen',num:1.5}
    },
    
    bubble:{
        
        u:(256+256)/2048,v:0,meshPartId:0,gatherSpeed:4,gatherAmount:10,speed:16.1,gatheringPassive:function(bee){if(Math.random()<(bee.gifted?0.5:0.35)){objects.bubbles.push(new Bubble(player.fieldIn,bee.flowerCollecting[0],bee.flowerCollecting[1]))}},particles:function(bee){ParticleRenderer.add({x:bee.pos[0],y:bee.pos[1],z:bee.pos[2],vx:MATH.random(-0.3,0.3),vy:MATH.random(-0.3,0.3),vz:MATH.random(-0.3,0.3),grav:0,size:MATH.random(35,70),col:[MATH.random(0.1,0.3)*player.isNight,MATH.random(0.4,0.6)*player.isNight,MATH.random(0.8,1)*player.isNight],life:1.5,rotVel:MATH.random(-3,3),alpha:2.5})},convertSpeed:4,convertAmount:160,attack:3,tokens:['blueBomb'],energy:20,favoriteTreat:'blueberry',rarity:'epic',color:'blue',description:'As a larva, this bee lived in the ocean. It loves Blue flowers cause they remind it of home.',giftedHiveBonus:{oper:'*',stat:'bubblePollen',num:1.5}
    },
    
    hasty:{
        
        u:128*5/2048,v:0,meshPartId:0,gatherSpeed:3,gatherAmount:10,speed:19.6,tokens:['haste'],convertSpeed:3,convertAmount:80,attack:1,attackTokens:['haste'],energy:20,favoriteTreat:'pineapple',rarity:'rare',color:'white',description:'A quick bee who always zips arounds. Sometimes it even makes YOU move faster.',giftedHiveBonus:{oper:'*',stat:'walkSpeed',num:1.1}
        
    },
    
    bomber:{
        
        u:128*6/2048,v:0,meshPartId:0,gatherSpeed:4,gatherAmount:10,speed:15.4,tokens:['whiteBomb'],convertSpeed:4,convertAmount:120,attack:2,energy:20,favoriteTreat:'sunflowerSeed',rarity:'rare',color:'white',description:'This crafty bee makes bombs which collect pollen from all nearby flowers.',giftedHiveBonus:{oper:'*',stat:'redBombPollen,blueBombPollen,whiteBombPollen',num:1.25}
        
    },
    
    fuzzy:{
        
        u:128*7/2048,v:0,meshPartId:7,gatherSpeed:6,gatherAmount:100,speed:11.9,convertSpeed:6,convertAmount:40,attack:3,energy:50,gatheringPassive:function(bee){
            
            let fs=[
                
                [0,0],[-1,-1],[1,-1],[1,1],[-1,1],[0,1],[0,-1],[1,0],[-1,0],[0,2],[2,0],[0,-2],[-2,0]
                
            ]
            
            let f=fieldInfo[player.fieldIn]
            
            for(let i=0,l=MATH.random(-1+(bee.level*0.05),6);i<l;i++){
                
                let r=(Math.random()*fs.length)|0
                let x=fs[r][0]+bee.flowerCollecting[0],z=fs[r][1]+bee.flowerCollecting[1]
                
                fs.splice(r,1)
                
                if(x>=0&&x<f.width&&z>=0&&z<f.length){
                    
                    updateFlower(player.fieldIn,x,z,function(f){
                        
                        if(f.level<5){
                            
                            f.level++
                            f.pollinationTimer=1
                            
                        } else {
                            
                            f.height=1
                        }
                        
                    },true,false,true)
                    
                    for(let j=0;j<6;j++){
                        
                        ParticleRenderer.add({x:x+f.x,y:f.y+0.5,z:z+f.z,vx:MATH.random(-1,1),vy:Math.random()*2,vz:MATH.random(-1,1),grav:-3,size:100,col:[player.isNight,player.isNight,MATH.random(0.6,1)*player.isNight],life:2.5,rotVel:MATH.random(-3,3),alpha:2})
                    }
                }
            }
            
        },particles:function(bee){ParticleRenderer.add({x:bee.pos[0],y:bee.pos[1],z:bee.pos[2],vx:MATH.random(-1,1),vy:MATH.random(0.5,1.4),vz:MATH.random(-1,1),grav:-3,size:MATH.random(25,60),col:[player.isNight,player.isNight,MATH.random(0.6,1)*player.isNight],life:0.75,rotVel:MATH.random(-3,3),alpha:10})},tokens:['pollenHaze','fuzzBomb','whiteBomb_'],favoriteTreat:'pineapple',rarity:'mythic',color:'white',description:'This unkempt ball of fluff is actually a bee. Its fur aids in the pollination of flowers.',giftedHiveBonus:{oper:'*',stat:'whiteBombPollen',num:1.1}
        
    },
    
    stubborn:{
        
        u:128*8/2048,v:0,meshPartId:0,gatherSpeed:4,gatherAmount:10,speed:11.9,tokens:['pollenMarkToken'],convertSpeed:3,convertAmount:80,attack:2,energy:20,favoriteTreat:'strawberry',rarity:'rare',color:'white',description:"A hardheaded bee who can't be bossed around. It tells others where to go.",giftedHiveBonus:{oper:'*',stat:'tokenLifespan',num:1.25}
        
    },
    
    spicy:{
        
        u:128*9/2048,v:0,meshPartId:4,gatherSpeed:4,gatherAmount:14,speed:14,convertSpeed:2,convertAmount:200,tokens:['inferno','flameFuel'],attack:5,attackTokens:['inferno','flameFuel','rage'],energy:20,particles:function(bee){if(player.flameHeatStack){ParticleRenderer.add({x:bee.pos[0],y:bee.pos[1],z:bee.pos[2],vx:MATH.random(-0.7,0.7),vy:MATH.random(-0.3,0.3),vz:MATH.random(-0.7,0.7),grav:1.25,size:110,col:[player.isNight,player.isNight,player.isNight],life:1.5,rotVel:MATH.random(-3,3),alpha:(player.flameHeatStack-1)*2})}},favoriteTreat:'strawberry',rarity:'mythic',color:'red',description:'Some like it hot - this bee likes it scorching. Even the honey it makes is spicy.',giftedHiveBonus:{oper:'*',stat:'flameLife',num:1.25}
        
    },
    
    vector:{
        
        u:1280/2048,v:0,meshPartId:2,gatherSpeed:4,gatherAmount:18,speed:16.24,convertSpeed:2.72,convertAmount:144,tokens:['pollenMarkToken','markSurge','triangulate'],attack:5,energy:45.6,favoriteTreat:'pineapple',rarity:'mythic',color:'white',description:'A bee brought to life by an extremely complex trigonometric equation.',giftedHiveBonus:{oper:'*',stat:'markDuration',num:1.15}
        
    },
    
    tadpole:{
        
        u:128*11/2048,v:0,meshPartId:0,gatherSpeed:6,gatherAmount:10,speed:11.2,convertSpeed:4,convertAmount:120,tokens:['summonFrog','blueBoost','babyLove*'],attack:0.5,energy:10,gatheringPassive:function(bee){if(Math.random()<(bee.gifted?0.75:0.55)){objects.bubbles.push(new Bubble(player.fieldIn,bee.flowerCollecting[0],bee.flowerCollecting[1]))}},favoriteTreat:'blueberry',rarity:'mythic',color:'blue',description:'A tiny amphibious bee who wants to become a frog when it grows up.',giftedHiveBonus:{oper:'*',stat:'bluePollen',num:1.1},trails:[{length:8,size:0.15,color:[29/215, 133/215, 72/215,1],skipFrame:3,skipAdd:3,vertical:true}]
    },
    
    buoyant:{
        
        u:128*12/2048,v:0,meshPartId:3,gatherSpeed:5,gatherAmount:15,speed:14,convertSpeed:3,convertAmount:150,tokens:['inflateBalloons','surpriseParty','blueBomb_'],attack:3,energy:60,favoriteTreat:'blueberry',rarity:'mythic',color:'blue',description:"Just like a balloon, nothing can keep this bee down. It's always ready to party.",giftedHiveBonus:{oper:'*',stat:'capacityMultiplier',num:1.2}
        
    },
    
    gummy:{
        
        u:128*13/2048,v:0,meshPartId:0,gatherSpeed:4,gatherAmount:10,speed:14,convertSpeed:4,convertAmount:700,tokens:['gummyBlob','gummyBarrage','whiteBoost'],attack:3,energy:50,rarity:'event',color:'white',description:"A squishy bee who's sweet as sugar. Covers flowers in goo to grant you bonus honey!",giftedHiveBonus:{oper:'+',stat:'honeyPerPollen',num:1.05}
        
    },
    
    precise:{
        
        u:128*14/2048,v:0,meshPartId:1,gatherSpeed:4,gatherAmount:20,speed:11.2,convertSpeed:4,convertAmount:130,tokens:['targetPractice','redBomb_'],attack:8,energy:40,attackTokens:['targetPractice'],favoriteTreat:'sunflowerSeed',rarity:'mythic',color:'red',description:'This sharpshooting bee is always on point and expects the same of you.',giftedHiveBonus:{oper:'+',stat:'superCritChance',num:0.05},trails:[{length:4,size:0.25,triangle:true,color:[219/255,72/255,92/255,1],skipFrame:3,skipAdd:3}]
    },
    
    rage:{
        
        u:128*15/2048,v:0,meshPartId:0,gatherSpeed:4,gatherAmount:10,speed:15.4,convertSpeed:4,convertAmount:80,attack:4,tokens:['link'],energy:20,attackTokens:['rage','link'],favoriteTreat:'strawberry',rarity:'epic',color:'red',description:'A very angry bee who has been wronged its whole life. It harnesses its rage to become more powerful.',giftedHiveBonus:{oper:'+',stat:'whiteBeeAttack,redBeeAttack,blueBeeAttack',num:1}
    },
    
    crimson:{
        
        u:128*0/2048,v:256/2048,meshPartId:0,gatherSpeed:4,gatherAmount:10,speed:18.2,convertSpeed:3,convertAmount:120,tokens:['redPulse','redBombSync'],attack:6,energy:35,rarity:'event',color:'red',description:"A superhero and defender of all things Red! Together with Cobalt Bee it works to unite bees of all colors.",giftedHiveBonus:{oper:'+',stat:'instantRedConversion',num:0.1},trails:[{length:7,size:0.2,triangle:true,color:[1,0,0,1],skipFrame:3,skipAdd:3,beeOffset:-0.05},{length:7,size:0.075,triangle:true,color:[1,1,1,1],skipFrame:3,skipAdd:3,beeOffset:0.05}]
        
    },
    
    cobalt:{
        
        u:128*1/2048,v:256/2048,meshPartId:0,gatherSpeed:4,gatherAmount:10,speed:18.2,convertSpeed:3,convertAmount:120,tokens:['bluePulse','blueBombSync'],attack:6,energy:35,rarity:'event',color:'blue',description:"A superhero and defender of all things Blue! Together with Crimson Bee it works to unite bees of all colors.",giftedHiveBonus:{oper:'+',stat:'instantBlueConversion',num:0.1},trails:[{length:7,size:0.2,triangle:true,color:[0,0,1,1],skipFrame:3,skipAdd:3,beeOffset:-0.05},{length:7,size:0.075,triangle:true,color:[1,1,1,1],skipFrame:3,skipAdd:3,beeOffset:0.05}]
        
    },
    
    photon:{
        
        u:128*2/2048,v:256/2048,meshPartId:6,gatherSpeed:2,gatherAmount:20,speed:21,convertSpeed:2,convertAmount:240,tokens:['beamStorm','haste','whiteBoost'],attackTokens:['haste'],attack:3,energy:Infinity,rarity:'event',color:'white',description:"An entity made of pure light temporarily taking on the form of a bee.",giftedHiveBonus:{oper:'+',stat:'instantWhiteConversion,instantBlueConversion,instantRedConversion',num:0.05},trails:[{length:10,size:0.25,color:[1,1,0,0.5],skipFrame:2,skipAdd:2}]
    },
    
    bumble:{
        
        u:128*3/2048,v:256/2048,meshPartId:0,gatherSpeed:4,gatherAmount:18,speed:10.5,tokens:['blueBomb'],convertSpeed:4,convertAmount:80,attack:1,attackTokens:[],energy:50,favoriteTreat:'blueberry',rarity:'rare',color:'blue',description:'A mellow fellow who moves a little slow, but works harder and longer than others.',giftedHiveBonus:{oper:'*',stat:'capacityMultiplier',num:1.1}
        
    },
    
    rascal:{
        
        u:128*4/2048,v:256/2048,meshPartId:0,gatherSpeed:4,gatherAmount:10,speed:16.1,tokens:['redBomb'],convertSpeed:4,convertAmount:80,attack:3,attackTokens:[],energy:20,favoriteTreat:'strawberry',rarity:'rare',color:'red',description:'A mischevious bee who moves quick and hits hard. Keep an eye out on this one!',giftedHiveBonus:{oper:'*',stat:'redBombPollen',num:1.3}
        
    },
    
    cool:{
        
        u:128*5/2048,v:256/2048,meshPartId:0,gatherSpeed:3,gatherAmount:10,speed:14,tokens:['blueBoost'],convertSpeed:4,convertAmount:80,attack:2,attackTokens:[],energy:20,favoriteTreat:'blueberry',rarity:'rare',color:'blue',description:"A sarcastic bee who's a little better than the others. Sometimes boosts pollen from Blue flowers.",giftedHiveBonus:{oper:'*',stat:'bluePollen',num:1.15}
        
    },
    
    rad:{
        
        u:128*6/2048,v:256/2048,meshPartId:0,gatherSpeed:4,gatherAmount:13,speed:14,tokens:['redBomb'],convertSpeed:3,convertAmount:80,attack:1,attackTokens:[],energy:20,favoriteTreat:'strawberry',rarity:'rare',color:'red',description:'A stylish bee with a taste for red flowers. Everyone wants to be this bee.',giftedHiveBonus:{oper:'*',stat:'redPollen',num:1.15}
        
    },
    
    brave:{
        
        u:128*7/2048,v:256/2048,meshPartId:0,gatherSpeed:4,gatherAmount:10,speed:16.8,convertSpeed:4,convertAmount:200,attack:5,energy:30,favoriteTreat:'pineapple',rarity:'rare',color:'white',description:'This loyal bee will do anything to protect its owner.',giftedHiveBonus:{oper:'+',stat:'whiteBeeAttack,redBeeAttack,blueBeeAttack',num:1}
    },
    
    windy:{
        
        u:128*8/2048,v:256/2048,meshPartId:0,gatherSpeed:3,gatherAmount:10,speed:19.6,convertSpeed:2,convertAmount:180,tokens:['whiteBoost','rainCloud','tornado'],attackTokens:[],attack:3,energy:20,rarity:'event',color:'white',description:"An entity made of pure light temporarily taking on the form of a bee.",giftedHiveBonus:{oper:'+',stat:'instantWhiteConversion',num:0.1},trails:[{length:15,size:0.4,color:[0.5,0.5,0.5,0.4],skipFrame:4,skipAdd:4},{length:15,size:0.4,color:[0.5,0.5,0.5,0.4],skipFrame:4,skipAdd:4,vertical:true}]
    },
    
    bucko:{
        
        u:128*9/2048,v:256/2048,meshPartId:8,gatherSpeed:4,gatherAmount:17,speed:15.4,convertSpeed:3,convertAmount:80,attack:5,energy:30,tokens:['blueBoost'],favoriteTreat:'blueberry',rarity:'epic',color:'blue',description:"Leader of the Blue bees, and a long time rival of Riley Bee. It's tenacity is it's greatest strength.",giftedHiveBonus:{oper:'*',stat:'blueFieldCapacity',num:1.25}
    },
    
    riley:{
        
        u:128*10/2048,v:256/2048,meshPartId:8,gatherSpeed:2,gatherAmount:10,speed:15.4,convertSpeed:4,convertAmount:140,attack:5,energy:25,tokens:['redBoost'],favoriteTreat:'strawberry',rarity:'epic',color:'red',description:"Leader of the Red bees, and a long time rival of Bucko Bee. It's fiery nature has elevated it above the rest.",giftedHiveBonus:{oper:'*',stat:'redFieldCapacity',num:1.25}
    },
    
    commander:{
        
        u:128*11/2048,v:256/2048,meshPartId:9,gatherSpeed:4,gatherAmount:15,speed:14,convertSpeed:4,convertAmount:80,attack:4,energy:30,tokens:['focus','whiteBomb'],attackTokens:['focus'],favoriteTreat:'sunflowerSeed',rarity:'epic',color:'white',description:"A strong, no-nonsense bee who stays level headed when things get rough.",giftedHiveBonus:{oper:'+',stat:'criticalChance',num:0.03}
    },
    
    honey:{
        
        u:128*12/2048,v:256/2048,meshPartId:0,gatherSpeed:4,gatherAmount:10,speed:14,convertSpeed:2,convertAmount:360,attack:1,energy:20,tokens:['honeyMarkToken'],favoriteTreat:'sunflowerSeed',rarity:'epic',color:'white',description:"A satisfied bee always full with the finest honey. If you're lucky it will share some.",giftedHiveBonus:{oper:'*',stat:'honeyFromTokens',num:1.5}
    },
    
    tabby:{
        
        u:128*13/2048,v:256/2048,meshPartId:10,gatherSpeed:4,gatherAmount:10,speed:16.1,convertSpeed:3,convertAmount:160,attack:4,energy:28,tokens:['scratch','tabbyLove'],rarity:'event',color:'white',description:"This affectionate bee was raised by cats. It becomes a better worker as it warms up to you",giftedHiveBonus:{oper:'+',stat:'criticalPower',num:0.5}
    },
    
    diamond:{
        
        u:128*14/2048,v:256/2048,meshPartId:0,gatherSpeed:4,gatherAmount:10,speed:14,convertSpeed:4,convertAmount:1000,attack:1,energy:20,tokens:['blueBomb_'],rarity:'legendary',color:'blue',description:"This affectionate bee was raised by cats. It becomes a better worker as it warms up to you",giftedHiveBonus:{oper:'*',stat:'convertRate',num:1.5},particles:function(bee){ParticleRenderer.add({x:bee.pos[0]+MATH.random(-0.5,0.5),y:bee.pos[1]+MATH.random(-0.5,0.5),z:bee.pos[2]+MATH.random(-0.5,0.5),vx:0,vy:0,vz:0,grav:0,size:MATH.random(15,70),col:[1,1,1],life:0.25,rotVel:MATH.random(-6,6),alpha:1})},favoriteTreat:'blueberry'
    },
    
    demon:{
        
        u:128*15/2048,v:256/2048,meshPartId:11,gatherSpeed:4,gatherAmount:35,speed:10.5,convertSpeed:4,convertAmount:60,attack:8,energy:20,tokens:['redBomb','redBomb_'],rarity:'legendary',color:'red',description:"A powerful bee with magical powers fueled by pure hatred.",giftedHiveBonus:{oper:'+',stat:'instantBombConversion',num:0.15},gatheringPassive:function(bee){if(Math.random()<(bee.gifted?0.75:0.55)){objects.explosions.push(new Explosion({col:[1,0.5,0],pos:[Math.round(bee.pos[0]),bee.pos[1]-0.225,Math.round(bee.pos[2])],life:0.5,size:1.5,speed:0.5,aftershock:0.01,height:0.01}));objects.flames.push(new Flame(player.fieldIn,bee.flowerCollecting[0],bee.flowerCollecting[1]))}},particles:function(bee){ParticleRenderer.add({x:bee.pos[0],y:bee.pos[1],z:bee.pos[2],vx:MATH.random(-0.3,0.3),vy:MATH.random(-0.3,0.3),vz:MATH.random(-0.3,0.3),grav:0,size:MATH.random(80,130),col:[1,MATH.random(0.4,0.7),0],life:1.5,rotVel:MATH.random(-3,3),alpha:2.5})},favoriteTreat:'pineapple'
    },
    
    carpenter:{
        
        u:128*0/2048,v:256*2/2048,meshPartId:12,gatherSpeed:3,gatherAmount:10,speed:11.2,convertSpeed:4,convertAmount:120,attack:4,energy:25,tokens:['pollenMarkToken','honeyMarkToken'],rarity:'legendary',color:'white',description:"A bee with a knack for construction. It built its own body out of wood.",giftedHiveBonus:{oper:'*',stat:'pollenFromTools',num:1.25},favoriteTreat:'sunflowerSeed'
    },
    
    lion:{
        
        u:128*1/2048,v:256*2/2048,meshPartId:13,gatherSpeed:4,gatherAmount:20,speed:19.6,convertSpeed:2,convertAmount:160,attack:9,energy:60,tokens:['whiteBomb_'],rarity:'legendary',color:'white',description:"Half lion, half bee. This is the king of both the jungle and bee hive.",giftedHiveBonus:{oper:'+',stat:'whiteBeeAttack',num:2},favoriteTreat:'pineapple'
    },
    
    ninja:{
        
        u:128*2/2048,v:256*2/2048,meshPartId:0,gatherSpeed:2,gatherAmount:10,speed:21,convertSpeed:2,convertAmount:80,attack:4,energy:20,tokens:['haste','blueBomb_'],rarity:'legendary',color:'white',description:"This bee trained vigorously for years to become the swiftest bee that has ever lived.",giftedHiveBonus:{oper:'*',stat:'beeSpeed',num:1.05},favoriteTreat:'sunflowerSeed'
    },
    
    shy:{
        
        u:128*3/2048,v:256*2/2048,meshPartId:0,gatherSpeed:2,gatherAmount:10,speed:18.2,convertSpeed:4,convertAmount:320,attack:2,energy:40,tokens:['redBoost','redBomb_'],rarity:'legendary',color:'white',description:"This talented bee doesn't like to socialize, it just wants to work and be left alone.",giftedHiveBonus:{oper:'*',stat:'redBeeAbilityRate',num:1.15},favoriteTreat:'sunflowerSeed',particles:function(bee){if(Math.random()<0.2){ParticleRenderer.add({x:bee.pos[0],y:bee.pos[1],z:bee.pos[2],vx:MATH.random(-0.1,0.1),vy:MATH.random(-0.1,0.1),vz:MATH.random(-0.1,0.1),grav:0,size:MATH.random(200,350),col:[0.6,0.6,0.6],life:1.5,rotVel:MATH.random(-2,2),alpha:0.25})}}
    },
    
    demo:{
        
        u:128*4/2048,v:256*2/2048,meshPartId:0,gatherSpeed:4,gatherAmount:10,speed:16.8,convertSpeed:4,convertAmount:200,attack:3,energy:20,tokens:['whiteBomb_'],rarity:'epic',color:'white',description:"An elite Bomber Bee who has worked its way up the ranks. It is an expert in explosives.",giftedHiveBonus:{oper:'*',stat:'whiteBombPollen',num:1.3},favoriteTreat:'sunflowerSeed'
    },
    
    exhausted:{
        
        u:128*5/2048,v:256*2/2048,meshPartId:0,gatherSpeed:4.6,gatherAmount:10,speed:10.5,convertSpeed:4,convertAmount:240,attack:1,energy:Infinity,tokens:['whiteBomb','link'],rarity:'epic',color:'white',description:"This bee suffers from insomnia. It moves slowly, but it never has to sleep.",giftedHiveBonus:{oper:'*',stat:'whiteFieldCapacity',num:1.2},favoriteTreat:'pineapple'
    },
    
    shocked:{
        
        u:128*6/2048,v:256*2/2048,meshPartId:0,gatherSpeed:4,gatherAmount:10,speed:19.6,convertSpeed:2,convertAmount:80,attack:2,energy:Infinity,tokens:['haste','link'],rarity:'epic',color:'white',description:"This bee is startled by everything it comes across. It has learned special talents to cope.",giftedHiveBonus:{oper:'*',stat:'whitePollen',num:1.25},favoriteTreat:'pineapple'
    },
    
    frosty:{
        
        u:128*7/2048,v:256*2/2048,meshPartId:14,gatherSpeed:4,gatherAmount:10,speed:11.2,convertSpeed:4,convertAmount:80,attack:1,energy:25,tokens:['blueBoost','blueBomb_'],rarity:'epic',color:'white',description:"A bee made of snow. It magically came to life after someone put a top hat on its head.",giftedHiveBonus:{oper:'*',stat:'blueBombPollen',num:1.3},favoriteTreat:'blueberry'
    },
    
    baby:{
        
        u:128*8/2048,v:256*2/2048,meshPartId:0,gatherSpeed:5,gatherAmount:10,speed:10.5,convertSpeed:5,convertAmount:80,attack:0,energy:15,tokens:['babyLove'],rarity:'legendary',color:'white',description:"This little bee isn't very good at bee tasks yet, but it's guaranteed to bring you joy (and luck).",giftedHiveBonus:{oper:'+',stat:'lootLuck',num:0.25},favoriteTreat:'strawberry'
    },
}

let effects={
    
    haste:{
        
        trialCooldown:15,trialRate:0.5,
        statsToAddTo:['hasteTokens'],
        u:0,v:0,
        svg:document.getElementById('haste'),
        cooldown:document.getElementById('haste_cooldown'),
        amount:document.getElementById('haste_amount'),
        maxCooldown:20,
        maxAmount:10,
        tokenLife:4,
        sound:function(){window.playSound('haste',0.4)},
        
        update:(amount,player)=>{
            
            player.walkSpeed*=amount*0.1+1
            player.hasteStacks=amount
        },
        
        getMessage:(amount)=>{
            
            return 'Haste\nx'+((player.defaultStats.walkSpeed*(amount*0.1+1))/player.defaultStats.walkSpeed).toFixed(1)+' movespeed'
        }
    },
    
    haste__:{
        
        svg:document.getElementById('haste__'),
        cooldown:document.getElementById('haste___cooldown'),
        amount:document.getElementById('haste___amount'),
        maxCooldown:45*99,
        maxAmount:1,
        
        update:(amount,player)=>{
            
            player.walkSpeed*=2
        },
        
        getMessage:(amount)=>{
            
            return 'Haste++\nx2 movespeed'
        }
    },
    
    focus:{
        
        trialCooldown:20,trialRate:0.5,
        statsToAddTo:['focusTokens','battleTokens'],
        u:128/2048,v:0,
        svg:document.getElementById('focus'),
        cooldown:document.getElementById('focus_cooldown'),
        amount:document.getElementById('focus_amount'),
        maxCooldown:20,
        maxAmount:10,
        tokenLife:4,
        sound:function(){window.playSound('focusToken',0.3)},
        
        update:(amount,player)=>{
            
            player.criticalChance+=0.03*amount
        },
        
        getMessage:(amount)=>{
            
            return 'Focus\n'+amount*3+'% critical chance'
        }
    },
    
    melody:{
        
        trialCooldown:35,trialRate:0.35,
        statsToAddTo:['melodyTokens','battleTokens'],
        u:256/2048,v:0,
        svg:document.getElementById('melody'),
        cooldown:document.getElementById('melody_cooldown'),
        amount:document.getElementById('melody_amount'),
        maxCooldown:30,
        maxAmount:1,
        tokenLife:8,
        sound:function(){window.playSound('melodyToken',0.5)},
        
        update:(amount,player)=>{
            
            player.criticalPower+=1
        },
        
        getMessage:(amount)=>{
            
            return 'Melody\n+100% critical power'
        }
    },
    
    link:{
        
        trialCooldown:20,trialRate:0.75,
        statsToAddTo:['linkTokens','battleTokens'],
        u:128*3/2048,v:0,
        canBeLinked:false,
        tokenLife:4,
        
        func:function(){
            
            for(let i in objects.tokens){
                
                if(objects.tokens[i].canBeLinked){
                    
                    objects.tokens[i].collect()
                }
            }
        },
        backupFunc:function(){
            
            for(let i in objects.tokens){
                
                if(objects.tokens[i].canBeLinked){
                    
                    objects.tokens[i].collect()
                }
            }
        }
    },
    
    bombCombo:{
        
        u:128*4/2048,v:0,
        svg:document.getElementById('bombCombo'),
        cooldown:document.getElementById('bombCombo_cooldown'),
        amount:document.getElementById('bombCombo_amount'),
        maxCooldown:5,
        maxAmount:10,
        tokenLife:4,
        
        update:(amount,player)=>{
            
            player.redBombPollen*=amount*0.2+1
            player.whiteBombPollen*=amount*0.2+1
            player.blueBombPollen*=amount*0.2+1
        },
        
        getMessage:(amount)=>{
            
            return 'Bomb Combo\nx'+(amount*0.2+1).toFixed(1)+' bomb power'
        }
    },
    
    whiteBomb:{
        
        trialCooldown:15,trialRate:0.3,
        statsToAddTo:['bombTokens'],
        u:128*4/2048,v:0,
        tokenLife:4,
        
        func:function(params){
            
            if(player.fieldIn===params.field){
                
                let b=(params.bee.level-1)*0.1+1
                
                collectPollen({x:params.x,z:params.z,pattern:[[-3,0],[-2,-2],[-2,-1],[-2,0],[-2,1],[-2,2],[-1,-2],[-1,-1],[-1,0],[-1,1],[-1,2],[0,-3],[0,-2],[0,-1],[0,0],[0,1],[0,2],[0,3],[1,-2],[1,-1],[1,0],[1,1],[1,2],[2,-2],[2,-1],[2,0],[2,1],[2,2],[3,0]],amount:7.5,stackOffset:0.4+Math.random()*0.5,multiplier:b*player.whiteBombPollen,instantConversion:player.instantBombConversion})
                
                objects.explosions.push(new Explosion({col:[1,1,1],pos:[fieldInfo[params.field].x+params.x,fieldInfo[params.field].y+0.5,fieldInfo[params.field].z+params.z],life:0.3,size:4,speed:0.35,aftershock:0.05}))
                
            }
            
            player.addEffect('bombCombo')
            window.playSound('bombToken',0.5)
        }
    },
    
    redBomb:{
        
        trialCooldown:15,trialRate:0.3,
        statsToAddTo:['redBombTokens','redAbilityTokens','bombTokens'],
        u:128*5/2048,v:0,
        tokenLife:4,
        
        func:function(params){
            
            if(player.fieldIn===params.field){
                
                let b=(params.bee.level-1)*0.1+1
                
                collectPollen({x:params.x,z:params.z,pattern:[[-3,0],[-2,-2],[-2,-1],[-2,0],[-2,1],[-2,2],[-1,-2],[-1,-1],[-1,0],[-1,1],[-1,2],[0,-3],[0,-2],[0,-1],[0,0],[0,1],[0,2],[0,3],[1,-2],[1,-1],[1,0],[1,1],[1,2],[2,-2],[2,-1],[2,0],[2,1],[2,2],[3,0]],amount:{r:10,w:player.redBombSync?7.5:0,b:player.redBombSync&&player.blueBombSync?5:0},stackOffset:0.4+Math.random()*0.5,multiplier:b*player.redBombPollen,instantConversion:player.instantBombConversion})
                
                objects.explosions.push(new Explosion({col:[1,0,0],pos:[fieldInfo[params.field].x+params.x,fieldInfo[params.field].y+0.5,fieldInfo[params.field].z+params.z],life:0.3,size:4,speed:0.35,aftershock:0.05}))
                
            }
            
            player.addEffect('bombCombo')
            window.playSound('bombToken',0.5)
        }
    },
    
    blueBomb:{
        
        trialCooldown:15,trialRate:0.3,
        statsToAddTo:['blueBombTokens','blueAbilityTokens','bombTokens'],
        u:128*6/2048,v:0,
        tokenLife:4,
        
        func:function(params){
            
            if(player.fieldIn===params.field){
                
                let b=(params.bee.level-1)*0.1+1
                
                collectPollen({x:params.x,z:params.z,pattern:[[-3,0],[-2,-2],[-2,-1],[-2,0],[-2,1],[-2,2],[-1,-2],[-1,-1],[-1,0],[-1,1],[-1,2],[0,-3],[0,-2],[0,-1],[0,0],[0,1],[0,2],[0,3],[1,-2],[1,-1],[1,0],[1,1],[1,2],[2,-2],[2,-1],[2,0],[2,1],[2,2],[3,0]],amount:{r:player.blueBombSync&&player.redBombSync?5:0,w:player.blueBombSync?7.5:0,b:10},stackOffset:0.4+Math.random()*0.5,multiplier:b*player.blueBombPollen,instantConversion:player.instantBombConversion})
                
                objects.explosions.push(new Explosion({col:[0,0,1],pos:[fieldInfo[params.field].x+params.x,fieldInfo[params.field].y+0.5,fieldInfo[params.field].z+params.z],life:0.3,size:4,speed:0.35,aftershock:0.05}))
                
            }
            
            player.addEffect('bombCombo')
            window.playSound('bombToken',0.5)
        }
    },
    
    whiteBomb_:{
        
        trialCooldown:15,trialRate:0.4,
        statsToAddTo:['bombTokens'],
        u:128*7/2048,v:0,
        tokenLife:4,
        
        func:function(params){
            
            if(player.fieldIn===params.field){
                
                let b=(params.bee.level-1)*0.15+1
                
                collectPollen({x:params.x,z:params.z,pattern:[[-4,0],[-3,-2],[-3,-1],[-3,0],[-3,1],[-3,2],[-2,-3],[-2,-2],[-2,-1],[-2,0],[-2,1],[-2,2],[-2,3],[-1,-3],[-1,-2],[-1,-1],[-1,0],[-1,1],[-1,2],[-1,3],[0,-4],[0,-3],[0,-2],[0,-1],[0,0],[0,1],[0,2],[0,3],[0,4],[1,-3],[1,-2],[1,-1],[1,0],[1,1],[1,2],[1,3],[2,-3],[2,-2],[2,-1],[2,0],[2,1],[2,2],[2,3],[3,-2],[3,-1],[3,0],[3,1],[3,2],[4,0]],amount:10,stackHeight:0.4+Math.random()*0.5,multiplier:b*player.whiteBombPollen,instantConversion:player.instantBombConversion})
                
                objects.explosions.push(new Explosion({col:[1,1,1],pos:[fieldInfo[params.field].x+params.x,fieldInfo[params.field].y+0.5,fieldInfo[params.field].z+params.z],life:0.3,size:4,speed:0.35,aftershock:0.05}))
                
            }
            
            player.addEffect('bombCombo')
            window.playSound('bombToken',0.5)
        }
    },
    
    redBomb_:{
        
        trialCooldown:20,trialRate:0.3,
        statsToAddTo:['redBombTokens','redAbilityTokens','bombTokens'],
        u:0,v:128/2048,
        tokenLife:4,
        
        func:function(params){
            
            if(player.fieldIn===params.field){
                
                let b=(params.bee.level-1)*0.2+1
                
                collectPollen({x:params.x,z:params.z,pattern:[[-4,0],[-3,-2],[-3,-1],[-3,0],[-3,1],[-3,2],[-2,-3],[-2,-2],[-2,-1],[-2,0],[-2,1],[-2,2],[-2,3],[-1,-3],[-1,-2],[-1,-1],[-1,0],[-1,1],[-1,2],[-1,3],[0,-4],[0,-3],[0,-2],[0,-1],[0,0],[0,1],[0,2],[0,3],[0,4],[1,-3],[1,-2],[1,-1],[1,0],[1,1],[1,2],[1,3],[2,-3],[2,-2],[2,-1],[2,0],[2,1],[2,2],[2,3],[3,-2],[3,-1],[3,0],[3,1],[3,2],[4,0]],amount:{r:12.5,w:player.redBombSync?10:0,b:player.redBombSync&&player.blueBombSync?7.5:0},stackHeight:0.4+Math.random()*0.5,multiplier:b*player.redBombPollen,instantConversion:player.instantBombConversion})
                
                objects.explosions.push(new Explosion({col:[1,0,0],pos:[fieldInfo[params.field].x+params.x,fieldInfo[params.field].y+0.5,fieldInfo[params.field].z+params.z],life:0.3,size:4,speed:0.35,aftershock:0.05}))
                
            }
            
            player.addEffect('bombCombo')
            window.playSound('bombToken',0.5)
        }
    },
    
    blueBomb_:{
        
        trialCooldown:20,trialRate:0.3,
        statsToAddTo:['blueBombTokens','blueAbilityTokens','bombTokens'],
        u:128/2048,v:128/2048,
        tokenLife:4,
        
        func:function(params){
            
            if(player.fieldIn===params.field){
                
                let b=(params.bee.level-1)*0.2+1
                
                collectPollen({x:params.x,z:params.z,pattern:[[-4,0],[-3,-2],[-3,-1],[-3,0],[-3,1],[-3,2],[-2,-3],[-2,-2],[-2,-1],[-2,0],[-2,1],[-2,2],[-2,3],[-1,-3],[-1,-2],[-1,-1],[-1,0],[-1,1],[-1,2],[-1,3],[0,-4],[0,-3],[0,-2],[0,-1],[0,0],[0,1],[0,2],[0,3],[0,4],[1,-3],[1,-2],[1,-1],[1,0],[1,1],[1,2],[1,3],[2,-3],[2,-2],[2,-1],[2,0],[2,1],[2,2],[2,3],[3,-2],[3,-1],[3,0],[3,1],[3,2],[4,0]],amount:{b:12.5,w:player.blueBombSync?10:0,r:player.blueBombSync&&player.redBombSync?7.5:0},stackHeight:0.4+Math.random()*0.5,multiplier:b*player.blueBombPollen})
                
                objects.explosions.push(new Explosion({col:[0,0,1],pos:[fieldInfo[params.field].x+params.x,fieldInfo[params.field].y+0.5,fieldInfo[params.field].z+params.z],life:0.3,size:4,speed:0.35,aftershock:0.05,instantConversion:player.instantBombConversion}))
                
            }
            
            player.addEffect('bombCombo')
            window.playSound('bombToken',0.5)
        }
    },
    
    blueBoost:{
        
        trialCooldown:25,trialRate:0.6,
        statsToAddTo:['blueBoostTokens','blueAbilityTokens','boostTokens'],
        u:128*2/2048,v:128/2048,
        svg:document.getElementById('blueBoost'),
        cooldown:document.getElementById('blueBoost_cooldown'),
        amount:document.getElementById('blueBoost_amount'),
        maxCooldown:15,
        maxAmount:10,
        tokenLife:4,
        
        update:(amount,player)=>{
            
            player.bluePollen*=amount*0.2+1
        },
        
        getMessage:(amount)=>{
            
            return 'Blue Boost\nx'+(amount*0.2+1).toFixed(1)+' blue pollen'
        }
    },
    
    redBoost:{
        
        trialCooldown:25,trialRate:0.6,
        statsToAddTo:['redBoostTokens','redAbilityTokens','boostTokens'],
        u:128*3/2048,v:128/2048,
        svg:document.getElementById('redBoost'),
        cooldown:document.getElementById('redBoost_cooldown'),
        amount:document.getElementById('redBoost_amount'),
        maxCooldown:15,
        maxAmount:10,
        tokenLife:4,
        
        update:(amount,player)=>{
            
            player.redPollen*=amount*0.2+1
        },
        
        getMessage:(amount)=>{
            
            return 'Red Boost\nx'+(amount*0.2+1).toFixed(1)+' red pollen'
        }
    },
    
    whiteBoost:{
        
        trialCooldown:15,trialRate:0.8,
        statsToAddTo:['boostTokens'],
        u:128*4/2048,v:128/2048,
        svg:document.getElementById('whiteBoost'),
        cooldown:document.getElementById('whiteBoost_cooldown'),
        amount:document.getElementById('whiteBoost_amount'),
        maxCooldown:15,
        maxAmount:10,
        tokenLife:4,
        
        update:(amount,player)=>{
            
            player.whitePollen*=amount*0.2+1
        },
        
        getMessage:(amount)=>{
            
            return 'White Boost\nx'+(amount*0.2+1).toFixed(1)+' white pollen'
        }
    },
    
    babyLove:{
        
        trialCooldown:40,trialRate:0.5,
        u:128*1/2048,v:256*4/2048,
        svg:document.getElementById('babyLove'),
        cooldown:document.getElementById('babyLove_cooldown'),
        amount:document.getElementById('babyLove_amount'),
        maxCooldown:30,
        maxAmount:1,
        tokenLife:8,
        // sound:function(){window.playSound('babyLoveToken',1)},
        
        update:(amount,player)=>{
            
            player.redPollen*=2
            player.whitePollen*=2
            player.bluePollen*=2
        },
        
        getMessage:(amount)=>{
            
            return 'Baby Love\nx2 pollen'
        }
    },
    
    rage:{
        
        trialCooldown:25,trialRate:0.8,
        statsToAddTo:['rageTokens','battleTokens','redAbilityTokens'],
        u:128*6/2048,v:256*2/2048,
        svg:document.getElementById('rage'),
        cooldown:document.getElementById('rage_cooldown'),
        amount:document.getElementById('rage_amount'),
        maxCooldown:30,
        maxAmount:3,
        tokenLife:24,
        sound:function(){window.playSound('rageToken',1)},
        
        update:(amount,player)=>{
            
            player.whiteBeeAttack+=amount
            player.blueBeeAttack+=amount
            player.redBeeAttack+=amount
        },
        
        getMessage:(amount)=>{
            
            return 'Rage\n+'+amount+' bee attack'
        }
    },
    
    flameHeat:{
        
        u:128*5/2048,v:128/2048,
        svg:document.getElementById('flameHeat'),
        cooldown:document.getElementById('flameHeat_cooldown'),
        amount:document.getElementById('flameHeat_amount'),
        maxCooldown:20,
        tokenLife:4,
        amountFromCooldown:true,
        
        update:(amount,player)=>{
            
            player.redPollen*=amount+1
            player.beeAttack*=amount*0.2+1
            player.flameHeatStack=amount+1
        },
        
        getMessage:(amount)=>{
            
            return 'Flame Heat\nx'+(amount+1).toFixed(2)+'  red pollen\nx'+(amount*0.2+1).toFixed(2)+' bee attack'
        }
    },
    
    darkHeat:{
        
        u:128*5/2048,v:128/2048,
        svg:document.getElementById('darkHeat'),
        cooldown:document.getElementById('darkHeat_cooldown'),
        amount:document.getElementById('darkHeat_amount'),
        maxCooldown:0,
        tokenLife:4,
        maxAmount:100,
        
        update:(amount,player)=>{
            
            player.superCritPower*=amount*0.06+1
            player.instantRedConversion+=amount*0.0025
            player.beeAttack*=amount*0.02+1
        },
        
        getMessage:(amount)=>{
            
            return 'Dark Heat\nx'+(amount*0.06+1).toFixed(2)+' super-crit power\n+'+((amount*0.25)|0)+'% instant red conversion\nx'+(amount*0.02+1)+' bee attack'
        }
    },
    
    pollenMarkToken:{
        
        trialCooldown:32.5,trialRate:0.5,
        statsToAddTo:['markTokens'],
        u:128*6/2048,v:128/2048,
        tokenLife:8,
        
        func:function(params){
            
            if(player.fieldIn===params.field){
                
                objects.marks.push(new Mark(params.field,(Math.random()*fieldInfo[params.field].width)|0,(Math.random()*fieldInfo[params.field].length)|0,'pollenMark',params.bee.level))
                
            }
            
            window.playSound('markToken',0.6)
        }
    },
    
    honeyMarkToken:{
        
        trialCooldown:22.5,trialRate:0.6,
        statsToAddTo:['markTokens'],
        u:128*7/2048,v:128/2048,
        tokenLife:8,
        
        func:function(params){
            
            if(player.fieldIn===params.field){
                
                objects.marks.push(new Mark(params.field,(Math.random()*fieldInfo[params.field].width)|0,(Math.random()*fieldInfo[params.field].length)|0,'honeyMark',params.bee.level))
                
            }
            
            window.playSound('markToken',0.6)
        }
    },
    
    preciseMarkToken:{
        
        trialCooldown:30,trialRate:0.5,
        statsToAddTo:['markTokens'],
        u:128*0/2048,v:128*8/2048,
        tokenLife:8,
        
        func:function(params){
            
            if(player.fieldIn===params.field){
                
                objects.marks.push(new Mark(params.field,(Math.random()*fieldInfo[params.field].width)|0,(Math.random()*fieldInfo[params.field].length)|0,'preciseMark',params.bee.level))
                
            }
        }
    },
    
    pollenMark:{
        
        u:0,v:0,
        svg:document.getElementById('pollenMark'),
        cooldown:document.getElementById('pollenMark_cooldown'),
        amount:document.getElementById('pollenMark_amount'),
        maxCooldown:0,
        tokenLife:4,
        maxAmount:3,
        
        update:(amount,player)=>{
            
            let a=amount*0.5+1
            player.whitePollen*=a
            player.redPollen*=a
            player.bluePollen*=a
        },
        
        getMessage:(amount)=>{
            
            return 'Pollen Mark\nx'+(amount*0.5+1)+' pollen'
        }
    },
    
    honeyMark:{
        
        u:0,v:0,
        svg:document.getElementById('honeyMark'),
        cooldown:document.getElementById('honeyMark_cooldown'),
        amount:document.getElementById('honeyMark_amount'),
        maxCooldown:0,
        tokenLife:4,
        maxAmount:3,
        
        update:(amount,player)=>{
            
            if(TIME-honeyMarkConvert>1){
                
                honeyMarkConvert=TIME
                
                let a=Math.min(Math.round(player.convertTotal*amount*0.5),player.pollen)
                player.pollen-=a
                player.honey+=a
                if(player.setting_enablePollenText)
                    textRenderer.add(a,[player.body.position.x,player.body.position.y+2,player.body.position.z],COLORS.honey,0,'+')
            }
        },
        
        getMessage:(amount)=>{
            
            return 'Honey Mark\nConverts '+Math.round(player.convertTotal*amount*0.15)+' pollen/sec.'
        }
    },
    
    preciseMark:{
        
        u:0,v:0,
        svg:document.getElementById('preciseMark'),
        cooldown:document.getElementById('preciseMark_cooldown'),
        amount:document.getElementById('preciseMark_amount'),
        maxCooldown:0,
        tokenLife:4,
        maxAmount:3,
        
        update:(amount,player)=>{
            
            player.criticalChance+=amount*0.07
            player.superCritChance+=amount*0.07
        },
        
        getMessage:(amount)=>{
            
            return 'Precise Mark\n+'+amount*7+'% critical chance\n+'+amount*7+'% super-crit chance'
        }
    },
    
    inferno:{
        
        trialCooldown:20,trialRate:0.5,
        statsToAddTo:['redAbilityTokens','battleTokens'],
        u:0,v:256/2048,
        tokenLife:4,
        sound:function(){window.playSound('infernoToken',0.4)},
        
        func:function(params){
            
            if(player.fieldIn===params.field){
                
                if(params.x>=0&&params.x<fieldInfo[params.field].width&&params.z-1>=0&&params.z-1<fieldInfo[params.field].length){
                    
                    objects.flames.push(new Flame(params.field,params.x,params.z-1))
                }
                
                if(params.x>=0&&params.x<fieldInfo[params.field].width&&params.z+1>=0&&params.z+1<fieldInfo[params.field].length){
                    
                    objects.flames.push(new Flame(params.field,params.x,params.z+1))
                }
                
                if(params.x-1>=0&&params.x-1<fieldInfo[params.field].width&&params.z>=0&&params.z<fieldInfo[params.field].length){
                    
                    objects.flames.push(new Flame(params.field,params.x-1,params.z))
                }
                
                if(params.x+1>=0&&params.x+1<fieldInfo[params.field].width&&params.z>=0&&params.z<fieldInfo[params.field].length){
                    
                    objects.flames.push(new Flame(params.field,params.x+1,params.z))
                }
                
                objects.tempBees.push(new TempBee([fieldInfo[params.field].x+params.x,fieldInfo[params.field].y+0.5,fieldInfo[params.field].z+params.z],'fire',Math.max(params.bee.level-2,1),15+params.bee.level,params.bee.gifted))
                
                objects.tempBees.push(new TempBee([fieldInfo[params.field].x+params.x,fieldInfo[params.field].y+0.5,fieldInfo[params.field].z+params.z],'fire',Math.max(params.bee.level-2,1),15+params.bee.level,params.bee.gifted))
                
                objects.explosions.push(new Explosion({col:[1,0.5,0],pos:[fieldInfo[params.field].x+params.x,fieldInfo[params.field].y+0.5,fieldInfo[params.field].z+params.z],life:0.5,size:5,speed:0.25,aftershock:0.005}))
            }
        },
        backupFunc:function(params){
            
            objects.tempBees.push(new TempBee(params.pos,'fire',Math.max(params.bee.level-2,1),15+params.bee.level,params.bee.gifted))
            
            objects.flames.push(new Flame(params.pos[0]-1,params.pos[1],params.pos[2],true))
            objects.flames.push(new Flame(params.pos[0]+1,params.pos[1],params.pos[2],true))
            objects.flames.push(new Flame(params.pos[0],params.pos[1],params.pos[2]+1,true))
            objects.flames.push(new Flame(params.pos[0],params.pos[1],params.pos[2]-1,true))
        }
    },
    
    flameFuel:{
        
        trialCooldown:30,trialRate:0.3,
        u:128/2048,v:256/2048,
        svg:document.getElementById('flameFuel'),
        cooldown:document.getElementById('flameFuel_cooldown'),
        amount:document.getElementById('flameFuel_amount'),
        maxCooldown:15,
        maxAmount:1,
        tokenLife:4,
        sound:function(){window.playSound('flameFuelToken',0.4)},
        
        update:(amount,player)=>{
            
            player.flameFuel=true
        },
        
        getMessage:(amount)=>{
            
            return 'Flame Fuel\nx1.5 flame life'
        }
    },
    
    markSurge:{
        
        trialCooldown:25,trialRate:0.25,
        u:256/2048,v:256/2048,
        tokenLife:4,
        
        func:function(){
            
            for(let i in objects.marks){
                
                objects.marks[i].surge((i/objects.marks.length)*0.5)
            }
            
        },
    },
    
    triangulate:{
        
        trialCooldown:20,trialRate:0.25,
        u:128*7/2048,v:256*2/2048,
        tokenLife:4,
        
        func:function(params){
            
            if(player.fieldIn===params.field){
                
                params.bee.startTriangulate([fieldInfo[params.field].x+params.x,fieldInfo[params.field].y+0.75,fieldInfo[params.field].z+params.z])
                objects.triangulates.push(new Triangulate(params.bee,[fieldInfo[params.field].x+params.x,fieldInfo[params.field].y+0.75,fieldInfo[params.field].z+params.z]))
            }
            
            player.addEffect('bombCombo')
        }
    },
    
    pollenHaze:{
        
        trialCooldown:150,trialRate:1,
        u:0,v:256*2.5/2048,
        tokenLife:8,
        
        func:function(params){
            
            if(player.fieldIn===params.field){
                
                if(!fieldInfo[params.field].haze.start){
                    
                    objects.explosions.push(new Explosion({col:[1,1,0],pos:[(fieldInfo[params.field].width-1)*0.5+fieldInfo[params.field].x,fieldInfo[params.field].y+0.75,(fieldInfo[params.field].length-1)*0.5+fieldInfo[params.field].z],life:30,size:(fieldInfo[params.field].width+fieldInfo[params.field].length)*0.5*1.5,speed:0.1,aftershock:0,maxAlpha:0.15,backface:true,primitive:'cylinder_explosions',height:8/((fieldInfo[params.field].width+fieldInfo[params.field].length)*0.5*1.5)}))
                    
                }
                
                fieldInfo[params.field].haze={start:TIME,delay:TIME}
            }
        }
    },
    
    fuzzBomb:{
        
        trialCooldown:25,trialRate:0.5,
        u:128/2048,v:256*2.5/2048,
        tokenLife:4,
        
        func:function(params){
            
            if(player.fieldIn===params.field){
                
                for(let i=0;i<2+((params.bee.level*0.2)|0);i++){
                    
                    objects.fuzzBombs.push(new FuzzBomb(params.field,params.bee.level))
                }
            }
        }
    },
    
    precision:{
        
        u:128*5/2048,v:256*2/2048,
        svg:document.getElementById('precision'),
        cooldown:document.getElementById('precision_cooldown'),
        amount:document.getElementById('precision_amount'),
        maxCooldown:60,
        tokenLife:4,
        maxAmount:10,
        
        update:(amount,player)=>{
            
            player.superCritChance+=amount*0.02
        },
        
        getMessage:(amount)=>{
            
            return 'Precision\n+'+amount*2+'% super-crit chance'
        }
    },
    
    summonFrog:{
        
        trialCooldown:35,trialRate:0.25,
        statsToAddTo:['blueAbilityTokens','battleTokens'],
        u:128*3/2048,v:256/2048,
        tokenLife:4,
        
        func:function(params){
            
            if(params.field===player.fieldIn){
                
                objects.mobs.push(new Frog(params.field,params.x,params.z,params.bee))
            }
            
            window.playSound('frog',0.3)
        }
    },
    
    inflateBalloons:{
        
        trialCooldown:30,trialRate:0.25,
        statsToAddTo:['blueAbilityTokens'],
        u:128*4/2048,v:256/2048,
        tokenLife:4,
        
        func:function(params){
            
            if(params.field===player.fieldIn){
                
                for(let i in objects.balloons){
                    
                    let b=objects.balloons[i]
                    
                    if(b.state==='float'&&b.inflateCounter>0){
                        
                        b.inflateCounter--
                        
                        b.pollen+=b.cap*(0.01+params.bee.level*0.001)
                        objects.explosions.push(new ReverseExplosion({col:b.golden?[0.9,0.9,0]:[0,0,0.8],pos:b.pos,life:0.75,size:b.displaySize+1,alpha:0.9,height:1,primitive:'explosions',transformHeight:true}))
                        
                    }
                }
                
                objects.balloons.push(new Balloon(params.field,params.x,params.z,params.bee.gifted&&Math.random()<0.1+params.bee.level*0.01,params.bee.level-1))
            }
            
            window.playSound('inflateBalloons',1)
        }
    },
    
    surpriseParty:{
        
        trialCooldown:150,trialRate:0.05,
        statsToAddTo:['blueAbilityTokens'],
        u:128*5/2048,v:256/2048,
        tokenLife:4,
        
        func:function(params){
            
            if(params.field===player.fieldIn){
                
                for(let i=objects.balloons.length;i--;){
                    
                    let b=objects.balloons[i]
                    
                    let type=['focus','melody','haste','whiteBomb','link','blueBomb','whiteBomb_','blueBomb_','whiteBoost','blueBoost']
                    
                    type=type[(Math.random()*type.length)|0]
                    
                    objects.tokens.push(new Token(effects[type].tokenLife,[b.pos[0],Math.round(params.bee.pos)+0.5,b.pos[2]],type,{field:b.field,x:b.x,z:b.z,bee:params.bee}))
                }
                
                objects.balloons.push(new Balloon(params.field,params.x,params.z,true,params.bee.level))
                
            }
            
            window.playSound('surpriseParty',0.8)
        }
    },
    
    balloonAura:{
        
        u:0,v:0,
        svg:document.getElementById('balloonAura'),
        cooldown:document.getElementById('balloonAura_cooldown'),
        amount:document.getElementById('balloonAura_amount'),
        maxCooldown:0,
        tokenLife:4,
        maxAmount:10,
        
        update:(amount,player)=>{
            
            let a=amount*0.02+1
            player.bluePollen*=a
            player.redPollen*=a
            player.whitePollen*=a
            player.honeyFromTokens*=a
        },
        
        getMessage:(amount)=>{
            
            return 'Balloon Aura\nx'+(amount*0.02+1)+' pollen\nx'+(amount*0.02+1)+' honey from tokens'
        }
    },
    
    balloonBlessing:{
        
        u:0,v:0,
        svg:document.getElementById('balloonBlessing'),
        cooldown:document.getElementById('balloonBlessing_cooldown'),
        amount:document.getElementById('balloonBlessing_amount'),
        maxCooldown:60*60,
        tokenLife:4,
        maxAmount:10000,
        
        update:(amount,player)=>{
            
            player.capacity*=amount*0.0125+1
            player.honeyAtHive*=amount*0.006+1
        },
        
        getMessage:(amount)=>{
            
            return 'Balloon Blessing\nx'+(amount*0.0125+1).toFixed(2)+' capacity\nx'+(amount*0.006+1).toFixed(3)+' honey at hive'
        }
    },
    
    gummyBlob:{
        
        trialCooldown:10,trialRate:0.6,
        statsToAddTo:['gummyBeeTokens'],
        u:128*6/2048,v:256/2048,
        tokenLife:8,
        
        func:function(params){
            
            player.stats.gummyBeeTokens++
            if(params.field===player.fieldIn){
                
                let r=params.bee.gifted?4:2,f=function(f){f.goo=1;f.height=1}
                
                for(let x=-r;x<=r;x++){
                    
                    let _x=x+params.x
                    
                    for(let z=-r;z<=r;z++){
                        
                        let _z=z+params.z
                        
                        if(Math.abs(_x-params.x)+Math.abs(_z-params.z)<=r&&_x>=0&&_x<fieldInfo[params.field].width&&_z>=0&&_z<fieldInfo[params.field].length){
                            
                            updateFlower(params.field,_x,_z,f,true,true,false)
                        }
                    }
                }
                
                objects.explosions.push(new Explosion({col:[1,0.2,1],pos:[fieldInfo[params.field].x+params.x,fieldInfo[params.field].y+0.5,fieldInfo[params.field].z+params.z],life:0.75,size:r,speed:0.5,aftershock:0.005,height:0.3}))
            }
        }
    },
    
    gummyBarrage:{
        
        trialCooldown:15,trialRate:0.6,
        statsToAddTo:['gummyBeeTokens'],
        u:128*7/2048,v:256/2048,
        tokenLife:8,
        
        func:function(params){
            
            player.stats.gummyBeeTokens++
            if(params.field===player.fieldIn){
                
                for(let i=0,l=MATH.random(2,5)|0;i<l;i++){
                    
                    let r=MATH.random(2,5)|0,f=function(f){f.goo=1;f.height=1},ox=(Math.random()*fieldInfo[params.field].width)|0,oz=(Math.random()*fieldInfo[params.field].length)|0
                    
                    for(let x=-r;x<=r;x++){
                        
                        let _x=x+ox
                        
                        for(let z=-r;z<=r;z++){
                            
                            let _z=z+oz
                            
                            if(Math.abs(_x-ox)+Math.abs(_z-oz)<=r&&_x>=0&&_x<fieldInfo[params.field].width&&_z>=0&&_z<fieldInfo[params.field].length){
                                
                                updateFlower(params.field,_x,_z,f,true,true,false)
                            }
                        }
                    }
                    
                    objects.explosions.push(new Explosion({col:[1,0.2,1],pos:[fieldInfo[params.field].x+ox,fieldInfo[params.field].y+0.5,fieldInfo[params.field].z+oz],life:0.75,size:r*1.5,speed:0.5,aftershock:0.005,height:0.3}))
                    
                }
            }
        }
    },
    
    targetPractice:{
        
        trialCooldown:22.5,trialRate:0.25,
        statsToAddTo:['redAbilityTokens','battleTokens'],
        u:128*4/2048,v:256*2/2048,
        tokenLife:8,
        
        func:function(params){
            
            if(params.field===player.fieldIn&&player.fieldIn&&!player.attacked.length){
                
                params.bee.startTargetPractice()
                
            } else {
                
                player.addEffect('precision')
                player.addEffect('focus')
                player.stats.focusTokens++
                player.addEffect('redBoost')
                player.stats.redBoostTokens++
            }
        }
    },
    
    glueBuff:{
        
        u:0,v:0,
        svg:document.getElementById('glueBuff'),
        cooldown:document.getElementById('glueBuff_cooldown'),
        amount:document.getElementById('glueBuff_amount'),
        maxCooldown:10*60,
        maxAmount:1,
        tokenLife:4,
        
        update:(amount,player)=>{
            
            player.pollenFromTools*=1.25
            player.pollenFromBees*=1.25
        },
        
        getMessage:(amount)=>{
            
            return 'Glue\nx1.25 pollen from bees\nx1.25 pollen from tools'
        }
    },
    
    oilBuff:{
        
        u:0,v:0,
        svg:document.getElementById('oilBuff'),
        cooldown:document.getElementById('oilBuff_cooldown'),
        amount:document.getElementById('oilBuff_amount'),
        maxCooldown:10*60,
        maxAmount:1,
        tokenLife:4,
        
        update:(amount,player)=>{
            
            player.walkSpeed*=1.2
            player.beeSpeed*=1.2
        },
        
        getMessage:(amount)=>{
            
            return 'Oil\nx1.2 player and bee movespeed'
        }
    },
    
    enzymesBuff:{
        
        u:0,v:0,
        svg:document.getElementById('enzymesBuff'),
        cooldown:document.getElementById('enzymesBuff_cooldown'),
        amount:document.getElementById('enzymesBuff_amount'),
        maxCooldown:10*60,
        maxAmount:1,
        tokenLife:4,
        
        update:(amount,player)=>{
            
            player.convertRate*=1.5
            player.instantRedConversion+=0.1
            player.instantWhiteConversion+=0.1
            player.instantBlueConversion+=0.1
        },
        
        getMessage:(amount)=>{
            
            return 'Enzymes\nx1.5 convert rate\n+10% instant conversion'
        }
    },
    
    redExtractBuff:{
        
        u:0,v:0,
        svg:document.getElementById('redExtractBuff'),
        cooldown:document.getElementById('redExtractBuff_cooldown'),
        amount:document.getElementById('redExtractBuff_amount'),
        maxCooldown:10*60,
        maxAmount:1,
        tokenLife:4,
        
        update:(amount,player)=>{
            
            player.redPollen*=1.25
        },
        
        getMessage:(amount)=>{
            
            return 'Red Extract\nx1.25 red pollen'
        }
    },
    
    blueExtractBuff:{
        
        u:0,v:0,
        svg:document.getElementById('blueExtractBuff'),
        cooldown:document.getElementById('blueExtractBuff_cooldown'),
        amount:document.getElementById('blueExtractBuff_amount'),
        maxCooldown:10*60,
        maxAmount:1,
        tokenLife:4,
        
        update:(amount,player)=>{
            
            player.bluePollen*=1.25
        },
        
        getMessage:(amount)=>{
            
            return 'Blue Extract\nx1.25 blue pollen'
        }
    },
    
    tropicalDrinkBuff:{
        
        u:0,v:0,
        svg:document.getElementById('tropicalDrinkBuff'),
        cooldown:document.getElementById('tropicalDrinkBuff_cooldown'),
        amount:document.getElementById('tropicalDrinkBuff_amount'),
        maxCooldown:10*60,
        maxAmount:1,
        tokenLife:4,
        
        update:(amount,player)=>{
            
            player.whitePollen*=1.25
            player.criticalChance+=0.05
        },
        
        getMessage:(amount)=>{
            
            return 'Tropical Drink\nx1.25 white pollen\n+5% critical chance'
        }
    },
    
    purplePotionBuff:{
        
        u:0,v:0,
        svg:document.getElementById('purplePotionBuff'),
        cooldown:document.getElementById('purplePotionBuff_cooldown'),
        amount:document.getElementById('purplePotionBuff_amount'),
        maxCooldown:10*60,
        maxAmount:1,
        tokenLife:4,
        
        update:(amount,player)=>{
            
            player.capacity*=1.25
            player.redPollen*=1.5
            player.bluePollen*=1.5
            player.pollenFromTools*=1.3
            player.pollenFromBees*=1.3
        },
        
        getMessage:(amount)=>{
            
            return 'Purple Potion\nx1.25 capacity\nx1.5 pollen\nx1.3 pollen from tools\nx1.3 pollen from bees'
        }
    },
    
    superSmoothieBuff:{
        
        u:0,v:0,
        svg:document.getElementById('superSmoothieBuff'),
        cooldown:document.getElementById('superSmoothieBuff_cooldown'),
        amount:document.getElementById('superSmoothieBuff_amount'),
        maxCooldown:20*60,
        maxAmount:1,
        tokenLife:4,
        
        update:(amount,player)=>{
            
            player.capacity*=1.5
            player.whitePollen*=1.6
            player.redPollen*=1.6
            player.bluePollen*=1.6
            player.pollenFromBees*=1.4
            player.pollenFromTools*=1.4
            player.convertRate*=2
            player.honeyAtHive*=1.1
            player.instantRedConversion+=0.12
            player.instantWhiteConversion+=0.12
            player.instantBlueConversion+=0.12
            player.walkspeed*=1.25
            player.beeSpeed*=1.25
            player.criticalChance+=0.07
            player.superCritChance+=0.01
        },
        
        getMessage:(amount)=>{
            
            return 'Super Smoothie\nx1.5 capacity\nx1.6 pollen\nx1.4 pollen from bees\nx1.4 pollen from tools\nx2 convert rate\nx1.1 honey at hive\n+12% instant conversion\n+7% critical chance\nx1.25 walkspeed\nx1.25 bee movespeed\n+1% super-crit chance'
        }
    },
    
    stingerBuff:{
        
        u:0,v:0,
        svg:document.getElementById('stingerBuff'),
        cooldown:document.getElementById('stingerBuff_cooldown'),
        amount:document.getElementById('stingerBuff_amount'),
        maxCooldown:45,
        maxAmount:1,
        tokenLife:4,
        
        update:(amount,player)=>{
            
            player.beeAttack*=1.5
        },
        
        getMessage:(amount)=>{
            
            return 'Stinger\nx1.5 bee attack'
        }
    },
    
    popStarAura:{
        
        svg:document.getElementById('popStarAura'),
        cooldown:document.getElementById('popStarAura_cooldown'),
        amount:document.getElementById('popStarAura_amount'),
        maxCooldown:55,
        maxAmount:1,
        
        update:(amount,player)=>{
            
            player.bluePollen*=Math.min(player.popStarSize*0.0125+1,5)
            player.instantBlueConversion+=0.15
            player.bubblePollen*=1.25
            player.capacity*=1.5
        },
        
        getMessage:(amount)=>{
            
            return 'Pop Star Aura\nx'+Math.min(player.popStarSize*0.0125+1,6)+' blue pollen\n+10% instant blue conversion\nx1.25 bubble pollen\nx1.5 capacity'
        }
    },
    
    scorchingStarAura:{
        
        svg:document.getElementById('scorchingStarAura'),
        cooldown:document.getElementById('scorchingStarAura_cooldown'),
        amount:document.getElementById('scorchingStarAura_amount'),
        maxCooldown:55,
        maxAmount:1,
        
        update:(amount,player)=>{
            
            player.redPollen*=Math.min(player.scorchingStarSize*0.00045+1,7)
            player.convertRate*=Math.min(player.scorchingStarSize*0.0004+1,4)
            player.flamePollen*=2
            player.beeAttack*=Math.min(player.scorchingStarSize*0.0003+1,3)
            player.instantRedConversion+=0.10
        },
        
        getMessage:(amount)=>{
            
            return 'Scorching Star Aura\nx'+Math.min(player.scorchingStarSize*0.00045+1,7).toFixed(2)+' red pollen\nx'+Math.min(player.scorchingStarSize*0.0004+1,4).toFixed(2)+' convert rate\nx2 flame pollen\nx'+Math.min(player.scorchingStarSize*0.0003+1,3).toFixed(2)+' bee attack\n+10% instant red conversion'
        }
    },
    
    gummyStarAura:{
        
        svg:document.getElementById('gummyStarAura'),
        cooldown:document.getElementById('gummyStarAura_cooldown'),
        amount:document.getElementById('gummyStarAura_amount'),
        maxCooldown:55,
        maxAmount:1,
        
        update:(amount,player)=>{
            
            player.goo*=Math.min(player.gummyStarSize*0.00000000055+1,4)
            player.whitePollen*=1.1
            player.whiteFieldCapacity*=2
            player.instantGooConversion+=0.25
        },
        
        getMessage:(amount)=>{
            
            return 'Gummy Star Aura\nx'+Math.min(player.gummyStarSize*0.00000000055+1,4).toFixed(3)+' goo\n+25% instant goo conversion\nx2 white field capacity\nx1.25 white pollen'
        }
    },
    
    bubbleBloat:{
        
        u:128*5/2048,v:128/2048,
        svg:document.getElementById('bubbleBloat'),
        cooldown:document.getElementById('bubbleBloat_cooldown'),
        amount:document.getElementById('bubbleBloat_amount'),
        maxCooldown:60*60,
        tokenLife:4,
        amountFromCooldown:true,
        
        update:(amount,player)=>{
            
            player.convertRate*=(amount*5+1).toFixed(2)
            player.blueFieldCapacity*=(amount*3+1).toFixed(2)
            player.bubblePollen*=(amount*0.5+1).toFixed(2)
        },
        
        getMessage:(amount)=>{
            
            return 'Bubble Bloat\nx'+(amount*5+1).toFixed(2)+' convert rate\nx'+(amount*3+1).toFixed(2)+' blue field capacity\nx'+(amount*0.5+1).toFixed(2)+' bubble pollen'
        }
    },
    
    gummyBall:{
        
        u:128*5/2048,v:128/2048,
        svg:document.getElementById('gummyBall'),
        cooldown:document.getElementById('gummyBall_cooldown'),
        amount:document.getElementById('gummyBall_amount'),
        maxCooldown:180,
        tokenLife:4,
        amountFromCooldown:true,
        
        update:(amount,player)=>{
            
            player.gummyBallSize*=amount*1.5+1
            player.whitePollen*=amount*0.1+1
            
            if(amount>=0.99||user.keys[' ']&&player.grounded&&amount>=0.3){
                if(player.fieldIn){
                    
                    player.addEffect('gummyBall',-amount)
                    objects.mobs.push(new GummyBall())
                }
            }
        },
        
        getMessage:(amount)=>{
            
            return 'Gummyball\nx'+(amount*1.5+1).toFixed(2)+' gummyball size\nx'+(amount*0.2+1).toFixed(2)+' white pollen'
        }
    },
    
    gummyBallCombo:{
        
        u:0,v:0,
        svg:document.getElementById('gummyBallCombo'),
        cooldown:document.getElementById('gummyBallCombo_cooldown'),
        amount:document.getElementById('gummyBallCombo_amount'),
        maxCooldown:10,
        maxAmount:1000,
        tokenLife:4,
        
        update:(amount,player)=>{
            
            player.goo*=MATH.lerp(1,3,amount*0.001)
            player.whitePollen*=1.1
        },
        
        getMessage:(amount)=>{
            
            return 'Gummyball Combo\nx'+MATH.lerp(1,3,amount*0.001).toFixed(2)+' goo\nx1.1 white pollen'
        }
    },
    
    guidingStarAura:{
        
        u:0,v:0,
        svg:document.getElementById('guidingStarAura'),
        cooldown:document.getElementById('guidingStarAura_cooldown'),
        amount:document.getElementById('guidingStarAura_amount'),
        maxCooldown:0,
        tokenLife:4,
        maxAmount:1,
        
        update:(amount,player)=>{
            
            player.whitePollen*=2
            player.redPollen*=2
            player.bluePollen*=2
            player.capacity*=2
        },
        
        getMessage:(amount)=>{
            
            return 'Guiding Star Aura\nx2 pollen\nx2 capacity'
        }
    },
    
    popStarPassive:{
        
        isPassive:true,
        svg:document.getElementById('popStarPassive'),
        cooldown:document.getElementById('popStarPassive_cooldown'),
        amount:document.getElementById('popStarPassive_amount'),
        maxCooldown:60,
        triggerVal:30,
        triggerType:'blueBombTokens',
        currentVal:0,
        currentCooldown:0,
        startVal:0,
        
        activate(){
            
            objects.mobs.push(new PopStar())
            window.playSound('popStar',1)
            window.setTimeout(function(){window.playSound('popStar',1)},15250)
            window.setTimeout(function(){window.playSound('popStar',1)},15250*2)
        },
        
        getMessage:(amount)=>{
            
            return "Pop Star\nEvery 30 blue bomb tokens summons a Pop Star, lasting for 45s, and applies 1m of bubble bloat. It grows for every bubble popped, granting x1.5 capacity, x1.25 bubble pollen, 10% instant blue conversion, and up to x5 blue pollen. Upon summoning, it also applies 30s of Bubble Bloat. Popping a bubble while the star is active gives 1s(2s if golden) of Bubble Bloat, up to 1h. Bubble Bloat gives up to x6 convert rate, x6 blue field capacity, and x1.5 bubble pollen. When the Pop Star disappears, it spawns 1 bubble for every 10 of the star's size, with an extra 5. The star's aura lasts for an extra 10 secs after it disappears. Cooldown: 1m"
        }
    },
    
    scorchingStarPassive:{
        
        isPassive:true,
        svg:document.getElementById('scorchingStarPassive'),
        cooldown:document.getElementById('scorchingStarPassive_cooldown'),
        amount:document.getElementById('scorchingStarPassive_amount'),
        maxCooldown:60,
        triggerVal:15,
        triggerType:'redBoostTokens',
        currentVal:0,
        currentCooldown:0,
        startVal:0,
        
        activate(){
            
            objects.mobs.push(new ScorchingStar())
            window.playSound('scorchingStar',1)
            window.setTimeout(function(){window.playSound('scorchingStar',1)},15250)
            window.setTimeout(function(){window.playSound('scorchingStar',1)},15250*2)
        },
        
        getMessage:(amount)=>{
            
            return "Scorching Star\nEvery 15 red boost tokens summons a Scorching Star, lasting for 45s. It grows by 75(100 if dark) every second for every flame nearby. It grants up to x7 red pollen, x4 convert rate, x2 flame pollen, and +10% instant red conversion. The star's aura lasts for an extra 10 secs after it disappears. Cooldown: 1m"
        }
    },
    
    gummyStarPassive:{
        
        isPassive:true,
        svg:document.getElementById('gummyStarPassive'),
        cooldown:document.getElementById('gummyStarPassive_cooldown'),
        amount:document.getElementById('gummyStarPassive_amount'),
        maxCooldown:60,
        triggerVal:15,
        triggerType:'gummyBeeTokens',
        currentVal:0,
        currentCooldown:0,
        startVal:0,
        
        activate(){
            
            objects.mobs.push(new GummyStar())
            window.playSound('gummyStar',1)
            window.setTimeout(function(){window.playSound('gummyStar',1)},15250)
            window.setTimeout(function(){window.playSound('gummyStar',1)},15250*2)
        },
        
        getMessage:(amount)=>{
            
            return "Gummy Star\nEvery 15 gummy bee tokens summons a Gummy Star, lasting for 45s. It grows based on how much goo you collect, and gives up to x4 goo, while always giving x1.25 white pollen, x2 white field capacity and 25% instant goo conversion. After disappearing, it spreads 20(+the amount of digits in the star's size) honey tokens, with a total value of approximately 1,000(+7.5% of the star's size). The star's aura lasts for an extra 10 secs after it disappears.  Cooldown: 1m"
        }
    },
    
    guidingStarPassive:{
        
        isPassive:true,
        svg:document.getElementById('guidingStarPassive'),
        cooldown:document.getElementById('guidingStarPassive_cooldown'),
        amount:document.getElementById('guidingStarPassive_amount'),
        maxCooldown:60*5,
        triggerVal:250,
        triggerType:'boostTokens',
        currentVal:0,
        currentCooldown:0,
        startVal:0,
        
        activate(){
            
            let f=[]
            
            for(let i in fieldInfo){
                
                f.push(i)
            }
            
            for(let i in objects.mobs){
                
                let o=objects.mobs[i]
                
                if(o.guidingstarinstance){
                    
                    if(f.indexOf(o.field)>-1){
                        
                        f.splice(f.indexOf(o.field),1)
                    }
                }
            }
            
            if(f.length){
                
                f=f[(Math.random()*f.length)|0]
                objects.mobs.push(new GuidingStar(f))
                player.addMessage('⭐Guiding Star on '+MATH.doGrammar(f)+'!⭐')
            }
            
        },
        
        getMessage:(amount)=>{
            
            return "Guiding Star\nEvery 250th boost token summons a guiding star over a random field, granting x2.5 capacity and pollen for 10m. Cooldown: 5m"
        }
    },
    
    tidePower:{
        
        u:0,v:0,
        svg:document.getElementById('tidePower'),
        cooldown:document.getElementById('tidePower_cooldown'),
        amount:document.getElementById('tidePower_amount'),
        maxCooldown:20,
        maxAmount:500,
        
        update:(amount,player)=>{
            
            player.collectorSpeed*=amount*0.00175+1
            player.tidePower*=amount*0.0025+1
            
            if(amount>=500){
                
                player.addEffect('tidalSurge',1)
                player.addEffect('tidePower',false,false,0)
                player.addEffect('tideBlessing',25/(4*60*60))
            }
        },
        
        getMessage:(amount)=>{
            
            return 'Tide Power\nx'+(amount*0.00175+1).toFixed(3)+' collector speed\nx'+(amount*0.0025+1).toFixed(3)+' wave size'
        }
    },
    
    tidalSurge:{
        
        u:128*5/2048,v:128/2048,
        svg:document.getElementById('tidalSurge'),
        cooldown:document.getElementById('tidalSurge_cooldown'),
        amount:document.getElementById('tidalSurge_amount'),
        maxCooldown:10,
        tokenLife:4,
        amountFromCooldown:true,
        
        update:(amount,player)=>{
            
            player.collectorSpeed=3
            player.tidalSurge=true
            player.addEffect('tidePower',false,false,0)
        },
        
        getMessage:(amount)=>{
            
            return 'Tidal Surge\nx5 collector speed'
        }
    },
    
    tideBlessing:{
        
        u:128*5/2048,v:128/2048,
        svg:document.getElementById('tideBlessing'),
        cooldown:document.getElementById('tideBlessing_cooldown'),
        amount:document.getElementById('tideBlessing_amount'),
        maxCooldown:4*60*60,
        tokenLife:4,
        amountFromCooldown:true,
        
        update:(amount,player)=>{
            
            player.bluePollen*=amount*0.15+1
            player.honeyFromTokens*=amount*0.15+1
            player.convertRate*=amount*0.15+1
            player.pollenFromTools*=amount*0.15+1
            player.pollenFromBees*=amount*0.15+1
        },
        
        getMessage:(amount)=>{
            
            return 'Tidal Blessing\nx'+(amount*0.15+1).toFixed(2)+' blue pollen\nx'+(amount*0.15+1).toFixed(2)+' convert rate\nx'+(amount*0.15+1).toFixed(2)+' honey from tokens\nx'+(amount*0.15+1).toFixed(2)+' pollen from tools\nx'+(amount*0.15+1).toFixed(2)+' pollen from bees'
        }
    },
    
    coconutShield:{
        
        u:128*6/2048,v:256*2/2048,
        svg:document.getElementById('coconutShield'),
        cooldown:document.getElementById('coconutShield_cooldown'),
        amount:document.getElementById('coconutShield_amount'),
        maxCooldown:10,
        maxAmount:1,
        
        update:(amount,player)=>{
            
            player.beeAttack*=1.5
            player.defense=1
            
            meshes.explosions.instanceData.push(player.body.position.x+player.body.velocity.x*dt,player.body.position.y+player.body.velocity.y*dt,player.body.position.z+player.body.velocity.z*dt,0.1,0.05,0,Math.sin(TIME*10)*0.1+0.5,2,1)
        },
        
        getMessage:(amount)=>{
            
            return 'Coconut Shield\n+100% defense\nx1.5 bee attack'
        }
    },
    
    gummyMorph:{
        
        u:128*6/2048,v:256*2/2048,
        svg:document.getElementById('gummyMorph'),
        cooldown:document.getElementById('gummyMorph_cooldown'),
        amount:document.getElementById('gummyMorph_amount'),
        maxCooldown:10,
        maxAmount:1,
        
        update:(amount,player)=>{
            
            player.goo*=1.75
            player.instantGooConversion=1
            player.walkSpeed*=1.1
            player.jumpPower*=1.2
        },
        
        getMessage:(amount)=>{
            
            return 'Gummy Morph\nx1.75 goo\n+100% instant conversion\nx1.1 walkspeed\nx1.2 jump power'
        }
    },
    
    focusPulserPassive:{
        
        isPassive:true,
        svg:document.getElementById('focusPulserPassive'),
        cooldown:document.getElementById('focusPulserPassive_cooldown'),
        amount:document.getElementById('focusPulserPassive_amount'),
        maxCooldown:20,
        triggerVal:25,
        triggerType:'focusTokens',
        currentVal:0,
        currentCooldown:0,
        startVal:0,
        
        activate(){
            
            objects.mobs.push(new Pulse('red'))
        },
        
        getMessage:(amount)=>{
            
            return 'Focus Pulser\nEvery 25 focus tokens collected activates a red pulse, hopping to every red bee twice, collecting pollen. Pollen collection increases with each hop. Cooldown: 20s'
        }
    },
    
    hastePulserPassive:{
        
        isPassive:true,
        svg:document.getElementById('hastePulserPassive'),
        cooldown:document.getElementById('hastePulserPassive_cooldown'),
        amount:document.getElementById('hastePulserPassive_amount'),
        maxCooldown:20,
        triggerVal:25,
        triggerType:'hasteTokens',
        currentVal:0,
        currentCooldown:0,
        startVal:0,
        
        activate(){
            
            objects.mobs.push(new Pulse('blue'))
        },
        
        getMessage:(amount)=>{
            
            return 'Haste Pulser\nEvery 25 haste tokens collected activates a blue pulse, hopping to every blue bee twice, collecting pollen. Pollen collection increases with each hop. Cooldown: 20s'
        }
    },
    
    inspireCoconutsPassive:{
        
        isPassive:true,
        svg:document.getElementById('inspireCoconutsPassive'),
        cooldown:document.getElementById('inspireCoconutsPassive_cooldown'),
        amount:document.getElementById('inspireCoconutsPassive_amount'),
        maxCooldown:0.5,
        triggerVal:5,
        triggerType:'linkTokens',
        currentVal:0,
        currentCooldown:0,
        startVal:0,
        
        activate(){
            
            if(player.fieldIn){
                
                for(let i=0;i<5;i++){
                    
                    objects.mobs.push(new Coconut((Math.random()*fieldInfo[player.fieldIn].width)|0,(Math.random()*fieldInfo[player.fieldIn].length)|0,i*0.4))
                }
            }
        },
        
        getMessage:(amount)=>{
            
            return 'Inspire Coconuts\nEvery 5 inspire tokens collected summons 5 falling coconuts which collect pollen when the land. Standing under the coconut instantly converts the player\'s convert total into honey tokens.'
        }
    },
    
    emergencyCoconutShieldPassive:{
        
        isPassive:true,
        svg:document.getElementById('emergencyCoconutShieldPassive'),
        cooldown:document.getElementById('emergencyCoconutShieldPassive_cooldown'),
        amount:document.getElementById('emergencyCoconutShieldPassive_amount'),
        maxCooldown:60,
        triggerVal:1,
        triggerType:'coconutShield',
        currentVal:0,
        currentCooldown:0,
        startVal:0,
        
        activate(){
            
            if(player.fieldIn){
                
                for(let i=0;i<5;i++){
                    
                    objects.mobs.push(new Coconut((Math.random()*fieldInfo[player.fieldIn].width)|0,(Math.random()*fieldInfo[player.fieldIn].length)|0,i*0.4))
                }
            }
            
            player.addEffect('coconutShield')
        },
        
        getMessage:(amount)=>{
            
            return 'Emergency Coconut Shield\nTaking damage from a monster will activate a shield, granting 100% defense, x1.5 bee attack and will drop 5 falling coconuts if in a field. Cooldown: 1m'
        }
    },
    
    xFlamePassive:{
        
        isPassive:true,
        svg:document.getElementById('xFlamePassive'),
        cooldown:document.getElementById('xFlamePassive_cooldown'),
        amount:document.getElementById('xFlamePassive_amount'),
        maxCooldown:25,
        triggerVal:20,
        triggerType:'battleTokens',
        currentVal:0,
        currentCooldown:0,
        startVal:0,
        
        activate(){
            
            let dirs=[[-1,1],[1,-1],[-1,-1],[1,1]]
            
            if(player.fieldIn&&!player.attacked.length){
                
                objects.flames.push(new Flame(player.fieldIn,player.flowerIn.x,player.flowerIn.z))
                
                for(let j in dirs){
                    
                    for(let i=1;i<8;i++){
                        
                        let x=dirs[j][0]*i+player.flowerIn.x,z=dirs[j][1]*i+player.flowerIn.z
                        
                        if(x>=0&&x<fieldInfo[player.fieldIn].width&&z>=0&&z<fieldInfo[player.fieldIn].length)
                            objects.flames.push(new Flame(player.fieldIn,x,z))
                    }
                }
                
            } else {
                
                objects.flames.push(new Flame(player.body.position.x,player.body.position.y,player.body.position.z,true))
                
                for(let j in dirs){
                    
                    for(let i=1;i<8;i++){
                        
                        let x=dirs[j][0]*i,z=dirs[j][1]*i
                        
                        objects.flames.push(new Flame(player.body.position.x+x,player.body.position.y,player.body.position.z+z,true))
                    }
                }
            }
        },
        
        getMessage:(amount)=>{
            
            return 'X Flame\nEvery 20 battle tokens collected summons 29 flames in an X shape, lasting for 3 secs. Each flame collects 6R/3W/1B pollen from nearby flowers and deals 15 damage to nearby enemies every sec. Cooldown: 15s'
        }
    },
    
    ignitePassive:{
        
        isPassive:true,
        svg:document.getElementById('ignitePassive'),
        cooldown:document.getElementById('ignitePassive_cooldown'),
        amount:document.getElementById('ignitePassive_amount'),
        maxCooldown:0.5,
        triggerVal:10,
        triggerType:'redAbilityTokens',
        currentVal:0,
        currentCooldown:0,
        startVal:0,
        
        activate(){
            
            let dirs=[[-1,0],[0,-1],[0,1],[1,0]]
            
            if(player.fieldIn&&!player.attacked.length){
                
                objects.flames.push(new Flame(player.fieldIn,player.flowerIn.x,player.flowerIn.z))
                
                for(let j in dirs){
                    
                    for(let i=1;i<2;i++){
                        
                        let x=dirs[j][0]*i+player.flowerIn.x,z=dirs[j][1]*i+player.flowerIn.z
                        
                        if(x>=0&&x<fieldInfo[player.fieldIn].width&&z>=0&&z<fieldInfo[player.fieldIn].length)
                            objects.flames.push(new Flame(player.fieldIn,x,z))
                    }
                }
                
            } else {
                
                objects.flames.push(new Flame(player.body.position.x,player.body.position.y,player.body.position.z,true))
                
                for(let j in dirs){
                    
                    for(let i=1;i<2;i++){
                        
                        let x=dirs[j][0]*i,z=dirs[j][1]*i
                        
                        objects.flames.push(new Flame(player.body.position.x+x,player.body.position.y,player.body.position.z+z,true))
                    }
                }
            }
        },
        
        getMessage:(amount)=>{
            
            return 'Ignite\nEvery 10 red ability tokens collected summons 5 flames in a + shape, lasting for 3 secs. Each flame collects 9R/5W/2B pollen from nearby flowers and deals 15 damage to nearby enemies every sec.'
        }
    },
    
    bubbleBombsPassive:{
        
        isPassive:true,
        svg:document.getElementById('bubbleBombsPassive'),
        cooldown:document.getElementById('bubbleBombsPassive_cooldown'),
        amount:document.getElementById('bubbleBombsPassive_amount'),
        maxCooldown:0.5,
        triggerVal:10,
        triggerType:'bombTokens',
        currentVal:0,
        currentCooldown:0,
        startVal:0,
        
        activate(){
            
            if(player.fieldIn){
                
                for(let i=0;i<3;i++){
                    
                    objects.bubbles.push(new Bubble(player.fieldIn,(Math.random()*fieldInfo[player.fieldIn].width)|0,(Math.random()*fieldInfo[player.fieldIn].length)|0))
                    
                }
            }
        },
        
        getMessage:(amount)=>{
            
            return 'Bubble Bombs\nEvery 10 blue bomb tokens collected summons 3 bubbles around the field, lasting for 10 secs. Each bubble collects 2R/6W/10B pollen from nearby flowers and replenish them when popped.'
        }
    },
    
    coinScatterPassive:{
        
        isPassive:true,
        svg:document.getElementById('coinScatterPassive'),
        cooldown:document.getElementById('coinScatterPassive_cooldown'),
        amount:document.getElementById('coinScatterPassive_amount'),
        maxCooldown:45,
        triggerVal:20,
        triggerType:'markTokens',
        currentVal:0,
        currentCooldown:0,
        startVal:0,
        
        activate(){
            
            if(player.fieldIn){
                
                let amc=Math.min(Math.ceil(player.convertTotal*3),player.pollen)
                
                if(amc<=0){return}
                
                player.pollen-=amc
                
                let amountPerToken=Math.ceil(amc/24)
                
                for(let i=0;i<24;i++){
                    
                    objects.tokens.push(new LootToken(30,[fieldInfo[player.fieldIn].x+((Math.random()*fieldInfo[player.fieldIn].width)|0),fieldInfo[player.fieldIn].y+1,fieldInfo[player.fieldIn].z+((Math.random()*fieldInfo[player.fieldIn].length)|0)],'honey',amountPerToken,false,'Coin Scatter'))
                    
                }
            }
        },
        
        getMessage:(amount)=>{
            
            return "Coin Scatter\nConverts 300% of the player's convert total into 24 honey tokens, which are scattered randomly in the field. Cooldown: 45s"
        }
    },
    
    diamondDrainPassive:{
        
        isPassive:true,
        svg:document.getElementById('diamondDrainPassive'),
        cooldown:document.getElementById('diamondDrainPassive_cooldown'),
        amount:document.getElementById('diamondDrainPassive_amount'),
        maxCooldown:35,
        triggerVal:35,
        triggerType:'blueAbilityTokens',
        currentVal:0,
        currentCooldown:0,
        startVal:0,
        
        activate(){
            
            if(player.fieldIn){
                
                objects.mobs.push(new DrainingDiamond())
                
                for(let i=0;i<15;i++){
                    
                    updateFlower(player.fieldIn,(Math.random()*fieldInfo[player.fieldIn].width)|0,(Math.random()*fieldInfo[player.fieldIn].length)|0,function(f){
                        
                        if(f.level<5){
                            
                            f.level++
                            f.pollinationTimer=1
                            
                        } else {
                            
                            f.height=1
                        }
                        
                        for(let j=0;j<6;j++){
                            
                            ParticleRenderer.add({x:f.x+fieldInfo[player.fieldIn].x,y:fieldInfo[player.fieldIn].y+0.5,z:f.z+fieldInfo[player.fieldIn].z,vx:MATH.random(-1,1),vy:Math.random()*2,vz:MATH.random(-1,1),grav:-3,size:100,col:[1,1,MATH.random(0.6,1)],life:2.5,rotVel:MATH.random(-3,3),alpha:2})
                        }
                        
                    },true,false,true)
                }
            }
        },
        
        getMessage:(amount)=>{
            
            return "Diamond Drain\nEvery 35th blue ability token summons a diamond that converts the sqrt of (convert rate x blue pollen) x capacity x 0.05. Honey converted is multiplied by 2x, and the diamond pollinates 15 flowers in the field. Cooldown: 35s"
        }
    },
    
    gummyMorphPassive:{
        
        isPassive:true,
        svg:document.getElementById('gummyMorphPassive'),
        cooldown:document.getElementById('gummyMorphPassive_cooldown'),
        amount:document.getElementById('gummyMorphPassive_amount'),
        maxCooldown:25,
        triggerVal:20,
        triggerType:'gummyBeeTokens',
        currentVal:0,
        currentCooldown:0,
        startVal:0,
        
        activate(){
            
            player.addEffect('gummyMorph')
            
            if(player.fieldIn){
                
                let func=function(f){f.goo=1;f.height=1}
                
                for(let i in flowers[player.fieldIn]){
                    
                    for(let j in flowers[player.fieldIn][i]){
                        
                        updateFlower(player.fieldIn,j,i,func,true,true,false)
                    }
                }
            }
        },
        
        getMessage:(amount)=>{
            
            return "Gummy Morph\nEvery 10 gummy bee tokens covers the field in goo and grants x1.75 goo, 100% instant goo conversion, +30 walkspeed and +3 jump power for 10s. Cooldown: 25s"
        }
    },
    
    redPulse:{
        
        trialCooldown:25,trialRate:0.6,
        statsToAddTo:['redAbilityTokens'],
        u:128*1/2048,v:128*6/2048,
        tokenLife:12,
        
        func:function(params){
            
            objects.mobs.push(new Pulse('red'))
            
            if(player.ownsCobaltBee){
                
                objects.mobs.push(new Pulse('blue'))
            }
        },
    },
    
    bluePulse:{
        
        trialCooldown:25,trialRate:0.6,
        statsToAddTo:['blueAbilityTokens'],
        u:128*2/2048,v:128*6/2048,
        tokenLife:12,
        
        func:function(params){
            
            objects.mobs.push(new Pulse('blue'))
            
            if(player.ownsCrimsonBee){
                
                objects.mobs.push(new Pulse('red'))
            }
        },
    },
    
    redBombSync:{
        
        trialCooldown:35,trialRate:0.7,
        statsToAddTo:['redAbilityTokens','redBombTokens'],
        u:128*3/2048,v:128*6/2048,
        svg:document.getElementById('redBombSync'),
        cooldown:document.getElementById('redBombSync_cooldown'),
        amount:document.getElementById('redBombSync_amount'),
        maxCooldown:25,
        maxAmount:1,
        tokenLife:24,
        
        update:(amount,player)=>{
            
            player.redBombSync=true
        },
        
        getMessage:(amount)=>{
            
            return 'Red Bomb Sync\nAllows red bombs to collect from white flowers. If blue bomb sync is active, applies to blue flowers aswell.'
        }
    },
    
    blueBombSync:{
        
        trialCooldown:35,trialRate:0.7,
        statsToAddTo:['blueAbilityTokens','blueBombTokens'],
        u:128*4/2048,v:128*6/2048,
        svg:document.getElementById('blueBombSync'),
        cooldown:document.getElementById('blueBombSync_cooldown'),
        amount:document.getElementById('blueBombSync_amount'),
        maxCooldown:25,
        maxAmount:1,
        tokenLife:24,
        
        update:(amount,player)=>{
            
            player.blueBombSync=true
        },
        
        getMessage:(amount)=>{
            
            return 'Blue Bomb Sync\nAllows blue bombs to collect from white flowers. If red bomb sync is active, applies to red flowers aswell.'
        }
    },
    
    beamStorm:{
        
        trialCooldown:30,trialRate:0.4,
        statsToAddTo:[],
        u:128*5/2048,v:128*6/2048,
        tokenLife:12,
        
        func:function(params){
            
            if(player.fieldIn){
                
                player.beamStormRayData=[]
                
                for(let i=0;i<25+params.bee.level*2;i++){
                    
                    objects.mobs.push(new Beam(params,i*0.075,player.fieldIn))
                }
            }
        },
    },
    
    rainCloud:{
        
        trialCooldown:60,trialRate:0.5,
        statsToAddTo:[],
        u:128*6/2048,v:128*6/2048,
        tokenLife:24,
        
        func:function(params){
            
            player.addEffect('whiteBoost')
            
            let f=Math.random()<0.25&&player.fieldIn?player.fieldIn:0
                
            if(!f){
                
                f=[]
                
                for(let i in fieldInfo){
                    
                    f.push(i)
                }
                
                f=f[(Math.random()*f.length)|0]
            }
            
            objects.mobs.push(new Cloud(f,(Math.random()*fieldInfo[f].width)|0,(Math.random()*fieldInfo[f].length)|0,60+params.bee.level*5))
            
            player.addMessage('☁️Your windy bee made a cloud in the '+MATH.doGrammar(f)+'!☁️')
            
        },
    },
    
    tornado:{
        
        trialCooldown:75,trialRate:0.5,
        statsToAddTo:[],
        u:128*7/2048,v:128*6/2048,
        tokenLife:24,
        
        func:function(params){
            
            player.addEffect('whiteBoost')
            
            if(player.fieldIn){
                
                objects.mobs.push(new Tornado(params.bee.level))
            }
        },
    },
    
    cloudBoost:{
        
        u:128*5/2048,v:128/2048,
        svg:document.getElementById('cloudBoost'),
        cooldown:document.getElementById('cloudBoost_cooldown'),
        amount:document.getElementById('cloudBoost_amount'),
        maxCooldown:7.5,
        tokenLife:4,
        amountFromCooldown:true,
        
        update:(amount,player)=>{
            
            player.redPollen*=player.cloudBoostAmount
            player.bluePollen*=player.cloudBoostAmount
            player.whitePollen*=player.cloudBoostAmount
        },
        
        getMessage:(amount)=>{
            
            return 'Cloud Boost\nx'+player.cloudBoostAmount+'  pollen'+(player.cloudBoostAmount>1.25?'(you have gifted windy bee, so x1.5, not x1.25)':'')
        }
    },
    
    scratch:{
        
        trialCooldown:35,trialRate:0.333,
        statsToAddTo:[],
        u:128*4/2048,v:128*7/2048,
        tokenLife:12,
        
        func:function(params){
            
            if(player.fieldIn){
                
                objects.mobs.push(new Scratch(params.bee,params.x,params.z))
            }
        },
    },
    
    tabbyLove:{
        
        trialCooldown:90,trialRate:1,
        statsToAddTo:[],
        u:128*5/2048,v:128*7/2048,
        svg:document.getElementById('tabbyLove'),
        cooldown:document.getElementById('tabbyLove_cooldown'),
        amount:document.getElementById('tabbyLove_amount'),
        maxCooldown:Infinity,
        maxAmount:1000,
        tokenLife:16,
        
        update:(amount,player)=>{
            
            player.tabbyLoveStacks=amount*0.01+1
        },
        
        getMessage:(amount)=>{
            
            return 'Tabby Love\nx'+player.tabbyLoveStacks+' Tabby Bee convert rate\nx'+player.tabbyLoveStacks+' Tabby Bee gather amount\nx'+player.tabbyLoveStacks+' pollen from "Scratch"'
        }
    },
}

let LIST_OF_STATS_FOR_PLAYER=[]

for(let i in effects){
    
    if(effects[i].statsToAddTo){
        
        for(let j in effects[i].statsToAddTo){
            
            if(LIST_OF_STATS_FOR_PLAYER.indexOf(effects[i].statsToAddTo[j])<0){
                
                LIST_OF_STATS_FOR_PLAYER.push(effects[i].statsToAddTo[j])
                
            }
        }
    }
    
    if(!effects[i].svg){continue}
    
    effects[i].svg.addEventListener('mousemove',function(e){
        
        hoverText.style.display='block'
        hoverText.style.left=e.x+10+'px'
        hoverText.style.top=e.y+10+'px'
        hoverText.style.bottom=''
        hoverText.style.right=''
        
        let index
        
        for(let j in player.effects){
            
            if(player.effects[j].type===i){
                
                index=j
                break
            }
        }
        
        let m=effects[i].getMessage(player.effects[index].amount),_i=m.indexOf('\n')
        
        if(!effects[i].amountFromCooldown&&player.effects[index].amount!==1)
            m=m.substr(0,_i)+' (x'+player.effects[index].amount+')'+m.substr(_i,m.length)
        
        hoverText.innerText=m+'\n'+(effects[i].isPassive||effects[i].maxCooldown===0||effects[i].maxCooldown===Infinity?'':MATH.doTime((player.effects[index].cooldown|0).toString()))
        
    })
    
    effects[i].svg.addEventListener('mouseleave',function(){
        
        hoverText.style.display='none'
    })
}

let toolParticle=0

let tools={
    
    shovel:{
        
        collectPattern:[[0,0],[0,-1]],
        collectAmount:2,
        cooldown:0.8,
        mesh:function(box){
            
            box(-0.3,0,0.6,0.1,0.1,0.8,false,[0.5,0.2,0])
            box(-0.3,0,1.2,0.3,0.1,0.4,false,[0.2,0.2,0.2])
        }
    },
    
    petalWand:{
        
        collectPattern:[[0,0],[0,-1],[0,-2],[0,-3],[0,-4],[0,-5],[0,-6],[-1,-3],[-1,-4],[-1,-5],[1,-3],[1,-4],[1,-5],[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[-1,3],[-1,4],[-1,5],[1,3],[1,4],[1,5],[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[3,1],[4,1],[5,1],[3,-1],[4,-1],[5,-1],[-1,0],[-2,0],[-3,0],[-4,0],[-5,0],[-6,0],[-3,1],[-4,1],[-5,1],[-3,-1],[-4,-1],[-5,-1]],
        collectAmount:5,
        cooldown:0.7,
        mesh:function(box){
            
            box(-0.3-0.1,0.6,0.3+0.1,0.15,1.5,0.15,false,[0,0.7,0])
            box(-0.3-0.1,1.45,0.3+0.1,0.3,0.3,0.3,[45,0,45],[1.5,1.2,0])
            for(let i=0;i<MATH.TWO_PI;i+=MATH.TWO_PI/3){
                
                box(-0.3+Math.sin(i)*0.5-0.1,1.35,0.3+0.1+Math.cos(i)*0.5,0.7,0.1,0.7,[Math.sin(i)*-30,0,Math.cos(i)*-30],[1.2,1.2,1.2])
                
            }
            
            for(let i=MATH.QUATER_PI;i<MATH.TWO_PI+MATH.QUATER_PI;i+=MATH.TWO_PI/3){
                
                box(-0.3+Math.sin(i)*0.5-0.1,1.35,0.3+0.1+Math.cos(i)*0.5,0.7,0.1,0.7,[Math.sin(i)*30,0,Math.cos(i)*30],[1.2,1.2,1.2])
                
            }
            
            for(let i=0;i<MATH.TWO_PI;i+=MATH.TWO_PI/3){
                
                box(-0.3-0.1+Math.sin(i)*0.5,1.2,0.3+0.1+Math.cos(i)*0.5,0.7,0.1,0.7,[60,i*MATH.TO_DEG,0],[1.2,1.2,1.2])
                box(-0.3-0.1+Math.sin(i)*0.25,1.2,0.3+0.1+Math.cos(i)*0.25,0.7,0.1,0.7,[-60,i*MATH.TO_DEG,0],[1.2,1.2,1.2])
                
            }
        },
        ability:function(){
            
            if(player.toolUses%3===0){
                
                objects.mobs.push(new PetalShuriken([player.body.position.x,player.body.position.y+0.25,player.body.position.z],player.bodyDir.slice()))
            }
        },
        particles:function(){
            
            toolParticle-=dt
            
            if(toolParticle>0){return}
            
            toolParticle=0.3
            
            let x=-player.bodyDir[2],z=player.bodyDir[0],r=0.325
            
            x+=player.bodyDir[0]
            z+=player.bodyDir[2]
            
            x*=r
            z*=r
            
            ParticleRenderer.add({x:player.body.position.x+x,y:player.body.position.y+1.65,z:player.body.position.z+z,vx:MATH.random(-0.9,0.9),vy:Math.random()*0.5+0.2,vz:MATH.random(-0.9,0.9),grav:-1.5,size:MATH.random(20,50),col:[0.9,0.7,0.3],life:0.7,rotVel:MATH.random(-3,3),alpha:0.35})
        }
    },
    
    darkScythe:{
        
        collectPattern:[[0,-3],[0,-4],[1,-5],[1,-4],[1,-3],[2,-5],[2,-4],[2,-3],[3,-3],[3,-5],[4,-1],[-1,-3],[-1,-4],[-2,-3],[-3,-3],[0,-5],[-1,-5],[-2,-4],[-4,-2],[3,-4],[4,-4],[2,-2],[3,-2],[-2,-2],[-3,-2],[-4,-1]],
        collectAmount:13,
        cooldown:0.575,
        mesh:function(box){
            
            box(-0.55,0.75,0.55,0.15,2.2,0.15,[0,0,0],[0.1,0,0],[0,0,30])
            box(-0.55,1.6,1.1,0.15,0.6,1.2,[0,0,0],[0.1,0,0],[0,0,30])
            box(-0.55,1.5,2,0.15,0.5,1,[20,0,0],[0.1,0,0],[0,0,30])
            box(-0.55,1.2,2.6,0.15,0.35,1,[40,0,0],[0.1,0,0],[0,0,30])
            
            box(-0.55,1.3,1.1,0.175,0.6*0.3,1.2,[0,0,0],[1.2,0,0.4],[0,0,30])
            box(-0.55,1.2,2,0.175,0.5*0.3,1,[20,0,0],[1.2,0,0.4],[0,0,30])
            box(-0.55,0.9,2.6,0.175,0.3*0.5,0.5,[40,0,0],[1.2,0,0.4],[0,0,30])
            
            box(-0.55,1.95,0.1,0.15,0.15,1.3,[20,0,0],[0.1,0,0],[0,0,30])
            box(-0.55,1.25,0.1,0.15,0.15,0.9,[-20,0,0],[0.1,0,0],[0,0,30])
            
        },
        ability:function(arr){
            
            // if(!player.fieldIn){return}
            
            objects.mobs.push(new DarkScoopingTrail())
            
            if(player.fieldIn&&!player.attacked.length){
                
                let x=Math.round(player.body.position.x-fieldInfo[player.fieldIn].x),z=Math.round(player.body.position.z-fieldInfo[player.fieldIn].z),a=[]
                
                for(let i in arr){
                    
                    let _x=arr[i][0]+x,_z=arr[i][1]+z
                    
                    if(_x>=0&&_x<fieldInfo[player.fieldIn].width&&_x>=0&&_z<fieldInfo[player.fieldIn].length){
                        
                        a.push([_x,_z])
                    }
                }
                
                for(let i in objects.flames){
                    
                    let f=objects.flames[i]
                    
                    if(MATH.indexOfArrays(a,[f.x,f.z])>-1){
                        
                        f.turnDark()
                    }
                }
                
            } else {
                
                for(let i in objects.flames){
                    
                    let f=objects.flames[i]
                    
                    if(f.isStatic&&vec3.sqrDist(f.pos,[player.body.position.x+player.bodyDir[0]*2,player.body.position.y,player.body.position.z+player.bodyDir[2]*2])<7){
                        
                        f.turnDark()
                    }
                }
            }
        },
        particles:function(){
            
            toolParticle-=dt
            
            if(toolParticle>0){return}
            
            toolParticle=0.05
            
            let x=player.bodyDir[0],y=1.5,z=player.bodyDir[2]*0
            
            x+=-player.bodyDir[2]*1.2
            z+=player.bodyDir[0]*1.2
            
            let r=Math.random()*2.5
            
            x+=player.bodyDir[0]*r
            y-=r*0.25
            z+=player.bodyDir[2]*r
            
            ParticleRenderer.add({x:player.body.position.x+x,y:player.body.position.y+y,z:player.body.position.z+z,vx:-player.bodyDir[2]*2,vy:1.75,vz:player.bodyDir[0]*2,grav:0,size:MATH.random(70,120),col:[1,0,Math.random()],life:1,rotVel:MATH.random(-3,3),alpha:4.5})
        }
    },
    
    tidePopper:{
        
        collectPattern:[[0,0],[-1,0],[1,0],[-2,0],[2,0],[-1,-1],[0,-1],[1,-1],[-1,-2],[0,-2],[1,-2],[-1,-3],[0,-3],[1,-3],[-1,-4],[0,-4],[1,-4],[-1,-5],[0,-5],[1,-5],[0,-6],[0,-7],[0,-8]],
        collectAmount:13,
        cooldown:1,
        mesh:function(box,unusedcuznotrelevant,cylinder,sphere,finalRotation){
            
            cylinder(-0.4,2.2,0.4,0.25,0.05,15,1,3,7,90,0,0,0.25)
            cylinder(-0.4,1.6,0.4,0.3,0.05,15,1,3,7,90,0,0,0.3)
            cylinder(-0.4,1.1,0.4,0.4,0.05,15,1,3,7,90,0,0,0.4)
            cylinder(-0.4,1.7,0.4,0.3,2.25,10,0.3,1,2,90,0,0,0)
            box(-0.4,0.5,0.4,0.15,1.4,0.15,false,[0.1,0.8,1.8])
            sphere(-0.4-0.8,0.85,0.4,0.25,1,100,100,100)
            sphere(-0.4+0.8,0.85,0.4,0.25,1,100,100,100)
            sphere(-0.4,0.85,0.4-0.8,0.25,1,100,100,100)
            sphere(-0.4,0.85,0.4+0.8,0.25,1,100,100,100)
            finalRotation(20,-20,0)
            
        },
        ability:function(){
            
            if(player.toolUses%3===0){
                
                objects.mobs.push(new Wave([player.body.position.x,player.body.position.y+0.25,player.body.position.z],player.bodyDir.slice()))
            }
        },
        particles:function(){
            
            toolParticle-=dt
            
            if(toolParticle>0){return}
            
            toolParticle=0.1
            
            let x=-player.bodyDir[2],z=player.bodyDir[0],r=MATH.random(0.2,0.9)
            
            x+=player.bodyDir[0]
            z+=player.bodyDir[2]
            
            x*=r
            z*=r
            
            ParticleRenderer.add({x:player.body.position.x+x,y:player.body.position.y+MATH.random(0.1,2.5),z:player.body.position.z+z,vx:x,vy:1.6,vz:z,grav:0,size:MATH.random(20,50),col:[0.1,0.7,1],life:0.7,rotVel:MATH.random(-3,3),alpha:0.5})
            
            
        }
    },
    
    gummyBaller:{
        
        collectPattern:[[-3,-3],[-2,-5],[-2,-4],[-2,-3],[-2,-2],[-2,-1],[-1,-5],[-1,-4],[-1,-3],[-1,-2],[-1,-1],[0,-6],[0,-5],[0,-4],[0,-3],[0,-2],[0,-1],[0,0],[1,-5],[1,-4],[1,-3],[1,-2],[1,-1],[2,-5],[2,-4],[2,-3],[2,-2],[2,-1],[3,-3]],
        collectAmount:16,
        cooldown:1,
        mesh:function(box,unusedcuznotrelevant,cylinder,sphere,finalRotation){
            
            cylinder(-0.4,-0.1,0.4,0.15,0.35,15,0.26,2.7,1.1,90,0,0,0.15)
            cylinder(-0.4,0.8,0.4,0.1,1.75,15,1.5,0.15,1.5,90,0,0,0.1)
            sphere(-0.4,1.6,0.4,0.5,1,0.26,2.7,1.1)
            cylinder(-0.4,1.75,0.4,0.45,0.25,15,1.5,0.15,1.5,90,0,0,0.6)
            sphere(-0.4-0.3,1.85,0.4,0.25,1,0.26,2.7,1.1)
            sphere(-0.4+0.3,1.85,0.4,0.25,1,0.26,2.7,1.1)
            sphere(-0.4,1.85,0.4-0.3,0.25,1,1.5*1.75,0.65*1.75,1.5*1.75)
            sphere(-0.4,1.85,0.4+0.3,0.25,1,1.5*1.75,0.65*1.75,1.5*1.75)
            
        },
        ability:function(){
            
        },
        particles:function(){
            
            let x=(-player.bodyDir[2]+player.bodyDir[0])*0.4,z=(player.bodyDir[0]+player.bodyDir[2])*0.4
            
            player.lagPos[0]+=(player.body.position.x-player.lagPos[0])*dt*12.5
            player.lagPos[1]+=(player.body.position.y-player.lagPos[1])*dt*12.5
            player.lagPos[2]+=(player.body.position.z-player.lagPos[2])*dt*12.5
            
            meshes.explosions.instanceData.push(player.lagPos[0]+x,player.lagPos[1]+2+player.gummyBallSize*0.3,player.lagPos[2]+z,0.9*player.isNight,0.18*player.isNight,0.9*player.isNight,1,player.gummyBallSize*0.5,1)
            
            toolParticle-=dt
            
            if(toolParticle>0){return}
            
            toolParticle=0.4/player.gummyBallSize
            
            ParticleRenderer.add({x:player.lagPos[0]+x,y:player.lagPos[1]+2+player.gummyBallSize*0.3,z:player.lagPos[2]+z,vx:MATH.random(-player.gummyBallSize,player.gummyBallSize),vy:MATH.random(-player.gummyBallSize,player.gummyBallSize),vz:MATH.random(-player.gummyBallSize,player.gummyBallSize),grav:0,size:MATH.random(20,50)*player.gummyBallSize,col:[0.1,0.8,1],life:0.75,rotVel:MATH.random(-3,3),alpha:player.gummyBallSize-0.5})
            
        }
    },
}

let howManyToFeed=document.getElementById('howManyToFeed'),howManyMessage=document.getElementById('howManyMessage'),feedAmount=document.getElementById('feedAmount')

let items={
    
    gumdrops:{
        
        amount:0,u:128/2048,v:128*7/2048,
        use:function(){
            
            if(player.fieldIn){
                
                items.gumdrops.amount--
                
                for(let i=0,l=MATH.random(2,5)|0;i<l;i++){
                    
                    let r=MATH.random(2,5)|0,f=function(f){f.goo=1;f.height=1},ox=(Math.random()*fieldInfo[player.fieldIn].width)|0,oz=(Math.random()*fieldInfo[player.fieldIn].length)|0
                    
                    for(let x=-r;x<=r;x++){
                        
                        let _x=x+ox
                        
                        for(let z=-r;z<=r;z++){
                            
                            let _z=z+oz
                            
                            if(Math.abs(_x-ox)+Math.abs(_z-oz)<=r&&_x>=0&&_x<fieldInfo[player.fieldIn].width&&_z>=0&&_z<fieldInfo[player.fieldIn].length){
                                
                                updateFlower(player.fieldIn,_x,_z,f,true,true,false)
                            }
                        }
                    }
                    
                    objects.explosions.push(new Explosion({col:[1,0.2,1],pos:[fieldInfo[player.fieldIn].x+ox,fieldInfo[player.fieldIn].y+0.5,fieldInfo[player.fieldIn].z+oz],life:0.75,size:r*1.5,speed:0.5,aftershock:0.005,height:0.3}))
                    
                }
            }
        }
    },
    
    coconut:{
        
        amount:0,u:128*2/2048,v:128*7/2048,
        use:function(){
            
            if(player.fieldIn){
                
                items.coconut.amount--
                
                objects.mobs.push(new Coconut((Math.random()*fieldInfo[player.fieldIn].width)|0,(Math.random()*fieldInfo[player.fieldIn].length)|0,0))
                
            }
        }
    },
    
    stinger:{
        
        amount:0,u:128*3/2048,v:128*7/2048,
        use:function(){
            
            items.stinger.amount--
            player.addEffect('stingerBuff')
        }
    },
    
    glue:{
        
        amount:0,u:0,v:128*3/2048,
        use:function(){
            
            items.glue.amount--
            player.addEffect('glueBuff')
        }
    },
    
    oil:{
        
        amount:0,u:128/2048,v:128*3/2048,
        use:function(){
            
            items.oil.amount--
            player.addEffect('oilBuff')
        }
    },
    
    enzymes:{
        
        amount:0,u:128*2/2048,v:128*3/2048,
        use:function(){
            
            items.enzymes.amount--
            player.addEffect('enzymesBuff')
        }
    },
    
    redExtract:{
        
        amount:0,u:128*3/2048,v:128*3/2048,
        use:function(){
            
            items.redExtract.amount--
            player.addEffect('redExtractBuff')
        }
    },
    
    blueExtract:{
        
        amount:0,u:128*4/2048,v:128*3/2048,
        use:function(){
            
            items.blueExtract.amount--
            player.addEffect('blueExtractBuff')
        }
    },
    
    tropicalDrink:{
        
        amount:0,u:128*5/2048,v:128*3/2048,
        use:function(){
            
            items.tropicalDrink.amount--
            player.addEffect('tropicalDrinkBuff')
        }
    },
    
    purplePotion:{
        
        amount:0,u:128*6/2048,v:128*3/2048,
        use:function(){
            
            items.purplePotion.amount--
            player.addEffect('purplePotionBuff')
        }
    },
    
    superSmoothie:{
        
        amount:0,u:128*7/2048,v:128*3/2048,
        use:function(){
            
            items.superSmoothie.amount--
            player.addEffect('superSmoothieBuff')
        }
    },
    
    bitterberry:{
        
        canUseOnSlot:(slot)=>{
            
            return slot.type!==null
        },
        amount:0,u:128*6/2048,v:128*7/2048,
        use:function(){
            
            howManyToFeed.style.display='block'
            feedAmount.value=1
            howManyMessage.innerHTML='How many bitterberries will you feed to '+MATH.doGrammar(player.hive[player.hiveIndex[1]][player.hiveIndex[0]].bee.type)+' Bee?'
            
            howManyToFeed.onmousemove=function(){
                
                let a=feedAmount.value
                feedAmount.value=MATH.constrain(a,1,items.bitterberry.amount)
            }
            
            document.getElementById('cancelFeeding').onclick=function(){
                howManyToFeed.style.display='none'
            }
            
            document.getElementById('feedThisAmount').onclick=function(){
                howManyToFeed.style.display='none'
                
                let amount=feedAmount.value
                items.bitterberry.amount-=amount
                player.updateInventory()
                
                if(Math.random()<1-Math.pow(1-(1/(player.hive[player.hiveIndex[1]][player.hiveIndex[0]].radioactive>0?30:100)),amount)){
                    
                    player.addMessage('☢️ '+MATH.doGrammar(player.hive[player.hiveIndex[1]][player.hiveIndex[0]].bee.type)+' bee gained a mutation! ☢️',[50,225,90])
                    
                    let stat=['abilityRate','gatherAmount','convertAmount','maxEnergy','attack','gatherAmount','convertAmount','maxEnergy','attack','gatherAmount','convertAmount','maxEnergy','attack','gatherAmount','convertAmount','maxEnergy','attack','gatherAmount','convertAmount','maxEnergy','attack','gatherAmount','convertAmount','maxEnergy','attack','gatherAmount','convertAmount','maxEnergy','attack','gatherAmount','convertAmount','maxEnergy','attack'],oper,num,level=player.hive[player.hiveIndex[1]][player.hiveIndex[0]].bee.level-1
                    
                    stat=stat[(Math.random()*stat.length)|0]
                    
                    oper=stat==='attack'||stat==='convertAmount'||stat==='gatherAmount'?Math.random()<0.5?'+':'*':'*'
                    
                    switch(stat){
                        
                        case 'attack':num=oper==='+'?MATH.random(1+level*(4/20),3+level*(10/20))|0:MATH.random(1.05,1.25+level*(0.02));break
                        case 'gatherAmount':num=oper==='+'?MATH.random(4+level*(8/20),10+level*(16/20))|0:MATH.random(1.1,1.3+level*(0.04));break
                        case 'convertAmount':num=oper==='+'?MATH.random(7+level*(10/20),15+level*(20/20))|0:MATH.random(1.15,1.4+level*(0.04));break
                        case 'maxEnergy':num=MATH.random(1.2,1.5+level*(0.04));break
                        case 'abilityRate':num=MATH.random(1.05,1.15+level*(0.0175));break
                        
                    }
                    
                    num=Number(num.toFixed(2))
                    
                    player.hive[player.hiveIndex[1]][player.hiveIndex[0]].bee.mutation={stat:stat,num:num,oper:oper}
                    
                    player.addMessage('☢️ '+MATH.doGrammar(player.hive[player.hiveIndex[1]][player.hiveIndex[0]].bee.type)+' got '+oper.replace('*','x')+num+' '+MATH.doGrammar(stat.replace('max','')).toLowerCase()+'! ☢️',[50,225,90])
                    
                }
                
                player.hive[player.hiveIndex[1]][player.hiveIndex[0]].bond+=amount*100
                
                let l,r=[0,10,50,250,1000,5000,20000,80000,350000,800000,2000000,4000000,8000000,15000000,30000000,150000000,600000000,2500000000,10000000000,25000000000]
                
                for(let i in r){
                    
                    if(player.hive[player.hiveIndex[1]][player.hiveIndex[0]].bond>=r[i]){
                        
                        l=i
                    }
                }
                
                if(l<20){
                    
                    l++
                }
                
                let leveled
                
                if(player.hive[player.hiveIndex[1]][player.hiveIndex[0]].level!==l){
                    
                    leveled=true
                }
                
                player.hive[player.hiveIndex[1]][player.hiveIndex[0]].level=l
                player.hive[player.hiveIndex[1]][player.hiveIndex[0]].bee.computeLevel(l)
                textRenderer.add(amount*100+'',[player.hive[player.hiveIndex[1]][player.hiveIndex[0]].bee.pos[0],player.hive[player.hiveIndex[1]][player.hiveIndex[0]].bee.pos[1]+1,player.hive[player.hiveIndex[1]][player.hiveIndex[0]].bee.pos[2]],COLORS.bondArr,0,'+',1.2)
                
                player.addMessage(MATH.doGrammar(player.hive[player.hiveIndex[1]][player.hiveIndex[0]].bee.type)+" Bee's bond improved",COLORS.bondArr)
                player.addMessage('by '+MATH.addCommas(amount*100)+(leveled?' and advanced to level '+l+'!':'!'),COLORS.bondArr)
                player.addMessage('('+MATH.addCommas((player.hive[player.hiveIndex[1]][player.hiveIndex[0]].bond-r[player.hive[player.hiveIndex[1]][player.hiveIndex[0]].level-1])+'')+'/'+MATH.addCommas(r[player.hive[player.hiveIndex[1]][player.hiveIndex[0]].level]+'')+') to level up',COLORS.bondArr)
                
            }
        }
    },
    
    neonberry:{
        
        canUseOnSlot:(slot)=>{
            
            return slot.type!==null
        },
        amount:0,u:128*7/2048,v:128*7/2048,
        use:function(){
            
            howManyToFeed.style.display='block'
            feedAmount.value=1
            howManyMessage.innerHTML='How many neonberries will you feed to '+MATH.doGrammar(player.hive[player.hiveIndex[1]][player.hiveIndex[0]].bee.type)+' Bee?'
            
            howManyToFeed.onmousemove=function(){
                
                let a=feedAmount.value
                feedAmount.value=MATH.constrain(a,1,items.neonberry.amount)
            }
            
            document.getElementById('cancelFeeding').onclick=function(){
                howManyToFeed.style.display='none'
            }
            
            document.getElementById('feedThisAmount').onclick=function(){
                howManyToFeed.style.display='none'
                
                let amount=feedAmount.value
                items.neonberry.amount-=amount
                player.updateInventory()
                
                player.hive[player.hiveIndex[1]][player.hiveIndex[0]].radioactive=(3*60)+((amount-1)*5)
                
                player.addMessage('☢️ '+MATH.doGrammar(player.hive[player.hiveIndex[1]][player.hiveIndex[0]].bee.type)+' bee became radioactive for '+MATH.doTime(player.hive[player.hiveIndex[1]][player.hiveIndex[0]].radioactive)+' ☢️',[50,225,90])
                
                player.hive[player.hiveIndex[1]][player.hiveIndex[0]].bond+=amount*500
                
                let l,r=[0,10,50,250,1000,5000,20000,80000,350000,800000,2000000,4000000,8000000,15000000,30000000,150000000,600000000,2500000000,10000000000,25000000000]
                
                for(let i in r){
                    
                    if(player.hive[player.hiveIndex[1]][player.hiveIndex[0]].bond>=r[i]){
                        
                        l=i
                    }
                }
                
                if(l<20){
                    
                    l++
                }
                
                let leveled
                
                if(player.hive[player.hiveIndex[1]][player.hiveIndex[0]].level!==l){
                    
                    leveled=true
                }
                
                player.hive[player.hiveIndex[1]][player.hiveIndex[0]].level=l
                player.hive[player.hiveIndex[1]][player.hiveIndex[0]].bee.computeLevel(l)
                textRenderer.add(amount*500+'',[player.hive[player.hiveIndex[1]][player.hiveIndex[0]].bee.pos[0],player.hive[player.hiveIndex[1]][player.hiveIndex[0]].bee.pos[1]+1,player.hive[player.hiveIndex[1]][player.hiveIndex[0]].bee.pos[2]],COLORS.bondArr,0,'+',1.2)
                
                player.addMessage(MATH.doGrammar(player.hive[player.hiveIndex[1]][player.hiveIndex[0]].bee.type)+" Bee's bond improved",COLORS.bondArr)
                player.addMessage('by '+MATH.addCommas(amount*500)+(leveled?' and advanced to level '+l+'!':'!'),COLORS.bondArr)
                player.addMessage('('+MATH.addCommas((player.hive[player.hiveIndex[1]][player.hiveIndex[0]].bond-r[player.hive[player.hiveIndex[1]][player.hiveIndex[0]].level-1])+'')+'/'+MATH.addCommas(r[player.hive[player.hiveIndex[1]][player.hiveIndex[0]].level]+'')+') to level up',COLORS.bondArr)
                
            }
        }
    },
    
    treat:{
        
        canUseOnSlot:(slot)=>{
            
            return slot.type!==null
        },
        amount:1000,u:0,v:128*4/2048,
        use:function(){
            
            howManyToFeed.style.display='block'
            feedAmount.value=1
            howManyMessage.innerHTML='How many treats will you feed to '+MATH.doGrammar(player.hive[player.hiveIndex[1]][player.hiveIndex[0]].bee.type)+' Bee?'
            
            howManyToFeed.onmousemove=function(){
                
                let a=feedAmount.value
                feedAmount.value=MATH.constrain(a,1,items.treat.amount)
            }
            
            document.getElementById('cancelFeeding').onclick=function(){
                howManyToFeed.style.display='none'
            }
            
            document.getElementById('feedThisAmount').onclick=function(){
                howManyToFeed.style.display='none'
                
                let amount=feedAmount.value
                items.treat.amount-=amount
                player.updateInventory()
                
                player.hive[player.hiveIndex[1]][player.hiveIndex[0]].bond+=amount*10
                
                let l,r=[0,10,50,250,1000,5000,20000,80000,350000,800000,2000000,4000000,8000000,15000000,30000000,150000000,600000000,2500000000,10000000000,25000000000]
                
                for(let i in r){
                    
                    if(player.hive[player.hiveIndex[1]][player.hiveIndex[0]].bond>=r[i]){
                        
                        l=i
                    }
                }
                
                if(l<20){
                    
                    l++
                }
                
                let leveled
                
                if(player.hive[player.hiveIndex[1]][player.hiveIndex[0]].level!==l){
                    
                    leveled=true
                }
                
                player.hive[player.hiveIndex[1]][player.hiveIndex[0]].level=l
                player.hive[player.hiveIndex[1]][player.hiveIndex[0]].bee.computeLevel(l)
                textRenderer.add(amount*10+'',[player.hive[player.hiveIndex[1]][player.hiveIndex[0]].bee.pos[0],player.hive[player.hiveIndex[1]][player.hiveIndex[0]].bee.pos[1]+1,player.hive[player.hiveIndex[1]][player.hiveIndex[0]].bee.pos[2]],COLORS.bondArr,0,'+',1.2)
                
                player.addMessage(MATH.doGrammar(player.hive[player.hiveIndex[1]][player.hiveIndex[0]].bee.type)+" Bee's bond improved",COLORS.bondArr)
                player.addMessage('by '+MATH.addCommas(amount*10)+(leveled?' and advanced to level '+l+'!':'!'),COLORS.bondArr)
                player.addMessage('('+MATH.addCommas((player.hive[player.hiveIndex[1]][player.hiveIndex[0]].bond-r[player.hive[player.hiveIndex[1]][player.hiveIndex[0]].level-1])+'')+'/'+MATH.addCommas(r[player.hive[player.hiveIndex[1]][player.hiveIndex[0]].level]+'')+') to level up',COLORS.bondArr)
                
            }
        }
    },
    
    blueberry:{
        
        canUseOnSlot:(slot)=>{
            
            return slot.type!==null
        },
        amount:0,u:128/2048,v:128*4/2048,
        use:function(){
            
            howManyToFeed.style.display='block'
            feedAmount.value=1
            howManyMessage.innerHTML='How many blueberries will you feed to '+MATH.doGrammar(player.hive[player.hiveIndex[1]][player.hiveIndex[0]].bee.type)+' Bee?'
            
            document.getElementById('feedUntilGifted').style.display=beeInfo[player.hive[player.hiveIndex[1]][player.hiveIndex[0]].bee.type].favoriteTreat==='blueberry'&&!player.hive[player.hiveIndex[1]][player.hiveIndex[0]].gifted?'block':'none'
            
            howManyToFeed.onmousemove=function(){
                
                let a=feedAmount.value
                feedAmount.value=MATH.constrain(a,1,items.blueberry.amount)
            }
            
            document.getElementById('cancelFeeding').onclick=function(){
                howManyToFeed.style.display='none'
            }
            
            let feed=function(amount){
                
                howManyToFeed.style.display='none'
                
                items.blueberry.amount-=amount
                player.updateInventory()
                
                let isFavorite=beeInfo[player.hive[player.hiveIndex[1]][player.hiveIndex[0]].bee.type].favoriteTreat==='blueberry',bondToAdd=amount*25*(isFavorite?2:1)
                
                player.hive[player.hiveIndex[1]][player.hiveIndex[0]].bond+=bondToAdd
                
                let l,r=[0,10,50,250,1000,5000,20000,80000,350000,800000,2000000,4000000,8000000,15000000,30000000,150000000,600000000,2500000000,10000000000,25000000000]
                
                for(let i in r){
                    
                    if(player.hive[player.hiveIndex[1]][player.hiveIndex[0]].bond>=r[i]){
                        
                        l=i
                    }
                }
                
                if(l<20){
                    
                    l++
                }
                
                let leveled
                
                if(player.hive[player.hiveIndex[1]][player.hiveIndex[0]].level!==l){
                    
                    leveled=true
                }
                
                player.hive[player.hiveIndex[1]][player.hiveIndex[0]].level=l
                player.hive[player.hiveIndex[1]][player.hiveIndex[0]].bee.computeLevel(l)
                textRenderer.add(bondToAdd+'',[player.hive[player.hiveIndex[1]][player.hiveIndex[0]].bee.pos[0],player.hive[player.hiveIndex[1]][player.hiveIndex[0]].bee.pos[1]+1,player.hive[player.hiveIndex[1]][player.hiveIndex[0]].bee.pos[2]],COLORS.bondArr,0,'+',1.2)
                
                if(isFavorite){
                    
                    player.addMessage(MATH.doGrammar(player.hive[player.hiveIndex[1]][player.hiveIndex[0]].bee.type)+" Bee loves blueberries! ╰(*°▽°*)╯",COLORS.bondArr)
                }
                
                player.addMessage(MATH.doGrammar(player.hive[player.hiveIndex[1]][player.hiveIndex[0]].bee.type)+" Bee's bond improved",COLORS.bondArr)
                player.addMessage('by '+bondToAdd+(leveled?' and advanced to level '+l+'!':'!'),COLORS.bondArr)
                player.addMessage('('+MATH.addCommas((player.hive[player.hiveIndex[1]][player.hiveIndex[0]].bond-r[player.hive[player.hiveIndex[1]][player.hiveIndex[0]].level-1])+'')+'/'+MATH.addCommas(r[player.hive[player.hiveIndex[1]][player.hiveIndex[0]].level]+'')+') to level up',COLORS.bondArr)
                
            }
            
            document.getElementById('feedThisAmount').onclick=function(){feed(feedAmount.value)}
            
            document.getElementById('feedUntilGifted').onclick=function(){
                
                let am=MATH.simulateProbabilityTries(1/15000)
                
                if(am<items.blueberry.amount){
                    
                    player.hive[player.hiveIndex[1]][player.hiveIndex[0]].gifted=true
                    player.addMessage('After '+MATH.abvNumber(am+'')+' treats.....',COLORS.honey)
                    player.addMessage('⭐ The treat made the bee gifted! ⭐',COLORS.honey)
                    feed(am)
                    player.updateHive()
                    
                } else {
                    
                    player.addMessage('The treat failed to make the bee gifted :(',COLORS.redArr)
                    feed(items.blueberry.amount)
                }
            }
            
        }
    },
    
    strawberry:{
        
        canUseOnSlot:(slot)=>{
            
            return slot.type!==null
        },
        amount:0,u:128*2/2048,v:128*4/2048,
        use:function(){
            
            howManyToFeed.style.display='block'
            feedAmount.value=1
            howManyMessage.innerHTML='How many strawberries will you feed to '+MATH.doGrammar(player.hive[player.hiveIndex[1]][player.hiveIndex[0]].bee.type)+' Bee?'
            
            document.getElementById('feedUntilGifted').style.display=beeInfo[player.hive[player.hiveIndex[1]][player.hiveIndex[0]].bee.type].favoriteTreat==='strawberry'&&!player.hive[player.hiveIndex[1]][player.hiveIndex[0]].gifted?'block':'none'
            
            howManyToFeed.onmousemove=function(){
                
                let a=feedAmount.value
                feedAmount.value=MATH.constrain(a,1,items.strawberry.amount)
            }
            
            document.getElementById('cancelFeeding').onclick=function(){
                howManyToFeed.style.display='none'
            }
            
            let feed=function(amount){
                
                howManyToFeed.style.display='none'
                
                items.blueberry.amount-=amount
                player.updateInventory()
                
                let isFavorite=beeInfo[player.hive[player.hiveIndex[1]][player.hiveIndex[0]].bee.type].favoriteTreat==='strawberry',bondToAdd=amount*25*(isFavorite?2:1)
                
                player.hive[player.hiveIndex[1]][player.hiveIndex[0]].bond+=bondToAdd
                
                let l,r=[0,10,50,250,1000,5000,20000,80000,350000,800000,2000000,4000000,8000000,15000000,30000000,150000000,600000000,2500000000,10000000000,25000000000]
                
                for(let i in r){
                    
                    if(player.hive[player.hiveIndex[1]][player.hiveIndex[0]].bond>=r[i]){
                        
                        l=i
                    }
                }
                
                if(l<20){
                    
                    l++
                }
                
                let leveled
                
                if(player.hive[player.hiveIndex[1]][player.hiveIndex[0]].level!==l){
                    
                    leveled=true
                }
                
                player.hive[player.hiveIndex[1]][player.hiveIndex[0]].level=l
                player.hive[player.hiveIndex[1]][player.hiveIndex[0]].bee.computeLevel(l)
                textRenderer.add(bondToAdd+'',[player.hive[player.hiveIndex[1]][player.hiveIndex[0]].bee.pos[0],player.hive[player.hiveIndex[1]][player.hiveIndex[0]].bee.pos[1]+1,player.hive[player.hiveIndex[1]][player.hiveIndex[0]].bee.pos[2]],COLORS.bondArr,0,'+',1.2)
                
                if(isFavorite){
                    
                    player.addMessage(MATH.doGrammar(player.hive[player.hiveIndex[1]][player.hiveIndex[0]].bee.type)+" Bee loves strawberries! ╰(*°▽°*)╯",COLORS.bondArr)
                }
                
                player.addMessage(MATH.doGrammar(player.hive[player.hiveIndex[1]][player.hiveIndex[0]].bee.type)+" Bee's bond improved",COLORS.bondArr)
                player.addMessage('by '+bondToAdd+(leveled?' and advanced to level '+l+'!':'!'),COLORS.bondArr)
                player.addMessage('('+MATH.addCommas((player.hive[player.hiveIndex[1]][player.hiveIndex[0]].bond-r[player.hive[player.hiveIndex[1]][player.hiveIndex[0]].level-1])+'')+'/'+MATH.addCommas(r[player.hive[player.hiveIndex[1]][player.hiveIndex[0]].level]+'')+') to level up',COLORS.bondArr)
                
            }
            
            document.getElementById('feedThisAmount').onclick=function(){feed(feedAmount.value)}
            
            document.getElementById('feedUntilGifted').onclick=function(){
                
                let am=MATH.simulateProbabilityTries(1/15000)
                
                if(am<items.strawberry.amount){
                    
                    player.hive[player.hiveIndex[1]][player.hiveIndex[0]].gifted=true
                    player.addMessage('After '+MATH.abvNumber(am+'')+' treats.....',COLORS.honey)
                    player.addMessage('⭐ The treat made the bee gifted! ⭐',COLORS.honey)
                    feed(am)
                    player.updateHive()
                    
                } else {
                    
                    player.addMessage('The treat failed to make the bee gifted :(',COLORS.redArr)
                    feed(items.strawberry.amount)
                }
            }
            
        }
    },
    
    pineapple:{
        
        canUseOnSlot:(slot)=>{
            
            return slot.type!==null
        },
        amount:0,u:128*2/2048,v:128*5/2048,
        use:function(){
            
            howManyToFeed.style.display='block'
            feedAmount.value=1
            howManyMessage.innerHTML='How many pineapples will you feed to '+MATH.doGrammar(player.hive[player.hiveIndex[1]][player.hiveIndex[0]].bee.type)+' Bee?'
            
            document.getElementById('feedUntilGifted').style.display=beeInfo[player.hive[player.hiveIndex[1]][player.hiveIndex[0]].bee.type].favoriteTreat==='pineapple'&&!player.hive[player.hiveIndex[1]][player.hiveIndex[0]].gifted?'block':'none'
            
            howManyToFeed.onmousemove=function(){
                
                let a=feedAmount.value
                feedAmount.value=MATH.constrain(a,1,items.pineapple.amount)
            }
            
            document.getElementById('cancelFeeding').onclick=function(){
                howManyToFeed.style.display='none'
            }
            
            let feed=function(amount){
                
                howManyToFeed.style.display='none'
                
                items.pineapple.amount-=amount
                player.updateInventory()
                
                let isFavorite=beeInfo[player.hive[player.hiveIndex[1]][player.hiveIndex[0]].bee.type].favoriteTreat==='pineapple',bondToAdd=amount*25*(isFavorite?2:1)
                
                player.hive[player.hiveIndex[1]][player.hiveIndex[0]].bond+=bondToAdd
                
                let l,r=[0,10,50,250,1000,5000,20000,80000,350000,800000,2000000,4000000,8000000,15000000,30000000,150000000,600000000,2500000000,10000000000,25000000000]
                
                for(let i in r){
                    
                    if(player.hive[player.hiveIndex[1]][player.hiveIndex[0]].bond>=r[i]){
                        
                        l=i
                    }
                }
                
                if(l<20){
                    
                    l++
                }
                
                let leveled
                
                if(player.hive[player.hiveIndex[1]][player.hiveIndex[0]].level!==l){
                    
                    leveled=true
                }
                
                player.hive[player.hiveIndex[1]][player.hiveIndex[0]].level=l
                player.hive[player.hiveIndex[1]][player.hiveIndex[0]].bee.computeLevel(l)
                textRenderer.add(bondToAdd+'',[player.hive[player.hiveIndex[1]][player.hiveIndex[0]].bee.pos[0],player.hive[player.hiveIndex[1]][player.hiveIndex[0]].bee.pos[1]+1,player.hive[player.hiveIndex[1]][player.hiveIndex[0]].bee.pos[2]],COLORS.bondArr,0,'+',1.2)
                
                if(isFavorite){
                    
                    player.addMessage(MATH.doGrammar(player.hive[player.hiveIndex[1]][player.hiveIndex[0]].bee.type)+" Bee loves pineapple! ╰(*°▽°*)╯",COLORS.bondArr)
                }
                
                player.addMessage(MATH.doGrammar(player.hive[player.hiveIndex[1]][player.hiveIndex[0]].bee.type)+" Bee's bond improved",COLORS.bondArr)
                player.addMessage('by '+bondToAdd+(leveled?' and advanced to level '+l+'!':'!'),COLORS.bondArr)
                player.addMessage('('+MATH.addCommas((player.hive[player.hiveIndex[1]][player.hiveIndex[0]].bond-r[player.hive[player.hiveIndex[1]][player.hiveIndex[0]].level-1])+'')+'/'+MATH.addCommas(r[player.hive[player.hiveIndex[1]][player.hiveIndex[0]].level]+'')+') to level up',COLORS.bondArr)
                
            }
            
            document.getElementById('feedThisAmount').onclick=function(){feed(feedAmount.value)}
            
            document.getElementById('feedUntilGifted').onclick=function(){
                
                let am=MATH.simulateProbabilityTries(1/15000)
                
                if(am<items.pineapple.amount){
                    
                    player.hive[player.hiveIndex[1]][player.hiveIndex[0]].gifted=true
                    player.addMessage('After '+MATH.abvNumber(am+'')+' treats.....',COLORS.honey)
                    player.addMessage('⭐ The treat made the bee gifted! ⭐',COLORS.honey)
                    feed(am)
                    player.updateHive()
                    
                } else {
                    
                    player.addMessage('The treat failed to make the bee gifted :(',COLORS.redArr)
                    feed(items.pineapple.amount)
                }
            }
            
        }
    },
    
    sunflowerSeed:{
        
        canUseOnSlot:(slot)=>{
            
            return slot.type!==null
        },
        amount:0,u:128*3/2048,v:128*5/2048,
        use:function(){
            
            howManyToFeed.style.display='block'
            feedAmount.value=1
            howManyMessage.innerHTML='How many sunflower seeds will you feed to '+MATH.doGrammar(player.hive[player.hiveIndex[1]][player.hiveIndex[0]].bee.type)+' Bee?'
            
            document.getElementById('feedUntilGifted').style.display=beeInfo[player.hive[player.hiveIndex[1]][player.hiveIndex[0]].bee.type].favoriteTreat==='sunflowerSeed'&&!player.hive[player.hiveIndex[1]][player.hiveIndex[0]].gifted?'block':'none'
            
            howManyToFeed.onmousemove=function(){
                
                let a=feedAmount.value
                feedAmount.value=MATH.constrain(a,1,items.sunflowerSeed.amount)
            }
            
            document.getElementById('cancelFeeding').onclick=function(){
                howManyToFeed.style.display='none'
            }
            
            let feed=function(amount){
                
                howManyToFeed.style.display='none'
                
                items.sunflowerSeed.amount-=amount
                player.updateInventory()
                
                let isFavorite=beeInfo[player.hive[player.hiveIndex[1]][player.hiveIndex[0]].bee.type].favoriteTreat==='sunflowerSeed',bondToAdd=amount*25*(isFavorite?2:1)
                
                player.hive[player.hiveIndex[1]][player.hiveIndex[0]].bond+=bondToAdd
                
                let l,r=[0,10,50,250,1000,5000,20000,80000,350000,800000,2000000,4000000,8000000,15000000,30000000,150000000,600000000,2500000000,10000000000,25000000000]
                
                for(let i in r){
                    
                    if(player.hive[player.hiveIndex[1]][player.hiveIndex[0]].bond>=r[i]){
                        
                        l=i
                    }
                }
                
                if(l<20){
                    
                    l++
                }
                
                let leveled
                
                if(player.hive[player.hiveIndex[1]][player.hiveIndex[0]].level!==l){
                    
                    leveled=true
                }
                
                player.hive[player.hiveIndex[1]][player.hiveIndex[0]].level=l
                player.hive[player.hiveIndex[1]][player.hiveIndex[0]].bee.computeLevel(l)
                textRenderer.add(bondToAdd+'',[player.hive[player.hiveIndex[1]][player.hiveIndex[0]].bee.pos[0],player.hive[player.hiveIndex[1]][player.hiveIndex[0]].bee.pos[1]+1,player.hive[player.hiveIndex[1]][player.hiveIndex[0]].bee.pos[2]],COLORS.bondArr,0,'+',1.2)
                
                if(isFavorite){
                    
                    player.addMessage(MATH.doGrammar(player.hive[player.hiveIndex[1]][player.hiveIndex[0]].bee.type)+" Bee loves sunflower seeds! ╰(*°▽°*)╯",COLORS.bondArr)
                }
                
                player.addMessage(MATH.doGrammar(player.hive[player.hiveIndex[1]][player.hiveIndex[0]].bee.type)+" Bee's bond improved",COLORS.bondArr)
                player.addMessage('by '+bondToAdd+(leveled?' and advanced to level '+l+'!':'!'),COLORS.bondArr)
                player.addMessage('('+MATH.addCommas((player.hive[player.hiveIndex[1]][player.hiveIndex[0]].bond-r[player.hive[player.hiveIndex[1]][player.hiveIndex[0]].level-1])+'')+'/'+MATH.addCommas(r[player.hive[player.hiveIndex[1]][player.hiveIndex[0]].level]+'')+') to level up',COLORS.bondArr)
                
            }
            
            document.getElementById('feedThisAmount').onclick=function(){feed(feedAmount.value)}
            
            document.getElementById('feedUntilGifted').onclick=function(){
                
                let am=MATH.simulateProbabilityTries(1/15000)
                
                if(am<items.sunflowerSeed.amount){
                    
                    player.hive[player.hiveIndex[1]][player.hiveIndex[0]].gifted=true
                    player.addMessage('After '+MATH.abvNumber(am+'')+' treats.....',COLORS.honey)
                    player.addMessage('⭐ The treat made the bee gifted! ⭐',COLORS.honey)
                    feed(am)
                    player.updateHive()
                    
                } else {
                    
                    player.addMessage('The treat failed to make the bee gifted :(',COLORS.redArr)
                    feed(items.sunflowerSeed.amount)
                }
            }
            
        }
    },
    
    basicEgg:{
        
        canUseOnSlot:(slot)=>{
            
            return slot.type!=='basic'
        },
        amount:0,u:128*4/2048,v:128*5/2048,
        use:function(){
            
            items.basicEgg.amount--
            player.hive[player.hiveIndex[1]][player.hiveIndex[0]].type='basic'
            player.hive[player.hiveIndex[1]][player.hiveIndex[0]].gifted=Math.random()<1/100
            
            player.beePopup={type:player.hive[player.hiveIndex[1]][player.hiveIndex[0]].type,message:'You hatched a...',time:TIME,gifted:player.hive[player.hiveIndex[1]][player.hiveIndex[0]].gifted}
            
            
            player.updateHive()
        }
    },
    
    silverEgg:{
        
        canUseOnSlot:(slot)=>{
            
            return true
        },
        amount:0,u:128*5/2048,v:128*5/2048,
        use:function(){
            
            let types={mythic:1/4000,legendary:0.075-(1/4000),epic:0.325,rare:0.6},r=Math.random(),type,c=0
            
            for(let i in types){
                
                if(r<=types[i]+c){
                    
                    type=i
                    break
                }
                
                c+=types[i]
            }
            
            types=[]
            
            for(let i in beeInfo){
                
                if(beeInfo[i].rarity===type){
                    
                    types.push(i)
                }
            }
            
            type=types[(Math.random()*types.length)|0]
            
            items.silverEgg.amount--
            player.hive[player.hiveIndex[1]][player.hiveIndex[0]].type=type
            player.hive[player.hiveIndex[1]][player.hiveIndex[0]].gifted=Math.random()<1/100
            
            player.beePopup={type:player.hive[player.hiveIndex[1]][player.hiveIndex[0]].type,message:'You hatched a...',time:TIME,gifted:player.hive[player.hiveIndex[1]][player.hiveIndex[0]].gifted}
            
            
            player.updateHive()
        }
    },
    
    goldEgg:{
        
        canUseOnSlot:(slot)=>{
            
            return true
        },
        amount:0,u:128*6/2048,v:128*5/2048,
        use:function(){
            
            let types={mythic:1/500,legendary:0.3-(1/500),epic:0.7},r=Math.random(),type,c=0
            
            for(let i in types){
                
                if(r<=types[i]+c){
                    
                    type=i
                    break
                }
                
                c+=types[i]
            }
            
            types=[]
            
            for(let i in beeInfo){
                
                if(beeInfo[i].rarity===type){
                    
                    types.push(i)
                }
            }
            
            type=types[(Math.random()*types.length)|0]
            
            items.goldEgg.amount--
            player.hive[player.hiveIndex[1]][player.hiveIndex[0]].type=type
            player.hive[player.hiveIndex[1]][player.hiveIndex[0]].gifted=Math.random()<1/100
            
            player.beePopup={type:player.hive[player.hiveIndex[1]][player.hiveIndex[0]].type,message:'You hatched a...',time:TIME,gifted:player.hive[player.hiveIndex[1]][player.hiveIndex[0]].gifted}
            
            player.updateHive()
        }
    },
    
    diamondEgg:{
        
        canUseOnSlot:(slot)=>{
            
            return true
        },
        amount:0,u:128*7/2048,v:128*5/2048,
        use:function(){
            
            let types={mythic:0.05,legendary:0.95},r=Math.random(),type,c=0
            
            for(let i in types){
                
                if(r<=types[i]+c){
                    
                    type=i
                    break
                }
                
                c+=types[i]
            }
            
            types=[]
            
            for(let i in beeInfo){
                
                if(beeInfo[i].rarity===type){
                    
                    types.push(i)
                }
            }
            
            type=types[(Math.random()*types.length)|0]
            
            items.diamondEgg.amount--
            player.hive[player.hiveIndex[1]][player.hiveIndex[0]].type=type
            player.hive[player.hiveIndex[1]][player.hiveIndex[0]].gifted=Math.random()<1/100
            
            player.beePopup={type:player.hive[player.hiveIndex[1]][player.hiveIndex[0]].type,message:'You hatched a...',time:TIME,gifted:player.hive[player.hiveIndex[1]][player.hiveIndex[0]].gifted}
            
            player.updateHive()
        }
    },
    
    mythicEgg:{
        
        canUseOnSlot:(slot)=>{
            
            return true
        },
        amount:0,u:128*0/2048,v:128*6/2048,
        use:function(){
            
            let types=[]
            
            for(let i in beeInfo){
                
                if(beeInfo[i].rarity==='mythic'){
                    
                    types.push(i)
                }
            }
            
            type=types[(Math.random()*types.length)|0]
            
            items.mythicEgg.amount--
            player.hive[player.hiveIndex[1]][player.hiveIndex[0]].type=type
            player.hive[player.hiveIndex[1]][player.hiveIndex[0]].gifted=Math.random()<1/100
            
            player.beePopup={type:player.hive[player.hiveIndex[1]][player.hiveIndex[0]].type,message:'You hatched a...',time:TIME,gifted:player.hive[player.hiveIndex[1]][player.hiveIndex[0]].gifted}
            
            player.updateHive()
        }
    },
    
    glitter:{
        
        amount:0,u:0,v:128*7/2048,
        use:function(){
            
            
        }
    },
}

for(let i in items){
    
    if(i!=='honey'){
        
        items[i].svg=document.getElementById(i)
        items[i].amountText=document.getElementById(i+'_amount')
        items[i].svg.onmousedown=function(e){
            
            if(player.itemDragging===i){
                
                player.itemDragging=false
                
            } else {
                
                player.itemDragging=i
            }
        }
    }
}

let beequips={
    
    candycane:{
        
        svgCode:`<svg onmousedown='window.functionToRunOnBeequipClick(#ID)' style='width:200;height:70;cursor:pointer;border-radius:8px'><rect width='200' height='70' fill='rgb(255,255,255)'></rect><rect width='70' height='70' fill='rgb(225,225,225)'></rect><text x='132' y='15' style='font-family:trebuchet ms;font-size:16.5px;' fill='rgb(0,0,0)' text-anchor='middle'>Candy Cane</text><text x='132' y='31' style='font-family:trebuchet ms;font-size:10px;' fill='rgb(0,0,0)' text-anchor='middle'>This stick of candy causes</text><text x='132' y='43' style='font-family:trebuchet ms;font-size:9.9px;' fill='rgb(0,0,0)' text-anchor='middle'>dramatic bee hyperactivity,</text><text x='132' y='54' style='font-family:trebuchet ms;font-size:10px;' fill='rgb(0,0,0)' text-anchor='middle'>sticks to pollen, and turns</text><text x='133' y='65' style='font-family:trebuchet ms;font-size:9.7px;' fill='rgb(0,0,0)' text-anchor='middle'>into a sharp, deadly weapon.</text><text style=''></text><defs><linearGradient id='candyStripes' x1='0' y1='0' x2='1' y2='-0.1'><stop offset='10%' stop-color='rgb(255,0,0)'/><stop offset='10%' stop-color='rgb(255,255,225)'/><stop offset='20%' stop-color='rgb(255,255,225)'/><stop offset='20%' stop-color='rgb(255,0,0)'/><stop offset='30%' stop-color='rgb(255,0,0)'/><stop offset='30%' stop-color='rgb(255,255,225)'/><stop offset='40%' stop-color='rgb(255,255,225)'/><stop offset='40%' stop-color='rgb(255,0,0)'/><stop offset='50%' stop-color='rgb(255,0,0)'/><stop offset='50%' stop-color='rgb(255,255,225)'/><stop offset='60%' stop-color='rgb(255,255,225)'/><stop offset='60%' stop-color='rgb(255,0,0)'/><stop offset='70%' stop-color='rgb(255,0,0)'/><stop offset='70%' stop-color='rgb(255,255,225)'/><stop offset='80%' stop-color='rgb(255,255,225)'/><stop offset='80%' stop-color='rgb(255,0,0)'/><stop offset='90%' stop-color='rgb(255,0,0)'/><stop offset='90%' stop-color='rgb(255,255,225)'/></linearGradient></defs><path fill='url(#candyStripes)' stroke='black' stroke-width='1' d='M-14 7L10 6C15 6 15 -5 10 -5L 8 -3C12 -3 12 3 8 3z' transform='translate(32,34) scale(1.75,1.75) rotate(-19.2)'></path></svg>`,
        potentials:[2,4,4,3,3,3,3,3],
        level:6,
        color:'any',
        // reqStr:"<br><br><p style='font-size:15px;'>Bee</p><br>",
        reqStr:"<br><br><br><br>",
        canUseOnSlot:function(slot){
            
            return slot.type
        },
        
        generateStats:function(potential){
            
            let b='',p='',np=potential/5 
            
            if(Math.random()<np){
                
                b+='*'+(MATH.random(1.15,1.3)*(np*0.15+1)).toFixed(2)+' gatherAmount,'
            }
            
            if(Math.random()<np*0.65){
                
                b+='*1.05 abilityRate,'
            }
            
            b+='*'+(MATH.random(1.075,1.2)*(np*0.1+1)).toFixed(2)+' attack,'
            b+='*'+MATH.random(0.8,0.95).toFixed(2)+' maxEnergy,'
            b+='*'+(MATH.random(1.075,1.15)*(np*0.1+1)).toFixed(2)+' speed,'
            
            if(Math.random()<np*0.5){
                
                p+='*'+(MATH.random(1.01,1.04)*(np*0.01+1)).toFixed(2)+' beeSpeed,'
                
            }
            
            if(Math.random()<np*0.5){
                
                p+='*'+(MATH.random(1.01,1.03)*(np*0.01+1)).toFixed(2)+' redPollen,'
                
            }
            
            return {bee:b[b.length-1]===','?b.substr(0,b.length-1):b,player:p[p.length-1]===','?p.substr(0,p.length-1):p}
        }
    },
    
    boombox:{
        
        svgCode:`<svg onmousedown='window.functionToRunOnBeequipClick(#ID)' style='width:200;height:70;cursor:pointer;border-radius:8px'><rect width='200' height='70' fill='rgb(255,255,255)'></rect><rect width='70' height='70' fill='rgb(225,225,225)'></rect><text x='132' y='15' style='font-family:trebuchet ms;font-size:16.5px;' fill='rgb(0,0,0)' text-anchor='middle'>Boombox</text><text x='132' y='31' style='font-family:trebuchet ms;font-size:10px;' fill='rgb(0,0,0)' text-anchor='middle'>Energize and motivate your</text><text x='132' y='43' style='font-family:trebuchet ms;font-size:9.9px;' fill='rgb(0,0,0)' text-anchor='middle'>bees with upbeat musical</text><text x='132' y='54' style='font-family:trebuchet ms;font-size:10px;' fill='rgb(0,0,0)' text-anchor='middle'>hits by Bee Gees or</text><text x='133' y='65' style='font-family:trebuchet ms;font-size:9.7px;' fill='rgb(0,0,0)' text-anchor='middle'>Beethoven!</text><text style=''></text><rect x='26' y='23' width='20' height='22' rx='6' stroke='rgb(0,170,0)' stroke-width='3.5' fill='rgb(0,0,0,0)'></rect>
<rect x='19' y='30' width='35' height='20' rx='4' stroke='black' stroke-width='1.5' fill='rgb(19, 93, 212)'></rect>
<circle cx='30' cy='38' r='5' stroke='black' stroke-width='1' fill='rgb(251, 255, 0)'></circle>
<circle cx='45' cy='38' r='5' stroke='black' stroke-width='1' fill='rgb(251, 255, 0)'></circle>
<circle cx='30' cy='38' r='1.5' fill='rgb(0, 0, 0)'></circle>
<circle cx='45' cy='38' r='1.5' fill='rgb(0, 0, 0)'></circle>
<rect x='32' y='45' width='5' height='3' fill='rgb(255,0,255)'></rect><rect x='39' y='45' width='5' height='3' fill='rgb(255,0,0)'></rect></svg>`,
        potentials:[4,4,4,4,3,5,5],
        level:7,
        color:'any',
        // reqStr:"<br><br><p style='font-size:15px;'>Bee</p><br>",
        reqStr:"<br><br><br><br>",
        canUseOnSlot:function(slot){
            
            return slot.type
        },
        
        generateStats:function(potential){
            
            let b='',p='',np=potential/5 
            
            b+='*'+(MATH.random(1.1,1.2)*(np*0.1+1)).toFixed(2)+' abilityRate,'
            
            b+='*'+MATH.random(1.1,np*0.25+1).toFixed(2)+' maxEnergy,'
            b+='*'+(MATH.random(1.05,1.175)*(np*0.1+1)).toFixed(2)+' speed'
            
            if(Math.random()<np*0.35){
                
                p+='*'+(MATH.random(1.01,1.04)*(np*0.01+1)).toFixed(2)+' convertRate'
                
            }
            
            return {bee:b[b.length-1]===','?b.substr(0,b.length-1):b,player:p[p.length-1]===','?p.substr(0,p.length-1):p}
        },
        
        extraAbility:'gathering_melody'
    }
}

let COLORS={
    
    blue:'rgb(20,84,186)',
    red:'rgb(255,0,0)',
    white:'rgb(255,255,255)',
    blueArr:[20,84,186],
    redArr:[255,0,0],
    whiteArr:[255,255,255],
    honey:[255,226,8],
    honey_normalized:[1,226/255,8/255],
    bondArr:[240,72,218],
}

let objects={
    
    tokens:[],
    bees:[],
    tempBees:[],
    explosions:[],
    flames:[],
    bubbles:[],
    marks:[],
    balloons:[],
    mobs:[],
    targets:[],
    triangulates:[],
    fuzzBombs:[],
    
},meshes={
    
    tokens:{
        
        instanceBuffer:gl.createBuffer(),
        instanceData:[],
    },
    
    bees:{
        
        instanceBuffer:gl.createBuffer(),
        instanceData:[],
    },
    
    explosions:{
        
        instanceBuffer:gl.createBuffer(),
        instanceData:[],
    },
    
    cylinder_explosions:{
        
        instanceBuffer:gl.createBuffer(),
        instanceData:[],
    },
}

class Bee {
    
    constructor(pos,type,lvl,gifted,x,y){
        
        this.hiveX=x
        this.hiveY=y
        this.gifted=gifted
        this.hivePos=pos.slice()
        this.pos=pos.slice()
        this.type=type
        this.flowerIn=null
        this.moveTo=[player.body.position.x,player.body.position.y,player.body.position.z]
        this.moveOffset=[MATH.random(-5,5),0,MATH.random(-5,5)]
        this.moveDir=[]
        
        // this.computeLevel(lvl||1)
        this.computeLevel(20)
        
        this.convertTimer=0
        this.flowerCollecting=[]
        this.state='moveToPlayer'
        this.emitParticle=TIME
        this.collectRot=[]
        this.pollen=0
        this.attackTimer=1
        this.trail={addPos:function(){}}
        
        this.trails=[]
        this.beeOffsets=[]
        
        for(let i in beeInfo[this.type].trails){
            
            this.trails.push(new TrailRenderer.ConstantTrail(beeInfo[this.type].trails[i]))
            this.beeOffsets.push(beeInfo[this.type].trails[i].beeOffset||0)
            
        }
    }
    
    computeLevel(newLevel){
        
        this.gatheringTokens=[]
        
        for(let i in beeInfo[this.type].tokens){
            
            let t=beeInfo[this.type].tokens[i].replace('*',''),g=beeInfo[this.type].tokens[i].indexOf('*')>-1
            
            this.gatheringTokens[i]={type:t,cooldown:effects[t].trialCooldown,rate:effects[t].trialRate,timer:-10000,requireGifted:g}
            
        }
        
        this.attackTokens=[]
        
        for(let i in beeInfo[this.type].attackTokens){
            
            let t=beeInfo[this.type].attackTokens[i].replace('*',''),g=beeInfo[this.type].attackTokens[i].indexOf('*')>-1
            
            this.attackTokens[i]={type:t,cooldown:effects[t].trialCooldown,rate:effects[t].trialRate,timer:-10000,requireGifted:g}
            
        }
        
        this.level=newLevel
        
        newLevel--
        
        this.speed=beeInfo[this.type].speed
        this.gatherSpeed=beeInfo[this.type].gatherSpeed
        this.gatherAmount=beeInfo[this.type].gatherAmount
        this.convertAmount=beeInfo[this.type].convertAmount
        this.convertSpeed=beeInfo[this.type].convertSpeed
        this.maxEnergy=beeInfo[this.type].energy
        this.attack=beeInfo[this.type].attack
        this.abilityRate=1
        
        if(this.mutation){
            
            if(this.mutation.oper==='*'){
                
                this[this.mutation.stat]*=this.mutation.num
                
            } else {
                
                this[this.mutation.stat]+=this.mutation.num
            }
        }
        
        if(player.hive[this.hiveY][this.hiveX].beequip){
            
            let stats=player.hive[this.hiveY][this.hiveX].beequip.stats.bee
            
            stats=stats.split(',')
            
            for(let i in stats){
                
                let str=stats[i]
                
                if(str[0]==='*'){
                    
                    this[str.substr(str.indexOf(' ')+1,str.length)]*=Number(str.substr(1,str.indexOf(' ')-1))
                    
                } else {
                    
                    this[str.substr(str.indexOf(' ')+1,str.length)]+=Number(str.substr(1,str.indexOf(' ')-1))
                    
                }
            }
            
            if(beequips[player.hive[this.hiveY][this.hiveX].beequip.type].extraAbility){
                
                let ab=beequips[player.hive[this.hiveY][this.hiveX].beequip.type].extraAbility.split('_')
                
                this[ab[0]+'Tokens'].push({type:ab[1],cooldown:effects[ab[1]].trialCooldown,rate:effects[ab[1]].trialRate,timer:-10000})
                
                console.log(this.gatheringTokens)
            }
        }
        
        this.speed*=newLevel*0.03+1
        this.gatherAmount*=newLevel*0.1+1
        this.convertAmount*=newLevel*0.1+1
        this.maxEnergy*=newLevel*0.05+1
        
        if(this.gifted){
            
            this.gatherAmount*=1.5
            this.convertAmount*=1.5
            this.attack*=1.5
        }
        
        this.speed/=6
        
        this.energy=MATH.random(0.25,1)*this.maxEnergy
    }
    
    update(){
        
        if(player.hive[this.hiveY][this.hiveX].radioactive>0){
            
            textRenderer.addDecalRaw(...this.pos,0,0,...textRenderer.decalUV['glow'],0,1,0,2.5,2.5,0)
        }
        
        for(let i in this.trails){
            
            this.trails[i].addPos([this.pos[0],this.pos[1]+this.beeOffsets[i],this.pos[2]])
        }
        
        if(this.energy<=0&&this.state!=='sleep'&&this.state!=='moveToTriangulate'&&this.state!=='moveToTargetPractice'&&this.state!=='shootTargetPractice'){
            
            this.state='moveToSleep'
        }
        
        if(player.attacked.length>0&&(this.state!=='sleep'&&this.state!=='moveToSleep'&&this.state!=='attack'&&this.state!=='moveToAttack')){
            
            this.attackMob=player.attacked[(Math.random()*player.attacked.length)|0]
            this.state='moveToAttack'
            let _a=Math.random()*MATH.TWO_PI
            this.attackOffset=[Math.cos(_a)*2,Math.sin(_a)*2]
        }
        
        switch(this.state){
            
            case 'moveToAttack':
                
                if(!player.attacked.length||!this.attackMob||this.attackMob.state!=='attack'){
                    
                    this.state='moveToPlayer'
                    return
                }
                
                this.moveTo=[this.attackMob.pos[0]+this.attackOffset[0],this.attackMob.pos[1]+(this.type==='precise'?1.25:0.25),this.attackMob.pos[2]+this.attackOffset[1]]
                vec3.sub(this.moveDir,this.moveTo,this.pos)
                vec3.normalize(this.moveDir,this.moveDir)
                vec3.scaleAndAdd(this.pos,this.pos,this.moveDir,dt*this.speed*player.beeSpeed*(this.type==='spicy'?player.flameHeatStack:1))
                if(vec3.sqrDist(this.moveTo,this.pos)<0.8){
                    
                    this.state='attack'
                    
                    let _a=Math.random()*MATH.TWO_PI,r=this.type==='precise'?5:2
                    this.attackOffset=[Math.cos(_a)*r,Math.sin(_a)*r]
                    this.attackTimer=1.25+Math.random()*0.5*(this.type==='precise'?1.75:1)
                }
                
                meshes.bees.instanceData.push(this.pos[0],this.pos[1],this.pos[2],this.moveDir[0],this.moveDir[1],this.moveDir[2],BEE_FLY,beeInfo[this.type].u,beeInfo[this.type].v,beeInfo[this.type].meshPartId)
                
            break
            
            case 'attack':
                
                if(!player.attacked.length||!this.attackMob||this.attackMob.state!=='attack'){
                    
                    this.state='moveToPlayer'
                    return
                }
                
                this.attackTimer-=dt
                
                if(this.attackTimer<=0){
                    
                    this.energy--
                    
                    this.state='moveToAttack'
                    
                    this.attackMob=player.attacked[(Math.random()*player.attacked.length)|0]
                    
                    if(Math.random()<(this.attackMob.blocking?0.85:0)){
                        this.energy--
                        
                        textRenderer.add('BLOCK',[this.attackMob.pos[0],this.attackMob.pos[1]+Math.random()*2.75+1.5,this.attackMob.pos[2]],[255,255,255],0,'',1.25,false)
                        
                    } else {
                    
                        if(Math.random()<(this.type==='precise'?Math.max(Math.pow(2,(this.gifted?2:1)+this.level-this.attackMob.level),0.05):Math.pow(2,this.level-this.attackMob.level))){
                            
                            let h=(this.attack+player[beeInfo[this.type].color+'BeeAttack'])*player.beeAttack*(this.type==='precise'?this.gifted?2.25:1.5:1)
                            
                            this.attackMob.damage(h)
                            
                            if(this.type==='precise'){
                                
                                objects.explosions.push(new Explosion({col:[1,0,0],pos:this.pos,life:0.75,size:1.75,speed:0.3,aftershock:0}))
                            }
                            
                        } else {
                            
                            this.energy--
                            
                            textRenderer.add('MISS',[this.attackMob.pos[0],this.attackMob.pos[1]+Math.random()*2.75+1.5,this.attackMob.pos[2]],[255,255,255],0,'',1.25,false)
                            
                        }
                    }
                    
                    let token,openTokens=[]
                    
                    for(let i in this.attackTokens){
                        
                        let g=this.attackTokens[i]
                        
                        if((TIME-g.timer)*player[beeInfo[this.type].color+'BeeAbilityRate']*this.abilityRate>=g.cooldown&&Math.random()<=g.rate&&(g.requireGifted&&this.gifted||!g.requireGifted)){
                            
                            openTokens.push(i)
                        }
                    }
                    
                    if(openTokens.length){
                        
                        token=openTokens[(Math.random()*openTokens.length)|0]
                        this.attackTokens[token].timer=TIME
                        
                        token=this.attackTokens[token].type
                        
                        objects.tokens.push(new Token(effects[token].tokenLife,[Math.round(this.pos[0]),player.body.position.y+0.5,Math.round(this.pos[2])],token,{field:player.fieldIn,x:this.flowerCollecting[0],z:this.flowerCollecting[1],bee:this},true))
                        
                    }
                }
                
                meshes.bees.instanceData.push(this.pos[0],this.pos[1],this.pos[2],this.moveDir[0],this.moveDir[1],this.moveDir[2],TIME*5,beeInfo[this.type].u,beeInfo[this.type].v,beeInfo[this.type].meshPartId)
                
            break
            
            case 'moveToPlayer':
                
                if(player.fieldIn&&player.pollen<player.capacity){
                    
                    this.state='moveToFlower'
                    return
                }
                
                this.moveTo=[player.body.position.x+this.moveOffset[0],player.body.position.y,player.body.position.z+this.moveOffset[2]]
                vec3.sub(this.moveDir,this.moveTo,this.pos)
                vec3.normalize(this.moveDir,this.moveDir)
                vec3.scaleAndAdd(this.pos,this.pos,this.moveDir,dt*this.speed*player.beeSpeed*(this.type==='spicy'?player.flameHeatStack:1))
                if(vec3.sqrDist(this.moveTo,this.pos)<0.8){
                    
                    this.moveOffset=[MATH.random(-4,4),0,MATH.random(-4,4)]
                }
                
                meshes.bees.instanceData.push(this.pos[0],this.pos[1],this.pos[2],this.moveDir[0],this.moveDir[1],this.moveDir[2],BEE_FLY,beeInfo[this.type].u,beeInfo[this.type].v,beeInfo[this.type].meshPartId)
                
                if(player.converting&&player.pollen){
                    
                    this.state='moveToHiveToConvert'
                    return
                }
                
                if(player.convertingBalloon&&player.hiveBalloon.pollen){
                    
                    this.state='moveToHiveToConvertBalloon'
                }
                
            break
            
            case 'moveToFlower':
                
                if(!player.fieldIn||player.pollen>=player.capacity){
                    
                    this.state='moveToPlayer'
                    break
                }
                
                let f=fieldInfo[player.fieldIn]
                
                while(this.flowerCollecting[0]===undefined||this.flowerCollecting[1]===undefined||this.flowerCollecting[0]<0||this.flowerCollecting[0]>=f.width||this.flowerCollecting[1]<0||this.flowerCollecting[1]>=f.length){
                    
                    this.flowerCollecting[0]=player.flowerIn.x+(Math.round(MATH.random(-7,7)))
                    this.flowerCollecting[1]=player.flowerIn.z+(Math.round(MATH.random(-7,7)))
                    
                    let t=Math.random()*MATH.TWO_PI
                    this.collectRot=[Math.sin(t),-4,Math.cos(t)]
                }
                
                this.moveTo=[f.x+this.flowerCollecting[0],f.y+flowers[player.fieldIn][this.flowerCollecting[1]][this.flowerCollecting[0]].height*0.5+0.25,f.z+this.flowerCollecting[1]]
                vec3.sub(this.moveDir,this.moveTo,this.pos)
                vec3.normalize(this.moveDir,this.moveDir)
                vec3.scaleAndAdd(this.pos,this.pos,this.moveDir,dt*this.speed*player.beeSpeed*(this.type==='spicy'?player.flameHeatStack:1))
                
                if(vec3.sqrDist(this.moveTo,this.pos)<0.075){
                    
                    this.state='collectPollen'
                    this.collectTimer=this.gatherSpeed*(this.type==='spicy'?1/player.flameHeatStack:1)
                    return
                }
                
                meshes.bees.instanceData.push(this.pos[0],this.pos[1],this.pos[2],this.moveDir[0],this.moveDir[1],this.moveDir[2],BEE_FLY,beeInfo[this.type].u,beeInfo[this.type].v,beeInfo[this.type].meshPartId)
                
            break
            
            case 'collectPollen':
                
                if(!player.fieldIn||player.pollen>=player.capacity){
                    
                    this.state='moveToPlayer'
                    return
                }
                
                this.collectTimer-=dt
                
                if(this.collectTimer<=0){
                    
                    this.energy--
                    collectPollen({x:this.flowerCollecting[0],z:this.flowerCollecting[1],pattern:[[0,0]],amount:this.gatherAmount,yOffset:MATH.random(0.7,1.3),multiplier:{r:beeInfo[this.type].color==='red'?player.pollenFromBees*1.2:player.pollenFromBees,b:beeInfo[this.type].color==='blue'?player.pollenFromBees*1.2:player.pollenFromBees,w:player.pollenFromBees}})
                    
                    if(beeInfo[this.type].gatheringPassive){
                        
                        beeInfo[this.type].gatheringPassive(this)
                    }
                    
                    let token,openTokens=[]
                    
                    for(let i in this.gatheringTokens){
                        
                        let g=this.gatheringTokens[i]
                        
                        if((TIME-g.timer)*player[beeInfo[this.type].color+'BeeAbilityRate']*this.abilityRate>=g.cooldown&&Math.random()<=g.rate&&(g.requireGifted&&this.gifted||!g.requireGifted)){
                            
                            openTokens.push(i)
                        }
                    }
                    
                    if(openTokens.length){
                        
                        token=openTokens[(Math.random()*openTokens.length)|0]
                        this.gatheringTokens[token].timer=TIME
                        
                        token=this.gatheringTokens[token].type
                        
                        objects.tokens.push(new Token(effects[token].tokenLife,[Math.round(this.pos[0]),fieldInfo[player.fieldIn].y+1,Math.round(this.pos[2])],token,{field:player.fieldIn,x:this.flowerCollecting[0],z:this.flowerCollecting[1],bee:this}))
                        
                    }
                    
                    this.flowerCollecting=[]
                    this.state='moveToFlower'
                }
                
                meshes.bees.instanceData.push(this.pos[0],this.pos[1],this.pos[2],this.collectRot[0],this.collectRot[1],this.collectRot[2],BEE_COLLECT,beeInfo[this.type].u,beeInfo[this.type].v,beeInfo[this.type].meshPartId)
                
            break
            
            case 'moveToHiveToConvert':
                
                if(!player.converting||!player.pollen){
                    
                    this.state='moveToPlayer'
                    return
                }
                
                this.moveTo=this.hivePos.slice()
                vec3.sub(this.moveDir,this.moveTo,this.pos)
                vec3.normalize(this.moveDir,this.moveDir)
                vec3.scaleAndAdd(this.pos,this.pos,this.moveDir,dt*this.speed*player.beeSpeed*(this.type==='spicy'?player.flameHeatStack:1))
                if(vec3.sqrDist(this.moveTo,this.pos)<0.8){
                    
                    this.pos=this.hivePos.slice()
                    this.state='convertHoney'
                    this.convertTimer=this.convertSpeed
                    
                    let amountToTake=Math.min(Math.round(this.convertAmount*player.convertRate),player.pollen)
                    
                    if(amountToTake===player.pollen){
                        
                        this.lastBeeToConvert=true
                    }
                    
                    player.pollen-=amountToTake
                    this.pollen=amountToTake
                }
                
                meshes.bees.instanceData.push(this.pos[0],this.pos[1],this.pos[2],this.moveDir[0],this.moveDir[1],this.moveDir[2],BEE_FLY,beeInfo[this.type].u,beeInfo[this.type].v,beeInfo[this.type].meshPartId)
        
            break
            
            case 'convertHoney':
                
                if(!player.converting){
                    
                    player.pollen+=this.pollen
                    this.pollen=0
                    this.state='moveToPlayer'
                    return
                }
                
                this.convertTimer-=dt
                
                meshes.bees.instanceData.push(this.pos[0],this.pos[1],this.pos[2],0,1,0,TIME*5,beeInfo[this.type].u,beeInfo[this.type].v,beeInfo[this.type].meshPartId)
                if(this.convertTimer<=0){
                    
                    this.state='moveToHiveToConvert'
                    player.honey+=this.pollen*player.honeyAtHive
                    
                    textRenderer.add(Math.ceil(this.pollen*player.honeyAtHive),[player.body.position.x,player.body.position.y+Math.random()*2+0.5,player.body.position.z],COLORS.honey,0,'+')
                    
                    this.pollen=0
                    
                    if(!player.pollen&&this.lastBeeToConvert){
                        
                        this.lastBeeToConvert=false
                        player.converting=false
                        player.stopConverting=true
                    }
                    
                    for(let i=0;i<10;i++){
                        
                        ParticleRenderer.add({x:this.pos[0],y:this.pos[1],z:this.pos[2],vx:MATH.random(-1,1),vy:MATH.random(-1,1),vz:MATH.random(0,3),grav:0,size:MATH.random(60,100),col:COLORS.honey_normalized,life:0.75,rotVel:MATH.random(-3,3),alpha:5})
                    }
                }
                
            break
            
            case 'moveToHiveToConvertBalloon':
                
                if(!player.convertingBalloon||!player.hiveBalloon.pollen){
                    
                    this.state='moveToPlayer'
                    return
                }
                
                this.moveTo=this.hivePos.slice()
                vec3.sub(this.moveDir,this.moveTo,this.pos)
                vec3.normalize(this.moveDir,this.moveDir)
                vec3.scaleAndAdd(this.pos,this.pos,this.moveDir,dt*this.speed*player.beeSpeed*(this.type==='spicy'?player.flameHeatStack:1))
                if(vec3.sqrDist(this.moveTo,this.pos)<0.8){
                    
                    this.pos=this.hivePos.slice()
                    this.state='convertBalloon'
                    this.convertTimer=this.convertSpeed
                    
                    let amountToTake=Math.min(Math.round(this.convertAmount*player.convertRate*(this.type==='buoyant'?3:1)),player.hiveBalloon.pollen)
                    
                    if(amountToTake===player.hiveBalloon.pollen){
                        
                        this.lastBeeToConvert=true
                    }
                    
                    player.hiveBalloon.pollen-=amountToTake
                    this.pollen=amountToTake
                }
                
                meshes.bees.instanceData.push(this.pos[0],this.pos[1],this.pos[2],this.moveDir[0],this.moveDir[1],this.moveDir[2],BEE_FLY,beeInfo[this.type].u,beeInfo[this.type].v,beeInfo[this.type].meshPartId)
        
            break
            
            case 'convertBalloon':
                
                if(!player.convertingBalloon){
                    
                    player.hiveBalloon.pollen+=this.pollen
                    this.pollen=0
                    this.state='moveToPlayer'
                    return
                }
                
                this.convertTimer-=dt
                
                meshes.bees.instanceData.push(this.pos[0],this.pos[1],this.pos[2],0,1,0,TIME*5,beeInfo[this.type].u,beeInfo[this.type].v,beeInfo[this.type].meshPartId)
                if(this.convertTimer<=0){
                    
                    this.state='moveToHiveToConvertBalloon'
                    player.honey+=this.pollen*player.honeyAtHive
                    
                    textRenderer.add(this.pollen,[player.body.position.x,player.body.position.y+Math.random()*2+0.5,player.body.position.z],COLORS.honey,0,'+')
                    
                    this.pollen=0
                    
                    if(!player.pollen&&this.lastBeeToConvert){
                        
                        this.lastBeeToConvert=false
                        player.convertingBalloon=false
                        player.stopConverting=true
                        
                    }
                    
                    for(let i=0;i<10;i++){
                        
                        ParticleRenderer.add({x:this.pos[0],y:this.pos[1],z:this.pos[2],vx:MATH.random(-1,1),vy:MATH.random(-1,1),vz:MATH.random(0,3),grav:0,size:MATH.random(60,100),col:COLORS.honey_normalized,life:0.75,rotVel:MATH.random(-3,3),alpha:5})
                    }
                }
                
            break
            
            case 'moveToSleep':
                
                this.moveTo=this.hivePos.slice()
                vec3.sub(this.moveDir,this.moveTo,this.pos)
                vec3.normalize(this.moveDir,this.moveDir)
                vec3.scaleAndAdd(this.pos,this.pos,this.moveDir,dt*this.speed*player.beeSpeed*(this.type==='spicy'?player.flameHeatStack:1))
                if(vec3.sqrDist(this.moveTo,this.pos)<1){
                    
                    this.pos=this.hivePos.slice()
                    this.sleepTimer=20
                    this.zzzTimer=0
                    this.state='sleep'
                    this.sleepRotate=Math.random()*MATH.TWO_PI
                }
                
                meshes.bees.instanceData.push(this.pos[0],this.pos[1],this.pos[2],this.moveDir[0],this.moveDir[1],this.moveDir[2],BEE_FLY,beeInfo[this.type].u,beeInfo[this.type].v,beeInfo[this.type].meshPartId)
                
            break
            
            case 'sleep':
                
                this.sleepTimer-=dt
                this.zzzTimer-=dt
                
                if(this.sleepTimer<=0){
                    
                    this.energy=this.maxEnergy*player.beeEnergy
                    this.state='moveToPlayer'
                }
                
                if(this.zzzTimer<=0){
                    
                    this.zzzTimer=5
                    textRenderer.add('zzz',[this.pos[0]+MATH.random(-1,1),this.pos[1]+MATH.random(-1,1),this.pos[2]+Math.random()+0.25],[255,255,255],0,'',1.25)
                }
                
                meshes.bees.instanceData.push(this.pos[0],this.pos[1],this.pos[2],0,1,0,this.sleepRotate,beeInfo[this.type].u,beeInfo[this.type].v,beeInfo[this.type].meshPartId)
                
            break
            
            case 'moveToTargetPractice':
                
                if(!player.fieldIn){
                    
                    this.state='moveToPlayer'
                    return
                }
                
                vec3.sub(this.moveDir,this.moveTo,this.pos)
                vec3.normalize(this.moveDir,this.moveDir)
                vec3.scaleAndAdd(this.pos,this.pos,this.moveDir,dt*this.speed*player.beeSpeed*3)
                if(vec3.sqrDist(this.moveTo,this.pos)<0.7){
                    
                    this.pos=this.moveTo.slice()
                    this.targetPracticeTimer=4
                    this.targetExplosionTimer=0
                    this.state='shootTargetPractice'
                    this.targetLookDir=[(((fieldInfo[player.fieldIn].width*0.5)|0)+fieldInfo[player.fieldIn].x)-this.pos[0],fieldInfo[player.fieldIn].y,(((fieldInfo[player.fieldIn].length*0.5)|0)+fieldInfo[player.fieldIn].z)-this.pos[2]]
                    this.targets=[]
                    
                    for(let i=0;i<3;i++){
                        
                        let _x=((fieldInfo[player.fieldIn].width*0.5)+(Math.random()*this.targetPractice_q[0]*fieldInfo[player.fieldIn].width*0.5))|0,_z=((fieldInfo[player.fieldIn].length*0.5)+(Math.random()*this.targetPractice_q[1]*fieldInfo[player.fieldIn].length*0.5))|0
                        
                        this.targets.push(new Target(player.fieldIn,_x,_z,i+1,this))
                        objects.targets.push(this.targets[this.targets.length-1])
                        
                    }
                }
                
                meshes.bees.instanceData.push(this.pos[0],this.pos[1],this.pos[2],this.moveDir[0],this.moveDir[1],this.moveDir[2],BEE_FLY,beeInfo[this.type].u,beeInfo[this.type].v,beeInfo[this.type].meshPartId)
                
            break
            
            case 'shootTargetPractice':
                
                this.targetPracticeTimer-=dt
                this.targetExplosionTimer-=dt
                
                if(this.targetPracticeTimer<=0.5&&!this.shotParticleProjectile){
                    this.shotParticleProjectile=true
                    
                    for(let i in this.targets){
                        
                        let vx=this.targets[i].pos[0]-this.pos[0],vy=this.targets[i].pos[1]-this.pos[1],vz=this.targets[i].pos[2]-this.pos[2],d=Math.sqrt(vx*vx+vy*vy+vz*vz),s=d/0.5,m=s/d
                        
                        ParticleRenderer.add({x:this.pos[0],y:this.pos[1],z:this.pos[2],vx:vx*m,vy:vy*m,vz:vz*m,grav:0,size:400,col:[1,0,0],life:0.4,rotVel:MATH.random(-9,9),alpha:1000})
                    
                    }
                }
                
                if(this.targetPracticeTimer<=0){
                    
                    this.shotParticleProjectile=false
                        
                    let t=[this.targets[0].activated,this.targets[1].activated,this.targets[2].activated]
                    
                    if(t[0]&&t[1]&&t[2]){
                        
                        for(let i in objects.tokens){
                            
                            if(objects.tokens[i].canBeLinked){
                                objects.tokens[i].collect()
                            }
                        }
                        
                        objects.tokens.push(new Token(effects.precision.tokenLife,[this.targets[2].pos[0],this.targets[2].pos[1]+0.5,this.targets[2].pos[2]],'precision',{field:this.targets[2].field,x:this.targets[2].x,z:this.targets[2].z}))
                        objects.tokens.push(new Token(effects.focus.tokenLife,[this.targets[2].pos[0]+1,this.targets[2].pos[1]+0.5,this.targets[2].pos[2]],'focus',{field:this.targets[2].field,x:this.targets[2].x+1,z:this.targets[2].z}))
                        objects.tokens.push(new Token(effects.redBoost.tokenLife,[this.targets[2].pos[0]-1,this.targets[2].pos[1]+0.5,this.targets[2].pos[2]],'redBoost',{field:this.targets[2].field,x:this.targets[2].x-1,z:this.targets[2].z}))
                        
                    }
                    
                    if(t[2]&&this.gifted){
                        
                        if(!t[0]||!t[1]){
                            
                            objects.marks.push(new Mark(this.targets[2].field,this.targets[2].x,this.targets[2].z,'preciseMark',this.level))
                            window.playSound('markToken',0.6)
                        }
                    }
                    
                    for(let i in this.targets){
                        
                        let _t=this.targets[i]
                        
                        if(_t.activated){
                            
                            if(i!==2)
                                objects.tokens.push(new Token(effects.focus.tokenLife,[_t.pos[0],_t.pos[1]+0.5,_t.pos[2]],'focus',{field:_t.field,x:_t.x,z:_t.z}))
                            
                            collectPollen({x:_t.x,z:_t.z,pattern:[[-4,0],[-3,-2],[-3,-1],[-3,0],[-3,1],[-3,2],[-2,-3],[-2,-2],[-2,-1],[-2,0],[-2,1],[-2,2],[-2,3],[-1,-3],[-1,-2],[-1,-1],[-1,0],[-1,1],[-1,2],[-1,3],[0,-4],[0,-3],[0,-2],[0,-1],[0,0],[0,1],[0,2],[0,3],[0,4],[1,-3],[1,-2],[1,-1],[1,0],[1,1],[1,2],[1,3],[2,-3],[2,-2],[2,-1],[2,0],[2,1],[2,2],[2,3],[3,-2],[3,-1],[3,0],[3,1],[3,2],[4,0]],amount:(this.attack+player[beeInfo[this.type].color+'BeeAttack'])*player.beeAttack*(this.level*0.1+1),yOffset:2+Math.random()*0.4,stackHeight:0.5+Math.random()*0.5,instantConversion:(player.flameHeatStack-1)*0.5,multiplier:player.flameHeatStack*4,field:_t.field})
                            
                        } else {
                            
                            objects.tokens.push(new Token(effects.redBoost.tokenLife,[_t.pos[0],_t.pos[1]+0.5,_t.pos[2]],'redBoost',{field:_t.field,x:_t.x,z:_t.z}))
                        }
                    }
                    
                    this.targets[0].splice=true
                    this.targets[1].splice=true
                    this.targets[2].splice=true
                    
                    this.state='moveToPlayer'
                    return
                }
                
                if(this.targetExplosionTimer<=0){
                    
                    this.targetExplosionTimer=0.8
                    objects.explosions.push(new Explosion({col:[1,0,0],pos:this.pos,life:0.75,size:1.75,speed:0.3,aftershock:0}))
                }
                
                meshes.bees.instanceData.push(this.pos[0],this.pos[1],this.pos[2],this.targetLookDir[0],this.targetLookDir[1],this.targetLookDir[2],BEE_FLY,beeInfo[this.type].u,beeInfo[this.type].v,beeInfo[this.type].meshPartId)
            
            break
            
            case 'moveToTriangulate':
                
                this.triangulateTimer-=dt
                
                let d=[player.body.position.x-this.triangulateTokenPos[0],player.body.position.z-this.triangulateTokenPos[2]],
                    rd=[-d[1],d[0]],
                    tb=[this.pos[0]-player.body.position.x,this.pos[2]-player.body.position.z]
                
                if(rd[0]*tb[0]+rd[1]*tb[1]>0){
                    
                    this.moveDir=[rd[0],0,rd[1]]
                    
                } else {
                    
                    this.moveDir=[d[1],0,-d[0]]
                }
                
                vec3.normalize(this.moveDir,this.moveDir)
                vec3.scaleAndAdd(this.pos,this.pos,this.moveDir,dt*this.speed*player.beeSpeed)
                
                if(this.triangulateTimer<=0){
                    
                    this.state='moveToPlayer'
                }
                
                meshes.bees.instanceData.push(this.pos[0],this.pos[1],this.pos[2],this.moveDir[0],this.moveDir[1],this.moveDir[2],BEE_FLY,beeInfo[this.type].u,beeInfo[this.type].v,beeInfo[this.type].meshPartId)
                
            break
        }
        
        if(beeInfo[this.type].particles&&TIME-this.emitParticle>0.2){
            beeInfo[this.type].particles(this)
            this.emitParticle=TIME
        }
    }
    
    startTargetPractice(){
        
        this.state='moveToTargetPractice'
        
        let rx=MATH.random(0.4,0.9)*fieldInfo[player.fieldIn].width*(Math.random()<0.5?1:-1),rz=MATH.random(0.4,0.9)*fieldInfo[player.fieldIn].length*(Math.random()<0.5?1:-1),t=Math.random()*MATH.TWO_PI,x=Math.sin(t)*rx,z=Math.cos(t)*rz
        
        this.moveTo=[fieldInfo[player.fieldIn].x+fieldInfo[player.fieldIn].width*0.5+x,this.pos[1]+4+Math.random()*2,fieldInfo[player.fieldIn].z+fieldInfo[player.fieldIn].length*0.5+z]
        
        this.targetPractice_q=[Math.sign(-x)||1,Math.sign(-z)||1]
        
    }
    
    startTriangulate(tokenPos){
        
        this.state='moveToTriangulate'
        this.triangulateTimer=3
        this.triangulateTokenPos=tokenPos
        
        objects.triangulates.push(new Triangulate(this,tokenPos))
    }
}

class TempBee {
    
    constructor(pos,type,lvl,lifespan,gifted){
        
        this.life=lifespan
        this.gifted=gifted
        this.hivePos=pos.slice()
        this.pos=pos.slice()
        this.type=type
        this.flowerIn=null
        this.moveTo=[player.body.position.x,player.body.position.y,player.body.position.z]
        this.moveOffset=[MATH.random(-5,5),0,MATH.random(-5,5)]
        this.moveDir=[]
        
        this.computeLevel(lvl||1)
        
        this.convertTimer=0
        this.flowerCollecting=[]
        this.state='moveToPlayer'
        this.emitParticle=TIME
        this.collectRot=[]
        this.pollen=0
        this.attackTimer=1
        this.trail={addPos:function(){}}
        
        this.trails=[]
        this.beeOffsets=[]
        
        for(let i in beeInfo[this.type].trails){
            
            this.trails.push(new TrailRenderer.ConstantTrail(beeInfo[this.type].trails[i]))
            this.beeOffsets.push(beeInfo[this.type].trails[i].beeOffset||0)
            
        }
        
        this.gatheringTokens=[]
        
        for(let i in beeInfo[this.type].tokens){
            
            this.gatheringTokens[i]={type:beeInfo[this.type].tokens[i],cooldown:effects[beeInfo[this.type].tokens[i]].trialCooldown,rate:effects[beeInfo[this.type].tokens[i]].trialRate,timer:-10000}
            
        }
        
        this.attackTokens=[]
        
        for(let i in beeInfo[this.type].attackTokens){
            
            this.attackTokens[i]={type:beeInfo[this.type].attackTokens[i],cooldown:effects[beeInfo[this.type].attackTokens[i]].trialCooldown,rate:effects[beeInfo[this.type].attackTokens[i]].trialRate,timer:-10000}
            
        }
        
    }
    
    computeLevel(newLevel){
        
        this.level=newLevel
        
        newLevel--
        
        this.speed=beeInfo[this.type].speed
        this.gatherSpeed=beeInfo[this.type].gatherSpeed
        this.gatherAmount=beeInfo[this.type].gatherAmount
        this.attack=beeInfo[this.type].attack
        
        this.speed*=newLevel*0.03+1
        this.gatherAmount*=newLevel*0.1+1
        
        if(this.gifted){
            
            this.gatherAmount*=1.5
            this.attack*=1.5
        }
        
        this.speed/=6
    }
    
    update(){
        
        this.life-=dt
        
        for(let i in this.trails){
            
            this.trails[i].addPos([this.pos[0],this.pos[1]+this.beeOffsets[i],this.pos[2]])
        }
        
        if(player.attacked.length>0&&(this.state!=='sleep'&&this.state!=='moveToSleep'&&this.state!=='attack'&&this.state!=='moveToAttack')){
            
            this.attackMob=player.attacked[(Math.random()*player.attacked.length)|0]
            this.state='moveToAttack'
            let _a=Math.random()*MATH.TWO_PI
            this.attackOffset=[Math.cos(_a)*2,Math.sin(_a)*2]
        }
        
        switch(this.state){
            
            case 'moveToAttack':
                
                if(!player.attacked.length||!this.attackMob||this.attackMob.state!=='attack'){
                    
                    this.state='moveToPlayer'
                    return
                }
                
                this.moveTo=[this.attackMob.pos[0]+this.attackOffset[0],this.attackMob.pos[1]+(this.type==='precise'?1.25:0.25),this.attackMob.pos[2]+this.attackOffset[1]]
                vec3.sub(this.moveDir,this.moveTo,this.pos)
                vec3.normalize(this.moveDir,this.moveDir)
                vec3.scaleAndAdd(this.pos,this.pos,this.moveDir,dt*this.speed*player.beeSpeed*(this.type==='spicy'?player.flameHeatStack:1))
                if(vec3.sqrDist(this.moveTo,this.pos)<0.8){
                    
                    this.state='attack'
                    
                    let _a=Math.random()*MATH.TWO_PI,r=this.type==='precise'?5:2
                    this.attackOffset=[Math.cos(_a)*r,Math.sin(_a)*r]
                    this.attackTimer=1.25+Math.random()*0.5*(this.type==='precise'?1.75:1)
                }
                
                meshes.bees.instanceData.push(this.pos[0],this.pos[1],this.pos[2],this.moveDir[0],this.moveDir[1],this.moveDir[2],BEE_FLY,beeInfo[this.type].u,beeInfo[this.type].v,beeInfo[this.type].meshPartId)
                
            break
            
            case 'attack':
                
                if(!player.attacked.length||!this.attackMob||this.attackMob.state!=='attack'){
                    
                    this.state='moveToPlayer'
                    return
                }
                
                this.attackTimer-=dt
                
                if(this.attackTimer<=0){
                    
                    this.energy--
                    
                    this.state='moveToAttack'
                    
                    this.attackMob=player.attacked[(Math.random()*player.attacked.length)|0]
                    
                    if(Math.random()<(this.type==='precise'?Math.max(Math.pow(2,(this.gifted?2:1)+this.level-this.attackMob.level),0.05):Math.pow(2,this.level-this.attackMob.level))){
                        
                        let h=(this.attack+player[beeInfo[this.type].color+'BeeAttack'])*player.beeAttack*(this.type==='precise'?this.gifted?2.25:1.5:1)
                        
                        this.attackMob.damage(h)
                        
                        if(this.type==='precise'){
                            
                            objects.explosions.push(new Explosion({col:[1,0,0],pos:this.pos,life:0.75,size:1.75,speed:0.3,aftershock:0}))
                        }
                        
                    } else {
                        
                        textRenderer.add('MISS',[this.attackMob.pos[0],this.attackMob.pos[1]+Math.random()*2.75+1.5,this.attackMob.pos[2]],[255,255,255],0,'',1.25,false)
                        
                    }
                    
                    let token,openTokens=[]
                    
                    for(let i in this.attackTokens){
                        
                        let g=this.attackTokens[i]
                        
                        if((TIME-g.timer)*player[beeInfo[this.type].color+'BeeAbilityRate']>=g.cooldown&&Math.random()<=g.rate){
                            
                            openTokens.push(i)
                        }
                    }
                    
                    if(openTokens.length){
                        
                        token=openTokens[(Math.random()*openTokens.length)|0]
                        this.attackTokens[token].timer=TIME
                        
                        token=this.attackTokens[token].type
                        
                        objects.tokens.push(new Token(effects[token].tokenLife,[Math.round(this.pos[0]),Math.round(this.pos[1])+0.5,Math.round(this.pos[2])],token,{field:player.fieldIn,x:this.flowerCollecting[0],z:this.flowerCollecting[1],bee:this},true))
                        
                    }
                }
                
                meshes.bees.instanceData.push(this.pos[0],this.pos[1],this.pos[2],this.moveDir[0],this.moveDir[1],this.moveDir[2],TIME*5,beeInfo[this.type].u,beeInfo[this.type].v,beeInfo[this.type].meshPartId)
                
            break
            
            case 'moveToPlayer':
                
                if(player.fieldIn&&player.pollen<player.capacity){
                    
                    this.state='moveToFlower'
                    return
                }
                
                this.moveTo=[player.body.position.x+this.moveOffset[0],player.body.position.y,player.body.position.z+this.moveOffset[2]]
                vec3.sub(this.moveDir,this.moveTo,this.pos)
                vec3.normalize(this.moveDir,this.moveDir)
                vec3.scaleAndAdd(this.pos,this.pos,this.moveDir,dt*this.speed*player.beeSpeed*(this.type==='spicy'?player.flameHeatStack:1))
                if(vec3.sqrDist(this.moveTo,this.pos)<0.8){
                    
                    this.moveOffset=[MATH.random(-4,4),0,MATH.random(-4,4)]
                }
                
                meshes.bees.instanceData.push(this.pos[0],this.pos[1],this.pos[2],this.moveDir[0],this.moveDir[1],this.moveDir[2],BEE_FLY,beeInfo[this.type].u,beeInfo[this.type].v,beeInfo[this.type].meshPartId)
                
                if(player.converting&&player.pollen){
                    
                    this.state='moveToHiveToConvert'
                    return
                }
                
                if(player.convertingBalloon&&player.hiveBalloon.pollen){
                    
                    this.state='moveToHiveToConvertBalloon'
                }
                
            break
            
            case 'moveToFlower':
                
                if(!player.fieldIn||player.pollen>=player.capacity){
                    
                    this.state='moveToPlayer'
                    break
                }
                
                let f=fieldInfo[player.fieldIn]
                
                while(this.flowerCollecting[0]===undefined||this.flowerCollecting[1]===undefined||this.flowerCollecting[0]<0||this.flowerCollecting[0]>=f.width||this.flowerCollecting[1]<0||this.flowerCollecting[1]>=f.length){
                    
                    this.flowerCollecting[0]=player.flowerIn.x+(Math.round(MATH.random(-7,7)))
                    this.flowerCollecting[1]=player.flowerIn.z+(Math.round(MATH.random(-7,7)))
                    
                    let t=Math.random()*MATH.TWO_PI
                    this.collectRot=[Math.sin(t),-4,Math.cos(t)]
                }
                
                this.moveTo=[f.x+this.flowerCollecting[0],f.y+flowers[player.fieldIn][this.flowerCollecting[1]][this.flowerCollecting[0]].height*0.5+0.25,f.z+this.flowerCollecting[1]]
                vec3.sub(this.moveDir,this.moveTo,this.pos)
                vec3.normalize(this.moveDir,this.moveDir)
                vec3.scaleAndAdd(this.pos,this.pos,this.moveDir,dt*this.speed*player.beeSpeed*(this.type==='spicy'?player.flameHeatStack:1))
                
                if(vec3.sqrDist(this.moveTo,this.pos)<0.075){
                    
                    this.state='collectPollen'
                    this.collectTimer=this.gatherSpeed*(this.type==='spicy'?1/player.flameHeatStack:1)
                    return
                }
                
                meshes.bees.instanceData.push(this.pos[0],this.pos[1],this.pos[2],this.moveDir[0],this.moveDir[1],this.moveDir[2],BEE_FLY,beeInfo[this.type].u,beeInfo[this.type].v,beeInfo[this.type].meshPartId)
                
            break
            
            case 'collectPollen':
                
                if(!player.fieldIn||player.pollen>=player.capacity){
                    
                    this.state='moveToPlayer'
                    return
                }
                
                this.collectTimer-=dt
                
                if(this.collectTimer<=0){
                    
                    this.energy--
                    
                    collectPollen({x:this.flowerCollecting[0],z:this.flowerCollecting[1],pattern:[[0,0]],amount:this.gatherAmount,yOffset:MATH.random(0.7,1.3),multiplier:player.pollenFromBees})
                    if(beeInfo[this.type].gatheringPassive){
                        
                        beeInfo[this.type].gatheringPassive(this)
                    }
                    
                    let token,openTokens=[]
                    
                    for(let i in this.gatheringTokens){
                        
                        let g=this.gatheringTokens[i]
                        
                        if((TIME-g.timer)*player[beeInfo[this.type].color+'BeeAbilityRate']>=g.cooldown&&Math.random()<=g.rate){
                            
                            openTokens.push(i)
                        }
                    }
                    
                    if(openTokens.length){
                        
                        token=openTokens[(Math.random()*openTokens.length)|0]
                        this.gatheringTokens[token].timer=TIME
                        
                        token=this.gatheringTokens[token].type
                        
                        objects.tokens.push(new Token(effects[token].tokenLife,[Math.round(this.pos[0]),fieldInfo[player.fieldIn].y+1,Math.round(this.pos[2])],token,{field:player.fieldIn,x:this.flowerCollecting[0],z:this.flowerCollecting[1],bee:this}))
                        
                    }
                    
                    this.flowerCollecting=[]
                    this.state='moveToFlower'
                }
                
                meshes.bees.instanceData.push(this.pos[0],this.pos[1],this.pos[2],this.collectRot[0],this.collectRot[1],this.collectRot[2],BEE_COLLECT,beeInfo[this.type].u,beeInfo[this.type].v,beeInfo[this.type].meshPartId)
                
            break
            
            case 'moveToTargetPractice':
                
                if(!player.fieldIn){
                    
                    this.state='moveToPlayer'
                    return
                }
                
                vec3.sub(this.moveDir,this.moveTo,this.pos)
                vec3.normalize(this.moveDir,this.moveDir)
                vec3.scaleAndAdd(this.pos,this.pos,this.moveDir,dt*this.speed*player.beeSpeed*3)
                if(vec3.sqrDist(this.moveTo,this.pos)<0.7){
                    
                    this.pos=this.moveTo.slice()
                    this.targetPracticeTimer=4
                    this.targetExplosionTimer=0
                    this.state='shootTargetPractice'
                    this.targetLookDir=[(((fieldInfo[player.fieldIn].width*0.5)|0)+fieldInfo[player.fieldIn].x)-this.pos[0],fieldInfo[player.fieldIn].y,(((fieldInfo[player.fieldIn].length*0.5)|0)+fieldInfo[player.fieldIn].z)-this.pos[2]]
                    this.targets=[]
                    
                    for(let i=0;i<3;i++){
                        
                        let _x=((fieldInfo[player.fieldIn].width*0.5)+(Math.random()*this.targetPractice_q[0]*fieldInfo[player.fieldIn].width*0.5))|0,_z=((fieldInfo[player.fieldIn].length*0.5)+(Math.random()*this.targetPractice_q[1]*fieldInfo[player.fieldIn].length*0.5))|0
                        
                        this.targets.push(new Target(player.fieldIn,_x,_z,i+1,this))
                        objects.targets.push(this.targets[this.targets.length-1])
                        
                    }
                }
                
                meshes.bees.instanceData.push(this.pos[0],this.pos[1],this.pos[2],this.moveDir[0],this.moveDir[1],this.moveDir[2],BEE_FLY,beeInfo[this.type].u,beeInfo[this.type].v,beeInfo[this.type].meshPartId)
                
            break
            
            case 'shootTargetPractice':
                
                this.targetPracticeTimer-=dt
                this.targetExplosionTimer-=dt
                
                if(this.targetPracticeTimer<=0.35&&!this.shotParticleProjectile){
                    this.shotParticleProjectile=true
                    
                    for(let i in this.targets){
                        
                        let vx=this.targets[i].pos[0]-this.pos[0],vy=this.targets[i].pos[1]-this.pos[1],vz=this.targets[i].pos[2]-this.pos[2],d=Math.sqrt(vx*vx+vy*vy+vz*vz),s=d/0.35,m=s/d
                        
                        ParticleRenderer.add({x:this.pos[0],y:this.pos[1],z:this.pos[2],vx:vx*m,vy:vy*m,vz:vz*m,grav:0,size:MATH.random(300,350),col:[1,0,0],life:0.4,rotVel:MATH.random(-9,9),alpha:1000})
                    
                    }
                
                }
                
                if(this.targetPracticeTimer<=0){
                    
                    this.shotParticleProjectile=false
                        
                    let t=[this.targets[0].activated,this.targets[1].activated,this.targets[2].activated]
                    
                    if(t[0]&&t[1]&&t[2]){
                        
                        for(let i in objects.tokens){
                            
                            if(objects.tokens[i].canBeLinked){
                                objects.tokens[i].collect()
                            }
                        }
                        
                        objects.tokens.push(new Token(effects.precision.tokenLife,[this.targets[2].pos[0],this.targets[2].pos[1]+0.5,this.targets[2].pos[2]],'precision',{field:this.targets[2].field,x:this.targets[2].x,z:this.targets[2].z}))
                        objects.tokens.push(new Token(effects.focus.tokenLife,[this.targets[2].pos[0]+1,this.targets[2].pos[1]+0.5,this.targets[2].pos[2]],'focus',{field:this.targets[2].field,x:this.targets[2].x+1,z:this.targets[2].z}))
                        objects.tokens.push(new Token(effects.redBoost.tokenLife,[this.targets[2].pos[0]-1,this.targets[2].pos[1]+0.5,this.targets[2].pos[2]],'redBoost',{field:this.targets[2].field,x:this.targets[2].x-1,z:this.targets[2].z}))
                        
                    }
                    
                    if(t[2]&&this.gifted){
                        
                        if(!t[0]||!t[1]){
                            
                            objects.marks.push(new Mark(this.targets[2].field,this.targets[2].x,this.targets[2].z,'preciseMark',this.level))
                            window.playSound('markToken',0.6)
                        }
                    }
                    
                    for(let i in this.targets){
                        
                        let _t=this.targets[i]
                        
                        if(_t.activated){
                            
                            if(i!==2)
                                objects.tokens.push(new Token(effects.focus.tokenLife,[_t.pos[0],_t.pos[1]+0.5,_t.pos[2]],'focus',{field:_t.field,x:_t.x,z:_t.z}))
                            
                            collectPollen({x:_t.x,z:_t.z,pattern:[[-4,0],[-3,-2],[-3,-1],[-3,0],[-3,1],[-3,2],[-2,-3],[-2,-2],[-2,-1],[-2,0],[-2,1],[-2,2],[-2,3],[-1,-3],[-1,-2],[-1,-1],[-1,0],[-1,1],[-1,2],[-1,3],[0,-4],[0,-3],[0,-2],[0,-1],[0,0],[0,1],[0,2],[0,3],[0,4],[1,-3],[1,-2],[1,-1],[1,0],[1,1],[1,2],[1,3],[2,-3],[2,-2],[2,-1],[2,0],[2,1],[2,2],[2,3],[3,-2],[3,-1],[3,0],[3,1],[3,2],[4,0]],amount:(this.attack+player[beeInfo[this.type].color+'BeeAttack'])*player.beeAttack*0.75,yOffset:2+Math.random()*0.4,stackHeight:0.5+Math.random()*0.5,instantConversion:(player.flameHeatStack-1)*0.5,multiplier:player.flameHeatStack*5,field:_t.field})
                            
                        } else {
                            
                            objects.tokens.push(new Token(effects.redBoost.tokenLife,[_t.pos[0],_t.pos[1]+0.5,_t.pos[2]],'redBoost',{field:_t.field,x:_t.x,z:_t.z}))
                        }
                    }
                    
                    this.targets[0].splice=true
                    this.targets[1].splice=true
                    this.targets[2].splice=true
                    
                    this.state='moveToPlayer'
                    return
                }
                
                if(this.targetExplosionTimer<=0){
                    
                    this.targetExplosionTimer=0.8
                    objects.explosions.push(new Explosion({col:[1,0,0],pos:this.pos,life:0.75,size:1.75,speed:0.3,aftershock:0}))
                }
                
                meshes.bees.instanceData.push(this.pos[0],this.pos[1],this.pos[2],this.targetLookDir[0],this.targetLookDir[1],this.targetLookDir[2],BEE_FLY,beeInfo[this.type].u,beeInfo[this.type].v,beeInfo[this.type].meshPartId)
            
            break
            
            case 'moveToTriangulate':
                
                this.triangulateTimer-=dt
                
                let d=[player.body.position.x-this.triangulateTokenPos[0],player.body.position.z-this.triangulateTokenPos[2]],
                    rd=[-d[1],d[0]],
                    tb=[this.pos[0]-player.body.position.x,this.pos[2]-player.body.position.z]
                
                if(rd[0]*tb[0]+rd[1]*tb[1]>0){
                    
                    this.moveDir=[rd[0],0,rd[1]]
                    
                } else {
                    
                    this.moveDir=[d[1],0,-d[0]]
                }
                
                vec3.normalize(this.moveDir,this.moveDir)
                vec3.scaleAndAdd(this.pos,this.pos,this.moveDir,dt*this.speed*player.beeSpeed)
                
                if(this.triangulateTimer<=0){
                    
                    this.state='moveToPlayer'
                }
                
                meshes.bees.instanceData.push(this.pos[0],this.pos[1],this.pos[2],this.moveDir[0],this.moveDir[1],this.moveDir[2],BEE_FLY,beeInfo[this.type].u,beeInfo[this.type].v,beeInfo[this.type].meshPartId)
                
            break
        }
        
        if(beeInfo[this.type].particles&&TIME-this.emitParticle>0.2){
            beeInfo[this.type].particles(this)
            this.emitParticle=TIME
        }
        
        return this.life<=0
    }
    
    startTargetPractice(){
        
        this.state='moveToTargetPractice'
        
        let rx=MATH.random(0.4,0.9)*fieldInfo[player.fieldIn].width*(Math.random()<0.5?1:-1),rz=MATH.random(0.4,0.9)*fieldInfo[player.fieldIn].length*(Math.random()<0.5?1:-1),t=Math.random()*MATH.TWO_PI,x=Math.sin(t)*rx,z=Math.cos(t)*rz
        
        this.moveTo=[fieldInfo[player.fieldIn].x+fieldInfo[player.fieldIn].width*0.5+x,this.pos[1]+4+Math.random()*2,fieldInfo[player.fieldIn].z+fieldInfo[player.fieldIn].length*0.5+z]
        
        this.targetPractice_q=[Math.sign(-x)||1,Math.sign(-z)||1]
        
    }
    
    startTriangulate(tokenPos){
        
        this.state='moveToTriangulate'
        this.triangulateTimer=3
        this.triangulateTokenPos=tokenPos
        
        objects.triangulates.push(new Triangulate(this,tokenPos))
    }
}

class Explosion {
    
    constructor(params){
        
        this.lifespan=1/params.life
        this.params=params
        this.size=this.reverse?params.size:0
        this.params.height=this.params.height||1
        this.maxAlpha=params.maxAlpha||1
        this.backface=params.backface===undefined?false:params.backface
        this.primitive=params.primitive||'explosions'
    }
    
    die(index){
        
        objects.explosions.splice(index,1)
    }
    
    update(){
        
        this.params.life-=dt
        this.size+=Math.max((this.params.size-this.size)*this.params.speed,this.params.aftershock)
        
        meshes[this.primitive].instanceData.push(this.params.pos[0],this.params.pos[1],this.params.pos[2],this.params.col[0],this.params.col[1],this.params.col[2],Math.min(this.params.life*this.lifespan,this.maxAlpha),this.backface?-this.size:this.size,this.params.height)
        
        return this.params.life<=0
    }
}

class ReverseExplosion {
    
    constructor(params){
        
        this.transformHeight=params.transformHeight
        this.primitive=params.primitive||'cylinder_explosions'
        this.lifespan=1/params.life
        this.params=params
        this.size=params.size
        this.params.height=this.params.height||1
        this.backface=params.backface===undefined?false:params.backface
    }
    
    die(index){
        
        objects.explosions.splice(index,1)
    }
    
    update(){
        
        this.params.life-=dt
        let s=this.params.life*this.lifespan*this.size
        
        meshes[this.primitive].instanceData.push(this.params.pos[0],this.params.pos[1],this.params.pos[2],this.params.col[0],this.params.col[1],this.params.col[2],this.params.life*this.lifespan*this.params.alpha,this.backface?-s:s,this.transformHeight?this.params.height:this.params.height/s)
        
        return this.params.life<=0
    }
}

class Flame {
    
    constructor(field,x,z,isStatic){
        
        this.life=3*(player.flameFuel?1.5:1)*player.flameLife
        this.isStatic=isStatic
        
        if(isStatic){
            
            this.pos=[field,x,z]
            
        } else {
            
            this.field=field
            this.x=x
            this.z=z
            this.pos=[this.x+fieldInfo[this.field].x,fieldInfo[this.field].y+0.5,this.z+fieldInfo[this.field].z]
        }
        
        this.collectTimer=TIME+MATH.random(0.5,1)
        this.particleTimer=TIME
        
        if(player.flameFuel){
            
            this.getRidOfOilTrailTimer=2
            this.oilT=0
            this.oilPos=[player.body.position.x,player.body.position.y+0.3,player.body.position.z]
            this.oilTrail=new TrailRenderer.Trail({length:10,size:0.75,triangle:true,color:[0.1,0,0,1]})
            
            player.pollen-=Math.min(Math.ceil(player.convertTotal*0.15),player.pollen)
            player.honey+=Math.min(Math.ceil(player.convertTotal*0.15),player.pollen)
            if(player.setting_enablePollenText)
                textRenderer.add(Math.min(Math.ceil(player.convertTotal*0.15),player.pollen),[player.body.position.x,player.body.position.y+Math.random()*2+0.5,player.body.position.z],COLORS.honey,0,'+')
        }
    }
    
    die(index){
        
        if(this.oilTrail)
            this.oilTrail.splice=true
            
        objects.flames.splice(index,1)
    }
    
    turnDark(){
        
        if(!this.dark){
            
            objects.explosions.push(new ReverseExplosion({col:[1,0,1],pos:this.pos,life:0.5,size:2,alpha:1,height:3}))
            
            this.dark=true
            
            if(player.flameFuel){
                
                this.life*=1.5
                player.pollen-=Math.min(Math.ceil(player.convertTotal*0.15),player.pollen)
                player.honey+=Math.min(Math.ceil(player.convertTotal*0.15),player.pollen)
                if(player.setting_enablePollenText)
                    textRenderer.add(Math.min(Math.ceil(player.convertTotal*0.15),player.pollen),[player.body.position.x,player.body.position.y+Math.random()*2+0.5,player.body.position.z],COLORS.honey,0,'+')
                this.getRidOfOilTrailTimer=2
                this.oilT=0
                this.oilPos=[player.body.position.x,player.body.position.y+0.3,player.body.position.z]
                
                if(!this.oilTrail){
                    
                    this.oilTrail=new TrailRenderer.Trail({length:15,size:0.75,triangle:true,color:[0.1,0,0,1]})
                } else {
                    
                    this.oilTrail.addPos([])
                }
            }
        }
    }
    
    update(){
        
        this.life-=dt
        
        if(this.oilTrail){
            
            this.oilPos[0]=MATH.lerp(this.oilPos[0],this.pos[0],this.oilT)
            this.oilPos[2]=MATH.lerp(this.oilPos[2],this.pos[2],this.oilT)
            this.oilT=Math.min(this.oilT+dt*0.5,1) 
            this.oilTrail.addPos([...this.oilPos])
            
            this.getRidOfOilTrailTimer-=dt
            
            if(this.getRidOfOilTrailTimer<=0){
                
                this.oilTrail.splice=true
                this.oilTrail=undefined
            }
        }
        
        if(TIME-this.collectTimer>1){
            
            this.collectTimer=TIME
            
            if(!this.isStatic&&player.fieldIn===this.field){
                
                collectPollen({x:this.x,z:this.z,pattern:this.dark?[[0,0],[1,1],[1,-1],[-1,1],[-1,-1],[1,0],[-1,0],[0,1],[0,-1],[2,0],[-2,0],[0,-2],[0,2]]:[[0,0],[1,1],[1,-1],[-1,1],[-1,-1],[1,0],[-1,0],[0,1],[0,-1]],amount:{r:10,w:5,b:1},stackHeight:0.7,multiplier:player.flamePollen*player.flameBonus,instantConversion:player.instantFlameConversion,field:this.field})
            }
        }
        
        if(this.dark){player.addEffect('darkHeat')}
        
        if(TIME-this.particleTimer>0.5){
            
            this.particleTimer=TIME
            
            if(this.dark){
                
                ParticleRenderer.add({x:this.pos[0],y:this.pos[1],z:this.pos[2],vx:MATH.random(-0.1,0.1),vy:MATH.random(0,0.3),vz:MATH.random(-0.1,0.1),grav:1,size:MATH.random(110,180),col:[1,0,Math.random()],life:1.5,rotVel:MATH.random(-3,3),alpha:4.5})
                
            } else {
                
                ParticleRenderer.add({x:this.pos[0],y:this.pos[1],z:this.pos[2],vx:MATH.random(-0.1,0.1),vy:MATH.random(0,0.3),vz:MATH.random(-0.1,0.1),grav:1,size:MATH.random(110,180),col:[1,MATH.random(0.3,1),0],life:1.5,rotVel:MATH.random(-3,3),alpha:4.5})
            }
        }
        
        if(Math.abs(player.body.position.x-this.pos[0])+Math.abs(player.body.position.y-this.pos[1])+Math.abs(player.body.position.z-this.pos[2])<2){
            
            player.stats.scorchingStar+=dt*(this.dark?120:90)
            player.addEffect('flameHeat',this.dark?0.00025:0.0001)
        }
        
        return this.life<=0
    }
}

class Bubble {
    
    constructor(field,x,z,golden){
        
        this.golden=golden
        this.col=this.golden?[1,0.6,0.1]:[0,0.4,0.9]
        this.life=10
        this.field=field
        this.x=x
        this.z=z
        this.pos=[fieldInfo[this.field].x+this.x,fieldInfo[this.field].y+0.5,fieldInfo[this.field].z+this.z]
        this.birth=TIME
    }
    
    die(index){
        
        objects.bubbles.splice(index,1)
    }
    
    turnGolden(){
        
        if(this.golden) return
        
        this.golden=true
        this.col=[0.875*0.85,0.85*0.85,0.1*0.85]
        
        for(let i=0;i<10;i++){
            
            ParticleRenderer.add({x:this.pos[0],y:this.pos[1],z:this.pos[2],vx:MATH.random(-2,2),vy:MATH.random(0,2),vz:MATH.random(-2,2),grav:0,size:MATH.random(30,100),col:[1,1,0],life:1.75,rotVel:MATH.random(-3,3),alpha:3})
        }
    }
    
    pop(){
        
        if(player.popStarActive){
            
            player.stats.popStar+=this.golden?2:1
            player.addEffect('bubbleBloat',(this.golden?4:2)/(60*60))
        }
        
        if(player.tool==='tidePopper'){
            
            player.addEffect('tidePower')
            
            if(this.golden) player.addEffect('tidePower')
            
            if(player.tidalSurge){
                
                player.addEffect('tidalSurge',this.golden?0.00003:0.00001)
            }
        }
        
        if(player.fieldIn===this.field){
            
            objects.explosions.push(new Explosion({col:this.col,pos:this.pos.slice(),life:0.2,size:4,speed:0.5,aftershock:0.05}))
            let g=this.golden?1.5*player.bubblePollen:player.bubblePollen
            
            let p=collectPollen({x:this.x,z:this.z,pattern:[[0,0],[-1,-1],[-1,0],[-1,1],[1,-1],[1,0],[1,1],[0,1],[0,-1],[-2,0],[2,0],[0,2],[0,-2],[2,1],[2,-1],[-2,1],[-2,-1],[1,2],[-1,2],[1,-2],[-1,-2],[3,0],[-3,0],[0,-3],[0,3],[3,1],[3,-1],[1,3],[-1,3],[-1,-3],[1,-3],[-3,1],[-3,-1]],amount:{r:2,w:6,b:10},stackHeight:0.45+Math.random()*0.5,replenish:1,field:this.field,multiplier:g*player.bubbleBonus})
            
            if(this.golden&&p&&Math.random()<0.25){
                
                objects.tokens.push(new LootToken(30,[this.pos[0],this.pos[1]+0.7,this.pos[2]],'honey',Math.ceil(p*0.5),true,'Gold Bubble'))
            }
        }
        
        this.life=0
    }
    
    update(){
        
        this.life-=dt
        
        if(vec3.sqrDist(this.pos,[player.body.position.x,player.body.position.y,player.body.position.z])<=4){
            
            this.pop()
        }
        
        meshes.explosions.instanceData.push(this.pos[0],this.pos[1]+0.3,this.pos[2],this.col[0]*player.isNight,this.col[1]*player.isNight,this.col[2]*player.isNight,Math.min(this.life*0.35,this.golden?0.8:0.7),Math.min((TIME-this.birth)*15,3),1)
        
        return this.life<=0
    }
}

class Sprinkler {
    
    constructor(){
        
        this.field=null
        this.x=null
        this.z=null
        this.timer=TIME
        
        this.power=0.5
        this.rate=0.8
        this.diameter=15
        
        let p=this.power
        this.func=function(f){
            
            f.height+=p
        }
    }
    
    set(f,x,z){
        
        if(!fieldInfo[f]) return
        
        this.field=f
        this.x=x
        this.z=z
        this.timeOffset=TIME
        
        this.flowers=[]
        
        let rad=(this.diameter*0.5)|0
        
        for(let x=-rad;x<=rad;x++){
            
            for(let z=-rad;z<=rad;z++){
                
                let _x=x+this.x,_z=z+this.z
                
                if(x*x+z*z<=rad*rad&&_x>=0&&_x<fieldInfo[this.field].width&&_z>=0&&_z<fieldInfo[this.field].length){
                    
                    this.flowers.push([_x,_z])
                }
            }
        }
    }
    
    update(){
        
        if(this.field&&TIME+this.timeOffset-this.timer>this.rate){
            
            this.timer=TIME+this.timeOffset
            
            for(let i in this.flowers){
                
                updateFlower(this.field,this.flowers[i][0],this.flowers[i][1],this.func,true,false,false)
            }
            
            objects.explosions.push(new Explosion({col:[0.1,0.4,1],pos:[this.x+fieldInfo[this.field].x,fieldInfo[this.field].y+0.5,this.z+fieldInfo[this.field].z],life:1,size:this.diameter,speed:0.15,aftershock:0.01,height:0.01}))
            
        }
        
    }
}

class Mark {
    
    constructor(field,x,z,type,beeLevel){
        
        this.gummyBallHitTimer=0
        this.beeLevel=beeLevel
        this.life=((type==='precise'?12:7)+(beeLevel-1)*0.2)*player.markDuration
        this.field=field
        this.x=x
        this.z=z
        this.pos=[fieldInfo[this.field].x+this.x,fieldInfo[this.field].y+0.5,fieldInfo[this.field].z+this.z]
        this.surgeLimit=5
        this.rot=Math.random()*6.12
        
        this.diameter=(type==='precise'?12:8)
        this.sqSize=(this.diameter*0.5)*(this.diameter*0.5)
        
        this.type=type
        this.typeCol={pollenMark:[0,1,0],honeyMark:COLORS.honey_normalized,preciseMark:[1,0,1]}[this.type]
        
        this.flowers=[]
        
        let rad=(this.diameter*0.5)|0
        
        for(let x=-rad;x<=rad;x++){
            
            for(let z=-rad;z<=rad;z++){
                
                if(x*x+z*z<=rad*rad){
                    
                    this.flowers.push([x,z])
                }
            }
        }
        
    }
    
    surge(time=0){
        
        if(this.surgeLimit>0)
            this.surgeAfter=time
    }
    
    die(index){
        
        objects.marks.splice(index,1)
    }
    
    update(){
        
        this.life-=dt
        this.rot+=dt*2
        
        if(vec3.sqrDist(this.pos,[player.body.position.x,player.body.position.y,player.body.position.z])<=this.sqSize){
            
            player.addEffect(this.type)
            
            meshes.explosions.instanceData.push(this.pos[0],this.pos[1]+3.6,this.pos[2],0,1,0,1,0.45,1)
            
        } else {
            
            meshes.explosions.instanceData.push(this.pos[0],this.pos[1]+3.6,this.pos[2],0.8,0.4,0,0.85,0.45,1)
        }
        
        meshes.explosions.instanceData.push(this.pos[0],this.pos[1],this.pos[2],1,1,1,0.075,this.diameter,0.01)
        
        meshes.cylinder_explosions.instanceData.push(this.pos[0],this.pos[1]+1.5,this.pos[2],0.9*player.isNight,0.8*player.isNight,0.4*player.isNight,1,0.125,27)
        meshes.cylinder_explosions.instanceData.push(this.pos[0],this.pos[1]+3.3,this.pos[2],0.9,0.8,0.4,1,0.4,0.5)
        meshes.tokens.instanceData.push(this.pos[0],this.pos[1]+2.25,this.pos[2],this.rot,effects[this.type+'Token'].u,effects[this.type+'Token'].v,1,1.35)
        
        this.surgeAfter-=dt
        
        if(this.surgeAfter<=0){
            
            this.surgeAfter=Infinity
            this.surgeLimit--
            this.life+=1+this.beeLevel*0.1
            
            let f=this
            
            objects.explosions.push(new ReverseExplosion({col:[1,1,0],pos:f.pos,life:0.3,size:this.diameter*0.8,alpha:0.75}))
            
            if(f.type==='honeyMark'){
                
                collectPollen({x:f.x,z:f.z,pattern:f.flowers,amount:7,yOffset:2.25+Math.random()*0.5,stackOffset:0.4+Math.random()*0.6,field:this.field,instantConversion:1,multiplier:this.beeLevel*0.1+1})
                
            } else if(f.type==='pollenMark'){
                
                collectPollen({x:f.x,z:f.z,pattern:f.flowers,amount:7,yOffset:2.25+Math.random()*0.5,stackOffset:0.4+Math.random()*0.6,field:this.field,multiplier:this.beeLevel*0.1+1})
                
            } else if(f.type==='preciseMark'){
                
                collectPollen({x:f.x,z:f.z,pattern:f.flowers,amount:12,yOffset:2.25+Math.random()*0.5,stackOffset:0.4+Math.random()*0.6,field:this.field,alwaysCrit:true,multiplier:this.beeLevel*0.1+1})
            }
        }
        
        return this.life<=0
    }
}

class Frog {
    
    constructor(field,x,z,bee){
        
        this.life=25+bee.level
        this.gifted=Math.random()<0.1+0.02*bee.level&&bee.gifted
        this.mesh=this.gifted?'giftedFrog':'frog'
        this.field=field
        this.y=fieldInfo[field].y+0.75
        this.pos=[fieldInfo[field].x+x,this.y,fieldInfo[field].z+z]
        this.moveTo=[this.pos[0],this.pos[2]+0.1]
        
        this.vel=0
        this.jumpDelay=0
        this.state=0
        this.jumpCount=0
        
        //a ring of radius 4-5
        this.jumpPattern=[[-5,-3],[-5,-2],[-5,-1],[-5,0],[-5,1],[-5,2],[-5,3],[-4,-4],[-4,-3],[-4,3],[-4,4],[-3,-5],[-3,-4],[-3,4],[-3,5],[-2,-5],[-2,5],[-1,-5],[-1,5],[0,-5],[0,5],[1,-5],[1,5],[2,-5],[2,5],[3,-5],[3,-4],[3,4],[3,5],[4,-4],[4,-3],[4,3],[4,4],[5,-3],[5,-2],[5,-1],[5,0],[5,1],[5,2]]
        
    }
    
    die(index){
        
        objects.explosions.push(new Explosion({col:[0,0.5,1],pos:this.pos.slice(),life:0.2,size:4,speed:0.5,aftershock:0.05}))
        
        objects.mobs.splice(index,1)
    }
    
    update(){
        
        this.life-=dt
        
        if(this.state===0){
            
            this.jumpDelay-=dt
            
            if(this.jumpDelay<=0){
                
                this.state=1
            }
            
        } else {
            
            let dir=[this.moveTo[0]-this.pos[0],this.moveTo[1]-this.pos[2]],m=Math.sqrt(dir[0]*dir[0]+dir[1]*dir[1]),d=1/m,s=dt*d*4
            
            this.pos[0]+=dir[0]*s
            this.pos[2]+=dir[1]*s
            
            if(m<1){
                
                let index=(Math.random()*this.jumpPattern.length)|0,x=this.jumpPattern[index][0],z=this.jumpPattern[index][1]
                
                while(Math.round(this.moveTo[0]-fieldInfo[this.field].x+x)<0||Math.round(this.moveTo[0]-fieldInfo[this.field].x+x)>=fieldInfo[this.field].width||Math.round(this.moveTo[1]-fieldInfo[this.field].z+z)<0||Math.round(this.moveTo[1]-fieldInfo[this.field].z+z)>=fieldInfo[this.field].length){
                    
                    index=(Math.random()*this.jumpPattern.length)|0
                    x=this.jumpPattern[index][0]
                    z=this.jumpPattern[index][1]
                }
                
                this.moveTo=[this.moveTo[0]+x,this.moveTo[1]+z]
                
                this.state=0
                this.jumpDelay=0.5
                this.vel=0.12
                this.pos[1]=this.y
                this.jumpCount++
                
                if(this.jumpCount%3!==0)
                    objects.bubbles.push(new Bubble(this.field,(this.pos[0]-fieldInfo[this.field].x)|0,(this.pos[2]-fieldInfo[this.field].z)|0))
                
                for(let i in objects.tokens){
                    
                    let b=objects.tokens[i]
                    
                    if(!b.collected&&vec3.sqrDist(b.pos,this.pos)<(this.gifted?14:9)&&Math.random()<(this.gifted?0.25:0.4)){
                        
                        objects.explosions.push(new Explosion({col:[0.9,0,0.15],pos:b.pos.slice(),life:1.25,size:1.8,speed:0.2,aftershock:0.005}))
                        let bx=(b.pos[0]-fieldInfo[this.field].x)|0,bz=(b.pos[2]-fieldInfo[this.field].z)|0
                        
                        if(bx>=0&&bx<fieldInfo[this.field].width&&bz>=0&&bz<fieldInfo[this.field].length)
                            objects.bubbles.push(new Bubble(this.field,bx,bz))
                        
                        b.collect()
                        break
                    }
                }
            }
            
            this.pos[3]=Math.atan2(dir[1]*d,dir[0]*d)+MATH.HALF_PI
            this.vel-=dt*0.2
            this.pos[1]=Math.max(this.pos[1]+this.vel,this.y)
        
        }
        
        gl.bindBuffer(gl.ARRAY_BUFFER,meshes[this.mesh].vertBuffer)
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,meshes[this.mesh].indexBuffer)
        gl.vertexAttribPointer(glCache.mob_vertPos,3,gl.FLOAT,gl.FLASE,24,0)
        gl.vertexAttribPointer(glCache.mob_vertColor,3,gl.FLOAT,gl.FLASE,24,12)
        gl.uniform4fv(glCache.mob_instanceInfo1,this.pos)
        gl.uniform2f(glCache.mob_instanceInfo2,0.9,1)
        gl.drawElements(gl.TRIANGLES,meshes[this.mesh].indexAmount,gl.UNSIGNED_SHORT,0)
        
        return this.life<=0
    }
}



//for identification of balloons cuz the indexes cant be used
let globalBalloonID=0

class Balloon {
    
    constructor(field,x,z,golden,beeLevel=0){
        
        this.id=globalBalloonID++
        this.golden=golden
        this.col=this.golden?[0.875*0.85,0.85*0.85,0.1*0.85,0.8]:[0,0,0.6,0.7]
        this.checkBubble=TIME
        this.life=20+beeLevel
        this.field=field
        this.x=x
        this.z=z
        this._x=x
        this._z=z
        this.moveTo=[fieldInfo[this.field].x+this.x,fieldInfo[this.field].z+this.z]
        this.moveDir=[0,0]
        this.pos=[fieldInfo[this.field].x+this.x,fieldInfo[this.field].y+0.55+4,fieldInfo[this.field].z+this.z]
        this.y=fieldInfo[this.field].y+0.55+4
        this.pollen=0
        this.cap=Math.round(player.capacity*(this.golden?0.4:0.35)*(beeLevel*0.0375+1))
        this.invCap=1/this.cap
        this.displaySize=0
        this.state='float'
        this.inflateCounter=4+((beeLevel*(4/20))|0)+(fieldInfo[this.field].generalColorComp.b>=0.5?4:fieldInfo[this.field].generalColorComp.w>=0.5?2:0)
        
        this.prevFlowers=[]
        this.flowers=[]
        
        let rad=4,sqRad=3.2*3.2
        
        for(let x=-rad;x<=rad;x++){
            
            for(let z=-rad;z<=rad;z++){
                
                if(x*x+z*z<=sqRad){
                    
                    this.flowers.push([x,z])
                }
            }
        }
    }
    
    die(index,deflated=false){
        
        if(deflated===false){
            
            player.hiveBalloon.pollen+=this.pollen
            player.hiveBalloon.maxPollen+=this.pollen
            
        }
        
        objects.balloons.splice(index,1)
    }
    
    update(){
        
        if(this.state==='float'){
            
            this.life-=dt
            
            this.pos[0]+=this.moveDir[0]*dt
            this.pos[2]+=this.moveDir[1]*dt
            
            this.x=Math.round(this.pos[0]-fieldInfo[this.field].x)
            this.z=Math.round(this.pos[2]-fieldInfo[this.field].z)
            if(this.x!==this._x||this.z!==this._z){
                
                for(let j in this.prevFlowers){
                    
                    flowers[this.field][this.prevFlowers[j][1]][this.prevFlowers[j][0]].balloon=false
                        
                }
                
                this.prevFlowers=[]
                
                for(let j in this.flowers){
                    
                    let f=this.flowers[j]
                    
                    let nx=f[0]+this.x,nz=f[1]+this.z
                    
                    if(nx>=0&&nx<fieldInfo[this.field].width&&nz>=0&&nz<fieldInfo[this.field].length){
                        
                        flowers[this.field][nz][nx].balloon=this
                        this.prevFlowers.push([nx,nz])
                    }
                }
            }
            
            this._x=this.x
            this._z=this.z
            
            this.pollen=Math.min(Math.round(this.pollen),this.cap)
            
            let t=this.pollen*this.invCap-1
            
            t*=t
            t*=t
            
            this.size=(1-t)*(1.4+this.pollen.toString().length*0.075)+0.8
            
            this.displaySize+=(this.size-this.displaySize)*0.025
            this.pos[1]=this.y+this.displaySize*0.5-1
            
            meshes.cylinder_explosions.instanceData.push(this.pos[0],this.pos[1]-this.displaySize*0.5-1,this.pos[2],player.isNight,player.isNight,player.isNight,0.5,0.03,67)
            meshes.explosions.instanceData.push(this.pos[0],this.pos[1],this.pos[2],this.col[0]*player.isNight,this.col[1]*player.isNight,this.col[2]*player.isNight,this.col[3],this.displaySize,1.03)
            
            meshes.explosions.instanceData.push(this.pos[0],this.y-4,this.pos[2],0,0,0,0.35,7,0.01)
            
            textRenderer.addSingle(this.pollen+'/'+this.cap,this.pos,COLORS.whiteArr,-0.465,true,true,0.175)
            
            textRenderer.addDecalRaw(...this.pos,0,0,...textRenderer.decalUV['rect'],0,0.4,0,1,0.25,0)
            
            textRenderer.addDecalRaw(...this.pos,(-0.5+(this.pollen*this.invCap)*0.5)/(this.pollen*this.invCap),0,...textRenderer.decalUV['rect'],0.1,0.85,0.1,this.pollen*this.invCap,0.25,0)
            textRenderer.addDecalRaw(...this.pos,1.1,-0.1,...textRenderer.decalUV['flower'],1,1,1,-0.44,-0.44,0)
            
            if(vec3.sqrDist(this.pos,[player.body.position.x,player.body.position.y+4,player.body.position.z])<=6.25){
                
                player.addEffect('balloonAura')
                
            }
            
            if(Math.abs(this.pos[0]-this.moveTo[0])+Math.abs(this.pos[2]-this.moveTo[1])<1){
                
                this.moveTo=[fieldInfo[this.field].x+((Math.random()*fieldInfo[this.field].width)|0),fieldInfo[this.field].z+((Math.random()*fieldInfo[this.field].length)|0)]
                
                this.moveDir=[this.moveTo[0]-this.pos[0],this.moveTo[1]-this.pos[2]]
                
                vec2.normalize(this.moveDir,this.moveDir)
                vec2.scale(this.moveDir,this.moveDir,0.35)
            }
            
            if(this.golden&&TIME-this.checkBubble>0.5){
                
                this.checkBubble=TIME
                
                for(let j in objects.bubbles){
                    
                    let b=objects.bubbles[j]
                    
                    if(Math.abs(this.pos[0]-b.pos[0])+Math.abs(this.pos[2]-b.pos[2])<3.5){
                        
                        b.turnGolden()
                    }
                }
            }
            
            if(this.life<=0||this.pollen>=this.cap){
                
                this.state='moveToHive'
                
                this.moveDir=vec3.sub([],[player.hivePos[0]+1.5,player.hivePos[1],player.hivePos[2]],this.pos)
                vec3.normalize(this.moveDir,this.moveDir)
                
                for(let i in this.flowers){
                    
                    let x=this.flowers[i][0]+this.x,
                        z=this.flowers[i][1]+this.z
                    
                    if(x>=0&&x<fieldInfo[this.field].width&&z>=0&&z<fieldInfo[this.field].length){
                    flowers[this.field][z][x].balloon=false
                    }
                }
            }
            
        } else {
            
            this.pollen=Math.min(Math.round(this.pollen),this.cap)
            
            let t=this.pollen*this.invCap-1
            
            t*=t
            t*=t
            
            this.size=(1-t)*(1.4+this.pollen.toString().length*0.075)+0.8
            
            this.displaySize+=(this.size-this.displaySize)*0.025
            
            vec3.scaleAndAdd(this.pos,this.pos,this.moveDir,dt)
            
            meshes.cylinder_explosions.instanceData.push(this.pos[0],this.pos[1]-this.displaySize*0.5-1,this.pos[2],player.isNight,player.isNight,player.isNight,0.5,0.03,67)
            
            meshes.explosions.instanceData.push(this.pos[0],this.pos[1],this.pos[2],this.col[0]*player.isNight,this.col[1]*player.isNight,this.col[2]*player.isNight,this.col[3],this.displaySize,1.05)
            
            textRenderer.addSingle(this.pollen+'/'+this.cap,this.pos,COLORS.whiteArr,-0.465,true,true,0.175)
            
            textRenderer.addDecalRaw(...this.pos,1.1,-0.1,...textRenderer.decalUV['flower'],1,1,1,-0.44,-0.44,0)
            
            
            
            if(vec3.sqrDist(this.pos,player.hivePos)<9){
                
                return true
            }
        }
    }
}

class Target {
    
    constructor(field,x,z,type,bee){
        
        this.bee=bee
        this.field=field
        this.x=x
        this.z=z
        this.type=type
        this.pos=[fieldInfo[this.field].x+this.x,fieldInfo[this.field].y+0.51,fieldInfo[this.field].z+this.z]
        this.col=this.type===3?[0.9,0,0.9]:[1,0.7,0]
        
        this.trail=new TrailRenderer.Trail({length:2,size:0.025,color:[1,0,0,1]})
    }
    
    die(index){
        
        this.trail.splice=true
        
        objects.explosions.push(new ReverseExplosion({col:this.activated?[0,1,0]:[1,0,0],pos:this.pos,life:0.5,size:3,alpha:1,height:3}))
        
        if(vec3.sqrDist(this.pos,[player.body.position.x,player.body.position.y,player.body.position.z])<=4){
            
            let amountToConvert=Math.min((player.convertTotal*0.5)+(10*this.bee.convertAmount*player.convertRate)*(player.flameHeatStack*5),player.pollen)
            
            player.pollen-=amountToConvert
            
            if(player.setting_enablePollenText)
                textRenderer.add(Math.ceil(amountToConvert*0.5),[player.body.position.x,player.body.position.y+Math.random()*2+0.5,player.body.position.z],COLORS.honey,0,'+')
            
            let hpt=amountToConvert/5
            
            for(let i=0;i<MATH.TWO_PI;i+=MATH.TWO_PI/5){
                
                objects.tokens.push(new LootToken(30,[this.pos[0]+Math.cos(i),fieldInfo[this.field].y+1,this.pos[2]+Math.sin(i)],'honey',Math.ceil(hpt),true,'Target Practice'))
            }
            
            player.addEffect('flameHeat',-1)
        }
        
        objects.targets.splice(index,1)
    }
    
    update(){
        
        this.trail.addPos(this.pos)
        this.trail.addPos(this.bee.pos)
        this.trail.color=[...this.col,0.75]
        
        if(vec3.sqrDist(this.pos,[player.body.position.x,player.body.position.y,player.body.position.z])<=4){
            
            this.col=[0,1,0]
            this.activated=true
        }
        
        meshes.explosions.instanceData.push(this.pos[0],this.pos[1],this.pos[2],this.col[0],this.col[1],this.col[2],0.5,1.8,0.001)
        
        return this.splice
    }
}

class Triangulate {
    
    constructor(bee,tokenPos){
        
        this.life=MATH.random(2.9,3.1)
        this.field=player.fieldIn
        this.tokenPos=tokenPos
        this.bee=bee
        this.mesh=new Mesh(true)
        this.offset=(Math.random()-0.5)*0.075
    }
    
    die(index){
        
        //smort grid-triangle thing i came up with, also decently fast
        let px=Math.round(player.body.position.x-fieldInfo[this.field].x),
            pz=Math.round(player.body.position.z-fieldInfo[this.field].z),
            tx=Math.round(this.tokenPos[0]-fieldInfo[this.field].x),
            tz=Math.round(this.tokenPos[2]-fieldInfo[this.field].z),
            bx=Math.round(this.bee.pos[0]-fieldInfo[this.field].x),
            bz=Math.round(this.bee.pos[2]-fieldInfo[this.field].z),
            minX=Math.min(Math.min(bx,px),tx),
            maxX=Math.max(Math.max(bx,px),tx),
            minZ=Math.min(Math.min(bz,pz),tz),
            maxZ=Math.max(Math.max(bz,pz),tz)
        
        minX=MATH.constrain(minX,0,fieldInfo[this.field].width)
        maxX=MATH.constrain(maxX,0,fieldInfo[this.field].width)
        minZ=MATH.constrain(minZ,0,fieldInfo[this.field].length)
        maxZ=MATH.constrain(maxZ,0,fieldInfo[this.field].length)
        
        let f=[]
        
        for(let x=minX;x<maxX;x++){
            
            for(let z=minZ;z<maxZ;z++){
                
                if(MATH.pointInTriangle(x,z,px,pz,tx,tz,bx,bz)){
                    
                    f.push([x,z])
                }
            }
        }
        
        for(let i in objects.tokens){
            
            if(MATH.pointInTriangle(Math.round(objects.tokens[i].pos[0]-fieldInfo[this.field].x),Math.round(objects.tokens[i].pos[2]-fieldInfo[this.field].z),px,pz,tx,tz,bx,bz)){
                
                objects.tokens[i].collect()
            }
        }
        
        let containsPollenMark=1,containsHoneyMark,containsPreciseMark,extraPollenFromMarks=1
        
        for(let i in objects.marks){
            
            if(MATH.pointInTriangle(objects.marks[i].x,objects.marks[i].z,px,pz,tx,tz,bx,bz)){
                
                extraPollenFromMarks=1.5
                
                if(objects.marks[i].type==='pollenMark'){
                    
                    containsPollenMark=2
                    
                } else if(objects.marks[i].type==='honeyMark'){
                    
                    containsHoneyMark=true
                    
                } else {
                    
                    containsPreciseMark=true
                }
            }
        }
        
        collectPollen({x:0,z:0,pattern:f,amount:10+this.bee.level*2,yOffset:2.5,stackHeight:0.8,field:this.field,otherPos:[(minX+maxX)*0.5+fieldInfo[this.field].x,player.body.position.y+0.5,(minZ+maxZ)*0.5+fieldInfo[this.field].z],multiplier:{r:extraPollenFromMarks,b:extraPollenFromMarks,w:containsPollenMark*extraPollenFromMarks},alwaysCrit:containsPreciseMark,instantConversion:containsHoneyMark?0.5:0})
        
        objects.explosions.push(new ReverseExplosion({col:[1,1,1],pos:this.bee.pos.slice(),life:0.25,size:2,alpha:1,height:1}))
        objects.explosions.push(new ReverseExplosion({col:[1,1,1],pos:this.tokenPos,life:0.25,size:2,alpha:1,height:1}))
        objects.explosions.push(new ReverseExplosion({col:[1,1,1],pos:[player.body.position.x,player.body.position.y,player.body.position.z],life:0.25,size:2,alpha:1,height:1}))
        
        objects.triangulates.splice(index,1)
    }
    
    update(){
        
        this.life-=dt
        
        let c=Math.max(1-this.life*0.25,0.2)
        
        this.mesh.setMesh([
            
            this.tokenPos[0],this.tokenPos[1]+this.offset,this.tokenPos[2],c,c,c,1,0,0,0,
            this.bee.pos[0],this.tokenPos[1]+this.offset,this.bee.pos[2],c,c,c,1,0,0,0,
            player.body.position.x,this.tokenPos[1]+this.offset,player.body.position.z,c,c,c,1,0,0,0,
            
        ],[0,1,2,2,1,0])
        
        this.mesh.setBuffers()
        this.mesh.render()
        
        return this.life<=0
    }
}

class FuzzBomb {
    
    constructor(field,beeLevel){
        
        this.beeLevel=beeLevel
        this.life=5+(beeLevel-1)*0.25
        this.field=field
        this.x=(fieldInfo[field].width*Math.random())|0
        this.z=(fieldInfo[field].length*Math.random())|0
        this.pos=[fieldInfo[this.field].x+this.x,fieldInfo[this.field].y+0.5,fieldInfo[this.field].z+this.z]
        this.moveTo=[this.pos[0],this.pos[1]]
        this.moveTimer=0
        this.moveTo=[((Math.random()*fieldInfo[this.field].width)|0)+fieldInfo[this.field].x,fieldInfo[this.field].y+0.5,((Math.random()*fieldInfo[this.field].length)|0)+fieldInfo[this.field].z]
        
        objects.explosions.push(new Explosion({col:[0.5,0.2,0],pos:this.pos.slice(),life:0.4,size:4,speed:0.5,aftershock:0.05}))
    }
    
    die(index){
        
        objects.fuzzBombs.splice(index,1)
    }
    
    pop(){
        
        if(player.fieldIn===this.field){
            
            this.x=Math.round(this.pos[0]-fieldInfo[this.field].x)
            this.z=Math.round(this.pos[2]-fieldInfo[this.field].z)
            objects.explosions.push(new Explosion({col:[0.5,0.2,0],pos:this.pos.slice(),life:0.4,size:4,speed:0.5,aftershock:0.05}))
            let p=[[0,0],[-1,-1],[-1,0],[-1,1],[1,-1],[1,0],[1,1],[0,1],[0,-1],[0,2],[2,0],[-2,0],[0,-2],[-1,2],[1,2],[2,-1],[2,1],[-1,-2],[1,-2],[-2,1],[-2,-1],[3,0],[-3,0],[0,-3],[0,3]]
            
            for(let i in p){
                
                let x=p[i][0]+this.x,z=p[i][1]+this.z
                
                if(x>=0&&x<fieldInfo[this.field].width&&z>=0&&z<fieldInfo[this.field].length){
                    
                    updateFlower(this.field,x,z,function(f){
                        
                        if(f.level<5){
                            
                            f.level++
                            f.pollinationTimer=1
                            
                        } else {
                            
                            f.height=1
                        }
                        
                    },true,false,true)
                }
            }
            
            collectPollen({x:this.x,z:this.z,pattern:p,amount:{r:10,w:15,b:10},stackOffset:0.35+Math.random()*0.7,multiplier:player.whiteBombPollen+this.beeLevel*0.075,field:this.field})
            
            player.addEffect('bombCombo')
            
            for(let j=0;j<40;j++){
                
                ParticleRenderer.add({x:this.pos[0]+MATH.random(-2,2),y:this.pos[1],z:this.pos[2]+MATH.random(-2,2),vx:MATH.random(-1,1),vy:Math.random()*2,vz:MATH.random(-1,1),grav:-3,size:100,col:[1,1,MATH.random(0.6,1)],life:1,rotVel:MATH.random(-3,3),alpha:2})
            }
            
        }
        
        this.life=0
    }
    
    update(){
        
        this.life-=dt
        this.moveTimer-=dt
        
        if(this.moveTimer<=0){
            
            this.moveTimer=1
            let md=[[0,0,1],[1,0,0]][(Math.random()*2)|0]
            
            if(md[2]===0){
                
                let px=Math.round(this.pos[0]-fieldInfo[this.field].x),
                am=MATH.random(-px,fieldInfo[this.field].width-px)
                am|=0
                this.movePos=vec3.scale([],md,am)
                vec3.add(this.movePos,this.movePos,this.pos)
            }
            
            if(md[0]===0){
                
                let pz=Math.round(this.pos[2]-fieldInfo[this.field].z),
                am=MATH.random(-pz,fieldInfo[this.field].length-pz)
                am|=0
                this.movePos=vec3.scale([],md,am)
                vec3.add(this.movePos,this.movePos,this.pos)
            }
        }
        
        this.pos[0]+=(this.movePos[0]-this.pos[0])*dt*5
        this.pos[2]+=(this.movePos[2]-this.pos[2])*dt*5
        
        if(vec3.sqrDist(this.pos,[player.body.position.x,player.body.position.y,player.body.position.z])<=4){
            
            this.pop()
        }
        
        meshes.explosions.instanceData.push(this.pos[0],this.pos[1],this.pos[2],0.5,0.2,0,Math.min(this.life,0.85),1.25,1)
        
        return this.life<=0
    }
}

class PetalShuriken {
    
    constructor(pos,vel){
        
        this.pos=[...pos,0]
        this.vel=vel
        this.life=1.5
        
        vec3.scale(vel,vel,10)
        
        this.hitBees=[]
    }
    
    die(index){
        
        objects.mobs.splice(index,1)
    }
    
    update(){
        
        this.life-=dt
        
        this.pos[0]+=this.vel[0]*dt
        this.pos[2]+=this.vel[2]*dt
        this.pos[3]+=dt*10
        
        for(let i in objects.bees){
            
            let b=objects.bees[i]
            
            if(this.hitBees.indexOf(i)<0&&Math.abs(b.pos[0]-this.pos[0])+Math.abs(b.pos[1]-this.pos[1])+Math.abs(b.pos[2]-this.pos[2])<1){
                
                objects.explosions.push(new Explosion({col:Math.random()<0.5?[1,0.9,0]:[1,0,0.825],pos:this.pos.slice(),life:0.5,size:1.2,speed:0.35,aftershock:0.005}))
                
                this.hitBees.push(i)
                
                let amountToConvert=Math.ceil(Math.min(player.pollen,10000+b.convertAmount*7.5))
                
                player.pollen-=amountToConvert
                player.honey+=amountToConvert
                
                if(amountToConvert)
                    textRenderer.add(amountToConvert.toString(),[b.pos[0],b.pos[1]+0.75,b.pos[2]],COLORS.honey,1,'⇆')
            }
        }
        
        for(let i in objects.bubbles){
            
            let b=objects.bubbles[i]
            
            if(vec3.sqrDist(this.pos,b.pos)<=4.5){
                
                b.pop()
            }
        }
        
        for(let i in objects.fuzzBombs){
            
            let b=objects.fuzzBombs[i]
            
            if(vec3.sqrDist(this.pos,b.pos)<=3.5){
                
                b.pop()
            }
        }
        
        for(let i in objects.tokens){
            
            let b=objects.tokens[i]
            
            if(vec3.sqrDist(this.pos,b.pos)<=3.5){
                
                b.collect()
            }
        }
        
        gl.bindBuffer(gl.ARRAY_BUFFER,meshes.petalShuriken.vertBuffer)
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,meshes.petalShuriken.indexBuffer)
        gl.vertexAttribPointer(glCache.mob_vertPos,3,gl.FLOAT,gl.FLASE,24,0)
        gl.vertexAttribPointer(glCache.mob_vertColor,3,gl.FLOAT,gl.FLASE,24,12)
        gl.uniform4fv(glCache.mob_instanceInfo1,this.pos)
        gl.uniform2f(glCache.mob_instanceInfo2,1,this.life)
        gl.drawElements(gl.TRIANGLES,meshes.petalShuriken.indexAmount,gl.UNSIGNED_SHORT,0)
    
        return this.life<=0
    }
}

class Beetle {
    
    constructor(spawnPos,bounds,level,health){
        
        this.starSawHitTimer=0
        this.level=level
        this.health=health||(level-1)*100+5000000
        this.maxHealth=this.health
        this.spawnPos=spawnPos
        this.pos=spawnPos
        this.state='hide'
        this.bounds=bounds
        this.checkTimer=TIME
        this.respawnTimer=0
        this.flameTimer=0
    }
    
    die(index){
        
        objects.mobs.splice(index,1)
    }
    
    damage(am){
        
        let crit=Math.random()<player.criticalChance,superCrit=Math.random()<player.superCritChance,d=am*(crit?superCrit?player.superCritPower*player.criticalPower:player.criticalPower:1)
        
        this.health-=d|0
        textRenderer.add((d|0)+'',[this.pos[0],this.pos[1]+Math.random()*2.75+1.5,this.pos[2]],[255,0,0],crit?superCrit?2:1:0,'',1.25)
        
    }
    
    update(){
        
        switch(this.state){
            
            case 'hide':
                
                if(TIME-this.checkTimer>0.5){
                    
                    this.checkTimer=TIME+Math.random()*0.2
                    let b=this.bounds,p=player.body.position
                    
                    if(p.x>b.minX&&p.x<b.maxX&&p.y>b.minY&&p.y<b.maxY&&p.z>b.minZ&&p.z<b.maxZ){
                        
                        this.state='attack'
                        this.pos=this.spawnPos.slice()
                    }
                }
                
            break
            
            case 'attack':
                
                if(this.health<=0){
                    
                    player.stats.rhinoBeetle++
                    this.state='dead'
                    this.respawnTimer=30
                    
                    let amountOfTokens=Math.min(5+player.lootLuck-1,this.level+5+(MATH.random(1,3)|0)),radius=amountOfTokens*0.2+1.5
                    
                    let dropTable=[['blueExtract',0.05,0.005],['blueberry',0.35,0.3]]
                    
                    for(let i=0,inc=MATH.TWO_PI/amountOfTokens;i<MATH.TWO_PI;i+=inc){
                        
                        let itemFound
                        
                        for(let j in dropTable){
                            
                            let r=Math.random()
                            
                            r=((r-1)/(player.lootLuck))+1
                            
                            if(r<dropTable[j][1]&&Math.random()<0.8){
                                
                                objects.tokens.push(new LootToken(45,[this.pos[0]+Math.cos(i)*radius,this.pos[1],this.pos[2]+Math.sin(i)*radius],dropTable[j][0],Math.ceil(this.level*MATH.random(0,1.3+player.lootLuck*dropTable[j][2])),true,'Rhino Beetle'))
                                itemFound=true
                                
                                break
                            }
                        }
                        
                        if(!itemFound){
                            
                            objects.tokens.push(new LootToken(45,[this.pos[0]+Math.cos(i)*radius,this.pos[1],this.pos[2]+Math.sin(i)*radius],'honey',(this.maxHealth*MATH.random(0.65,1.35*player.lootLuck))|0,true,'Rhino Beetle'))
                        }
                    }
                    
                    return
                }
                
                this.starSawHitTimer-=dt
                this.flameTimer-=dt
                
                if(this.flameTimer<=0){
                    
                    this.flameTimer=1
                    
                    for(let f in objects.flames){
                        
                        if(Math.abs(this.pos[0]-objects.flames[f].pos[0])+Math.abs(this.pos[2]-objects.flames[f].pos[2])<2.25){
                            
                            this.damage(objects.flames[f].dark?25:15)
                        }
                    }
                }
                
                player.attacked.push(this)
                
                if(TIME-this.checkTimer>0.25){
                    
                    this.checkTimer=TIME+Math.random()*0.2
                    let b=this.bounds,p=player.body.position
                    
                    if(!(p.x>b.minX&&p.x<b.maxX&&p.y>b.minY&&p.y<b.maxY&&p.z>b.minZ&&p.z<b.maxZ)){
                        
                        this.state='moveToHide'
                    }
                }
                
                let d=[player.body.position.x-this.pos[0],player.body.position.z-this.pos[2]]
                
                vec2.normalize(d,d)
                
                if(!this.aimPos){
                    
                    if(Math.abs(player.body.position.x-this.pos[0])+Math.abs(player.body.position.z-this.pos[2])>5){
                        
                        this.pos[0]+=d[0]*dt*4
                        this.pos[2]+=d[1]*dt*4
                        
                    } else {
                        
                        this.aimPos=[player.body.position.x,player.body.position.y,player.body.position.z]
                        this.landPos=this.pos.slice()
                        this.lungeState=0
                        this.aimTimer=1.5
                    }
                    
                } else {
                    
                    this.aimTimer-=dt
                    
                    if(this.aimTimer<=0){
                        
                        if(!this.lungeState){
                            
                            d=[this.aimPos[0]-this.pos[0],this.aimPos[2]-this.pos[2]]
                    
                            vec2.normalize(d,d)
                            
                            this.pos[0]+=d[0]*dt*15
                            this.pos[2]+=d[1]*dt*15
                            
                            if(Math.abs(this.aimPos[0]-this.pos[0])+Math.abs(this.aimPos[2]-this.pos[2])<1.5){
                                
                                this.lungeState=1
                                
                                if(Math.abs(player.body.position.x-this.pos[0])+Math.abs(player.body.position.z-this.pos[2])<1.75){
                                    player.damage(20)
                                }
                            }
                            
                        } else {
                            
                            d=[this.landPos[0]-this.pos[0],this.landPos[2]-this.pos[2]]
                    
                            vec2.normalize(d,d)
                            
                            this.pos[0]+=d[0]*dt*15
                            this.pos[2]+=d[1]*dt*15
                            
                            if(Math.abs(this.landPos[0]-this.pos[0])+Math.abs(this.landPos[2]-this.pos[2])<0.75){
                                
                                this.aimPos=undefined
                                this.aimTimer=1.5
                            }
                        }
                    }
                }
                
                this.pos[3]=Math.atan2(d[1],d[0])+MATH.HALF_PI
                
                gl.uniform4fv(glCache.mob_instanceInfo1,this.pos)
                gl.uniform2f(glCache.mob_instanceInfo2,1,1)
                gl.bindBuffer(gl.ARRAY_BUFFER,meshes.beetle.vertBuffer)
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,meshes.beetle.indexBuffer)
                gl.vertexAttribPointer(glCache.mob_vertPos,3,gl.FLOAT,gl.FLASE,24,0)
                gl.vertexAttribPointer(glCache.mob_vertColor,3,gl.FLOAT,gl.FLASE,24,12)
                gl.drawElements(gl.TRIANGLES,meshes.beetle.indexAmount,gl.UNSIGNED_SHORT,0)
                
                this.pos[1]+=1
                textRenderer.addCTX('Rhino Beetle (Level '+this.level+')',[this.pos[0],this.pos[1]+0.4,this.pos[2]],COLORS.whiteArr,100)
                
                textRenderer.addDecalRaw(this.pos[0],this.pos[1],this.pos[2],0,0,...textRenderer.decalUV['rect'],0.6,0,0,2.5,0.4,0)
                textRenderer.addDecalRaw(this.pos[0],this.pos[1],this.pos[2],(-0.5+(this.health/this.maxHealth)*0.5)/(this.health/this.maxHealth),0,...textRenderer.decalUV['rect'],0.2,0.85,0.2,this.health*2.5/this.maxHealth,0.4,0)
                
                textRenderer.addSingle('HP: '+MATH.addCommas((this.health|0)+''),this.pos,COLORS.whiteArr,-1,false,false)
                this.pos[1]-=1
                
            break
            
            case 'moveToHide':
                
                let b=this.bounds,p=player.body.position
                
                if(p.x>b.minX&&p.x<b.maxX&&p.y>b.minY&&p.y<b.maxY&&p.z>b.minZ&&p.z<b.maxZ){
                    
                    this.state='attack'
                    return
                }
                
                if(Math.abs(this.spawnPos[0]-this.pos[0])+Math.abs(this.spawnPos[2]-this.pos[2])<1){
                    
                    this.state='hide'
                    return
                }
                
                let _d=[this.spawnPos[0]-this.pos[0],this.spawnPos[2]-this.pos[2]]
                
                vec2.normalize(_d,_d)
                
                this.pos[0]+=_d[0]*dt*4
                this.pos[2]+=_d[1]*dt*4
                
                this.pos[3]=Math.atan2(_d[1],_d[0])+MATH.HALF_PI
                
                gl.uniform4fv(glCache.mob_instanceInfo1,this.pos)
                gl.uniform2f(glCache.mob_instanceInfo2,1,1)
                gl.bindBuffer(gl.ARRAY_BUFFER,meshes.beetle.vertBuffer)
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,meshes.beetle.indexBuffer)
                gl.vertexAttribPointer(glCache.mob_vertPos,3,gl.FLOAT,gl.FLASE,24,0)
                gl.vertexAttribPointer(glCache.mob_vertColor,3,gl.FLOAT,gl.FLASE,24,12)
                gl.drawElements(gl.TRIANGLES,meshes.beetle.indexAmount,gl.UNSIGNED_SHORT,0)
                
                this.pos[1]+=1
                textRenderer.addCTX('Rhino Beetle (Level '+this.level+')',[this.pos[0],this.pos[1]+0.4,this.pos[2]],COLORS.whiteArr,100)
                
                textRenderer.addDecalRaw(this.pos[0],this.pos[1],this.pos[2],0,0,...textRenderer.decalUV['rect'],0.6,0,0,2.5,0.4,0)
                textRenderer.addDecalRaw(this.pos[0],this.pos[1],this.pos[2],(-0.5+(this.health/this.maxHealth)*0.5)/(this.health/this.maxHealth),0,...textRenderer.decalUV['rect'],0.2,0.85,0.2,this.health*2.5/this.maxHealth,0.4,0)
                
                textRenderer.addSingle('HP: '+MATH.addCommas((this.health|0)+''),this.pos,COLORS.whiteArr,-1,false,false)
                this.pos[1]-=1
                
            break
            
            case 'dead':
                
                this.respawnTimer-=dt
                
                if(this.respawnTimer<=0){
                    
                    this.state='hide'
                    this.health=this.maxHealth
                }
                
            break
        }
        
    }
}

class MondoChick {
    
    constructor(field,level){
        
        this.field=field
        this.state='attack'
        this.starSawHitTimer=0
        this.level=level
        this.health=300000
        this.maxHealth=this.health
        this.spawnPos=[fieldInfo[this.field].x+0.5*fieldInfo[this.field].width,fieldInfo[this.field].y+2.5,fieldInfo[this.field].z+0.5*fieldInfo[this.field].length]
        this.pos=this.spawnPos
        this.checkTimer=TIME
        this.flameTimer=0
        this.waitTimer=0
        this.target=[this.pos[0],this.pos[2]]
        this.damageTimer=0
        this.bodySize=2.25
        this.timeLimit=10*60
        this.maxTimeLimit=this.timeLimit
        this.fallenEggShellEffect=0
    }
    
    die(index){
        
        objects.mobs.splice(index,1)
    }
    
    damage(am){
        
        let crit=Math.random()<player.criticalChance,superCrit=Math.random()<player.superCritChance,d=am*(crit?superCrit?player.superCritPower*player.criticalPower:player.criticalPower:1)
        
        this.health-=d|0
        textRenderer.add((d|0)+'',[this.pos[0],this.pos[1]+Math.random()*2.75+1.5,this.pos[2]],[255,0,0],crit?superCrit?2:1:0,'',1.25)
        
    }
    
    update(){
        
        switch(this.state){
            
            case 'dead':
                
                return true
                
            break
            
            case 'attack':
                
                if(this.health<=0||this.timeLimit<=0){
                    
                    // player.stats.mondoChicken++
                    this.state='dead'
                    
                    return
                }
                
                this.timeLimit-=dt
                this.starSawHitTimer-=dt
                this.flameTimer-=dt
                
                if(this.flameTimer<=0){
                    
                    this.flameTimer=1
                    
                    for(let f in objects.flames){
                        
                        if(Math.abs(this.pos[0]-objects.flames[f].pos[0])+Math.abs(this.pos[2]-objects.flames[f].pos[2])<this.bodySize){
                            
                            this.damage(objects.flames[f].dark?25:15)
                        }
                    }
                }
                
                if(player.fieldIn===this.field){
                    
                    player.attacked.push(this)
                }
                
                let d=[this.target[0]-this.pos[0],this.target[1]-this.pos[2]]
                if(Math.abs(d[0])+Math.abs(d[1])<0.75){
                    
                    this.target=[fieldInfo[this.field].x+MATH.random(0.2,0.8)*fieldInfo[this.field].width,fieldInfo[this.field].z+MATH.random(0.2,0.8)*fieldInfo[this.field].length]
                    d=[this.target[0]-this.pos[0],this.target[1]-this.pos[2]]
                    if(Math.random()<0.25) this.waitTimer=5
                    
                }
                
                vec2.normalize(d,d)
                
                this.running=false
                this.waitTimer-=dt
                
                if(this.waitTimer<=0){
                    
                    this.pos[0]+=d[0]*dt*6
                    this.pos[2]+=d[1]*dt*6
                    this.running=true
                }
                
                this.damageTimer-=dt
                
                if(Math.abs(player.body.position.x-this.pos[0])+Math.abs(player.body.position.z-this.pos[2])<this.bodySize&&this.damageTimer<=0){
                    
                    player.damage(35)
                    this.damageTimer=1
                }
                
                this.pos[1]+=1
                textRenderer.addCTX('Mondo Chick (Level '+this.level+')',[this.pos[0],this.pos[1]+0.9,this.pos[2]],COLORS.whiteArr,100)
                textRenderer.addDecalRaw(this.pos[0],this.pos[1],this.pos[2],0,1.5,...textRenderer.decalUV['rect'],0.61*0.5,0.42*0.5,0.27*0.5,2.5,0.4,0)
                textRenderer.addDecalRaw(this.pos[0],this.pos[1],this.pos[2],(-0.5+(this.timeLimit/this.maxTimeLimit)*0.5)/(this.timeLimit/this.maxTimeLimit),1.5,...textRenderer.decalUV['rect'],0.61,0.42,0.27,this.timeLimit*2.5/this.maxTimeLimit,0.4,0)
                
                textRenderer.addDecalRaw(this.pos[0],this.pos[1],this.pos[2],0,0,...textRenderer.decalUV['rect'],0.6,0,0,2.5,0.4,0)
                textRenderer.addDecalRaw(this.pos[0],this.pos[1],this.pos[2],(-0.5+(this.health/this.maxHealth)*0.5)/(this.health/this.maxHealth),0,...textRenderer.decalUV['rect'],0.2,0.85,0.2,this.health*2.5/this.maxHealth,0.4,0)
                
                textRenderer.addSingle('HP: '+MATH.addCommas((this.health|0)+''),this.pos,COLORS.whiteArr,-1,false,false)
                textRenderer.addSingle('Time: '+MATH.doTime((this.timeLimit|0)+''),this.pos,COLORS.whiteArr,-1,false,false,0,0.6)
            
                this.pos[1]-=1
                this.blocking=false
                
                meshes.explosions.instanceData.push(this.pos[0],this.pos[1]+this.fallenEggShellEffect,this.pos[2],0.9*player.isNight,0.9*player.isNight,0.9*player.isNight,this.fallenEggShellEffect*0.5+1,4,1.15)
                
                if(!this.running){
                    
                    this.blocking=true
                    this.fallenEggShellEffect=0
                    return
                }
                
                this.fallenEggShellEffect-=dt*15
                
                this.pos[3]=Math.atan2(d[1],d[0])+MATH.HALF_PI+Math.sin(TIME*30)*0.2
                
                gl.uniform4fv(glCache.mob_instanceInfo1,this.pos)
                gl.uniform2f(glCache.mob_instanceInfo2,1,1)
                gl.bindBuffer(gl.ARRAY_BUFFER,meshes.mondoChick.vertBuffer)
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,meshes.mondoChick.indexBuffer)
                gl.vertexAttribPointer(glCache.mob_vertPos,3,gl.FLOAT,gl.FLASE,24,0)
                gl.vertexAttribPointer(glCache.mob_vertColor,3,gl.FLOAT,gl.FLASE,24,12)
                gl.drawElements(gl.TRIANGLES,meshes.mondoChick.indexAmount,gl.UNSIGNED_SHORT,0)
                
            break
            
        }
        
    }
}

class PopStar {
    
    constructor(pos){
        
        this.size=0.5
        this.life=45
        this.startValue=player.stats.popStar
        this.value=0
        player.popStarActive=true
        player.popStarSize=0
        
        player.addEffect('bubbleBloat',60/(60*60))
        player.addEffect('popStarAura')
    }
    
    die(index){
        
        player.popStarSize=0
        player.popStarActive=false
        let dir=player.bodyDir.slice(),theta=TIME*2,st=Math.sin(theta)*(this.size+1),ct=Math.cos(theta)*(this.size+1)
        
        dir[0]=dir[0]*st-dir[2]*ct
        dir[2]=player.bodyDir[0]*ct+dir[2]*st
        
        let p=[player.body.position.x+dir[0],player.body.position.y+this.size*2+Math.sin(TIME*3)*this.size-0.5,player.body.position.z+dir[2]]
        
        objects.explosions.push(new Explosion({col:[0,0.5,1],pos:p,life:0.4,size:this.size*1.25,speed:0.25,aftershock:0.05,maxAlpha:0.5}))
        
        objects.explosions.push(new Explosion({col:[0,0.5,1],pos:p,life:0.4,size:this.size*1.5,speed:0.7,aftershock:0.1,maxAlpha:0.3}))
        
        if(player.fieldIn){
            
            for(let i=0,l=this.value*0.1+5;i<l;i++){
                
                objects.bubbles.push(new Bubble(player.fieldIn,(Math.random()*fieldInfo[player.fieldIn].width)|0,(Math.random()*fieldInfo[player.fieldIn].length)|0))
                
            }
        }
        
        objects.mobs.splice(index,1)
    }
    
    update(){
        
        this.life-=dt
        this.value=player.stats.popStar-this.startValue
        this.size=Math.min(Math.sqrt(this.value)*0.05+0.5,2)
        player.popStarSize=this.value
        
        gl.bindBuffer(gl.ARRAY_BUFFER,meshes.popStar.vertBuffer)
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,meshes.popStar.indexBuffer)
        gl.vertexAttribPointer(glCache.mob_vertPos,3,gl.FLOAT,gl.FLASE,24,0)
        gl.vertexAttribPointer(glCache.mob_vertColor,3,gl.FLOAT,gl.FLASE,24,12)
        
        let dir=player.bodyDir.slice(),theta=TIME*2,st=Math.sin(theta)*(this.size+1),ct=Math.cos(theta)*(this.size+1)
        
        dir[0]=dir[0]*st-dir[2]*ct
        dir[2]=player.bodyDir[0]*ct+dir[2]*st
        
        let p=[player.body.position.x+dir[0],player.body.position.y+this.size*2+Math.sin(TIME*3)*this.size-0.5,player.body.position.z+dir[2],-player.playerAngle+Math.PI]
        
        gl.uniform4fv(glCache.mob_instanceInfo1,p)
        gl.uniform2f(glCache.mob_instanceInfo2,this.size,0.7)
        gl.drawElements(gl.TRIANGLES,meshes.popStar.indexAmount,gl.UNSIGNED_SHORT,0)
        
        p[0]+=player.cameraDir[0]
        p[1]+=player.cameraDir[1]
        p[2]+=player.cameraDir[2]
        p[1]+=0.1
        textRenderer.addSingle(this.value.toString(),p.slice(),COLORS.whiteArr,-2)
        p[1]-=0.3
        textRenderer.addSingle(MATH.doTime(this.life),p,COLORS.whiteArr,-1)
        
        return this.life<=0
    }
}

class ScorchingStar {
    
    constructor(pos){
        
        this.size=0.5
        this.life=45
        this.startValue=player.stats.scorchingStar
        this.value=0
        player.scorchingStarSize=0
        player.addEffect('scorchingStarAura')
    }
    
    die(index){
        
        player.scorchingStarSize=0
        let dir=player.bodyDir.slice(),theta=TIME*2+MATH.THIRD_PI*2,st=Math.sin(theta)*(this.size+1),ct=Math.cos(theta)*(this.size+1)
        
        dir[0]=dir[0]*st-dir[2]*ct
        dir[2]=player.bodyDir[0]*ct+dir[2]*st
        
        let p=[player.body.position.x+dir[0],player.body.position.y+this.size*2+Math.sin(TIME*3)*this.size-0.5,player.body.position.z+dir[2]]
        
        objects.explosions.push(new Explosion({col:[0.75,0,0],pos:p,life:0.4,size:this.size*1.25,speed:0.25,aftershock:0.05,maxAlpha:0.5}))
        
        objects.explosions.push(new Explosion({col:[0.75,0,0],pos:p,life:0.4,size:this.size*1.5,speed:0.7,aftershock:0.1,maxAlpha:0.3}))
        
        objects.mobs.splice(index,1)
    }
    
    update(){
        
        this.life-=dt
        this.value=player.stats.scorchingStar-this.startValue
        this.size=Math.min(Math.sqrt(this.value*0.045)*0.05+0.5,2)
        player.scorchingStarSize=this.value
        
        gl.bindBuffer(gl.ARRAY_BUFFER,meshes.scorchingStar.vertBuffer)
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,meshes.scorchingStar.indexBuffer)
        gl.vertexAttribPointer(glCache.mob_vertPos,3,gl.FLOAT,gl.FLASE,24,0)
        gl.vertexAttribPointer(glCache.mob_vertColor,3,gl.FLOAT,gl.FLASE,24,12)
        
        let dir=player.bodyDir.slice(),theta=TIME*2+MATH.THIRD_PI*2,st=Math.sin(theta)*(this.size+1),ct=Math.cos(theta)*(this.size+1)
        
        dir[0]=dir[0]*st-dir[2]*ct
        dir[2]=player.bodyDir[0]*ct+dir[2]*st
        
        let p=[player.body.position.x+dir[0],player.body.position.y+this.size*2+Math.sin(TIME*3)*this.size-0.5,player.body.position.z+dir[2],-player.playerAngle+Math.PI]
        
        gl.uniform4fv(glCache.mob_instanceInfo1,p)
        gl.uniform2f(glCache.mob_instanceInfo2,this.size,1)
        gl.drawElements(gl.TRIANGLES,meshes.scorchingStar.indexAmount,gl.UNSIGNED_SHORT,0)
        
        p[0]+=player.cameraDir[0]
        p[1]+=player.cameraDir[1]
        p[2]+=player.cameraDir[2]
        p[1]+=0.1
        textRenderer.addSingle((this.value|0).toString(),p.slice(),COLORS.whiteArr,-2)
        p[1]-=0.3
        textRenderer.addSingle(MATH.doTime(this.life),p,COLORS.whiteArr,-1)
        
        return this.life<=0
    }
}

class GummyStar {
    
    constructor(pos){
        
        this.size=0.5
        this.life=45
        this.startValue=player.stats.goo
        this.value=0
        player.gummyStarSize=0
        player.addEffect('gummyStarAura')
    }
    
    die(index){
        
        player.gummyStarSize=0
        let dir=player.bodyDir.slice(),theta=TIME*2+MATH.THIRD_PI*4,st=Math.sin(theta)*(this.size+1),ct=Math.cos(theta)*(this.size+1)
        
        dir[0]=dir[0]*st-dir[2]*ct
        dir[2]=player.bodyDir[0]*ct+dir[2]*st
        
        let p=[player.body.position.x+dir[0],player.body.position.y+this.size*2+Math.sin(TIME*3)*this.size-0.5,player.body.position.z+dir[2]]
        
        objects.explosions.push(new Explosion({col:[0.1,1,0.5],pos:p,life:0.4,size:this.size*1.25,speed:0.25,aftershock:0.05,maxAlpha:0.5}))
        
        objects.explosions.push(new Explosion({col:[1,0.2,1],pos:p,life:0.4,size:this.size*1.5,speed:0.7,aftershock:0.1,maxAlpha:0.3}))
        
        if(player.fieldIn){
            
            let amountPerToken=Math.ceil(this.value*0.05/20)+1000
            
            for(let i=0,l=20+(this.value.toString().length);i<l;i++){
                
                objects.tokens.push(new LootToken(30,[fieldInfo[player.fieldIn].x+((Math.random()*fieldInfo[player.fieldIn].width)|0),fieldInfo[player.fieldIn].y+1,fieldInfo[player.fieldIn].z+((Math.random()*fieldInfo[player.fieldIn].length)|0)],'honey',amountPerToken,false,'Gummy Star'))
                
            }
        }
        
        objects.mobs.splice(index,1)
    }
    
    update(){
        
        this.life-=dt
        this.value=(player.stats.goo-this.startValue)
        player.gummyStarSize=this.value
        this.size=Math.min(Math.sqrt(this.value/75000000)*0.055+0.5,2)
        
        gl.bindBuffer(gl.ARRAY_BUFFER,meshes.gummyStar.vertBuffer)
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,meshes.gummyStar.indexBuffer)
        gl.vertexAttribPointer(glCache.mob_vertPos,3,gl.FLOAT,gl.FLASE,24,0)
        gl.vertexAttribPointer(glCache.mob_vertColor,3,gl.FLOAT,gl.FLASE,24,12)
        
        let dir=player.bodyDir.slice(),theta=TIME*2+MATH.THIRD_PI*4,st=Math.sin(theta)*(this.size+1),ct=Math.cos(theta)*(this.size+1)
        
        dir[0]=dir[0]*st-dir[2]*ct
        dir[2]=player.bodyDir[0]*ct+dir[2]*st
        
        let p=[player.body.position.x+dir[0],player.body.position.y+this.size*2+Math.sin(TIME*3)*this.size-0.5,player.body.position.z+dir[2],-player.playerAngle+Math.PI]
        
        gl.uniform4fv(glCache.mob_instanceInfo1,p)
        gl.uniform2f(glCache.mob_instanceInfo2,this.size,0.9)
        gl.drawElements(gl.TRIANGLES,meshes.gummyStar.indexAmount,gl.UNSIGNED_SHORT,0)
        
        p[0]+=player.cameraDir[0]
        p[1]+=player.cameraDir[1]
        p[2]+=player.cameraDir[2]
        p[1]+=0.1
        textRenderer.addSingle(this.value.toString(),p.slice(),COLORS.whiteArr,-2)
        p[1]-=0.3
        textRenderer.addSingle(MATH.doTime(this.life),p,COLORS.whiteArr,-1)
        
        return this.life<=0
    }
}

class StarSaw {
    
    constructor(pos){
        
        this.collectTimer=0
        this.lastCollectedAmount=0
        this.life=30000000
    }
    
    die(index){
        
        let theta=TIME*3,dx=Math.sin(theta)*4,dz=Math.cos(theta)*4
        
        let p=[player.body.position.x+dx,player.body.position.y+0.1,player.body.position.z+dz]
        
        objects.explosions.push(new Explosion({col:[0.9,0.9,0.9],pos:p,life:0.4,size:1,speed:0.25,aftershock:0.05,maxAlpha:0.5,height:0.25}))
        
        objects.mobs.splice(index,1)
    }
    
    update(){
        
        this.life-=dt
        
        gl.bindBuffer(gl.ARRAY_BUFFER,meshes.starSaw.vertBuffer)
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,meshes.starSaw.indexBuffer)
        gl.vertexAttribPointer(glCache.mob_vertPos,3,gl.FLOAT,gl.FLASE,24,0)
        gl.vertexAttribPointer(glCache.mob_vertColor,3,gl.FLOAT,gl.FLASE,24,12)
        
        let theta=TIME*3,dx=Math.sin(theta)*4,dz=Math.cos(theta)*4
        
        let p=[player.body.position.x+dx,player.body.position.y+0.1,player.body.position.z+dz,TIME*10]
        
        gl.uniform4fv(glCache.mob_instanceInfo1,p)
        gl.uniform2f(glCache.mob_instanceInfo2,0.65,1)
        gl.drawElements(gl.TRIANGLES,meshes.starSaw.indexAmount,gl.UNSIGNED_SHORT,0)
        
        for(let i in objects.bubbles){
            
            let b=objects.bubbles[i]
            
            if(vec3.sqrDist(p,b.pos)<=5){
                
                b.pop()
            }
        }
        
        for(let i in objects.fuzzBombs){
            
            let b=objects.fuzzBombs[i]
            
            if(vec3.sqrDist(p,b.pos)<=4){
                
                b.pop()
            }
        }
        
        for(let i in objects.tokens){
            
            let b=objects.tokens[i]
            
            if(vec3.sqrDist(p,b.pos)<=4){
                
                b.collect()
            }
        }
        
        for(let i in objects.mobs){
            
            let b=objects.mobs[i]
            
            if(b.health&&b.state==='attack'&&b.starSawHitTimer<=0&&vec3.sqrDist(p,b.pos)<=6){
                
                b.starSawHitTimer=0.75
                b.damage(50*player.beeAttack)
            }
        }
        
        this.collectTimer-=dt
        
        if(this.collectTimer<=0&&player.fieldIn){
            
            this.collectTimer=0.1
            
            let amountToConvert=Math.min(Math.round(player.beeAttack*this.lastCollectedAmount*2.5*(player.redBeeAttack+player.blueBeeAttack+player.whiteBeeAttack)),player.pollen)
            
            if(amountToConvert){
                
                player.pollen-=amountToConvert
                player.honey+=amountToConvert
            }
            
            let x=Math.round(p[0]-fieldInfo[player.fieldIn].x),
                z=Math.round(p[2]-fieldInfo[player.fieldIn].z)
                
            this.lastCollectedAmount=collectPollen({x:x,z:z,pattern:[[0,0],[-1,0],[1,0],[0,1],[0,-1]],amount:{r:10,w:12.5,b:10},stackHeight:0.5})
            
        }
        
        return this.life<=0
    }
}

class GuidingStar {
    
    constructor(field){
        
        this.guidingstarinstance=true
        this.life=600
        this.field=field
        this.center=[fieldInfo[this.field].x+0.5*fieldInfo[this.field].width,fieldInfo[this.field].y+3,fieldInfo[this.field].z+0.5*fieldInfo[this.field].length]
        this.particleTimer=0
    }
    
    die(index){
        
        objects.mobs.splice(index,1)
    }
    
    update(){
        
        if(player.fieldIn===this.field){
            
            player.addEffect('guidingStarAura')
        }
        
        this.life-=dt
        
        gl.bindBuffer(gl.ARRAY_BUFFER,meshes.guidingStar.vertBuffer)
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,meshes.guidingStar.indexBuffer)
        gl.vertexAttribPointer(glCache.mob_vertPos,3,gl.FLOAT,gl.FLASE,24,0)
        gl.vertexAttribPointer(glCache.mob_vertColor,3,gl.FLOAT,gl.FLASE,24,12)
        
        let theta=TIME*0.75,st=Math.sin(theta)*fieldInfo[this.field].width*0.4,ct=Math.cos(theta)*fieldInfo[this.field].length*0.4
        
        let p=[this.center[0]+st,this.center[1],this.center[2]+ct,TIME*2]
        
        gl.uniform4fv(glCache.mob_instanceInfo1,p)
        gl.uniform2f(glCache.mob_instanceInfo2,1.5,0.4)
        gl.drawElements(gl.TRIANGLES,meshes.guidingStar.indexAmount,gl.UNSIGNED_SHORT,0)
        
        this.particleTimer-=dt
        
        if(this.particleTimer<=0){
            
            if(Math.random()<0.25)
                
                ParticleRenderer.add({x:p[0]+MATH.random(-2,2),y:p[1]+MATH.random(-0.5,0.5),z:p[2]+MATH.random(-2,2),vx:MATH.random(-0.1,0.1),vy:0,vz:MATH.random(-0.1,0.1),grav:1,size:30,col:[1,0.8,0],life:1.5,rotVel:MATH.random(-3,3),alpha:0.25})
            
            else
                ParticleRenderer.add({x:fieldInfo[this.field].x+Math.random()*fieldInfo[this.field].width,y:fieldInfo[this.field].y+3,z:fieldInfo[this.field].z+Math.random()*fieldInfo[this.field].length,vx:MATH.random(-0.1,0.1),vy:0,vz:MATH.random(-0.1,0.1),grav:1,size:60,col:[1,0.8,0],life:1.5,rotVel:MATH.random(-3,3),alpha:0.5})
            
            this.particleTimer=0.2
        }
        
        return this.life<=0
    }
}

class Wave {
    
    constructor(pos,vel){
        
        let size=player.tidalSurge?3.4:player.tidePower*0.85+0.45
        this.pos=[...pos,Math.atan2(vel[2],vel[0])+Math.PI*0.5]
        this.vel=vel
        this.lifespan=3.5+size*0.25
        this.life=3.5+size*0.25
        this.y=pos[1]
        
        vec3.scale(vel,vel,size+5)
        
        this.size=size
        this.collectTimer=0
        this.balloonsHit=[]
        this.hitBees=[]
    }
    
    die(index){
        
        objects.mobs.splice(index,1)
    }
    
    update(){
        
        this.life-=dt
        
        this.pos[0]+=this.vel[0]*dt
        this.pos[2]+=this.vel[2]*dt
        this.pos[1]=Math.min(this.y,this.y-(this.lifespan-this.life)*this.size)+Math.sin(TIME*12.5)*0.35*this.size
        
        for(let i in objects.bees){
            
            let b=objects.bees[i]
            
            if(this.hitBees.indexOf(i)<0&&Math.abs(b.pos[0]-this.pos[0])+Math.abs(b.pos[1]-this.y)+Math.abs(b.pos[2]-this.pos[2])<1){
                
                objects.explosions.push(new Explosion({col:[0.2,0.5,1],pos:[this.pos[0],this.y,this.pos[2]],life:0.5,size:1.2,speed:0.35,aftershock:0.005}))
                
                this.hitBees.push(i)
                
                let amountToConvert=Math.ceil(Math.min(player.pollen,10000+b.convertAmount*10))
                
                player.pollen-=amountToConvert
                player.honey+=amountToConvert
                
                if(amountToConvert)
                    textRenderer.add(amountToConvert.toString(),[b.pos[0],b.pos[1]+0.75,b.pos[2]],COLORS.honey,1,'⇆')
            }
        }
        
        for(let i in objects.bubbles){
            
            let b=objects.bubbles[i]
            
            if(vec3.sqrDist(this.pos,b.pos)<=4.5*this.size){
                
                b.pop()
            }
        }
        
        for(let i in objects.fuzzBombs){
            
            let b=objects.fuzzBombs[i]
            
            if(vec3.sqrDist(this.pos,b.pos)<=3.5*this.size){
                
                b.pop()
            }
        }
        
        for(let i in objects.tokens){
            
            let b=objects.tokens[i]
            
            if(b.from!=='Balloon'&&vec3.sqrDist(this.pos,b.pos)<=3.5*this.size){
                
                b.collect()
            }
        }
        
        if(this.size>=3.25){
            
            for(let i in objects.balloons){
                
                let b=objects.balloons[i]
                
                if(Math.random()<0.3333&&b.state==='float'&&this.balloonsHit.indexOf(b.id)<0&&Math.abs(this.pos[0]-b.pos[0])+Math.abs(this.pos[2]-b.pos[2])<=this.size*0.8){
                    
                    this.balloonsHit.push(b.id)
                    objects.explosions.push(new Explosion({col:[0.1,0.5,1],pos:[this.pos[0],this.y+4,this.pos[2]],life:0.5,size:b.displaySize*1.5,speed:0.4,aftershock:0.01}))
                    
                    let am=Math.round(Math.min(b.pollen,player.convertTotal*0.01))
                    b.pollen-=am
                    
                    let hpt=Math.round(am*(b.golden?1.05:1)/3),off=Math.random()*MATH.TWO_PI
                    
                    if(hpt){
                        
                        for(let i=off;i<MATH.TWO_PI+off;i+=MATH.TWO_PI/3){
                            objects.tokens.push(new LootToken(30,[this.pos[0]+Math.cos(i)*1.5,fieldInfo[b.field].y+1,this.pos[2]+Math.sin(i)*1.5],'honey',hpt,true,'Balloon'))
                        }
                    }
                    
                    player.addEffect('tideBlessing',((b.golden?45:30)/(4*60*60))*2)
                    
                    if(b.pollen<=0){
                        
                        b.die(i,true)
                    }
                }
            }
        }
        
        gl.bindBuffer(gl.ARRAY_BUFFER,meshes.wave.vertBuffer)
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,meshes.wave.indexBuffer)
        gl.vertexAttribPointer(glCache.mob_vertPos,3,gl.FLOAT,gl.FLASE,24,0)
        gl.vertexAttribPointer(glCache.mob_vertColor,3,gl.FLOAT,gl.FLASE,24,12)
        gl.uniform4fv(glCache.mob_instanceInfo1,this.pos)
        gl.uniform2f(glCache.mob_instanceInfo2,this.size,0.6)
        gl.drawElements(gl.TRIANGLES,meshes.wave.indexAmount,gl.UNSIGNED_SHORT,0)
        
        this.collectTimer-=dt
        
        if(this.collectTimer<=0&&player.fieldIn){
            
            this.collectTimer=0.35
            
            let x=Math.round(this.pos[0]-fieldInfo[player.fieldIn].x),
                z=Math.round(this.pos[2]-fieldInfo[player.fieldIn].z)
                
            collectPollen({x:x,z:z,pattern:[[0,0],[-1,0],[1,0],[0,1],[0,-1],[-1,-1],[1,1],[-1,1],[1,-1]],amount:{r:this.size*this.life*0.5,w:2*this.size*this.life,b:3*this.size*this.life},yOffset:2.2,stackHeight:0.5+Math.random()*0.85})
            
        }
    
        return this.life<=0
    }
}

class Pulse {
    
    constructor(color){
        
        this.color=color
        this.trail1=new TrailRenderer.Trail({length:15,size:0.55,triangle:true,color:[1,1,1,1]})
        this.trail2=new TrailRenderer.Trail({length:15,size:0.2,triangle:true,color:color==='red'?[1,0,0,1]:[0,0,1,1]})
        this.path=[]
        
        for(let i in objects.bees){
            
            if(['moveToSleep','sleep'].indexOf(objects.bees[i].state)<0&&vec3.sqrDist(objects.bees[i].pos,[player.body.position.x,player.body.position.y,player.body.position.z])<30*30&&beeInfo[objects.bees[i].type].color===color){
                this.path.push(objects.bees[i].pos)
            }
        }
        
        this.path.push(...this.path)
        
        this.t=0
        this.spliceTimer=3
        this.lastPoint=0
    }
    
    die(index){
        
        this.trail1.splice=true
        this.trail2.splice=true
        
        objects.mobs.splice(index,1)
    }
    
    update(){
        
        this.t+=dt*20
        
        if(this.spliceTimer<=0){
            
            return true
        }
        
        if(Math.ceil(this.t)>=this.path.length){
            
            this.spliceTimer-=dt
            this.trail1.addPos([])
            this.trail2.addPos([])
            
            return 
        }
        
        let a=this.path[this.t|0],b=this.path[Math.ceil(this.t)],t=this.t-(this.t|0),p=[MATH.lerp(a[0],b[0],t),MATH.lerp(a[1],b[1],t),MATH.lerp(a[2],b[2],t)]
        
        this.trail1.addPos(p)
        this.trail2.addPos(p)
        
        if((this.t|0)!==this.lastPoint&&player.fieldIn){
            
            this.lastPoint=this.t|0
            
            let am=this.lastPoint*0.75+4,x=Math.round(p[0]-fieldInfo[player.fieldIn].x),z=Math.round(p[2]-fieldInfo[player.fieldIn].z)
            
            collectPollen({x:x,z:z,pattern:[[0,0],[1,1],[1,-1],[-1,1],[-1,-1],[1,0],[-1,0],[0,1],[0,-1],[2,0],[-2,0],[0,-2],[0,2],[2,1],[2,-1],[-2,1],[-2,-1],[1,-2],[1,2],[-1,2],[-1,-2],[-3,0],[3,0],[0,-3],[0,3]],amount:am,stackOffset:0.4+Math.random()*(0.3+((am*0.05)-2))})
            
        }
        
    }
}

class Beam {
    
    constructor(params,delay){
        
        this.bee=params.bee
        this.delay=delay
        this.life=0.5
        this.center=[params.x,params.z]
        this.field=params.field
        
        while(1){
            
            let x=Math.round(MATH.random(-7,7))+this.center[0],z=Math.round(MATH.random(-7,7))+this.center[1]
            
            if(x>=0&&x<fieldInfo[this.field].width&&z>=0&&z<fieldInfo[this.field].length&&player.beamStormRayData.indexOf(x.toString()+','+z.toString())<15){
                
                player.beamStormRayData.push(x.toString()+','+z.toString())
                this.x=x
                this.z=z
                break
            }
        }
        
        this.pos=[fieldInfo[this.field].x+this.x,fieldInfo[this.field].y,fieldInfo[this.field].z+this.z]
    }
    
    die(index){
        
        objects.mobs.splice(index,1)
    }
    
    update(){
        
        if(this.delay>0){
            
            this.delay-=dt
            
            if(this.delay<=0){
                
                collectPollen({x:this.x,z:this.z,pattern:[[0,0]],amount:100000,field:this.field,instantConversion:this.bee.gifted?1:0,depleteAll:true})
                
            }
            
        } else {
            
            this.life-=dt
            
            meshes.cylinder_explosions.instanceData.push(this.pos[0],this.pos[1],this.pos[2],1,1,this.bee.gifted?1:0,1,0.1,10000)
            
            return this.life<=0
        }
        
    }
}

class GummyBall {
    
    constructor(){
        
        this.size=(player.gummyBallSize-1)/1.5
        this.field=player.fieldIn
        this.vel=player.bodyDir.slice()
        vec3.scale(this.vel,this.vel,17.5)
        this.life=this.size*15+0.5
        this.collectTimer=0
        this.rad=this.size*0.35+0.5
        this.pos=[player.body.position.x,fieldInfo[player.fieldIn].y+0.5+this.rad,player.body.position.z,0]
        this.trail=new TrailRenderer.Trail({length:MATH.lerp(20,50,this.size)|0,size:this.rad,triangle:true,color:[1,0.2,1,1],fadeTo:[0.1,1,0.6,0]})
        this.bounds={
            
            minX:fieldInfo[this.field].x+this.rad,
            maxX:fieldInfo[this.field].x+fieldInfo[this.field].width-this.rad,
            minZ:fieldInfo[this.field].z+this.rad,
            maxZ:fieldInfo[this.field].z+fieldInfo[this.field].length-this.rad,
        }
        this.amount=0
    }
    
    die(index){
        
        this.trail.splice=true
        objects.mobs.splice(index,1)
    }
    
    update(){
        
        this.life-=dt
        
        if(this.pos[0]<=this.bounds.minX){
            
            this.pos[0]=this.bounds.minX
            this.vel[0]=-this.vel[0]
            player.addEffect('gummyBallCombo',false,false,undefined,2)
            this.amount+=2
        }
        
        if(this.pos[0]>=this.bounds.maxX){
            
            this.pos[0]=this.bounds.maxX
            this.vel[0]=-this.vel[0]
            player.addEffect('gummyBallCombo',false,false,undefined,2)
            this.amount+=2
        }
        
        if(this.pos[2]<=this.bounds.minZ){
            
            this.pos[2]=this.bounds.minZ
            this.vel[2]=-this.vel[2]
            player.addEffect('gummyBallCombo',false,false,undefined,2)
            this.amount+=2
        }
        
        if(this.pos[2]>=this.bounds.maxZ){
            
            this.pos[2]=this.bounds.maxZ
            this.vel[2]=-this.vel[2]
            player.addEffect('gummyBallCombo',false,false,undefined,2)
            this.amount+=2
        }
        
        vec3.scaleAndAdd(this.pos,this.pos,this.vel,dt)
        
        for(let i in objects.tokens){
            
            let b=objects.tokens[i]
            
            if(vec3.sqrDist(this.pos,b.pos)<=this.rad*this.rad*1.5){
                
                b.collect()
                player.addEffect('gummyBallCombo',false,false,undefined,b.type==='honey'?3:1)
                this.amount+=b.type==='honey'?3:1
            }
        }
        
        for(let i in objects.marks){
            
            let b=objects.marks[i]
            
            if(vec3.sqrDist(this.pos,b.pos)<=25&&TIME-b.gummyBallHitTimer>1){
                
                b.gummyBallHitTimer=TIME
                player.addEffect('gummyBallCombo',false,false,undefined,b.type==='precise'?30:8)
                this.amount+=b.type==='precise'?30:8
            }
        }
        
        this.trail.addPos([this.pos[0],this.pos[1],this.pos[2]])
        
        gl.bindBuffer(gl.ARRAY_BUFFER,meshes.gummyBall.vertBuffer)
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,meshes.gummyBall.indexBuffer)
        gl.vertexAttribPointer(glCache.mob_vertPos,3,gl.FLOAT,gl.FLASE,24,0)
        gl.vertexAttribPointer(glCache.mob_vertColor,3,gl.FLOAT,gl.FLASE,24,12)
        gl.uniform4fv(glCache.mob_instanceInfo1,this.pos)
        gl.uniform2f(glCache.mob_instanceInfo2,this.rad*2,this.life)
        gl.drawElements(gl.TRIANGLES,meshes.gummyBall.indexAmount,gl.UNSIGNED_SHORT,0)
        
        textRenderer.addSingle('x'+this.amount,this.pos,COLORS.whiteArr,-3)
        
        this.collectTimer-=dt
        
        if(this.collectTimer<=0&&player.fieldIn){
            
            this.collectTimer=0.15
            
            let x=Math.round(this.pos[0]-fieldInfo[player.fieldIn].x),
                z=Math.round(this.pos[2]-fieldInfo[player.fieldIn].z)
            
            collectPollen({x:x,z:z,pattern:[[-2,-1],[-2,0],[-2,1],[-1,-2],[-1,-1],[-1,0],[-1,1],[-1,2],[0,-2],[0,-1],[0,0],[0,1],[0,2],[1,-2],[1,-1],[1,0],[1,1],[1,2],[2,-1],[2,0],[2,1]],amount:{r:3,w:10,b:3},stackHeight:0.75,field:this.field,gooTrail:true,multiplier:this.size+1})
            
        }
        
        return this.life<=0
    }
}

class Coconut {
    
    constructor(x=player.flowerIn.x,z=player.flowerIn.z,delay=0){
        
        this.delay=delay
        this.field=player.fieldIn
        this.x=x
        this.z=z
        this.pos=[fieldInfo[this.field].x+this.x,fieldInfo[this.field].y+0.51,fieldInfo[this.field].z+this.z]
        this.y=this.pos[1]+25
        this.glow=0
        this.vel=0
        this.displaySize=4.5
    }
    
    die(index){
        
        collectPollen({x:this.x,z:this.z,pattern:[[-2,-1],[-2,0],[-2,1],[-1,-2],[-1,-1],[-1,0],[-1,1],[-1,2],[0,-2],[0,-1],[0,0],[0,1],[0,2],[1,-2],[1,-1],[1,0],[1,1],[1,2],[2,-1],[2,0],[2,1]],amount:50,yOffset:2.25,stackHeight:0.75+Math.random()*0.25,field:this.field,multiplier:player.pollenFromCoconuts})
        
        let hpt=Math.ceil(Math.min(player.convertTotal,player.pollen)/5)
        
        if(hpt&&vec3.sqrDist(this.pos,[player.body.position.x,player.body.position.y,player.body.position.z])<=this.displaySize){
            player.pollen-=Math.ceil(Math.min(player.convertTotal,player.pollen))
            
            for(let i=0;i<MATH.TWO_PI;i+=MATH.TWO_PI/5){
                
                objects.tokens.push(new LootToken(30,[this.pos[0]+Math.cos(i)*this.displaySize*0.6,fieldInfo[this.field].y+1,this.pos[2]+Math.sin(i)*this.displaySize*0.6],'honey',Math.ceil(hpt),true,'Coconut'))
            }
        }
        
        objects.mobs.splice(index,1)
    }
    
    update(){
        
        if(this.delay>0){
            
            this.delay-=dt
            
            return !player.fieldIn
            
        } else {
            
            this.vel-=dt*20
            this.glow+=dt
            this.y+=this.vel*dt
            
            meshes.explosions.instanceData.push(this.pos[0],this.pos[1],this.pos[2],0,1,0,this.glow,this.displaySize,0.001)
            meshes.explosions.instanceData.push(this.pos[0],this.y,this.pos[2],1,1,1,0.15,-this.displaySize-1,1)
            meshes.explosions.instanceData.push(this.pos[0],this.y,this.pos[2],0.3*player.isNight,0.1*player.isNight,0,1,this.displaySize,1)
            
            return this.y+this.displaySize<this.pos[1]||!player.fieldIn
            
        }
    }
}

class DrainingDiamond {
    
    constructor(){
        
        this.life=2.5
        this.pos=[player.body.position.x,player.body.position.y,player.body.position.z,0]
        this.y=this.pos[1]+2
        this.r=15
    }
    
    die(index){
        
        let am=Math.min(Math.sqrt(player.convertRate*player.bluePollen)*player.capacity*0.05,player.pollen)
        
        player.honey+=am*2
        player.pollen-=am
        
        player.addMessage('+'+MATH.addCommas((am*2)+'')+' Honey (from Diamond Drain)')
        
        objects.mobs.splice(index,1)
    }
    
    update(){
        
        this.life-=dt
        
        if(this.life<0.1){
            
            this.pos[1]-=dt*40
            
        } else {
            
            this.pos[1]+=(this.y-this.pos[1])*dt*4
        }
        
        if(this.life>0.7){
            
            this.pos[3]+=(this.r-this.pos[3])*dt*4
            gl.bindBuffer(gl.ARRAY_BUFFER,meshes.drainingDiamond.vertBuffer)
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,meshes.drainingDiamond.indexBuffer)
            gl.vertexAttribPointer(glCache.mob_vertPos,3,gl.FLOAT,gl.FLASE,24,0)
            gl.vertexAttribPointer(glCache.mob_vertColor,3,gl.FLOAT,gl.FLASE,24,12)
            gl.uniform4fv(glCache.mob_instanceInfo1,this.pos)
            gl.uniform2f(glCache.mob_instanceInfo2,1.6,0.75)
            gl.drawElements(gl.TRIANGLES,meshes.drainingDiamond.indexAmount,gl.UNSIGNED_SHORT,0)
            
        } else {
            
            gl.bindBuffer(gl.ARRAY_BUFFER,meshes.shiningDiamond.vertBuffer)
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,meshes.shiningDiamond.indexBuffer)
            gl.vertexAttribPointer(glCache.mob_vertPos,3,gl.FLOAT,gl.FLASE,24,0)
            gl.vertexAttribPointer(glCache.mob_vertColor,3,gl.FLOAT,gl.FLASE,24,12)
            gl.uniform4fv(glCache.mob_instanceInfo1,this.pos)
            gl.uniform2f(glCache.mob_instanceInfo2,1.6,1)
            gl.drawElements(gl.TRIANGLES,meshes.shiningDiamond.indexAmount,gl.UNSIGNED_SHORT,0)
        }
        
        
        
        return this.life<=0
    }
}

class Cloud {
    
    constructor(field,x,z,life){
        
        this.life=life
        this.field=field
        this.x=x
        this.z=z
        this._x=x
        this._z=z
        this.moveTo=[fieldInfo[this.field].x+this.x,fieldInfo[this.field].z+this.z]
        this.moveDir=[0,0]
        this.pos=[fieldInfo[this.field].x+this.x,fieldInfo[this.field].y+0.55+4,fieldInfo[this.field].z+this.z]
        
        this.flowers=[]
        this.timer=0
        
        let rad=3,sqRad=2*2
        
        for(let x=-rad;x<=rad;x++){
            
            for(let z=-rad;z<=rad;z++){
                
                if(x*x+z*z<=sqRad){
                    
                    this.flowers.push([x,z])
                }
            }
        }
    }
    
    die(index){
        
        objects.mobs.splice(index,1)
    }
    
    update(){
        
        this.life-=dt
        
        this.pos[0]+=this.moveDir[0]*dt
        this.pos[2]+=this.moveDir[1]*dt
        
        this.x=Math.round(this.pos[0]-fieldInfo[this.field].x)
        this.z=Math.round(this.pos[2]-fieldInfo[this.field].z)
        
        this.timer-=dt
        
        if(this.timer<=0){
            
            this.timer=0.15
            
            ParticleRenderer.add({x:this.pos[0]+MATH.random(-1.5,1.5),y:this.pos[1]-0.75,z:this.pos[2]+MATH.random(-1.5,1.5),vx:0,vy:-6,vz:0,grav:-7,size:MATH.random(30,60),col:[0.6,0.6,0.7],life:0.75,rotVel:MATH.random(-6,6),alpha:25})
            
            if(player.fieldIn===this.field){
                
                for(let i in this.flowers){
                    
                    let p=this.flowers[i]
                    
                    let _x=this.x+p[0],_z=this.z+p[1]
                    
                    if(_x>=0&&_x<fieldInfo[this.field].width&&_z>=0&&_z<fieldInfo[this.field].length){
                        
                        updateFlower(this.field,_x,_z,function(f){
                            
                            f.height+=0.25
                            
                        },true,false,false)
                    }
                }
            }
            
            if(vec3.sqrDist(this.pos,[player.body.position.x,player.body.position.y+4,player.body.position.z])<=6.25){
                
                player.addEffect('cloudBoost',0.1)
            }
        }
        
        let c=0.7*player.isNight
        
        meshes.explosions.instanceData.push(this.pos[0]-0.45,this.pos[1],this.pos[2],c,c,c,0.8,2.1,0.9)
        meshes.explosions.instanceData.push(this.pos[0]+0.45,this.pos[1],this.pos[2]+0.7,c,c,c,0.8,1.8,0.9)
        meshes.explosions.instanceData.push(this.pos[0]-0.5,this.pos[1],this.pos[2]-0.8,c,c,c,0.8,1.9,0.9)
        meshes.explosions.instanceData.push(this.pos[0]+0.75,this.pos[1],this.pos[2]-0.3,c,c,c,0.8,2.2,0.9)
        
        if(Math.abs(this.pos[0]-this.moveTo[0])+Math.abs(this.pos[2]-this.moveTo[1])<1){
            
            this.moveTo=[fieldInfo[this.field].x+((Math.random()*fieldInfo[this.field].width)|0),fieldInfo[this.field].z+((Math.random()*fieldInfo[this.field].length)|0)]
            
            this.moveDir=[this.moveTo[0]-this.pos[0],this.moveTo[1]-this.pos[2]]
            
            vec2.normalize(this.moveDir,this.moveDir)
        }
        
        return this.life<=0
    }
}

class Tornado {
    
    constructor(beeLevel){
        
        this.life=player.hasteStacks+7.5+beeLevel*0.5
        this.field=player.fieldIn
        this.speed=1+player.hasteStacks*0.25+beeLevel*0.05
        this.x=player.flowerIn.x
        this.z=player.flowerIn.z
        this._x=player.flowerIn.x
        this._z=player.flowerIn.z
        this.moveTo=[fieldInfo[this.field].x+this.x,fieldInfo[this.field].z+this.z]
        this.moveDir=[0,0]
        this.pos=[fieldInfo[this.field].x+this.x,fieldInfo[this.field].y+0.5,fieldInfo[this.field].z+this.z]
        
        this.flowers=[]
        this.timer=0
        
        let rad=3,sqRad=2*2
        
        for(let x=-rad;x<=rad;x++){
            
            for(let z=-rad;z<=rad;z++){
                
                if(x*x+z*z<=sqRad){
                    
                    this.flowers.push([x,z])
                }
            }
        }
    }
    
    die(index){
        
        objects.mobs.splice(index,1)
    }
    
    update(){
        
        this.life-=dt
        
        this.pos[0]+=this.moveDir[0]*dt
        this.pos[2]+=this.moveDir[1]*dt
        
        this.x=Math.round(this.pos[0]-fieldInfo[this.field].x)
        this.z=Math.round(this.pos[2]-fieldInfo[this.field].z)
        
        this.timer-=dt
        
        if(this.timer<=0){
            
            this.timer=0.25
            
            collectPollen({x:this.x,z:this.z,pattern:[[-2,-1],[-2,0],[-2,1],[-1,-2],[-1,-1],[-1,0],[-1,1],[-1,2],[0,-2],[0,-1],[0,0],[0,1],[0,2],[1,-2],[1,-1],[1,0],[1,1],[1,2],[2,-1],[2,0],[2,1]],amount:7.5,field:this.field})
        }
        
        if(Math.abs(this.pos[0]-this.moveTo[0])+Math.abs(this.pos[2]-this.moveTo[1])<1){
            
            this.moveTo=[fieldInfo[this.field].x+((Math.random()*fieldInfo[this.field].width)|0),fieldInfo[this.field].z+((Math.random()*fieldInfo[this.field].length)|0)]
            
            this.moveDir=[this.moveTo[0]-this.pos[0],this.moveTo[1]-this.pos[2]]
            
            vec2.normalize(this.moveDir,this.moveDir)
            vec2.scale(this.moveDir,this.moveDir,this.speed)
        }
        
        for(let i in objects.tokens){
            
            let b=objects.tokens[i]
            
            if(vec3.sqrDist(this.pos,b.pos)<=16){
                
                b.collect()
            }
        }
        
        for(let i in objects.bubbles){
            
            let b=objects.bubbles[i]
            
            if(vec3.sqrDist(this.pos,b.pos)<=16){
                
                b.pop()
            }
        }
        
        for(let i in objects.fuzzBombs){
            
            let b=objects.fuzzBombs[i]
            
            if(vec3.sqrDist(this.pos,b.pos)<=16){
                
                b.pop()
            }
        }
        
        gl.bindBuffer(gl.ARRAY_BUFFER,meshes.tornado.vertBuffer)
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,meshes.tornado.indexBuffer)
        gl.vertexAttribPointer(glCache.mob_vertPos,3,gl.FLOAT,gl.FLASE,24,0)
        gl.vertexAttribPointer(glCache.mob_vertColor,3,gl.FLOAT,gl.FLASE,24,12)
        this.pos[3]=TIME*(this.speed+5)
        gl.uniform4fv(glCache.mob_instanceInfo1,this.pos)
        gl.uniform2f(glCache.mob_instanceInfo2,0.65,0.7)
        gl.drawElements(gl.TRIANGLES,meshes.tornado.indexAmount,gl.UNSIGNED_SHORT,0)
        
        return this.life<=0
    }
}

class Scratch {
    
    constructor(bee,x,z){
        
        this.bee=bee
        this.life=1
        this.field=player.fieldIn
        this.x=x
        this.z=z
        this.pos=[fieldInfo[this.field].x+this.x,fieldInfo[this.field].y+0.5+2,fieldInfo[this.field].z+this.z+1,0]
        this.targetZ=this.pos[2]-3
        
    }
    
    die(index){
        
        objects.mobs.splice(index,1)
    }
    
    update(){
        
        this.life-=dt
        
        if(this.life<0.8)
            this.pos[2]+=(this.targetZ-this.pos[2])*dt*12.5
        
        if(this.life<=0.75&&!this.collectedPollen){
            
            collectPollen({x:this.x,z:this.z,field:this.field,pattern:[[-2,0],[-2,1],[-2,-1],[-2,-2],[0,0],[0,1],[0,-1],[0,-2],[2,0],[2,1],[2,-1],[2,-2]],amount:10+this.bee.level*1.5})
        }
        
        gl.bindBuffer(gl.ARRAY_BUFFER,meshes.scratch.vertBuffer)
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,meshes.scratch.indexBuffer)
        gl.vertexAttribPointer(glCache.mob_vertPos,3,gl.FLOAT,gl.FLASE,24,0)
        gl.vertexAttribPointer(glCache.mob_vertColor,3,gl.FLOAT,gl.FLASE,24,12)
        
        gl.uniform4fv(glCache.mob_instanceInfo1,this.pos)
        gl.uniform2f(glCache.mob_instanceInfo2,0.65,1)
        gl.drawElements(gl.TRIANGLES,meshes.scratch.indexAmount,gl.UNSIGNED_SHORT,0)
        
        return this.life<=0
    }
}

class DarkScoopingTrail {
    
    constructor(){
        
        this.bodyPos=[player.body.position.x,player.body.position.y,player.body.position.z]
        
        let d=player.bodyDir.slice(),
            r=[-d[2],0,d[0]]
        
        this.startPos=[d[0]*2+r[0]*4,0.05,d[2]*2+r[2]*4]
        this.endPos=[d[0]*2-r[0]*4,0.05,d[2]*2-r[2]*4]
        
        this.control2=vec3.scale([],this.startPos,2)
        this.control1=vec3.scale([],this.endPos,5.25)
        
        this.lifespan=0.3
        this.life=this.lifespan
        this.trail=new TrailRenderer.Trail({length:15,size:0.5,triangle:true,color:[0.8,0,0.8,0.6],fadeTo:[0.5,0,0,0.6]})
        
        this.lastPos=[]
    }
    
    die(index){
        
        this.trail.splice=true
        objects.mobs.splice(index,1)
    }
    
    update(){
        
        if(this.waitTimer>0){
            
            this.waitTimer-=dt
            this.trail.addPos(vec3.add(this.lastPos,this.lastPos,this.lastVel))
            
            return this.waitTimer<=0
        }
        
        this.life-=dt
        
        let p=MATH.generateBezierCurve(this.endPos,this.control1,this.control2,this.startPos,MATH.constrain(this.life*(1/this.lifespan),0,1))
        
        vec3.add(p,p,this.bodyPos)
        
        this.trail.addPos(p)
        
        this.lastVel=vec3.sub([],this.lastPos,p)
        
        this.lastPos=p
        
        if(this.life<=0){
            
            this.waitTimer=0.5
            vec3.scale(this.lastVel,this.lastVel,-0.01)
        }
    }
}

let lightDir=[1,5,1.5]

let m=1/(lightDir[0]*lightDir[0]+lightDir[1]*lightDir[1]+lightDir[2]*lightDir[2])

lightDir[0]*=m
lightDir[1]*=m
lightDir[2]*=m

let hash = (function() {
		let seed = Math.random() * 2100000000 | 0
		let PRIME32_2 = 1883677709
		let PRIME32_3 = 2034071983
		let PRIME32_4 = 668265263
		let PRIME32_5 = 374761393

		seedHash = function(s) {
			seed = s | 0
		}

		return function(x, y) {
			let h32 = 0

			h32 = seed + PRIME32_5 | 0
			h32 += 8

			h32 += Math.imul(x, PRIME32_3)
			h32 = Math.imul(h32 << 17 | h32 >> 32 - 17, PRIME32_4)
			h32 += Math.imul(y, PRIME32_3)
			h32 = Math.imul(h32 << 17 | h32 >> 32 - 17, PRIME32_4)

			h32 ^= h32 >> 15
			h32 *= PRIME32_2
			h32 ^= h32 >> 13
			h32 *= PRIME32_3
			h32 ^= h32 >> 16

			return h32 / 2147483647
		}
	})()

let currentRandom = null
function Marsaglia(i1, i2) {
// from http://www.math.uni-bielefeld.de/~sillke/ALGORITHMS/random/marsaglia-c
	let z = (i1 | 0) || 362436069, w = i2 || hash(521288629, z) * 2147483647 | 0

	let nextInt = function() {
		z=36969*(z&65535)+(z>>>16) & 0xFFFFFFFF
		w=18000*(w&65535)+(w>>>16) & 0xFFFFFFFF
		return ((z&0xFFFF)<<16 | w&0xFFFF) & 0xFFFFFFFF
	}

	this.nextDouble = function() {
		let i = nextInt() / 4294967296
		return i < 0 ? 1 + i : i
	}
	this.nextInt = nextInt
}
let randomSeed = function(seed) {
	currentRandom = (new Marsaglia(seed)).nextDouble
}
let random = function(min, max) {
	if (!max) {
		if (min) {
			max = min
			min = 0
		} else {
			min = 0
			max = 1
		}
	}
	return currentRandom() * (max - min) + min
}
let noiseProfile = { generator: undefined, octaves: 4, fallout: 0.5, seed: undefined }
function PerlinNoise(seed) {
	let rnd = seed !== undefined ? new Marsaglia(seed) : Marsaglia.createRandomized()
	let i, j
	// http://www.noisemachine.com/talk1/17b.html
	// http://mrl.nyu.edu/~perlin/noise/
	// generate permutation
	let perm = new Uint8Array(512)
	for(i=0;i<256;++i) {
		perm[i] = i
	}
	for(i=0;i<256;++i) {
		let t = perm[j = rnd.nextInt() & 0xFF]; perm[j] = perm[i]; perm[i] = t
	}
	// copy to avoid taking mod in perm[0]
	for(i=0;i<256;++i) {
		perm[i + 256] = perm[i]
	}

	function grad3d(i,x,y,z) {
		let h = i & 15; // convert into 12 gradient directions
		let u = h<8 ? x : y,
			v = h<4 ? y : h===12||h===14 ? x : z
		return ((h&1) === 0 ? u : -u) + ((h&2) === 0 ? v : -v)
	}

	function grad2d(i,x,y) {
		let v = (i & 1) === 0 ? x : y
		return (i&2) === 0 ? -v : v
	}

	function grad1d(i,x) {
		return (i&1) === 0 ? -x : x
	}

	function lerp(t,a,b) {
		return a + t * (b - a)
	}

	this.noise3d = function(x, y, z) {
		let X = Math.floor(x) & 255, Y = Math.floor(y) & 255, Z = Math.floor(z) & 255
		x -= Math.floor(x); y -= Math.floor(y); z -= Math.floor(z)
		let fx = (3-2*x)*x*x, fy = (3-2*y)*y*y, fz = (3-2*z)*z*z
		let p0 = perm[X]+Y, p00 = perm[p0] + Z, p01 = perm[p0 + 1] + Z,
			p1 = perm[X + 1] + Y, p10 = perm[p1] + Z, p11 = perm[p1 + 1] + Z
		return lerp(fz,
			lerp(fy, lerp(fx, grad3d(perm[p00], x, y, z), grad3d(perm[p10], x-1, y, z)),
				lerp(fx, grad3d(perm[p01], x, y-1, z), grad3d(perm[p11], x-1, y-1,z))),
			lerp(fy, lerp(fx, grad3d(perm[p00 + 1], x, y, z-1), grad3d(perm[p10 + 1], x-1, y, z-1)),
				lerp(fx, grad3d(perm[p01 + 1], x, y-1, z-1), grad3d(perm[p11 + 1], x-1, y-1,z-1))))
	}

	this.noise2d = function(x, y) {
		let X = Math.floor(x)&255, Y = Math.floor(y)&255
		x -= Math.floor(x); y -= Math.floor(y)
		let fx = (3-2*x)*x*x, fy = (3-2*y)*y*y
		let p0 = perm[X]+Y, p1 = perm[X + 1] + Y
		return lerp(fy,
			lerp(fx, grad2d(perm[p0], x, y), grad2d(perm[p1], x-1, y)),
			lerp(fx, grad2d(perm[p0 + 1], x, y-1), grad2d(perm[p1 + 1], x-1, y-1)))
	}

	this.noise1d = function(x) {
		let X = Math.floor(x)&255
		x -= Math.floor(x)
		let fx = (3-2*x)*x*x
		return lerp(fx, grad1d(perm[X], x), grad1d(perm[X+1], x-1))
	}
}
let noiseSeed = function(seed) {
	noiseProfile.seed = seed
	noiseProfile.generator = new PerlinNoise(noiseProfile.seed)
}

noiseSeed(0)

let noise = function(x, y, z) {
	let generator = noiseProfile.generator
	let effect = 1, k = 1, sum = 0
	for(let i = 0; i < noiseProfile.octaves; ++i) {
		effect *= noiseProfile.fallout
		switch (arguments.length) {
			case 1:
				sum += effect * (1 + generator.noise1d(k*x))/2; break
			case 2:
				sum += effect * (1 + generator.noise2d(k*x, k*y))/2; break
			case 3:
				sum += effect * (1 + generator.noise3d(k*x, k*y, k*z))/2; break
		}
		k *= 2
	}
	return sum
}

function createProgram(vsh,fsh){
    
    let vshText=document.getElementById(vsh).text.trim().replaceAll('INV_AVG_HALF_WIDTH_HEIGHT',2/((width+height)*0.5)).replaceAll('INV_HALF_WIDTH',1/(width*0.5)).replaceAll('INV_HALF_HEIGHT',1/(height*0.5)).replaceAll('INV_WIDTH',1/width).replaceAll('INV_HEIGHT',1/height).replaceAll('HALF_WIDTH',width*0.5+0.0000001).replaceAll('HALF_HEIGHT',height*0.5+0.0000001).replaceAll('INV_ASPECT',1/(aspect)+0.00001).replaceAll('ASPECT',aspect+0.000001).replaceAll('SCREEN_CHANGE',(((width+height)*0.5)/600)+0.00001)
    let fshText=document.getElementById(fsh).text.trim().replaceAll('LIGHT_DIR','vec3('+lightDir[0]+','+lightDir[1]+','+lightDir[2]+')').replaceAll('INV_AVG_HALF_WIDTH_HEIGHT',2/((width+height)*0.5)).replaceAll('INV_HALF_WIDTH',1/(width*0.5)).replaceAll('INV_HALF_HEIGHT',1/(height*0.5)).replaceAll('INV_WIDTH',1/width).replaceAll('INV_HEIGHT',1/height).replaceAll('HALF_WIDTH',width*0.5+0.0000001).replaceAll('HALF_HEIGHT',height*0.5+0.0000001).replaceAll('INV_ASPECT',1/(aspect)+0.00001).replaceAll('ASPECT',aspect+0.00001).replaceAll('SCREEN_CHANGE',(((width+height)*0.5)/600)+0.00001)
    
    vsh=gl.createShader(gl.VERTEX_SHADER)
    fsh=gl.createShader(gl.FRAGMENT_SHADER)
    gl.shaderSource(vsh,vshText)
    gl.shaderSource(fsh,fshText)
    gl.compileShader(vsh)
    gl.compileShader(fsh)
    
    let p=gl.createProgram()
    gl.attachShader(p,vsh)
    gl.attachShader(p,fsh)
    gl.linkProgram(p)
    
    return p
}

let staticGeometryProgram=createProgram('static_geometry_vsh','static_geometry_fsh'),
    dynamicGeometryProgram=createProgram('dynamic_geometry_vsh','dynamic_geometry_fsh'),
    tokenGeometryProgram=createProgram('token_geometry_vsh','token_geometry_fsh'),
    flowerGeometryProgram=createProgram('flower_geometry_vsh','flower_geometry_fsh'),
    beeGeometryProgram=createProgram('bee_geometry_vsh','bee_geometry_fsh'),
    particleRendererProgram=createProgram('particle_renderer_vsh','particle_renderer_fsh'),
    explosionRendererProgram=createProgram('explosion_renderer_vsh','explosion_renderer_fsh'),
    textRendererProgram=createProgram('text_renderer_vsh','text_renderer_fsh'),
    mobRendererProgram=createProgram('mob_renderer_vsh','mob_renderer_fsh'),
    trailRendererProgram=createProgram('trail_renderer_vsh','trail_renderer_fsh')

let initGlCache=function(glCache){
    
    glCache.static_viewMatrix=gl.getUniformLocation(staticGeometryProgram,'viewMatrix')
    glCache.static_isNight=gl.getUniformLocation(staticGeometryProgram,'isNight')
    glCache.static_vertPos=gl.getAttribLocation(staticGeometryProgram,'vertPos')
    gl.enableVertexAttribArray(glCache.static_vertPos)
    glCache.static_vertColor=gl.getAttribLocation(staticGeometryProgram,'vertColor')
    gl.enableVertexAttribArray(glCache.static_vertColor)
    glCache.static_vertUV=gl.getAttribLocation(staticGeometryProgram,'vertUV')
    gl.enableVertexAttribArray(glCache.static_vertUV)
    
    glCache.dynamic_viewMatrix=gl.getUniformLocation(dynamicGeometryProgram,'viewMatrix')
    glCache.dynamic_modelMatrix=gl.getUniformLocation(dynamicGeometryProgram,'modelMatrix')
    glCache.dynamic_isNight=gl.getUniformLocation(dynamicGeometryProgram,'isNight')
    glCache.dynamic_vertPos=gl.getAttribLocation(dynamicGeometryProgram,'vertPos')
    gl.enableVertexAttribArray(glCache.dynamic_vertPos)
    glCache.dynamic_vertColor=gl.getAttribLocation(dynamicGeometryProgram,'vertColor')
    gl.enableVertexAttribArray(glCache.dynamic_vertColor)
    glCache.dynamic_vertNormal=gl.getAttribLocation(dynamicGeometryProgram,'vertNormal')
    gl.enableVertexAttribArray(glCache.dynamic_vertNormal)
    
    glCache.token_viewMatrix=gl.getUniformLocation(tokenGeometryProgram,'viewMatrix')
    glCache.token_isNight=gl.getUniformLocation(tokenGeometryProgram,'isNight')
    glCache.token_vertPos=gl.getAttribLocation(tokenGeometryProgram,'vertPos')
    gl.enableVertexAttribArray(glCache.token_vertPos)
    glCache.token_vertUV=gl.getAttribLocation(tokenGeometryProgram,'vertUV')
    gl.enableVertexAttribArray(glCache.token_vertUV)
    glCache.token_instancePos=gl.getAttribLocation(tokenGeometryProgram,'instance_pos')
    gl.enableVertexAttribArray(glCache.token_instancePos)
    glCache.token_instanceUV=gl.getAttribLocation(tokenGeometryProgram,'instance_uv')
    gl.enableVertexAttribArray(glCache.token_instanceUV)
    
    glCache.flower_viewMatrix=gl.getUniformLocation(flowerGeometryProgram,'viewMatrix')
    glCache.flower_isNight=gl.getUniformLocation(flowerGeometryProgram,'isNight')
    glCache.flower_vertPos=gl.getAttribLocation(flowerGeometryProgram,'vertPos')
    gl.enableVertexAttribArray(glCache.flower_vertPos)
    glCache.flower_vertUV=gl.getAttribLocation(flowerGeometryProgram,'vertUV')
    gl.enableVertexAttribArray(glCache.flower_vertUV)
    glCache.flower_vertGoo=gl.getAttribLocation(flowerGeometryProgram,'vertGoo')
    gl.enableVertexAttribArray(glCache.flower_vertGoo)
    
    glCache.bee_viewMatrix=gl.getUniformLocation(beeGeometryProgram,'viewMatrix')
    glCache.bee_isNight=gl.getUniformLocation(beeGeometryProgram,'isNight')
    glCache.bee_vertPos=gl.getAttribLocation(beeGeometryProgram,'vertPos')
    gl.enableVertexAttribArray(glCache.bee_vertPos)
    glCache.bee_vertUV=gl.getAttribLocation(beeGeometryProgram,'vertUV')
    gl.enableVertexAttribArray(glCache.bee_vertUV)
    glCache.bee_instancePos=gl.getAttribLocation(beeGeometryProgram,'instance_pos')
    gl.enableVertexAttribArray(glCache.bee_instancePos)
    glCache.bee_instanceRotation=gl.getAttribLocation(beeGeometryProgram,'instance_rotation')
    gl.enableVertexAttribArray(glCache.bee_instanceRotation)
    glCache.bee_instanceUV=gl.getAttribLocation(beeGeometryProgram,'instance_uv')
    gl.enableVertexAttribArray(glCache.bee_instanceUV)
    
    glCache.particle_vertPos=gl.getAttribLocation(particleRendererProgram,'vertPos')
    gl.enableVertexAttribArray(glCache.particle_vertPos)
    glCache.particle_vertColor=gl.getAttribLocation(particleRendererProgram,'vertColor')
    gl.enableVertexAttribArray(glCache.particle_vertColor)
    glCache.particle_vertSize=gl.getAttribLocation(particleRendererProgram,'vertSize')
    gl.enableVertexAttribArray(glCache.particle_vertSize)
    glCache.particle_vertRot=gl.getAttribLocation(particleRendererProgram,'vertRot')
    gl.enableVertexAttribArray(glCache.particle_vertRot)
    glCache.particle_viewMatrix=gl.getUniformLocation(particleRendererProgram,'viewMatrix')
    
    glCache.explosion_vertPos=gl.getAttribLocation(explosionRendererProgram,'vertPos')
    gl.enableVertexAttribArray(glCache.explosion_vertPos)
    glCache.explosion_instancePos=gl.getAttribLocation(explosionRendererProgram,'instance_pos')
    gl.enableVertexAttribArray(glCache.explosion_instancePos)
    glCache.explosion_instanceColor=gl.getAttribLocation(explosionRendererProgram,'instance_color')
    gl.enableVertexAttribArray(glCache.explosion_instanceColor)
    glCache.explosion_instanceScale=gl.getAttribLocation(explosionRendererProgram,'instance_scale')
    gl.enableVertexAttribArray(glCache.explosion_instanceScale)
    glCache.explosion_viewMatrix=gl.getUniformLocation(explosionRendererProgram,'viewMatrix')
    
    glCache.text_vertPos=gl.getAttribLocation(textRendererProgram,'vertPos')
    gl.enableVertexAttribArray(glCache.text_vertPos)
    glCache.text_vertUV=gl.getAttribLocation(textRendererProgram,'vertUV')
    gl.enableVertexAttribArray(glCache.text_vertUV)
    glCache.text_instanceOrigin=gl.getAttribLocation(textRendererProgram,'instance_origin')
    gl.enableVertexAttribArray(glCache.text_instanceOrigin)
    glCache.text_instanceOffset=gl.getAttribLocation(textRendererProgram,'instance_offset')
    gl.enableVertexAttribArray(glCache.text_instanceOffset)
    glCache.text_instanceUV=gl.getAttribLocation(textRendererProgram,'instance_uv')
    gl.enableVertexAttribArray(glCache.text_instanceUV)
    glCache.text_instanceColor=gl.getAttribLocation(textRendererProgram,'instance_color')
    gl.enableVertexAttribArray(glCache.text_instanceColor)
    glCache.text_instanceInfo=gl.getAttribLocation(textRendererProgram,'instance_info')
    gl.enableVertexAttribArray(glCache.text_instanceInfo)
    glCache.text_viewMatrix=gl.getUniformLocation(textRendererProgram,'viewMatrix')
    
    glCache.mob_viewMatrix=gl.getUniformLocation(mobRendererProgram,'viewMatrix')
    glCache.mob_isNight=gl.getUniformLocation(mobRendererProgram,'isNight')
    glCache.mob_vertPos=gl.getAttribLocation(mobRendererProgram,'vertPos')
    gl.enableVertexAttribArray(glCache.mob_vertPos)
    glCache.mob_vertColor=gl.getAttribLocation(mobRendererProgram,'vertColor')
    gl.enableVertexAttribArray(glCache.mob_vertColor)
    glCache.mob_instanceInfo1=gl.getUniformLocation(mobRendererProgram,'instance_info1')
    glCache.mob_instanceInfo2=gl.getUniformLocation(mobRendererProgram,'instance_info2')
    
    glCache.trail_viewMatrix=gl.getUniformLocation(trailRendererProgram,'viewMatrix')
    glCache.trail_vertPos=gl.getAttribLocation(trailRendererProgram,'vertPos')
    gl.enableVertexAttribArray(glCache.trail_vertPos)
    glCache.trail_vertColor=gl.getAttribLocation(trailRendererProgram,'vertCol')
    gl.enableVertexAttribArray(glCache.trail_vertColor)
    glCache.trail_isNight=gl.getUniformLocation(trailRendererProgram,'isNight')
    
    return glCache
    
}

let glCache=initGlCache({}),globalMeshID=0

class Mesh {
    
    constructor(isStatic=true,verts,index){
        
        this.isStatic=isStatic
        this.setMesh(verts||[],index||[])
        this.meshGlobalID=globalMeshID++
        // globalMeshID++
    }
    
    setMesh(verts,index){
        
        this.mesh={
            
            data:{
                verts:new Float32Array(verts),
                index:new Uint16Array(index)
            },
            buffers:{
                verts:gl.createBuffer(),
                index:gl.createBuffer()
            },
            
            indexAmount:index.length,
        }
    }
    
    setMeshFromFunction(func){
        
        let verts=[],index=[],addBox,addHiveSlot,addCylinder,addSphere,applyFinalRotation,addGiftedRing,addStar,addLimbBox,addLimbCylinder,DIS=this
        
        if(this.isStatic){
            
            for(let i in world.bodies){
                
                if(world.bodies[i].collisionFilterGroup===STATIC_PHYSICS_GROUP&&world.bodies[i].parentMeshGlobalID===this.meshGlobalID){
                    world.removeBody(world.bodies[i])
                }
            }
            
            addBox=function(x,y,z,w,h,l,rot,col,physics=true,textures=true,mesh=true){
                
                rot=rot||[0,0,0]
                
                let rotation=quat.fromEuler([],rot[0],rot[1],rot[2])
                let model=mat4.fromRotationTranslation([],rotation,[x,y,z,1]),a=col[3]||1
                
                col[0]*=1.2
                col[1]*=1.2
                col[2]*=1.2
                
                if(physics){
                    
                    let B=new CANNON.Body({
                        
                        shape:new CANNON.Box(new CANNON.Vec3(w*0.5,h*0.5,l*0.5)),
                        mass:0,
                        position:new CANNON.Vec3(x,y,z),
                        quaternion:new CANNON.Quaternion(...rotation),
                        collisionFilterGroup:STATIC_PHYSICS_GROUP,
                        collisionFilterMask:PLAYER_PHYSICS_GROUP,
                        
                    })
                    
                    B.parentMeshGlobalID=DIS.meshGlobalID
                    world.addBody(B)
                }
                
                let v=[
                    
                    [-0.5*w,0.5*h,-0.5*l],
                    [-0.5*w,0.5*h,0.5*l],
                    [0.5*w,0.5*h,0.5*l],
                    [0.5*w,0.5*h,-0.5*l],
                    [-0.5*w,-0.5*h,-0.5*l],
                    [-0.5*w,-0.5*h,0.5*l],
                    [0.5*w,-0.5*h,0.5*l],
                    [0.5*w,-0.5*h,-0.5*l],
                ]
                
                let shade=[]
                
                let normals=[
                    
                    [0,1,0],
                    [0,0,1],
                    [0,0,-1],
                    [1,0,0],
                    [-1,0,0],
                    [0,-1,0],
                ]
                
                for(var i=0,_l=v.length;i<_l;i++){
                    
                    vec3.transformMat4(v[i],v[i],model)
                    
                    if(i<6){
                        
                        vec3.transformQuat(normals[i],normals[i],rotation)
                        let n=normals[i]
                        let d=n[0]*lightDir[0]+n[1]*lightDir[1]+n[2]*lightDir[2]
                        shade[i]=d*0.8+0.65
                        
                    }
                }
                
                let vl=verts.length/10
                
                if(!textures){
                    
                    w=0
                    h=0
                    l=0
                }
                
                if(!mesh){return}
                
                verts.push(
                    
                    v[0][0],v[0][1],v[0][2],col[0]*shade[0],col[1]*shade[0],col[2]*shade[0],a,w,l,0,
                    v[1][0],v[1][1],v[1][2],col[0]*shade[0],col[1]*shade[0],col[2]*shade[0],a,w,0,0,
                    v[2][0],v[2][1],v[2][2],col[0]*shade[0],col[1]*shade[0],col[2]*shade[0],a,0,0,0,
                    v[3][0],v[3][1],v[3][2],col[0]*shade[0],col[1]*shade[0],col[2]*shade[0],a,0,l,0,
                    
                    v[1][0],v[1][1],v[1][2],col[0]*shade[1],col[1]*shade[1],col[2]*shade[1],a,0,0,0,
                    v[2][0],v[2][1],v[2][2],col[0]*shade[1],col[1]*shade[1],col[2]*shade[1],a,w,0,0,
                    v[5][0],v[5][1],v[5][2],col[0]*shade[1],col[1]*shade[1],col[2]*shade[1],a,0,h,0,
                    v[6][0],v[6][1],v[6][2],col[0]*shade[1],col[1]*shade[1],col[2]*shade[1],a,w,h,0,
                    
                    v[0][0],v[0][1],v[0][2],col[0]*shade[2],col[1]*shade[2],col[2]*shade[2],a,w,h,0,
                    v[3][0],v[3][1],v[3][2],col[0]*shade[2],col[1]*shade[2],col[2]*shade[2],a,0,h,0,
                    v[4][0],v[4][1],v[4][2],col[0]*shade[2],col[1]*shade[2],col[2]*shade[2],a,w,0,0,
                    v[7][0],v[7][1],v[7][2],col[0]*shade[2],col[1]*shade[2],col[2]*shade[2],a,0,0,0,
                    
                    v[2][0],v[2][1],v[2][2],col[0]*shade[3],col[1]*shade[3],col[2]*shade[3],a,0,0,0,
                    v[3][0],v[3][1],v[3][2],col[0]*shade[3],col[1]*shade[3],col[2]*shade[3],a,l,0,0,
                    v[6][0],v[6][1],v[6][2],col[0]*shade[3],col[1]*shade[3],col[2]*shade[3],a,0,h,0,
                    v[7][0],v[7][1],v[7][2],col[0]*shade[3],col[1]*shade[3],col[2]*shade[3],a,l,h,0,
                    
                    v[0][0],v[0][1],v[0][2],col[0]*shade[4],col[1]*shade[4],col[2]*shade[4],a,0,0,0,
                    v[1][0],v[1][1],v[1][2],col[0]*shade[4],col[1]*shade[4],col[2]*shade[4],a,l,0,0,
                    v[4][0],v[4][1],v[4][2],col[0]*shade[4],col[1]*shade[4],col[2]*shade[4],a,0,h,0,
                    v[5][0],v[5][1],v[5][2],col[0]*shade[4],col[1]*shade[4],col[2]*shade[4],a,l,h,0,
                    
                    v[4][0],v[4][1],v[4][2],col[0]*shade[5],col[1]*shade[5],col[2]*shade[5],a,0,l,0,
                    v[5][0],v[5][1],v[5][2],col[0]*shade[5],col[1]*shade[5],col[2]*shade[5],a,0,0,0,
                    v[6][0],v[6][1],v[6][2],col[0]*shade[5],col[1]*shade[5],col[2]*shade[5],a,w,0,0,
                    v[7][0],v[7][1],v[7][2],col[0]*shade[5],col[1]*shade[5],col[2]*shade[5],a,w,l,0,
                    
                )
                
                index.push(
                    
                    0+vl,1+vl,2+vl,
                    0+vl,2+vl,3+vl,
                    5+vl,6+vl,7+vl,
                    6+vl,5+vl,4+vl,
                    8+vl,9+vl,10+vl,
                    11+vl,10+vl,9+vl,
                    14+vl,13+vl,12+vl,
                    13+vl,14+vl,15+vl,
                    18+vl,17+vl,16+vl,
                    17+vl,18+vl,19+vl,
                    22+vl,21+vl,20+vl,
                    23+vl,22+vl,20+vl
                )
            }
            
            addHiveSlot=function(x,y,z,w,h,type){
                
                let t=128/2048,_x=beeInfo[type||'basic'].u,_y=beeInfo[type||'basic'].v,isNull=type===null?1:0,[r,g,b]=COLORS.honey_normalized
                
                r*=0.5
                g*=0.5
                b*=0.5
                
                let vl=verts.length/10
                
                verts.push(
                    
                    x-w,y-h,z,r,g,b,1,_x,t+_y,isNull,
                    x+w,y-h,z,r,g,b,1,t+_x,t+_y,isNull,
                    x+w,y+h,z,r,g,b,1,t+_x,_y,isNull,
                    x-w,y+h,z,r,g,b,1,_x,_y,isNull,
                )
                
                index.push(vl,vl+1,vl+2,vl+2,vl+3,vl)
            }
            
            addGiftedRing=function(x,y,z,w,h){
                
                // let vl=verts.length/10,r=1,g=0.95,b=0
                
                // verts.push(
                    
                //     x-w,y-h,z,r,g,b,1,0,0,1,
                //     x+w,y-h,z,r,g,b,1,0,0,1,
                //     x+w,y+h,z,r,g,b,1,0,0,1,
                //     x-w,y+h,z,r,g,b,1,0,0,1,
                // )
                
                // index.push(vl,vl+1,vl+2,vl+2,vl+3,vl)
                
                addBox(x,y,z,w*2,h*2,0.25,false,[100,100,0],false,false)
            }
            
            addStar=function(x,y,z,innerRad,outerRad,thickness,depth,r,g,b,la=0.75,lb=0.25,rx=0,ry=0,rz=0){
                
                let rotQuat=quat.fromEuler([],rx,ry,rz)
                
                innerRad*=0.8
                let _verts=[],_index=[],pos=[],vs=[],ix=[],j=0,vl=verts.length/10
                
                for(let i=0;i<MATH.TWO_PI;i+=MATH.TWO_PI/10){
                    
                    let r=(j++)%2===0?outerRad:innerRad
                    
                    pos.push([Math.sin(i)*r,Math.cos(i)*r,-thickness])
                }
                
                j=0
                
                for(let i=0;i<MATH.TWO_PI;i+=MATH.TWO_PI/10){
                    
                    let r=(j++)%2===0?outerRad:innerRad
                    
                    pos.push([Math.sin(i)*r,Math.cos(i)*r,thickness])
                }
                
                pos.push([0,0,-depth],[0,0,depth])
                
                vs.push(0,1,20,1,2,20,2,3,20,3,4,20,4,5,20,5,6,20,6,7,20,7,8,20,8,9,20,9,0,20,11,10,21,12,11,21,13,12,21,14,13,21,15,14,21,16,15,21,17,16,21,18,17,21,19,18,21,10,19,21,9,10,0)
                
                ix.push(2,1,0,5,4,3,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62)
                
                for(let i=0;i<10;i++){
                    
                    vs.push(0+i,10+i,1+i,11+i,1+i,10+i)
                    ix.push(i*6,i*6+1,i*6+2,i*6+3,i*6+4,i*6+5)
                }
                
                for(let i=63;i<ix.length;i++){
                    
                    ix[i]+=63
                }
                
                for(let i=0;i<pos.length;i++){
                    
                    vec3.transformQuat(pos[i],pos[i],rotQuat)
                    vec3.add(pos[i],pos[i],[x,y,z])
                }
                
                for(let i in vs){
                    
                    vs[i]=pos[vs[i]]
                }
                
                _index=ix
                
                let findNorm=(a,b,c)=>{
                    
                    a=vs[a]
                    b=vs[b]
                    c=vs[c]
                    
                    let n=vec3.cross([],[a[0]-b[0],a[1]-b[1],a[2]-b[2]],[a[0]-c[0],a[1]-c[1],a[2]-c[2]])
                    
                    return vec3.normalize(n,n)
                }
                
                for(let i=0;i<_index.length;i+=3){
                    
                    let i1=_index[i],i2=_index[i+1],i3=_index[i+2],shade=vec3.dot([0.035,0.175,0.053],findNorm(i1,i2,i3))*la+lb
                    
                    verts.push(...vs[i1],r*shade,g*shade,b*shade,1,0,0,0,...vs[i2],r*shade,g*shade,b*shade,1,0,0,0,...vs[i3],r*shade,g*shade,b*shade,1,0,0,0)
                }
                
                for(let i in _index){
                    
                    _index[i]+=vl
                }
                
                index.push(..._index)
            }
            
            addCylinder=function(x,y,z,rad,hei,sides,r,g,b,a,rx,ry,rz,r2,shading=true){
                let rad2=r2??rad,vl=verts.length/10,_verts=[],_index=[]
                
                for(let t=0,inc=MATH.TWO_PI/sides;t<=MATH.TWO_PI;t+=inc){
                    
                    let t1=t-inc*0.5,t2=t+inc*0.5,s=shading?Math.sin(t1)*0.1+0.9:1
                    _verts.push(
                        Math.cos(t1)*rad,Math.sin(t1)*rad,hei*0.5,r*s,g*s,b*s,a,0,0,0,
                        Math.cos(t1)*rad2,Math.sin(t1)*rad2,-hei*0.5,r*s,g*s,b*s,a,0,0,0,
                        Math.cos(t2)*rad,Math.sin(t2)*rad,hei*0.5,r*s,g*s,b*s,a,0,0,0,
                        Math.cos(t2)*rad2,Math.sin(t2)*rad2,-hei*0.5,r*s,g*s,b*s,a,0,0,0)
                    
                    let _vl=_verts.length/10
                    _index.push(_vl,_vl+1,_vl+2,_vl+3,_vl+2,_vl+1)
                }
                
                let _v=_verts.length/10
                
                for(let t=0,inc=MATH.TWO_PI/sides;t<=MATH.TWO_PI;t+=inc){
                    
                    let t1=t-inc*0.5,t2=t+inc*0.5
                    _verts.push(
                        Math.cos(t1)*rad,Math.sin(t1)*rad,hei*0.5,r*0.9,g*0.9,b*0.9,a,0,0,0,
                        Math.cos(t2)*rad,Math.sin(t2)*rad,hei*0.5,r*0.9,g*0.9,b*0.9,a,0,0,0)
                }
                for(let l=_verts.length/10,i=_v;i<l;i++){
                    
                    _index.push(_v,i,i+2)
                }
                _v=_verts.length/10
                for(let t=0,inc=MATH.TWO_PI/sides;t<=MATH.TWO_PI;t+=inc){
                    
                    let t1=t-inc*0.5,t2=t+inc*0.5
                    _verts.push(
                        
                        Math.cos(t1)*rad2,Math.sin(t1)*rad2,-hei*0.5,r*0.7,g*0.7,b*0.7,a,0,0,0,
                        Math.cos(t2)*rad2,Math.sin(t2)*rad2,-hei*0.5,r*0.7,g*0.7,b*0.7,a,0,0,0)
                }
                for(let l=_verts.length/10,i=_v;i<l;i++){
                    
                    _index.push(i,i-1,_v)
                }
                
                for(let i in _index){
                    
                    _index[i]+=vl
                }
                
                index.push(..._index)
                
                let rotQuat=quat.fromEuler([],rx,ry,rz)
                
                for(let i=0;i<_verts.length;i+=10){
                    
                    if(rx){
                        
                        let rotated=vec3.transformQuat([],[_verts[i],_verts[i+1],_verts[i+2]],rotQuat)
                        _verts[i]=rotated[0]+x
                        _verts[i+1]=rotated[1]+y
                        _verts[i+2]=rotated[2]+z
                        
                        rotated=vec3.transformQuat(rotated,[_verts[i+7],_verts[i+8],_verts[i+9]],rotQuat)
                        
                        _verts[i+7]=rotated[0]
                        _verts[i+8]=rotated[1]
                        _verts[i+9]=rotated[2]
                        
                    } else {
                        
                        _verts[i]+=x
                        _verts[i+1]+=y
                        _verts[i+2]+=z
                    }
                }
                
                verts.push(..._verts)
                
            }
            
            addSphere=function(x,y,z,rad,detail,r,g,b,a,ys=1){
                
                let _m=MATH.icosphere(detail),_verts=[],_index=[]
                
                for(let i=0,l=_m.verts.length;i<l;i+=3){
                    
                    _verts.push(_m.verts[i]*rad+x,_m.verts[i+1]*rad*ys+y,_m.verts[i+2]*rad+z,r,g,b,a,0,0,0)
                }
                
                for(let i in _m.index){
                    
                    _index.push(_m.index[i]+verts.length/10)
                }
                
                verts.push(..._verts)
                index.push(..._index)
            }
            
            addLimbBox=function(x,y,z,w,h,l,rot,u,_v){
                
                rot=rot||[0,0,0]
                
                let rotation=quat.fromEuler([],rot[0],rot[1],rot[2])
                let model=mat4.fromRotationTranslation([],rotation,[x,y,z,1]),a=1
                
                let v=[
                    
                    [-0.5*w,0.5*h,-0.5*l],
                    [-0.5*w,0.5*h,0.5*l],
                    [0.5*w,0.5*h,0.5*l],
                    [0.5*w,0.5*h,-0.5*l],
                    [-0.5*w,-0.5*h,-0.5*l],
                    [-0.5*w,-0.5*h,0.5*l],
                    [0.5*w,-0.5*h,0.5*l],
                    [0.5*w,-0.5*h,-0.5*l],
                ]
                
                let shade=[]
                
                let normals=[
                    
                    [0,1,0],
                    [0,0,1],
                    [0,0,-1],
                    [1,0,0],
                    [-1,0,0],
                    [0,-1,0],
                ]
                
                for(var i=0,_l=v.length;i<_l;i++){
                    
                    vec3.transformMat4(v[i],v[i],model)
                    
                    if(i<6){
                        
                        vec3.transformQuat(normals[i],normals[i],rotation)
                        let n=normals[i]
                        let d=n[0]*lightDir[0]+n[1]*lightDir[1]+n[2]*lightDir[2]
                        shade[i]=d*0.8+0.65
                        
                    }
                }
                
                let vl=verts.length/10,tv=126/1024,col=[1,1,1]
                
                u+=1/1024
                _v+=1/1024
                
                verts.push(
                    
                    v[0][0],v[0][1],v[0][2],col[0]*shade[0],col[1]*shade[0],col[2]*shade[0],a,u,_v,0,
                    v[1][0],v[1][1],v[1][2],col[0]*shade[0],col[1]*shade[0],col[2]*shade[0],a,u,_v,0,
                    v[2][0],v[2][1],v[2][2],col[0]*shade[0],col[1]*shade[0],col[2]*shade[0],a,u,_v,0,
                    v[3][0],v[3][1],v[3][2],col[0]*shade[0],col[1]*shade[0],col[2]*shade[0],a,u,_v,0,
                    
                    v[1][0],v[1][1],v[1][2],col[0]*shade[1],col[1]*shade[1],col[2]*shade[1],a,u,_v,0,
                    v[2][0],v[2][1],v[2][2],col[0]*shade[1],col[1]*shade[1],col[2]*shade[1],a,u+tv,_v,0,
                    v[5][0],v[5][1],v[5][2],col[0]*shade[1],col[1]*shade[1],col[2]*shade[1],a,u,_v+tv,0,
                    v[6][0],v[6][1],v[6][2],col[0]*shade[1],col[1]*shade[1],col[2]*shade[1],a,u+tv,_v+tv,0,
                    
                    v[0][0],v[0][1],v[0][2],col[0]*shade[2],col[1]*shade[2],col[2]*shade[2],a,u,_v,0,
                    v[3][0],v[3][1],v[3][2],col[0]*shade[2],col[1]*shade[2],col[2]*shade[2],a,u,_v,0,
                    v[4][0],v[4][1],v[4][2],col[0]*shade[2],col[1]*shade[2],col[2]*shade[2],a,u,_v,0,
                    v[7][0],v[7][1],v[7][2],col[0]*shade[2],col[1]*shade[2],col[2]*shade[2],a,u,_v,0,
                    
                    v[2][0],v[2][1],v[2][2],col[0]*shade[3],col[1]*shade[3],col[2]*shade[3],a,u,_v,0,
                    v[3][0],v[3][1],v[3][2],col[0]*shade[3],col[1]*shade[3],col[2]*shade[3],a,u,_v,0,
                    v[6][0],v[6][1],v[6][2],col[0]*shade[3],col[1]*shade[3],col[2]*shade[3],a,u,_v,0,
                    v[7][0],v[7][1],v[7][2],col[0]*shade[3],col[1]*shade[3],col[2]*shade[3],a,u,_v,0,
                    
                    v[0][0],v[0][1],v[0][2],col[0]*shade[4],col[1]*shade[4],col[2]*shade[4],a,u,_v,0,
                    v[1][0],v[1][1],v[1][2],col[0]*shade[4],col[1]*shade[4],col[2]*shade[4],a,u,_v,0,
                    v[4][0],v[4][1],v[4][2],col[0]*shade[4],col[1]*shade[4],col[2]*shade[4],a,u,_v,0,
                    v[5][0],v[5][1],v[5][2],col[0]*shade[4],col[1]*shade[4],col[2]*shade[4],a,u,_v,0,
                    
                    v[4][0],v[4][1],v[4][2],col[0]*shade[5],col[1]*shade[5],col[2]*shade[5],a,u,_v,0,
                    v[5][0],v[5][1],v[5][2],col[0]*shade[5],col[1]*shade[5],col[2]*shade[5],a,u,_v,0,
                    v[6][0],v[6][1],v[6][2],col[0]*shade[5],col[1]*shade[5],col[2]*shade[5],a,u,_v,0,
                    v[7][0],v[7][1],v[7][2],col[0]*shade[5],col[1]*shade[5],col[2]*shade[5],a,u,_v,0,
                    
                )
                
                index.push(
                    
                    0+vl,1+vl,2+vl,
                    0+vl,2+vl,3+vl,
                    5+vl,6+vl,7+vl,
                    6+vl,5+vl,4+vl,
                    8+vl,9+vl,10+vl,
                    11+vl,10+vl,9+vl,
                    14+vl,13+vl,12+vl,
                    13+vl,14+vl,15+vl,
                    18+vl,17+vl,16+vl,
                    17+vl,18+vl,19+vl,
                    22+vl,21+vl,20+vl,
                    23+vl,22+vl,20+vl
                )
            }
            
            addLimbCylinder=function(x,y,z,rad,hei,sides,r,g,b,a,rx,ry,rz,r2,shading=true){
                let rad2=r2??rad,vl=verts.length/10,_verts=[],_index=[]
                
                for(let t=0,inc=MATH.TWO_PI/sides;t<=MATH.TWO_PI;t+=inc){
                    
                    let t1=t-inc*0.5,t2=t+inc*0.5,s=shading?Math.sin(t1)*0.1+0.9:1
                    _verts.push(
                        Math.cos(t1)*rad,Math.sin(t1)*rad,hei*0.5,r*s,g*s,b*s,a,0,0,0,
                        Math.cos(t1)*rad2,Math.sin(t1)*rad2,-hei*0.5,r*s,g*s,b*s,a,0,0,0,
                        Math.cos(t2)*rad,Math.sin(t2)*rad,hei*0.5,r*s,g*s,b*s,a,0,0,0,
                        Math.cos(t2)*rad2,Math.sin(t2)*rad2,-hei*0.5,r*s,g*s,b*s,a,0,0,0)
                    
                    let _vl=_verts.length/10
                    _index.push(_vl,_vl+1,_vl+2,_vl+3,_vl+2,_vl+1)
                }
                
                let _v=_verts.length/10
                
                for(let t=0,inc=MATH.TWO_PI/sides;t<=MATH.TWO_PI;t+=inc){
                    
                    let t1=t-inc*0.5,t2=t+inc*0.5
                    _verts.push(
                        Math.cos(t1)*rad,Math.sin(t1)*rad,hei*0.5,r*0.9,g*0.9,b*0.9,a,0,0,0,
                        Math.cos(t2)*rad,Math.sin(t2)*rad,hei*0.5,r*0.9,g*0.9,b*0.9,a,0,0,0)
                }
                for(let l=_verts.length/10,i=_v;i<l;i++){
                    
                    _index.push(_v,i,i+2)
                }
                _v=_verts.length/10
                for(let t=0,inc=MATH.TWO_PI/sides;t<=MATH.TWO_PI;t+=inc){
                    
                    let t1=t-inc*0.5,t2=t+inc*0.5
                    _verts.push(
                        
                        Math.cos(t1)*rad2,Math.sin(t1)*rad2,-hei*0.5,r*0.7,g*0.7,b*0.7,a,0,0,0,
                        Math.cos(t2)*rad2,Math.sin(t2)*rad2,-hei*0.5,r*0.7,g*0.7,b*0.7,a,0,0,0)
                }
                for(let l=_verts.length/10,i=_v;i<l;i++){
                    
                    _index.push(i,i-1,_v)
                }
                
                for(let i in _index){
                    
                    _index[i]+=vl
                }
                
                index.push(..._index)
                
                let rotQuat=quat.fromEuler([],rx,ry,rz)
                
                for(let i=0;i<_verts.length;i+=10){
                    
                    if(rx){
                        
                        let rotated=vec3.transformQuat([],[_verts[i],_verts[i+1],_verts[i+2]],rotQuat)
                        _verts[i]=rotated[0]+x
                        _verts[i+1]=rotated[1]+y
                        _verts[i+2]=rotated[2]+z
                        
                        rotated=vec3.transformQuat(rotated,[_verts[i+7],_verts[i+8],_verts[i+9]],rotQuat)
                        
                        _verts[i+7]=rotated[0]
                        _verts[i+8]=rotated[1]
                        _verts[i+9]=rotated[2]
                        
                    } else {
                        
                        _verts[i]+=x
                        _verts[i+1]+=y
                        _verts[i+2]+=z
                    }
                }
                
                verts.push(..._verts)
                
            }
            
        } else {
            
            addBox=function(x,y,z,w,h,l,rot,col,rot2=[0,0,0]){
                
                rot=rot||[0,0,0]
                
                let rotation=quat.fromEuler([],rot[0],rot[1],rot[2]),rotation2=quat.fromEuler([],rot2[0],rot2[1],rot2[2])
                let model=mat4.fromRotationTranslation([],rotation,[x,y,z,1])
                
                let v=[
                    
                    [-0.5*w,0.5*h,-0.5*l],
                    [-0.5*w,0.5*h,0.5*l],
                    [0.5*w,0.5*h,0.5*l],
                    [0.5*w,0.5*h,-0.5*l],
                    [-0.5*w,-0.5*h,-0.5*l],
                    [-0.5*w,-0.5*h,0.5*l],
                    [0.5*w,-0.5*h,0.5*l],
                    [0.5*w,-0.5*h,-0.5*l],
                ]
                
                let normals=[
                    
                    [0,1,0],
                    [0,0,1],
                    [0,0,-1],
                    [1,0,0],
                    [-1,0,0],
                    [0,-1,0],
                ]
                
                for(var i=0,_l=v.length;i<_l;i++){
                    
                    vec3.transformMat4(v[i],v[i],model)
                    vec3.transformQuat(v[i],v[i],rotation2)
                    
                    if(i<6){
                        
                        vec3.transformQuat(normals[i],normals[i],rotation)
                    }
                }
                
                let vl=verts.length/9,n=normals
                
                verts.push(
                    
                    v[0][0],v[0][1],v[0][2],col[0],col[1],col[2],n[0][0],n[0][1],n[0][2],
                    v[1][0],v[1][1],v[1][2],col[0],col[1],col[2],n[0][0],n[0][1],n[0][2],
                    v[2][0],v[2][1],v[2][2],col[0],col[1],col[2],n[0][0],n[0][1],n[0][2],
                    v[3][0],v[3][1],v[3][2],col[0],col[1],col[2],n[0][0],n[0][1],n[0][2],
                    
                    v[1][0],v[1][1],v[1][2],col[0],col[1],col[2],n[1][0],n[1][1],n[1][2],
                    v[2][0],v[2][1],v[2][2],col[0],col[1],col[2],n[1][0],n[1][1],n[1][2],
                    v[5][0],v[5][1],v[5][2],col[0],col[1],col[2],n[1][0],n[1][1],n[1][2],
                    v[6][0],v[6][1],v[6][2],col[0],col[1],col[2],n[1][0],n[1][1],n[1][2],
                    
                    v[0][0],v[0][1],v[0][2],col[0],col[1],col[2],n[2][0],n[2][1],n[2][2],
                    v[3][0],v[3][1],v[3][2],col[0],col[1],col[2],n[2][0],n[2][1],n[2][2],
                    v[4][0],v[4][1],v[4][2],col[0],col[1],col[2],n[2][0],n[2][1],n[2][2],
                    v[7][0],v[7][1],v[7][2],col[0],col[1],col[2],n[2][0],n[2][1],n[2][2],
                    
                    v[2][0],v[2][1],v[2][2],col[0],col[1],col[2],n[3][0],n[3][1],n[3][2],
                    v[3][0],v[3][1],v[3][2],col[0],col[1],col[2],n[3][0],n[3][1],n[3][2],
                    v[6][0],v[6][1],v[6][2],col[0],col[1],col[2],n[3][0],n[3][1],n[3][2],
                    v[7][0],v[7][1],v[7][2],col[0],col[1],col[2],n[3][0],n[3][1],n[3][2],
                    
                    v[0][0],v[0][1],v[0][2],col[0],col[1],col[2],n[4][0],n[4][1],n[4][2],
                    v[1][0],v[1][1],v[1][2],col[0],col[1],col[2],n[4][0],n[4][1],n[4][2],
                    v[4][0],v[4][1],v[4][2],col[0],col[1],col[2],n[4][0],n[4][1],n[4][2],
                    v[5][0],v[5][1],v[5][2],col[0],col[1],col[2],n[4][0],n[4][1],n[4][2],
                    
                    v[4][0],v[4][1],v[4][2],col[0],col[1],col[2],n[5][0],n[5][1],n[5][2],
                    v[5][0],v[5][1],v[5][2],col[0],col[1],col[2],n[5][0],n[5][1],n[5][2],
                    v[6][0],v[6][1],v[6][2],col[0],col[1],col[2],n[5][0],n[5][1],n[5][2],
                    v[7][0],v[7][1],v[7][2],col[0],col[1],col[2],n[5][0],n[5][1],n[5][2],
                    
                )
                
                index.push(
                    
                    0+vl,1+vl,2+vl,
                    0+vl,2+vl,3+vl,
                    5+vl,6+vl,7+vl,
                    6+vl,5+vl,4+vl,
                    8+vl,9+vl,10+vl,
                    11+vl,10+vl,9+vl,
                    14+vl,13+vl,12+vl,
                    13+vl,14+vl,15+vl,
                    18+vl,17+vl,16+vl,
                    17+vl,18+vl,19+vl,
                    22+vl,21+vl,20+vl,
                    23+vl,22+vl,20+vl
                )
                
            }
            
            addCylinder=function(x,y,z,rad,hei,sides,r,g,b,rx,ry,rz,r2){
                let rad2=r2??rad,vl=verts.length/9,_verts=[],_index=[]
                
                for(let t=0,inc=MATH.TWO_PI/sides;t<=MATH.TWO_PI;t+=inc){
                    
                    let t1=t-inc*0.5,t2=t+inc*0.5
                    _verts.push(
                        Math.cos(t1)*rad,Math.sin(t1)*rad,hei*0.5,r,g,b,Math.cos(t1),Math.sin(t1),0,
                        Math.cos(t1)*rad2,Math.sin(t1)*rad2,-hei*0.5,r,g,b,Math.cos(t1),Math.sin(t1),0,
                        Math.cos(t2)*rad,Math.sin(t2)*rad,hei*0.5,r,g,b,Math.cos(t2),Math.sin(t2),0,
                        Math.cos(t2)*rad2,Math.sin(t2)*rad2,-hei*0.5,r,g,b,Math.cos(t2),Math.sin(t2),0)
                    
                    let _vl=_verts.length/9
                    _index.push(_vl,_vl+1,_vl+2,_vl+3,_vl+2,_vl+1)
                }
                
                let _v=_verts.length/9
                
                for(let t=0,inc=MATH.TWO_PI/sides;t<=MATH.TWO_PI;t+=inc){
                    
                    let t1=t-inc*0.5,t2=t+inc*0.5
                    _verts.push(
                        Math.cos(t1)*rad,Math.sin(t1)*rad,hei*0.5,r,g,b,0,0,1,
                        Math.cos(t2)*rad,Math.sin(t2)*rad,hei*0.5,r,g,b,0,0,1)
                }
                for(let l=_verts.length/9,i=_v;i<l;i++){
                    
                    _index.push(_v,i,i+2)
                }
                _v=_verts.length/9
                for(let t=0,inc=MATH.TWO_PI/sides;t<=MATH.TWO_PI;t+=inc){
                    
                    let t1=t-inc*0.5,t2=t+inc*0.5
                    _verts.push(
                        
                        Math.cos(t1)*rad2,Math.sin(t1)*rad2,-hei*0.5,r,g,b,0,0,-1,
                        Math.cos(t2)*rad2,Math.sin(t2)*rad2,-hei*0.5,r,g,b,0,0,-1)
                }
                for(let l=_verts.length/9,i=_v;i<l;i++){
                    
                    _index.push(i,i-1,_v)
                }
                
                for(let i in _index){
                    
                    _index[i]+=vl
                }
                
                index.push(..._index)
                
                let rotQuat=quat.fromEuler([],rx,ry,rz)
                
                for(let i=0;i<_verts.length;i+=9){
                    
                    if(rx){
                        
                        let rotated=vec3.transformQuat([],[_verts[i],_verts[i+1],_verts[i+2]],rotQuat)
                        _verts[i]=rotated[0]+x
                        _verts[i+1]=rotated[1]+y
                        _verts[i+2]=rotated[2]+z
                        
                        rotated=vec3.transformQuat(rotated,[_verts[i+6],_verts[i+7],_verts[i+8]],rotQuat)
                        
                        _verts[i+6]=rotated[0]
                        _verts[i+7]=rotated[1]
                        _verts[i+8]=rotated[2]
                        
                    } else {
                        
                        _verts[i]+=x
                        _verts[i+1]+=y
                        _verts[i+2]+=z
                    }
                }
                
                verts.push(..._verts)
            }
            
            addSphere=function(x,y,z,rad,detail,r,g,b,vl){
                
                let _m=MATH.icosphere(detail),_verts=[],_index=[]
                
                for(let i=0,l=_m.verts.length;i<l;i+=3){
                    
                    _verts.push(_m.verts[i]*rad+x,_m.verts[i+1]*rad+y,_m.verts[i+2]*rad+z,r,g,b,_m.verts[i],_m.verts[i+1],_m.verts[i+2])
                }
                
                for(let i in _m.index){
                    
                    _index.push(_m.index[i]+verts.length/9)
                }
                
                verts.push(..._verts)
                index.push(..._index)
            }
            
            addStar=function(x,y,z,innerRad,outerRad,thickness,depth,r,g,b,la=0.75,lb=0.25,rx=0,ry=0,rz=0){
                
                let rotQuat=quat.fromEuler([],rx,ry,rz)
                
                innerRad*=0.8
                let _verts=[],_index=[],pos=[],vs=[],ix=[],j=0,vl=verts.length/9
                
                for(let i=0;i<MATH.TWO_PI;i+=MATH.TWO_PI/10){
                    
                    let r=(j++)%2===0?outerRad:innerRad
                    
                    pos.push([Math.sin(i)*r,Math.cos(i)*r,-thickness])
                }
                
                j=0
                
                for(let i=0;i<MATH.TWO_PI;i+=MATH.TWO_PI/10){
                    
                    let r=(j++)%2===0?outerRad:innerRad
                    
                    pos.push([Math.sin(i)*r,Math.cos(i)*r,thickness])
                }
                
                pos.push([0,0,-depth],[0,0,depth])
                
                vs.push(0,1,20,1,2,20,2,3,20,3,4,20,4,5,20,5,6,20,6,7,20,7,8,20,8,9,20,9,0,20,11,10,21,12,11,21,13,12,21,14,13,21,15,14,21,16,15,21,17,16,21,18,17,21,19,18,21,10,19,21,9,10,0)
                
                ix.push(2,1,0,5,4,3,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62)
                
                for(let i=0;i<10;i++){
                    
                    vs.push(0+i,10+i,1+i,11+i,1+i,10+i)
                    ix.push(i*6,i*6+1,i*6+2,i*6+3,i*6+4,i*6+5)
                }
                
                for(let i=63;i<ix.length;i++){
                    
                    ix[i]+=63
                }
                
                for(let i=0;i<pos.length;i++){
                    
                    vec3.transformQuat(pos[i],pos[i],rotQuat)
                    vec3.add(pos[i],pos[i],[x,y,z])
                }
                
                for(let i in vs){
                    
                    vs[i]=pos[vs[i]]
                }
                
                _index=ix
                
                let findNorm=(a,b,c)=>{
                    
                    a=vs[a]
                    b=vs[b]
                    c=vs[c]
                    
                    let n=vec3.cross([],[a[0]-b[0],a[1]-b[1],a[2]-b[2]],[a[0]-c[0],a[1]-c[1],a[2]-c[2]])
                    
                    return vec3.normalize(n,n)
                }
                
                for(let i=0;i<_index.length;i+=3){
                    
                    let i1=_index[i],i2=_index[i+1],i3=_index[i+2],shade=vec3.dot([0.035,0.175,0.053],findNorm(i1,i2,i3))*la+lb
                    
                    verts.push(...vs[i1],r*shade,g*shade,b*shade,0,1,0,...vs[i2],r*shade,g*shade,b*shade,0,1,0,...vs[i3],r*shade,g*shade,b*shade,0,1,0)
                }
                
                for(let i in _index){
                    
                    _index[i]+=vl
                }
                
                index.push(..._index)
            }
            
            applyFinalRotation=function(x,y,z){
                
                let q=quat.fromEuler([],x,y,z)
                
                for(let i=0;i<verts.length;i+=9){
                    
                    let v=vec3.transformQuat([],[verts[i],verts[i+1],verts[i+2]],q)
                    
                    verts[i]=v[0]
                    verts[i+1]=v[1]
                    verts[i+2]=v[2]
                }
            }
        }
        
        func(addBox,addHiveSlot,addCylinder,addSphere,applyFinalRotation,addGiftedRing,addStar,addLimbBox,addLimbCylinder)
        this.setMesh(verts,index)
    }
    
    setBuffers(){
        
        if(this.isStatic){
            
            gl.bindBuffer(gl.ARRAY_BUFFER,this.mesh.buffers.verts)
            gl.bufferData(gl.ARRAY_BUFFER,this.mesh.data.verts,gl.STATIC_DRAW)
            
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,this.mesh.buffers.index)
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,this.mesh.data.index,gl.STATIC_DRAW)
            
        } else {
            
            gl.bindBuffer(gl.ARRAY_BUFFER,this.mesh.buffers.verts)
            gl.bufferData(gl.ARRAY_BUFFER,this.mesh.data.verts,gl.STATIC_DRAW)
            
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,this.mesh.buffers.index)
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,this.mesh.data.index,gl.STATIC_DRAW)
        }
    }
    
    render(){
        
        if(this.isStatic){
            
            gl.bindBuffer(gl.ARRAY_BUFFER,this.mesh.buffers.verts)
            
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,this.mesh.buffers.index)
            
            gl.vertexAttribPointer(glCache.static_vertPos,3,gl.FLOAT,gl.FALSE,40,0)
            gl.vertexAttribPointer(glCache.static_vertColor,4,gl.FLOAT,gl.FALSE,40,12)
            gl.vertexAttribPointer(glCache.static_vertUV,3,gl.FLOAT,gl.FALSE,40,28)
            
        } else {
            
            gl.bindBuffer(gl.ARRAY_BUFFER,this.mesh.buffers.verts)
            
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,this.mesh.buffers.index)
            
            gl.vertexAttribPointer(glCache.dynamic_vertPos,3,gl.FLOAT,gl.FALSE,36,0)
            gl.vertexAttribPointer(glCache.dynamic_vertColor,3,gl.FLOAT,gl.FALSE,36,12)
            gl.vertexAttribPointer(glCache.dynamic_vertNormal,3,gl.FLOAT,gl.FALSE,36,24)
        }
            
        gl.drawElements(gl.TRIANGLES,this.mesh.indexAmount,gl.UNSIGNED_SHORT,0)
        
    }
}

let textures=(function(out){
    
    tex_ctx.clearRect(0,0,2048,2048)
    
    for(let i=0;i<10;i++){
        
        tex_ctx.fillStyle='rgba(0,0,0,'+Math.random()*0.2+')'
        tex_ctx.fillRect(MATH.random(12,500),MATH.random(12,500),MATH.random(25,45),MATH.random(25,45))
    }
    
    out.default=gl.createTexture()
    
    gl.bindTexture(gl.TEXTURE_2D,out.default)
    gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,512,512,0,gl.RGBA,gl.UNSIGNED_BYTE,tex_ctx.getImageData(0,0,512,512))
    
    gl.generateMipmap(gl.TEXTURE_2D)
    
    function loadTexture1(){
        
        if(FETCHED_CODE.effectsTexture){
            
            FETCHED_CODE.effectsTexture=FETCHED_CODE.effectsTexture.split('#')
            
            FETCHED_CODE.effectsTexture=FETCHED_CODE.effectsTexture[1]
            
            FETCHED_CODE.effectsTexture=FETCHED_CODE.effectsTexture.substr(0,FETCHED_CODE.effectsTexture.length-3)
            
            let f=Object.constructor('tex_ctx',FETCHED_CODE.effectsTexture)
            
            f(tex_ctx)
            
            gl.bindTexture(gl.TEXTURE_2D,out.effects)
            gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,2048,2048,0,gl.RGBA,gl.UNSIGNED_BYTE,tex_ctx.getImageData(0,0,2048,2048))
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
            gl.generateMipmap(gl.TEXTURE_2D)
            
            FETCHED_CODE.effectsTexture=''
            
        } else {
            
            window.setTimeout(loadTexture1,250)
        }
    }
    
    out.effects=gl.createTexture()
    
    gl.bindTexture(gl.TEXTURE_2D,out.effects)
    gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,1,1,0,gl.RGBA,gl.UNSIGNED_BYTE,new Uint8Array([0,0,0,1]))
    fetchCodeFromProgram('effectsTexture',5503726222622720)
    loadTexture1()
    
    function loadTexture3(){
        
        if(FETCHED_CODE.flowersTexture){
            
            FETCHED_CODE.flowersTexture=FETCHED_CODE.flowersTexture.split('#')
            
            FETCHED_CODE.flowersTexture=FETCHED_CODE.flowersTexture[1]
            
            FETCHED_CODE.flowersTexture=FETCHED_CODE.flowersTexture.substr(0,FETCHED_CODE.flowersTexture.length-3)
            
            let f=Object.constructor('tex_ctx',FETCHED_CODE.flowersTexture)
            
            f(tex_ctx)
            
            gl.bindTexture(gl.TEXTURE_2D,out.flowers)
            gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,1024,1024,0,gl.RGBA,gl.UNSIGNED_BYTE,tex_ctx.getImageData(0,0,1024,1024))
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
            gl.generateMipmap(gl.TEXTURE_2D)
            
            FETCHED_CODE.flowersTexture=''
            
        } else {
            
            window.setTimeout(loadTexture3,250)
        }
    }
    
    out.flowers=gl.createTexture()
    
    gl.bindTexture(gl.TEXTURE_2D,out.flowers)
    gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,1,1,0,gl.RGBA,gl.UNSIGNED_BYTE,new Uint8Array([0,0,0,1]))
    fetchCodeFromProgram('flowersTexture',5172660060340224)
    loadTexture3()
    
    tex_ctx.clearRect(0,0,512,600)
    tex_ctx.font='bold 60px arial'
    tex_ctx.fillStyle='rgb(255,255,255)'
    tex_ctx.strokeStyle='rgb(0,0,0)'
    tex_ctx.lineWidth=9
    tex_ctx.textAlign='center'
    tex_ctx.textBaseline='middle'
    
    function t(m,x,y){tex_ctx.strokeText(m,x,y);tex_ctx.fillText(m,x,y)}
    
    for(let i=0;i<10;i++){
        
        t(i,i*50+30,40)
    }
    
    let chars='+⇆,/-:'
    
    for(let i=0;i<chars.length;i++){
        
        t(chars[i],i*50+30,115)
    }
    
    chars='abcdefghij'
    
    for(let i=0;i<chars.length;i++){
        
        t(chars[i],i*50+30,115+75)
    }
    
    chars='klmnopqrst'
    
    for(let i=0;i<chars.length;i++){
        
        t(chars[i],i*50+30,115+75*2)
    }
    
    chars='uvwxyz'
    
    for(let i=0;i<chars.length;i++){
        
        t(chars[i],i*50+30,115+75*3)
    }
    
    chars='abcdefghij'.toUpperCase()
    
    for(let i=0;i<chars.length;i++){
        
        t(chars[i],i*50+30,115+75*4)
    }
    
    chars='klmnopqrst'.toUpperCase()
    
    for(let i=0;i<chars.length;i++){
        
        t(chars[i],i*50+30,115+75*5)
    }
    
    chars='uvwxyz'.toUpperCase()
    
    for(let i=0;i<chars.length;i++){
        
        t(chars[i],i*50+30,115+75*6)
    }
    
    tex_ctx.clearRect(110,438.5,43,21)
    
    out.text=gl.createTexture()
    
    gl.bindTexture(gl.TEXTURE_2D,out.text)
    gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,512,600,0,gl.RGBA,gl.UNSIGNED_BYTE,tex_ctx.getImageData(0,0,512,600))
    gl.generateMipmap(gl.TEXTURE_2D)
    
    function loadTexture2(){
        
        if(FETCHED_CODE.beesTexture){
            
            FETCHED_CODE.beesTexture=FETCHED_CODE.beesTexture.split('#')
            
            FETCHED_CODE.beesTexture=FETCHED_CODE.beesTexture[1]
            
            FETCHED_CODE.beesTexture=FETCHED_CODE.beesTexture.substr(0,FETCHED_CODE.beesTexture.length-3)
            
            let f=Object.constructor('tex_ctx',FETCHED_CODE.beesTexture)
            
            f(tex_ctx)
            
            let data=tex_ctx.getImageData(0,0,2048,2048)
            
            gl.bindTexture(gl.TEXTURE_2D,out.bees)
            gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,2048,2048,0,gl.RGBA,gl.UNSIGNED_BYTE,data)
            
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
            gl.generateMipmap(gl.TEXTURE_2D)
            
            beeCanvas=document.createElement('canvas')
            beeCanvas.width=2048
            beeCanvas.height=2048
            let beeCanvasCtx=beeCanvas.getContext('2d')
            beeCanvasCtx.putImageData(data,0,0)
            
            FETCHED_CODE.beesTexture=''
            
        } else {
            
            window.setTimeout(loadTexture2,250)
        }
    }
    
    out.bees=gl.createTexture()
    
    gl.bindTexture(gl.TEXTURE_2D,out.bees)
    gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,1,1,0,gl.RGBA,gl.UNSIGNED_BYTE,new Uint8Array([0,0,0,1]))
    fetchCodeFromProgram('beesTexture',6745707267538944)
    loadTexture2()
    
    function loadTexture4(){
        
        if(FETCHED_CODE.decalsTexture){
            
            FETCHED_CODE.decalsTexture=FETCHED_CODE.decalsTexture.split('#')
            
            FETCHED_CODE.decalsTexture=FETCHED_CODE.decalsTexture[1]
            
            FETCHED_CODE.decalsTexture=FETCHED_CODE.decalsTexture.substr(0,FETCHED_CODE.decalsTexture.length-3)
            
            let f=Object.constructor('tex_ctx',FETCHED_CODE.decalsTexture)
            
            f(tex_ctx)
            
            gl.bindTexture(gl.TEXTURE_2D,out.decals)
            gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,1024,1024,0,gl.RGBA,gl.UNSIGNED_BYTE,tex_ctx.getImageData(0,0,1024,1024))
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
            gl.generateMipmap(gl.TEXTURE_2D)
            
            FETCHED_CODE.decalsTexture=''
            
        } else {
            
            window.setTimeout(loadTexture4,250)
        }
    }    
    
    out.decals=gl.createTexture()
    
    gl.bindTexture(gl.TEXTURE_2D,out.decals)
    gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,1,1,0,gl.RGBA,gl.UNSIGNED_BYTE,new Uint8Array([0,0,0,1]))
    fetchCodeFromProgram('decalsTexture',6119846204456960)
    loadTexture4()
    
    function loadTexture5(){
        
        if(FETCHED_CODE.bearTexture){
            
            FETCHED_CODE.bearTexture=FETCHED_CODE.bearTexture.split('#')
            
            FETCHED_CODE.bearTexture=FETCHED_CODE.bearTexture[1]
            
            FETCHED_CODE.bearTexture=FETCHED_CODE.bearTexture.substr(0,FETCHED_CODE.bearTexture.length-3)
            
            let f=Object.constructor('tex_ctx',FETCHED_CODE.bearTexture)
            
            f(tex_ctx)
            
            gl.bindTexture(gl.TEXTURE_2D,out.bear)
            gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,1024,1024,0,gl.RGBA,gl.UNSIGNED_BYTE,tex_ctx.getImageData(0,0,1024,1024))
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
            gl.generateMipmap(gl.TEXTURE_2D)
            
            FETCHED_CODE.bearTexture=''
            
        } else {
            
            window.setTimeout(loadTexture5,250)
        }
    }    
    
    out.bear=gl.createTexture()
    
    gl.bindTexture(gl.TEXTURE_2D,out.bear)
    gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,1,1,0,gl.RGBA,gl.UNSIGNED_BYTE,new Uint8Array([0,0,0,1]))
    fetchCodeFromProgram('bearTexture',5322361823346688)
    loadTexture5()
    
    return out
    
})({})

let dialogueBox=document.getElementById('dialogueBox'),
    NPCName=document.getElementById('NPCName'),
    NPCDialogue=document.getElementById('NPCDialogue'),
    actionWarning=document.getElementById('actionWarning'),
    actionName=document.getElementById('actionName'),
    shopUI=document.getElementById('shopUI'),
    leftShopButton=document.getElementById('leftShopButton'),
    rightShopButton=document.getElementById('rightShopButton'),
    itemName=document.getElementById('itemName'),
    itemDesc=document.getElementById('itemDesc'),
    itemCostSVG=document.getElementById('itemCostSVG')

let playerMesh=new Mesh(false)

let gear={
    
    supremeStarAmulet:{
        
        mesh:function(box,cylinder,sphere,star){
            
            star(0,1.5,0,0.075,0.15,0.025,0.05,0,10,0)
        }
    },
    
    glider:{
        
        none:{mesh:function(){},applyStats:function(){}},
        
        glider:{
            
            mesh:function(box){
                
                if(player.isGliding){
                    
                    box(0,2,0,1,0.2,1.5,[-40,0,0],[1.4,1.4,0])
                }
            },
            
            applyStats:function(stats){
                
                stats.gliderSpeed=18
                stats.gliderFall=-5
            }
        }
        
    },
    
    mask:{
        
        none:{
            
            mesh:function(box){
                
                box(-0.1,0.3,0.225,0.05,0.1,0.1,false,[0,0,0])
                box(0.1,0.3,0.225,0.05,0.1,0.1,false,[0,0,0])
                box(0,0.15,0.225,0.2,0.05,0.1,false,[0,0,0])
                box(0,0.5,0,0.55,0.1,0.55,false,[0,0,0])
            },applyStats:function(){}
        },
        
        gummyMask:{
            
            mesh:function(box,cylinder,sphere){
                
                sphere(0,0.5,0,0.5*1.414,2,1.6,0.4,1.6)
                cylinder(0,0.65,0,0.26*1.414,0.075,10,0.6,20,2,90,0,0)
                cylinder(0,0.85,0,0.15,0.2,10,0.2,2,1,90,0,0)
                cylinder(0,0.35,0,0.52*0.5*1.415,0.45,10,1.6,0.4,1.6,90,0,0)
                box(-0.1,0.4,0.32,0.05,0.1,0.1,false,[0.2,2,1])
                box(0.1,0.4,0.32,0.05,0.1,0.1,false,[0.2,2,1])
                box(0,0.25,0.32,0.2,0.05,0.1,false,[0.2,2,1])
                
            },
            
            applyStats:function(stats){
                
                stats.capacityMultiplier*=1.75
                stats.whiteFieldCapacity*=1.5
                stats.goo*=1.75
                stats.redBeeAbilityRate*=1.2
                stats.blueBeeAbilityRate*=1.2
                stats.whiteBeeAbilityRate*=1.2
                stats.bluePollen*=1.25
                stats.whitePollen*=1.5
                stats.redPollen*=1.25
                stats.instantGooConversion+=0.25
                stats.pollenFromBees*=1.5
                stats.honeyFromTokens*=1.5
                stats.convertRate*=1.75
                stats.defense+=0.3
                player.addEffect('gummyMorphPassive')
                player.addEffect('coinScatterPassive')
                player.addEffect('gummyStarPassive')
            }
        },
        
        diamondMask:{
            
            mesh:function(box,cylinder,sphere){
                
                sphere(0,0.6,0,0.5*1.414,2,0.3*1.1,1*1.1,2*1.1)
                cylinder(0,0.65,0,0.28*1.414,0.095,10,100,100,100,90,0,0)
                cylinder(0,0.35,0,0.52*0.5*1.415,0.45,10,0.3*1.1,1*1.1,2*1.1,90,0,0)
                box(-0.1,0.4,0.32,0.05,0.1,0.1,false,[100,100,100])
                box(0.1,0.4,0.32,0.05,0.1,0.1,false,[100,100,100])
                box(0,0.25,0.32,0.2,0.05,0.1,false,[100,100,100])
                box(0.2,0.8,0.35,0.05,0.35,0.05,[0,0,15],[100,100,100])
                box(-0.2,0.8,0.35,0.05,0.35,0.05,[0,0,-15],[100,100,100])
                box(-0.1,0.8,0.35,0.05,0.35,0.05,[0,0,15],[100,100,100])
                box(0.1,0.8,0.35,0.05,0.35,0.05,[0,0,-15],[100,100,100])
                box(0,0.85,0.35,0.3,0.05,0.05,false,[100,100,100])
            },
            
            applyStats:function(stats){
                
                stats.capacityMultiplier*=3
                stats.blueFieldCapacity*=1.5
                stats.bluePollen*=1.75
                stats.convertRate*=50
                stats.honeyAtHive*=1.1
                stats.bubblePollen*=1.25
                stats.blueBombPollen*=1.25
                stats.redBeeAbilityRate*=1.2
                stats.blueBeeAbilityRate*=1.2
                stats.whiteBeeAbilityRate*=1.2
                stats.defense+=0.3
                player.addEffect('diamondDrainPassive')
                player.addEffect('bubbleBombsPassive')
                player.addEffect('popStarPassive')
            }
        },
        
        demonMask:{
            
            mesh:function(box,cylinder,sphere){
                
                sphere(0,0.6,0,0.5*1.414,2,0.25,0,0)
                cylinder(0,0.65,0,0.28*1.414,0.095,10,1.1,0,0,90,0,0)
                cylinder(0,0.35,0,0.525*0.5*1.415,0.45,10,0.25,0,0,90,0,0)
                box(-0.1,0.4,0.32,0.05,0.1,0.1,false,[1.1,0,0])
                box(0.1,0.4,0.32,0.05,0.1,0.1,false,[1.1,0,0])
                box(0,0.25,0.32,0.2,0.05,0.1,false,[1.1,0,0])
                
                box(-0.3,0.9,0.1,0.13,0.4,0.13,[0,0,20],[1.1,0,0])
                box(0.3,0.9,0.1,0.13,0.4,0.13,[0,0,-20],[1.1,0,0])
            },
            
            applyStats:function(stats){
                
                stats.capacityMultiplier*=1.75
                stats.redFieldCapacity*=1.5
                stats.redPollen*=1.75
                stats.beeAttack*=1.25
                stats.redBeeAttack+=2
                stats.whiteBeeAttack+=1
                stats.blueBeeAttack+=1
                stats.instantFlameConversion+=0.5
                stats.flamePollen*=1.75
                stats.redBeeAbilityRate*=1.2
                stats.blueBeeAbilityRate*=1.2
                stats.whiteBeeAbilityRate*=1.2
                stats.beeEnergy*=1.25
                stats.defense+=0.35
                player.addEffect('xFlamePassive')
                player.addEffect('ignitePassive')
                player.addEffect('scorchingStarPassive')
            }
        },
    },
    
    belt:{
        
        none:{mesh:function(){},applyStats:function(){}},
        
        honeycombBelt:{
            
            mesh:function(box,cylinder,sphere){
                
                box(0,-0.1,0,0.55,0.085,0.55,false,[1.5,1.4,0])
                box(0-0.075,-0.1+0.065,0.285,0.1,0.1,0.05,[0,0,20],[5,5,5])
                box(0+0.075,-0.1+0.065,0.285,0.1,0.1,0.05,[0,0,-20],[5,5,5])
                box(0,-0.1-0.065,0.285,0.1,0.1,0.05,false,[5,5,5])
                box(0-0.075,-0.1+0.065,0.265,0.15,0.15,0.05,[0,0,20],[5,5,0])
                box(0+0.075,-0.1+0.065,0.265,0.15,0.15,0.05,[0,0,-20],[5,5,0])
                box(0,-0.1-0.065,0.265,0.15,0.15,0.05,false,[5,5,0])
            },
            
            applyStats:function(stats){
                
                stats.capacity+=200000
                stats.capacityMultiplier*=1.25
                stats.lootLuck+=0.2
                stats.convertRate*=1.75
                stats.honeyFromTokens*=1.5
                stats.whiteBeeAttack++
                stats.whiteBombPollen*=1.3
                stats.beeEnergy*=1.15
            }
        },
        
        petalBelt:{
            
            mesh:function(box,cylinder,sphere){
                
                // box(0,-0.1,0,0.55,0.05,0.55,false,[0,1.25,0])
                box(-0.075*1.5,-0.1+0.05*1.5,0.3,0.2,0.2,0.05,[0,0,30],[1.25,1.25,1.25])
                box(0.075*1.5,-0.1+0.025*1.5,0.3,0.2,0.2,0.05,[0,0,60],[1.25,1.25,1.25])
                box(0,-0.1-0.05*1.5,0.3,0.2,0.2,0.05,false,[1.25,1.25,1.25])
                box(0,-0.1,0.35,0.1,0.1,0.1,[45,45,0],[1.5,1.5,0.2])
                box(-0.075*1.5,-0.1+0.04*1.5,0.25,0.25,0.25,0.05,[0,0,80],[0,1.25,0])
                box(0.075*1.5,-0.1+0.025*1.5,0.25,0.25,0.25,0.05,[0,0,20],[0,1.25,0])
                box(0,-0.1-0.05*1.5,0.25,0.25,0.25,0.05,[0,0,30],[0,1.25,0])
            },
            
            applyStats:function(stats){
                
                stats.capacity+=300000
                stats.capacityMultiplier*=1.5
                stats.lootLuck+=0.25
                stats.convertRate*=1.8
                stats.honeyFromTokens*=1.5
                stats.whiteBeeAttack++
                stats.whiteBombPollen*=1.5
                stats.beeEnergy*=1.25
            }
        }
    },
    
    backpack:{
        
        none:{mesh:function(){},applyStats:function(){}},
        
        pouch:{
            
            mesh:function(box,cylinder,sphere){
                
                sphere(0,0,-0.5,0.6,2,0.9,0.7,0.3)
                sphere(0,0.3,-0.5,0.2,2,0.9*0.7,0.7*0.7,0.3*0.7)
            },
            
            applyStats:function(stats){
                
                stats.capacity+=200
            }
        },
        
        coconutCanister:{
            
            mesh:function(box,cylinder,sphere){
                
                sphere(0,0,-0.6,1.3,2,0.4,0.2,0)
                sphere(-0.3,0.45,-0.6,0.4,1,0.1,0.05,0)
                sphere(-0.15,0.4,-0.9,0.4,1,0.1,0.05,0)
                sphere(0.05,0.5,-0.6,0.4,1,0.1,0.05,0)
                cylinder(0,0,-0.6,0.3,1.3,10,1.2,1.2,1.2,90,0,90)
                cylinder(-0.425,0,-0.6,0.2,0.57,10,100,0,0,90,0,90)
                cylinder(0.425,0,-0.6,0.2,0.57,10,0,0,100,90,0,90)
            },
            
            applyStats:function(stats){
                
                stats.capacity+=2000000
                stats.convertRate*=5
                stats.instantRedConversion+=0.15
                stats.instantBlueConversion+=0.15
                stats.instantWhiteConversion+=0.25
                stats.whitePollen*=1.5
                stats.redPollen*=1.25
                stats.bluePollen*=1.25
                stats.whiteBeeAttack+=1
                stats.redBeeAttack+=1
                stats.blueBeeAttack+=1
                stats.defense+=0.1
                stats.honeyAtHive*=1.1
                player.addEffect('inspireCoconutsPassive')
                player.addEffect('emergencyCoconutShieldPassive')
            }
        }
    },
    
    boots:{
        
        none:{mesh:function(){},applyStats:function(){}},
        
        gummyBoots:{
            
            mesh:function(box,cylinder,sphere){
                
                box(-0.2,-0.5,0.04,0.36,0.15,0.73,false,[0.1*1.75,1*1.75,0.5*1.75])
                box(0.2,-0.5,0.04,0.36,0.15,0.73,false,[0.1*1.75,1*1.75,0.5*1.75])
                box(-0.2,-0.35,0,0.325,0.2,0.6,false,[1*1.75,0.2*1.75,1*1.75])
                box(0.2,-0.35,0,0.325,0.2,0.6,false,[1*1.75,0.2*1.75,1*1.75])
                box(-0.2,-0.35,0.2,0.15,0.05,0.25,false,[0.1*1.75,1*1.75,0.5*1.75])
                box(0.2,-0.35,0.2,0.15,0.05,0.25,false,[0.1*1.75,1*1.75,0.5*1.75])
            },
            
            applyStats:function(stats){
                
                stats.movementCollection+=15
                stats.movespeed*=1.275
                stats.jumpPower*=1.4
                stats.pollenFromCoconuts*=2
                stats.goo*=1.25
                stats.beeSpeed*=1.2
                stats.honeyFromTokens*=1.25
                stats.instantGooConversion+=0.15
                stats.convertRate*=1.75
                stats.capacityMultiplier*=1.25
            }
        },
        
        mondoBoots:{
            
            mesh:function(box,cylinder,sphere){
                
                box(-0.2,-0.5,0.04,0.36,0.15,0.73,false,[0,0,1.5])
                box(0.2,-0.5,0.04,0.36,0.15,0.73,false,[1.5,0,0])
                box(-0.2,-0.35,0,0.325,0.2,0.6,false,[1.35,1.35,1.35])
                box(0.2,-0.35,0,0.325,0.2,0.6,false,[1.35,1.35,1.35])
                box(-0.2,-0.35,0.2,0.15,0.05,0.25,false,[0,0,1.5])
                box(0.2,-0.35,0.2,0.15,0.05,0.25,false,[1.5,0,0])
            },
            
            applyStats:function(stats){
                
                stats.movementCollection+=8
                stats.movespeed*=1.225
                stats.jumpPower*=1.35
                stats.beeSpeed*=1.2
            }
        },
    },
    
    leftGuard:{
        
        none:{mesh:function(){},applyStats:function(){}},
        
        crimsonGuard:{
            
            mesh:function(box,cylinder,sphere){
                
                box(0.35,0.05,0.1,0.2,0.2,0.2,[0,25,30],[1.5,0,0])
                box(0.575,0.2,0,0.7,0.08,0.08,[0,25,36],[1.5,1.5,1.5])
                box(0.5,0.03,0.07,0.4,0.06,0.06,[0,25,-30],[1.5,1.5,1.5])
            },
            
            applyStats:function(stats){
                
                stats.convertRate*=1.4
                stats.redPollen*=1.35
                stats.capacity+=300000
                stats.instantRedConversion+=0.1
                stats.redBombPollen*=1.5
                stats.redBeeAttack+=2
                stats.whiteBeeAttack+=1
                stats.criticalPower+=0.75
                player.addEffect('focusPulserPassive')
            }
        },
    },
    
    rightGuard:{
        
        none:{mesh:function(){},applyStats:function(){}},
        
        cobaltGuard:{
            
            mesh:function(box,cylinder,sphere){
                
                box(-0.35,0.05,0.1,0.2,0.2,0.2,[0,-25,-30],[0,0,1.5])
                box(-0.575,0.2,0,0.7,0.08,0.08,[0,-25,-36],[1.5,1.5,1.5])
                box(-0.5,0.03,0.07,0.4,0.06,0.06,[0,-25,30],[1.5,1.5,1.5])
            },
            
            applyStats:function(stats){
                
                stats.convertRate*=1.4
                stats.capacity+=300000
                stats.bluePollen*=1.35
                stats.instantBlueConversion+=0.1
                stats.blueBombPollen*=1.5
                stats.blueBeeAttack+=2
                stats.whiteBeeAttack+=1
                stats.criticalChance+=0.15
                player.addEffect('hastePulserPassive')
            }
        },
    }
}

player=(function(out){
    
    out.sunSwitchTimer=60
    out.skyColor=[0.4,0.6,1]
    out.updateMapLightTimer=0
    out.isNight=0.999
    
    out.turnNight=function(){
        
        out.targetLight=NIGHT_DARKNESS
    }
    
    out.turnDay=function(){
        
        out.targetLight=1
    }
    
    out.turnDay()
    
    out.radioactiveParticleTimer=0
    out.setting_enablePollenText=true
    
    out.damage=(am)=>{
        
        out.health-=am-am*out.defense
        out.stats.coconutShield++
        textRenderer.add((am|0)+'',[out.body.position.x,out.body.position.y+Math.random()*1.5+1.5,out.body.position.z],[255,0,0],0,'',1.25)
    }
    
    out.lagPos=[0,0,0]
    out.stats={
        
        redPollen:0,
        bluePollen:0,
        whitePollen:0,
        abilityTokens:0,
        honeyTokens:0,
        rhinoBeetle:0,
        goo:0,
        popStar:0,
        scorchingStar:0,
        coconutShield:0
    }
    
    for(let i in LIST_OF_STATS_FOR_PLAYER){
        
        out.stats[LIST_OF_STATS_FOR_PLAYER[i]]=0
    }
    
    out.precomputedStats={
        
        redFieldCapacity:1,
        blueFieldCapacity:1,
        whiteFieldCapacity:1,
        hasteStacks:0,
        gliderSpeed:0,
        gliderFall:0,
        walkSpeed:120,
        jumpPower:10,
        criticalChance:0,
        criticalPower:2,
        instantRedConversion:0,
        instantWhiteConversion:0,
        instantBlueConversion:0,
        redBombPollen:1,
        whiteBombPollen:1,
        blueBombPollen:1,
        instantBombConversion:0,
        convertRate:1,
        whitePollen:1,
        redPollen:1,
        bluePollen:1,
        capacity:0,
        flameFuel:false,
        beeSpeed:1,
        honeyAtHive:1,
        tokenLifespan:1,
        redBeeAbilityRate:1,
        blueBeeAbilityRate:1,
        whiteBeeAbilityRate:1,
        beeAttack:1,
        beeEnergy:1,
        flameHeatStack:1,
        superCritChance:0,
        superCritPower:2,
        lootLuck:1,
        bubblePollen:1,
        flamePollen:1,
        goo:1,
        tidePower:1,
        tidalSurge:false,
        collectorSpeed:1,
        honeyFromTokens:1,
        gummyBallSize:1,
        defense:0,
        whiteBeeAttack:0,
        redBeeAttack:0,
        blueBeeAttack:0,
        movementCollection:0,
        pollenFromBees:1,
        pollenFromTools:1,
        pollenFromCoconuts:1,
        instantFlameConversion:0,
        instantGooConversion:0,
        markDuration:1,
        redBombSync:false,
        blueBombSync:false,
        flameLife:1
    }
    
    out.defaultStats={}
    
    out.quests=[]
    
    out.addQuest=function(name,req,NPC){
        
        for(let i in req){
            
            req[i].push(out.stats[req[i][0]])
        }
        
        out.quests=[{name:name,req:req,NPC:NPC},...out.quests]
    }
    
    dialogueBox.onclick=function(){
        
        NPCs[out.currentNPC].dialogueIndex=Math.min(NPCs[out.currentNPC].dialogueIndex+1,NPCs[out.currentNPC].dialogue.length)
        
        if(typeof NPCs[out.currentNPC].dialogue[NPCs[out.currentNPC].dialogueIndex]==='string'){
            
            NPCDialogue.innerHTML=NPCs[out.currentNPC].dialogue[NPCs[out.currentNPC].dialogueIndex]
            
        } else {
            
            NPCs[out.currentNPC].dialogue[NPCs[out.currentNPC].dialogueIndex]()
            
            NPCs[out.currentNPC].dialogueIndex=Math.min(NPCs[out.currentNPC].dialogueIndex+1,NPCs[out.currentNPC].dialogue.length)
            out.currentNPC=null
            dialogueBox.style.display='none'
            out.viewMatrixToChange=undefined
        }
    }
    
    out.onStartChat=function(){
        
        document.exitPointerLock()
        actionWarning.style.display='none'
        dialogueBox.style.display='block'
        NPCName.innerHTML=MATH.doGrammar(out.currentNPC)
        NPCDialogue.innerHTML=NPCs[out.currentNPC].dialogue[NPCs[out.currentNPC].dialogueIndex]
        out.viewMatrixToChange=NPCs[player.currentNPC].viewMatrix
        out.viewMatrixCopy=out.viewMatrix.slice()
        out.easeAmount=0
        
    }
    
    out.onStartShop=function(){
        
        document.exitPointerLock()
        shopUI.style.display='block'
        shops[out.currentShop].currentIndex=0
        out.viewMatrixToChange=shops[out.currentShop].items[shops[out.currentShop].currentIndex].viewMatrix
        out.viewMatrixCopy=out.viewMatrix.slice()
        out.easeAmount=0
        itemName.innerHTML=MATH.doGrammar(shops[out.currentShop].items[shops[out.currentShop].currentIndex].name)
        itemDesc.innerHTML=shops[out.currentShop].items[shops[out.currentShop].currentIndex].desc
        
        itemCostSVG.innerHTML=''
        
        let cost=shops[out.currentShop].items[shops[out.currentShop].currentIndex].cost
        
        for(let i in cost){
            
            let c=cost[i].split(' ')
            
            itemCostSVG.innerHTML+=itemSVGCode[c[1]].replaceAll('AMOUNTOFITEMREQUIREDTOCRAFT','x'+(c[0].length<6?MATH.addCommas(c[0]):MATH.abvNumber(c[0]))).replaceAll('TEXTCOLORDEPENDINGONIFENOUGHITEMS',c[1]==='honey'&&player.honey<Number(c[0])||c[1]!=='honey'&&items[c[1]].amount<Number(c[0])?'rgb(255,0,0)':'rgb(255,255,255)')
        }
        
        leftShopButton.onclick=function(){
            
            shops[out.currentShop].currentIndex=(shops[out.currentShop].currentIndex+shops[out.currentShop].items.length-1)%shops[out.currentShop].items.length
            out.viewMatrixToChange=shops[out.currentShop].items[shops[out.currentShop].currentIndex].viewMatrix
            out.easeAmount=0
            itemName.innerHTML=MATH.doGrammar(shops[out.currentShop].items[shops[out.currentShop].currentIndex].name)
            itemDesc.innerHTML=shops[out.currentShop].items[shops[out.currentShop].currentIndex].desc
            
            itemCostSVG.innerHTML=''
            
            let cost=shops[out.currentShop].items[shops[out.currentShop].currentIndex].cost
            
            for(let i in cost){
                
                let c=cost[i].split(' ')
                
                itemCostSVG.innerHTML+=itemSVGCode[c[1]].replaceAll('AMOUNTOFITEMREQUIREDTOCRAFT','x'+(c[0].length<6?MATH.addCommas(c[0]):MATH.abvNumber(c[0]))).replaceAll('TEXTCOLORDEPENDINGONIFENOUGHITEMS',c[1]==='honey'&&player.honey<Number(c[0])||c[1]!=='honey'&&items[c[1]].amount<Number(c[0])?'rgb(255,0,0)':'rgb(255,255,255)')
            }
        
        }
        rightShopButton.onclick=function(){
            
            shops[out.currentShop].currentIndex=(shops[out.currentShop].currentIndex+1)%shops[out.currentShop].items.length
            out.viewMatrixToChange=shops[out.currentShop].items[shops[out.currentShop].currentIndex].viewMatrix
            out.easeAmount=0
            itemName.innerHTML=MATH.doGrammar(shops[out.currentShop].items[shops[out.currentShop].currentIndex].name)
            itemDesc.innerHTML=shops[out.currentShop].items[shops[out.currentShop].currentIndex].desc
            
            itemCostSVG.innerHTML=''
        
            let cost=shops[out.currentShop].items[shops[out.currentShop].currentIndex].cost
            
            for(let i in cost){
                
                let c=cost[i].split(' ')
                
                itemCostSVG.innerHTML+=itemSVGCode[c[1]].replaceAll('AMOUNTOFITEMREQUIREDTOCRAFT','x'+(c[0].length<6?MATH.addCommas(c[0]):MATH.abvNumber(c[0]))).replaceAll('TEXTCOLORDEPENDINGONIFENOUGHITEMS',c[1]==='honey'&&player.honey<Number(c[0])||c[1]!=='honey'&&items[c[1]].amount<Number(c[0])?'rgb(255,0,0)':'rgb(255,255,255)')
            }
            
        }
        actionWarning.onclick=function(){
            
            out.currentShop=undefined
            out.viewMatrixToChange=undefined
            shopUI.style.display='none'
        }
        
        purchaseButton.onclick=function(){
            
            if(shops[out.currentShop].items[shops[out.currentShop].currentIndex].owned){
                
                out.currentGear[shops[out.currentShop].items[shops[out.currentShop].currentIndex].slot]=shops[out.currentShop].items[shops[out.currentShop].currentIndex].name
                out.updateGear()
                return
            }
            
            let cost=shops[out.currentShop].items[shops[out.currentShop].currentIndex].cost
            
            for(let i in cost){
                
                let c=cost[i].split(' ')
                
                if(c[1]==='honey'&&player.honey<Number(c[0])||c[1]!=='honey'&&items[c[1]].amount<Number(c[0])){
                    
                    return
                }
            }
            
            for(let i in cost){
                
                let c=cost[i].split(' ')
                
                if(c[1]==='honey'){
                    
                    player.honey-=Number(c[0])
                    
                } else {
                    
                    items[c[1]].amount-=Number(c[0])
                }
            }
            
            shops[out.currentShop].items[shops[out.currentShop].currentIndex].owned=true
            out.currentGear[shops[out.currentShop].items[shops[out.currentShop].currentIndex].slot]=shops[out.currentShop].items[shops[out.currentShop].currentIndex].name
            out.updateInventory()
            out.updateGear()
        }
    }
    
    out.health=100
    out.respawnTimer=3
    out.dead=false
    
    out.respawn=function(){
        
        out.health=100
        out.dead=false
        out.body.position.x=10
        out.body.position.y=0
        out.body.position.z=0
    }
    
    out.attacked=[]
    
    out.messages=[]
    
    out.beeHighlightMesh=new Mesh(true)
    
    out.statsStringLastUpdate=0
    out.statsString=''
    
    out.itemDragging=''
    out.beequipDragging=''
    
    out.updateInventory=function(){
        
        for(let i in items){
            
            if(items[i].amount===0){
                
                items[i].svg.style.display='none'
                
            } else {
                
                items[i].svg.style.display='inline'
                items[i].amountText.textContent='x'+items[i].amount
            }
        }
    }
    
    out.addItem=function(item,amount){
        
        items[item].amount+=amount
        out.updateInventory()
    }
    
    out.updateInventory()
    
    out.hiveBalloon={pollen:0,size:0,displaySize:0,maxPollen:0,blessing:0,deflateTimer:0}
    
    out.updateHiveBalloon=function(){
        
        if(!out.hiveBalloon.pollen){
            
            if(out.hiveBalloon.maxPollen&&!player.converting){
                
                player.addEffect('balloonBlessing',undefined,player.hiveBalloon.blessing)
                player.addMessage('The hive balloon granted x'+player.hiveBalloon.blessing+' balloon blessing!')
                player.hiveBalloon.maxPollen=0
            }
            
            out.hiveBalloon.size=0
            out.hiveBalloon.displaySize=0
            return
        }
        
        out.hiveBalloon.deflateTimer-=dt
        
        if(out.hiveBalloon.deflateTimer<=0){
            
            out.hiveBalloon.deflateTimer=10
            out.hiveBalloon.pollen=Math.round(out.hiveBalloon.pollen)
            
            let f=out.hiveBalloon.pollen/out.capacity
            
            f*=0.00075
            out.hiveBalloon.pollen-=out.hiveBalloon.pollen*f
        }
        
        out.hiveBalloon.pollen=Math.round(out.hiveBalloon.pollen)
        
        let p=out.hiveBalloon.pollen.toString()
        out.hiveBalloon.size=((Math.pow(out.hiveBalloon.pollen,1/7)*2-2)/20)+0.5
        
        out.hiveBalloon.displaySize+=(out.hiveBalloon.size-out.hiveBalloon.displaySize)*0.015
        
        meshes.explosions.instanceData.push(out.hivePos[0]+1.5,out.hivePos[1]-1.5+out.hiveBalloon.displaySize*0.5,out.hivePos[2]+3,0,0,0.6*player.isNight,0.75,out.hiveBalloon.displaySize,1.05)
            
        meshes.cylinder_explosions.instanceData.push(out.hivePos[0]+1.5,out.hivePos[1]-2.5,out.hivePos[2]+3,player.isNight,player.isNight,player.isNight,1,0.05,40)
        
        textRenderer.addSingle(p,[out.hivePos[0]+1.5,out.hivePos[1]-1.6+out.hiveBalloon.displaySize*0.5,out.hivePos[2]+3],COLORS.whiteArr,-1)
        
        p=Math.round(out.hiveBalloon.maxPollen).toString()
        
        out.hiveBalloon.blessing=Math.max(Math.ceil(Math.pow(out.hiveBalloon.maxPollen,1/7)*2-4),1)
        
        textRenderer.addSingle('Blessing x'+out.hiveBalloon.blessing,[out.hivePos[0]+1.5,out.hivePos[1]-1.4+out.hiveBalloon.displaySize*0.5,out.hivePos[2]+3],[0,100,255],-1,true,false)
    }
    
    out.toolRot=0
    out.toolMatrix=new Float32Array(16)
    out.toolMesh=new Mesh(false)
    out.toolUses=0
    
    out.updateTool=function(newTool){
        
        out.tool=newTool
        out.toolCooldown=0
        out.toolMesh.setMeshFromFunction(tools[newTool].mesh)
        out.toolMesh.setBuffers()
    }
    
    out.updateTool('shovel')
    
    out.sprinklers=[new Sprinkler()]
    out.sprinklerMesh=new Mesh(true)
    out.sprinklerMesh.setBuffers()
    out.currentSprinkler=0
    
    out.hive=[[]]
    out.hivePos=[-1.625+10,1.5,-7.5]
    
    triggers.hive={
        
        minX:out.hivePos[0]-1,
        maxX:out.hivePos[0]+4.5,
        minY:-5,
        maxY:7,
        minZ:out.hivePos[2]-1,
        maxZ:out.hivePos[2]+4.5,
        
    }
    
    out.hiveMesh=new Mesh(true)
    
    out.addSlot=function(bee,gifted=true){
        
        if(out.hive[out.hive.length-1].length<5){
            
            out.hive[out.hive.length-1].push({type:bee,level:1,bond:0,gifted:gifted})
            
        } else {
            
            out.hive.push([])
            out.hive[out.hive.length-1].push({type:bee,level:1,bond:0,gifted:gifted})
        }
    }
    
    out.effects=[]
    
    out.addEffect=function(type,amplify,refresh,setAmount,addAmount){
        
        if(amplify){
            
            let found
            
            for(let i in out.effects){
                
                if(out.effects[i].type===type){
                    
                    found=i
                    break
                }
            }
            
            if(found!==undefined){
                
                out.effects[found].cooldown=Math.min(effects[type].maxCooldown,effects[type].maxCooldown*amplify+out.effects[found].cooldown+dt)
                
                
                return
            }
            
            out.effects.push({
                
                cooldown:effects[type].maxCooldown*amplify,
                type:type,
                amount:1,
            })
            
        } else {
            
            let found
            
            for(let i in out.effects){
                
                if(out.effects[i].type===type){
                    
                    found=i
                    break
                }
            }
            
            if(found!==undefined){
                
                if(refresh){
                    
                    out.effects[found].amount=Math.min(Math.max(out.effects[found].amount,refresh),effects[type].maxAmount)
                    
                } else {
                    
                    out.effects[found].amount=Math.min(setAmount??out.effects[found].amount+(addAmount||1),effects[type].maxAmount)
                    
                }
                
                out.effects[found].cooldown=effects[type].maxCooldown
                
                return
            }
            
            out.effects.push({
                
                cooldown:effects[type].maxCooldown,
                type:type,
                amount:refresh?refresh:setAmount??(addAmount||1),
            })
        }
        
        effects[type].svg.style.display='inline'
    }
    
    out.computeStats=function(){
        
        for(let i in out.effects){
            
            if(effects[out.effects[i].type].isPassive){
                
                effects[out.effects[i].type].svg.style.display='none'
                out.effects.splice(i,1)
            }
        }
        
        for(let i in out.precomputedStats){
            
            out.defaultStats[i]=out.precomputedStats[i]
        }
        
        out.defaultStats.capacityMultiplier=1
        
        out.defaultStats.convertTotal=0
        
        let giftedTypes=[]
        
        out.bubbleBonus=1
        out.flameBonus=1
        out.ownsCrimsonBee=false
        out.ownsCobaltBee=false
        out.cloudBoostAmount=1.25
        
        for(let i in objects.bees){
            
            out.defaultStats.convertTotal+=objects.bees[i].convertAmount
            
            if(objects.bees[i].gifted&&giftedTypes.indexOf(objects.bees[i].type)<0){
                
                giftedTypes.push(objects.bees[i].type)
                
                if(beeInfo[objects.bees[i].type].color==='blue'){
                    out.bubbleBonus+=0.1
                }
            }
            
            if(beeInfo[objects.bees[i].type].color==='red'){
                
                out.flameBonus+=objects.bees[i].gifted?0.08:0.04
            }
            
            if(objects.bees[i].type==='crimson'){
                
                out.ownsCrimsonBee=true
            }
            
            if(objects.bees[i].type==='cobalt'){
                
                out.ownsCobaltBee=true
            }
            
            if(objects.bees[i].type==='windy'&&objects.bees[i].gifted){
                
                out.cloudBoostAmount=1.5
            }
            
            if(player.hive[objects.bees[i].hiveY][objects.bees[i].hiveX].beequip){
                
                let stats=player.hive[objects.bees[i].hiveY][objects.bees[i].hiveX].beequip.stats.player
                
                stats=stats.split(',')
                
                for(let i in stats){
                    
                    let str=stats[i]
                    
                    if(str[0]==='*'){
                        
                        player.defaultStats[str.substr(str.indexOf(' ')+1,str.length)]*=Number(str.substr(1,str.indexOf(' ')-1))
                        
                    } else {
                        
                        player.defaultStats[str.substr(str.indexOf(' ')+1,str.length)]+=Number(str.substr(1,str.indexOf(' ')-1))
                        
                    }
                }
            }
        }
        
        for(let i in giftedTypes){
            
            let b=beeInfo[giftedTypes[i]].giftedHiveBonus
            
            if(b.oper==='+'){
                
                let s=b.stat.split(',')
                
                for(let j in s){
                    
                    out.defaultStats[s[j]]+=b.num
                }
                
            } else {
                
                let s=b.stat.split(',')
                
                for(let j in s){
                    
                    out.defaultStats[s[j]]*=b.num
                }
            }
        }
        for(let i in out.currentGear){
            
            if(i.indexOf('Amulet')>-1){
                
                let stats=out.currentGear[i]
                
                stats=stats.split(',')
                
                for(let i in stats){
                    
                    let str=stats[i]
                    
                    if(str[0]==='*'){
                        
                        out.defaultStats[str.substr(str.indexOf(' ')+1,str.length)]*=Number(str.substr(1,str.indexOf(' ')-1))
                        
                    } else {
                        
                        out.defaultStats[str.substr(str.indexOf(' ')+1,str.length)]+=Number(str.substr(1,str.indexOf(' ')-1))
                        
                    }
                }
                
            } else if(i!=='beequips'){
                
                if(gear[i][out.currentGear[i]].applyStats)
                gear[i][out.currentGear[i]].applyStats(out.defaultStats)
                
            }
            
        }
        
        out.defaultStats.capacity*=out.defaultStats.capacityMultiplier
    }
    
    out.currentGear={
        
        boots:'none',
        belt:'none',
        backpack:'pouch',
        mask:'none',
        leftGuard:'none',
        rightGuard:'none',
        glider:'glider',
        beequips:[]
    }
    
    out.generateBeequip=function(type){
        
        let p=beequips[type].potentials[(Math.random()*beequips[type].potentials.length)|0]
        out.currentGear.beequips.push({type:type,bee:null,stats:beequips[type].generateStats(p),id:out.currentGear.beequips.length,potential:p})
        
        out.updateBeequipPage()
    }
    
    out.beequipLookingAt=false
    
    out.updateBeequipPage=function(){
        
        out.beequipPageHTML=''
        
        if(out.beequipLookingAt===false){
            
            for(let i in out.currentGear.beequips){
                
                out.beequipPageHTML+=beequips[out.currentGear.beequips[i].type].svgCode.replaceAll('#ID',out.currentGear.beequips[i].id)
                
            }
            
        } else {
            
            let c=beequips[out.currentGear.beequips[out.beequipLookingAt].type].svgCode.split('</text>')
            
            c=c[c.length-1]
            
            let d=beequips[out.currentGear.beequips[out.beequipLookingAt].type].svgCode.split('<text'),_d='',hd
            
            
            for(let i in d){
                
                if(d[i].indexOf('</text>')>-1){
                    
                    if(!hd){
                        
                        hd=true
                        continue
                    }
                    
                    _d+=d[i].substr(d[i].indexOf('>')+1,d[i].indexOf('<'))+' '
                    
                }
            }
            
            let s=out.currentGear.beequips[out.beequipLookingAt].stats.bee.split(',')
            let stats=''
            
            if(out.currentGear.beequips[out.beequipLookingAt].stats.bee.length){
                
                s.sort()
                
                for(let i in s){
                    
                    let toAdd=s[i].replace('*','x')
                    
                    toAdd=toAdd.substr(0,toAdd.indexOf(' ')+1)+MATH.doGrammar(toAdd.substr(toAdd.indexOf(' ')+1,toAdd.length))
                    
                    stats+="<p style='color:"+(Number(toAdd.substr(1,toAdd.indexOf(' ')))<1?'rgb(200,0,0)':'rgb(20,160,20)')+";font-size:14px;margin-top:-10px'>"+toAdd+"</p>"
                    
                }
            }
            
            s=out.currentGear.beequips[out.beequipLookingAt].stats.player.split(',')
            
            if(out.currentGear.beequips[out.beequipLookingAt].stats.player.length){
                
                stats+="<br><p style='color:rgb(227, 194, 7);font-size:14px;margin-top:-10px'>[Hive Bonus]</p>"
                
                s.sort()
                
                for(let i in s){
                    
                    let toAdd=s[i].replace('*','x')
                    
                    toAdd=toAdd.substr(0,toAdd.indexOf(' ')+1)+MATH.doGrammar(toAdd.substr(toAdd.indexOf(' ')+1,toAdd.length))
                    
                    stats+="<p style='color:rgb(227, 194, 7);font-size:14px;margin-top:-10px'>"+toAdd+"</p>"
                    
                }
            }
            
            out.beequipPageHTML+="<div onmousedown='window.selectBeequip()' style='position:fixed;left:5px;top:250px;background-color:rgb(240, 196, 0);border:2px solid black;border-radius:4px;text-align:center;width:90px;height:20px;cursor:pointer;'><svg style='margin:0px;width:100px;height:20px'><text x='30' y='16' style='color:black;font-family:cursive;font-size:17px'>Equip</text></svg></div><div onmousedown='window.deleteBeequip()' style='position:fixed;top:250px;background-color:rgb(240, 0, 0);border:2px solid black;border-radius:4px;left:105px;text-align:center;width:90px;height:20px;cursor:pointer;'><svg style='margin:0px;width:100px;height:20px'><text x='20' y='16' style='color:black;font-family:cursive;font-size:17px'>Delete</text></svg></div><svg style='position:fixed;border-radius:10px;background-color:rgb(240,240,240);width:75px;height:75px;margin-top:28px'>"+c+"<div onmousedown='window.exitBeequipLooking()' style='position:fixed;background-color:rgb(240,0,0);border:2px solid black;border-radius:4px;text-align:center;font-size:19px;font-family:trebuchet ms;width:20px;height:20px;cursor:pointer;'><svg style='margin:0px;width:20px;height:20px'><path stroke='black' stroke-width='2' d='M5 4L15 16M15 4L5 16'></path></svg></div><div style='position:fixed;background-color:rgb(240,240,240);border-radius:10px;text-align:center;font-size:19px;font-family:trebuchet ms;margin-left:28px;width:172px;padding-bottom:2px;'>"+MATH.doGrammar(out.currentGear.beequips[out.beequipLookingAt].type.replaceAll('candycane','candyCane'))+"</div><div style='position:fixed;background-color:rgb(240,240,240);margin-left:80px;margin-top:29px;border-radius:10px;font-size:13px;padding-top:0px;font-family:trebuchet ms;width:113px;padding-left:7px;padding-top:3px;padding-bottom:3px;'>Level: "+beequips[out.currentGear.beequips[out.beequipLookingAt].type].level+"</div><div style='position:fixed;background-color:rgb(240,240,240);margin-left:80px;margin-top:55px;border-radius:10px;padding-left:7px;padding-top:3px;padding-bottom:3px;font-size:13px;font-family:trebuchet ms;width:113px;'>Color: "+MATH.doGrammar(beequips[out.currentGear.beequips[out.beequipLookingAt].type].color)+"</div><div style='position:fixed;background-color:rgb(240,240,240);margin-left:80px;margin-top:81px;border-radius:10px;padding-left:7px;padding-top:3px;padding-bottom:3px;font-size:13px;font-family:trebuchet ms;width:113px;'>Potential: "+out.currentGear.beequips[out.beequipLookingAt].potential+"</div><svg style='postition:fixed;left:0px;top:107px;width:20px;height:20px'><path stroke='black' stroke-width='2' d='M5 4L15 16M15 4L5 16'></path></svg><div style='background-color:rgb(240,240,240);margin-left:0px;margin-top:112px;border-radius:10px;padding-left:7px;padding-top:3px;padding-bottom:3px;font-size:12px;font-family:trebuchet ms;width:193px;'>"+_d+beequips[out.currentGear.beequips[out.beequipLookingAt].type].reqStr+stats+(beequips[out.currentGear.beequips[out.beequipLookingAt].type].extraAbility?'<br><p style="font-size:15px">+Ability: '+MATH.doGrammar(beequips[out.currentGear.beequips[out.beequipLookingAt].type].extraAbility.split('_')[1])+'</p>':'')+"</div>"
            
        }
    }
    
    out.generateBeequip('candycane')
    out.generateBeequip('boombox')
    
    out.updateGear=function(){
        
        out.computeStats()
        
        playerMesh.setMeshFromFunction(function(box,a,cylinder,sphere,b,c,star){
            
            box(0,0,0,0.5,1,0.5,false,[1.45,1.45,1])
            
            for(let i in out.currentGear){
                
                if(i.indexOf('Amulet')<0&&i!=='beequips'){
                    
                    gear[i][out.currentGear[i]].mesh(box,cylinder,sphere,star)
                    
                } else if(i!=='beequips'){
                    
                    gear[i].mesh(box,cylinder,sphere,star)
                }
            }
            
        })
        
        playerMesh.setBuffers()
    }
    
    out.updateHive=function(){
        
        out.hiveMesh.setMeshFromFunction(function(box,hiveSlot,useless1,useless2,useless3,giftedRing){
            
            for(let i in objects.bees){
                
                for(let j in objects.bees[i].trails){
                    
                    objects.bees[i].trails[j].splice=true
                }
            }
            
            objects.bees=[]
            
            for(let i in raycastWorld.bodies){
                
                raycastWorld.removeBody(raycastWorld.bodies[i])
            }
            
            for(let y=0;y<out.hive.length;y++){
                
                for(let x=0;x<out.hive[y].length;x++){
                    
                    hiveSlot(out.hivePos[0]+x*0.8,out.hivePos[1]+y*0.8-2.25,out.hivePos[2],0.35,0.35,out.hive[y][x].type)
                    
                    if(out.hive[y][x].type!==null){
                        
                        if(out.hive[y][x].gifted)
                            giftedRing(out.hivePos[0]+x*0.8,out.hivePos[1]+y*0.8-2.25,out.hivePos[2]-0.2,0.45,0.45,out.hive[y][x].type)
                        
                        let _b=new Bee([out.hivePos[0]+x*0.8,out.hivePos[1]+y*0.8-2.25,out.hivePos[2]],out.hive[y][x].type,out.hive[y][x].level,out.hive[y][x].gifted,x,y)
                        
                        out.hive[y][x].bee=_b
                        objects.bees.push(_b)
                        
                    }
                    
                    let b=new CANNON.Body({
                        
                        position:new CANNON.Vec3(player.hivePos[0]+x*0.8,player.hivePos[1]+y*0.8-2.25,player.hivePos[2]-0.2),
                        shape:new CANNON.Box(new CANNON.Vec3(0.4,0.4,0.1)),
                        mass:0,
                    })
                    
                    b.hiveIndex=[x,y]
                    
                    raycastWorld.addBody(b)
                }
            }
            
            out.computeStats()
        })
        
        out.hiveMesh.setBuffers()
    }
    
    out.resetStats=function(){
        
        for(let i in out.defaultStats){
            
            out[i]=out.defaultStats[i]
        }
    }
    
    out.resetStats()
    
    out.sensitivity=0.005
    out.yaw=0
    out.pitch=0
    out.friction=15
    out.grounded=false
    out.cameraDir=[]
    out.zoom=11
    out.lookDir=[0,1]
    out.lookQuat=[0,1,0,0]
    out.rotQuat=[0,1,0,0]
    out.shiftLock=false
    out.flowerIn={}
    out._flowerIn={}
    out.pollen=0
    out.honey=0
    
    out.cameraRaycastPoint=new CANNON.Vec3()
    out.cameraRaycastResult=new CANNON.RaycastResult()
    out.cameraRaycastFilter={collisionFilterMask:STATIC_PHYSICS_GROUP}
    
    out.viewMatrix=new Float32Array(16)
    out.modelMatrix=new Float32Array(16)
    
    out.body=new CANNON.Body({
        
        shape:new CANNON.Box(new CANNON.Vec3(0.25,0.5,0.25)),
        position:new CANNON.Vec3(10,0,0),
        mass:5,
        fixedRotation:true,
        collisionFilterGroup:PLAYER_PHYSICS_GROUP,
        collisionFilterMask:STATIC_PHYSICS_GROUP,
    })
    
    out.body.addEventListener('collide',function(e){
        
        if(Math.abs(e.contact.ni.y)>0.2){
            
            out.grounded=true
        }
    })
    
    world.addBody(out.body)
    
    out.setProjectionMatrix=function(fov,aspect,zn,zf){
        
        var f=Math.tan(Math.PI*0.5-fov*MATH.HALF_TO_RAD)
        
        var rangeInv=1.0/(zn-zf)
        out.projectionMatrix=new Float32Array([f/aspect,0,0,0,0,f,0,0,0,0,(zn+zf)*rangeInv,-1,0,0,zn*zf*rangeInv*2,0])
        
    }
    
    out.fov=75
    out.setProjectionMatrix(out.fov,aspect,0.1,500)
    
    out.updateUI=function(){
        
        out.pollen=Math.round(Math.max(out.pollen,0))
        out.capacity=Math.round(out.capacity)
        out.honey=Math.round(out.honey)
        
        pollenAmount2.textContent=pollenAmount.textContent=MATH.addCommas((out.pollen).toString())+'/'+MATH.addCommas(player.capacity.toString())
        honeyAmount2.textContent=honeyAmount.textContent=MATH.addCommas((out.honey).toString())
        
        if(user.keys.c&&out.pollen){
            
            textRenderer.add(out.pollen,[player.body.position.x,player.body.position.y+1,player.body.position.z],COLORS.honey,1,'⇆')
            out.honey+=out.pollen
            out.pollen=0
        }
        
        let p=Math.min(out.pollen/out.capacity,1)
        
        capacityBar.setAttribute('width',p*196)
        capacityBar.style.fill='rgb('+p*255*1.5+','+(1-p)*255*1.5+',0)'
        out.health=Math.min(out.health+dt*1.5,100)
        
        if(out.health<=0){
            
            if(!out.dead){
                
                out.dead=true
                out.respawnTimer=3
                out.deadBodyPos=out.body.position.clone()
            }
            
            out.respawnTimer-=dt
            out.health=-10000
            
            out.body.velocity.setZero()
            user.keys={}
            out.body.position.copy(out.deadBodyPos)
            
            if(out.respawnTimer<=0){
                
                out.respawn()
            }
            
            ctx.fillStyle='rgb(225,0,0,0.4)'
            ctx.fillRect(0,0,width,height)
        }
        
        healthBar.setAttribute('width',out.health*0.72)
        healthBar.style.fill='rgb('+(100-out.health)*3.75+','+out.health*3.75+',0)'
        
        if(user.clickedKeys.r){
            
            out.sprinklers[out.currentSprinkler].set(player.fieldIn,player.flowerIn.x,player.flowerIn.z)
            out.currentSprinkler=(out.currentSprinkler+1)%(out.sprinklers.length)
            
            out.sprinklerMesh.setMeshFromFunction(function(box,a,cylinder){
                
                for(let i in out.sprinklers){
                    
                    let s=out.sprinklers[i]
                    
                    if(s.field){
                        
                        let x=s.x+fieldInfo[s.field].x,
                            y=fieldInfo[s.field].y+0.5,
                            z=s.z+fieldInfo[s.field].z
                        
                        // box(x,y,z,0.3,1.2,0.3,false,[0.3,0.3,0.3],false,false)
                        cylinder(x,y+0.25,z,0.15,2.5,10,0.9,0.9,0.5,1,90,0,0)
                        cylinder(x,y+1.5,z,0.2,0.15,10,1,1,0.5,1,90,0,0)
                        box(x,y+0.7,z,0.9,0.9,0.35,false,[0.2,10,10],false,false)
                        cylinder(x+0.4,y+1.1,z,0.25,0.35,10,0.2,10,10,1,0,0,0,0.25,false)
                        cylinder(x-0.4,y+1.1,z,0.25,0.35,10,0.2,10,10,1,0,0,0,0.25,false)
                        cylinder(x,y+0.7,z,0.3,0.375,10,0.5,0.5,0.5,1,0,0,0,0.25,false)
                        cylinder(x,y+0.7,z,0.1,0.5,10,0.2,10,10,1,0,0,0,0.1,false)
                        
                    }
                }
            })
            
            out.sprinklerMesh.setBuffers()
        }
        
        if(out.fieldIn&&user.keys.g){
            
            updateFlower(out.fieldIn,out.flowerIn.x,out.flowerIn.z,function(f){f.goo=1;},false,true,true)
            
        }
        
        if(out.itemDragging||out.beequipDragging){
            
            ctx.textAlign='end'
            ctx.font='bold 20px arial'
            ctx.fillStyle='rgb(255,255,255)'
            ctx.strokeStyle='rgb(0,0,0)'
            ctx.lineWidth=4
            ctx.strokeText(MATH.doGrammar(out.itemDragging||out.beequipDragging.type),user.mouseX,user.mouseY)
            ctx.fillText(MATH.doGrammar(out.itemDragging||out.beequipDragging.type),user.mouseX,user.mouseY)
            ctx.textAlign='center'
        }
        
        if(currentPage===1){
            
            pages[1].innerHTML=``
            
            for(let i in out.quests){
                
                pages[1].innerHTML+=`<div style='background-color:${out.quests[i].completed?"rgb(0,"+(Math.sin(TIME*5)*20+215)+",0)":"rgb(240,240,240)"};font-size:17px;text-align:center;margin-top:10px'>${out.quests[i].name}${(function(){
                    
                    let s='',isCompleted=true
                    
                    for(let j in out.quests[i].req){
                        
                        if((out.stats[out.quests[i].req[j][0]]-out.quests[i].req[j][2])/out.quests[i].req[j][1]>=1){
                            
                            out.quests[i].req[j][3]=true
                            
                        } else {
                            
                            isCompleted=false
                        }
                        
                        s+=`<svg style='width:195px;height:30px;margin-top:5px'>
                        <rect x='0' y='0' width='195' height='30' fill='rgb(255,0,0)'></rect>
                        
                        <rect x='0' y='0' width='${((out.stats[out.quests[i].req[j][0]]-out.quests[i].req[j][2])/out.quests[i].req[j][1])*195}' height='30' fill='rgb(0,255,0)'></rect>
                        <text fill='rgb(0,0,0)' x='97.5' y='12' text-anchor='middle' style='font-family:calibri;font-size:13px;'>${MATH.doStatGrammar(out.quests[i].req[j][0])+' '+MATH.addCommas(out.quests[i].req[j][1].toString())+' '+MATH.doGrammar(out.quests[i].req[j][0])}</text>
                        
                        <text fill='rgb(0,0,0)' x='97.5' y='25' text-anchor='middle' style='font-family:calibri;font-size:13px;'>(${MATH.addCommas((out.stats[out.quests[i].req[j][0]]-out.quests[i].req[j][2]).toString())})</text>
                        
                        </svg>`
                        
                    }
                    
                    out.quests[i].completed=isCompleted
                    NPCs[out.quests[i].NPC].activeQuest=!isCompleted
                    
                    return s
                    
                })()}</div>`
            }
        }
        
        if(currentPage===2&&TIME-player.statsStringLastUpdate>0.5){
            player.statsStringLastUpdate=TIME
            player.statString='<br>FPS: '+(1/dt).toFixed(2)+'<br>Delta Time: '+dt.toFixed(4)+'<br><br>Convert Rate: '+Math.round(player.convertRate*100)+'%<br>Red Pollen: '+Math.round(player.redPollen*100)+'%<br>Blue Pollen: '+Math.round(player.bluePollen*100)+'%<br>White Pollen: '+Math.round(player.whitePollen*100)+'%<br>Walk Speed: '+player.walkSpeed.toFixed(1)+'<br>Jump Power: '+player.jumpPower.toFixed(1)+'<br>Instant Red Conversion: '+Math.round(player.instantRedConversion*100)+'%<br>Instant Blue Conversion: '+Math.round(player.instantBlueConversion*100)+'%<br>Instant White Conversion: '+Math.round(player.instantWhiteConversion*100)+'%<br>Instant Flame Conversion: '+Math.round(player.instantFlameConversion*100)+'%<br>Critical Chance: '+Math.round(player.criticalChance*100)+'%<br>Critical Power: '+Math.round(player.criticalPower*100)+'%<br>Super-Crit Chance: '+Math.round(player.superCritChance*100)+'%<br>Super-Crit Power: '+Math.round(player.superCritPower*100)+'%<br>Goo: '+Math.round(player.goo*100)+'%<br>Instant Goo Conversion: '+Math.round(player.instantGooConversion*100)+'%<br>Flame Pollen: '+Math.round(player.flamePollen*100)+'%<br>Bubble Pollen: '+Math.round(player.bubblePollen*100)+'%<br>Pollen From Tools: '+Math.round(player.pollenFromTools*100)+'%<br>Pollen From Bees: '+Math.round(player.pollenFromBees*100)+'%<br>White Bomb Pollen: '+Math.round(player.whiteBombPollen*100)+'%<br>Red Bomb Pollen: '+Math.round(player.redBombPollen*100)+'%<br>Blue Bomb Pollen: '+Math.round(player.blueBombPollen*100)+'%<br>White Bee Attack: '+player.whiteBeeAttack+'<br>Blue Bee Attack: '+player.blueBeeAttack+'<br>Red Bee Attack: '+player.redBeeAttack+'<br>Bee Attack Multiplier: '+Math.round(player.beeAttack*100)+'%<br>Honey From Tokens: '+Math.round(player.honeyFromTokens*100)+'%<br>Red Bee Ability Rate: '+Math.round(player.redBeeAbilityRate*100)+'%<br>Blue Bee Ability Rate: '+Math.round(player.blueBeeAbilityRate*100)+'%<br>White Bee Ability Rate: '+Math.round(player.whiteBeeAbilityRate*100)+'%<br>Bee Movespeed: '+Math.round(player.beeSpeed*100)+'%<br>Bee Energy: '+Math.round(player.beeEnergy*100)+'%<br>Honey At Hive: '+Math.round(player.honeyAtHive*100)+'%<br>Convert Total: '+Math.round(player.convertTotal)
            
            pages[2].innerHTML='<div style="color:'+(player.setting_enablePollenText?'rgb(0,170,0)':'rgb(220,0,0)')+'" id="togglePollenText">Pollen Text: '+(player.setting_enablePollenText?'On':'Off')+'</div>'+'<div style="color:'+(player.setting_enablePollenAbv?'rgb(0,170,0)':'rgb(220,0,0)')+'" id="togglePollenAbv">Abbreviate Pollen: '+(player.setting_enablePollenAbv?'On':'Off')+'</div>'+player.statString
            
            document.getElementById('togglePollenText').addEventListener('click',function(){
                
                player.setting_enablePollenText=!player.setting_enablePollenText
                
                pages[2].innerHTML='<div style="color:'+(player.setting_enablePollenText?'rgb(0,170,0)':'rgb(220,0,0)')+'" id="togglePollenText">Pollen Text: '+(player.setting_enablePollenText?'On':'Off')+'</div>'+'<div style="color:'+(player.setting_enablePollenAbv?'rgb(0,170,0)':'rgb(220,0,0)')+'" id="togglePollenAbv">Abbreviate Pollen: '+(player.setting_enablePollenAbv?'On':'Off')+'</div>'+player.statString
                
            })
            
            document.getElementById('togglePollenAbv').addEventListener('click',function(){
                
                player.setting_enablePollenAbv=!player.setting_enablePollenAbv
                
                pages[2].innerHTML='<div style="color:'+(player.setting_enablePollenText?'rgb(0,170,0)':'rgb(220,0,0)')+'" id="togglePollenText">Pollen Text: '+(player.setting_enablePollenText?'On':'Off')+'</div>'+'<div style="color:'+(player.setting_enablePollenAbv?'rgb(0,170,0)':'rgb(220,0,0)')+'" id="togglePollenAbv">Abbreviate Pollen: '+(player.setting_enablePollenAbv?'On':'Off')+'</div>'+player.statString
                
            })
        }
        
        if(currentPage===3){
            
            pages[3].innerHTML=player.beequipPageHTML
        }
        
        for(let i=out.messages.length;i--;){
            
            let m=out.messages[i]
            
            m.life-=dt
            
            ctx.font=m.size+'px arial'
            ctx.fillStyle=m.color+m.life+')'
            ctx.fillRect(width-250,height-24-(i*22),244,20)
            ctx.fillStyle='rgb(255,255,255,'+m.life+')'
            ctx.fillText(m.message,width-125,height-13-(i*22))
            
            if(m.life<=0){
                
                out.messages.splice(i,1)
            }
        }
        
        if(!player.fieldIn){
            
            if(!player.currentNPC){
                
                for(let i in NPCs){
                    
                    if(triggers[i+'_NPC'].colliding&&!NPCs[i].activeQuest){
                        
                        actionWarning.style.display='block'
                        actionName.innerHTML='Talk To '+MATH.doGrammar(i)
                        
                        actionWarning.onclick=function(){
                            
                            player.currentNPC=i
                            player.onStartChat()
                        }
                        
                        if(user.clickedKeys.e){
                            
                            player.currentNPC=i
                            player.onStartChat()
                        }
                    }
                }
            }
            
            if(!player.currentShop){
                
                for(let i in shops){
                    
                    if(triggers[i+'_shop'].colliding&&!out.currentShop){
                        
                        actionWarning.style.display='block'
                        actionName.innerHTML=shops[i].message
                        
                        actionWarning.onclick=function(){
                            
                            player.currentShop=i
                            player.onStartShop()
                        }
                        
                        if(user.clickedKeys.e){
                            
                            player.currentShop=i
                            player.onStartShop()
                        }
                    }
                }
                
            } else {
                
                actionWarning.style.display='block'
                actionName.innerHTML='Leave Shop'
                
                let cost=shops[out.currentShop].items[shops[out.currentShop].currentIndex].cost,canBuy=true
                
                for(let j in cost){
                    
                    let c=cost[j].split(' ')
                    
                    if(c[1]==='honey'&&player.honey<Number(c[0])||c[1]!=='honey'&&items[c[1]].amount<Number(c[0])){
                        
                        canBuy=false
                    }
                }
                
                purchaseButton.innerHTML=shops[out.currentShop].items[shops[out.currentShop].currentIndex].owned?out.currentGear[shops[out.currentShop].items[shops[out.currentShop].currentIndex].slot]===shops[out.currentShop].items[shops[out.currentShop].currentIndex].name?'Equipped':'Equip':canBuy?'Purchase':'Not Enough'
                purchaseButton.style.backgroundColor=shops[out.currentShop].items[shops[out.currentShop].currentIndex].owned?out.currentGear[shops[out.currentShop].items[shops[out.currentShop].currentIndex].slot]===shops[out.currentShop].items[shops[out.currentShop].currentIndex].name?'rgb(100,200,100)':'rgb(0,200,0)':canBuy?'rgb(0,200,0)':'rgb(225,0,0)'
                
                if(user.clickedKeys.e){
                    
                    out.currentShop=undefined
                    out.viewMatrixToChange=undefined
                    shopUI.style.display='none'
                }
            }
        }
        
        if(out.passivePopupTimer<=0){
            
            passiveActivationPopup.style.display='none'
            
        } else {
            
            out.passivePopupTimer-=dt
            let p=[player.body.position.x,player.body.position.y+1.75,player.body.position.z,1]
            
            vec4.transformMat4(p,p,out.viewMatrix)
            
            p[0]/=p[3]
            p[1]/=p[3]
            
            p[0]+=1
            p[1]+=1
            
            p[0]*=half_width
            p[1]*=half_height
            
            passiveActivationPopup.style.marginLeft=(p[0]-15)+'px'
            passiveActivationPopup.style.marginTop=(height-p[1])+'px'
            
        }
        
        if(player.beePopup){
            
            document.exitPointerLock()
            player.pointerLocked=false
            
            let bee=player.beePopup.type
            
            ctx.translate(half_width+40,half_height+20)
            ctx.scale(Math.min(1,(TIME-player.beePopup.time)*10),Math.min(1,(TIME-player.beePopup.time)*10))
            ctx.fillStyle=player.beePopup.gifted?'rgb('+((Math.sin(TIME*2)+0.85)*70)+','+((Math.cos(TIME*2.5)+0.85)*127)+','+((Math.sin(TIME*2+3.14)+0.85)*100)+')':'rgb(166, 166, 51)'
            ctx.fillRect(-127,-177,245,330)
            ctx.fillStyle='rgb(255,255,150)'
            ctx.fillRect(-125,-175,240,30)
            ctx.fillRect(-125,40,240,110)
            
            ctx.fillStyle=[beeInfo[bee].color]
            ctx.fillRect(-125,10,240,25)
            
            if(user.mouseX>half_width+40-125&&user.mouseX<half_width-125+30+40&&user.mouseY>half_height-175+20&&user.mouseY<half_height-175+30+20){
                
                ctx.fillStyle='rgb(180,0,0)'
                
                if(user.mouseClicked||user.keys.j){
                    
                    player.beePopup=false
                }
                
            } else {
                
                ctx.fillStyle='rgb(255,0,0)'
            }
            
            ctx.fillRect(-125,-175,30,30)
            ctx.strokeStyle='rgb(0,0,0)'
            ctx.lineWidth=2
            ctx.beginPath()
            ctx.moveTo(-120,-170)
            ctx.lineTo(-120+20,-170+20)
            ctx.moveTo(-120+20,-170)
            ctx.lineTo(-120,-170+20)
            ctx.stroke()
            ctx.lineWidth=1.5
            
            ctx.fillStyle={common:'rgb(255,255,255)',rare:'rgb(200,200,200)',epic:'rgb(255,220,0)',legendary:'rgb(0,200,255)',mythic:'rgb(255, 0, 255)',event:'rgb(100,230,0)'}[beeInfo[bee].rarity]
            ctx.font='bold 27px arial'
            ctx.fillText((player.beePopup.gifted?'Gifted ':'')+MATH.doGrammar(bee+'Bee')+'!'.repeat({common:1,rare:1,epic:2,legendary:3,mythic:4,event:5}[beeInfo[bee].rarity]),0,-120)
            ctx.strokeText((player.beePopup.gifted?'Gifted ':'')+MATH.doGrammar(bee+'Bee')+'!'.repeat({common:1,rare:1,epic:2,legendary:3,mythic:4,event:5}[beeInfo[bee].rarity]),0,-120)
            
            ctx.font='bold 13px arial'
            ctx.fillStyle='black'
            ctx.textAlign='default'
            ctx.fillText(player.beePopup.message,-40,-160)
            ctx.textAlign='center'
            ctx.font='bold 16px arial'
            
            let d=beeInfo[bee].description.split(' '),m=0,t='',c=0
            
            for(let i in d){
                
                let met=ctx.measureText(d[i])
                
                m+=Math.abs(met.actualBoundingBoxLeft)+Math.abs(met.actualBoundingBoxRight)
                
                t+=d[i]+' '
                
                if(m>150){
                    
                    m=0
                    ctx.fillText(t,0,c*20+60)
                    t=''
                    c++
                }
            }
            
            ctx.fillText(t,0,c*20+60)
            
            ctx.font='bold 17px arial'
            ctx.fillText(MATH.doGrammar(beeInfo[bee].color)+'     '+MATH.doGrammar(beeInfo[bee].rarity),0,23)
            
            ctx.rotate(Math.cos(TIME*5)*0.1)
            ctx.drawImage(beeCanvas,beeInfo[bee].u*2048,beeInfo[bee].v*2048,128,128,-45,-95+Math.sin(TIME*2)*7,90,90)
            
            ctx.setTransform(1,0,0,1,0,0)
        }
        
        out.sunSwitchTimer-=dt
        
        if(out.sunSwitchTimer<=0){
            
            if(out.isNight<0.9){
                
                out.turnDay()
                out.sunSwitchTimer=4*60
                
            } else {
                
                out.turnNight()
                out.sunSwitchTimer=1.5*60
            }
        }
        
        if(out.isNight!==out.targetLight){
            
            out.isNight=MATH.constrain(out.isNight+(dt/7.5)*Math.sign(out.targetLight-out.isNight),NIGHT_DARKNESS,1)
            
            vec3.scale(out.skyColor,[0.4,0.6,1],MATH.map(out.isNight,NIGHT_DARKNESS,1,0,1))
            
            gl.useProgram(staticGeometryProgram)
            gl.uniform1f(glCache.static_isNight,out.isNight)
            gl.useProgram(dynamicGeometryProgram)
            gl.uniform1f(glCache.dynamic_isNight,out.isNight)
            gl.useProgram(tokenGeometryProgram)
            gl.uniform1f(glCache.token_isNight,out.isNight)
            gl.useProgram(flowerGeometryProgram)
            gl.uniform1f(glCache.flower_isNight,out.isNight)
            gl.useProgram(beeGeometryProgram)
            gl.uniform1f(glCache.bee_isNight,out.isNight)
            gl.useProgram(mobRendererProgram)
            gl.uniform1f(glCache.mob_isNight,out.isNight)
            gl.useProgram(trailRendererProgram)
            gl.uniform1f(glCache.trail_isNight,out.isNight)
            
            out.updateMapLightTimer-=dt
            
            if(out.updateMapLightTimer<=0){
                
                UPDATE_MAP_MESH()
                out.updateMapLightTimer=0.5
                out.keepMapUpToDate=true
            }
            
        } else if(out.keepMapUpToDate){
            
            out.keepMapUpToDate=false
            UPDATE_MAP_MESH()
        }
        
    }
    
    out.addMessage=function(m,color=[30,70,255]){
        
        ctx.textAlign='center'
        ctx.textBaseline='middle'
        ctx.font='16px arial'
        let met=ctx.measureText(m)
        
        met=Math.abs(met.actualBoundingBoxLeft)+Math.abs(met.actualBoundingBoxRight)
        
        let s=1
        
        if(met>232){
            
            s=232/met
        }
        
        
        if(m.indexOf('(from')>-1){
            
            let i=m.indexOf('(from')+6,f=m.substr(i,m.length).replace(')',''),v=m.indexOf('+')+1,vx=m.indexOf(' '),dis=m.substr(v,vx).replaceAll(',','')-1,found=false
            
            for(let i in out.messages){
                
                let t=out.messages[i]
                
                if(t.message.indexOf(f)>-1){
                    
                    found=true
                    
                    let _v=t.message.indexOf('+')+1,_vx=t.message.indexOf(' '),dat=t.message.substr(_v,_vx).replaceAll(',','')-1
                    t.message=t.message.substr(0,_v)+MATH.addCommas((dis+dat)+'')+' (from '+f+')'
                    t.life=3
                    
                    break
                }
            }
            
            if(!found){
                
                out.messages=[{message:m,color:'rgb('+color[0]+','+color[1]+','+color[2]+',',size:s*16,life:3},...out.messages]
            }
            
        } else {
            
            out.messages=[{message:m,color:'rgb('+color[0]+','+color[1]+','+color[2]+',',size:s*16,life:3},...out.messages]
            
        }
    }
    
    out.bodyDir=[]
    
    out.updateCamera=function(){
        
        if(user.clickedKeys.shift){
            
            out.shiftLock=!out.shiftLock
        }
        
        if(out.shiftLock){
            
            MATH.xRotate(MATH.yRotate(out.viewMatrix,out.cosYaw,out.sinYaw),out.cosPitch,out.sinPitch)
            
            out.cameraDir[0]=out.viewMatrix[2]
            out.cameraDir[1]=out.viewMatrix[6]
            out.cameraDir[2]=out.viewMatrix[10]
            
            out.cameraRaycastPoint.set(player.body.position.x+out.cameraDir[0]*out.zoom,player.body.position.y+0.35+out.cameraDir[1]*out.zoom,player.body.position.z+out.cameraDir[2]*out.zoom)
            
            world.raycastClosest(out.body.position,out.cameraRaycastPoint,out.cameraRaycastFilter,out.cameraRaycastResult)
            
            let d=out.cameraRaycastResult.distance<0?out.zoom:out.cameraRaycastResult.distance
            
            out.lookDir=[-out.cameraDir[0],-out.cameraDir[2]]
            
            let normalizedCamDir=vec2.normalize([],out.lookDir)
            
            MATH.translate(out.viewMatrix,-player.body.position.x-out.cameraDir[0]*d+normalizedCamDir[1],-player.body.position.y-0.35-out.cameraDir[1]*d,-player.body.position.z-out.cameraDir[2]*d-normalizedCamDir[0])
            
            MATH.mult(out.viewMatrix,out.projectionMatrix,out.viewMatrix)
            
            out.playerAngle=Math.atan2(-out.cameraDir[0],-out.cameraDir[2])
            
            quat.setAxisAngle(out.rotQuat,MATH.Y_AXIS,out.playerAngle)
            
            vec3.transformQuat(out.bodyDir,MATH.Z,out.rotQuat)
            
            mat4.fromQuat(out.modelMatrix,out.rotQuat)
            
            out.modelMatrix[12]=player.body.position.x
            out.modelMatrix[13]=player.body.position.y
            out.modelMatrix[14]=player.body.position.z
            
        } else {
            
            MATH.xRotate(MATH.yRotate(out.viewMatrix,out.cosYaw,out.sinYaw),out.cosPitch,out.sinPitch)
            
            out.cameraDir[0]=out.viewMatrix[2]
            out.cameraDir[1]=out.viewMatrix[6]
            out.cameraDir[2]=out.viewMatrix[10]
            
            out.cameraRaycastPoint.set(player.body.position.x+out.cameraDir[0]*out.zoom,player.body.position.y+0.35+out.cameraDir[1]*out.zoom,player.body.position.z+out.cameraDir[2]*out.zoom)
            
            world.raycastClosest(out.body.position,out.cameraRaycastPoint,out.cameraRaycastFilter,out.cameraRaycastResult)
            
            let d=out.cameraRaycastResult.distance<0?out.zoom:out.cameraRaycastResult.distance
            
            MATH.translate(out.viewMatrix,-player.body.position.x-out.cameraDir[0]*d,-player.body.position.y-0.35-out.cameraDir[1]*d,-player.body.position.z-out.cameraDir[2]*d)
            MATH.mult(out.viewMatrix,out.projectionMatrix,out.viewMatrix)
            
            vec2.normalize(out.lookDir,[out.body.velocity.x,out.body.velocity.z])
            
            out.playerAngle=Math.atan2(out.lookDir[0],out.lookDir[1])
            
            quat.setAxisAngle(out.lookQuat,MATH.Y_AXIS,out.playerAngle)
            
            if(!out.currentNPC){
                
                if(user.keys.w||user.keys.s||user.keys.a||user.keys.d)
                    quat.slerp(out.rotQuat,out.rotQuat,out.lookQuat,dt*6.5)
            }
            
            mat4.fromQuat(out.modelMatrix,out.rotQuat)
            
            vec3.transformQuat(out.bodyDir,MATH.Z,out.rotQuat)
            
            out.modelMatrix[12]=player.body.position.x
            out.modelMatrix[13]=player.body.position.y
            out.modelMatrix[14]=player.body.position.z
        }
        
        out.toolRot+=dt*10
        
        mat4.copy(out.toolMatrix,out.modelMatrix)
        mat4.rotateX(out.toolMatrix,out.toolMatrix,Math.max(0,(-Math.abs(out.toolRot-2)+2)*MATH.QUATER_PI))
        
        if(out.viewMatrixToChange){
            
            out.easeAmount+=(1-out.easeAmount)*dt*5
            MATH.lerpMatrix(out.viewMatrixCopy,out.viewMatrixToChange,out.easeAmount)
            out.viewMatrix=out.viewMatrixCopy.slice()
        }
    }
    
    out.updatePhysics=function(){
        
        out.cosYaw=Math.cos(out.yaw)
        out.sinYaw=Math.sin(out.yaw)
        out.cosPitch=Math.cos(out.pitch)
        out.sinPitch=Math.sin(out.pitch)
        
        let s=dt*out.walkSpeed*(out.grounded?1:0.75),cdir=out.cosYaw,sdir=out.sinYaw
        
        if(!out.currentNPC&&!out.currentShop&&!out.removeAirFrictionUntilGrounded&&!out.isGliding){
            
            let dx=0,dz=0,c=0
            
            if(user.keys.d){
                
                dx=cdir
                dz=sdir
                c=1
            }
            
            if(user.keys.w){
                
                dx+=sdir
                dz-=cdir
                c++
            }
            
            if(user.keys.a){
                
                dx-=cdir
                dz-=sdir
                c++
            }
            
            if(user.keys.s){
                
                dx-=sdir
                dz+=cdir
                c++
            }
            
            if(c>1){
                
                dx*=0.707106781
                dz*=0.707106781
                
            }
            
            out.body.velocity.x+=dx*s
            out.body.velocity.z+=dz*s
            
        } else if(out.isGliding){
            
            cdir*=0.7
            sdir*=0.7
            
            if(user.keys.d){
                
                out.bodyDir[0]+=cdir
                out.bodyDir[2]+=sdir
            }
            
            if(user.keys.w){
                
                out.bodyDir[0]+=sdir
                out.bodyDir[2]-=cdir
            }
            
            if(user.keys.a){
                
                out.bodyDir[0]-=cdir
                out.bodyDir[2]-=sdir
            }
            
            if(user.keys.s){
                
                out.bodyDir[0]-=sdir
                out.bodyDir[2]+=cdir
            }
            
            vec3.normalize(out.bodyDir,out.bodyDir)
            
            out.body.velocity.x=out.bodyDir[0]*out.gliderSpeed
            out.body.velocity.z=out.bodyDir[2]*out.gliderSpeed
            out.body.velocity.y=out.gliderFall
        }
        
        if(out.grounded){
            
            if(out.isGliding){
                
                out.isGliding=false
                out.updateGear()
            }
            
            out.removeAirFrictionUntilGrounded=false
            
            if(user.keys[' ']){
                
                out.grounded=false
                out.body.velocity.y=out.jumpPower
            }
            
            out.body.velocity.x-=out.body.velocity.x*dt*out.friction
            out.body.velocity.z-=out.body.velocity.z*dt*out.friction   
            
            
        } else if(!out.removeAirFrictionUntilGrounded){
            
            out.body.position.y+=0.001
            
            out.body.velocity.x-=out.body.velocity.x*dt*out.friction*0.75
            out.body.velocity.z-=out.body.velocity.z*dt*out.friction*0.75 
            
        }
        
        if((out.body.velocity.y<5||out.removeAirFrictionUntilGrounded)&&user.clickedKeys[' ']){
            
            if(!out.isGliding){
                
                out.isGliding=true
                out.grounded=false
                out.removeAirFrictionUntilGrounded=false
                
            } else {
                
                out.isGliding=false
            }
            
            out.updateGear()
        }
        
        if(out.pollen||out.hiveBalloon.pollen){
            
            out.stopConverting=false
        }
        
        out.converting=out.convertingBalloon=triggers.hive.colliding&&!out.stopConverting
        
        if(triggers.hive.colliding){
            
            player.radioactiveParticleTimer-=dt
            
            for(let y=0;y<player.hive.length;y++){
                
                for(let x=0;x<player.hive[y].length;x++){
                    
                    if(player.hive[y][x].type){
                        
                        let c=COLORS.whiteArr,m=player.hive[y][x].bee.mutation
                        
                        if(m){
                            
                            c=({maxEnergy:[100,170,255],attack:[255,20,20],gatherAmount:[100,255,100],convertAmount:COLORS.honey,abilityRate:[255,100,255]})[m.stat]
                        }
                        
                        textRenderer.addSingle(player.hive[y][x].level.toString(),[player.hivePos[0]+x*0.8-0.25,player.hivePos[1]+y*0.8-2.5,player.hivePos[2]+0.1],c,-1.5)
                        
                    }
                    
                    if(player.hive[y][x].beequip){
                        
                        textRenderer.addDecal([player.hivePos[0]+x*0.8+0,player.hivePos[1]+y*0.8-2.25,player.hivePos[2]+0.1],player.hive[y][x].beequip.type,[-1.3,-1.3])
                        
                    }
                        
                    if(player.hive[y][x].radioactive>0){
                        
                        player.hive[y][x].radioactive-=dt
                        
                        textRenderer.addDecal([player.hivePos[0]+x*0.8+0.25,player.hivePos[1]+y*0.8-2.5,player.hivePos[2]+0.1],'radioactive',[1.3,1.3])
                        
                        if(player.radioactiveParticleTimer<=0){
                            
                            player.radioactiveParticleTimer=1
                            
                            ParticleRenderer.add({x:player.hivePos[0]+x*0.8,y:player.hivePos[1]+y*0.8-2.25,z:player.hivePos[2]+0.1,vx:MATH.random(-0.15,0.15),vy:MATH.random(-0.15,0.15),vz:0,grav:0,size:250,col:[0,1,0],life:2,rotVel:MATH.random(-3,3),alpha:0.5})
                            
                        }
                    }
                }
            }
        }
        
    }
    
    out.updateFields=function(){
        
        player.fieldIn=null
        
        for(let i in fieldInfo){
            
            updateFlower(i,MATH.random(0,fieldInfo[i].width)|0,MATH.random(0,fieldInfo[i].length)|0,function(f){
                
                f.height+=0.05
                f.goo=Math.max(f.goo-0.25,0)
                f.pollinationTimer-=0.075
                
                if(f.pollinationTimer<=0){
                    
                    f.pollinationTimer=1
                    f.level=Math.max(f.ogLevel,f.level-1)
                }
                
                if(TIME-fieldInfo[i].haze.start<30&&TIME-fieldInfo[i].haze.delay>0.07){
                    
                    fieldInfo[i].haze.delay=TIME
                    
                    if(f.level<5){
                        
                        f.level++
                        f.pollinationTimer=1
                        
                    } else {
                        
                        f.height=1
                    }
                    
                    for(let j=0;j<6;j++){
                        
                        ParticleRenderer.add({x:f.x+fieldInfo[i].x,y:fieldInfo[i].y+0.5,z:f.z+fieldInfo[i].z,vx:MATH.random(-1,1),vy:Math.random()*2,vz:MATH.random(-1,1),grav:-3,size:100,col:[1,1,MATH.random(0.6,1)],life:1,rotVel:MATH.random(-3,3),alpha:2})
                    }
                    
                } else {
                    
                    if(TIME-fieldInfo[i].haze.start>30){
                        
                        fieldInfo[i].haze={}
                    }
                }
                
            },true,true,true)
            
            let x=(Math.round(player.body.position.x-fieldInfo[i].x)),
                z=(Math.round(player.body.position.z-fieldInfo[i].z))
            
            if(x>=0&&x<fieldInfo[i].width&&z>=0&&z<fieldInfo[i].length&&Math.abs(player.body.position.y-fieldInfo[i].y)<2){
                
                player.fieldIn=i
                player.flowerIn.x=x
                player.flowerIn.z=z
                
                break
            }
        }
        
        if(player.fieldIn&&(player._flowerIn.x!==player.flowerIn.x||player._flowerIn.z!==player.flowerIn.z)){
            
            collectPollen({x:player.flowerIn.x,z:player.flowerIn.z,pattern:[[0,0]],amount:player.movementCollection,stackOffset:0.4,yOffset:1,gooTrail:out.currentGear.boots==='gummyBoots'})
            
            player._flowerIn={...player.flowerIn}
        }
        
        out.toolCooldown-=dt
        
        if(tools[out.tool].particles){
                tools[out.tool].particles()}
        
        if((user.keys.j||user.mousePressed)&&out.toolCooldown<=0){
            out.toolUses++
            
            let arr=[]
            
            if(out.fieldIn){
                
                let p=[],a=out.playerAngle
                
                if(tools[out.tool].computeDirection===undefined){
                    
                    for(let i in tools[out.tool].collectPattern){
                        
                        p.push(tools[out.tool].collectPattern[i].slice())
                    }
                    
                    if(Math.abs(a)>MATH.PI_SUB_QUATER){
                        
                        
                    } else if(Math.abs(a)<MATH.QUATER_PI){
                        
                        for(let i in p){
                            
                            p[i][1]=-p[i][1]
                        }
                        
                    } else if(MATH.HALF_PI-a>MATH.QUATER_PI){
                        
                        for(let i in p){
                            
                            p[i]=[p[i][1],-p[i][0]]
                        }
                        
                    } else if(MATH.HALF_PI-a<MATH.QUATER_PI){
                        
                        for(let i in p){
                            
                            p[i]=[-p[i][1],p[i][0]]
                        }
                    }
                    
                } else {
                    
                    p=tools[out.tool].collectPattern
                }
                
                arr=p.slice()
                
                collectPollen({x:player.flowerIn.x,z:player.flowerIn.z,pattern:p,amount:tools[out.tool].collectAmount,yOffset:1.5,stackHeight:0.75,isGummyBaller:out.tool==='gummyBaller',multiplier:player.pollenFromTools})
                
            }
            
            if(tools[out.tool].ability)
                tools[out.tool].ability(arr)
            
            out.toolCooldown=tools[out.tool].cooldown/player.collectorSpeed
            out.toolRot=0
        }
        
        for(let i in out.sprinklers){
            
            out.sprinklers[i].update()
        }
        
        for(let i in objects.flames){
            
            if(objects.flames[i].update()){
                
                objects.flames[i].die(i)
            }
        }
    }
    
    return out
    
})({})

function computeSceneViewMatrix(x,y,z,yaw,pitch){
    
    let m=new Float32Array(16)
    
    let cy=Math.cos(yaw),sy=Math.sin(yaw),cp=Math.cos(pitch),sp=Math.sin(pitch)
    
    MATH.xRotate(MATH.yRotate(m,cy,sy),cp,sp)
    
    MATH.translate(m,-x,-y,-z)
    
    MATH.mult(m,player.projectionMatrix,m)
    
    return m
}

let NPCs={
    
    dat:{
        
        viewMatrix:[-12,0,0,-1,0],
        
        dialogueIndex:0,
        dialogue:['Hello! This is me, Dat, a terrible 3d designer...\nAnyways click in this blue dialogue box to continue','This is the current NPC and quest system, which is pretty good. Right now the quest menu icon on the bar is just a rectangle...','In there you can see your progress in your quests, and...that\'s it...','Here\'s your quest, and maybe the last thing you\'ll hear from me b4 i go :( so check your quests list for a weird tongue-twisting quest',function(){player.addQuest('The Last Best Stress Test Quest\'s Request Mess',[['bluePollen',75000],['redPollen',50000],['whitePollen',25000],['goo',2500],['abilityTokens',50],['honeyTokens',3],['rhinoBeetle',1]],'dat');NPCs.dat.activeQuest=true;},'Cool ya did my quest so here\'s your rewards...',function(){
            
            for(let i in player.quests){
                
                if(player.quests[i].NPC==='dat'){
                    
                    player.quests.splice(i,1)
                }
            }
            
            player.honey+=12345678
            textRenderer.add(12345678+'',[player.body.position.x,player.body.position.y+2,player.body.position.z],COLORS.honey,0,'+')
            player.addMessage('+'+MATH.addCommas(12345678+'')+' Honey (from your fren)')
            
        },'This is just here as the last message from this npc...but cool that you really checked lol \nthere\'s this bug where you\'re stuck here but am too lazy to fix...'],
    },
}

for(let i in NPCs){
    
    NPCs[i].viewMatrix=computeSceneViewMatrix(...NPCs[i].viewMatrix)
}

let shops={
    
    cool:{
        
        items:[{
            name:'gummyMask',
            desc:'The offical mask of a gummy soldier.<br><br>x2 goo<br>x1.75 capacity<br>x1.25 white pollen<br>x1.25 pollen<br>+25% instant goo conversion<br>x1.5 honey from tokens<br>x1.5 pollen from bees<br>x1.75 convert rate<br>+30% defense<br>x1.2 bee ability rate<br>+Passive: Gummy Morph<br>+Passive: Coin Scatter',
            slot:'mask',
            cost:['5000000000 honey','250 glue','100 enzymes','100 oil','100 glitter'],
            viewMatrix:[25,5,16,-Math.PI,-0.3],
        },{
            
            name:'diamondMask',
            desc:'Proudly show off your extreme wealth to the world. Shine so brightly that others will complain.<br><br>x1.75 blue pollen<br>x3 capacity<br>x3 convert rate<br>x1.25 honey at hive<br>x2 bubble pollen<br>x1.75 blue bomb pollen<br>+30% defense<br>x1.2 bee ability rate<br>+Passive: Diamond Drain<br>+Passive: Bubble Bombs',
            slot:'mask',
            cost:['5000000000 honey','250 blueExtract','1 diamondEgg','100 glitter','150 oil'],
            viewMatrix:[20,5,16,-Math.PI,-0.3],
        },{
            
            name:'demonMask',
            
            desc:'Embrace hate to take on the form of a Demon Bee. Become both extremely unpleasant and powerful.<br><br>x1.75 red pollen<br>x2 capacity<br>+50% instant flame conversion<br>x2 flame pollen<br>x1.25 bee attack<br>+35% defense<br>+20% bee ability rate<br>+Passive: X Flame<br>+Passive: Ignite',
            slot:'mask',
            cost:['5000000000 honey'],
            viewMatrix:[15,5,16,-Math.PI,-0.3],
        },{
            
            name:'coconutCanister',
            desc:'A back-mounted coconut that protects you during emergencies.<br><br>+1,500,000 capacity<br>x5 convert rate<br>+15% instant conversion<br>+10% instant white conversion<br>x1.25 pollen<br>x1.2 white pollen<br>+1 bee attack<br>+10% defense<br>x1.15 honey at hive<br>+Passive: Emergengy Shield<br>+Passive: Inspire Coconuts',
            slot:'backpack',
            cost:['25000000000 honey','150 tropicalDrink','250 redExtract','250 blueExtract'],
            viewMatrix:[10,5,16,-Math.PI,-0.3],
        }],
        
        currentIndex:0,message:'Explore Cool Shop'
    },
}

for(let i in shops){
    
    for(let j in shops[i].items){
        
        shops[i].items[j].viewMatrix=computeSceneViewMatrix(...shops[i].items[j].viewMatrix)
    }
    
}

let user=(function(out){
    
    out.mouseX=0
    out.mouseY=0
    out.mousePressed=false
    out.mouseClicked=false
    
    out.keys={}
    out.clickedKeys={}
    
    uiCanvas.onmousedown=function(e){
        
        out.mousePressed=true
        
        if(player.itemDragging||player.beequipDragging){
            
            if(player.canUseItem||player.itemDragging&&!items[player.itemDragging].canUseOnSlot){
                
                if(player.beequipDragging){
                    
                    if(player.currentGear.beequips[player.beequipLookingAt].bee){
                        
                        player.hive[player.currentGear.beequips[player.beequipLookingAt].bee[1]][player.currentGear.beequips[player.beequipLookingAt].bee[0]].beequip=null
                        
                    }
                    
                    player.hive[player.hiveIndex[1]][player.hiveIndex[0]].beequip=player.beequipDragging
                    player.currentGear.beequips[player.beequipLookingAt].bee=player.hiveIndex
                    player.beequipDragging=false
                    player.updateHive()
                    
                } else {
                    
                    items[player.itemDragging].use()
                    player.updateInventory()
                    player.itemDragging=false
                }
            }
            
        } else {
            
            if(!player.pointerLocked)
                uiCanvas.requestPointerLock()
        }
        
    }
    
    uiCanvas.onmouseup=function(e){
        
        out.mousePressed=false
        out.mouseClicked=true
    }
    
    uiCanvas.onmousemove=function(e){
        
        out.mouseX=e.x
        out.mouseY=e.y
        
        if(player.pointerLocked){
            
            player.yaw+=e.movementX*player.sensitivity
            player.pitch=MATH.constrain(player.pitch-e.movementY*player.sensitivity,-MATH.HALF_PI,MATH.HALF_PI)
        }
    }
    
    document.onkeydown=function(e){
        
        out.keys[e.key.toLowerCase()]=true
        out.clickedKeys[e.key.toLowerCase()]=true
    }
    
    document.onkeyup=function(e){
        
        out.keys[e.key.toLowerCase()]=false
    }
    
    uiCanvas.oncontextmenu=function(e){
        
        e.preventDefault()
    }
    
    uiCanvas.onwheel=function(e){
        
        e.preventDefault()
        player.zoom=MATH.constrain(player.zoom+e.deltaY*0.01,5,20)
    }
    
    out.update=function(){
        
        out.clickedKeys={}
        out.mouseClicked=false
    }
    
    return out
    
})({})

let textRenderer=(function(out){
    
    out.data=[]
    out.decals=[]
    
    out.decalUV={
        
        radioactive:[0,0],
        rect:[128/1024,0],
        flower:[128*2/1024,0],
        glow:[128*3/1024,0],
        candycane:[128*4/1024,0],
        boombox:[128*5/1024,0],
        
    }
    
    out.instanceData=[]
    out.decal_instanceData=[]
    
    out.instanceBuffer=gl.createBuffer()
    out.vertBuffer=gl.createBuffer()
    out.indexBuffer=gl.createBuffer()
    out.decal_vertBuffer=gl.createBuffer()
    out.decal_indexBuffer=gl.createBuffer()
    
    let w=0.09,h=0.105,fx=0.002,fy=-0.8955
    
    let v=[
        
        -w,-h,fx,fy,
        w,-h,w+fx,fy,
        w,h,w+fx,-h/(600/512)+fy,
        -w,h,fx,-h/(600/512)+fy
        
    ],i=[0,1,2,2,3,0],eps=2/1024
    
    gl.bindBuffer(gl.ARRAY_BUFFER,out.vertBuffer)
    gl.bufferData(gl.ARRAY_BUFFER,Float32Array.from(v),gl.STATIC_DRAW)
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,out.indexBuffer)
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,Uint16Array.from(i),gl.STATIC_DRAW)
    
    out.indexAmount=i.length
    
    v=[
        
        -0.5,-0.5,0+eps,0+eps,
        0.5,-0.5,(128/1024)-eps,0+eps,
        0.5,0.5,(128/1024)-eps,(128/1024)-eps,
        -0.5,0.5,0+eps,(128/1024)-eps
    ]
    
    gl.bindBuffer(gl.ARRAY_BUFFER,out.decal_vertBuffer)
    gl.bufferData(gl.ARRAY_BUFFER,Float32Array.from(v),gl.STATIC_DRAW)
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,out.decal_indexBuffer)
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,Uint16Array.from(i),gl.STATIC_DRAW)
    
    out.decal_indexAmount=i.length
    
    let charUV={
        
        0:[0,0],
        1:[0.1,0],
        2:[0.2,0],
        3:[0.3,0],
        4:[0.4,0],
        5:[0.5,0],
        6:[0.59,0],
        7:[0.7,0],
        8:[0.79,0],
        9:[0.89,0],
        '+':[0.002,0.13],
        '-':[0.002,0.13],
        '⇆':[0.1,0.14],
        ',':[0.2075,0.14],
        '/':[0.3,0.13],
        '.':[0.2075,0.14],
        '-':[0.4,0.13],
        ':':[0.5,0.13],
        a:[0,0.25],
        b:[0.1,0.25],
        c:[0.2,0.25],
        d:[0.3,0.25],
        e:[0.4,0.25],
        f:[0.5,0.25],
        g:[0.6,0.26],
        h:[0.69,0.25],
        i:[0.81,0.25],
        j:[0.9,0.25],
        k:[0.025,0.375],
        l:[0.11,0.375],
        m:[0.2,0.375],
        n:[0.31,0.375],
        o:[0.4,0.375],
        p:[0.5,0.375],
        q:[0.6,0.375],
        r:[0.7,0.375],
        s:[0.8,0.375],
        t:[0.9,0.375],
        u:[0.02,0.5],
        v:[0.108,0.5],
        w:[0.2,0.5],
        x:[0.305,0.5],
        y:[0.4,0.5],
        z:[0.5,0.5],
        A:[0,0.625],
        B:[0.1,0.625],
        C:[0.2,0.625],
        D:[0.3,0.625],
        E:[0.4,0.625],
        F:[0.5,0.625],
        G:[0.6,0.625],
        H:[0.7,0.625],
        I:[0.8,0.625],
        J:[0.9,0.625],
        K:[0.01,0.75],
        L:[0.1,0.75],
        M:[0.2,0.75],
        N:[0.3,0.75],
        O:[0.4,0.75],
        P:[0.5,0.75],
        Q:[0.6,0.75],
        R:[0.7,0.75],
        S:[0.8,0.75],
        T:[0.9,0.75],
        U:[0.02,0.875],
        V:[0.1,0.875],
        W:[0.2,0.875],
        X:[0.3,0.875],
        Y:[0.4,0.875],
        Z:[0.5,0.875],
        ' ':[0.7,0.875],
        
    }
    
    out.add=function(message,pos,color,critType,prefix='+',scale=1,addCommas=true){
    
        let m,s
        
        message=message.toString()
        
        if(addCommas){
            
            if(player.setting_enablePollenAbv){
                
                s=(message.length*0.25+1.5)*scale
                m=prefix+MATH.abvNumber(message)
                
            } else {
                
                m=prefix+MATH.addCommas(message)
                s=(m.length*0.2+1.5)*scale
            }
            
        } else {
            
            m=message.toString()
            s=scale
        }
        
        for(let i=0;i<m.length;i++){
            
            out.data.push({
                
                critType:critType,
                life:1,
                uv:charUV[m[i]],
                pos:pos,
                col:[color[0]*MATH.INV_255,color[1]*MATH.INV_255,color[2]*MATH.INV_255],
                offset:[(i-((m.length-1)*0.5))*0.135,0],
                size:s
            })
        }
        
    }
    
    out.addSingle=function(message,pos,color,scale=1,splitCommas=true,addCommas=true,offx=0,offy=0){
        let m=message
        
        if(splitCommas){
            
            m=message.split('/')
            
            if(m.length>1){
                
                m=MATH.abvNumber(m[0])+'/'+MATH.abvNumber(m[1]),s
            } else {
                
                m=addCommas?MATH.addCommas(m[0]):m[0]
            }
        }
        
        if(scale>0){
            
            s=(m.length*0.2+1.5)*scale
            
        } else {
            
            s=-scale
        }
        
        for(let i=0;i<m.length;i++){
            
            out.instanceData.push(pos[0],pos[1],pos[2],(i-((m.length-1)*0.5))*(!splitCommas?0.135:0.145)+offx,offy,charUV[m[i]][0],charUV[m[i]][1],color[0]*MATH.INV_255,color[1]*MATH.INV_255,color[2]*MATH.INV_255,s,s,0)
            
        }
        
    }
    
    out.ctxData=[]
    
    out.addCTX=function(message,pos,color,scale){
        
        out.ctxData.push({message:message,pos:pos,color:'rgb('+color[0]+','+color[1]+','+color[2]+')',scale:scale})
    }
    
    out.addDecal=function(pos,type,size,rot=0){
        
        out.drawDecals=true
        out.decal_instanceData.push(...pos,0,0,...out.decalUV[type],1,1,1,...size,rot)
    }
    
    out.addDecalRaw=function(){
        
        out.drawDecals=true
        out.decal_instanceData.push(...arguments)
    }
    
    out.render=function(dt,SIN_TIME){
        
        gl.useProgram(textRendererProgram)
        gl.uniformMatrix4fv(glCache.text_viewMatrix,gl.FALSE,player.viewMatrix)
        
        if(out.drawDecals){
            
            gl.bindTexture(gl.TEXTURE_2D,textures.decals)
            
            gl.bindBuffer(gl.ARRAY_BUFFER,out.decal_vertBuffer)
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,out.decal_indexBuffer)
            gl.vertexAttribPointer(glCache.text_vertPos,2,gl.FLOAT,gl.FALSE,16,0)
            gl.vertexAttribPointer(glCache.text_vertUV,2,gl.FLOAT,gl.FALSE,16,8)
            gl.bindBuffer(gl.ARRAY_BUFFER,out.instanceBuffer)
            gl.bufferData(gl.ARRAY_BUFFER,Float32Array.from(out.decal_instanceData),gl.DYNAMIC_DRAW)
            gl.vertexAttribPointer(glCache.text_instanceOrigin,3,gl.FLOAT,gl.FALSE,52,0)
            gl.vertexAttribDivisor(glCache.text_instanceOrigin,1)
            gl.vertexAttribPointer(glCache.text_instanceOffset,2,gl.FLOAT,gl.FALSE,52,12)
            gl.vertexAttribDivisor(glCache.text_instanceOffset,1)
            gl.vertexAttribPointer(glCache.text_instanceUV,2,gl.FLOAT,gl.FALSE,52,20)
            gl.vertexAttribDivisor(glCache.text_instanceUV,1)
            gl.vertexAttribPointer(glCache.text_instanceColor,3,gl.FLOAT,gl.FALSE,52,28)
            gl.vertexAttribDivisor(glCache.text_instanceColor,1)
            gl.vertexAttribPointer(glCache.text_instanceInfo,3,gl.FLOAT,gl.FALSE,52,40)
            gl.vertexAttribDivisor(glCache.text_instanceInfo,1)
            gl.drawElementsInstanced(gl.TRIANGLES,out.decal_indexAmount,gl.UNSIGNED_SHORT,0,out.decal_instanceData.length*MATH.INV_13)
            
            out.decal_instanceData=[]
            out.drawDecals=false
            
        } else {
            
            gl.vertexAttribDivisor(glCache.text_instanceOrigin,1)
            gl.vertexAttribDivisor(glCache.text_instanceOffset,1)
            gl.vertexAttribDivisor(glCache.text_instanceUV,1)
            gl.vertexAttribDivisor(glCache.text_instanceColor,1)
            gl.vertexAttribDivisor(glCache.text_instanceInfo,1)
        }
        
        let t=SIN_TIME*0.5+0.5,_t=t
        
        for(let i=out.data.length;i--;){
            
            let d=out.data[i],s=d.size*Math.min(d.life*7,1)
            
            d.life-=dt
            
            if(d.critType===1){
                
                out.instanceData.push(d.pos[0],d.pos[1],d.pos[2],d.offset[0],d.offset[1],d.uv[0],d.uv[1],d.col[0]*t,MATH.lerp(1,d.col[1],t),d.col[2]*t,s,s,SIN_TIME*0.4)
                
            } else if(d.critType===2){
                
                out.instanceData.push(d.pos[0],d.pos[1],d.pos[2],d.offset[0],d.offset[1],d.uv[0],d.uv[1],MATH.lerp(0.7,d.col[0],_t),d.col[1]*_t,MATH.lerp(0.7,d.col[2],_t),s,s,SIN_TIME*0.4)
                
            } else {
                
                out.instanceData.push(d.pos[0],d.pos[1],d.pos[2],d.offset[0],d.offset[1],d.uv[0],d.uv[1],d.col[0],d.col[1],d.col[2],s,s,0)
            }
            
            if(d.life<=0){
                
                out.data.splice(i,1)
            }
        }
        
        gl.bindTexture(gl.TEXTURE_2D,textures.text)
        gl.bindBuffer(gl.ARRAY_BUFFER,out.vertBuffer)
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,out.indexBuffer)
        gl.vertexAttribPointer(glCache.text_vertPos,2,gl.FLOAT,gl.FALSE,16,0)
        gl.vertexAttribPointer(glCache.text_vertUV,2,gl.FLOAT,gl.FALSE,16,8)
        gl.bindBuffer(gl.ARRAY_BUFFER,out.instanceBuffer)
        gl.bufferData(gl.ARRAY_BUFFER,Float32Array.from(out.instanceData),gl.DYNAMIC_DRAW)
        gl.vertexAttribPointer(glCache.text_instanceOrigin,3,gl.FLOAT,gl.FALSE,52,0)
        gl.vertexAttribPointer(glCache.text_instanceOffset,2,gl.FLOAT,gl.FALSE,52,12)
        gl.vertexAttribPointer(glCache.text_instanceUV,2,gl.FLOAT,gl.FALSE,52,20)
        gl.vertexAttribPointer(glCache.text_instanceColor,3,gl.FLOAT,gl.FALSE,52,28)
        gl.vertexAttribPointer(glCache.text_instanceInfo,3,gl.FLOAT,gl.FALSE,52,40)
        gl.drawElementsInstanced(gl.TRIANGLES,out.indexAmount,gl.UNSIGNED_SHORT,0,out.instanceData.length*MATH.INV_13)
        
        gl.vertexAttribDivisor(glCache.text_instanceOrigin,0)
        gl.vertexAttribDivisor(glCache.text_instanceOffset,0)
        gl.vertexAttribDivisor(glCache.text_instanceUV,0)
        gl.vertexAttribDivisor(glCache.text_instanceColor,0)
        gl.vertexAttribDivisor(glCache.text_instanceInfo,0)
        
        out.instanceData=[]
    }
    
    out.draw=function(){
        
        if(!out.ctxData.length){return}
        
        ctx.strokeStyle='rgb(0,0,0)'
        ctx.fillStyle='rgb(255,255,255)'
        ctx.lineWidth=4
        
        for(let i=out.ctxData.length;i--;){
            
            let t=out.ctxData[i]
            
            let p=vec4.transformMat4([],[...t.pos,1],player.viewMatrix)
            
            p[0]/=p[3]
            p[1]/=p[3]
            
            if(p[2]>0){
                
                ctx.lineWidth=t.scale*0.2/p[2]
                ctx.font=(t.scale/p[2])+'px arial'
                ctx.strokeText(t.message,p[0]*half_width+half_width,height-(p[1]*half_height+half_height))
                ctx.fillText(t.message,p[0]*half_width+half_width,height-(p[1]*half_height+half_height))
            }
        }
        
        out.ctxData=[]
    }
    
    
    return out
    
})({})

let ParticleRenderer=(function(out){
    
    out.particles=[]
    out.vertBuffer=gl.createBuffer()
    out.verts=[]
    
    out.add=function(params){
        
        params.rot=params.rot!==undefined?params.rot:Math.random()*MATH.TWO_PI
        params.lifespan=params.life
        out.particles.push(params)
    }
    
    out.render=function(){
        
        if(!out.particles.length) return
        
        out.verts=[]
        
        for(let i=out.particles.length;i--;){
            
            let d=out.particles[i]
            d.vy+=d.grav*dt
            d.x+=d.vx*dt
            d.y+=d.vy*dt
            d.z+=d.vz*dt
            d.rot+=d.rotVel*dt
            d.life-=dt
            d.col[3]=d.life*d.alpha/d.lifespan
            
            
            out.verts.push(d.x,d.y,d.z,d.col[0],d.col[1],d.col[2],d.col[3],d.size,d.rot)
            
            if(d.life<=0){
                
                out.particles.splice(i,1)
            }
        }
        
        gl.useProgram(particleRendererProgram)
        gl.uniformMatrix4fv(glCache.particle_viewMatrix,gl.FALSE,player.viewMatrix)
    
        gl.bindBuffer(gl.ARRAY_BUFFER,out.vertBuffer)
        gl.bufferData(gl.ARRAY_BUFFER,Float32Array.from(out.verts),gl.DYNAMIC_DRAW)
        gl.vertexAttribPointer(glCache.particle_vertPos,3,gl.FLOAT,gl.FALSE,36,0)
        gl.vertexAttribPointer(glCache.particle_vertColor,4,gl.FLOAT,gl.FALSE,36,12)
        gl.vertexAttribPointer(glCache.particle_vertSize,1,gl.FLOAT,gl.FALSE,36,28)
        gl.vertexAttribPointer(glCache.particle_vertRot,1,gl.FLOAT,gl.FALSE,36,32)
        gl.drawArrays(gl.POINTS,0,out.verts.length/9)
        
    }
    
    return out
    
})({})

let TrailRenderer=(function(out){
    
    out.trails=[]
    out.constantTrails=[]
    
    out.constantTrailVertBuffer=gl.createBuffer()
    out.constantTrailIndexBuffer=gl.createBuffer()
    
    out.regenerateConstantTrails=function(){
        
        let _verts=[],_index=[],l=0
        
        for(let i in out.constantTrails){
            
            out.constantTrails[i].meshOffsetIndex=l*2*7
            l+=out.constantTrails[i].length
            
            let vl=(_verts.length/7)
            _verts.push(...out.constantTrails[i].verts)
            _index.push(...out.constantTrails[i].index.map(x=>x+=vl))
        }
        
        out.constantTrailVerts=new Float32Array(_verts)
        out.constantTrailIndex=new Uint16Array(_index)
        
        gl.bindBuffer(gl.ARRAY_BUFFER,out.constantTrailVertBuffer)
        gl.bufferData(gl.ARRAY_BUFFER,out.constantTrailVerts,gl.DYNAMIC_DRAW)
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,out.constantTrailIndexBuffer)
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,out.constantTrailIndex,gl.STATIC_DRAW)
    }
    
    out.Trail=function(params){
        
        out.trails.push(this)
        this.length=params.length
        this.size=params.size
        this.pos=[]
        this.color=params.color
        this.fadeTo=params.fadeTo
        this.triangle=params.triangle
        this.vertical=params.vertical
        this.skipFrame=params.skipFrame||1
        this.skipAdd=params.skipAdd||1
        
        for(let i=0;i<this.length;i++){
            
            this.pos.push([])
        }
        
        this.vertBuffer=gl.createBuffer()
        this.indexBuffer=gl.createBuffer()
        this.verts=new Float32Array(this.length*2*7)
        this.index=new Uint16Array((this.length-1)*12)
        
        for(let i=0,j=0;i<(this.length-1)*12;i+=12,j+=2){
            
            this.index[i]=0+j
            this.index[i+1]=1+j
            this.index[i+2]=2+j
            this.index[i+3]=2+j
            this.index[i+4]=3+j
            this.index[i+5]=1+j
            this.index[i+6]=2+j
            this.index[i+7]=1+j
            this.index[i+8]=0+j
            this.index[i+9]=1+j
            this.index[i+10]=3+j
            this.index[i+11]=2+j
            
        }
        
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,this.indexBuffer)
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,this.index,gl.STATIC_DRAW)
        
        this.addPos=function(pos){
            
            if(frameCount%this.skipAdd===0){
                
                this.pos.push(pos)
                if(this.pos.length>=this.length) this.pos.shift()
                this.recomputeMeshThisFrame=true
            }
        }
        
        let cacheArr=[]
        
        this.render=function(){
            
            if(this.recomputeMeshThisFrame&&frameCount%this.skipFrame===0){
                
                if(this.vertical){
                    
                    for(let i=0;i<this.pos.length;i++){
                        
                        let x1,y1,z1,x2,y2,z2,t=(i/this.length),size=this.triangle?this.size*t:this.size,r1,g1,b1,a1,r2,g2,b2,a2
                        
                        if(this.fadeTo){
                            
                            r1=MATH.lerp(this.fadeTo[0],this.color[0],t)
                            g1=MATH.lerp(this.fadeTo[1],this.color[1],t)
                            b1=MATH.lerp(this.fadeTo[2],this.color[2],t)
                            a1=MATH.lerp(this.fadeTo[3],this.color[3],t)
                            r2=r1
                            g2=g1
                            b2=b1
                            a2=a1
                            
                        } else {
                            
                            r1=this.color[0]
                            g1=this.color[1]
                            b1=this.color[2]
                            a1=this.color[3]
                            r2=r1
                            g2=g1
                            b2=b1
                            a2=a1
                        }
                        
                        this.verts[i*14]=this.pos[i][0]
                        this.verts[i*14+1]=this.pos[i][1]+size
                        this.verts[i*14+2]=this.pos[i][2]
                        this.verts[i*14+3]=r1
                        this.verts[i*14+4]=g1
                        this.verts[i*14+5]=b1
                        this.verts[i*14+6]=a1
                        
                        this.verts[i*14+7]=this.pos[i][0]
                        this.verts[i*14+8]=this.pos[i][1]-size
                        this.verts[i*14+9]=this.pos[i][2]
                        this.verts[i*14+10]=r2
                        this.verts[i*14+11]=g2
                        this.verts[i*14+12]=b2
                        this.verts[i*14+13]=a2
                        
                    }
                    
                } else {
                    
                    for(let i=0;i<this.pos.length;i++){
                    
                    let x1,y1,z1,x2,y2,z2,t=(i/this.length),size=this.triangle?this.size*t:this.size,r1,g1,b1,a1,r2,g2,b2,a2
                    
                    if(this.fadeTo){
                        
                        r1=MATH.lerp(this.fadeTo[0],this.color[0],t)
                        g1=MATH.lerp(this.fadeTo[1],this.color[1],t)
                        b1=MATH.lerp(this.fadeTo[2],this.color[2],t)
                        a1=MATH.lerp(this.fadeTo[3],this.color[3],t)
                        r2=r1
                        g2=g1
                        b2=b1
                        a2=a1
                        
                    } else {
                        
                        r1=this.color[0]
                        g1=this.color[1]
                        b1=this.color[2]
                        a1=this.color[3]
                        r2=r1
                        g2=g1
                        b2=b1
                        a2=a1
                    }
                    
                    if(i===0){
                        
                        let dir=vec3.sub([],this.pos[i+1],this.pos[i])
                        dir=[dir[2],0,-dir[0]]
                        vec3.normalize(dir,dir)
                        vec3.scale(dir,dir,size)
                        
                        x1=dir[0]+this.pos[i][0]
                        y1=dir[1]+this.pos[i][1]
                        z1=dir[2]+this.pos[i][2]
                        x2=-dir[0]+this.pos[i][0]
                        y2=-dir[1]+this.pos[i][1]
                        z2=-dir[2]+this.pos[i][2]
                        
                    } else if(i===this.pos.length-1){
                        
                        let dir=vec3.sub([],this.pos[i],this.pos[i-1])
                        dir=[dir[2],0,-dir[0]]
                        vec3.normalize(dir,dir)
                        vec3.scale(dir,dir,size)
                        
                        x1=dir[0]+this.pos[i][0]
                        y1=dir[1]+this.pos[i][1]
                        z1=dir[2]+this.pos[i][2]
                        x2=-dir[0]+this.pos[i][0]
                        y2=-dir[1]+this.pos[i][1]
                        z2=-dir[2]+this.pos[i][2]
                        
                    } else {
                        
                        let dir1=vec3.sub([],this.pos[i],this.pos[i-1])
                        let dir2=vec3.sub([],this.pos[i+1],this.pos[i])
                        vec3.normalize(dir1,dir1)
                        vec3.normalize(dir2,dir2)
                        
                        vec3.add(dir1,dir1,dir2)
                        
                        dir1=[dir1[2],0,-dir1[0]]
                        vec3.normalize(dir1,dir1)
                        vec3.scale(dir1,dir1,size)
                        
                        x1=dir1[0]+this.pos[i][0]
                        y1=dir1[1]+this.pos[i][1]
                        z1=dir1[2]+this.pos[i][2]
                        x2=-dir1[0]+this.pos[i][0]
                        y2=-dir1[1]+this.pos[i][1]
                        z2=-dir1[2]+this.pos[i][2]
                    }
                    
                    this.verts[i*14]=x1
                    this.verts[i*14+1]=y1
                    this.verts[i*14+2]=z1
                    this.verts[i*14+3]=r1
                    this.verts[i*14+4]=g1
                    this.verts[i*14+5]=b1
                    this.verts[i*14+6]=a1
                    
                    this.verts[i*14+7]=x2
                    this.verts[i*14+8]=y2
                    this.verts[i*14+9]=z2
                    this.verts[i*14+10]=r2
                    this.verts[i*14+11]=g2
                    this.verts[i*14+12]=b2
                    this.verts[i*14+13]=a2
                    
                }
                }
            }
            
            this.recomputeMeshThisFrame=false
            
            gl.bindBuffer(gl.ARRAY_BUFFER,this.vertBuffer)
            gl.bufferData(gl.ARRAY_BUFFER,this.verts,gl.DYNAMIC_DRAW)
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,this.indexBuffer)
            gl.vertexAttribPointer(glCache.trail_vertPos,3,gl.FLOAT,gl.FALSE,28,0)
            gl.vertexAttribPointer(glCache.trail_vertColor,4,gl.FLOAT,gl.FALSE,28,12)
            gl.drawElements(gl.TRIANGLES,this.index.length,gl.UNSIGNED_SHORT,0)
            
        }
        
    }
    
    out.ConstantTrail=function(params){
        
        this.length=params.length
        this.size=params.size
        this.pos=[]
        this.color=params.color
        this.fadeTo=params.fadeTo
        this.triangle=params.triangle
        this.vertical=params.vertical
        this.skipFrame=params.skipFrame||1
        this.skipAdd=params.skipAdd||1
        
        this.verts=new Float32Array(this.length*2*7)
        this.index=[]
        
        for(let i=0;i<this.length;i++){
            
            this.pos.push([])
        }
        
        for(let i=0,j=0;i<(this.length-1)*12;i+=12,j+=2){
            
            this.index[i]=0+j
            this.index[i+1]=1+j
            this.index[i+2]=2+j
            this.index[i+3]=2+j
            this.index[i+4]=3+j
            this.index[i+5]=1+j
            this.index[i+6]=2+j
            this.index[i+7]=1+j
            this.index[i+8]=0+j
            this.index[i+9]=1+j
            this.index[i+10]=3+j
            this.index[i+11]=2+j
        }
        
        this.addPos=function(pos){
            
            if(frameCount%this.skipAdd===0){
                
                this.pos.push(pos)
                if(this.pos.length>=this.length) this.pos.shift()
                this.recomputeMeshThisFrame=true
            }
        }
        
        let cacheArr=[]
        
        this.render=function(){
            
            if(this.recomputeMeshThisFrame&&frameCount%this.skipFrame===0){
                
                if(this.vertical){
                    
                    for(let i=0;i<this.pos.length;i++){
                        
                        let x1,y1,z1,x2,y2,z2,t=(i/this.length),size=this.triangle?this.size*t:this.size,r1,g1,b1,a1,r2,g2,b2,a2
                        
                        if(this.fadeTo){
                            
                            r1=MATH.lerp(this.fadeTo[0],this.color[0],t)
                            g1=MATH.lerp(this.fadeTo[1],this.color[1],t)
                            b1=MATH.lerp(this.fadeTo[2],this.color[2],t)
                            a1=MATH.lerp(this.fadeTo[3],this.color[3],t)
                            r2=r1
                            g2=g1
                            b2=b1
                            a2=a1
                            
                        } else {
                            
                            r1=this.color[0]
                            g1=this.color[1]
                            b1=this.color[2]
                            a1=this.color[3]
                            r2=r1
                            g2=g1
                            b2=b1
                            a2=a1
                        }
                        
                        out.constantTrailVerts[i*14+this.meshOffsetIndex]=this.pos[i][0]
                        out.constantTrailVerts[i*14+1+this.meshOffsetIndex]=this.pos[i][1]+size
                        out.constantTrailVerts[i*14+2+this.meshOffsetIndex]=this.pos[i][2]
                        out.constantTrailVerts[i*14+3+this.meshOffsetIndex]=r1
                        out.constantTrailVerts[i*14+4+this.meshOffsetIndex]=g1
                        out.constantTrailVerts[i*14+5+this.meshOffsetIndex]=b1
                        out.constantTrailVerts[i*14+6+this.meshOffsetIndex]=a1
                        
                        out.constantTrailVerts[i*14+7+this.meshOffsetIndex]=this.pos[i][0]
                        out.constantTrailVerts[i*14+8+this.meshOffsetIndex]=this.pos[i][1]-size
                        out.constantTrailVerts[i*14+9+this.meshOffsetIndex]=this.pos[i][2]
                        out.constantTrailVerts[i*14+10+this.meshOffsetIndex]=r2
                        out.constantTrailVerts[i*14+11+this.meshOffsetIndex]=g2
                        out.constantTrailVerts[i*14+12+this.meshOffsetIndex]=b2
                        out.constantTrailVerts[i*14+13+this.meshOffsetIndex]=a2
                        
                    }
                    
                } else {
                    
                    for(let i=0;i<this.pos.length;i++){
                    
                    let x1,y1,z1,x2,y2,z2,t=(i/this.length),size=this.triangle?this.size*t:this.size,r1,g1,b1,a1,r2,g2,b2,a2
                    
                    if(this.fadeTo){
                        
                        r1=MATH.lerp(this.fadeTo[0],this.color[0],t)
                        g1=MATH.lerp(this.fadeTo[1],this.color[1],t)
                        b1=MATH.lerp(this.fadeTo[2],this.color[2],t)
                        a1=MATH.lerp(this.fadeTo[3],this.color[3],t)
                        r2=r1
                        g2=g1
                        b2=b1
                        a2=a1
                        
                    } else {
                        
                        r1=this.color[0]
                        g1=this.color[1]
                        b1=this.color[2]
                        a1=this.color[3]
                        r2=r1
                        g2=g1
                        b2=b1
                        a2=a1
                    }
                    
                    if(i===0){
                        
                        let dir=vec3.sub([],this.pos[i+1],this.pos[i])
                        dir=[dir[2],0,-dir[0]]
                        vec3.normalize(dir,dir)
                        vec3.scale(dir,dir,size)
                        
                        x1=dir[0]+this.pos[i][0]
                        y1=dir[1]+this.pos[i][1]
                        z1=dir[2]+this.pos[i][2]
                        x2=-dir[0]+this.pos[i][0]
                        y2=-dir[1]+this.pos[i][1]
                        z2=-dir[2]+this.pos[i][2]
                        
                    } else if(i===this.pos.length-1){
                        
                        let dir=vec3.sub([],this.pos[i],this.pos[i-1])
                        dir=[dir[2],0,-dir[0]]
                        vec3.normalize(dir,dir)
                        vec3.scale(dir,dir,size)
                        
                        x1=dir[0]+this.pos[i][0]
                        y1=dir[1]+this.pos[i][1]
                        z1=dir[2]+this.pos[i][2]
                        x2=-dir[0]+this.pos[i][0]
                        y2=-dir[1]+this.pos[i][1]
                        z2=-dir[2]+this.pos[i][2]
                        
                    } else {
                        
                        let dir1=vec3.sub([],this.pos[i],this.pos[i-1])
                        let dir2=vec3.sub([],this.pos[i+1],this.pos[i])
                        vec3.normalize(dir1,dir1)
                        vec3.normalize(dir2,dir2)
                        
                        vec3.add(dir1,dir1,dir2)
                        
                        dir1=[dir1[2],0,-dir1[0]]
                        vec3.normalize(dir1,dir1)
                        vec3.scale(dir1,dir1,size)
                        
                        x1=dir1[0]+this.pos[i][0]
                        y1=dir1[1]+this.pos[i][1]
                        z1=dir1[2]+this.pos[i][2]
                        x2=-dir1[0]+this.pos[i][0]
                        y2=-dir1[1]+this.pos[i][1]
                        z2=-dir1[2]+this.pos[i][2]
                    }
                    
                    out.constantTrailVerts[i*14+this.meshOffsetIndex]=x1
                    out.constantTrailVerts[i*14+1+this.meshOffsetIndex]=y1
                    out.constantTrailVerts[i*14+2+this.meshOffsetIndex]=z1
                    out.constantTrailVerts[i*14+3+this.meshOffsetIndex]=r1
                    out.constantTrailVerts[i*14+4+this.meshOffsetIndex]=g1
                    out.constantTrailVerts[i*14+5+this.meshOffsetIndex]=b1
                    out.constantTrailVerts[i*14+6+this.meshOffsetIndex]=a1
                    
                    out.constantTrailVerts[i*14+7+this.meshOffsetIndex]=x2
                    out.constantTrailVerts[i*14+8+this.meshOffsetIndex]=y2
                    out.constantTrailVerts[i*14+9+this.meshOffsetIndex]=z2
                    out.constantTrailVerts[i*14+10+this.meshOffsetIndex]=r2
                    out.constantTrailVerts[i*14+11+this.meshOffsetIndex]=g2
                    out.constantTrailVerts[i*14+12+this.meshOffsetIndex]=b2
                    out.constantTrailVerts[i*14+13+this.meshOffsetIndex]=a2
                    
                }
                }
            }
            
            this.recomputeMeshThisFrame=false
        }
        
        out.constantTrails.push(this)
        out.regenerateConstantTrails()
        
        return this
    }
    
    let T1=new out.ConstantTrail({length:15,size:0.2,triangle:true,color:[1,1,1,1]})
    let T2=new out.ConstantTrail({length:15,size:0.2,triangle:true,color:[1,1,1,1]})
    let T3=new out.ConstantTrail({length:12,size:0.1,triangle:true,color:[1,0,0,1]})
    let T4=new out.ConstantTrail({length:12,size:0.1,triangle:true,color:[0,0,1,1]})
    
    out.render=function(){
        
        if(player.currentGear.leftGuard==='crimsonGuard'){
            
            T1.addPos([player.body.position.x+player.bodyDir[2]*0.65,player.body.position.y,player.body.position.z-player.bodyDir[0]*0.65])
            
            T3.addPos([player.body.position.x+player.bodyDir[2]*0.6,player.body.position.y+0.175,player.body.position.z-player.bodyDir[0]*0.6])
        }
        
        if(player.currentGear.rightGuard==='cobaltGuard'){
            
            T2.addPos([player.body.position.x-player.bodyDir[2]*0.65,player.body.position.y,player.body.position.z+player.bodyDir[0]*0.65])
            
            T4.addPos([player.body.position.x-player.bodyDir[2]*0.6,player.body.position.y+0.175,player.body.position.z+player.bodyDir[0]*0.6])
            
        }
        
        gl.useProgram(trailRendererProgram)
        gl.uniformMatrix4fv(glCache.trail_viewMatrix,gl.FALSE,player.viewMatrix)
        
        for(let i in out.trails){
            
            out.trails[i].render()
            
            if(out.trails[i].splice){
                
                out.trails.splice(i,1)
            }
        }
        
        for(let i in out.constantTrails){
            
            out.constantTrails[i].render()
            
            if(out.constantTrails[i].splice){
                
                out.constantTrails.splice(i,1)
                out.regenerateConstantTrails()
            }
        }
        
        gl.bindBuffer(gl.ARRAY_BUFFER,out.constantTrailVertBuffer)
        gl.bufferData(gl.ARRAY_BUFFER,out.constantTrailVerts,gl.DYNAMIC_DRAW)
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,out.constantTrailIndexBuffer)
        gl.vertexAttribPointer(glCache.trail_vertPos,3,gl.FLOAT,gl.FALSE,28,0)
        gl.vertexAttribPointer(glCache.trail_vertColor,4,gl.FLOAT,gl.FALSE,28,12)
        gl.drawElements(gl.TRIANGLES,out.constantTrailIndex.length,gl.UNSIGNED_SHORT,0)
        
    }
    
    return out
    
})({})

let fieldInfo={}

class Token {
    
    constructor(life,pos,type,funcParams,backupFunc){
        
        this.funcParams=funcParams
        this.backupFunc=backupFunc?effects[type].backupFunc:null
        this.life=life*player.tokenLifespan*1.5
        this.pos=pos
        this.type=type
        this.rotation=Math.random()*MATH.TWO_PI
        this.func=effects[type].svg?false:effects[type].func
        this.canBeLinked=effects[type].canBeLinked===undefined||effects[type].canBeLinked
    }
    
    die(index){
        
        objects.tokens.splice(index,1)
    }
    
    collect(){
        
        if(!this.collected){
            
            this.collected=true
            this.life=0.75
            player.stats.abilityTokens++
            
            if(effects[this.type].statsToAddTo){
                
                for(let i in effects[this.type].statsToAddTo){
                    
                    player.stats[effects[this.type].statsToAddTo[i]]++
                }
            }
            
            if(this.func){
                
                if(this.backupFunc){
                    
                    this.bee=this.funcParams.bee
                    this.backupFunc(this)
                    
                } else {
                    
                    this.func(this.funcParams)
                }
                
            } else {
                
                player.addEffect(this.type)
            }
            
            if(effects[this.type].sound){
                
                effects[this.type].sound()
            }
        }
    }
    
    update(){
        
        this.life-=dt
        
        if(this.collected){
            
            this.pos[1]+=(this.pos[1]+5-this.pos[1])*dt
            this.rotation+=dt*20
            
            meshes.tokens.instanceData.push(this.pos[0],this.pos[1],this.pos[2],this.rotation,effects[this.type].u,effects[this.type].v,this.life*5,1)
            
        } else {
            
            this.rotation+=dt*2.6
            
            meshes.tokens.instanceData.push(this.pos[0],this.pos[1],this.pos[2],this.rotation,effects[this.type].u,effects[this.type].v,this.life*0.3,1)
            
            if(Math.abs(this.pos[0]-player.body.position.x)+Math.abs(this.pos[1]-player.body.position.y)+Math.abs(this.pos[2]-player.body.position.z)<1.75){
                
                this.collect()
            }
        }
        
        return this.life<=0
    }
}

class LootToken {
    
    constructor(life,pos,type,amount,canBeLinked=false,source){
        
        this.life=life
        this.pos=pos
        this.type=type
        this.amount=Math.abs(amount)
        this.rotation=Math.random()*MATH.TWO_PI
        this.canBeLinked=canBeLinked
        this.from=source
        
        if(this.type==='honey'){
            
            this.u=128*3/2048
            this.v=128*4/2048
            
        } else {
            
            this.u=items[this.type].u
            this.v=items[this.type].v
        }
    }
    
    die(index){
        
        objects.tokens.splice(index,1)
    }
    
    collect(){
        
        if(!this.collected){
            
            this.collected=true
            this.life=0.75
            
            if(this.type==='honey'){
                
                this.amount=Math.round(player.honeyFromTokens*this.amount)
                player.honey+=this.amount
                if(player.setting_enablePollenText)
                    textRenderer.add(this.amount+'',[player.body.position.x,player.body.position.y+2,player.body.position.z],COLORS.honey,0,'+')
                player.addMessage('+'+MATH.addCommas(this.amount+'')+' Honey'+(this.from?' (from '+this.from+')':''))
                player.stats.honeyTokens++
                
            } else {
                
                player.addItem(this.type,this.amount)
                player.addMessage('+'+MATH.addCommas(this.amount+'')+' '+(this.amount>1?MATH.doPlural(MATH.doGrammar(this.type)):MATH.doGrammar(this.type)+(this.from?' (from '+this.from+')':'')))
            }
        }
    }
    
    update(){
        
        this.life-=dt+dt
        
        if(this.collected){
            
            this.pos[1]+=(this.pos[1]+5-this.pos[1])*dt
            this.rotation+=dt*20
            
            meshes.tokens.instanceData.push(this.pos[0],this.pos[1],this.pos[2],this.rotation,this.u,this.v,this.life*5,1)
            
        } else {
            
            this.rotation+=dt*2.6
            
            meshes.tokens.instanceData.push(this.pos[0],this.pos[1],this.pos[2],this.rotation,this.u,this.v,this.life*0.3,1)
            
            if(Math.abs(this.pos[0]-player.body.position.x)+Math.abs(this.pos[1]-player.body.position.y)+Math.abs(this.pos[2]-player.body.position.z)<1.75){
                
                this.collect()
            }
        }
        
        return this.life<=0
    }
}

meshes.token={}
meshes.token.vertBuffer=gl.createBuffer()
meshes.token.indexBuffer=gl.createBuffer()
let verts=[],index=[]

let s=25,r=0.5
for(let i=0,inc=MATH.TWO_PI/s;i<MATH.TWO_PI;i+=inc){
    
    let s=Math.sin(i),c=Math.cos(i),texSize=128/2048
    
    verts.push(s*r,c*r,0.05,(s*0.495+0.5)*texSize,(-c*0.495+0.5)*texSize,
                s*r,c*r,-0.05,(s*0.495+0.5)*texSize,(-c*0.495+0.5)*texSize)
    
}

let vl=verts.length/5

for(let i=0;i<s*2;i+=2){
    
    index.push((i+2)%vl,(i+1)%vl,i%vl,(i+1)%vl,(i+2)%vl,(i+3)%vl)
}

for(let i=1;i<s-1;i++){
    
    index.push((i+1)*2,i*2,0)
    index.push(1,i*2+1,(i+1)*2+1)
}


gl.bindBuffer(gl.ARRAY_BUFFER,meshes.token.vertBuffer)
gl.bufferData(gl.ARRAY_BUFFER,Float32Array.from(verts),gl.STATIC_DRAW)
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,meshes.token.indexBuffer)
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,Uint16Array.from(index),gl.STATIC_DRAW)

meshes.token.indexAmount=index.length

function b(x,y,z,w,h,l,r,g,b,rx,ry,rz,sx,sy,sz){
    
    let v=[
        
        [-0.5*w,0.5*h,-0.5*l],
        [-0.5*w,0.5*h,0.5*l],
        [0.5*w,0.5*h,0.5*l],
        [0.5*w,0.5*h,-0.5*l],
        [-0.5*w,-0.5*h,-0.5*l],
        [-0.5*w,-0.5*h,0.5*l],
        [0.5*w,-0.5*h,0.5*l],
        [0.5*w,-0.5*h,-0.5*l]
    ],s1=1,s2=0.95,s3=0.9,s4=0.85,s5=0.92,s6=0.87
    
    let q
    
    if(rx){q=quat.fromEuler([],rx,ry,rz)}
    
    for(let i in v){
        
        if(rx){
            
            vec3.transformQuat(v[i],v[i],q)
        }
        
        if(sx){
            
            vec3.mul(v[i],v[i],[sx,sy,sz])
        }
        
        vec3.add(v[i],v[i],[x,y,z])
    }
    
    vl=verts.length/6
    
    verts.push(
        
        v[0][0],v[0][1],v[0][2],r*s1,g*s1,b*s1,
        v[1][0],v[1][1],v[1][2],r*s1,g*s1,b*s1,
        v[2][0],v[2][1],v[2][2],r*s1,g*s1,b*s1,
        v[3][0],v[3][1],v[3][2],r*s1,g*s1,b*s1,
        
        v[1][0],v[1][1],v[1][2],r*s2,g*s2,b*s2,
        v[2][0],v[2][1],v[2][2],r*s2,g*s2,b*s2,
        v[5][0],v[5][1],v[5][2],r*s2,g*s2,b*s2,
        v[6][0],v[6][1],v[6][2],r*s2,g*s2,b*s2,
        
        v[0][0],v[0][1],v[0][2],r*s3,g*s3,b*s3,
        v[3][0],v[3][1],v[3][2],r*s3,g*s3,b*s3,
        v[4][0],v[4][1],v[4][2],r*s3,g*s3,b*s3,
        v[7][0],v[7][1],v[7][2],r*s3,g*s3,b*s3,
        
        v[2][0],v[2][1],v[2][2],r*s4,g*s4,b*s4,
        v[3][0],v[3][1],v[3][2],r*s4,g*s4,b*s4,
        v[6][0],v[6][1],v[6][2],r*s4,g*s4,b*s4,
        v[7][0],v[7][1],v[7][2],r*s4,g*s4,b*s4,
        
        v[0][0],v[0][1],v[0][2],r*s5,g*s5,b*s5,
        v[1][0],v[1][1],v[1][2],r*s5,g*s5,b*s5,
        v[4][0],v[4][1],v[4][2],r*s5,g*s5,b*s5,
        v[5][0],v[5][1],v[5][2],r*s5,g*s5,b*s5,
        
        v[4][0],v[4][1],v[4][2],r*s6,g*s6,b*s6,
        v[5][0],v[5][1],v[5][2],r*s6,g*s6,b*s6,
        v[6][0],v[6][1],v[6][2],r*s6,g*s6,b*s6,
        v[7][0],v[7][1],v[7][2],r*s6,g*s6,b*s6,
    )
    
    index.push(
        
        0+vl,1+vl,2+vl,
        0+vl,2+vl,3+vl,
        5+vl,6+vl,7+vl,
        6+vl,5+vl,4+vl,
        8+vl,9+vl,10+vl,
        11+vl,10+vl,9+vl,
        14+vl,13+vl,12+vl,
        13+vl,14+vl,15+vl,
        18+vl,17+vl,16+vl,
        17+vl,18+vl,19+vl,
        22+vl,21+vl,20+vl,
        23+vl,22+vl,20+vl,
        
        24+vl,25+vl,26+vl,
        26+vl,25+vl,24+vl,
        24+vl,26+vl,27+vl,
        27+vl,26+vl,24+vl
    )
}

function star(innerRad,outerRad,thickness,depth,r,g,b,la=0.75,lb=0.25,x=0,y=0,z=0){
    
    innerRad*=0.8
    let _verts=[],_index=[],pos=[],vs=[],ix=[],j=0
    
    for(let i=0;i<MATH.TWO_PI;i+=MATH.TWO_PI/10){
        
        let r=(j++)%2===0?outerRad:innerRad
        
        pos.push([Math.sin(i)*r,Math.cos(i)*r,-thickness])
    }
    
    j=0
    
    for(let i=0;i<MATH.TWO_PI;i+=MATH.TWO_PI/10){
        
        let r=(j++)%2===0?outerRad:innerRad
        
        pos.push([Math.sin(i)*r,Math.cos(i)*r,thickness])
    }
    
    pos.push([0,0,-depth],[0,0,depth])
    
    vs.push(0,1,20,1,2,20,2,3,20,3,4,20,4,5,20,5,6,20,6,7,20,7,8,20,8,9,20,9,0,20,11,10,21,12,11,21,13,12,21,14,13,21,15,14,21,16,15,21,17,16,21,18,17,21,19,18,21,10,19,21,9,10,0)
    
    ix.push(2,1,0,5,4,3,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62)
    
    for(let i=0;i<10;i++){
        
        vs.push(0+i,10+i,1+i,11+i,1+i,10+i)
        ix.push(i*6,i*6+1,i*6+2,i*6+3,i*6+4,i*6+5)
    }
    
    for(let i=63;i<ix.length;i++){
        
        ix[i]+=63
    }
    
    for(let i in vs){
        
        vs[i]=[pos[vs[i]][0]+x,pos[vs[i]][1]+y,pos[vs[i]][2]+z]
    }
    
    _index=ix
    
    let findNorm=(a,b,c)=>{
        
        a=vs[a]
        b=vs[b]
        c=vs[c]
        
        let n=vec3.cross([],[a[0]-b[0],a[1]-b[1],a[2]-b[2]],[a[0]-c[0],a[1]-c[1],a[2]-c[2]])
        
        return vec3.normalize(n,n)
    }
    
    for(let i=0;i<_index.length;i+=3){
        
        let i1=_index[i],i2=_index[i+1],i3=_index[i+2],shade=vec3.dot([0.035,0.175,0.053],findNorm(i1,i2,i3))*la+lb
        
        verts.push(...vs[i1],r*shade,g*shade,b*shade,...vs[i2],r*shade,g*shade,b*shade,...vs[i3],r*shade,g*shade,b*shade)
    }
    
    index.push(..._index)
}

function c(x,y,z,rad,hei,sides,r,g,b,rx,ry,rz,r2,bottom=true,top=true,shading=true){
    
    let rad2=r2??rad,vl=verts.length/6,_verts=[],_index=[]
    
    if(shading){
        
        for(let t=0,inc=MATH.TWO_PI/sides;t<=MATH.TWO_PI;t+=inc){
            
            let t1=t-inc*0.5,t2=t+inc*0.5
            _verts.push(
                Math.cos(t1)*rad,Math.sin(t1)*rad,hei*0.5,r*(Math.cos(t1)*0.1+0.9),g*(Math.cos(t1)*0.1+0.9),b*(Math.cos(t1)*0.1+0.9),
                Math.cos(t1)*rad2,Math.sin(t1)*rad2,-hei*0.5,r*(Math.cos(t1)*0.1+0.9),g*(Math.cos(t1)*0.1+0.9),b*(Math.cos(t1)*0.1+0.9),
                Math.cos(t2)*rad,Math.sin(t2)*rad,hei*0.5,r*(Math.cos(t2)*0.1+0.9),g*(Math.cos(t2)*0.1+0.9),b*(Math.cos(t2)*0.1+0.9),
                Math.cos(t2)*rad2,Math.sin(t2)*rad2,-hei*0.5,r*(Math.cos(t2)*0.1+0.9),g*(Math.cos(t2)*0.1+0.9),b*(Math.cos(t2)*0.1+0.9))
            
            let _vl=_verts.length/6
            _index.push(_vl,_vl+1,_vl+2,_vl+3,_vl+2,_vl+1)
        }
        
    } else {
        
        for(let t=0,inc=MATH.TWO_PI/sides;t<=MATH.TWO_PI;t+=inc){
            
            let t1=t-inc*0.5,t2=t+inc*0.5
            _verts.push(
                Math.cos(t1)*rad,Math.sin(t1)*rad,hei*0.5,r,g,b,
                Math.cos(t1)*rad2,Math.sin(t1)*rad2,-hei*0.5,r,g,b,
                Math.cos(t2)*rad,Math.sin(t2)*rad,hei*0.5,r,g,b,
                Math.cos(t2)*rad2,Math.sin(t2)*rad2,-hei*0.5,r,g,b)
            
            let _vl=_verts.length/6
            _index.push(_vl,_vl+1,_vl+2,_vl+3,_vl+2,_vl+1)
        }
    }
    
    let _v=_verts.length/6
    
    for(let t=0,inc=MATH.TWO_PI/sides;t<=MATH.TWO_PI;t+=inc){
        
        let t1=t-inc*0.5,t2=t+inc*0.5
        _verts.push(
            Math.cos(t1)*rad,Math.sin(t1)*rad,hei*0.5,r,g,b,
            Math.cos(t2)*rad,Math.sin(t2)*rad,hei*0.5,r,g,b)
    }
    
    for(let l=_verts.length/6,i=_v;i<l-3&&top;i++){
        
        _index.push(_v,i,i+1)
    }
    
    _v=_verts.length/6
    for(let t=0,inc=MATH.TWO_PI/sides;t<=MATH.TWO_PI;t+=inc){
        
        let t1=t-inc*0.5,t2=t+inc*0.5
        _verts.push(
            
            Math.cos(t1)*rad2,Math.sin(t1)*rad2,-hei*0.5,r,g,b,
            Math.cos(t2)*rad2,Math.sin(t2)*rad2,-hei*0.5,r,g,b)
    }
    for(let l=_verts.length/6,i=_v;i<l&&bottom;i++){
        
        _index.push(i,i-1,_v)
    }
    
    for(let i in _index){
        
        _index[i]+=vl
    }
    
    index.push(..._index)
    
    let rotQuat=quat.fromEuler([],rx,ry,rz)
    
    for(let i=0;i<_verts.length;i+=6){
        
        if(rx){
            
            let rotated=vec3.transformQuat([],[_verts[i],_verts[i+1],_verts[i+2]],rotQuat)
            _verts[i]=rotated[0]+x
            _verts[i+1]=rotated[1]+y
            _verts[i+2]=rotated[2]+z
            
        } else {
            
            _verts[i]+=x
            _verts[i+1]+=y
            _verts[i+2]+=z
        }
    }
    
    verts.push(..._verts)
}

meshes.explosion={}
meshes.explosion.vertBuffer=gl.createBuffer()
meshes.explosion.indexBuffer=gl.createBuffer()
verts=MATH.icosphere(3)
index=verts.index
verts=verts.verts

gl.bindBuffer(gl.ARRAY_BUFFER,meshes.explosion.vertBuffer)
gl.bufferData(gl.ARRAY_BUFFER,Float32Array.from(verts),gl.STATIC_DRAW)
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,meshes.explosion.indexBuffer)
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,Uint16Array.from(index),gl.STATIC_DRAW)

meshes.explosion.indexAmount=index.length

meshes.cylinder_explosion={}
meshes.cylinder_explosion.vertBuffer=gl.createBuffer()
meshes.cylinder_explosion.indexBuffer=gl.createBuffer()
verts=[]
index=[]

for(let i=0,inc=MATH.TWO_PI/s;i<MATH.TWO_PI;i+=inc){
    
    let s=Math.sin(i),c=Math.cos(i),texSize=128/1024
    
    verts.push(s*0.5,0.5,c*0.5,
                s*0.5,-0.5,c*0.5)
    
}

vl=verts.length/3

for(let i=0;i<s*2;i+=2){
    
    index.push((i+2)%vl,(i+1)%vl,i%vl,(i+1)%vl,(i+2)%vl,(i+3)%vl)
}

for(let i=1;i<s-1;i++){
    
    index.push((i+1)*2,i*2,0)
    index.push(1,i*2+1,(i+1)*2+1)
}

index.reverse()

gl.bindBuffer(gl.ARRAY_BUFFER,meshes.cylinder_explosion.vertBuffer)
gl.bufferData(gl.ARRAY_BUFFER,Float32Array.from(verts),gl.STATIC_DRAW)
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,meshes.cylinder_explosion.indexBuffer)
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,Uint16Array.from(index),gl.STATIC_DRAW)

meshes.cylinder_explosion.indexAmount=index.length


meshes.bee={}
meshes.bee.vertBuffer=gl.createBuffer()
meshes.bee.indexBuffer=gl.createBuffer()
verts=[]
index=[]

let w=0.4,h=0.4,l=0.6

let v=[
    
    [-0.5*w,0.5*h,-0.5*l],
    [-0.5*w,0.5*h,0.5*l],
    [0.5*w,0.5*h,0.5*l],
    [0.5*w,0.5*h,-0.5*l],
    [-0.5*w,-0.5*h,-0.5*l],
    [-0.5*w,-0.5*h,0.5*l],
    [0.5*w,-0.5*h,0.5*l],
    [0.5*w,-0.5*h,-0.5*l]
]

w=128/2048,e=1/2048
h=w
l=w

verts.push(
    
    v[0][0],v[0][1],v[0][2],0,l+w,1,0,
    v[1][0],v[1][1],v[1][2],0,0+w,1,0,
    v[2][0],v[2][1],v[2][2],w,0+w,1,0,
    v[3][0],v[3][1],v[3][2],w,l+w,1,0,
    
    v[1][0],v[1][1],v[1][2],0,0,0.85,0,
    v[2][0],v[2][1],v[2][2],w,0,0.85,0,
    v[5][0],v[5][1],v[5][2],0,h,0.85,0,
    v[6][0],v[6][1],v[6][2],w,h,0.85,0,
    
    v[0][0],v[0][1],v[0][2],e,w+w-e-e,0.9,0,
    v[3][0],v[3][1],v[3][2],e,w+w-e-e,0.9,0,
    v[4][0],v[4][1],v[4][2],e,w+w-e-e,0.9,0,
    v[7][0],v[7][1],v[7][2],e,w+w-e-e,0.9,0,
    
    v[2][0],v[2][1],v[2][2],0,0+w-e-e,0.75,0,
    v[3][0],v[3][1],v[3][2],0,h+w-e-e,0.75,0,
    v[6][0],v[6][1],v[6][2],w,0+w-e-e,0.75,0,
    v[7][0],v[7][1],v[7][2],w,h+w-e-e,0.75,0,
    
    v[0][0],v[0][1],v[0][2],0,h+w-e-e,0.8,0,
    v[1][0],v[1][1],v[1][2],0,0+w-e-e,0.8,0,
    v[4][0],v[4][1],v[4][2],w,h+w-e-e,0.8,0,
    v[5][0],v[5][1],v[5][2],w,0+w-e-e,0.8,0,
    
    v[4][0],v[4][1],v[4][2],0,l+w,0.95,0,
    v[5][0],v[5][1],v[5][2],0,0+w,0.95,0,
    v[6][0],v[6][1],v[6][2],w,0+w,0.95,0,
    v[7][0],v[7][1],v[7][2],w,l+w,0.95,0,
    
    -0.6,0,v[0][2]*0.6,0,0,0,0,
    0.6,0,v[0][2]*0.6,0,0,0,0,
    0.6,0,v[0][2]*-0.6,0,0,0,0,
    -0.6,0,v[0][2]*-0.6,0,0,0,0,
    
)

index.push(
    
    0,1,2,
    0,2,3,
    5,6,7,
    6,5,4,
    8,9,10,
    11,10,9,
    14,13,12,
    13,14,15,
    18,17,16,
    17,18,19,
    22,21,20,
    23,22,20,
    
    24,25,26,
    26,25,24,
    24,26,27,
    27,26,24
)


_b(-0.085,0.05,0,0.05,0.5,0.5,0.01,0.01,1,0,0,20)
_c(-0.085*2,0.3,0.2,0.075,0.275*0.5,6,0.05,0.01,1,90,0,180)
_c(-0.085*2,0.3,-0.2,0.075,0.275*0.5,6,0.05,0.01,1,90,0,180)
_c(-0.085*2,0.3,0,0.05,0.275,6,0.01,0.01,1,90,0,0)

_b(-0.2,0,0.285,0.2*1.414,0.2*1.414,0.025,0.01,0.07,2,0,0,45)
_b(0.2,0,0.285,0.2*1.414,0.2*1.414,0.025,0.01,0.07,2,0,0,45)

_c(0,0.195,0.05,0.175,0.05,10,0.01,0.09,3)
_c(0,0.35,0.05,0,0.25,10,128*0.5/2048,128*0.5/2048,3,0,0,0,0.2)
_b(0,0.6,0.05,0.095,0.095,0.095,0.01,0.09,3)

_c(0.075,0.185,-0.35,0.075,0.2,8,-0.04,0.01,4,-10,0,0)
_c(-0.075,0.185,-0.35,0.075,0.2,8,-0.04,0.01,4,-10,0,0)

_b(0,0.25,-0.35,0.05,0.55,0.075,0.01,0.01,5,-25,0,0)
_b(0,0.4,-0.5,0.05,0.2,0.075,0.01,0.01,5,20,0,0)

_b(0,0,-0.3,0.5,0.5,0.075,0.01,0.01,6,0,0,15)
_b(0,0,-0.3,0.5,0.5,0.075,0.01,0.01,6,0,0,45)
_b(0,0,-0.3,0.5,0.5,0.075,0.01,0.01,6,0,0,75)

fluff(-0.05,0.2,0.25,0,0.15)
fluff(0.06,0.2,0.17,0,0.15)
fluff(0.08,0.2,0,0,0.12)
fluff(0,0.2,-0.2,0,0.15)
fluff(-0.05,0.2,0.25,90,0.15)
fluff(0.06,0.2,0.17,90,0.15)
fluff(0.08,0.2,0,90,0.12)
fluff(0,0.2,-0.2,90,0.15)
fluff(-0.05,0.2,0.25,-90,0.15)
fluff(0.06,0.2,0.17,-90,0.15)
fluff(0.08,0.2,0,-90,0.12)
fluff(0,0.2,-0.2,-90,0.15)
fluff(-0.05,0.2,0.25,180,0.15)
fluff(0.06,0.2,0.17,180,0.15)
fluff(0.08,0.2,0,180,0.12)
fluff(0,0.2,-0.2,45,0.15)
fluff(-0.05,0.2,0.25,-45,0.15)
fluff(0.06,0.2,0.17,120,0.15)
fluff(0.08,0.2,0,-120,0.12)
fluff(0,0.2,-0.2,120,0.15)
fluff(-0.05,0.2,0.25,45,0.15)
fluff(0.06,0.2,0.17,-120,0.15)
fluff(0.08,0.2,0,-45,0.12)

_b(0,0.15,0,0.15,0.35,0.35,0.01,0.09,8,45,0,0)

_b(0,0.1,0,0.45,0.3,0.4,0.1,-0.025,9)
_b(0,0.2,0.175,0.45,0.1,0.4,0.1,-0.025,9)
_b(0.2,0.1,0.175,0.05,0.3,0.4,0.1,-0.025,9)
_b(-0.2,0.1,0.175,0.05,0.3,0.4,0.1,-0.025,9)
_b(0.065,0.245,0.075,0.05,0.05,0.55,0.01,0.09,9)
_b(-0.065,0.245,0.075,0.05,0.05,0.55,0.01,0.09,9)

_b(0.124,0.2,0.2495,0.115,0.115,0.1,0.0001,0.0001,10,0,0,45)
_b(-0.124,0.2,0.2495,0.115,0.115,0.1,0.0001,0.0001,10,0,0,45)
_b(0,0.1,-0.42,0.075,0.075,0.4,0.01,0.01,10,45,0,0)

_b(-0.175,0.2,0.225,0.07,0.3,0.07,0.01,0.09,11,0,0,35)
_b(0.175,0.2,0.225,0.07,0.3,0.07,0.01,0.09,11,0,0,-35)

_b(0,0.3,0,0.2,0.2,0.25,0.37,0.09,12)
_c(0,0.3,0.225,0.1,0.05,8,0.37,0.09,12,90,0,180)
_c(0,0.3,0.1,0.05,0.1,6,0.37,0.09,12,90,0,180)
_b(0.05,0.35,-0.2,0.06,0.06,0.25,0.37,0.09,12,-10,0,0)
_b(-0.05,0.35,-0.2,0.06,0.06,0.25,0.37,0.09,12,-10,0,0)

_b(0,0,0.125,0.55,0.55,0.2,0.4,-0.18,13)
_b(0,0,0.125,0.55,0.55,0.2,0.4,-0.18,13)

_c(0,0.175,0.125,0.16,0.05,10,0.1,-0.13,14)
_c(0,0.22,0.125,0.1,0.05,10,0.01,0.09,14)
_c(0,0.3375,0.125,0.1,0.0675,10,0.1,-0.13,14)

function fluff(x,y,z,r,s){
    
    let shade=MATH.random(0.7,0.9),v=[[x+s,y,z],[x-s,y,z],[x,y+s*0.8,z-s]],vl=verts.length/7
    
    for(let i in v){
        
        vec3.rotateZ(v[i],v[i],[0,0,0],r*0.017)
    }
    
    verts.push(
        
        v[0][0],v[0][1],v[0][2],0.01,0.01,shade,7,
        v[1][0],v[1][1],v[1][2],0.01,0.01,shade,7,
        v[2][0],v[2][1],v[2][2],0.01,0.01,shade,7
    )
    
    index.push(vl,vl+1,vl+2,vl+2,vl+1,vl)
}

function _b(x,y,z,w,h,l,uvcolx,uvcoly,id,rx=0,ry=0,rz=0){
    
    let v=[
        
        [-0.5*w,0.5*h,-0.5*l],
        [-0.5*w,0.5*h,0.5*l],
        [0.5*w,0.5*h,0.5*l],
        [0.5*w,0.5*h,-0.5*l],
        [-0.5*w,-0.5*h,-0.5*l],
        [-0.5*w,-0.5*h,0.5*l],
        [0.5*w,-0.5*h,0.5*l],
        [0.5*w,-0.5*h,-0.5*l]
    ]
    
    let q=quat.fromEuler([],rx,ry,rz)
    
    for(let i in v){
        
        vec3.transformQuat(v[i],v[i],q)
        vec3.add(v[i],v[i],[x,y,z])
    }
    
    
    let vl=verts.length/7
    
    verts.push(
        
        v[0][0],v[0][1],v[0][2],uvcolx,uvcoly,1,id,
        v[1][0],v[1][1],v[1][2],uvcolx,uvcoly,1,id,
        v[2][0],v[2][1],v[2][2],uvcolx,uvcoly,1,id,
        v[3][0],v[3][1],v[3][2],uvcolx,uvcoly,1,id,
        
        v[1][0],v[1][1],v[1][2],uvcolx,uvcoly,0.85,id,
        v[2][0],v[2][1],v[2][2],uvcolx,uvcoly,0.85,id,
        v[5][0],v[5][1],v[5][2],uvcolx,uvcoly,0.85,id,
        v[6][0],v[6][1],v[6][2],uvcolx,uvcoly,0.85,id,
        
        v[0][0],v[0][1],v[0][2],uvcolx,uvcoly,0.9,id,
        v[3][0],v[3][1],v[3][2],uvcolx,uvcoly,0.9,id,
        v[4][0],v[4][1],v[4][2],uvcolx,uvcoly,0.9,id,
        v[7][0],v[7][1],v[7][2],uvcolx,uvcoly,0.9,id,
        
        v[2][0],v[2][1],v[2][2],uvcolx,uvcoly,0.75,id,
        v[3][0],v[3][1],v[3][2],uvcolx,uvcoly,0.75,id,
        v[6][0],v[6][1],v[6][2],uvcolx,uvcoly,0.75,id,
        v[7][0],v[7][1],v[7][2],uvcolx,uvcoly,0.75,id,
        
        v[0][0],v[0][1],v[0][2],uvcolx,uvcoly,0.8,id,
        v[1][0],v[1][1],v[1][2],uvcolx,uvcoly,0.8,id,
        v[4][0],v[4][1],v[4][2],uvcolx,uvcoly,0.8,id,
        v[5][0],v[5][1],v[5][2],uvcolx,uvcoly,0.8,id,
        
        v[4][0],v[4][1],v[4][2],uvcolx,uvcoly,0.95,id,
        v[5][0],v[5][1],v[5][2],uvcolx,uvcoly,0.95,id,
        v[6][0],v[6][1],v[6][2],uvcolx,uvcoly,0.95,id,
        v[7][0],v[7][1],v[7][2],uvcolx,uvcoly,0.95,id
    )
    
    let ind=[0,1,2,
        0,2,3,
        5,6,7,
        6,5,4,
        8,9,10,
        11,10,9,
        14,13,12,
        13,14,15,
        18,17,16,
        17,18,19,
        22,21,20,
        23,22,20
    ]
    
    for(let i in ind){
        
        ind[i]+=vl
    }
    
    index.push(...ind)

}

function _c(x,y,z,r,h,s,uvcolx,uvcoly,id,rx=0,ry=0,rz=0,r2){
    
    let si=verts.length,vl=si/7
    r2=r2??r
    
    for(let i=0,inc=MATH.TWO_PI/s;i<MATH.TWO_PI;i+=inc){
        
        let s=Math.sin(i),c=Math.cos(i)
        
        verts.push(s*r,h,c*r,uvcolx,uvcoly,c*0.2+0.8,id,
                    s*r2,-h,c*r2,uvcolx,uvcoly,c*0.25+0.75,id)
        
    }
    
    let q=quat.fromEuler([],rx,ry,rz)
    
    for(let i=si;i<verts.length;i+=7){
        
        let v=[]
        let r=vec3.transformQuat(v,[verts[i],verts[i+1],verts[i+2]],q)
        let m=vec3.add(v,v,[x,y,z])
        
        verts[i]=v[0]
        verts[i+1]=v[1]
        verts[i+2]=v[2]
        
    }
    
    let _vl=s*2
    
    let ind=[]
    
    for(let i=0;i<s*2;i+=2){
        
        ind.push((i+2)%_vl,i+1,i,(i+3)%_vl,i+1,(i+2)%_vl)
    }
    
    for(let i=1;i<s-1;i++){
        
        ind.push((i+1)*2,i*2,0)
        ind.push(1,i*2+1,(i+1)*2+1)
    }
    
    for(let i in ind){
        
        ind[i]+=vl
    }
    
    ind.reverse()
    index.push(...ind)
    
}

gl.bindBuffer(gl.ARRAY_BUFFER,meshes.bee.vertBuffer)
gl.bufferData(gl.ARRAY_BUFFER,Float32Array.from(verts),gl.STATIC_DRAW)
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,meshes.bee.indexBuffer)
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,Uint16Array.from(index),gl.STATIC_DRAW)

meshes.bee.indexAmount=index.length

meshes.frog={}
meshes.frog.vertBuffer=gl.createBuffer()
meshes.frog.indexBuffer=gl.createBuffer()
verts=[]
index=[]

b(0,0.25,0,1,0.5,1.5,0.1,0.8,0.3,30,0,0)
b(0,-0.17,-0.28,1.05,0.6,1.6,0.8,0.8,0.4,30,0,0)
b(0.5,-0.5,-0.2,0.75,0.4,1.3,0.1,0.8,0.3,0.00001,-20,0)
b(-0.5,-0.5,-0.2,0.75,0.4,1.3,0.1,0.8,0.3,0.00001,20,0)
c(-0.5,0.75,-0.35,0.25,0.45,9,0.1,0.8,0.3,30,20,0,0.25,true,true)
c(0.5,0.75,-0.35,0.25,0.45,9,0.1,0.8,0.3,30,-20,0,0.25,true,true)
c(0.5,0.77,-0.42,0.2,0.4,9,1,1,1,30,-20,0,0.2,true,false)
c(-0.5,0.77,-0.42,0.2,0.4,9,1,1,1,30,20,0,0.2,true,false)
b(-0.475,0.77,-0.42,0.15,0.225,0.5,0.05,0.4,0.175,30,20,10)
b(0.475,0.77,-0.42,0.15,0.225,0.5,0.05,0.4,0.175,30,-20,-10)

gl.bindBuffer(gl.ARRAY_BUFFER,meshes.frog.vertBuffer)
gl.bufferData(gl.ARRAY_BUFFER,Float32Array.from(verts),gl.STATIC_DRAW)
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,meshes.frog.indexBuffer)
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,Uint16Array.from(index),gl.STATIC_DRAW)

meshes.frog.indexAmount=index.length

meshes.giftedFrog={}
meshes.giftedFrog.vertBuffer=gl.createBuffer()
meshes.giftedFrog.indexBuffer=gl.createBuffer()
verts=[]
index=[]

star(0.2,0.4,0.05,0.05,5,5,0,0.75,0.25,0,0.4,-0.4)

for(let i=0;i<verts.length;i+=6){
    
    let a=vec3.rotateX([],[verts[i],verts[i+1],verts[i+2]],[0,1,0],MATH.TO_RAD*-60)
    
    verts[i]=a[0]
    verts[i+1]=a[1]
    verts[i+2]=a[2]
}

b(0,0.25,0,1,0.5,1.5,0.3,0.4,0.8,30,0,0)
b(0,-0.17,-0.28,1.05,0.6,1.6,0.3*1.35,0.4*1.35,0.8*1.35,30,0,0)
b(0.5,-0.5,-0.2,0.75,0.4,1.3,0.3,0.4,0.8,0.00001,-20,0)
b(-0.5,-0.5,-0.2,0.75,0.4,1.3,0.3,0.4,0.8,0.00001,20,0)
c(-0.5,0.75,-0.35,0.25,0.45,9,0.3,0.4,0.8,30,20,0,0.25,true,true)
c(0.5,0.75,-0.35,0.25,0.45,9,0.3,0.4,0.8,30,-20,0,0.25,true,true)
c(0.5,0.77,-0.42,0.2,0.4,9,1,1,1,30,-20,0,0.2,true,false)
c(-0.5,0.77,-0.42,0.2,0.4,9,1,1,1,30,20,0,0.2,true,false)
b(-0.475,0.77,-0.42,0.15,0.225,0.5,0.05,0.15,0.4,30,20,10)
b(0.475,0.77,-0.42,0.15,0.225,0.5,0.05,0.15,0.4,30,-20,-10)

gl.bindBuffer(gl.ARRAY_BUFFER,meshes.giftedFrog.vertBuffer)
gl.bufferData(gl.ARRAY_BUFFER,Float32Array.from(verts),gl.STATIC_DRAW)
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,meshes.giftedFrog.indexBuffer)
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,Uint16Array.from(index),gl.STATIC_DRAW)

meshes.giftedFrog.indexAmount=index.length

meshes.beetle={}
meshes.beetle.vertBuffer=gl.createBuffer()
meshes.beetle.indexBuffer=gl.createBuffer()
verts=[]
index=[]

b(0,0,0,1,1,1.25,0.025,0.025,0.4)
b(-0.3,0.65,-0.8,0.1,0.1,1,0,0,0,30,45,0)
b(0.3,0.65,-0.8,0.1,0.1,1,0,0,0,30,-45,0)
b(0.65,-0.5,0.4,0.7,0.1,0.1,0,0,0,0.00001,0,-30)
b(0.65,-0.5,-0.4,0.7,0.1,0.1,0,0,0,0.00001,0,-30)
b(-0.65,-0.5,0.4,0.7,0.1,0.1,0,0,0,0.00001,0,30)
b(-0.65,-0.5,-0.4,0.7,0.1,0.1,0,0,0,0.00001,0,30)

gl.bindBuffer(gl.ARRAY_BUFFER,meshes.beetle.vertBuffer)
gl.bufferData(gl.ARRAY_BUFFER,Float32Array.from(verts),gl.STATIC_DRAW)
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,meshes.beetle.indexBuffer)
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,Uint16Array.from(index),gl.STATIC_DRAW)

meshes.beetle.indexAmount=index.length

meshes.mondoChick={}
meshes.mondoChick.vertBuffer=gl.createBuffer()
meshes.mondoChick.indexBuffer=gl.createBuffer()
verts=[]
index=[]

c(0,0.85,0,1.2,0.5,10,0.9,0.9,0.9,-90,0,0,1.5,true,true,true)
c(0,0.85+0.5,0,0.7,0.5,10,0.9,0.9,0.9,-90,0,0,1.2,true,true,true)
c(0,0.85+1-0.15,0,0.2,0.2,10,0.9,0.9,0.9,-90,0,0,0.7,true,true,true)

for(let i=0;i<verts.length;i+=6){
    
    let _t=vec3.rotateX([],[verts[i],verts[i+1],verts[i+2]],[0,0,0],0.3)
    
    verts[i]=_t[0]
    verts[i+1]=_t[1]
    verts[i+2]=_t[2]
}

c(0,-0.85,0,1.5,0.5,10,0.9,0.9,0.9,-90,0,0,1.2,true,true,true)
c(0,-0.85-0.5,0,1.2,0.5,10,0.9,0.9,0.9,-90,0,0,0.7,true,true,true)
c(0,-0.85-1+0.15,0,0.7,0.2,10,0.8,0.8,0.8,-90,0,0,0.2,true,true,true)

for(let i=0;i<verts.length;i+=6){
    
    verts[i]*=1.2
    verts[i+1]*=1.2
    verts[i+2]*=1.2
}

c(0,0.075,-0.8,0.15,0.4,10,1,0.5,0,0.001,90,0)

b(0,0,0,1.5,1.5,1.5,1,1,0.6,15,0,0)
b(0.9,0,0,0.2,0.5,0.75,1.2,0,0,15,20,0)
b(-0.9,0,0,0.2,0.5,0.75,0,0,1.2,15,-20,0)
b(0.5,-2,-0.4,1,0.1,2,1,0.5,0.1,0.001,-30,0)
b(-0.5,-2,-0.4,1,0.1,2,1,0.5,0.1,0.001,30,0)

let _s=MATH.icosphere(1),_vl=verts.length/6

for(let i=0;i<_s.verts.length;i+=3){
    
    _s.verts[i]*=0.175
    _s.verts[i+1]*=0.175
    _s.verts[i+2]*=0.175
    _s.verts[i+2]-=0.7
    _s.verts[i+1]+=0.4
    _s.verts[i]+=0.3
    
    verts.push(_s.verts[i],_s.verts[i+1],_s.verts[i+2],0,0,0)
}


for(let i in _s.index){
    
    index.push(_s.index[i]+_vl)
}
_s=MATH.icosphere(1)
_vl=verts.length/6

for(let i=0;i<_s.verts.length;i+=3){
    
    _s.verts[i]*=0.175
    _s.verts[i+1]*=0.175
    _s.verts[i+2]*=0.175
    _s.verts[i+2]-=0.7
    _s.verts[i+1]+=0.4
    _s.verts[i]-=0.3
    
    verts.push(_s.verts[i],_s.verts[i+1],_s.verts[i+2],0,0,0)
}


for(let i in _s.index){
    
    index.push(_s.index[i]+_vl)
}

gl.bindBuffer(gl.ARRAY_BUFFER,meshes.mondoChick.vertBuffer)
gl.bufferData(gl.ARRAY_BUFFER,Float32Array.from(verts),gl.STATIC_DRAW)
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,meshes.mondoChick.indexBuffer)
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,Uint16Array.from(index),gl.STATIC_DRAW)

meshes.mondoChick.indexAmount=index.length

meshes.petalShuriken={}
meshes.petalShuriken.vertBuffer=gl.createBuffer()
meshes.petalShuriken.indexBuffer=gl.createBuffer()
verts=[]
index=[]

b(0,0,-0.6,0.8,0.05,0.8,0.8,0.8,0.8,360,45,0,0.75,1,1)
b(0,0,0.6,0.8,0.05,0.8,0.8,0.8,0.8,360,45,0,0.75,1,1)
b(-0.6,0,0,0.8,0.05,0.8,0.8,0.8,0.8,360,45,0,1,1,0.75)
b(0.6,0,0,0.8,0.05,0.8,0.8,0.8,0.8,360,45,0,1,1,0.75)
b(0,0,0,0.6,0.075,0.6,0.9,0.7,0)
b(0,0,0,0.6,0.075,0.6,0.9,0.7,0,360,45,0)

gl.bindBuffer(gl.ARRAY_BUFFER,meshes.petalShuriken.vertBuffer)
gl.bufferData(gl.ARRAY_BUFFER,Float32Array.from(verts),gl.STATIC_DRAW)
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,meshes.petalShuriken.indexBuffer)
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,Uint16Array.from(index),gl.STATIC_DRAW)

meshes.petalShuriken.indexAmount=index.length

meshes.popStar={}
meshes.popStar.vertBuffer=gl.createBuffer()
meshes.popStar.indexBuffer=gl.createBuffer()
verts=[]
index=[]

star(0.75,1.3,0.15,0.45,0.5,1.5,3)

gl.bindBuffer(gl.ARRAY_BUFFER,meshes.popStar.vertBuffer)
gl.bufferData(gl.ARRAY_BUFFER,Float32Array.from(verts),gl.STATIC_DRAW)
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,meshes.popStar.indexBuffer)
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,Uint16Array.from(index),gl.STATIC_DRAW)

meshes.popStar.indexAmount=index.length

meshes.scorchingStar={}
meshes.scorchingStar.vertBuffer=gl.createBuffer()
meshes.scorchingStar.indexBuffer=gl.createBuffer()
verts=[]
index=[]

star(0.75,1.3,0.15,0.45,0.9,0,0,0,1)

gl.bindBuffer(gl.ARRAY_BUFFER,meshes.scorchingStar.vertBuffer)
gl.bufferData(gl.ARRAY_BUFFER,Float32Array.from(verts),gl.STATIC_DRAW)
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,meshes.scorchingStar.indexBuffer)
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,Uint16Array.from(index),gl.STATIC_DRAW)

meshes.scorchingStar.indexAmount=index.length

meshes.gummyStar={}
meshes.gummyStar.vertBuffer=gl.createBuffer()
meshes.gummyStar.indexBuffer=gl.createBuffer()
verts=[]
index=[]

star(0.75,1.3,0.15,0.45,0,0,0,0,1)

let _a=[],_c1=[0.1,1,0.5],_c2=[1,0.2,1]

for(let i=0;i<verts.length;i+=6){
    
    vec3.lerp(_a,_c1,_c2,verts[i]*0.5+0.5)
    verts[i+3]=_a[0]
    verts[i+4]=_a[1]
    verts[i+5]=_a[2]
}

gl.bindBuffer(gl.ARRAY_BUFFER,meshes.gummyStar.vertBuffer)
gl.bufferData(gl.ARRAY_BUFFER,Float32Array.from(verts),gl.STATIC_DRAW)
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,meshes.gummyStar.indexBuffer)
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,Uint16Array.from(index),gl.STATIC_DRAW)

meshes.gummyStar.indexAmount=index.length

meshes.starSaw={}
meshes.starSaw.vertBuffer=gl.createBuffer()
meshes.starSaw.indexBuffer=gl.createBuffer()
verts=[]
index=[]

star(0.75,1.3,0.15,0.25,1,1,1,0.2,0.8)

for(let i=0;i<verts.length;i+=6){
    
    let a=vec3.rotateX([],[verts[i],verts[i+1],verts[i+2]],[0,0,0],MATH.HALF_PI)
    
    verts[i]=a[0]
    verts[i+1]=a[1]
    verts[i+2]=a[2]
}

gl.bindBuffer(gl.ARRAY_BUFFER,meshes.starSaw.vertBuffer)
gl.bufferData(gl.ARRAY_BUFFER,Float32Array.from(verts),gl.STATIC_DRAW)
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,meshes.starSaw.indexBuffer)
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,Uint16Array.from(index),gl.STATIC_DRAW)

meshes.starSaw.indexAmount=index.length

meshes.guidingStar={}
meshes.guidingStar.vertBuffer=gl.createBuffer()
meshes.guidingStar.indexBuffer=gl.createBuffer()
verts=[]
index=[]

star(0.75,1.3,0.075,0.2,3.5,1.75,0)

for(let i=0;i<verts.length;i+=6){
    
    let a=vec3.rotateX([],[verts[i],verts[i+1],verts[i+2]],[0,0,0],MATH.HALF_PI*0.75)
    
    verts[i]=a[0]
    verts[i+1]=a[1]
    verts[i+2]=a[2]
}

gl.bindBuffer(gl.ARRAY_BUFFER,meshes.guidingStar.vertBuffer)
gl.bufferData(gl.ARRAY_BUFFER,Float32Array.from(verts),gl.STATIC_DRAW)
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,meshes.guidingStar.indexBuffer)
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,Uint16Array.from(index),gl.STATIC_DRAW)

meshes.guidingStar.indexAmount=index.length

meshes.wave={}
meshes.wave.vertBuffer=gl.createBuffer()
meshes.wave.indexBuffer=gl.createBuffer()
verts=[]
index=[]

b(0,1,0,1,0.1,1,0.2,0.4,1,30,0,0)
b(0,0.5,0.4,1,0.3,1,0.2,0.4,1,60,0,0)
b(0,-0.1,0.6,1,0.5,1,0.2,0.4,1,80,0,0)
b(0,-0.8,0.6,1,0.7,1.3,0.2,0.4,1,90,0,0)

gl.bindBuffer(gl.ARRAY_BUFFER,meshes.wave.vertBuffer)
gl.bufferData(gl.ARRAY_BUFFER,Float32Array.from(verts),gl.STATIC_DRAW)
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,meshes.wave.indexBuffer)
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,Uint16Array.from(index),gl.STATIC_DRAW)

meshes.wave.indexAmount=index.length

meshes.gummyBall={}
meshes.gummyBall.vertBuffer=gl.createBuffer()
meshes.gummyBall.indexBuffer=gl.createBuffer()
verts=[]
index=[]

let ___m=MATH.icosphere(2),__m=___m.verts

for(let i=0;i<__m.length;i+=3){
    
    let d=(vec3.dot([__m[i],__m[i+1],__m[i+2]],lightDir)+1)*0.9
    verts.push(__m[i],__m[i+1],__m[i+2],d,0.2*d,d)
}

index.push(...___m.index)

gl.bindBuffer(gl.ARRAY_BUFFER,meshes.gummyBall.vertBuffer)
gl.bufferData(gl.ARRAY_BUFFER,Float32Array.from(verts),gl.STATIC_DRAW)
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,meshes.gummyBall.indexBuffer)
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,Uint16Array.from(index),gl.STATIC_DRAW)

meshes.gummyBall.indexAmount=index.length

meshes.drainingDiamond={}
meshes.drainingDiamond.vertBuffer=gl.createBuffer()
meshes.drainingDiamond.indexBuffer=gl.createBuffer()
verts=[]
index=[]

c(0,0,0,1,1.25,10,0.3,0.7,1,-90,0,0,0,true,false)
c(0,0.875,0,0.6,0.5,10,0.3,0.7,1,-90,0,0,1,false,true)

gl.bindBuffer(gl.ARRAY_BUFFER,meshes.drainingDiamond.vertBuffer)
gl.bufferData(gl.ARRAY_BUFFER,Float32Array.from(verts),gl.STATIC_DRAW)
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,meshes.drainingDiamond.indexBuffer)
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,Uint16Array.from(index),gl.STATIC_DRAW)

meshes.drainingDiamond.indexAmount=index.length

meshes.shiningDiamond={}
meshes.shiningDiamond.vertBuffer=gl.createBuffer()
meshes.shiningDiamond.indexBuffer=gl.createBuffer()
verts=[]
index=[]

c(0,0,0,1,1.25,10,100,100,100,-90,0,0,0,true,false,false)
c(0,0.875,0,0.6,0.5,10,100,100,100,-90,0,0,1,false,true,false)

gl.bindBuffer(gl.ARRAY_BUFFER,meshes.shiningDiamond.vertBuffer)
gl.bufferData(gl.ARRAY_BUFFER,Float32Array.from(verts),gl.STATIC_DRAW)
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,meshes.shiningDiamond.indexBuffer)
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,Uint16Array.from(index),gl.STATIC_DRAW)

meshes.shiningDiamond.indexAmount=index.length

meshes.tornado={}
meshes.tornado.vertBuffer=gl.createBuffer()
meshes.tornado.indexBuffer=gl.createBuffer()
verts=[]
index=[]

for(let i=7;i>=0;i--){
    
    c(Math.sin(i*0.5),i,Math.cos(i*0.5),i*0.5+1,1,10,0.7,0.7,0.7,-90,0,0,i*0.5+1,true,true)
}

gl.bindBuffer(gl.ARRAY_BUFFER,meshes.tornado.vertBuffer)
gl.bufferData(gl.ARRAY_BUFFER,Float32Array.from(verts),gl.STATIC_DRAW)
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,meshes.tornado.indexBuffer)
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,Uint16Array.from(index),gl.STATIC_DRAW)

meshes.tornado.indexAmount=index.length

meshes.scratch={}
meshes.scratch.vertBuffer=gl.createBuffer()
meshes.scratch.indexBuffer=gl.createBuffer()
verts=[]
index=[]

b(2,1,-0.5,0.75,0.5,3,0.7,0.7,0.7,0,0,0)
b(2,0.5,1,0.75,1.75,0.75,0.7,0.7,0.7,0,0,0)
b(0,1,-0.5,0.75,0.5,3,0.7,0.7,0.7,0,0,0)
b(0,0.5,1,0.75,1.75,0.75,0.7,0.7,0.7,0,0,0)
b(-2,1,-0.5,0.75,0.75,3,0.7,0.7,0.7,0,0,0)
b(-2,0.5,1,0.75,1.75,0.75,0.7,0.7,0.7,0,0,0)

gl.bindBuffer(gl.ARRAY_BUFFER,meshes.scratch.vertBuffer)
gl.bufferData(gl.ARRAY_BUFFER,Float32Array.from(verts),gl.STATIC_DRAW)
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,meshes.scratch.indexBuffer)
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,Uint16Array.from(index),gl.STATIC_DRAW)

meshes.scratch.indexAmount=index.length

player.createdMesh=`
    
    box(23,-1,4,1,1,1,false,[1,0,0],false,false);
box(23,-1,6,1,1,1,false,[0,0,1],false,false);    
box(23,-1,8,1,1,1,false,[1,1,1],false,false);    

    
    box(5,-1.5,20,10,0.1,10,false,[1,1,1],false,false)
    box(0,-2,0,500,1,500,false,[0,0.8,0]);

box(10,0,-10.3,5,25,5,false,[1.1,0.9,0.1],true,false);
box(10,-1.95,-10.3+4.5,4.95,1,4.95,false,[1.1,1.1,1.1],false,false);
box(7.5,0,-12.5,30,25,5,false,[0.3,0.2,0],true,false);

box(24.5,-2.2,-10,4,8,5,[-55,0,0],[1*0.8,0.7*0.8,0.3*0.8]);
box(51,0,-29,50,4.29,50,false,[1*0.8,0.7*0.8,0.3*0.8]);
box(25,0,-36.84,10,4.29,50,false,[1*0.8,0.7*0.8,0.3*0.8]);
box(60.5,0,-19,50,4.29,50,false,[1*0.8,0.7*0.8,0.3*0.8]);
box(53,-1.5,-19,50,0.1,50,false,[0.4,0.3,0.2],false);
box(60.5,0,7.6,50,16,14,false,[1*0.8,0.7*0.8,0.3*0.8]);

box(7.5,0,-24.5,30,25,19,false,WALL,true,false);
box(7.5,7,-26,30,21,10,false,WALL,true,false);
box(7.5,12,-29.2,30,21,4.5,false,WALL,false,false);
box(7.5,22.775,-41.4,30,7,20,false,WALL,true,false);
box(7.5,17.85,-24.5,30,4,21.5,[40,0,0],WALL,true,false);
box(25,0,-46,47,52.55,9,false,WALL,true,false);
box(65,0,-51,33,62,9,false,WALL,true,false);
box(80,0,-30,4,62,50,false,WALL,true,false);
box(72.5,0,-5.5,4,62,18,[0,-75,0],WALL,true,false);
box(64,0,24.2-4.5+1,4,62,53,false,WALL,true,false);
box(30,0,-34.5,65,25.05,19,false,[0,0.8,0],true,false);
box(57,0,-26,5,21,5,[0,45,0],[0,0.8,0],true,false);
box(52,0,-40,21,31,20,false,[0,0.8,0],true,false);
box(55,16.75,-47,21,2.5,36,[0,55,0],[0,0.8,0],true,false);
box(70,18,-29,21,5,50,false,[0,0.8,0],true,false);
box(61,12,-40.5,3,8,31,false,[0,0.8,0],true,false);
box(72,12,-16,25,8,3,false,[0,0.8,0],true,false);
box(71,19.25,-21.5,23,7.5,14,false,[0,0.8,0],true,false);
box(84.5,12,-31.5,23,7.5,34,false,[0,0.8,0],true,false);
box(71,23,-21.5,23.5,0.25,14.5,false,[0.4,0.4,0.6],true,false);
box(71,23.06,-21.5,19,0.25,11,false,[0.9,0.9,1],false,false);
box(75,24,-26,1.75,12,1.25,[11,0,0],[0.9,0.9,1],true,false);
box(75.25,24,-16.5,1.5,12,1.5,[-14,10,0],[0.9,0.9,1],true,false);
box(75,23.5,-16-0.5,2.25,2,2.25,[0,10,0],[0.7,0.7,1],true,false);
box(75,23.5,-26,2,2,2,[0,-6,0],[0.7,0.7,1],true,false);
box(75,29,-21,1.755,11,1.5,[-90,0.6,3],[0.7,0.7,1],true,false);
cylinder(75,27.5,-23.5,0.1,2,5,0.6,0.5,0.1,1,90,0,0,0.1);
cylinder(75,27.5,-21.5,0.1,2,5,0.6,0.5,0.1,1,90,0,0,0.1);
cylinder(75,27.5,-19.5,0.1,2,5,0.6,0.5,0.1,1,90,0,0,0.1);
box(75,25.5,-23.5,0.2,3.5,1.5,[6,-5,0],[0.86,1,1.7],true,false);
box(75,25.5,-21.5,0.2,3.5,1.5,[0,5,0],[0.9,1,1.7],true,false);
box(75,25.5,-19.5,0.2,3.5,1.5,[-8,6,0],[0.86,1,1.7],true,false);
cylinder(68,23,-21.5,2.4,0.6,18,1.3,1.3,1.6,1,90,0,0,2.4);
cylinder(68,22.95,-21.5,2.6,0.6,18,0.4,0.4,0.6,1,90,0,0,2.6);
box(63,7,-5,20,18,18,[1,-11,0],[0.5,0.5,0.5]);
box(69,19,-4.5,27,8,5,[0,-10,7],[1*0.6,0.7*0.6,0.3*0.6]);

box(56,0,-32,35,17,37,[0,3,0],[0,0.8,0],true,false);
box(47,0,-15,10,8.5,10,[0,10,0],[0.4,0.4,0.4]);
box(51,0,-16,11,12.5,13,[0,37,0],[1*0.8,0.7*0.8,0.3*0.8]);
box(37,0,-5,8,5,8,[0,30,0],[0.4,0.4,0.4]);
box(32,0,9.4,12,8,10,[0,7,0],[0.4,0.4,0.4]);
box(40,10.5,-24,6,10.5,3,[0,-3,6],[0.4,0.4,0.4]);
box(46.3,10.5,-24,6.5,11.5,4,[0,8,-2],[1*0.8,0.7*0.8,0.3*0.8]);
box(52,14.5,-19,10,2,3,[0,-54,0],[0.3,0.6,1],true,false);
box(49,10.5,-23.1,3,10,3,[0,-54,0],[0.3,0.6,1],true,false);
box(49,11,-23.1,3,10,2,[40,36,0],[0.3,0.6,1],true,false);
box(54.9,10.5,-15,3,10,3,[0,-54,0],[0.3,0.6,1],true,false);
box(54.9,11,-15,3,10,2,[-40,36,0],[0.3,0.6,1],true,false);
box(52,10,-19,10,7,2.95,[0,-54,0],[0,0.8,0,0.6],false,false);

box(84.45,12,-45,23,7.5,34,false,[0.9,1,0.8],false,false);
box(73.45,15.725,-45,23,0.5,34,false,[0.9,1,0.8],false,false);
box(62.05,12,-45,1,7.5,34,false,[0.9,1,0.8],false,false);
box(70.05,12,-61,15,7.5,34,false,[0.9,1,0.8],false,false);
box(73,4.8,-45,23,7.5,34,false,[0.9,0.7,0.9],false,false);
box(67.5,4.85,-45,3,7.5,34,false,[0.9,0.9,0.9],false,false);
box(67.5,11.75,-43,1,1,1,[45,45,45],[1,1,0],false,false);
box(67.5,13.25,-43.5,2.5,2.5,0.5,[0,0,45],[1.1,1.1,1.1],false,false);
box(66,10.75,-43.5,2.5,2.5,0.5,[0,0,72],[1.1,1.1,1.1],false,false);
box(69,10.75,-43.5,2.5,2.5,0.5,[0,0,-72],[1.1,1.1,1.1],false,false);


box(9.9,12,-31.1,25,21,1,false,[0,1,0.4],true,false);
box(9.9,12,-41.9,25,21,1,false,[0,1,0.4],false,false);
box(9.9,12.05,-36.9,25,21,1,[90,0,0],[1*0.8,0.7*0.8,0.3*0.8],false,true);
box(9.9,19.75,-36.9,25,21,1,[90,0,0],[0,1,0.4],false,false);
box(8,12,-36.9,20,21,1,[0,90,0],[0,1,0.4],true,false);
box(4.9,12.1,-36.9,20,21,1,[90,0,0],[1*0.3,0.7*0.3,0.3*0.3],false,true);
box(4.9,12.1,-36.9,15,21,4,[90,0,0],[1,1,0],true,false);
box(23.5,14.1,-30.9,2.5,3,5,[90,0,0],[0.85,0.85,0.85,1],false,true);
box(23.5,17.5,-31.4,2.5,3,4,[65,0,0],[0.85,0.85,0.85,1],false,true);
box(23.5,19,-33,2.5,3,4,[25,0,0],[0.85,0.85,0.85,1],false,true);
box(23.5,20,-37,2.5,3,6,[-5,0,0],[0.85,0.85,0.85,1],false,true);
box(23.5,19,-40,2.5,3,6,[-35,0,0],[0.85,0.85,0.85,1],false,true);
box(23.25,14.1,-36.9,0.1,10,10,false,[0,0,0,1],false,true);
box(23.25,14.1,-36.9,0.8,10,10,false,[0,0,0,0.7],false,true);
box(23.25,14.1,-36.9,1.7,10,10,false,[0,0,0,0.5],false,true);
box(23.25,14.1,-36.9,2.4,10,10,false,[0,0,0,0.3],false,true);
box(23.25,14.1,-36.9,2.95,10,10,false,[0,0,0,0.1],false,true);


box(18,13,-40.5,2.3,1.5,2.3,false,[1,1,1],true,false);
box(17.75,13.25,-40.5,0.5,0.5,2.32,false,[1,0,0],true,false);
box(18.25,13.25,-40.5,0.5,0.5,2.32,false,[0,0.4,1],true,false);

cylinder(18,15,-40.5,1.25,2.5,15,1,1,1,1,90,0,0);
cylinder(18,15,-39.25,0.75,0.05,15,0.5,0.4,0,1);
cylinder(18,15.5,-39.2,0.125,0.05,5,0.3,0.2,0,1);
cylinder(18.35,15.2,-39.2,0.125,0.05,5,0.3,0.2,0,1);
cylinder(17.9,15.1,-39.2,0.125,0.05,5,0.3,0.2,0,1);
cylinder(18,16.5,-40.5,1.5,0.5,15,0.7,0.7,0.7,0.2,90,0,0);


cylinder(40,15,-40.5,0.75,7,15,1,0.7,0.3,1,90,0,0,0.5);
box(38.5,18,-40.5,4,0.3,5,[20,-90,0],[0,0.9,0],false,false)
box(39.2,18,-39,4,0.3,4.5,[20,-45,0],[0,0.9,0],false,false)
box(40,18,-39,4,0.3,4.7,[20,45,0],[0,0.9,0],false,false)
box(41.5,18,-40.5,4.3,0.3,4,[20,70,0],[0,0.9,0],false,false)


cylinder(68,21,-45,1,6,18,1,0.2,0,1,0.001,100,8,0);
cylinder(71.4,21.5,-45.6,0.5,1,18,1,0.2,0,1,0.001,100,8,1);
box(72,21.7,-45.7,2,0.2,0.2,[0,0,25],[0,0.6,0],false,false);


cylinder(76,21.2,-39,1.5,7,18,1,0.8,0,1,-11,5,8,0);
cylinder(76.25,21.99,-35.1,0.75,1,18,1,0.8,0,1,-11,5,8,1.53);
box(76.25,21.99,-34.5,0.2,0.2,3,[-30,0,0],[0,0.6,0],false,false);

sphere=arguments[3];

sphere(40.5,13.5,-36.9,2,1,1*0.4,0.7*0.4,0.3*0.4,1);
sphere(39,13.5,-38,2,1,1*0.4,0.7*0.4,0.3*0.4,1);
sphere(40,13.5,-39,2,1,1*0.4,0.7*0.4,0.3*0.4,1);
sphere(40.5,14,-31,3,1,1*0.4,0.7*0.4,0.3*0.4,1);
sphere(24,14,-28,3,1,1*0.4,0.7*0.4,0.3*0.4,1);

box(34,5,5.7,0.7,3.9,0.3,[0,7,0],[1.1,1.1,1.1],true,false);
box(34-Math.cos(7*3.14159/180)*2,5,5.7+Math.sin(7*3.14159/180)*2,0.7,4.5,0.3,[0,7,0],[1.1,1.1,1.1],true,false);
box(34-Math.cos(7*3.14159/180)*4,5,5.7+Math.sin(7*3.14159/180)*4,0.7,4.3,0.3,[0,8,0],[1.1,1.1,1.1],true,false);
box(34-Math.cos(7*3.14159/180)*6,5,5.7+Math.sin(7*3.14159/180)*6,0.7,4.1,0.3,[0,8,0],[1.1,1.1,1.1],true,false);
box(32,5,5.95,0.5,10,0.3,[7,0,92],[1.1,1.1,1.1],true,false);
box(32,6,5.95,0.5,10,0.3,[7,0,86],[1.1,1.1,1.1],true,false);

box(53,0,40,12+40,4,60,false,[0.9,0.9,0.1],true,false);
box(41.5,6,14.5,12.5,13,0.5,false,[0.95,0.05,0.05],true,false);
box(46.5,6,30,22.5,13,0.5,false,[0.95,0.05,0.05],true,false);
box(47,1.55,14.5,12.5,13,0.5,false,[0.95,0.05,0.05],false,false);
box(61,6,13.5+8.75,19,13,16,false,[0.95,0.05,0.05],true,false);
box(48,1.51,13.5+8.75,25,1,16,false,[0.95,0.05,0.05],false,false);
box(47.375,12,13.5+8.75,24.5,1,16,false,[0.95,0.05,0.05],true,false);
box(35.5,2.5,13.5+8.75+5.5,1,1,5.5,false,[1,1,1],true,false);
box(35.5,2.5,13.5+8.75-5.5,1,1,5.5,false,[1,1,1],true,false);
box(35.5,2.5,13.5+8.75-5.5,0.45,10,4.95,false,[0.7,0,0.05,0.7],true,false);
box(35.5,2.5,13.5+8.75+5.5,0.45,10,4.95,false,[0.7,0,0.05,0.7],true,false);
box(35.5,2.5,13.5+8.75-3.4,1.5,10,1.5,false,[1,0,0.2],true,false);
box(35.5,6.75,13.5+8.75,1.5,6,1.5,[90,0,0],[1,0,0.2],true,false);
box(35.5,2.5,13.5+8.75+3.4,1.5,10,1.5,false,[1,0,0.2],true,false);
box(35.5,5.9,13.5+8.75-2.4,1.5,2.8,1.5,[45,0,0],[1,0,0.2],true,false);
box(35.5,5.9,13.5+8.75+2.4,1.5,2.8,1.5,[-45,0,0],[1,0,0.2],true,false);
box(35.5,9.5,13.5+8.75,0.75,5,16,false,[0.95,0.05,0.05],true,false);
box(35.5,4,13.5+8.75,1.2,6,5,[90,0,0],[0,0.8,0,0.6],false,false);
box(62,20,13.5+8.75,15,11.25,11.25,[45,0,0],[0.95,0.05,0.05],true,false);
box(52,12.5,13.5+8.75,9,1.25,7,false,[0.95,0.05,0.05],true,false);
box(59,14,13.5+8.75,10,8,8,[45,0,0],[1,1,1],false,false);
box(62,15,13.5+8.75,15,10,16,false,[0.95,0.05,0.05],true,false);
box(61,23.5,12.15+14,17,2,13,[45,0,0],[1,1,1],true,false);
box(61,23.5,14.85-14+8.75*2,17,2,13,[-45,0,0],[1,1,1],true,false);
box(51.75,6,13.5+8.75,1,12,6,false,[1,1,1],false,false);
box(35.25,12.5,13.5+8.75,1.5,1.5,17,false,[1,1,1],true,false);
box(40.5,6,12.25+8.75*2,9,12,0.25,false,[1,1,1],false,false);
box(48.75,3.5,20.25+8.75,3,3,1,false,[0.2,0.2,0.2],true,true);
box(48.75,3.5,20.2+8.75,2,2,1,false,[1000,0,0],false,false);
box(34.5,9.5,-25.25,3,3,1,[0,0,45],[0.2,0.2,0.2],true,true);
box(34.5,9.5,-25.2,2,2,1,[0,0,45],[0,1000,1000],false,false);

box(40.5,10,13,0.25,5.5,0.25,[25,0,0],[0.4,0.2,0.1],false,false);
box(42.5,10,13,0.25,5.5,0.25,[25,0,0],[0.4,0.2,0.1],false,false);
box(41.5,10+Math.cos(25*0.0174533)*2,13+Math.sin(25*0.0174533)*2,2,0.25,0.25,[0,0,0],[0.4,0.2,0.1],false,false);
box(41.5,10+Math.cos(25*0.0174533),13+Math.sin(25*0.0174533),2,0.25,0.25,[0,0,0],[0.4,0.2,0.1],false,false);
box(41.5,10,13,2,0.25,0.25,[0,0,0],[0.4,0.2,0.1],false,false);
box(41.5,10+Math.cos(25*0.0174533)*-1,13+Math.sin(25*0.0174533)*-1,2,0.25,0.25,[0,0,0],[0.4,0.2,0.1],false,false);
box(41.5,10+Math.cos(25*0.0174533)*-2,13+Math.sin(25*0.0174533)*-2,2,0.25,0.25,[0,0,0],[0.4,0.2,0.1],false,false);
box(41.5,10,13,2,5.5,0.4,[25,0,0],[0.4,0.2,0.1],true,true,false);

box(40.5+8,4.7,15.5,0.25,6.5,0.25,[-15,0,0],[0.4,0.2,0.1],false,false);
box(42.5+8,4.7,15.5,0.25,6.5,0.25,[-15,0,0],[0.4,0.2,0.1],false,false);
box(41.5+8,4.7+Math.cos(15*0.0174533)*2,15.5-Math.sin(15*0.0174533)*2,2,0.25,0.25,[0,0,0],[0.4,0.2,0.1],false,false);
box(41.5+8,4.7+Math.cos(15*0.0174533),15.5-Math.sin(15*0.0174533),2,0.25,0.25,[0,0,0],[0.4,0.2,0.1],false,false);
box(41.5+8,4.7,15.5,2,0.25,0.25,[0,0,0],[0.4,0.2,0.1],false,false);
box(41.5+8,4.7+Math.cos(15*0.0174533)*-1,15.5-Math.sin(15*0.0174533)*-1,2,0.25,0.25,[0,0,0],[0.4,0.2,0.1],false,false);
box(41.5+8,4.7+Math.cos(15*0.0174533)*-2,15.5-Math.sin(15*0.0174533)*-2,2,0.25,0.25,[0,0,0],[0.4,0.2,0.1],false,false);
box(41.5+8,4.7,15.5,2,7,0.4,[-15,0,0],[0.4,0.2,0.1],true,true,false);

box(32.05+1.5,0,49.5+1.5,13,17.5,13,false,[1*0.4,0.7*0.4,0.3*0.4]);
box(28.55,-5.175,49.5-7.44,3,20,20,[55,0,0],[1*0.4,0.7*0.4,0.3*0.4]);
box(37.5,0,57,5,25,11,false,[0.5,0.5,0.5],true,true);
box(32.1-0.5,0.5,57.5,9,25,10,false,[0.4,0.4,0.4],true,true);
box(35,4.5,63,9,25,5,[0,10,14],[0.5,0.5,0.5],true,true);

box(28-1.5,3.5,49.5-7-3,1.5,0.25,6,false,[1.2,0,0],false,false);
box(28-1.5,3.1,46.15-7.5-3,1.5,0.25,2,[-25,0,0],[1.2,0,0],false,false);
box(28-1.5*2,3.5,49.5-7-3,1.5,0.25,6,false,[1.2,1.2,1.2],false,false);
box(28-1.5*2,3.1,46.15-7.5-3,1.5,0.25,2,[-25,0,0],[1.2,1.2,1.2],false,false);
box(28-1.5*3,3.5,49.5-7-3,1.5,0.25,6,false,[1.2,0,0],false,false);
box(28-1.5*3,3.1,46.15-7.5-3,1.5,0.25,2,[-25,0,0],[1.2,0,0],false,false);
box(28-1.5*4,3.5,49.5-7-3,1.5,0.25,6,false,[1.2,1.2,1.2],false,false);
box(28-1.5*4,3.1,46.15-7.5-3,1.5,0.25,2,[-25,0,0],[1.2,1.2,1.2],false,false);
box(28-1.5*5,3.5,49.5-7-3,1.5,0.25,6,false,[1.2,0,0],false,false);
box(28-1.5*5,3.1,46.15-7.5-3,1.5,0.25,2,[-25,0,0],[1.2,0,0],false,false);
box(28-1.5*6,3.5,49.5-7-3,1.5,0.25,6,false,[1.2,1.2,1.2],false,false);
box(28-1.5*6,3.1,46.15-7.5-3,1.5,0.25,2,[-25,0,0],[1.2,1.2,1.2],false,false);
box(28-1.5*7,3.5,49.5-7-3,1.5,0.25,6,false,[1.2,0,0],false,false);
box(28-1.5*7,3.1,46.15-7.5-3,1.5,0.25,2,[-25,0,0],[1.2,0,0],false,false);
box(28-1.5*8,3.5,49.5-7-3,1.5,0.25,6,false,[1.2,1.2,1.2],false,false);
box(28-1.5*8,3.1,46.15-7.5-3,1.5,0.25,2,[-25,0,0],[1.2,1.2,1.2],false,false);
box(28-1.5*9,3.5,49.5-7-3,1.5,0.25,6,false,[1.2,0,0],false,false);
box(28-1.5*9,3.1,46.15-7.5-3,1.5,0.25,2,[-25,0,0],[1.2,0,0],false,false);
box(28-1.5*4.5,3.5,49.5-7-3,15,0.5,6,false,[1.2,0,0],true,false,false);
box(28-1.5*4.5,3.1,46.15-7.5-3,15,0.5,2,[-25,0,0],[1.2,0,0],true,false,false);

box(13.5,-0.3,40-3,0.4,4,0.8,false,[1.05,1.05,1.05],false,false);
box(13.5,-0.3,42-3,0.4,4,0.8,false,[1.05,1.05,1.05],false,false);
box(13.5,-0.3,44-3,0.4,4,0.8,false,[1.05,1.05,1.05],false,false);
box(13.5,-0.3,38-3,0.4,4,0.8,false,[1.05,1.05,1.05],false,false);
box(13.5,-0.3,36-3,0.4,4,0.8,false,[1.05,1.05,1.05],false,false);
box(13.5,0.8,39-1.5,0.4,12,0.5,[91,0,0],[1.05,1.05,1.05],false,false);
box(13.5,-0.3,39-1.5,0.4,12,0.5,[88,0,0],[1.05,1.05,1.05],false,false);
box(13.5,-0.3,39-3,0.4,4,12,false,[1.05,1.05,1.05,0.5],true,false,false);
box(20.75,-2,42,14,7.375,0.5,false,[0.4,0.25,0.08],true,false);
box(20.75,-1.5,42.15,13.9,9.75,0.75,false,[0.4,0.3,0.2,0.9],true,false);
box(21.25,-1.5,49.5-7-3,15,0.25,10,false,[0.9,0,0],false,false);

box(-15,0,57.25,91,4,30,false,[0.9,0.9,0.1],true,false);

function sunflower(x,y,z,s,f){
    
   
   cylinder(x+0.15*s,y,z-0.15*s,0.4*s,1.5*s,10,0,0.6,0,1,90,0,0,0.4*s);
   cylinder(x,y+1.5*s,z,0.4*s,1.5*s,10,0,0.6,0,1,90,0,0,0.4*s);

   cylinder(x,y+3.2*s,z,0.75*s,0.9*s,10,0.5,0.4,0.1,1,0.001,f?0:-90,0,0.75*s);

   if(f){
         
       for(let j=0;j<6.28318;j+=6.28318/5){
       
           cylinder(x+Math.sin(j)*s,y+3.2*s+Math.cos(j)*s,z,0.7*s,0.8*s,10,1.1,1.1,0,1);
       }
    } else {
        
       for(let j=0;j<6.28318;j+=6.28318/5){
       
           cylinder(x,y+3.2*s+Math.sin(j)*s,z+Math.cos(j)*s,0.7*s,0.8*s,10,1.1,1.1,0,1,0.001,-90,0);
       }
    }
}

sunflower(26,-1,30,0.8,0)
sunflower(15,-1,19,0.7,0)
sunflower(26.4,-1,19,0.5,0)
sunflower(16,-1,15,0.875,1)
sunflower(16,-1,15,0.875,1)


function mushroom(x,y,z,s){
    
    cylinder(x,y,z,0.4*s,s*2,10,0.9,0.9,0.6,1,90,0,0,0.4*s);
    cylinder(x,y+1.375*s,z,1.4*s,s,10,1,0,0,1,90,0,0);
    cylinder(x,y+2.125*s,z,1.4*s,s*0.5,10,1,0,0,1,90,0,0,s*0.6);
    box(x+1.375*s,y+s*1.4,z,0.4*s,s*0.1,0.4*s,[0,30,90],[1.1,1.1,1.1],false,false);
    box(x+0.45*s,y+s*2,z-s*1,0.5*s,s*0.1,0.5*s,[80,-60,90],[1.1,1.1,1.1],false,false);
    box(x-1*s,y+s*2.1,z,0.5*s,s*0.1,0.5*s,[0,0,35],[1.1,1.1,1.1],false,false);
    box(x,y+s*1.55,z+s*1.35,0.5*s,s*0.5,0.1*s,[0,0,20],[1.1,1.1,1.1],false,false);
    box(x-s*0.95,y+s*1.55,z-s*0.95,0.5*s,s*0.5,0.1*s,[0,45,0],[1.1,1.1,1.1],false,false);
    box(x+0.6*s,y+s*2.175,z+s*0.6,0.5*s,s*0.1,0.5*s,[32,45,0],[1.1,1.1,1.1],false,false);

}

mushroom(9,1,32,2.5,0)
mushroom(-3,0,38,1.3,0)
mushroom(-6,-1,29,0.5,0)
box(5.5,-1.25,41.5,5,4,6,[0,62,0],[0,0.5,0],false,true);
box(5.5,-0.1,41.5,3,4,4,[0,22,0],[0,0.5,0],false,true);

function strawberry(x,y,z,s,f){
    
    cylinder(x,y+1.375*s,z,s,s,10,1,0,0,1,90,0,0,0.8*s);
    cylinder(x,y+2.125*s,z,0.8*s,s*0.5,10,1,0,0,1,90,0,0,0);
    cylinder(x,y+0.725*s,z,0.5*s,s*0.3,10,1,0,0,1,90,0,0,s);

    for(let i=0;i<6.28318;i+=6.28318/4){

        box(x+Math.sin(i)*0.5*s,y+0.5*s,z+Math.cos(i)*0.5*s,1*s,s*0.15,1*s,[Math.random()*20+7,i*59.29578,0],[0,0.6,0],false,false);
    }

    box(x+0.7*s,y+1.4*s,z+0.5*s,0.1*s,s*0.1,0.1*s,false,[0.8,0.8,0.6],false,false);
    box(x-0.76*s,y+1.7*s,z-0.3*s,0.1*s,s*0.1,0.1*s,false,[0.8,0.8,0.6],false,false);
    box(x-0.3*s,y+1.4*s,z-0.82*s,0.1*s,s*0.1,0.1*s,false,[0.8,0.8,0.6],false,false);
    box(x+0.3*s,y+1.6*s,z-0.8*s,0.1*s,s*0.1,0.1*s,false,[0.8,0.8,0.6],false,false);
    box(x+0.2*s,y+2.15*s,z-0.2*s,0.1*s,s*0.1,0.1*s,false,[0.8,0.8,0.6],false,false);
    box(x+0*s,y+2.15*s,z+0.3*s,0.1*s,s*0.1,0.1*s,false,[0.8,0.8,0.6],false,false);
    box(x-0.58*s,y+1.65*s,z+0.58*s,0.1*s,s*0.1,0.1*s,false,[0.8,0.8,0.6],false,false);
    box(x+0.85*s,y+1.25*s,z-0.25*s,0.1*s,s*0.1,0.1*s,false,[0.8,0.8,0.6],false,false);
    box(x-0.15*s,y+1.3*s,z+0.85*s,0.1*s,s*0.1,0.1*s,false,[0.8,0.8,0.6],false,false);
    box(x+0.67*s,y+1.9*s,z+0.2*s,0.1*s,s*0.1,0.1*s,false,[0.8,0.8,0.6],false,false);
    box(x-0.87*s,y+1.3*s,z+0*s,0.1*s,s*0.1,0.1*s,false,[0.8,0.8,0.6],false,false);
    box(x-0.3*s,y+2.1*s,z-0.2*s,0.1*s,s*0.1,0.1*s,false,[0.8,0.8,0.6],false,false);
}

strawberry(21,2.1,48.5,1.25)
strawberry(20,2.1,60,2)
strawberry(18,2.1,59,0.9)
strawberry(9,2.1,48,1)
strawberry(8,2.1,60,1.5)

box(17.27,0.9995,44.5,14,5,4,[0,0,20],[0.2,0.6,1.2],true,false);
box(25,3.074,55.564,4,12,20,[-22.97,0,0],[0.2,0.6,1.2],true,false);
box(26,2.74,44.5,6,6,4,false,[0.2,0.6,1.2],true,false);

box(-11,4.5,62,7,8,3,false,[0,0,0,0.95],false,false);
box(-6.5,4.5,62,3,7,3.75,[0,0,10],[0.4,0.4,0.4],false,true);
box(-8.5,8,62,3,3,3.75,[0,0,50],[0.4,0.4,0.4],false,true);
box(-10.5,8.5,62,3,3,3.75,[0,0,90],[0.4,0.4,0.4],false,true);
box(-13,8,62,4,3,3.75,[0,0,35],[0.4,0.4,0.4],false,true);
box(-15,4,62,3,7,3.75,[0,0,-5],[0.4,0.4,0.4],false,true);

box(-16,3,59,0.2,10,0.1,[28,20,0],[1.2,1.2,1.2],false,false);
box(-17,6,60,0.2,10,0.1,[38,0,0],[1.2,1.2,1.2],false,false);
box(-18,6,60,0.2,10,0.1,[38,20,0],[1.2,1.2,1.2],false,false);
box(-16,6,60,0.2,10,0.1,[38,-20,0],[1.2,1.2,1.2],false,false);
box(-19,6,60.5,0.2,10,0.1,[38,40,0],[1.2,1.2,1.2],false,false);
box(-18,4,60.5,0.2,10,0.1,[38,-40,0],[1.2,1.2,1.2],false,false);
box(-18,4,60.5,0.2,10,0.1,[38,40,0],[1.2,1.2,1.2],false,false);
box(-19,4,60.5,0.2,10,0.1,[38,10,0],[1.2,1.2,1.2],false,false);
box(-15,4,59.5,0.2,10,0.1,[38,30,0],[1.2,1.2,1.2],false,false);
box(-16+13,3,59,0.2,10,0.1,[28,20,0],[1.2,1.2,1.2],false,false);
box(-17+13,6,60,0.2,10,0.1,[38,0,0],[1.2,1.2,1.2],false,false);
box(-18+13,6,60,0.2,10,0.1,[38,20,0],[1.2,1.2,1.2],false,false);
box(-16+13,6,60,0.2,10,0.1,[38,-20,0],[1.2,1.2,1.2],false,false);
box(-19+13,6,60.5,0.2,10,0.1,[38,40,0],[1.2,1.2,1.2],false,false);
box(-17+13,4,59,0.2,10,0.1,[38,-50,0],[1.2,1.2,1.2],false,false);
box(-18+13,4,60.5,0.2,10,0.1,[38,-40,0],[1.2,1.2,1.2],false,false);
box(-19+13,4,60.5,0.2,10,0.1,[38,10,0],[1.2,1.2,1.2],false,false);
box(-14+13,4,59.5,0.2,10,0.1,[38,-30,0],[1.2,1.2,1.2],false,false);

box(-11,-4.62,36.8,7,10,14,[-15,0,0],[0.9,0.9,0.1],true,false);
box(-27+20,34-30,68.76-25.5,2,10,2,false,[0.3,0.6,1],true,false);
box(-35+20,34-30,68.76-25.5,2,10,2,false,[0.3,0.6,1],true,false);
box(-31+20,38-30,68.76-25.5,2,10,2,[0,0,90],[0.3,0.6,1],true,false);
box(-28+20,36.75-30,68.76-25.5,2,3.5,2,[0,0,45],[0.3,0.6,1],true,false);
box(-34+20,36.75-30,68.76-25.5,2,3.5,2,[0,0,-45],[0.3,0.6,1],true,false);
box(-31+20,34-30,68.76-25.5,8,9,1.8,[0,0,90],[0,0.8,0,0.6],false,false);

box(-4.5,3.5,42.5,0.8,4,0.4,false,[1.05,1.05,1.05],false,false);
box(-4.5+2,3.5,42.5,0.8,4,0.4,false,[1.05,1.05,1.05],false,false);
box(-4.5+4,3.5,42.5,0.8,4,0.4,false,[1.05,1.05,1.05],false,false);
box(-4.5+6,3.5,42.5,0.8,4,0.4,false,[1.05,1.05,1.05],false,false);
box(-4.5+6,3.5,42.5,0.8,4,0.4,false,[1.05,1.05,1.05],false,false);
box(-4.5+2,4.5,42.5,0.5,8,0.4,[0,0,92],[1.05,1.05,1.05],false,false);
box(-4.5+2,3.25,42.5,0.5,8,0.4,[0,0,89],[1.05,1.05,1.05],false,false);
box(-2.1,3,42.5-0.05,5,8,0.5,[0,0,90],[1.05,1.05,1.05],true,false,false);

box(-17,3.5,42.5,0.8,4,0.4,false,[1.05,1.05,1.05],false,false);
box(-17-2,3.5,42.5,0.8,4,0.4,false,[1.05,1.05,1.05],false,false);
box(-17-4,3.5,42.5,0.8,4,0.4,false,[1.05,1.05,1.05],false,false);
box(-17-6,3.5,42.5,0.8,4,0.4,false,[1.05,1.05,1.05],false,false);
box(-17-6,3.5,42.5,0.8,4,0.4,false,[1.05,1.05,1.05],false,false);
box(-17-2,4.5,42.5,0.5,8,0.4,[0,0,90],[1.05,1.05,1.05],false,false);
box(-17-2,3.25,42.5,0.5,8,0.4,[0,0,86],[1.05,1.05,1.05],false,false);
box(-19.4,3,42.5-0.05,5,8,0.5,[0,0,90],[1.05,1.05,1.05],true,false,false);

function bamboo(x,y,z){
    
    cylinder(x,y,z,0.3,7,10,0.4,0.7,0.4,1,90,0,0);
    cylinder(x,y+0.5,z,0.35,0.5,10,0.2,0.5,0.3,1,90,0,0);
    cylinder(x,y-2.5,z,0.35,0.5,10,0.2,0.5,0.3,1,90,0,0);
    cylinder(x,y+3.5,z,0.35,0.5,10,0.2,0.5,0.3,1,90,0,0);

    for(let i=3;i<10;i++){
         
         box(x,y+i-6,z,0.95,0.2,0.2,[0,Math.random()*360,Math.random()*100-50],[0.15,0.6,0.3],false,false);
    }

}

bamboo(-34,5.5,61)
bamboo(-36,5.3,61)
bamboo(-35,5.1,60)
bamboo(-52,5.5,60.5)
bamboo(-50.5,5.3,61)

box(-38,3.5,45.75,13,4,7,false,[0.9,0.9,0.1],true,false);
box(-54.5,0.48,54.8,4,5,20,[20,0,0],[0.2,0.6,1.2],true,false);
box(-58.5,4.25,54.9,4,10,20,[-21,0,0],[0.2,0.6,1.2],true,false);
box(-56.5,3.75,44.26,8,5,4,false,[0.2,0.6,1.2],true,false);

box(-70.49,7,49,20,30,13.5,false,[0.5,0.5,0.5],true,true);
box(-78,8.71,57.85,5,20,18,[33,0,0],[0.5,0.5,0.5],true,true);
box(-84.5,9,61,8,20,8,false,[0.4,0.4,0.4],true,true);
box(-110.5,0,95,100,25,100,false,[0.2,0.7,0.2],true,false);

box(-37-7.5,19.255-7,85.5,0.5,15,14.95,[0,0,90],[1.1,1.1,0.1],false,false);
box(-37-7.5,19.255+5,85.5,0.5,15.495,14.95,[0,0,90],[1.2,0.95,0.1],true,false);
box(-37,17.5,85.5,0.5,14,15,false,[1.2,0.95,0.1],true,false);
box(-37-15,17.5,85.5,0.5,14,15,false,[1.2,0.95,0.1],true,false);
box(-37-7.5,17.5,85.5+7.5,0.5,14,15.5,[0,90,0],[1.2,0.95,0.1],true,false);
box(-37-7.5,17.5+3.5,85.5-7.25,0.5,7,15.5,[0,90,0],[1.2,0.95,0.1],true,false);
box(-37-7.5,17.5+3,85.5-7.25,0.6,4,15.49,[0,90,0],[1.2,1.2,1.2],true,false);
box(-37-7.5+4,17.5,85.5-7.25,0.4,14,7,[0,90,0],[0.5,0.5,0,0.5],true,false);
box(-37-7.5-5.75,17.5,85.5-7.25,0.4,14,3.95,[0,90,0],[0.5,0.5,0,0.5],true,false);

box(-65,15.6,95,15,50,4,false,WALL,true,false);
box(-76.5,15.6,115.25,45,50,4,[0,75,0],WALL,true,false);
box(-97,15.6,130,45,50,4,[0,170,0],WALL,true,false);
box(-113,15.6,97,4,50,60,false,WALL,true,false);
box(-100,15.6,59,4,50,30,[0,-60,0],WALL,true,false);
box(-110.5,15.6,55,4,50,60,[0,-90,0],WALL,true,false);
box(-82.5,15.6,5.75+1,4,50,100,false,WALL,true,false);

cylinder(-95,14,82,18,4,9,0.5,0.25,0.05,1,90,0,0,13);
cylinder(-95,14,82,18,4,9,0.5,0.25,0.05,1,90,180/9,0,13);
cylinder(-95,14.01,82,11,4,20,0.5*2.5,0.4*2.5,0.1*2.5,1,90,0,0);
box(-110,14,81,10,4,15,false,[0.5*0.75,0.25*0.75,0.05*0.75],true,false);

box(-95,15,80,11,2,12,false,[1,1,1],true,false,false);

for(let i=210;i<360+180;i+=360/13){
    
    box(-95+Math.cos(i*0.017253)*14.5,13.25,82+Math.sin(i*0.017253)*14.5,7,2,6,[42,95-i,0],[1,1,1],true,false,false);
    box(-95+Math.cos(i*0.017253)*8,15,82+Math.sin(i*0.017253)*8,8,2,8,[0,i,0],[1,1,1],true,false,false);
}


box(-110,18,81-5,5,5,3,false,[0.5,0.5,0.5],false,true);
box(-110,18,81+5,5,5,3,false,[0.5,0.5,0.5],false,true);
box(-110,21,81+4,5,5,3,[-30,0,0],[0.5,0.5,0.5],false,true);
box(-110,21,81-4,5,5,3,[30,0,0],[0.5,0.5,0.5],false,true);
box(-110,22.5,81,5,8,2.5,[90,0,0],[0.5,0.5,0.5],false,true);
box(-110.5,18,81,5,8,8,false,[0,0,0],false,true);

function pineapple(x,y,z,s){
    
    sphere(x,y,z,s,1,1,0.9,0.1,1,1.25);
    box(x,y+s*0.5,z+0.1*s,0.4*s,0.9*s,0.1*s,[45,0,0],[0,0.6,0],false,false);
    box(x+0.1*s,y+s*0.5,z,0.4*s,0.9*s,0.1*s,[45,90,0],[0,0.6,0],false,false);
    box(x,y+s*0.5,z-0.1*s,0.4*s,0.9*s,0.1*s,[45,180,0],[0,0.6,0],false,false);
    box(x-0.1*s,y+s*0.5,z,0.4*s,0.9*s,0.1*s,[45,270,0],[0,0.6,0],false,false);
    box(x,y+s*0.5,z,0.4*s,1*s,0.1*s,[30,0+45,0],[0,0.6,0],false,false);
    box(x,y+s*0.5,z,0.4*s,1*s,0.1*s,[30,90+45,0],[0,0.6,0],false,false);
    box(x,y+s*0.5,z,0.4*s,1*s,0.1*s,[30,180+45,0],[0,0.6,0],false,false);
    box(x,y,z,0.95*s,0.95*s*1.25,0.95*s,false,[0,0.6,0,0.4],true,false,false);
    
    box(x,y+s*0.5,z,0.4*s,1*s,0.1*s,[30,270+45,0],[0,0.6,0],false,false);
}

pineapple(-55,13.5,78,4)
pineapple(-70,13.5,78,2.5)
pineapple(-72.5,15,90,6)

box(-69,35-21,89-30,2.5,3,7,[0,90,0],[1,1,1],true,false);
box(-69-Math.sin(90*0.017453)*0.8,35-21,89-30+Math.cos(90*0.017453)*0.8,2.5,7,2.5,[0,90,0],[1,1,1],true,false);
box(-69-Math.sin(90*0.017453)*0.8,38.75-21,89-30+Math.cos(90*0.017453)*0.8,2.5,0.5,2.5,[0,90,0],[0,1,0],false,false);
box(-69-Math.sin(90*0.017453)*0.8,37.4-21,89-30+Math.cos(90*0.017453)*0.8,2.55,1,1,[0,90,0],[1,0.7,0],false,false);
box(-69-Math.sin(90*0.017453)*2.25,35.25-21,89-30+Math.cos(90*0.017453)*2.25,2.55,1.5,1.6,[0,90,0],[0.5,0.5,0.5],false,false);
box(-69-Math.sin(90*0.017453)*-1.4,35.25-21,89-30+Math.cos(90*0.017453)*-1.4,2.55,1.5,3.3,[0,90,0],[0.5,0.5,0.5],false,false);

box(-103,16,115,50,10,30,[0,-30,0],[0.5,0.5,0.5],true,true);
box(-83,13.5,107,7,10,8,[0,40,0],[0.42,0.42,0.42],true,true);
box(-83,11,107,40,10,20,[0,10,0],[0.42,0.42,0.42],true,true);
box(-95,18,102.5,3,3,0.5,[-35*0.4,-25,35],[0.33,0.33,0.33],false,true);
box(-105,15,96.7,6,6,0.5,[-25*0.5,-28,27],[0.33,0.33,0.33],false,true);

box(-103,21.5,122.5,14,1,1.5,false,[0,0.1,0.6],true,false);
box(-103,21.5,104,14,1,1.5,false,[0,0.1,0.6],true,false);
box(-109.5,21.5,(104+122.5)*0.5,20,1,1.5,[0,90,0],[0,0.1,0.6],true,false);
box(-95.5,21.5,105.75,5,1,1.5,[0,90,0],[0,0.1,0.6],true,false);
box(-95.5,21.5,120.75,5,1,1.5,[0,90,0],[0,0.1,0.6],true,false);
box(-93.25,21.5,118,6,1,1.5,false,[0,0.1,0.6],true,false);
box(-93.25,21.5,118,6,1,1.5,false,[0,0.1,0.6],true,false);
box(-93.25,21.5,108,6,1,1.5,false,[0,0.1,0.6],true,false);
box(-91,21.5,109,2,1,1.5,[0,90,0],[0,0.1,0.6],true,false);
box(-91,21.5,117,2,1,1.5,[0,90,0],[0,0.1,0.6],true,false);

box(-102.5,21.5,122.5,14,15,0.75,false,[1,0.7,0.6],true,false);
box(-102.5,21.5,104,14,15,0.75,false,[1,0.7,0.6],true,false);
box(-109.5,21.5,(104+122.5)*0.5,19.25,15,0.75,[0,90,0],[1,0.7,0.6],true,false);
box(-95.5,21.5,106,4.75,15,0.75,[0,90,0],[1,0.7,0.6],true,false);
box(-95.5,21.5,120.5,4.75,15,0.75,[0,90,0],[1,0.7,0.6],true,false);
box(-93.25,21.5,118,5.25,15,0.75,false,[1,0.7,0.6],true,false);
box(-93.25,21.5,118,5.25,15,0.75,false,[1,0.7,0.6],true,false);
box(-93.25,21.5,108,5.25,15,0.75,false,[1,0.7,0.6],true,false);
box(-91,21.5,109,2,15,0.75,[0,90,0],[1,0.7,0.6],true,false);
box(-91,21.5,117,2,15,0.75,[0,90,0],[1,0.7,0.6],true,false);
box(-91,27,112.5,7,4,0.75,[0,90,0],[1,0.7,0.6],true,false);

box(-91,21.5,116,2,7,1.5,[0,90,0],[0,0.1,0.6],true,false);
box(-91,21.5,110,2,7,1.5,[0,90,0],[0,0.1,0.6],true,false);
box(-91,27,113,4,5,1.5,[0,90,0],[0,0.1,0.6],true,false);
box(-91,22,113,4,5,1.22,[0,90,0],[0,0.8,0,0.6],false,false);

box(-93,29.375,113,12,0.75,6,[0,90,0],[0,0.1,0.6],true,false);
box(-102.5,29.375,113,20,0.75,16,[0,90,0],[0,0.1,0.6],true,false);

box(-93,20.7,113,11,0.75,5,[0,90,0],[0.3,0.5,0.7],false,false);
box(-102.5,20.7,113,19,0.75,15,[0,90,0],[0.3,0.5,0.7],false,false);
box(-102.5,20.7,113,4,1,13,[0,90,0],[0,0.1,0.6],false,false);

box(-88,20.7,113,5,1,6,[0,90,0],[0,0.1,0.6],false,false);

box(-61-1,14,62,0.4,4,0.8,false,[1.05,1.05,1.05],false,false);
box(-61-1,14,62-2,0.4,4,0.8,false,[1.05,1.05,1.05],false,false);
box(-61-1,14,62-4,0.4,4,0.8,false,[1.05,1.05,1.05],false,false);
box(-61-1,14,62-6,0.4,4,0.8,false,[1.05,1.05,1.05],false,false);
box(-61-1,13.75,62-3,0.4,8,0.5,[93,0,0],[1.05,1.05,1.05],false,false);
box(-61-1,14.75,62-3,0.4,8,0.5,[89,0,0],[1.05,1.05,1.05],false,false);
box(-61-1,14,62-3,0.5,8,4,[90,0,0],[1.05,1.05,1.05,0.5],true,false,false);

box(-27-27.5,34-20,68.76-5.25,2,10,2,false,[0.3,0.6,1],true,false);
box(-35-27.5,34-20,68.76-5.25,2,10,2,false,[0.3,0.6,1],true,false);
box(-31-27.5,38-20,68.76-5.25,2,10,2,[0,0,90],[0.3,0.6,1],true,false);
box(-28-27.5,36.75-20,68.76-5.25,2,3.5,2,[0,0,45],[0.3,0.6,1],true,false);
box(-34-27.5,36.75-20,68.76-5.25,2,3.5,2,[0,0,-45],[0.3,0.6,1],true,false);
box(-31-27.5,34-20,68.76-5.25,8,9,1.8,[0,0,90],[0,0.8,0,0.6],false,false);

function rose(x,y,z,s){

    box(x,y,z,0.35*s,8,0.35*s,false,[0,0.35,0],false,false);

    for(let i=0;i<6.28318;i+=6.28318/7){
    
        let ox=Math.sin(i)*1.5,oz=Math.cos(i)*1.5;
        box(x+ox*s,y+4.5,z+oz*s,s*1.8,0.2*s,s*(2+(Math.random()-0.5)*0.5),[-30+(Math.random()-0.5)*45,i*59.29578,0],[0.9,0,0],false,false);
        box(x+ox*s*0.5,y+4.5,z+oz*s*0.5,s*1.4,0.2*s,s*(2.2+(Math.random()-0.5)*0.5),[-60+(Math.random()-0.3)*25,i*59.29578,0],[0.9,0,0],false,false);
        box(x+ox*s*0.25,y+4.75,z+oz*s*0.25,s*1.4,0.2*s,s*(2.5+(Math.random()-0.5)*0.15),[-60+(Math.random()-0.5)*65,i*59.29578,0],[0.9,0,0],false,false);
    
    }
}

rose(50,1,34,1.3);
rose(33,-1,30,0.5);
rose(36,0,43,0.75);
box(58.5,0,41,13,10,13,[0,40,0],[0.4,0.4,0.4]);
box(55,0,36,8,7,8,[0,10,0],[0.4,0.4,0.4]);

box(56,0,62.5,23,25,35,false,[0.2,0.7,0.2],true,false);
box(-5,0,82.5,150,25,40,false,[0.2,0.7,0.2],true,false);
box(-25,0,82.5,110,25,40.15,false,[0.2,0.7,0.2],false,false);
box(43,-5.6,51.8,6,37,20,[59,0,0],[0.2,0.5,1.1],true,false);
box(58,0,90,4,62,28,false,WALL,true,false);
box(60.595,0,74.215,4,62,9,[0,-45,0],WALL,true,false);
box(64,25.25,60,4,11.5,35,false,WALL,true,false);
box(53,15,90,016,6,20,false,[0.4,0.4,0.4]);
box(53,13,81,10,5,10,[0,40,0],[0.45,0.45,0.45]);
///box(53,12,76,9,5,7,[0,15,0],[0.35,0.35,0.35]);

function pineTree(x,y,z,s){

    box(x,y-1*s,z,0.6*s,8.5*s,0.6*s,false,[0.3,0.2,0],false,false);

    for(let i=0;i<3;i++){

       for(let j=0;j<6.28318;j+=6.28318/5){

           
           let ox=Math.sin(j)*(2+(i-1)*0.75),oz=Math.cos(j)*(2+(i-1)*0.75);

           box(x+ox*s,y-(i-1)*s*8/3,z+oz*s,s*(3+(i-1)*0.75),0.5*s,s*(3.5+(i-1)*0.25),[50,j*59.29578,0],[0,0.5,0],false,false)
           
           
           
       }
    }
}

pineTree(30,16,90,0.7);
pineTree(41.5,17,91,1);
pineTree(45,15,75.5,0.5);

function cactus(x,y,z,s,r){

    
    cylinder(x,y,z,0.5*s,6*s,15*s,0,0.8,0,1,90,0,0,0.5*s,false);
    sphere(x,y+3*s,z,s,1,0,0.8,0,1);
    cylinder(x,y,z,0.5*s,4*s,15*s,0,0.8,0,1,0,0,0,0.5*s,false);
    sphere(x,y,z-s*2*r,1.05*s,1,0,0.8,0,1);
    sphere(x,y,z+2*s*r,1.1*s,1,0,0.8,0,1);
    cylinder(x,y+s,z+2*s*r,0.5*s,2*s,15*s,0,0.8,0,1,90,0,0,0.5*s,false);
    sphere(x,y+2*s,z+2*s*r,s,1,0,0.8,0,1);

    box(x+0.5*s,y,z+0.5*s*r,0.15,0.15,0.15,false,[0.5,0.5,0.5],false,false);
    box(x-0.5*s,y+s,z+0.25*s*r,0.15,0.15,0.15,false,[0.5,0.5,0.5],false,false);
    box(x-0.4*s,y+s*2,z-0.4*s*r,0.15,0.15,0.15,false,[0.5,0.5,0.5],false,false);
    box(x+0.4*s,y+s*2.5,z-0.4*s*r,0.15,0.15,0.15,false,[0.5,0.5,0.5],false,false);
    box(x+0.4*s,y+s*1.5,z+0.4*s*r,0.15,0.15,0.15,false,[0.5,0.5,0.5],false,false);
    box(x+0.5*s,y+s*0.7,z+2.25*s*r,0.15,0.15,0.15,false,[0.5,0.5,0.5],false,false);
    box(x-0.5*s,y-s*0.2,z+1.5*s*r,0.15,0.15,0.15,false,[0.5,0.5,0.5],false,false);
    box(x,y+s*1.2,z+1.5*s*r,0.15,0.15,0.15,false,[0.5,0.5,0.5],false,false);
    box(x-0.3*s,y+s*1.5,z+2.5*s*r,0.15,0.15,0.15,false,[0.5,0.5,0.5],false,false);
    box(x-0.5*s,y-s,z+0.25*s*r,0.15,0.15,0.15,false,[0.5,0.5,0.5],false,false);
    box(x-0.4*s,y-s*2,z-0.4*s*r,0.15,0.15,0.15,false,[0.5,0.5,0.5],false,false);
    box(x+0.4*s,y-s*2.5,z-0.4*s*r,0.15,0.15,0.15,false,[0.5,0.5,0.5],false,false);
    box(x+0.4*s,y-s*1.5,z+0.4*s*r,0.15,0.15,0.15,false,[0.5,0.5,0.5],false,false);
    box(x+0.2*s,y+s*0.5,z-1.5*s*r,0.15,0.15,0.15,false,[0.5,0.5,0.5],false,false);
    box(x-0.2*s,y-s*0.5,z-1.5*s*r,0.15,0.15,0.15,false,[0.5,0.5,0.5],false,false);

}

cactus(21,15.5,74,1,-1);
cactus(4,15.5,67,1,1);

function pumpkin(x,y,z,s){

    let shade=Math.random()*0.1+0.9
    sphere(x,y,z,s,1,shade,0.5*shade,0,1);
    box(x,y+s*0.4,z,0.1*s,0.5*s,0.1*s,[(Math.random()-0.5)*40,Math.random()*360,0],[0,0.5,0],false,false);

}

pumpkin(4.5,13.8,87,3);
pumpkin(6.5,13,87.5,2);
pumpkin(20,13,78,2);


box(-17.1,6,80,40,30,35.05,false,[0.65,0.65,0.65]);
box(6.05,6.85,91,20,21,5,[0,0,-31],[0.65,0.65,0.65]);
box(-23.25+2.28,18,86.5,32.25,30.01,37.5,false,[0.48,0.48,0.48]);
box(-32.9,25.5,65.475-0.39,8.45,15,5.25,false,[0.65,0.65,0.65]);
box(-38,34,66,5,8,8,false,[0.6,0.6,0.6]);
box(-4.75,20.15,73.75,15,2,22.5,false,[1.2,1.2,1.2],false,false);
box(2.39,20.15,73.75,1,4,22.5,false,[1.2,1.2,1.2],true,false);
box(-4.75,20.15,63,15,4,1,false,[1.2,1.2,1.2],true,false);
box(-21.25,19.21,77.47,27.5,15,30,[0,0,-33.1],[0.65,0.65,0.65]);d

box(20,9.2,95,82.5,62,4,[0,0,-15],WALL,true,false);
box(-47.6,15.25,95,35,62,4,[0,0,15],WALL,true,false);
box(-10,13,95,15,62,4,false,WALL,true,false);
box(-38,13,95,15,62,4,false,WALL,true,false);
box(-25,45.25,95,27.5,9,4,false,WALL,true,false);

box(-22.25,32,69.75,8,10,4,false,[0.48,0.48,0.48]);
box(-25,38,69,4,4,4.5,[0,0,20],[0.48,0.48,0.48]);
box(-27,34,68.76,2,10,2,false,[0.3,0.6,1],true,false);
box(-35,34,68.76,2,10,2,false,[0.3,0.6,1],true,false);
box(-31,38,68.76,2,10,2,[0,0,90],[0.3,0.6,1],true,false);
box(-28,36.75,68.76,2,3.5,2,[0,0,45],[0.3,0.6,1],true,false);
box(-34,36.75,68.76,2,3.5,2,[0,0,-45],[0.3,0.6,1],true,false);
box(-31,34,68.76,8,9,1.8,[0,0,90],[0,0.8,0,0.6],false,false);

cylinder(30.85,5.5,-8,1.2,6,10,1,0,0,1,-40,-35,0,1.2);
box(33,3,-8.5,1,2.5,2.5,[0,-35,0],[0.1,0.1,0.1],false,false);
box(30.6,3,-10.2,1,2.5,2.5,[0,-35,0],[0.1,0.1,0.1],false,false);

box(-18,39,74,0.5,15,12.45,false,[0.35,0.35,0.35]);
box(-5.1,39,74,0.5,15,12.45,false,[0.35,0.35,0.35]);
box(-7.3-0.25,39,79.975,4.5,15,0.5,false,[0.35,0.35,0.35]);
box(-15.8+0.25,39,79.975,4.5,15,0.5,false,[0.35,0.35,0.35]);
box((-15.8-7.3)*0.5,41.5,79.975,3.5,10,0.5,false,[0.35,0.35,0.35,0.75],true,false);
box((-15.8-7.3)*0.5,39,68.05,12.5,15,0.5,false,[0.35,0.35,0.35,0.75],true,false);
box((-15.8-7.3)*0.5,46.248,(68+82)*0.5-1,13,0.5,12,false,[0.35,0.35,0.35,0.85],true,false);
box((-15.8-7.3)*0.5,42.95,68.05,12.4,3,0.525,[0,0,20],[1.1,1.1,.1],false,false);
box((-15.8-7.3)*0.5,36.5,68.05,12.4,3,0.525,[0,0,20],[0.2,0.2,0.2],false,false);
box(-40,30,91,10,8,15,[0,30,0],[0.6,0.6,0.6]);
box(-42,35,89,2.5,3,7,[0,30,0],[1,1,1],true,false);
box(-42+Math.sin(30*0.017453)*0.8,35,89+Math.cos(30*0.017453)*0.8,2.5,7,2.5,[0,30,0],[1,1,1],true,false);
box(-42+Math.sin(30*0.017453)*0.8,38.75,89+Math.cos(30*0.017453)*0.8,2.5,0.5,2.5,[0,30,0],[0,1,0],false,false);
box(-42+Math.sin(30*0.017453)*0.8,37.4,89+Math.cos(30*0.017453)*0.8,2.55,1,1,[0,30,0],[1,0.7,0],false,false);
box(-42+Math.sin(30*0.017453)*2.25,35.25,89+Math.cos(30*0.017453)*2.25,2.55,1.5,1.6,[0,30,0],[0.5,0.5,0.5],false,false);
box(-42+Math.sin(30*0.017453)*-1.4,35.25,89+Math.cos(30*0.017453)*-1.4,2.55,1.5,3.3,[0,30,0],[0.5,0.5,0.5],false,false);

box(-5,34.5,83.5,0.15,3,3,false,[1.1,1.1,1.1],true,false);
box(-5-1.5,34.5,83.5-1.5,0.15,3,3,[0,90,0],[1.1,1.1,1.1],true,false);
box(-5-1.5,34.5,83.5+1.5,0.15,3,3,[0,90,0],[1.1,1.1,1.1],true,false);
box(-5-1.5,34.5+1.75,83.5,0.15+0.5,3.25,3.25,[0,0,90],[0,1.1,0],true,false);


`

let mesh=new Mesh(true)

function UPDATE_MAP_MESH(){
    
    mesh.setMeshFromFunction(function(box,a,cylinder,sphere,d,e,star){
        
        let f=Object.constructor('box','a','cylinder','sphere','d','e','star',player.createdMesh.replaceAll('WALL','['+(0.3*MATH.map(player.isNight,NIGHT_DARKNESS,1,0,1)+','+(0.7*MATH.map(player.isNight,NIGHT_DARKNESS,1,0,1))+','+(1.2*MATH.map(player.isNight,NIGHT_DARKNESS,1,0,1))+']')))
        
        f(box,a,cylinder,sphere,d,e,star)
    })

    mesh.setBuffers()
}

UPDATE_MAP_MESH()

let flowers={},texSize=256/1024,texOffset=-1/1024

verts=[]
index=[]

let id=0

function addFlower(field,x,z){
    
    if(!flowers[field][z]) flowers[field][z]=[]
    
    let y=fieldInfo[field].y,c=fieldInfo[field].getColor(),l=fieldInfo[field].getLevel()
    
    flowers[field][z][x]={
        
        x:x,z:z,
        color:c,
        level:l,
        ogLevel:l,
        height:1,
        id:id++,
        y:y,
        goo:0,
        gooColor:noise(x*0.2+fieldInfo[field].x*10,z*0.2+fieldInfo[field].z*10)<0.499?-1:1,
        pollinationTimer:1
    }
    
    let vl=verts.length/8
    
    let h=flowers[field][z][x].height*0.5,tx,ty,lvl=flowers[field][z][x].level,g=flowers[field][z][x].goo*flowers[field][z][x].gooColor
    
    switch(flowers[field][z][x].color){
        
        case 'red':if(lvl===1){tx=0;ty=0;}else if(lvl===2){tx=256*3/1024;ty=0;}else if(lvl===3){tx=256*2/1024;ty=256/1024}else if(lvl===4){tx=256/1024;ty=256*2/1024}else if(lvl>=5){tx=0;ty=256*3/1024}break
        
        case 'blue':if(lvl===1){tx=256/1024;ty=0;}else if(lvl===2){tx=0;ty=256/1024}else if(lvl===3){tx=256*3/1024;ty=256/1024}else if(lvl===4){tx=256*2/1024;ty=256*2/1024}else if(lvl>=5){tx=256/1024;ty=256*3/1024}break
        
        case 'white':if(lvl===1){tx=256*2/1024;ty=0;}else if(lvl===2){tx=256/1024;ty=256/1024}else if(lvl===3){tx=0;ty=256*2/1024}else if(lvl===4){tx=256*3/1024;ty=256*2/1024}else if(lvl>=5){tx=256*2/1024;ty=256*3/1024}break
    }
    
    x+=fieldInfo[field].x
    z+=fieldInfo[field].z
    
    verts.push(
        
        x-0.5,y+h,z-0.5,texOffset+tx,texOffset+ty,1,1,g,
        x+0.5,y+h,z-0.5,texSize+tx,texOffset+ty,1,1,g,
        x+0.5,y+h,z+0.5,texSize+tx,texSize+ty,1,1,g,
        x-0.5,y+h,z+0.5,texOffset+tx,texSize+ty,1,1,g,
        
        x-0.5,y,z-0.5,0,0,1,-10000,0,
        x+0.5,y,z-0.5,0,0,1,-10000,0,
        x+0.5,y,z+0.5,0,0,1,-10000,0,
        x-0.5,y,z+0.5,0,0,1,-10000,0
    )
    
    index.push(vl+2,vl+1,vl,vl+3,vl+2,vl,vl+6,vl+5,vl+2,vl+7,vl+6,vl+2,vl+1,vl+5,vl+4,vl,vl+1,vl+4,vl+3,vl+7,vl+2,vl+4,vl+3,vl,vl+3,vl+4,vl+7,vl+1,vl+2,vl+5)
}

function updateFlower(field,x,z,func,updateHeight,updateGoo,updatePollination){
    
    func(flowers[field][z][x])
    
    flowers[field][z][x].height=MATH.constrain(flowers[field][z][x].height,0,1)
    
    let i=flowers[field][z][x].id*64
    
    if(updateHeight){
        
        let newHeight=flowers[field][z][x].y+Math.max(flowers[field][z][x].height*0.5,0.05)
        
        flowers.mesh.verts[i+1]=newHeight
        flowers.mesh.verts[i+9]=newHeight
        flowers.mesh.verts[i+17]=newHeight
        flowers.mesh.verts[i+25]=newHeight
        
        newHeight=Math.max(flowers[field][z][x].height,0)
        
        flowers.mesh.verts[i+5]=newHeight
        flowers.mesh.verts[i+13]=newHeight
        flowers.mesh.verts[i+21]=newHeight
        flowers.mesh.verts[i+29]=newHeight
    }
    
    if(updateGoo){
        
        let g=flowers[field][z][x].goo*flowers[field][z][x].gooColor*0.7
        
        flowers.mesh.verts[i+7]=g
        flowers.mesh.verts[i+15]=g
        flowers.mesh.verts[i+23]=g
        flowers.mesh.verts[i+31]=g
    }
    
    if(updatePollination){
        
        let tx,ty,lvl=flowers[field][z][x].level
        
        switch(flowers[field][z][x].color){
        
            case 'red':if(lvl===1){tx=0;ty=0;}else if(lvl===2){tx=256*3/1024;ty=0;}else if(lvl===3){tx=256*2/1024;ty=256/1024}else if(lvl===4){tx=256/1024;ty=256*2/1024}else if(lvl>=5){tx=0;ty=256*3/1024}break
            
            case 'blue':if(lvl===1){tx=256/1024;ty=0;}else if(lvl===2){tx=0;ty=256/1024}else if(lvl===3){tx=256*3/1024;ty=256/1024}else if(lvl===4){tx=256*2/1024;ty=256*2/1024}else if(lvl>=5){tx=256/1024;ty=256*3/1024}break
            
            case 'white':if(lvl===1){tx=256*2/1024;ty=0;}else if(lvl===2){tx=256/1024;ty=256/1024}else if(lvl===3){tx=0;ty=256*2/1024}else if(lvl===4){tx=256*3/1024;ty=256*2/1024}else if(lvl>=5){tx=256*2/1024;ty=256*3/1024}break
        }
        
        flowers.mesh.verts[i+3]=texOffset+tx
        flowers.mesh.verts[i+4]=texOffset+ty
        flowers.mesh.verts[i+11]=texSize+tx
        flowers.mesh.verts[i+12]=texOffset+ty
        flowers.mesh.verts[i+19]=texSize+tx
        flowers.mesh.verts[i+20]=texSize+ty
        flowers.mesh.verts[i+27]=texOffset+tx
        flowers.mesh.verts[i+28]=texSize+ty
        
    }
}

function collectPollen(params){
    
    if(player.pollen>=player.capacity||params.pattern.length<1){return 0}
    
    let f=fieldInfo[params.field||player.fieldIn],x=params.x,z=params.z,total={r:0,b:0,w:0},stackHeight=params.stackHeight||0.425,crit={r:params.alwaysCrit||Math.random()<player.criticalChance?(Math.random()<player.superCritChance?2:1):0,b:params.alwaysCrit||Math.random()<player.criticalChance?(Math.random()<player.superCritChance?2:1):0,w:params.alwaysCrit||Math.random()<player.criticalChance?(Math.random()<player.superCritChance?2:1):0},amount=typeof params.amount==='number'?{r:params.amount,b:params.amount,w:params.amount}:params.amount,pattern=params.pattern,balloon={r:0,b:0,w:0},multiplier=params.multiplier?typeof params.multiplier==='number'?{r:params.multiplier,b:params.multiplier,w:params.multiplier}:params.multiplier:{r:1,b:1,w:1},totalHoney=0,totalGoo=0,yOffset=params.yOffset||2
    
    multiplier.r*=player.redPollen*(crit.r===0?1:crit.r===1?player.criticalPower:player.criticalPower*player.superCritPower)
    multiplier.b*=player.bluePollen*(crit.b===0?1:crit.b===1?player.criticalPower:player.criticalPower*player.superCritPower)
    multiplier.w*=player.whitePollen*(crit.w===0?1:crit.w===1?player.criticalPower:player.criticalPower*player.superCritPower)
    
    for(let i in pattern){
        
        let p=pattern[i]
        
        let _x=x+p[0],_z=z+p[1]
        
        if(_x>=0&&_x<f.width&&_z>=0&&_z<f.length){
            
            updateFlower(params.field||player.fieldIn,_x,_z,function(f){
                
                let amountToCollect=Math.min(amount[f.color[0]],f.height*100),amp=amountToCollect*0.01
                
                f.height-=Math.min(params.depleteAll?f.height:amp/((f.level-1)*0.5+1),f.height)
                
                amountToCollect*=multiplier[f.color[0]]
                amountToCollect*=f.level
                
                if(f.goo){
                    
                    amountToCollect*=player.goo
                    totalGoo+=amountToCollect
                    
                    if(params.isGummyBaller){
                        
                        player.addEffect('gummyBall',(f.goo*0.45)/180)
                        f.goo*=0.5
                    }
                }
                
                if(params.replenish) f.height+=params.replenish
                if(params.gooTrail) f.goo=1
                
                if(f.balloon){
                    
                    amountToCollect*=f.color==='blue'?1.25:1.1
                    f.balloon.pollen+=f.balloon.golden?amountToCollect*1.15:amountToCollect
                    
                } else {
                    
                    total[f.color[0]]+=amountToCollect
                }
                
            },true,params.gooTrail||params.isGummyBaller,false)
        }
    }
    
    total.r=Math.round(total.r)
    total.b=Math.round(total.b)
    total.w=Math.round(total.w)
    balloon.r=Math.round(balloon.r)
    balloon.b=Math.round(balloon.b)
    balloon.w=Math.round(balloon.w)
    totalGoo=Math.round(totalGoo)
    
    if(player.setting_enablePollenText){
        
        let stack=[]
        
        if(total.w||balloon.w)stack.push({c:'white',v:total.w+balloon.w})
        if(total.r||balloon.r)stack.push({c:'red',v:total.r+balloon.r})
        if(total.b||balloon.b)stack.push({c:'blue',v:total.b+balloon.b})
        
        if(stack[1]&&stack[0].v>stack[1].v){
            
            let n=stack[0]
            stack[0]=stack[1]
            stack[1]=n
        }
        
        if(stack[2]&&stack[0].v>stack[2].v){
            
            let n=stack[0]
            stack[0]=stack[2]
            stack[2]=n
        }
        
        if(stack[1]&&stack[2]&&stack[1].v>stack[2].v){
            
            let n=stack[1]
            stack[1]=stack[2]
            stack[2]=n
        }
        
        for(let i in stack){
            
            textRenderer.add(stack[i].v,params.otherPos?[params.otherPos[0],params.otherPos[1]+yOffset+stackHeight*i,params.otherPos[2]]:[f.x+x,f.y+yOffset+stackHeight*i+((stack[i].v+'').length*0.3),f.z+z],COLORS[stack[i].c+'Arr'],crit[stack[i].c[0]])
            
        }
    }
    
    totalHoney+=totalGoo*0.1
    
    let instantConversion={r:params.instantConversion?(1-player.instantRedConversion)*params.instantConversion+1:player.instantRedConversion,b:params.instantConversion?(1-player.instantBlueConversion)*params.instantConversion+1:player.instantBlueConversion,w:params.instantConversion?(1-player.instantWhiteConversion)*params.instantConversion+1:player.instantWhiteConversion}
    
    instantConversion.r=crit.r===2?1:instantConversion.r
    instantConversion.w=crit.w===2?1:instantConversion.w
    instantConversion.b=crit.b===2?1:instantConversion.b
    
    totalHoney+=(total.r)*instantConversion.r+(total.b)*instantConversion.b+(total.w)*instantConversion.w+totalGoo*player.instantGooConversion
    
    totalHoney=Math.ceil(totalHoney)
    
    player.honey+=totalHoney
    
    if(totalHoney&&player.setting_enablePollenText){
        
        textRenderer.add(totalHoney,[player.body.position.x,player.body.position.y+yOffset*0.8+0.4+Math.random()*0.75,player.body.position.z],COLORS.honey,0,'+',0.85)
    }
    
    player.pollen=Math.min(player.pollen+Math.ceil((total.w+total.r+total.b+totalGoo)-totalHoney-totalGoo*0.1),player.capacity)
    
    player.stats.redPollen+=total.r+balloon.r
    player.stats.bluePollen+=total.b+balloon.b
    player.stats.whitePollen+=total.w+balloon.w
    player.stats.goo+=totalGoo
    
    return total.r+total.b+total.w+balloon.r+balloon.b+balloon.w
}

function createField(name,x,y,z,w,l,c,_l,genralColorComp){
    
    fieldInfo[name]={x:x,y:y,z:z,width:w,length:l,getColor:c,getLevel:_l,haze:{},generalColorComp:genralColorComp}
    
    flowers[name]=[]
    
    for(let x=0;x<w;x++){
        
        for(let z=0;z<l;z++){
            
            addFlower(name,x,z)
        }
    }
}

createField('testField1',-1.5-16*2,-1.5,0,14,14,function(){
    
    let c=Math.random()
    
    return Math.random()<0.2?'white':'blue'
    
},function(){
    
    return 5
},{r:0,b:0.8,w:0.2})

createField('testField2',-1.5-16,-1.5,0,14,14,function(){
    
    let c=Math.random()
    
    return Math.random()<0.2?Math.random()<0.5?'blue':'red':'white'
    
},function(){
    
    return 5
},{w:0.7,b:0.15,r:0.15})

createField('testField3',-1.5,-1.5,0,14,14,function(){
    
    let c=Math.random()
    
    return Math.random()<0.2?'white':'red'
    
},function(){
    
    return 5
},{r:0.8,b:0,w:0.2})


createField('coconutField',25,12.5,-39.5,17,14,function(){
    
    let c=Math.random()
    
    return Math.random()<0.1?Math.random()<0.4?'blue':'red':'white'
    
},function(){
    
    return 3
},{w:0.9,b:0.04,r:0.06})

createField('pepperPatch',61,20.5,-44,15,15,function(){
    
    let c=Math.random()
    
    return Math.random()<0.1?'white':'red'
    
},function(){
    
    return 3
},{b:0,r:0.9,w:0.1})

createField('roseField',31,2,31.5,19,13,function(){
    
    let c=Math.random()
    
    return Math.random()<0.12?'white':'red'
    
},function(){
    
    return Math.random()<0.5?3:Math.random()<0.12?1:2
},{r:0.88,w:0.12,b:0})

createField('pineTreeForest',31,12.5,74,14,19,function(){
    
    let c=Math.random()
    
    return Math.random()<0.1?'white':'blue'
    
},function(){
    
    return Math.random()<0.46?3:Math.random()<0.6?1:2
},{w:0.1,b:0.9,r:0})

createField('pumpkinPatch',4,12.5,76.5,18,12,function(){
    
    let c=Math.random()
    
    return Math.random()<0.57?'white':Math.random()<0.52?'red':'blue'
    
},function(){
    
    return Math.random()<0.76?3:2
},{w:0.57,r:(1-0.57)*0.52,b:(1-0.57)*0.48})

createField('cactusField',4,12.5,63.5,18,11,function(){
    
    let c=Math.random()
    
    return Math.random()<0.06?'white':Math.random()<0.58?'blue':'red'
    
},function(){
    
    return Math.random()<0.56?3:2
},{w:0.06,b:(1-0.06)*0.58,r:(1-0.06)*0.42})

createField('mountainTopField',-35,33,73,15,15,function(){
    
    let c=Math.random()
    
    return Math.random()<0.5?'red':'blue'
    
},function(){
    
    return 3
},{r:0.5,b:0.5,w:0})

createField('sunflowerField',15.5,-1.5,16,11,18,function(){
    
    let c=Math.random()
    
    return Math.random()>0.7?Math.random()<0.4?'blue':'red':'white'
    
},function(){
    
    return Math.random()<0.1?2:1
},{w:0.7,b:0.15,r:0.15})

createField('mushroomField',-6,-1.5,29,19,13,function(){
    
    let c=Math.random()
    
    return Math.random()<0.69?'red':'white'
    
},function(){
    
    return Math.random()<0.9?1:2
},{w:0.31,b:0,r:0.69})

createField('strawberryField',7.5,2,47,15,15,function(){
    
    let c=Math.random()
    
    return Math.random()<0.69?'red':'white'
    
},function(){
    
    return Math.random()<0.04?3:Math.random()<0.8?2:1
},{w:0.31,b:0,r:0.69})

createField('spiderField',-20,2,47.5,19,14,function(){
    
    let c=Math.random()
    
    return 'white'
    
},function(){
    
    return Math.random()<0.8?2:Math.random()<0.5?3:1
},{w:1,b:0,r:0})

createField('bambooField',-52,2,50,21,13,function(){
    
    let c=Math.random()
    
    return Math.random()<0.25?'white':'blue'
    
},function(){
    
    return Math.random()<0.75?2:Math.random()<0.25?3:1
},{w:0.25,b:0.75,r:0})

createField('pineapplePatch',-71.5,12.5,78,19,15,function(){
    
    let c=Math.random()
    
    return Math.random()<0.89?'white':Math.random()>0.56?'blue':'red'
    
},function(){
    
    return Math.random()<0.5?2:Math.random()<0.38?1:3
},{w:0.89,b:0.05,r:0.06})

createField('stumpField',-102,16,75,15,15,function(){
    
    let c=Math.random()
    
    return Math.random()<0.8?'blue':Math.random()>0.2?'white':'red'
    
},function(){
    
    return 3
},{w:0.15,b:0.8,r:0.05})

createField('blueFlowerField',-53,-1.5,32,25,10,function(){
    
    let c=Math.random()
    
    return Math.random()<0.69?'blue':'white'
    
},function(){
    
    return Math.random()<0.89?1:2
},{w:0.31,r:0,b:0.69})


flowers.mesh={}
flowers.mesh.vertBuffer=gl.createBuffer()
flowers.mesh.indexBuffer=gl.createBuffer()
flowers.mesh.verts=verts
flowers.mesh.index=index
flowers.mesh.indexAmount=index.length

gl.bindBuffer(gl.ARRAY_BUFFER,flowers.mesh.vertBuffer)
gl.bufferData(gl.ARRAY_BUFFER,Float32Array.from(flowers.mesh.verts),gl.DYNAMIC_DRAW)
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,flowers.mesh.indexBuffer)
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,Uint16Array.from(flowers.mesh.index),gl.DYNAMIC_DRAW)

for(let i=0;i<50;i++)
player.addSlot(null)

player.updateHive()
player.updateGear()

objects.tokens.push(new LootToken(10000,[-8,-1,-6],'glue',1000000))
objects.tokens.push(new LootToken(10000,[-7,-1,-6],'oil',1000000))
objects.tokens.push(new LootToken(10000,[-6,-1,-6],'enzymes',1000000))
objects.tokens.push(new LootToken(10000,[-5,-1,-6],'redExtract',1000000))
objects.tokens.push(new LootToken(10000,[-4,-1,-6],'blueExtract',1000000))
objects.tokens.push(new LootToken(10000,[-3,-1,-6],'tropicalDrink',1000000))
objects.tokens.push(new LootToken(10000,[-2,-1,-6],'purplePotion',1000000))
objects.tokens.push(new LootToken(10000,[-1,-1,-6],'superSmoothie',100))
objects.tokens.push(new LootToken(10000,[0,-1,-6],'treat',100000000))
objects.tokens.push(new LootToken(10000,[1,-1,-6],'blueberry',100000000))
objects.tokens.push(new LootToken(10000,[2,-1,-6],'strawberry',100000000))
objects.tokens.push(new LootToken(10000,[3,-1,-6],'pineapple',100000000000))
objects.tokens.push(new LootToken(10000,[4,-1,-6],'sunflowerSeed',100000000))
objects.tokens.push(new LootToken(10000,[5,-1,-6],'basicEgg',1000000))
objects.tokens.push(new LootToken(10000,[6,-1,-6],'silverEgg',1000000))
objects.tokens.push(new LootToken(10000,[7,-1,-6],'goldEgg',1000000))
objects.tokens.push(new LootToken(10000,[8,-1,-6],'diamondEgg',1000000))
objects.tokens.push(new LootToken(10000,[9,-1,-6],'mythicEgg',1000000))
objects.tokens.push(new LootToken(10000,[10,-1,-6],'glitter',1000000))
objects.tokens.push(new LootToken(10000,[11,-1,-6],'gumdrops',1000000))
objects.tokens.push(new LootToken(10000,[12,-1,-6],'coconut',1000000))
objects.tokens.push(new LootToken(10000,[13,-1,-6],'stinger',1000000))
objects.tokens.push(new LootToken(10000,[14,-1,-6],'bitterberry',1000000))
objects.tokens.push(new LootToken(10000,[15,-1,-6],'neonberry',1000000))


objects.tokens.push(new LootToken(10000,[3,2,-6],'honey',1000000000))

player.pointerLocked=false

document.addEventListener('pointerlockchange',function(e){
    
    player.pointerLocked=!player.pointerLocked
    
},false)

ctx.textAlign='center'
ctx.textBaseline='middle'

objects.mobs.push(new Beetle([0,-0.8,20],{minX:0,maxX:10,minZ:15,maxZ:25,minY:-3,maxY:6},1))

if(window.thisProgramIsInFullScreen){
    
    document.getElementById('UIBar').style.display='none'
    document.getElementById('honeyAndPollenAmount').style.display='none'
    document.getElementById('abilityUI').style.display='none'
}

document.getElementById('runMeshStr').onclick=function(){
    
    if(!window.thisProgramIsInFullScreen){
        
        let copyText=document.getElementById('meshStr')
        copyText.select()
        document.execCommand('copy')
        copyText.setSelectionRange(0,0)
        document.getElementById('meshCreator').style.display='none'
        return
    }
    
    player.createdMesh=document.getElementById('meshStr').value
    
    UPDATE_MAP_MESH()
    
    mesh.setBuffers()
    
    let copyText=document.getElementById('meshStr')
    copyText.select()
    document.execCommand('copy')
    copyText.setSelectionRange(0,0)
}

document.getElementById('meshStr').value=player.createdMesh

//player.addSlot('baby')

player.updateHive()
player.addEffect('tabbyLove',false,false,1000)

window.functionToRunOnBeequipClick=function(id){
    
    player.beequipLookingAt=id
    player.updateBeequipPage()
}

window.exitBeequipLooking=function(id){
    
    player.beequipLookingAt=false
    player.updateBeequipPage()
}

window.selectBeequip=function(){
    
    for(let i in player.currentGear.beequips){
        
        if(player.currentGear.beequips[i].id===player.beequipLookingAt){
            player.beequipDragging=player.currentGear.beequips[i]
        }
    }
    
    player.updateBeequipPage()
}

window.unselectBeequip=function(){
    
    player.beequipDragging=false
    player.updateBeequipPage()
}

window.deleteBeequip=function(){
    
    if(player.currentGear.beequips[player.beequipLookingAt].bee){
        player.hive[player.currentGear.beequips[player.beequipLookingAt].bee[1]][player.currentGear.beequips[player.beequipLookingAt].bee[0]].beequip=null
        
    }
    
    player.currentGear.beequips.splice(player.beequipLookingAt,1)
    
    for(let i in player.currentGear.beequips){
        
        player.currentGear.beequips[i].id=i
    }
    
    player.beequipDragging=false
    player.beequipLookingAt=false
    player.updateBeequipPage()
    player.updateHive()
}

let bearMesh=new Mesh()


objects.mobs.push(new MondoChick('mountainTopField',7))

function loop(now){
    
    if(!then){
        
        now=window.performance.now()
        then=now
        
        ctx.textAlign='center'
        ctx.textBaseline='middle'
    }
    
    dt=MATH.constrain((now-then)*0.001,0.0001,0.1)
    TIME+=dt
    frameCount++
    BEE_COLLECT=Math.sin(TIME*15)*0.25
    BEE_FLY=Math.sin(TIME*35)*0.1
    
    actionWarning.style.display='none'
    
    player.resetStats()
    
    for(let k in effects){
        
        let playerHas
        
        for(let j in player.effects){
            
            if(player.effects[j].type===k){
                
                playerHas=j
                break
            }
        }
        
        if(!playerHas) continue
        
        let i=playerHas
        
        if(effects[player.effects[i].type].isPassive){
            
            let e=effects[player.effects[i].type]
            
            e.currentCooldown-=dt
            
            if(e.currentCooldown>0){
                
                e.amount.textContent=(e.currentCooldown|0)+'s'
                effects[player.effects[i].type].cooldown.setAttribute('height',30)
                e.currentVal=0
                e.startVal=player.stats[e.triggerType]
                
            } else {
                
                effects[player.effects[i].type].cooldown.setAttribute('height',0)
                e.currentVal=player.stats[e.triggerType]-e.startVal
                e.amount.textContent=e.currentVal
                
                if(e.currentVal>=e.triggerVal){
                    
                    e.currentCooldown=e.maxCooldown
                    e.activate()
                    passiveActivationPopup.style.display='block'
                    player.passivePopupTimer=2
                    
                    let s=document.getElementById('abilityUI').innerHTML
                    s=s.split('</svg>')
                    
                    for(let e in s){
                        
                        if(s[e].indexOf(player.effects[i].type)>-1){
                            
                            s=s[e]
                            break
                        }
                    }
                    
                    let tb=s.indexOf('<text'),te=s.indexOf('</text>')
                    
                    passiveActivationPopup.innerHTML=s.substr(0,tb)+s.substr(te+5,s.length)+'</svg>'
                }
            }
            
        } else {
            
            player.effects[i].cooldown-=dt
            
            effects[player.effects[i].type].amount.textContent=player.effects[i].amount>1?'x'+player.effects[i].amount:''
            
            if(effects[player.effects[i].type].amountFromCooldown){
                
                player.effects[i].amount=player.effects[i].cooldown/effects[player.effects[i].type].maxCooldown
                
                effects[player.effects[i].type].amount.textContent=((player.effects[i].amount*100+1)|0)+'%'
                
            }
            
            effects[player.effects[i].type].cooldown.setAttribute('height',(30-player.effects[i].cooldown*30/effects[player.effects[i].type].maxCooldown)||30)
            
            effects[player.effects[i].type].update(player.effects[i].amount,player)
            
            if(player.effects[i].cooldown<=0){
                
                effects[player.effects[i].type].svg.style.display='none'
                
                player.effects.splice(i,1)
            }
        }
    }
    
    player.convertTotal*=player.convertRate
    
    if(player.fieldIn){
        
        player.capacity*=(player.redFieldCapacity-1)*fieldInfo[player.fieldIn].generalColorComp.r+1
        player.capacity*=(player.blueFieldCapacity-1)*fieldInfo[player.fieldIn].generalColorComp.b+1
        player.capacity*=(player.whiteFieldCapacity-1)*fieldInfo[player.fieldIn].generalColorComp.w+1
    }
    
    for(let i=objects.marks.length;i--;){
        
        if(objects.marks[i].update()){
            
            objects.marks[i].die(i)
        }
    }
    
    for(let i in triggers){
        
        triggers[i].colliding=player.body.position.x>triggers[i].minX&&player.body.position.x<triggers[i].maxX&&player.body.position.y>triggers[i].minY&&player.body.position.y<triggers[i].maxY&&player.body.position.z>triggers[i].minZ&&player.body.position.z<triggers[i].maxZ
        
        if(triggers[i].isMachine){
            
            if(triggers[i].colliding){
                
                actionWarning.style.display='block'
                actionName.innerHTML=triggers[i].message
                
                if(user.clickedKeys.e){
                    
                    triggers[i].func(player)
                }
                
            } else if(actionName.innerHTML===triggers[i].message){
                actionName.style.display='block'
                
            }
        }
    }
    
    gl.clearColor(...player.skyColor,1)
    gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT)
    
    player.updatePhysics()
    world.step(dt)
    player.updateCamera()
    
    if(player.zoom>0.2){
        
        gl.useProgram(dynamicGeometryProgram)
        gl.uniformMatrix4fv(glCache.dynamic_viewMatrix,gl.FALSE,player.viewMatrix)
        
        gl.uniformMatrix4fv(glCache.dynamic_modelMatrix,gl.FALSE,player.modelMatrix)
        playerMesh.render()
        
        gl.uniformMatrix4fv(glCache.dynamic_modelMatrix,gl.FALSE,player.toolMatrix)
        player.toolMesh.render()
    }
    
    gl.bindTexture(gl.TEXTURE_2D,textures.flowers)
    gl.useProgram(flowerGeometryProgram)
    
    gl.uniformMatrix4fv(glCache.flower_viewMatrix,gl.FALSE,player.viewMatrix)
    
    gl.bindBuffer(gl.ARRAY_BUFFER,flowers.mesh.vertBuffer)
    gl.bufferData(gl.ARRAY_BUFFER,Float32Array.from(flowers.mesh.verts),gl.DYNAMIC_DRAW)
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,flowers.mesh.indexBuffer)
    gl.vertexAttribPointer(glCache.flower_vertPos,3,gl.FLOAT,gl.FALSE,32,0)
    gl.vertexAttribPointer(glCache.flower_vertUV,4,gl.FLOAT,gl.FALSE,32,12)
    gl.vertexAttribPointer(glCache.flower_vertGoo,1,gl.FLOAT,gl.FALSE,32,28)
    
    gl.drawElements(gl.TRIANGLES,flowers.mesh.indexAmount,gl.UNSIGNED_SHORT,0)
    
    gl.bindTexture(gl.TEXTURE_2D,textures.default)
    gl.useProgram(staticGeometryProgram)
    gl.uniformMatrix4fv(glCache.static_viewMatrix,gl.FALSE,player.viewMatrix)
    mesh.render()
    
    if(player.itemDragging&&items[player.itemDragging].canUseOnSlot||player.beequipDragging){
        
        let x=(user.mouseX/half_width)-1,y=((height-user.mouseY)/half_height)-1,z=1
        let v=player.viewMatrix,mat=[v[0],v[1],v[2],v[4],v[5],v[6],v[8],v[9],v[10]]
        mat3.invert(mat,mat)
        let dir=vec3.transformMat3([],[x,y,z],mat)
        vec3.normalize(dir,dir)
        let d=[player.cameraDir[0]*player.zoom,player.cameraDir[1]*player.zoom,player.cameraDir[2]*player.zoom]
        x=player.body.position.x+d[0]+dir[0]*8
        y=player.body.position.y+0.35+d[1]+dir[1]*8
        z=player.body.position.z+d[2]+dir[2]*8
        let result=new CANNON.RaycastResult()
        d[0]+=player.body.position.x
        d[1]+=player.body.position.y+0.35
        d[2]+=player.body.position.z
        raycastWorld.raycastClosest(new CANNON.Vec3(...d),new CANNON.Vec3(d[0]+dir[0]*10000,d[1]+dir[1]*10000,d[2]+dir[2]*10000),{},result)
        x=result.hitPointWorld.x
        y=result.hitPointWorld.y
        z=result.hitPointWorld.z
        
        if(result.body){
            
            player.hiveIndex=result.body.hiveIndex.slice()
            player.canUseItem=true
            
        } else {
            
            player.canUseItem=false
            player.hiveIndex=false
        }
        
        if(player.canUseItem){
            
            player.beeHighlightMesh.setMeshFromFunction(function(box){
                
                if(player.itemDragging&&items[player.itemDragging].canUseOnSlot(player.hive[player.hiveIndex[1]][player.hiveIndex[0]])||player.beequipDragging&&beequips[player.beequipDragging.type].canUseOnSlot(player.hive[player.hiveIndex[1]][player.hiveIndex[0]])){
                    
                    box(player.hivePos[0]+player.hiveIndex[0]*0.8,player.hivePos[1]+player.hiveIndex[1]*0.8-2.25,player.hivePos[2]-0.2,0.8,0.8,0.1,false,[0,100,0],false,false)
                    
                } else {
                    
                    player.canUseItem=false
                    box(player.hivePos[0]+player.hiveIndex[0]*0.8,player.hivePos[1]+player.hiveIndex[1]*0.8-2.25,player.hivePos[2]-0.2,0.8,0.8,0.1,false,[100,0,0],false,false)
                }
            })
            
            
        } else {
            
            player.beeHighlightMesh.setMeshFromFunction(function(){})
        }
        
        player.beeHighlightMesh.setBuffers()
        player.beeHighlightMesh.render()
    }
    
    for(let i=objects.triangulates.length;i--;){
        
        if(objects.triangulates[i].update()){
            
            objects.triangulates[i].die(i)
        }
    }
    
    player.sprinklerMesh.render()
    
    gl.bindTexture(gl.TEXTURE_2D,textures.bear)
    
    if(frameCount%2===0){
        
        bearMesh.setMeshFromFunction(function(box,a,cylinder,sphere,d,e,star,limbBox,limbCylinder){
            
            let x=16,y=-0.3,z=3,s=1,t=TIME,t1=Math.sin(t*2.1)*5-0.5
            
            limbBox(x,y+Math.cos(t1*MATH.TO_RAD*2)*s*0.6,z+Math.sin(t1*MATH.TO_RAD*2)*s*0.6,1.1*s,0.9*s,0.6*s,[t1*2,0,0],0,0)
            limbBox(x,y+Math.cos(t1*MATH.TO_RAD*2.75)*s*1.65,z+Math.sin(t1*MATH.TO_RAD*2.75)*s*1.65,1.2*s,1.15*s,0.6*s,[t1*4,0,0],0,0)
            limbBox(x,y,z,1.1*s,0.25*s,0.6*s,[t1,0,0],0,0)
            limbBox(x+s/1.25,y-Math.cos(t1*MATH.TO_RAD*3.5*2)*s*0.65+s*1.15,z-Math.sin(t1*MATH.TO_RAD*3.5*2)*s*0.2,0.5*s,1.15*s,0.5*s,[t1*3.5*2,0,9],0,0)
            s/=1.25
            limbBox(x-0.35*s,y-0.55*s,z+0.1*s,0.55*s*1.25,0.6*s*1.25,0.55*s*1.25,[t1*1.25-10,0,-5],0,0)
            limbBox(x-0.42*s,y-1.15*s,z+0.1*s,0.55*s*1.25,0.6*s*1.25,0.55*s*1.25,[10-t1*0.5,0,-5],0,0)
            limbBox(x+0.35*s,y-0.55*s,z+0.1*s,0.55*s*1.25,0.6*s*1.25,0.55*s*1.25,[t1*1.25-10,0,5],0,0)
            limbBox(x+0.42*s,y-1.15*s,z+0.1*s,0.55*s*1.25,0.6*s*1.25,0.55*s*1.25,[10-t1*0.5,0,5],0,0)
            s*=1.25
            limbCylinder(x-0.6*s,y+Math.cos(t1*MATH.TO_RAD*3)*s*2.2,z+Math.sin(t1*MATH.TO_RAD*3)*s*2.2,0.3*s,0.6*s,8,0.9,0.9,0.9,1,t1*4,0,0,0.3*s,false,true)
            limbCylinder(x+0.6*s,y+Math.cos(t1*MATH.TO_RAD*3)*s*2.2,z+Math.sin(t1*MATH.TO_RAD*3)*s*2.2,0.3*s,0.6*s,8,0.9,0.9,0.9,1,t1*4,0,0,0.3*s,false,true)
            t1=Math.sin(t*2.1+0.5)*5-0.5
            limbBox(x-1*s/1.25,y-Math.cos(t1*MATH.TO_RAD*3.5*2)*s*0.65+s*1.15,z-Math.sin(t1*MATH.TO_RAD*3.5*2)*s*0.2,0.5*s,1.15*s,0.5*s,[t1*3.5*2,0,-9],0,0)
            
        })
        
        bearMesh.setBuffers()
    
    }
    
    bearMesh.render()
    
    gl.bindTexture(gl.TEXTURE_2D,textures.bees)
    player.hiveMesh.render()
    
    player.updateFields()
    
    gl.useProgram(beeGeometryProgram)
    
    gl.uniformMatrix4fv(glCache.bee_viewMatrix,gl.FALSE,player.viewMatrix)
    
    meshes.bees.instanceData=[]
    
    for(let i in objects.bees){
        
        objects.bees[i].update()
    }
    
    for(let i in objects.tempBees){
        
        if(objects.tempBees[i].update()){
            
            for(let j in objects.tempBees[i].trails){
                
                objects.tempBees[i].trails[j].splice=true
            }
            
            objects.tempBees.splice(i,1)
        }
    }
    
    //if remove this bee line remove +amountOfBeesInBeeLine from number of bee instances too
    
    let amountOfBeesInBeeLine=0
    
    for(let i in beeInfo){
        
        let t=i
        
        meshes.bees.instanceData.push(amountOfBeesInBeeLine*1.5-40,1,-1,0,0,1,0,beeInfo[t].u,beeInfo[t].v,beeInfo[t].meshPartId)
        amountOfBeesInBeeLine++
        textRenderer.addSingle(i,[amountOfBeesInBeeLine*1.5-41.5,1.5,-1],COLORS.whiteArr,-1,false,false)
    }
    
    gl.bindTexture(gl.TEXTURE_2D,textures.bees)
    
    gl.bindBuffer(gl.ARRAY_BUFFER,meshes.bee.vertBuffer)
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,meshes.bee.indexBuffer)
    gl.vertexAttribPointer(glCache.bee_vertPos,3,gl.FLOAT,gl.FLASE,28,0)
    gl.vertexAttribPointer(glCache.bee_vertUV,4,gl.FLOAT,gl.FLASE,28,12)
    
    gl.bindBuffer(gl.ARRAY_BUFFER,meshes.bees.instanceBuffer)
    gl.bufferData(gl.ARRAY_BUFFER,Float32Array.from(meshes.bees.instanceData),gl.DYNAMIC_DRAW)
    
    gl.vertexAttribPointer(glCache.bee_instancePos,3,gl.FLOAT,gl.FLASE,40,0)
    gl.vertexAttribDivisor(glCache.bee_instancePos,1)
    gl.vertexAttribPointer(glCache.bee_instanceRotation,4,gl.FLOAT,gl.FLASE,40,12)
    gl.vertexAttribDivisor(glCache.bee_instanceRotation,1)
    gl.vertexAttribPointer(glCache.bee_instanceUV,3,gl.FLOAT,gl.FLASE,40,28)
    gl.vertexAttribDivisor(glCache.bee_instanceUV,1)
    
    gl.drawElementsInstanced(gl.TRIANGLES,meshes.bee.indexAmount,gl.UNSIGNED_SHORT,0,objects.bees.length+objects.tempBees.length+amountOfBeesInBeeLine)
    
    gl.vertexAttribDivisor(glCache.bee_instancePos,0)
    gl.vertexAttribDivisor(glCache.bee_instanceRotation,0)
    gl.vertexAttribDivisor(glCache.bee_instanceUV,0)
    
    gl.useProgram(tokenGeometryProgram)
    
    gl.uniformMatrix4fv(glCache.token_viewMatrix,gl.FALSE,player.viewMatrix)
    
    for(let i=objects.tokens.length;i--;){
        
        if(objects.tokens[i].update(dt)){
            
            objects.tokens[i].die(i)
        }
    }
    
    gl.bindTexture(gl.TEXTURE_2D,textures.effects)
    
    gl.bindBuffer(gl.ARRAY_BUFFER,meshes.token.vertBuffer)
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,meshes.token.indexBuffer)
    gl.vertexAttribPointer(glCache.token_vertPos,3,gl.FLOAT,gl.FLASE,20,0)
    gl.vertexAttribPointer(glCache.token_vertUV,2,gl.FLOAT,gl.FLASE,20,12)
    
    gl.bindBuffer(gl.ARRAY_BUFFER,meshes.tokens.instanceBuffer)
    gl.bufferData(gl.ARRAY_BUFFER,Float32Array.from(meshes.tokens.instanceData),gl.DYNAMIC_DRAW)
    
    gl.vertexAttribPointer(glCache.token_instancePos,4,gl.FLOAT,gl.FALSE,32,0)
    gl.vertexAttribDivisor(glCache.token_instancePos,1)
    gl.vertexAttribPointer(glCache.token_instanceUV,4,gl.FLOAT,gl.FALSE,32,16)
    gl.vertexAttribDivisor(glCache.token_instanceUV,1)
    
    gl.drawElementsInstanced(gl.TRIANGLES,meshes.token.indexAmount,gl.UNSIGNED_SHORT,0,objects.tokens.length+objects.marks.length)
    
    gl.vertexAttribDivisor(glCache.token_instancePos,0)
    gl.vertexAttribDivisor(glCache.token_instanceUV,0)
    meshes.tokens.instanceData=[]
    
    gl.depthMask(false)
    
    ParticleRenderer.render()
    
    gl.useProgram(explosionRendererProgram)
    
    gl.uniformMatrix4fv(glCache.explosion_viewMatrix,gl.FALSE,player.viewMatrix)
    
    for(let i=objects.explosions.length;i--;){
        
        if(objects.explosions[i].update()){
            
            objects.explosions[i].die(i)
        }
    }
    
    for(let i=objects.bubbles.length;i--;){
        
        if(objects.bubbles[i].update()){
            
            objects.bubbles[i].die(i)
        }
    }
    
    for(let i=objects.balloons.length;i--;){
        
        if(objects.balloons[i].update()){
            
            objects.balloons[i].die(i)
        }
    }
    
    for(let i=objects.targets.length;i--;){
        
        if(objects.targets[i].update()){
            
            objects.targets[i].die(i)
        }
    }
    
    for(let i=objects.fuzzBombs.length;i--;){
        
        if(objects.fuzzBombs[i].update()){
            
            objects.fuzzBombs[i].die(i)
        }
    }
    
    player.updateHiveBalloon()
    
    gl.bindBuffer(gl.ARRAY_BUFFER,meshes.cylinder_explosion.vertBuffer)
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,meshes.cylinder_explosion.indexBuffer)
    gl.vertexAttribPointer(glCache.explosion_vertPos,3,gl.FLOAT,gl.FLASE,12,0)
    
    gl.bindBuffer(gl.ARRAY_BUFFER,meshes.cylinder_explosions.instanceBuffer)
    gl.bufferData(gl.ARRAY_BUFFER,Float32Array.from(meshes.cylinder_explosions.instanceData),gl.DYNAMIC_DRAW)
    gl.vertexAttribPointer(glCache.explosion_instancePos,3,gl.FLOAT,gl.FLASE,36,0)
    gl.vertexAttribDivisor(glCache.explosion_instancePos,1)
    gl.vertexAttribPointer(glCache.explosion_instanceColor,4,gl.FLOAT,gl.FLASE,36,12)
    gl.vertexAttribDivisor(glCache.explosion_instanceColor,1)
    gl.vertexAttribPointer(glCache.explosion_instanceScale,2,gl.FLOAT,gl.FLASE,36,28)
    gl.vertexAttribDivisor(glCache.explosion_instanceScale,1)
    gl.drawElementsInstanced(gl.TRIANGLES,meshes.cylinder_explosion.indexAmount,gl.UNSIGNED_SHORT,0,meshes.cylinder_explosions.instanceData.length*MATH.INV_9)
    
    gl.bindBuffer(gl.ARRAY_BUFFER,meshes.explosion.vertBuffer)
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,meshes.explosion.indexBuffer)
    gl.vertexAttribPointer(glCache.explosion_vertPos,3,gl.FLOAT,gl.FLASE,12,0)
    gl.bindBuffer(gl.ARRAY_BUFFER,meshes.explosions.instanceBuffer)
    gl.bufferData(gl.ARRAY_BUFFER,Float32Array.from(meshes.explosions.instanceData),gl.DYNAMIC_DRAW)
    gl.vertexAttribPointer(glCache.explosion_instancePos,3,gl.FLOAT,gl.FLASE,36,0)
    gl.vertexAttribPointer(glCache.explosion_instanceColor,4,gl.FLOAT,gl.FLASE,36,12)
    gl.vertexAttribPointer(glCache.explosion_instanceScale,2,gl.FLOAT,gl.FLASE,36,28)
    gl.drawElementsInstanced(gl.TRIANGLES,meshes.explosion.indexAmount,gl.UNSIGNED_SHORT,0,meshes.explosions.instanceData.length*MATH.INV_9)
    
    gl.vertexAttribDivisor(glCache.explosion_instancePos,0)
    gl.vertexAttribDivisor(glCache.explosion_instanceColor,0)
    gl.vertexAttribDivisor(glCache.explosion_instanceScale,0)
    
    meshes.explosions.instanceData=[]
    meshes.cylinder_explosions.instanceData=[]
    
    TrailRenderer.render()
    
    gl.depthMask(true)
    
    gl.useProgram(mobRendererProgram)
    gl.uniformMatrix4fv(glCache.mob_viewMatrix,gl.FALSE,player.viewMatrix)
    
    if(user.clickedKeys.o){
        
        effects.xFlamePassive.activate()
    }
    
    player.attacked=[]
    
    for(let i=objects.mobs.length;i--;){
        
        if(objects.mobs[i].update()){
            
            objects.mobs[i].die(i)
        }
    }
    
    gl.disable(gl.DEPTH_TEST)
    textRenderer.render(dt,Math.sin(TIME*20))
    gl.enable(gl.DEPTH_TEST)
    
    ctx.drawImage(gl.canvas,0,0)
    
    textRenderer.draw()
    
    player.updateUI()
    
    if(user.clickedKeys.h){
        
        player.addEffect('haste')
        // player.addEffect('haste__')
        player.addEffect('focus')
        player.addEffect('melody')
        player.addEffect('bombCombo')
        player.addEffect('flameHeat',0.05)
    }
    
    user.update()
    
    then=now
    
    window.parent.raf=window.requestAnimationFrame(loop)
}

if(window.parent.raf){
    
    window.cancelAnimationFrame(window.parent.raf)
}

function noFullScreen(){
    
    document.getElementById('useFullscreen').style.display='none'
    loop()
}

document.getElementById('noFullScreen').addEventListener('click',noFullScreen)

if(window.thisProgramIsInFullScreen){
    
    noFullScreen()
}
}
//<script>


</script>
    </body>
</html>