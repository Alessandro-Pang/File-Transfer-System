let pcyAlert = (article, color = 'white') => {
	let title="提示";
    title = title == undefined ? '' : title;
    article = article == undefined ? '' : article;

    let html = `
            <div class="modal"> 
                <div class="alert-box">
                    <div class="header-title">${title}</div>
                    <div class="article-box">${article}</div>
                    <button class="isOk">确认</button>
                </div>
            </div>`;
    let modalCss = {
        position: 'absolute',
        height: '100vh',
        width: '100vw',
        top: 0,
        position: 'fixed',
        backgroundColor: 'rgba(0,0,0,.5)',
    };
    let alertBoxCss = {
        opacity: 1,
        width: '500px',
        height: '300px',
        border: '1px solid rgba(33,200,200,.8)',
        margin: "auto",
        transform: 'translateY(50%)'
    };
    let headerTitle = {
        width: '100%',
        height: '20%',
        borderBottom: '1px solid rgba(33,200,200,.8)',
        background: 'rgba(55,200,200)',
        textAlign: 'center',
        color: 'white',
        fontWeight: 'blod',
        fontSize: '28px',
        paddingTop: '10px'
    };
    let articelBox = {
        width: '100%',
        height: "80%",
        background: 'rgba(22,80,158,0.8)',
        color: color,
        textAlign: "center",
        lineHeight: '200px',
        fontWeight: 'blod',
        fontSize: '30px'
    };
    let bottomCss = {
        width: '70px',
        height: '30px',
        border: 0,
        backgroundColor: 'rgb(20,100,255)',
        position: 'absolute',
        left: '85%',
        top: '88%',
    };

    try {
        //jquery 环境下
        $('body').append(html);
        $('.modal').css(modalCss);
        $('.alert-box').css(alertBoxCss);
        $('.header-title').css(headerTitle);
        $('.article-box').css(articelBox);
        $('.isOk').css(bottomCss).hover(function() {
            $(this).css('backgroundColor', 'orange')
        }, function() {
            $(this).css('backgroundColor', 'rgb(20,100,255)')
        }).click(function() {
            $('.modal').hide(1000, function() {
                this.remove();
            });
        })
    } catch (e) {
        //原生JS,低兼容
        let $query = ele => document.querySelector(ele);

        let eleStyle = (ele, style) => {
            for (let property in style) {
                $query(ele).style[property] = style[property];
            }
            return $query(ele);
        };

        let div = document.createElement('div');
        $query('body').appendChild(div)
        div.innerHTML = html;
        eleStyle('.modal', modalCss);
        eleStyle('.alert-box', alertBoxCss);
        eleStyle('.header-title', headerTitle);
        eleStyle('.article-box', articelBox);
        eleStyle('.isOk', bottomCss);
        $query('.isOk').onmouseover = function() {
            this.style.backgroundColor = 'orange';
        }
        $query('.isOk').onmouseout = function() {
            this.style.backgroundColor = 'rgb(20,100,255)';
        }
        $query('.isOk').onclick = function() {
            $query('.modal').parentElement.remove();
        }
    }
}