module.exports = {
    home: function (trs) {
        return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css" rel="stylesheet">
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.bundle.min.js"></script>
            <title>기아 타이거즈</title>
            <style>
            th, td { text-align: center; }
            </style>
        </head>
        <body>
        <div class="container-fluid p-5 bg-danger text-white text-center">
            <h1>기아 타이거즈 선수단</h1>
            <button class="btn btn-light" onclick="location.href='/create'">추가</button>
        </div>
            <hr>
        <div class="container mt-3">
            <div class="row">
                <div class="col-2"></div>
                <div class="col-8">
                <table class="table">
                    <tr>
                        <th>ID</th>
                        <th>선수명</th>
                        <th>백넘버</th>
                        <th>포지션</th>
                        <th>액션</th>
                    </tr>
                    ${trs}
                </table>
                </div>
                    <div class="col-2"></div>
                </div>
            </div>
        </body>
        </html>
        `;
    },

    trsGen: function (rows) {
        let trs = '';
        for (let row of rows) {
            trs += '<tr>';
            trs += `<td>${row.id}</td><td>${row.player}</td>`
            trs += `<td>${row.backNo}</td><td>${row.position}</td>`
            trs += `<td>
                        <button type="button" class="btn btn-info" onclick="location.href='/update?id=${row.id}'">수정</button> 
                        <button type="button" class="btn btn-warning" onclick="location.href='/delete?id=${row.id}'">삭제</button>
                    </td>`
            trs += '</tr>';
        }
        return trs;
    },

    createForm : function(){
        return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css" rel="stylesheet">
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.bundle.min.js"></script>
            <title>기아 타이거즈</title>
            <style>
            th, td { text-align: center; }
            </style>
        </head>
        <body>
        <div class="container-fluid p-5 bg-danger text-white text-center">
            <h1>기아 타이거즈 선수단</h1>
            <button class="btn btn-light" onclick="location.href='/'">홈으로</button>
        </div>
            <hr>
        <div class="container mt-3">
            <div class="row">
                <div class="col-2"></div>
                <div class="col-8">
                <form action="/create" method="post">
                    <table class="table">
                        <tr>
                            <td>선수명</td><td><input type="text" name="player"></td>
                        </tr>
                        <tr>
                            <td>백넘버</td><td><input type="text" name="backNo"></td>
                        </tr>
                        <tr>
                            <td>포지션</td><td><input type="text" name="position"></td>
                        </tr>
                        <tr>
                        <td colspan="2"><button class="btn btn-light" type="submit">추가</button></td>
                    </tr>
                    </table>
                </form>
                </div>
                    <div class="col-2"></div>
                </div>
            </div>
        </body>
        </html>
        `;
    },
    updateForm: function(id, player, backNo, position){
        return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css" rel="stylesheet">
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.bundle.min.js"></script>
            <title>기아 타이거즈</title>
            <style>
            th, td { text-align: center; }
            </style>
        </head>
        <body>
        <div class="container-fluid p-5 bg-danger text-white text-center">
            <h1>기아 타이거즈 선수단</h1>
            <button class="btn btn-light" onclick="location.href='/'">홈으로</button>
        </div>
            <hr>
        <div class="container mt-3">
            <div class="row">
                <div class="col-2"></div>
                <div class="col-8">
                <form action="/update" method="post">
                    <input type="hidden" name="id" value="${id}">
                    <table class="table">
                        <tr>
                            <td>선수명</td><td><input type="text" name="player" value="${player}"></td>
                        </tr>
                        <tr>
                            <td>백넘버</td><td><input type="text" name="backNo" value="${backNo}"></td>
                        </tr>
                        <tr>
                            <td>포지션</td><td><input type="text" name="position" value="${position}"></td>
                        </tr>
                        <tr>
                        <td colspan="2"><button class="btn btn-light" type="submit">수정</button></td>
                    </tr>
                    </table>
                </form>
                </div>
                    <div class="col-2"></div>
                </div>
            </div>
        </body>
        </html>
        `;
    },
    deleteForm: function (id) {
        return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
            <script>
                let answer = confirm('정말로 삭제하시겠습니까?');
                if(answer)
                    location.href = '/deleteConfirm?id=${id}';
                else
                    location.href = '/';
            </script>
        </body>
        </html>`;
    }
    
}