function writeOutput(side1,side2,side3,text,image){
    document.write("Первая введённая сторона: " + side1);
           document.write("<br>");
           document.write("<br>");
           document.write("Вторая введённая сторона: " + side2);
           document.write("<br>");
           document.write("<br>");
           document.write("Третья введённая сторона: " + side3);
           document.write("<br>");
           document.write("<br>");
           document.write(text);
           document.write("<br>");
           document.write("<br>");
           document.write(image);
           document.write("<br>");
           document.write("<br>");
}
function chooseSides() {
    var side1 = prompt("Введите первую сторону треугольника","");
    var side2 = prompt("Введите вторую сторону треугольника","");
    var side3 = prompt("Введите третью сторону треугольника","");
    side1 = Number(side1);
    side2 = Number(side2);
    side3 = Number(side3);
    if ((side1 + side2 > side3) && (side3 + side2 > side1) && (side3 + side1 > side2)) {
        if (side1==side2 && side1==side3) {
            writeOutput(side1, side2, side3,"Треугольник равносторонний","<img src=\"../img/tr-3.jpg\">");
        }
        else if (side1 == side2 || side2==side3 || side1==side3) {
            writeOutput(side1, side2, side3,"Треугольник равнобедренный","<img src=\"../img/tr-2.jpg\">");
        }
         else {
            writeOutput(side1, side2, side3,"Треугольник существует","<img src=\"../img/tr-1.jpg\">");
        }
    }
    else {
        writeOutput(side1, side2, side3,"Треугольник не существует","<img src=\"../img/tr-4.jpg\">");
    }
}