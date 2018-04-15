# 自動更新機能処理手順
　* setInternal関数を使用し、一定感覚（今回は毎５秒）にて関数の繰り返し処理を実行

 1. イベント発生後、ajax処理にてコントローラーへの通信開始
 2. データ取得(to be done by messages controller)
    * メッセージがあれば、最新のmessage idを@messagesに代入  
    * json形式にてデータ取得
 3. データ処理　（jbuilder）
 4. 最新のmessageから更新がされている場合のみ、データを入れ替え実行
    * 空メッセージ送信を試みるとエラー文章にて関数を返す
 5. message/index.html.hamlのviewを更新
 6. ログインユーザーが他のページに移動した時は、setInternal関数処理機能を停止
