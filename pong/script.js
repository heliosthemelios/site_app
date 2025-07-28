
//canvas.Scene.new({})
window.onload = function ()
{
    var delay = 50;

    var ball_axe_x = 500;
    var ball_axe_y = 300;
    
    var raquette1_axe_x = 40;
    var raquette1_axe_y = 200;
    
    var randNumMax = 20;
    var randNumMin = 14;
    
    var rand_int = (Math.floor(Math.random() * (randNumMax - randNumMin + 1)) + randNumMin);
    var rand_int_2 = (Math.floor(Math.random() * (randNumMax - randNumMin + 1)) + randNumMin);
    var vitesse_ball = [rand_int, rand_int_2];

    var essaie = 0;

    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    canvas.width = 800;
    canvas.height = 400;

    canvas.style.border = "5px solid";
   
    
    var ballone = new Ball();
    refreshCanvas();
    
    
    function refreshCanvas()
    {    
        
        ball_axe_x += vitesse_ball[0];
        ball_axe_y += vitesse_ball[1];
        
        var racketor_joueur_1 = new Racket(raquette1_axe_x, raquette1_axe_y);
        

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        racketor_joueur_1.draw();
        
        ballone.draw();
        ballone.limite();
        setTimeout(refreshCanvas, delay);
        
    }
    
    function Racket(x, y)
    {
        this.x = x;
        this.y = y;
    
        this.draw = function()
        {
            
            ctx.save();
            ctx.fillStyle = "black";
            ctx.fillRect(x, y, 15, 100); 
            ctx.restore();
        }
    
    }

        
    function Ball()
    {

        this.draw = function()
        {
            ctx.save();
            ctx.beginPath();
            ctx.fillStyle = "black";
            ctx.arc(ball_axe_x, ball_axe_y, 15, 0,  Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
        
        this.limite = function()
        {
            if(ball_axe_x <= raquette1_axe_x + 30 && ball_axe_y >= raquette1_axe_y && ball_axe_y <= raquette1_axe_y + 100)
            {
                //aleatoire_X = Math.random() * (max - min) + min;
                vitesse_ball[0] = -vitesse_ball[0]
            }


            if(ball_axe_x >= 800)
            {
                //aleatoire_X = Math.random() * (max - min) + min;
                vitesse_ball[0] = -vitesse_ball[0]
            }
            
            else if(ball_axe_y <= 15)
            {   
                //aleatoire_Y = Math.random() * (max - min) + min;
                vitesse_ball[1] = -vitesse_ball[1]  
            }
            
            else if(ball_axe_y >= 400)
            {   
                
                vitesse_ball[1] = -vitesse_ball[1]  
            }
            else if(ball_axe_x < -30)
            {   
                if(essaie >=5){
                    document.body.style.overflow = "";
                    die();
                }
                essaie += 1;
                ball_axe_x = 500;
                ball_axe_y = 300;
                vitesse_ball[0] = vitesse_ball[0] * 1.1;
                vitesse_ball[1] = vitesse_ball[1] * 1.1;
                    
            }
            
            
        }
    
    } 
        
    document.onkeydown = function handleKeyDown(event)
    {
        var key = event.keyCode;
        
        if (key == 40 && raquette1_axe_y < 400)
        {
            raquette1_axe_y += 10;
            
        }
        if (key == 38 && raquette1_axe_y > 0)
        {
            raquette1_axe_y -= 10;
        }

        
    }

            
}   

    