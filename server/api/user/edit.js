
module.exports = async (ctx, { db, tokenPool }) => {
  const token = ctx.cookies.get('x-token');
  const uid = tokenPool.get(token);
  const { data } = ctx.request.body;

  const update = await db.sql(`UPDATE user SET uemail='${data.uemail}', ugender=${data.ugender}, usignature='${data.usignature}'  WHERE uid=${uid}`);
  if (update.code !== 0) {
    ctx.body = { code: 1, msg: '系统繁忙，请稍后重试' };
    return;
  }

  const result = {
    code: 0,
  };
  ctx.body = result;

};
