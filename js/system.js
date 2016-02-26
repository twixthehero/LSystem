(function()
{
    "use strict";
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

        tuitle = Turtle(ctx, canvas.width / 2, canvas.height);

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

        for (i = 0; i < text.length; i++)
        {
            if (text[i] == 'F')
            {

            }
            else if (text[i] == '+')
            {

            }
            else if (text[i] == '-')
            {

            }
            else if (text[i] == '[')
            {

            }
            else if (text[i] == ']')
            {

            }
        }
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
        Object.assign(this,
        {
            canvas: null,
            weight: 1,
            color: 'red',
            pos: Vec2(startX, startY),
            dir: Vec2(1, 0),
            pen: 1,
            posArray: [],
            dirArray: [],

            penUp: function()
            {
                this.pen = 0
            },

            penDown: function()
            {
                this.pen = 1
            },

            push: function()
            {
                this.posArray.push(this.pos.clone())
                this.dirArray.push(this.dir.clone())
            },

            pop: function()
            {
                this.pos = this.posArray.pop()
                this.dir = this.dirArray.pop()
                this.canvas.moveTo(this.pos.x, this.pos.y)
            },

            // THIS IS IN RADIANS!!!
            rotate: function(amt)
            {
                this.dir.rotate(amt)
            },

            move: function(amt)
            {
                if (this.pen) this.canvas.beginPath()
                this.canvas.moveTo(this.pos.x, this.pos.y)

                this.pos.x += this.dir.x * amt
                this.pos.y += this.dir.y * amt

                if (this.pen)
                {
                    this.canvas.lineTo(this.pos.x, this.pos.y)
                    this.canvas.lineWidth = this.weight
                    this.canvas.stroke()
                    this.canvas.closePath()
                }
                else
                {
                    this.moveTo(this.pos.x, this.pos.y)
                }
            },
        })

        this.canvas = canvas
        this.canvas.moveTo(this.pos.x, this.pos.y)
    };
})();
