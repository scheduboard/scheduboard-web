import { Router, Request, Response } from 'express';
const router = Router();

const endPoint = '/';

router
  .route(endPoint)
  .get((req: Request, res: Response) => {
    // ここにコレクション等の取得を書く
    res.json({
      message: 'call by the GET method',
    });
  })
  .post((req: Request, res: Response) => {
    // ここデータ送信の処理を書く
    res.json({
      message: 'call by the POST method',
    });
  });

router
  .route(`${endPoint}/:id`)
  .put((req: Request, res: Response) => {
    // ここデータ更新の処理を書く
    res.json({
      message: 'call by the PUT method ID:' + req.params.id,
    });
  })
  .delete((req: Request, res: Response) => {
    // ここデータ削除の処理を書く
    res.json({
      message: 'call by the DELETE method ID:' + req.params.id,
    });
  });

module.exports = router;
