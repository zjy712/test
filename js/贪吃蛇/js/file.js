
function File(name, size, time) {
    this.name = name;
    this.size = size;
    this.time = time;
}

var f1 = new File("jack.mp4", "900M", "1997-12-21");
var f2 = new File("zack.mp4", "600M", "2017-12-21");
var f3 = new File("dack.mp4", "800M", "1995-12-21");

var arr = [f1, f2, f3];
function fn(attr) {
    return function getSort(obj1, obj2) {
        if (obj1[attr] > obj2[attr]) {
            return 1;
        } else if (obj1[attr] == obj2[attr]) {
            return 0;
        } else {
            return -1;
        }
    }
}

var ff = fn("size");

arr.sort(ff);
for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    console.log(element.name+"==="+element.size+"===="+element.time);
    
}