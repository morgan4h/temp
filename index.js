function redirect(ele) {
    if(ele == 0) {
        location.href = 'https://youtube.com/@sofai4h'
    }else if (ele == 1) {
         location.href = 'https://youtube.com/@morgan4h'
    }else if (ele == 2) {
              location.href = 'https://youtube.com/@tmk4h'
    }else {
        console.log("i don't find any element")
    }   
}

let links = document.querySelector('ul')

links.children[0].onclick = () => {
    redirect(0)
}

links.children[1].onclick = () => {
    redirect(1)
}

links.children[2].onclick = () => {
    redirect(2)
}