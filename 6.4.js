window.onload = function () {
    // let daohang = document.querySelectorAll('.daohang>li')
    let daohang = $('.daohang > li')
    let type
    let content =document.querySelector('.content')
    let arr = [
        {
            id: 1, content: '123456', ctime: '2019-01-11', status: true
        },
        {
            id: 2, content: '456789', ctime: '2019-06-11', status: false
        },
        {
            id: 3, content: '123789', ctime: '2019-07-11', status: false
        }
    ]
    let str = localStorage.getItem('arr')
    if (!str){
        localStorage.setItem('arr',JSON.stringify(arr))
    }
    arr = JSON.parse(str)
    //渲染函数
    function x(arr) {
        let html = ``
        arr.forEach(function (ele,index) {
            if (ele.status) {
                html += `
            <li id="${ele.id}">
            <input type="checkbox" class="input" checked> <p>${ele.content}</p>
            <div>X</div>
            <time>${ele.ctime}</time>
            </li>`
            } else {
                html += `
            <li id="${ele.id}">
            <input type="checkbox" class="input"> <p>${ele.content}</p>
            <div>X</div>
            <time>${ele.ctime}</time>
            </li>`
            }

        })
        return html
    }
    //过滤3
    let arr1 =[];
    function filter(type) {
        switch (type) {
            case'all':arr1 = arr
                break
            case'c':
                arr1 = arr.filter(function (i) {
                    return i.status
                })
                break
            case'w':
                arr1 = arr.filter(function (i) {
                    return !i.status
                })
                break
        }
        content.innerHTML = x(arr1);
    }
    //标题点击事件
    daohang.on('click',function () {
         type = $(this).attr('type')
            console.log(1);
        $(this).addClass('hot').siblings('li').removeClass('hot')
        filter(type)
    })
    daohang.triggerHandler('click')
    //     for (let i = 0; i < daohang.length; i++) {
    //         daohang[i].onclick = function () {
    //             type = this.type
    //             for (let i = 0; i < daohang.length; i++) {
    //                 daohang[i].classList.remove('hot');
    //             }
    //             this.classList.add('hot');
    //             filter()
    //         }
    //     }
    //     daohang[0].onclick()
    //单选框添加事件
    content.onclick = function (e) {
        let index = arr.findIndex(ele => ele.id == e.target.parentNode.id)
        if (e.target.nodeName == 'DIV'){
            arr.splice(index,1)
            localStorage.setItem('arr',JSON.stringify(arr))
            filter(type)
        }
        if (e.target.nodeName == 'INPUT'){
            if (arr[index].status) {
                arr[index].status = false
                localStorage.setItem('arr',JSON.stringify(arr))
            }else {
                arr[index].status = true
                localStorage.setItem('arr',JSON.stringify(arr))
            }
            filter(type)
        }
    }
        //添加
    let id,ctime
    let header =document.querySelector('header')
    let input =document.querySelectorAll(' header input')
    header.onclick = function(e){
            if (e.target.nodeName=='BUTTON'){
                let ar = {id,content,ctime,status}
                if (arr.length==0){
                    ar.id=1
                }else {
                    ar.id = arr[arr.length-1].id+1
                }
                ar.content = input[0].value
                ar.ctime = input[1].value
                ar.status= false;
                arr.push(ar)
                localStorage.setItem('arr',JSON.stringify(arr))
                filter()
            }

    }
}