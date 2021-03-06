module.exports = (ctx, next) => {
  const currentUser = ctx.state.user;
  console.log('currentUser', currentUser);
  console.log('params', ctx.params);

  const requestId = ctx.params.id;

  if(currentUser.id.toString() === requestId) {
    return next();
  }

  ctx.unauthorized("You can only update your own profile");
}
