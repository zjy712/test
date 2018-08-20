(function () {
    var elements = [];
    function Snake(width, height, direction) {
        this.width = width | 20;
        this.height = height | 20;
        //身体
        this.body = [
            { x: 3, y: 2, color: "red" },
            { x: 2, y: 2, color: "orange" },
            { x: 1, y: 2, color: "orange" },
        ];
        this.direction = direction || "right";
    };
    //初始化
    Snake.prototype.init = function (map) {

        remove();
        //循环遍历 创建div
        for (let i = 0; i < this.body.length; i++) {
            const ele = this.body[i];
            var div = document.createElement("div");
            map.appendChild(div);
            div.style.position = "absolute";
            div.style.width = this.width + "px";
            div.style.height = this.height + "px";

            div.style.left = ele.x * this.width + "px";
            div.style.top = ele.y * this.height + "px";
            div.style.backgroundColor = ele.color;

            elements.push(div);
        }
    };

    Snake.prototype.move = function (food, map) {

        var i = this.body.length - 1;
        for (; i > 0; i--) {
            this.body[i].x = this.body[i - 1].x;
            this.body[i].y = this.body[i - 1].y;
        }


        switch (this.direction) {
            case "right":
                this.body[0].x += 1;
                break;
            case "left":
                this.body[0].x -= 1;
                break;
            case "top":
                this.body[0].y -= 1;
                break;
            case "bottom":
                this.body[0].y += 1;
                break;
        }
        //吃到食物
        var headX = this.body[0].x;
        var headY = this.body[1].y;
        var foodX = food.x;
        var foodY = food.y;
        console.log(headX, headY, foodX, foodY);

        if (headX == foodX && headY == foodY) {
            var last = this.body[this.body.length - 1];
            this.body.push({
                x: last.x,
                y: last.y,
                color: last.color
            });
            food.init(map);
        }
    };


    function remove() {
        var i = elements.length - 1;
        for (; i >= 0; i--) {
            var ele = elements[i];
            ele.parentNode.removeChild(ele);
            elements.splice(i, 1);
        }
    };

    window.Snake = Snake;
}());
