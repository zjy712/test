function my$(id) {
    return document.getElementById(id);
};
function getStyle(element, attr) {
    return window.getComputedStyle ?
        window.getComputedStyle(element, null)[attr] :
        element.currentStyle[attr];
};
function animate(element, json, fn) {
    clearInterval(element.timeId);

    element.timeId = setInterval(function () {
        var flag = true;
        for (const attr in json) {
            if (attr == "opacity") {
                //层级
                var current = parseInt(parseFloat(getStyle(element, attr)) * 100);
                var target = json[attr] * 100;
                var step = (target - current) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                current += step;
                element.style[attr] = current / 100;
            } else if (attr == "zIndex") {
                element.style[attr] = json[attr];
            } else {

                var current = parseInt(getStyle(element, attr));
                var target = json[attr];
                var step = (target - current) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                current += step;
                element.style[attr] = current + "px";
            }
            if (current != target) {
                flag = false;
                console.log("当前元素" + attr + "当前位置" + current + "目标位置" + target + "每次移动" + step);
            }
        }
        if (flag) {
            if (fn) {
                fn();
            }
        }
    }, 20);
};
