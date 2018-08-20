(function () {

    var elements = [];
    function Food(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width || 20;
        this.height = height || 20; //默认20
        this.color = color || "green";
    };

    Food.prototype.init = function (map) {
        remove();
        //设置方块样式
        var div = document.createElement("div");
        div.style.position = "absolute";
        div.style.width = this.width + "px";
        div.style.height = this.height + "px";
        div.style.backgroundColor = this.color;


        map.appendChild(div);
        this.x = parseInt(Math.random() * (map.offsetWidth / this.width));
        this.y = parseInt(Math.random() * (map.offsetHeight) / this.height);
        div.style.left = this.x * this.width + "px";
        div.style.top = this.y * this.height + "px";
        elements.push(div);
    };

    function remove() {
        for (let i = 0; i < elements.length; i++) {
            const ele = elements[i];
            ele.parentNode.removeChild(ele);
            elements.splice(i, 1);
        }
    };

    window.Food = Food;
}());
