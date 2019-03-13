
//create the constructor for the class saucer
function Saucer() {
    //initialisation code will go here

    //create private variables for the x and y coordinates
    var x = 400;
    var y = 100;

    var RedWindow = 1;

    //create private variables for the x and y coordinates
    var vx = 0;
    var vy = 0;

     //create private object for success or failure of the game
    var Boom = false;
    var succes = false;
    var GameOver = false;


    //create the draw function to give us the draw method
    //it accepts one parameter which is the context from the canvas it is drawn on
    Saucer.prototype.draw = function (context) {
        //save the state of the drawing context before we change it
        context.save();
        //set the coordinates of the drawing area of the new shape to x and y
        context.translate(x, y);
        //start the line (path)
        context.beginPath();
        context.fillStyle = "#d3d3d3";
        context.moveTo(20, 40);
        context.lineTo(25, 50);
        context.lineTo(35, 50);
        context.lineTo(35, 30);
        context.lineTo(28, 0);
        context.lineTo(25, -20);
        context.lineTo(22, -30);
        context.lineTo(20, -40);
        context.lineTo(0, -40);
        context.lineTo(-20, -40);
        context.lineTo(-22, -30);
        context.lineTo(-25, -20);
        context.lineTo(-28, 0);
        context.lineTo(-35, 30);
        context.lineTo(-35, 50);
        context.lineTo(-25, 50);
        context.lineTo(-20, 40);
        context.lineTo(0, 40)
        context.closePath();
        context.fill();
        //go ahead and draw the line
        context.stroke();

        //left Glass
        context.beginPath();
        context.fillStyle = "#ffff00";
        context.moveTo(-28, 0);
        context.lineTo(-20, 0);
        context.lineTo(-20, -20);
        context.lineTo(-25, -20);
        context.closePath();
        context.fill();
        context.stroke();

        //middle Glass
        context.beginPath();
        context.fillStyle = "#ff0000";
        context.moveTo(10, 0);
        context.lineTo(10, -20);
        context.lineTo(-10, -20);
        context.lineTo(-10, 0);
        context.closePath();
        context.fill();
        context.stroke();

        //right Glass
        context.beginPath();
        context.fillStyle = "#ffff00";
        context.moveTo(25, -20);
        context.lineTo(20, -20);
        context.lineTo(20, 0);
        context.lineTo(28, 0);
        context.closePath();
        context.fill();
        context.stroke();

        //bottom landing globe
        context.beginPath();
        context.fillStyle = "#FF4500";
        context.moveTo(-20, 40);
        context.quadraticCurveTo(0, 45, 20, 40);
        context.fill();
        context.stroke();

        //call Draw window
        DrawWindows(context);

        //if the ship has blown up
        if (Boom == true) {

            //create a new instance of an image
            var img = new Image();
            //get the bitmap source
            img.src = "boom.png";
            //draw the image on the context
            context.drawImage(img, -100, -60);
            vx = 0;
            vy = 0;
        }// end If 


        //if the ship has blown up
            if (succes == true) {

            ////create a new instance of an image
            //var img = new Image();
            ////get the bitmap source
            //img.src = "winner2.PNG";

            //draw the image on the context

                /* context.drawImage(img, 100, -60);
                context.drawImage(img, 0, 0);*/
           // context.drawImage(img, 800, 800);
            
            vx = 0;
            vy = 0;
        } //end IF



        //restore the state of the context to what it was before our drawing
        context.restore();
    } // END prototype Draw 



    function DrawWindows(context) {
        //var for the offset of the window to be drawn
        var XOffset = -15,
            //var for loop counter to indicate which window we are drawing
            WindowNo = 1,
            //var to store the colour to use
            Colour = "";

        //loop through each window
        while (WindowNo != 3) {

            //if the red window is being drawn then set the colour to red
            if (WindowNo == RedWindow) {
                //set colour to blue
                Colour = "#0000ff";
            }//end if

            else {
                //set colour to orange
                Colour = "#ffa500";
            }//end else

            //draw the window
            Window(context, XOffset, 20, Colour);
            //point at the next window
            WindowNo++;
            //work out the position of the next window
            XOffset = XOffset + 30;
        }//end while

        //chage the red window to the next one
        RedWindow = RedWindow + .25;
        //if the red window is 6 thats too many
        if (RedWindow == 3) {
            //set it back to 1
            RedWindow = 1;
        }//end if


    }
    // function Draw BOTH Window
    function Window(context, xposn, yposn, colour) {
        //draw right window
        context.beginPath();
        context.fillStyle = colour;
        //x, y, radius, start_angle, end_angle, anti-clockwise
        context.arc(xposn, yposn, 5, 0, (Math.PI * 2));
        context.fill();
        context.stroke();
    } //END DrawWindows

    Saucer.prototype.move = function () {
        //change the x axis by the x velocity

        x += vx;

        //change the y axis by the y velocity
        y += vy;

    } //end prototype move

    Saucer.prototype.setVector = function (vector) {

        //set vector vx
        vx = vector.VX;

        //set vector vy
        vy = vector.VY;

    } //end prototype vector


    Saucer.prototype.accelerate = function (Acceleration) {
        vx += Acceleration.AX;
        //set vy
        vy += Acceleration.AY;

    } //END Prototype Acceleration


    //create a public property called Top
    Object.defineProperty(this, 'Top',
        {
            //getter
            get: function () {
                //return the value of y less height
                return y - 20;
            }
        }
    )

    //create a public property called Bottom
    Object.defineProperty(this, 'Bottom',
        {
            //getter
            get: function () {
                //return the value of y plus height
                return y + 49; //WAS 20 BUT I CHANGED TO 50 TO MAKE CONTACT WITH PAD
            }
        }
    )

    //create a public property called Left
    Object.defineProperty(this, 'Left',
        {
            //getter
            get: function () {
                //return the value of x less width
                return x - 30;
            }
        }
    )

    //create a public property called Right
    Object.defineProperty(this, 'Right',
        {
            //getter
            get: function () {
                //return the value of x plus width
                return x + 30;
            }
        }
    )


    Saucer.prototype.halt = function ()
    {
        if (GameOver == false)//first time ====NEW
        {
            GameOver = true;//====NEW
            //temp variable to store the vy
            var temp = vy;
            //kill all velocity
            vx = 0;
            vy = 0;
            //set the ship as exploding
            if (temp > .4) {
                Boom = true;
                succes = false;
            }

            else {
                Boom = false;
                succes = true;

            }

        }//end if


            //    /*
            //    //temp variable to store the vy
            //    var temp = vy;
            //    //kill all velocity
            //    vx = 0;
            //    vy = 0;
            //    //set the ship as exploding
            //    if (temp > .4)
            //    {
            //        Boom = true;
            //        succes = false;
            //    }

            //    else
            //    {
            //        Boom = false;
            //        succes = true;

            //    }
            //    */
            //alert(Boom);
            //alert(temp);
            //alert(succes);


    } //END prototype Halt

    

        Saucer.prototype.stop = function () {
            //temp variable to store the vy
            keycode.UP = false;
            keycode.DOWN = false;
            keycode.LEFT = false;
            keycode.RIGHT = false;
            keycode.SPACE = false;
        }//END prototype Stop

        Object.defineProperty(this, 'X',
            {
                //getter
                get: function () {
                    //return the value of y (lower case)
                    return x;
                },
                //setter
                set: function (value) {
                    //ste the value of y (lower case)
                    x = value;
                }
            }
        )
        Object.defineProperty(this, 'Y',
            {
                //getter
                get: function () {
                    //return the value of y (lower case)
                    return y;
                },
                //setter
                set: function (value) {
                    //ste the value of y (lower case)
                    y = value;
                }
            }
        )


        /////////////// NEW BELOW ///////////////////////////
        Object.defineProperty(this, 'VY',
            {
                //getter
                get: function () {
                    //return the value of y (lower case)
                    return vy;
                }

            }
        )

        //Object.defineProperty(this, 'SUCCESS',
        //    {
        //        //getter
        //        get: function () {
        //            //return the value of y (lower case)
        //            return succes;
        //        }

        //    }
        //)
        Object.defineProperty(this, 'BOOM',
            {
                //getter
                get: function () {
                    //return the value of y (lower case)
                    return Boom;
                }

            }
        )
        ////////////////// END NEW//////////////////
}//end constructor saucer




