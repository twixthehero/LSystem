(function()
{
    //F -> F[+F]F[-F]F
    var Vec2 = Victor;

    var canvas;
    var ctx;

    var text;
    var rules = [];
    var cycles = 1;
    var finalText;

    var tuitle;

    window.onload = init;

    function init()
    {
        canvas = document.querySelector("canvas");
        ctx = canvas.getContext("2d");
        ctx.font = "12pt Arial";

        tuitle = new Turtle(ctx, canvas.width / 2, canvas.height);
        tuitle.rotate(-90, false);

        createUI();

        //window.requestAnimationFrame(render)
    }

    function createUI()
    {
        var enter = document.querySelector("#enter");
        enter.onclick = function()
        {
            text = document.querySelector("#starttext").value;
            cycles = parseInt(document.querySelector("#cycles").value);

            var temp = document.querySelector("#rules").value;
            rules.splice(0, rules.length);

            var rs = temp.split(",");

            for (var i = 0; i < rs.length; i++)
            {
                var parts = rs[i].split(" -> ");
                rules.push(new Rule(parts[0], parts[1]));
            }

            render();
        };
    }

    function Rule(token, replace)
    {
        this.token = token;
        this.replace = replace;
    }

    function render()
    {
        calcCycles();

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = "black";
        ctx.fillStyle = "black";

        var i;

        for (i = 0; i < rules.length; i++)
        {
            ctx.fillText(rules[i].token + " -> " + rules[i].replace, 5, i * 25 + 25);
        }

        ctx.fillText(text, 5, i * 25 + 25);

        tuitle.penDown();
        for (i = 0; i < text.length; i++)
        {
            if (text[i] == 'F')
            {
                tuitle.move(2);
            }
            else if (text[i] == '+')
            {
                tuitle.rotate(-25.7, false);
            }
            else if (text[i] == '-')
            {
                tuitle.rotate(25.7, false);
            }
            else if (text[i] == '[')
            {
                tuitle.push();
            }
            else if (text[i] == ']')
            {
                tuitle.pop();
            }
        }
        tuitle.penUp();
    }

    function calcCycles()
    {
        for (var i = 0; i < cycles; i++)
        {
            var temp = "";

            for (var k = 0; k < text.length; k++)
            {
                var r;

                for (r = 0; r < rules.length; r++)
                {
                    if (rules[r].token == text[k])
                        break;
                }

                if (r != rules.length)
                    temp += rules[r].replace;
                else
                    temp += text[k];
            }

            text = temp;
        }
    }

    var Turtle = function(canvas, startX, startY)
    {
        this.canvas = canvas;
        this.weight = 1;
        this.color = 'red';
        this.pos = Vec2(startX, startY);
        this.dir = Vec2(1, 0);
        this.pen = 1;
        this.posArray = [];
        this.dirArray = [];

        this.penUp = function()
        {
            this.pen = 0;
        };

        this.penDown = function()
        {
            this.pen = 1;
        };

        this.push = function()
        {
            this.posArray.push(this.pos.clone());
            this.dirArray.push(this.dir.clone());
        };

        this.pop = function()
        {
            this.pos = this.posArray.pop();
            this.dir = this.dirArray.pop();
            this.canvas.moveTo(this.pos.x, this.pos.y);
        };

        this.rotate = function(amt, isRad)
        {
            if (isRad)
                this.dir.rotate(amt);
            else
                this.dir.rotate(amt / 180 * Math.PI);
        };

        this.move = function(amt)
        {
            if (this.pen) this.canvas.beginPath();

            this.canvas.moveTo(this.pos.x, this.pos.y);

            this.pos.x += this.dir.x * amt;
            this.pos.y += this.dir.y * amt;

            if (this.pen)
            {
                this.canvas.lineTo(this.pos.x, this.pos.y);
                this.canvas.lineWidth = this.weight;
                this.canvas.strokeStyle = this.color;
                this.canvas.stroke();
                this.canvas.closePath();
            }
            else
            {
                this.moveTo(this.pos.x, this.pos.y);
            }
        };

        this.canvas.moveTo(this.pos.x, this.pos.y);
    };
})();
