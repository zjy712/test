(function () {
    function Game(map) {
        this.food = new Food();
        this.snake = new Snake();
        this.map = map;
        that = this; //保持实例对象
    };

    Game.prototype.init = function () {
        this.food.init(this.map);
        console.log(1);

        this.snake.init(this.map);
        console.log(2);

        this.runSanke(this.food, this.map);
        console.log(3);

        this.bindKey();
        console.log(4);

    };

    Game.prototype.runSanke = function (food, map) {
        var timeId = setInterval(function () {
            //this == window
            this.snake.move(food, map);
            console.log();

            this.snake.init(map);
            var maxX = map.offsetWidth / this.snake.width;
            var maxY = map.offsetHeight / this.snake.height;
            var headX = this.snake.body[0].x;
            var headY = this.snake.body[1].y;

            if (headX < 0 || headX > maxX || headY < 0 || headY > maxY) {
                clearInterval(timeId);
                alert("游戏结束")
            }

        }.bind(that), 150);
    };

    Game.prototype.bindKey = function () {
        document.addEventListener("keydown", function (e) {
            //this == 处罚keydown的对象----document

            switch (e.keyCode) {
                case 37:
                    this.snake.direction = "left";
                    break;
                case 38:
                    this.snake.direction = "top";
                    break;
                case 39:
                    this.snake.direction = "right";
                    break;
                case 40:
                    this.snake.direction = "bottom";
                    break;
            }
        }.bind(that), false);
    };







    var game = new Game(document.querySelector(".map"))
    game.init()

})();
